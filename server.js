const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./src/config/db');
const apiRoutes = require('./src/routes');
const propertyRoutes = require('./src/routes/propertyRoutes');
const tenantRoutes = require('./src/routes/tenantRoutes');
const contractRoutes = require('./src/routes/contractRoutes');




// Carregar variáveis de ambiente
dotenv.config();

// Conectar ao banco de dados
connectDB();

const app = express();

// Middleware para parsing de JSON no corpo das requisições
app.use(express.json());

// Rotas da APIapi
app.use('/api', apiRoutes);

app.use('/api/properties', propertyRoutes);
app.use('/api/tenants', tenantRoutes);
app.use('/api/contracts', contractRoutes);




const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
