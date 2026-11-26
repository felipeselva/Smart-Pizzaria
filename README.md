# 🍕 Pizzaria Smart - AI, Web & Mobile Realtime System

Sistema completo e multiplataforma de gestão de pizzaria com **Inteligência Artificial Generativa**, **Comunicação em Tempo Real** e arquitetura **API First**.

Desenvolvido para demonstrar a aplicação prática de tecnologias modernas integrando Backend, Web e Aplicativo Mobile em um único ecossistema (Node.js, MongoDB, WebSockets, LLMs e React Native).

---

## 🚀 Tecnologias Utilizadas

* **Backend:** Node.js, Express, JWT (Stateless Auth & Role-Based Access Control).
* **Database:** MongoDB (Atlas/Local) com Mongoose.
* **AI Integration:** Google Gemini API (RAG para contexto dinâmico do cardápio).
* **Realtime:** Socket.io & Socket.io-client (KDS e rastreamento de pedidos ao vivo).
* **Frontend Web:** EJS (Server-Side Rendering), TailwindCSS, Chart.js.
* **Frontend Mobile:** React Native (Expo), React Navigation, Axios, AsyncStorage.

---

## 🌟 Funcionalidades Principais

### 1. Garçom Inteligente (AI Agent) 🤖
* Chatbot integrado (Web e Mobile) que consulta o cardápio do banco de dados em tempo real.
* Responde dúvidas sobre ingredientes, categorias e preços.
* **Agentic Workflow:** Compreende a intenção de compra e lança pedidos diretamente no sistema.

### 2. Dashboard Administrativo & CMS 📊
* Métricas financeiras e operacionais em tempo real (Faturamento Total, Volume de Pedidos e Ticket Médio).
* **CRUD Completo de Produtos:** Cadastrar, editar e excluir pizzas diretamente pelo painel Web ou pelo App Mobile.
* **Sincronização Instantânea:** Qualquer alteração no cardápio reflete imediatamente para os clientes e na base de conhecimento da IA.

### 3. Cozinha em Tempo Real (KDS - Kitchen Display System) 👨‍🍳
* Painel dedicado para a equipe da cozinha receber novos pedidos instantaneamente via WebSockets, sem necessidade de recarregar a tela.
* Controle de fluxo de produção: `Recebido` ➔ `Em Preparo` ➔ `Saiu para Entrega` ➔ `Entregue`.

### 4. Experiência do Cliente & E-commerce (Web & Mobile) 🛒
* Catálogo dinâmico com carrinho de compras e persistência de sessão.
* **Meus Pedidos (Live Tracking):** Histórico e acompanhamento de status atualizado automaticamente em tempo real a cada avanço da cozinha.

---

## 🛠️ Como Rodar o Projeto

### Pré-requisitos
* Node.js instalado
* MongoDB (local ou URI do MongoDB Atlas)
* Chave de API do Google Gemini
* Aplicativo **Expo Go** instalado no smartphone (para testar o mobile)

### 1. Backend & Frontend Web
1. Clone o repositório e acesse a pasta do servidor.
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Crie um arquivo `.env` na raiz com as suas credenciais:
   ```env
   PORT=3000
   MONGO_URI=sua_string_de_conexao_mongodb
   GEMINI_API_KEY=sua_chave_api_gemini
   JWT_SECRET=sua_chave_secreta_jwt
   ```
4. Inicie o servidor:
   ```bash
   npm start
   ```
5. Acesse a versão Web em `http://localhost:3000`.

### 2. Aplicativo Mobile (React Native / Expo)
1. Acesse a pasta do projeto mobile (`smart-pizzaria-mobile`) e instale as dependências:
   ```bash
   npm install
   ```
2. Configure o endereço IPv4 da sua máquina (onde o backend está rodando) nos arquivos de conexão:
   * `src/services/api.js` (na `baseURL`)
   * `src/screens/KDS.js` (na constante `SOCKET_URL`)
   * `src/screens/MyOrders.js` (na constante `SOCKET_URL`)
3. Inicie o servidor do Expo:
   ```bash
   npx expo start
   ```
4. Escaneie o QR Code com o aplicativo **Expo Go** (certifique-se de que o celular e o computador estejam na mesma rede).

---

Desenvolvido por **Felipe Selva**
