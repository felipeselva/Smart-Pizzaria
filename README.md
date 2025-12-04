# 🍕 Pizzaria Smart - AI & Realtime System

Sistema completo de gestão de pizzaria com **Inteligência Artificial Generativa**, **Atualização em Tempo Real** e arquitetura **API First**.

Desenvolvido como MVP para demonstrar aplicação prática de tecnologias modernas (Node.js, MongoDB, WebSocket e LLMs).

## 🚀 Tecnologias Utilizadas

* **Backend:** Node.js, Express, JWT (Stateless Auth).
* **Database:** MongoDB (Atlas/Local) com Mongoose.
* **AI Integration:** Google Gemini API (RAG para Contexto de Cardápio).
* **Realtime:** Socket.io (KDS - Kitchen Display System).
* **Frontend:** EJS (Server-side rendering), TailwindCSS, Chart.js.

## 🌟 Funcionalidades Principais

### 1. Garçom Inteligente (AI Agent) 🤖
* Chatbot integrado que lê o cardápio do banco de dados em tempo real.
* Responde dúvidas sobre ingredientes e preços.
* **Agentic Workflow:** Capaz de entender a intenção de compra e lançar pedidos complexos diretamente no sistema.

### 2. Dashboard Administrativo & CMS 📊
* Métricas de vendas em tempo real (Faturamento, Ticket Médio).
* CRUD completo de produtos (Cadastrar/Editar Pizzas).
* Atualização instantânea: Cadastrou no painel, aparece no site e na memória da IA.

### 3. Cozinha em Tempo Real (KDS) 👨‍🍳
* Painel para cozinheiros receberem pedidos sem recarregar a página (WebSockets).
* Gestão de status: Recebido -> Em Preparo -> Saiu para Entrega.

### 4. E-commerce Completo 🛒
* Carrinho de compras com persistência local.
* Autenticação segura e gestão de histórico de pedidos.

## 🛠️ Como Rodar

1.  Clone o repositório.
2.  Instale as dependências: `npm install`
3.  Configure o `.env` com `MONGO_URI` e `GEMINI_API_KEY`.
4.  Execute: `npm start` ou `npx nodemon server.js`
5.  Acesse: `http://localhost:3000`

---
*Desenvolvido por [Felipe Selva]*