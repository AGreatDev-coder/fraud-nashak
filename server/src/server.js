import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { connectDB, isConnectedToMongo } from './config/db.js';
import metricsRoutes from './routes/metricsRoutes.js';
import transactionRoutes from './routes/transactionRoutes.js';
import accountRoutes from './routes/accountRoutes.js';
import caseRoutes from './routes/caseRoutes.js';
import graphRoutes from './routes/graphRoutes.js';
import reportRoutes from './routes/reportRoutes.js';
import { errorHandler } from './middleware/errorHandler.js';
import { investigatorAuth } from './middleware/auth.js';
import { sanitizeQuery } from './middleware/validator.js';
import { auditMiddleware, systemAuditTrail } from './middleware/auditLogger.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(sanitizeQuery);
app.use(investigatorAuth);
app.use(auditMiddleware);

if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}

// System Health Check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'HEALTHY',
    service: 'Fraud-Naashak Financial Intelligence Engine',
    timestamp: new Date().toISOString(),
    database: isConnectedToMongo ? 'MongoDB Connected' : 'High-Availability In-Memory Active',
    activeRulesEngine: 'Deterministic v1.0',
    securityClearanceActive: true
  });
});

// Forensic Audit Trail Ledger Endpoint
app.get('/api/audit-trail', (req, res) => {
  res.json({
    success: true,
    count: systemAuditTrail.length,
    data: systemAuditTrail
  });
});

// Mount Forensic API Routes
app.use('/api/metrics', metricsRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api/accounts', accountRoutes);
app.use('/api/cases', caseRoutes);
app.use('/api/graph', graphRoutes);
app.use('/api/reports', reportRoutes);


// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `API endpoint '${req.originalUrl}' does not exist on Fraud-Naashak engine.`
  });
});

// Centralized Error Handler
app.use(errorHandler);

// Start Server
const server = app.listen(PORT, async () => {
  await connectDB();
  console.log(`[Fraud-Naashak Server]: Listening on http://localhost:${PORT}`);
  console.log(`[Health Endpoint]: http://localhost:${PORT}/api/health`);
});

export default app;
