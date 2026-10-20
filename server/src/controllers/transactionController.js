import { SEED_TRANSACTIONS } from '../data/seedSource.js';
import { Transaction } from '../models/Transaction.js';
import { isConnectedToMongo } from '../config/db.js';

let inMemoryTransactions = [...SEED_TRANSACTIONS];

export const getTransactions = async (req, res, next) => {
  try {
    const { search, severity, channel, pattern, minAmount, maxAmount } = req.query;

    if (isConnectedToMongo) {
      const query = {};
      if (search) {
        query.$or = [
          { utr: new RegExp(search, 'i') },
          { senderAccount: new RegExp(search, 'i') },
          { receiverAccount: new RegExp(search, 'i') },
          { senderName: new RegExp(search, 'i') },
          { receiverName: new RegExp(search, 'i') }
        ];
      }
      if (severity && severity !== 'ALL') query.riskSeverity = severity;
      if (channel && channel !== 'ALL') query.channel = channel;
      if (pattern && pattern !== 'ALL') query.pattern = pattern;
      if (minAmount) query.amount = { ...query.amount, $gte: Number(minAmount) };
      if (maxAmount) query.amount = { ...query.amount, $lte: Number(maxAmount) };

      const txns = await Transaction.find(query).sort({ timestamp: -1 });
      return res.json({ success: true, count: txns.length, data: txns });
    }

    // In-memory fallback filter
    let results = [...inMemoryTransactions];

    if (search) {
      const q = search.toLowerCase();
      results = results.filter(tx => 
        tx.utr.toLowerCase().includes(q) ||
        tx.senderAccount.toLowerCase().includes(q) ||
        tx.receiverAccount.toLowerCase().includes(q) ||
        tx.senderName.toLowerCase().includes(q) ||
        tx.receiverName.toLowerCase().includes(q)
      );
    }
    if (severity && severity !== 'ALL') {
      results = results.filter(tx => tx.riskSeverity === severity);
    }
    if (channel && channel !== 'ALL') {
      results = results.filter(tx => tx.channel === channel);
    }
    if (pattern && pattern !== 'ALL') {
      results = results.filter(tx => tx.pattern === pattern);
    }
    if (minAmount) {
      results = results.filter(tx => tx.amount >= Number(minAmount));
    }
    if (maxAmount) {
      results = results.filter(tx => tx.amount <= Number(maxAmount));
    }

    res.json({ success: true, count: results.length, data: results });
  } catch (error) {
    next(error);
  }
};

export const getTransactionByUtr = async (req, res, next) => {
  try {
    const { utr } = req.params;

    if (isConnectedToMongo) {
      const txn = await Transaction.findOne({ utr });
      if (!txn) return res.status(404).json({ success: false, message: 'Transaction not found' });
      return res.json({ success: true, data: txn });
    }

    const txn = inMemoryTransactions.find(t => t.utr === utr);
    if (!txn) return res.status(404).json({ success: false, message: 'Transaction not found' });
    res.json({ success: true, data: txn });
  } catch (error) {
    next(error);
  }
};

export const createTransaction = async (req, res, next) => {
  try {
    const newTxn = req.body;
    if (isConnectedToMongo) {
      const created = await Transaction.create(newTxn);
      return res.status(201).json({ success: true, data: created });
    }

    inMemoryTransactions.unshift(newTxn);
    res.status(201).json({ success: true, data: newTxn });
  } catch (error) {
    next(error);
  }
};
