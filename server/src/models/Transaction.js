import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
  utr: { type: String, required: true, unique: true, index: true },
  timestamp: { type: String, required: true },
  senderAccount: { type: String, required: true, index: true },
  senderName: { type: String, required: true },
  senderBank: { type: String, required: true },
  senderIfsc: { type: String, required: true },
  receiverAccount: { type: String, required: true, index: true },
  receiverName: { type: String, required: true },
  receiverBank: { type: String, required: true },
  receiverIfsc: { type: String, required: true },
  amount: { type: Number, required: true, index: true },
  formattedAmount: { type: String, required: true },
  channel: { type: String, enum: ['UPI', 'IMPS', 'RTGS', 'NEFT', 'CASH_ATM'], required: true },
  riskScore: { type: Number, required: true, index: true },
  riskSeverity: { type: String, enum: ['Critical', 'High', 'Medium', 'Low'], required: true },
  pattern: { type: String, default: 'None' },
  ruleTriggered: { type: String, default: 'NONE' },
  ruleDescription: { type: String },
  ipAddress: { type: String },
  deviceLocation: { type: String },
  narration: { type: String },
  flagged: { type: Boolean, default: false, index: true }
}, { timestamps: true });

export const Transaction = mongoose.model('Transaction', transactionSchema);
