const express = require('express');
const router = express.Router();
const Contract = require('../models/Contract'); // Importa o modelo Contract

// @desc    Obter todos os contratos
// @route   GET /api/contracts
router.get('/', async (req, res) => {
  try {
    // Usamos .populate() para trazer as informações completas de property e tenant
    const contracts = await Contract.find({}).populate('property').populate('tenant');
    res.json(contracts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @desc    Obter um único contrato por ID
// @route   GET /api/contracts/:id
router.get('/:id', async (req, res) => {
  try {
    const contract = await Contract.findById(req.params.id).populate('property').populate('tenant');
    if (contract) {
      res.json(contract);
    } else {
      res.status(404).json({ message: 'Contrato não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @desc    Criar um novo contrato
// @route   POST /api/contracts
router.post('/', async (req, res) => {
  const { property, tenant, startDate, endDate, rentAmount, isActive } = req.body;

  try {
    const contract = new Contract({
      property,
      tenant,
      startDate,
      endDate,
      rentAmount,
      isActive,
    });

    const createdContract = await contract.save();
    // Opcional: Popular o contrato criado antes de enviar a resposta
    // await createdContract.populate('property').populate('tenant').execPopulate();
    res.status(201).json(createdContract);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @desc    Atualizar um contrato por ID
// @route   PUT /api/contracts/:id
router.put('/:id', async (req, res) => {
  const { property, tenant, startDate, endDate, rentAmount, isActive } = req.body;

  try {
    const contract = await Contract.findById(req.params.id);

    if (contract) {
      contract.property = property || contract.property;
      contract.tenant = tenant || contract.tenant;
      contract.startDate = startDate || contract.startDate;
      contract.endDate = endDate || contract.endDate;
      contract.rentAmount = rentAmount || contract.rentAmount;
      contract.isActive = isActive !== undefined ? isActive : contract.isActive;

      const updatedContract = await contract.save();
      // Opcional: Popular o contrato atualizado antes de enviar a resposta
      // await updatedContract.populate('property').populate('tenant').execPopulate();
      res.json(updatedContract);
    } else {
      res.status(404).json({ message: 'Contrato não encontrado' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @desc    Excluir um contrato por ID
// @route   DELETE /api/contracts/:id
router.delete('/:id', async (req, res) => {
  try {
    const contract = await Contract.findById(req.params.id);

    if (contract) {
      await contract.deleteOne();
      res.json({ message: 'Contrato removido' });
    } else {
      res.status(404).json({ message: 'Contrato não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
