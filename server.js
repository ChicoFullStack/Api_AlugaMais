const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./src/config/db');
const apiRoutes = require('./src/routes');
const cors = require('cors');




// Carregar variáveis de ambiente
dotenv.config();

// Conectar ao banco de dados
connectDB();

const app = express();

// Middleware para parsing de JSON no corpo das requisições
app.use(express.json());

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));


// Rotas da APIapi
app.use('/api', apiRoutes);



const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
