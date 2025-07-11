const express = require('express');
const router = express.Router();
const Tenant = require('../models/Tenant'); // Importa o modelo Tenant

// @desc    Obter todos os inquilinos
// @route   GET /api/tenants
router.get('/', async (req, res) => {
  try {
    const tenants = await Tenant.find({});
    res.json(tenants);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @desc    Obter um único inquilino por ID
// @route   GET /api/tenants/:id
router.get('/:id', async (req, res) => {
  try {
    const tenant = await Tenant.findById(req.params.id);
    if (tenant) {
      res.json(tenant);
    } else {
      res.status(404).json({ message: 'Inquilino não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @desc    Criar um novo inquilino
// @route   POST /api/tenants
router.post('/', async (req, res) => {
  const { name, cpf, phone, email, rentalHistory } = req.body;

  try {
    const tenant = new Tenant({
      name,
      cpf,
      phone,
      email,
      rentalHistory,
    });

    const createdTenant = await tenant.save();
    res.status(201).json(createdTenant);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @desc    Atualizar um inquilino por ID
// @route   PUT /api/tenants/:id
router.put('/:id', async (req, res) => {
  const { name, cpf, phone, email, rentalHistory } = req.body;

  try {
    const tenant = await Tenant.findById(req.params.id);

    if (tenant) {
      tenant.name = name || tenant.name;
      tenant.cpf = cpf || tenant.cpf;
      tenant.phone = phone || tenant.phone;
      tenant.email = email || tenant.email;
      tenant.rentalHistory = rentalHistory || tenant.rentalHistory;

      const updatedTenant = await tenant.save();
      res.json(updatedTenant);
    } else {
      res.status(404).json({ message: 'Inquilino não encontrado' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @desc    Excluir um inquilino por ID
// @route   DELETE /api/tenants/:id
router.delete('/:id', async (req, res) => {
  try {
    const tenant = await Tenant.findById(req.params.id);

    if (tenant) {
      await tenant.deleteOne();
      res.json({ message: 'Inquilino removido' });
    } else {
      res.status(404).json({ message: 'Inquilino não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
