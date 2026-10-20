import mongoose from 'mongoose';

const riskIndicatorSchema = new mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  category: { type: String, required: true },
  points: { type: Number, required: true },
  maxPoints: { type: Number, required: true },
  severity: { type: String, required: true },
  condition: { type: String, required: true },
  evidence: { type: String, required: true },
  triggered: { type: Boolean, default: true }
});

const counterpartySchema = new mongoose.Schema({
  accountNumber: { type: String, required: true },
  holderName: { type: String, required: true },
  bank: { type: String, required: true },
  relationship: { type: String, required: true },
  volumeExchanged: { type: String, required: true },
  transactionCount: { type: Number, default: 1 },
  direction: { type: String, enum: ['Inflow', 'Outflow'], required: true },
  counterpartyRisk: { type: Number, required: true }
});

// Lightweight transaction reference embedded in account dossier
const accountTransactionSchema = new mongoose.Schema({
  utr: { type: String, required: true },
  timestamp: { type: String },
  direction: { type: String, enum: ['Inflow', 'Outflow'] },
  counterparty: { type: String },
  amount: { type: String },
  channel: { type: String },
  pattern: { type: String },
  riskScore: { type: Number }
});

const accountSchema = new mongoose.Schema({
  accountNumber: { type: String, required: true, unique: true, index: true },
  holderName: { type: String, required: true },
  accountPersona: { type: String, required: true },
  bank: { type: String, required: true },
  branch: { type: String },
  ifsc: { type: String, required: true },
  openedDate: { type: String },
  kycStatus: { type: String, default: 'Pending' },
  panHash: { type: String },
  riskScore: { type: Number, required: true, min: 0, max: 100, index: true },
  riskSeverity: { type: String, enum: ['Critical', 'High', 'Medium', 'Low'], required: true },
  primaryFlag: { type: String },
  recommendedAction: { type: String },
  status: { type: String, default: 'Under Investigation' },
  velocityMetrics: {
    inflow24h: String,
    inflowCount24h: Number,
    outflow24h: String,
    outflowCount24h: Number,
    netRetainedBalance: String,
    retentionRate: String,
    avgHoldingTime: String,
    turnoverSpikeRatio: String,
    baselineMonthlyAvg: String
  },
  riskIndicators: [riskIndicatorSchema],
  counterparties: [counterpartySchema],
  transactions: [accountTransactionSchema]
}, { timestamps: true });

export const Account = mongoose.model('Account', accountSchema);
