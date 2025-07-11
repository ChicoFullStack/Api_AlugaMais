const mongoose = require('mongoose');

const ContractSchema = mongoose.Schema({
  property: {
    type: mongoose.Schema.Types.ObjectId, // Referência ao modelo Property
    ref: 'Property',
    required: true,
  },
  tenant: {
    type: mongoose.Schema.Types.ObjectId, // Referência ao modelo Tenant
    ref: 'Tenant',
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
  },
  rentAmount: {
    type: Number,
    required: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  // Adicione outros campos relevantes para contratos (ex: data de vencimento do aluguel, multas, etc.)
}, {
  timestamps: true,
});

const Contract = mongoose.model('Contract', ContractSchema);

module.exports = Contract;
