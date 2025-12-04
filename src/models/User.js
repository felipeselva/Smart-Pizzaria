const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true, select: false }, // select: false impede que a senha venha em buscas normais
  role: { 
    type: String, 
    enum: ['cliente', 'admin', 'garcom'], 
    default: 'cliente' 
  },
  createdAt: { type: Date, default: Date.now }
});

UserSchema.pre('save', async function() {
  // Se a senha não foi modificada, apenas retorna (sai da função)
  if (!this.isModified('password')) return;

// Criptografa a senha esperando o processo terminar (await)
  this.password = await bcrypt.hash(this.password, 10);
});

// Método auxiliar para checar senha
UserSchema.methods.checkPassword = function(password) {
  return bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('User', UserSchema);