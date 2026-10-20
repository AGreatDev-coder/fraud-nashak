import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Account } from '../models/Account.js';
import { Transaction } from '../models/Transaction.js';
import { Case } from '../models/Case.js';
import { SEED_ACCOUNTS, SEED_TRANSACTIONS, SEED_CASES } from '../data/seedSource.js';

dotenv.config();

const seed = async () => {
  const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/fraud_naashak';
  try {
    await mongoose.connect(mongoURI);
    console.log('[Seeder]: Connected to MongoDB.');

    // Clear existing collections
    await Account.deleteMany({});
    await Transaction.deleteMany({});
    await Case.deleteMany({});
    console.log('[Seeder]: Cleared existing collections.');

    // Seed Accounts
    await Account.insertMany(SEED_ACCOUNTS);
    console.log(`[Seeder]: Inserted ${SEED_ACCOUNTS.length} Account dossiers.`);

    // Seed Transactions
    await Transaction.insertMany(SEED_TRANSACTIONS);
    console.log(`[Seeder]: Inserted ${SEED_TRANSACTIONS.length} Transactions.`);

    // Seed Cases
    await Case.insertMany(SEED_CASES);
    console.log(`[Seeder]: Inserted ${SEED_CASES.length} Investigation cases.`);

    console.log('[Seeder]: Database successfully initialized!');
    process.exit(0);
  } catch (error) {
    console.error('[Seeder Error]:', error);
    process.exit(1);
  }
};

seed();
