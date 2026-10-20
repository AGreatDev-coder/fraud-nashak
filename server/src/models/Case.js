import mongoose from 'mongoose';

const pinnedEvidenceSchema = new mongoose.Schema({
  id: { type: String, required: true },
  type: { type: String, enum: ['ACCOUNT', 'TRANSACTION'], required: true },
  accountNumber: String,
  holderName: String,
  bank: String,
  riskScore: Number,
  utr: String,
  amount: String,
  channel: String,
  timestamp: String,
  rule: String,
  detail: String
});

const timelineSchema = new mongoose.Schema({
  id: { type: String, required: true },
  timestamp: { type: String, required: true },
  actor: { type: String, required: true },
  action: { type: String, required: true },
  detail: { type: String, required: true }
});

const noteSchema = new mongoose.Schema({
  id: { type: String, required: true },
  author: { type: String, required: true },
  timestamp: { type: String, required: true },
  content: { type: String, required: true }
});

const caseSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true, index: true },
  title: { type: String, required: true },
  category: { type: String, required: true },
  priority: { type: String, enum: ['Critical', 'High', 'Medium', 'Low'], default: 'High' },
  status: { type: String, default: 'Open', index: true },
  createdDate: { type: String, required: true },
  assignedInvestigator: { type: String, default: 'Officer S. Sharma (Lead Cyber FIU)' },
  targetAccount: { type: String, required: true },
  targetHolder: { type: String },
  targetBank: { type: String },
  volumeAtRisk: { type: String },
  summary: { type: String },
  pinnedEvidence: [pinnedEvidenceSchema],
  timeline: [timelineSchema],
  notes: [noteSchema]
}, { timestamps: true });

export const Case = mongoose.model('Case', caseSchema);
