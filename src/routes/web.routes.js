const express = require('express');
const router = express.Router();
const pageController = require('../controllers/web/pageController');
const { protect } = require('../middlewares/authMiddleware');

// Rota de Login (Pública)
router.get('/login', pageController.renderLogin);
router.get('/register', pageController.renderRegister);
// Rota da Home (Protegida - Só entra com Token/Cookie)
router.get('/', protect, pageController.renderHome);

router.get('/meus-pedidos', protect, pageController.renderMyOrders);
router.get('/cozinha', protect, pageController.renderKitchen); 
// Apenas para admin!
const { adminOnly } = require('../middlewares/authMiddleware');
router.get('/dashboard', protect, adminOnly, pageController.renderDashboard);
module.exports = router;