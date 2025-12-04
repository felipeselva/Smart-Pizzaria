require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cookieParser = require('cookie-parser');
const cors = require('cors');
// 1. Importa http e socket.io
const http = require('http');
const { Server } = require('socket.io');

const app = express();
// 2. Cria o servidor HTTP explicitamente
const server = http.createServer(app);
// 3. Inicializa o Socket.io
const io = new Server(server);

// --- Configuração do Banco de Dados ---
mongoose.connect(process.env.MONGO_URI, {
    serverSelectionTimeoutMS: 5000
}).then(() => console.log('✅ MongoDB Conectado')).catch(err => console.error('❌ Erro no Mongo:', err));

// --- Torna o 'io' acessível em todas as rotas ---
app.use((req, res, next) => {
    req.io = io;
    next();
});

// ... (Middlewares: json, urlencoded, cookie, static, cors) ...
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src/views'));

// ... (Rotas) ...
const apiRoutes = require('./src/routes/api.routes');
const webRoutes = require('./src/routes/web.routes');
app.use('/api/v1', apiRoutes);
app.use('/', webRoutes);

// 4. Escuta eventos de conexão (opcional, só pra debug)
io.on('connection', (socket) => {
    console.log('🔌 Um cliente se conectou pelo Socket!');
});

// 5. IMPORTANTE: Troque app.listen por server.listen
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`🍕 Pizzaria Inteligente rodando na porta ${PORT}`);
  console.log(`🔗 Web: http://localhost:${PORT}`);
  console.log(`🔗 API: http://localhost:${PORT}/api/v1`);
});