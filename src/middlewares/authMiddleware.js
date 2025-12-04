const jwt = require('jsonwebtoken');

exports.protect = (req, res, next) => {
  let token;

  // 1. Tenta pegar do Header (Padrão API/Mobile)
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  } 
  // 2. Se não achou, tenta pegar do Cookie (Padrão Web)
  else if (req.cookies.token) {
    token = req.cookies.token;
  }

  if (!token) {
    // Se for requisição de API, retorna JSON
    if (req.originalUrl.startsWith('/api')) {
      return res.status(401).json({ error: 'Não autorizado, faça login.' });
    }
    // Se for acesso via Web, redireciona para login
    return res.redirect('/login');
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Coloca o ID e Role na requisição
    next();
  } catch (error) {
    if (req.originalUrl.startsWith('/api')) {
      return res.status(401).json({ error: 'Token inválido.' });
    }
    return res.redirect('/login');
  }
};

// Middleware extra para permitir apenas Admins
exports.adminOnly = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Acesso negado. Apenas admins.' });
  }
  next();
};