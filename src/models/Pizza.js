const mongoose = require('mongoose');

const PizzaSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  descricao: { type: String }, 
  ingredientes: [String], // Array de strings ["queijo", "tomate"]
  preco: { type: Number, required: true },
  categoria: { type: String, default: 'Tradicional' },
  disponivel: { type: Boolean, default: true }
});

module.exports = mongoose.model('Pizza', PizzaSchema);