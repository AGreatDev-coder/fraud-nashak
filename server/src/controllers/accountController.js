import { SEED_ACCOUNTS } from '../data/seedSource.js';
import { Account } from '../models/Account.js';
import { isConnectedToMongo } from '../config/db.js';

let inMemoryAccounts = [...SEED_ACCOUNTS];

export const getAccounts = async (req, res, next) => {
  try {
    if (isConnectedToMongo) {
      const accounts = await Account.find().sort({ riskScore: -1 });
      return res.json({ success: true, count: accounts.length, data: accounts });
    }
    res.json({ success: true, count: inMemoryAccounts.length, data: inMemoryAccounts });
  } catch (error) {
    next(error);
  }
};

export const getAccountByNumber = async (req, res, next) => {
  try {
    const { accountNumber } = req.params;

    if (isConnectedToMongo) {
      const acc = await Account.findOne({ accountNumber });
      if (!acc) return res.status(404).json({ success: false, message: 'Account dossier not found' });
      return res.json({ success: true, data: acc });
    }

    const acc = inMemoryAccounts.find(a => a.accountNumber === accountNumber);
    if (!acc) return res.status(404).json({ success: false, message: 'Account dossier not found' });
    res.json({ success: true, data: acc });
  } catch (error) {
    next(error);
  }
};

export const updateAccountStatus = async (req, res, next) => {
  try {
    const { accountNumber } = req.params;
    const { status } = req.body;

    if (isConnectedToMongo) {
      const acc = await Account.findOneAndUpdate(
        { accountNumber },
        { status },
        { new: true }
      );
      if (!acc) return res.status(404).json({ success: false, message: 'Account not found' });
      return res.json({ success: true, data: acc });
    }

    const accIndex = inMemoryAccounts.findIndex(a => a.accountNumber === accountNumber);
    if (accIndex === -1) return res.status(404).json({ success: false, message: 'Account not found' });
    inMemoryAccounts[accIndex].status = status;
    res.json({ success: true, data: inMemoryAccounts[accIndex] });
  } catch (error) {
    next(error);
  }
};
