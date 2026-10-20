import express from 'express';
import { generateCaseReport } from '../controllers/reportController.js';

const router = express.Router();

// Report generation endpoint available to all authenticated clearances
router.get('/:caseId', generateCaseReport);

export default router;
