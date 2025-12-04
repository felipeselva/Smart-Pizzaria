const AuthService = require('../../services/AuthService');

exports.register = async (req, res) => {
  try {
    const { nome, email, password } = req.body;
    const { user, token } = await AuthService.registerUser(nome, email, password);

    // Define cookie para caso esteja usando via navegador também
    res.cookie('token', token, { httpOnly: true, maxAge: 7 * 24 * 60 * 60 * 1000 });

    res.status(201).json({ success: true, token, user });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { user, token } = await AuthService.loginUser(email, password);

    // Define cookie HttpOnly (Segurança máxima para Web)
    res.cookie('token', token, { httpOnly: true });

    res.json({ success: true, token, user });
  } catch (error) {
    res.status(401).json({ success: false, error: error.message });
  }
};

// ... (código anterior do register e login)

exports.logout = (req, res) => {
    // Manda o navegador apagar o cookie
    res.clearCookie('token', { path: '/' });
    
    // Responde sucesso
    res.json({ success: true, message: 'Deslogado com sucesso' });
};