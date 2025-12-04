const Pizza = require('../../models/Pizza');

// GET: Lista todas as pizzas disponíveis
exports.listPizzas = async (req, res) => {
  try {
    const pizzas = await Pizza.find({ disponivel: true });
    res.json(pizzas);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar cardápio' });
  }
};

// POST: Cria uma nova pizza (Restrito)
exports.createPizza = async (req, res) => {
  try {
    const { nome, descricao, ingredientes, preco, categoria } = req.body;
    
    const novaPizza = await Pizza.create({
      nome, descricao, ingredientes, preco, categoria
    });

    res.status(201).json({ success: true, pizza: novaPizza });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// ... (código anterior: listPizzas, createPizza)

// ATUALIZAR (UPDATE)
exports.updatePizza = async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, descricao, ingredientes, preco, categoria } = req.body;

    const pizzaAtualizada = await Pizza.findByIdAndUpdate(id, {
      nome,
      descricao,
      ingredientes,
      preco,
      categoria
    }, { new: true }); // new: true retorna o objeto já atualizado

    if (!pizzaAtualizada) return res.status(404).json({ error: 'Pizza não encontrada' });

    res.json({ success: true, pizza: pizzaAtualizada });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar pizza' });
  }
};

// DELETAR (DELETE)
exports.deletePizza = async (req, res) => {
  try {
    const { id } = req.params;
    const pizzaDeletada = await Pizza.findByIdAndDelete(id);

    if (!pizzaDeletada) return res.status(404).json({ error: 'Pizza não encontrada' });

    res.json({ success: true, message: 'Pizza removida com sucesso' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao deletar pizza' });
  }
};