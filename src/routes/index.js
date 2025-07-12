const express = require('express');
const router = express.Router();

const propertyRoutes = require('./propertyRoutes');
const tenantRoutes = require('./tenantRoutes');
const contractRoutes = require('./contractRoutes');

// Agrupa as rotas da aplicação
router.use('/properties', propertyRoutes);
router.use('/tenants', tenantRoutes);
router.use('/contracts', contractRoutes);

module.exports = router;
