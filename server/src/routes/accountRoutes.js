import express from 'express';
import { 
  getAccounts, 
  getAccountByNumber, 
  updateAccountStatus 
} from '../controllers/accountController.js';
import { validateAccountNumber } from '../middleware/validator.js';
import { requireRole, ROLES } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getAccounts);
router.get('/:accountNumber', validateAccountNumber, getAccountByNumber);
router.patch(
  '/:accountNumber/status', 
  validateAccountNumber, 
  requireRole([ROLES.INVESTIGATOR_LEAD]), 
  updateAccountStatus
);

export default router;

