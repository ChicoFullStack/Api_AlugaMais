const express = require('express');
const router = express.Router();

const propertyRoutes = require('./propertyRoutes');
const tenantRoutes = require('./tenantRoutes');
const contractRoutes = require('./contractRoutes');

// Agrupa as rotas da aplicação
router.use('/api/properties', propertyRoutes);
router.use('/api/tenants', tenantRoutes);
router.use('/api/contracts', contractRoutes);

module.exports = router;
