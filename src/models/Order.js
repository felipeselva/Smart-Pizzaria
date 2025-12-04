const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  itens: [{
    pizza: { type: mongoose.Schema.Types.ObjectId, ref: 'Pizza' },
    quantidade: { type: Number, default: 1 }
  }],
  total: { type: Number, required: true },
  status: { 
    type: String, 
    enum: ['Recebido', 'Em Preparo', 'Saiu para Entrega', 'Entregue'], 
    default: 'Recebido' 
  },
  dataCriacao: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', OrderSchema);