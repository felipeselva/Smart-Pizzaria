const AIService = require('../../services/AIService');
const Pizza = require('../../models/Pizza');
const Order = require('../../models/Order');

exports.sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    
    // 1. Chama o Gemini
    let respostaIA = await AIService.processarMensagem(req.user.id, message);
    // 2. Limpeza de segurança (As vezes a IA manda ```json ... ```)
    let respostaLimpa = respostaIA.replace(/```json/g, '').replace(/```/g, '').trim();

    // 3. Tenta detectar se é o nosso JSON Secreto
    try {
        if (respostaLimpa.startsWith('{') && respostaLimpa.includes('CRIAR_PEDIDO')) {
            const comando = JSON.parse(respostaLimpa);

            // A IA decidiu que é uma venda! Vamos processar.
           if (comando.acao === 'CRIAR_PEDIDO') {
                // AGORA PASSAMOS O ARRAY 'itens' E NÃO MAIS A STRING 'pizza'
                return await processarPedidoIA(req, res, comando.itens);
            }
        }
    } catch (e) {
        // Se der erro no JSON, vida que segue, assume que é texto normal
        console.log("A resposta da IA não era um JSON válido, tratando como texto.");
    }

    // 4. Se não for pedido, responde o texto normal da IA
    res.json({ success: true, reply: respostaIA });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// --- Função Auxiliar que cria o pedido automaticamente ---
// --- Função Auxiliar que cria o pedido MÚLTIPLO ---
async function processarPedidoIA(req, res, listaItens) {
    try {
        let itensFinais = [];
        let totalCalculado = 0;
        let resumoTexto = [];

        // 1. Loop para processar cada item da lista da IA
        for (const item of listaItens) {
            // Busca a pizza no banco pelo nome (Regex para ignorar maiúsculas)
            const pizza = await Pizza.findOne({ 
                nome: { $regex: new RegExp(`^${item.pizza}$`, 'i') } 
            });

            if (pizza) {
                // Se achou, adiciona na lista final
                const qtd = item.quantidade || 1;
                itensFinais.push({
                    pizza: pizza._id,
                    quantidade: qtd
                });
                totalCalculado += pizza.preco * qtd;
                resumoTexto.push(`${qtd}x ${pizza.nome}`);
            }
            // Se não achou (IA alucinou o nome), a gente apenas ignora esse item
        }

        if (itensFinais.length === 0) {
            return res.json({ 
                success: true, 
                reply: "Poxa, não consegui identificar as pizzas que você pediu no nosso sistema. Pode repetir o nome exato?" 
            });
        }

        // 2. Cria o pedido no banco com a lista completa
        const novoPedido = await Order.create({
            user: req.user.id,
            itens: itensFinais,
            total: totalCalculado,
            origem: 'Chatbot'
        });

        // 3. Avisa a Cozinha (Socket)
        if (req.io) {
            req.io.emit('novo_pedido', novoPedido);
        }

        // 4. Responde bonito
        const textoItens = resumoTexto.join(', ');
        return res.json({ 
            success: true, 
            reply: `✅ Anotei tudo! Lancei o pedido de: **${textoItens}**. \nTotal: R$${totalCalculado.toFixed(2)}. \nAcompanhe em "Meus Pedidos".` 
        });

    } catch (erro) {
        console.error("Erro ao criar pedido múltiplo via IA:", erro);
        return res.json({ success: true, reply: "Tive um erro interno ao processar seu pedido. Tente pelo cardápio." });
    }
}