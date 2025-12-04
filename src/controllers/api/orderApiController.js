const Order = require('../../models/Order');
const Pizza = require('../../models/Pizza');

exports.createOrder = async (req, res) => {
  try {
    const { itens } = req.body; // Espera receber: [{ pizzaId: "...", quantidade: 1 }]

    if (!itens || itens.length === 0) {
      return res.status(400).json({ error: 'Carrinho vazio' });
    }

    let totalCalculado = 0;
    const itensFinais = [];

    // Loop assíncrono para verificar cada pizza no banco
    for (const item of itens) {
      const pizzaInfo = await Pizza.findById(item.pizzaId);
      
      if (!pizzaInfo) {
        return res.status(404).json({ error: `Pizza com ID ${item.pizzaId} não encontrada` });
      }

      // Segurança: Preço vem do Banco, não do JSON
      totalCalculado += pizzaInfo.preco * item.quantidade;
      
      itensFinais.push({
        pizza: pizzaInfo._id,
        quantidade: item.quantidade
      });
    }

    // Cria o pedido vinculado ao usuário logado (req.user.id vem do Token)
    const novoPedido = await Order.create({
      user: req.user.id,
      itens: itensFinais,
      total: totalCalculado
    });
    req.io.emit('novo_pedido', novoPedido);
    res.status(201).json({ success: true, order: novoPedido });

  } catch (error) {
    res.status(500).json({ error: 'Erro ao processar pedido', details: error.message });
  }
};

exports.listMyOrders = async (req, res) => {
  try {
    // Busca pedidos onde o campo 'user' é igual ao ID do token
    // .sort({ dataCriacao: -1 }) -> Mostra os mais recentes primeiro
    // .populate('itens.pizza') -> MÁGICA: Troca o ID da pizza pelos dados reais (nome, foto, etc)
    const orders = await Order.find({ user: req.user.id })
      .sort({ dataCriacao: -1 })
      .populate('itens.pizza');

    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar pedidos' });
  }
};

// ...
exports.updateStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const pedido = await Order.findByIdAndUpdate(id, { status }, { new: true });
    
    if (!pedido) return res.status(404).json({ error: 'Pedido não encontrado' });

    // --- MÁGICA DO SOCKET ---
    // Avisa a sala específica ou todos que o status mudou
    req.io.emit(`status_update_${pedido.user}`, { 
        orderId: pedido._id, 
        status: pedido.status 
    });
    // Também avisa a cozinha (se precisar atualizar UI)
    req.io.emit('cozinha_update', pedido);

    res.json({ success: true, pedido });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar' });
  }
};