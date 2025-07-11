const mongoose = require('mongoose');

const PropertySchema = mongoose.Schema({
  address: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  zipCode: {
    type: String,
    required: true,
  },
  rentPrice: {
    type: Number,
    required: true,
  },
  // Adicione outros campos relevantes para propriedades (ex: tipo, quartos, banheiros, etc.)
}, {
  timestamps: true, // Adiciona campos createdAt e updatedAt automaticamente
});

const Property = mongoose.model('Property', PropertySchema);

module.exports = Property;
