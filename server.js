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

// Use the cors middleware
// Lista de domínios permitidos
const allowedOrigins = [
  'https://9000-firebase-studio-1749744816547.cluster-duylic2g3fbzerqpzxxbw6helm.cloudworkstations.dev',
];

app.use(cors({
  origin: function (origin, callback) {
    // Permite requisições sem origem (como de ferramentas internas) ou está na lista
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true, // Se for necessário enviar cookies ou autenticação
}));

// Rotas da APIapi
app.use('/api', apiRoutes);



const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
