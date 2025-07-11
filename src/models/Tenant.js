const mongoose = require('mongoose');

const TenantSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  cpf: {
    type: String,
    unique: true, // CPF deve ser único
  },
  phone: {
    type: String,
  },
  email: {
    type: String,
    unique: true, // Email deve ser único
  },
  rentalHistory: {
    type: String,
  },
  // Adicione outros campos relevantes para inquilinos
}, {
  timestamps: true,
});

const Tenant = mongoose.model('Tenant', TenantSchema);

module.exports = Tenant;
