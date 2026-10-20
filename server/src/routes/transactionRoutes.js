import express from 'express';
import { 
  getTransactions, 
  getTransactionByUtr, 
  createTransaction 
} from '../controllers/transactionController.js';
import { validateUtr } from '../middleware/validator.js';
import { requireRole, ROLES } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getTransactions);
router.get('/:utr', validateUtr, getTransactionByUtr);
router.post('/', requireRole([ROLES.INVESTIGATOR_LEAD]), createTransaction);

export default router;

