const express = require('express');
const router = express.Router();

// --- IMPORTAÇÕES (AQUI ESTAVA O ERRO) ---

// 1. Importa o Controller de Autenticação
const authController = require('../controllers/api/authController');

// 2. Importa o Controller de Pizzas (Faltava esta linha!)
// Certifique-se que o arquivo existe em src/controllers/api/pizzaApiController.js
const pizzaController = require('../controllers/api/pizzaApiController'); 

// 3. Importa os Middlewares de Segurança
const { protect, adminOnly } = require('../middlewares/authMiddleware');

const chatController = require('../controllers/api/chatController'); // <--- Importe aqui
const orderController = require('../controllers/api/orderApiController'); // Importe o novo controller


// --- ROTAS ---

// Auth
router.post('/auth/register', authController.register);
router.post('/auth/login', authController.login);
router.post('/auth/logout', authController.logout);

// Pizzas
// GET /pizzas -> Qualquer um ver
router.get('/pizzas', pizzaController.listPizzas);

// POST /pizzas -> Só Admin cria (Token + Role Admin)
router.post('/pizzas', protect, adminOnly, pizzaController.createPizza);
router.post('/chat', protect, chatController.sendMessage);// POST /orders -> Criar pedido (Protegido: só quem tem Token pede)
router.post('/orders', protect, orderController.createOrder);
router.get('/orders', protect, orderController.listMyOrders);
router.patch('/orders/:id/status', protect, orderController.updateStatus);
router.put('/pizzas/:id', protect, adminOnly, pizzaController.updatePizza);
router.delete('/pizzas/:id', protect, adminOnly, pizzaController.deletePizza);
module.exports = router;