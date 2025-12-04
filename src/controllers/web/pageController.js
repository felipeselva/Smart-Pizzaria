const Order = require('../../models/Order');
const Pizza = require('../../models/Pizza');

// Renderiza Login
exports.renderLogin = (req, res) => {
  if (req.cookies.token) {
    return res.redirect('/');
  }
  res.render('pages/login');
};

// Renderiza Registro
exports.renderRegister = (req, res) => {
  if (req.cookies.token) {
    return res.redirect('/');
  }
  res.render('pages/register');
};

// Renderiza Home (Cardápio)
exports.renderHome = (req, res) => {
  res.render('pages/home', { 
    user: req.user 
  });
};

// Renderiza Meus Pedidos
exports.renderMyOrders = (req, res) => {
  res.render('pages/orders', {
    user: req.user
  });
};

// Renderiza Cozinha (KDS)
exports.renderKitchen = async (req, res) => {
    // Busca pedidos ativos (não entregues)
    const pedidos = await Order.find({ 
        status: { $ne: 'Entregue' } 
    })
    .sort({ dataCriacao: 1 })
    .populate('itens.pizza');
    
    res.render('pages/kitchen', { pedidos, user: req.user });
};

// Renderiza Dashboard (Painel do Dono + CRUD)
exports.renderDashboard = async (req, res) => {
    try {
        // 1. Mágica: Faturamento Total
        const faturamento = await Order.aggregate([
            { $match: { status: { $ne: 'Cancelado' } } },
            { $group: { _id: null, total: { $sum: "$total" } } }
        ]);
        const totalVendas = faturamento.length > 0 ? faturamento[0].total : 0;

        // 2. Mágica: Contagem por Status para o Gráfico
        const pedidosPorStatus = await Order.aggregate([
            { $group: { _id: "$status", count: { $sum: 1 } } }
        ]);

        // 3. Últimos Pedidos
        const ultimosPedidos = await Order.find()
            .sort({ dataCriacao: -1 })
            .limit(5)
            .populate('user');

        // 4. Todas as Pizzas (Para a tabela de CRUD)
        const todasPizzas = await Pizza.find().sort({ nome: 1 });

        // Renderiza a tela passando tudo isso
        res.render('pages/dashboard', { 
            user: req.user,
            kpis: {
                totalVendas,
                totalPedidos: await Order.countDocuments(),
                ticketMedio: (totalVendas / (await Order.countDocuments() || 1))
            },
            ultimosPedidos,
            statusData: pedidosPorStatus,
            todasPizzas 
        });

    } catch (error) {
        console.error("Erro no Dashboard:", error);
        res.status(500).send("Erro ao carregar dashboard");
    }
};