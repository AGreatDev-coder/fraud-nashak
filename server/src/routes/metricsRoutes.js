import express from 'express';
import { getDashboardMetrics } from '../controllers/metricsController.js';

const router = express.Router();
router.get('/dashboard', getDashboardMetrics);

export default router;
