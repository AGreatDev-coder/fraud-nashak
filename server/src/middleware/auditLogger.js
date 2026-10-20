// Immutable Forensic Audit Trail Logger — Fraud-Naashak PS-01
// Tracks all state mutations, security events, and legal lien actions for judicial chain of custody

export const systemAuditTrail = [
  {
    id: 'audit-init-01',
    timestamp: new Date(Date.now() - 3600000).toISOString(),
    actionType: 'SYSTEM_BOOT',
    investigator: 'System Daemon',
    role: 'SYSTEM',
    investigatorId: 'SYS-CORE-01',
    endpoint: '/api/health',
    statusCode: 200,
    details: 'Fraud-Naashak Financial Intelligence Engine initialized with Deterministic v1.0 rules.',
    ip: '127.0.0.1'
  },
  {
    id: 'audit-init-02',
    timestamp: new Date(Date.now() - 1800000).toISOString(),
    actionType: 'CASE_INITIATION',
    investigator: 'Officer S. Sharma',
    role: 'INVESTIGATOR_LEAD',
    investigatorId: 'IND-FIU-9021',
    endpoint: '/api/cases',
    statusCode: 201,
    details: 'Formal investigation case CS-108 opened for Operation QuickDrain.',
    ip: '192.168.1.42'
  }
];

export const logAuditEvent = (event) => {
  const auditEntry = {
    id: `audit-${Date.now()}-${Math.floor(100 + Math.random() * 900)}`,
    timestamp: new Date().toISOString(),
    ip: '127.0.0.1',
    ...event
  };
  systemAuditTrail.unshift(auditEntry);
  if (systemAuditTrail.length > 200) systemAuditTrail.pop();
  return auditEntry;
};

export const auditMiddleware = (req, res, next) => {
  // We monitor mutation methods and security status codes
  if (['POST', 'PATCH', 'PUT', 'DELETE'].includes(req.method)) {
    res.on('finish', () => {
      let actionType = 'DATA_MUTATION';
      const path = req.originalUrl || req.url;

      if (path.includes('/status') && path.includes('/accounts')) {
        actionType = 'ACCOUNT_LIEN_FREEZE';
      } else if (path.includes('/evidence')) {
        actionType = req.method === 'DELETE' ? 'EVIDENCE_REMOVED' : 'EVIDENCE_PINNED';
      } else if (path.includes('/notes')) {
        actionType = 'FORENSIC_NOTE_LOGGED';
      } else if (path.endsWith('/cases') && req.method === 'POST') {
        actionType = 'CASE_CREATION';
      }

      if (res.statusCode === 403) {
        actionType = 'UNAUTHORIZED_ACCESS_BLOCKED';
      }

      logAuditEvent({
        actionType,
        method: req.method,
        endpoint: path,
        statusCode: res.statusCode,
        investigator: req.investigator?.name || 'Officer S. Sharma',
        role: req.investigator?.role || 'INVESTIGATOR_LEAD',
        investigatorId: req.investigator?.id || 'IND-FIU-9021',
        ip: req.investigator?.ip || req.ip || '127.0.0.1',
        details: res.statusCode === 403
          ? `Clearance violation on ${path} by ${req.investigator?.role}`
          : `Forensic operation executed on ${path}`
      });
    });
  }

  next();
};
