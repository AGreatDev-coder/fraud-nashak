// Forensic Report Generation Controller — Fraud-Naashak PS-01
// Consolidates case files, entity dossiers, transaction ledgers, and audit trails into a formal legal package

import { Case } from '../models/Case.js';
import { Account } from '../models/Account.js';
import { isConnectedToMongo } from '../config/db.js';
import { SEED_CASES, SEED_ACCOUNTS } from '../data/seedSource.js';
import { systemAuditTrail } from '../middleware/auditLogger.js';

export const generateCaseReport = async (req, res, next) => {
  try {
    const { caseId } = req.params;
    const { template = 'COMPREHENSIVE' } = req.query;

    let targetCase = null;
    let targetAccount = null;

    if (isConnectedToMongo) {
      targetCase = await Case.findOne({ id: caseId });
      if (targetCase && targetCase.targetAccount) {
        targetAccount = await Account.findOne({ accountNumber: targetCase.targetAccount });
      }
    }

    // In-memory fallback
    if (!targetCase) {
      targetCase = SEED_CASES.find(c => c.id === caseId) || SEED_CASES[0];
    }
    if (!targetAccount && targetCase) {
      targetAccount = SEED_ACCOUNTS.find(a => a.accountNumber === targetCase.targetAccount) || SEED_ACCOUNTS[0];
    }

    if (!targetCase) {
      return res.status(404).json({
        success: false,
        message: `Case dossier #${caseId} not found.`
      });
    }

    const reportId = `FN-REP-${targetCase.id}-${new Date().getFullYear()}${String(new Date().getMonth() + 1).padStart(2, '0')}`;
    const generatedDate = new Date().toISOString().replace('T', ' ').substring(0, 19);

    // Filter audit trail events relevant to this case or account
    const relevantAuditLogs = systemAuditTrail.filter(log => 
      (log.endpoint && log.endpoint.includes(targetCase.id)) ||
      (targetAccount && log.endpoint && log.endpoint.includes(targetAccount.accountNumber))
    );

    const reportPayload = {
      reportId,
      template,
      generatedDate,
      classification: 'RESTRICTED // LAW ENFORCEMENT & BANK NODAL USE ONLY',
      disclaimer: 'OFFICIAL NOTICE: DEMONSTRATION RECORD — GENERATED USING SYNTHETIC BENCHMARK DATA (PS-01)',
      investigator: {
        name: req.investigator?.name || 'Officer S. Sharma',
        role: req.investigator?.role || 'INVESTIGATOR_LEAD',
        id: req.investigator?.id || 'IND-FIU-9021',
        agency: 'Cyber Crime & Financial Intelligence Cell (FIU Protocol)',
        jurisdiction: 'New Delhi / National Cyber Crime Coordination Centre'
      },
      caseOverview: {
        id: targetCase.id,
        title: targetCase.title,
        category: targetCase.category,
        priority: targetCase.priority,
        status: targetCase.status,
        createdDate: targetCase.createdDate,
        assignedInvestigator: targetCase.assignedInvestigator,
        volumeAtRisk: targetCase.volumeAtRisk,
        summary: targetCase.summary
      },
      targetAccount: targetAccount ? {
        accountNumber: targetAccount.accountNumber,
        holderName: targetAccount.holderName,
        accountPersona: targetAccount.accountPersona,
        bank: targetAccount.bank,
        branch: targetAccount.branch,
        ifsc: targetAccount.ifsc,
        openedDate: targetAccount.openedDate,
        kycStatus: targetAccount.kycStatus,
        panHash: targetAccount.panHash,
        riskScore: targetAccount.riskScore,
        riskSeverity: targetAccount.riskSeverity,
        primaryFlag: targetAccount.primaryFlag,
        recommendedAction: targetAccount.recommendedAction,
        velocityMetrics: targetAccount.velocityMetrics,
        riskIndicators: targetAccount.riskIndicators || []
      } : null,
      pinnedEvidence: targetCase.pinnedEvidence || [],
      timeline: targetCase.timeline || [],
      notes: targetCase.notes || [],
      auditTrailSummary: relevantAuditLogs,
      legalDirectives: {
        section: 'Section 102, Code of Criminal Procedure, 1973 (CrPC) / Bharatiya Nagarik Suraksha Sanhita (BNSS)',
        orders: [
          'Immediate debit-freeze requisition on target account and all connected beneficiary nodes.',
          'Preservation of all IP session logs, IMEI telemetry, and device fingerprints for past 90 days.',
          'Submittal of certified bank account statements and Account Opening Forms (AOF) within 48 hours.',
          'Lien enforcement on balance amount for restitution under Cyber Financial Frauds SOP.'
        ]
      }
    };

    res.json({
      success: true,
      data: reportPayload
    });
  } catch (error) {
    next(error);
  }
};
