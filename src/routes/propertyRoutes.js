const express = require('express');
const router = express.Router();
const Property = require('../models/Property'); // Importa o modelo Property

// @desc    Obter todas as propriedades
// @route   GET /api/properties
router.get('/', async (req, res) => {
  try {
    const properties = await Property.find({});
    res.json(properties);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @desc    Obter uma única propriedade por ID
// @route   GET /api/properties/:id
router.get('/:id', async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (property) {
      res.json(property);
    } else {
      res.status(404).json({ message: 'Propriedade não encontrada' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @desc    Criar uma nova propriedade
// @route   POST /api/properties
router.post('/', async (req, res) => {
  const { address, city, state, zipCode, rentPrice } = req.body;

  try {
    const property = new Property({
      address,
      city,
      state,
      zipCode,
      rentPrice,
    });

    const createdProperty = await property.save();
    res.status(201).json(createdProperty);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @desc    Atualizar uma propriedade por ID
// @route   PUT /api/properties/:id
router.put('/:id', async (req, res) => {
  const { address, city, state, zipCode, rentPrice } = req.body;

  try {
    const property = await Property.findById(req.params.id);

    if (property) {
      property.address = address || property.address;
      property.city = city || property.city;
      property.state = state || property.state;
      property.zipCode = zipCode || property.zipCode;
      property.rentPrice = rentPrice || property.rentPrice;

      const updatedProperty = await property.save();
      res.json(updatedProperty);
    } else {
      res.status(404).json({ message: 'Propriedade não encontrada' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @desc    Excluir uma propriedade por ID
// @route   DELETE /api/properties/:id
router.delete('/:id', async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);

    if (property) {
      await property.deleteOne();
      res.json({ message: 'Propriedade removida' });
    } else {
      res.status(404).json({ message: 'Propriedade não encontrada' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
