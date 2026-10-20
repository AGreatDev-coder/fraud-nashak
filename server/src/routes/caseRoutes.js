import express from 'express';
import { 
  getCases, 
  getCaseById, 
  createCase, 
  updateCaseStatus, 
  addCaseNote, 
  removeEvidence,
  addEvidence
} from '../controllers/caseController.js';
import { requireRole, ROLES } from '../middleware/auth.js';

const router = express.Router();

// Read operations: Available to all clearances (Lead, Analyst, Auditor)
router.get('/', getCases);
router.get('/:id', getCaseById);

// Operational investigations: Lead & Analyst
router.post('/', requireRole([ROLES.INVESTIGATOR_LEAD, ROLES.FORENSIC_ANALYST]), createCase);
router.post('/:id/notes', requireRole([ROLES.INVESTIGATOR_LEAD, ROLES.FORENSIC_ANALYST]), addCaseNote);
router.post('/:id/evidence', requireRole([ROLES.INVESTIGATOR_LEAD, ROLES.FORENSIC_ANALYST]), addEvidence);

// High-consequence legal operations: Lead clearance only
router.patch('/:id/status', requireRole([ROLES.INVESTIGATOR_LEAD]), updateCaseStatus);
router.delete('/:id/evidence/:evidenceId', requireRole([ROLES.INVESTIGATOR_LEAD]), removeEvidence);

export default router;


