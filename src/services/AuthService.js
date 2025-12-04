const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Função auxiliar para gerar Token
const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role }, 
    process.env.JWT_SECRET, 
    { expiresIn: '7d' } // Token expira em 7 dias
  );
};

exports.registerUser = async (nome, email, password) => {
  const userExists = await User.findOne({ email });
  if (userExists) {
    throw new Error('Email já cadastrado.');
  }
  
  const user = await User.create({ nome, email, password });
  const token = generateToken(user);

  return { user, token };
};

exports.loginUser = async (email, password) => {
  // Precisamos do .select('+password') porque definimos select: false no model
  const user = await User.findOne({ email }).select('+password');

  if (!user || !(await user.checkPassword(password))) {
    throw new Error('Email ou senha inválidos.');
  }

  const token = generateToken(user);
  
  // Removemos a senha do objeto de retorno por segurança
  user.password = undefined; 

  return { user, token };
};