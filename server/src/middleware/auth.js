// Investigator Role-Based Access Control (RBAC) Middleware — Fraud-Naashak PS-01
// Enforces investigative clearance levels across sensitive financial actions

export const ROLES = {
  INVESTIGATOR_LEAD: 'INVESTIGATOR_LEAD',
  FORENSIC_ANALYST: 'FORENSIC_ANALYST',
  AUDITOR: 'AUDITOR'
};

export const investigatorAuth = (req, res, next) => {
  const role = req.headers['x-investigator-role'] || ROLES.INVESTIGATOR_LEAD;
  const name = req.headers['x-investigator-name'] || 'Officer S. Sharma';
  const id = req.headers['x-investigator-id'] || 'IND-FIU-9021';

  req.investigator = {
    role,
    name,
    id,
    ip: req.headers['x-forwarded-for'] || req.socket.remoteAddress || '127.0.0.1'
  };

  next();
};

export const requireRole = (allowedRoles = []) => {
  return (req, res, next) => {
    const userRole = req.investigator?.role || ROLES.INVESTIGATOR_LEAD;

    if (allowedRoles.includes(userRole)) {
      return next();
    }

    return res.status(403).json({
      success: false,
      code: 'INSUFFICIENT_CLEARANCE',
      message: `Access Denied: Operation requires '${allowedRoles.join(' or ')}' clearance. Active clearance: '${userRole}'.`,
      requiredRoles: allowedRoles,
      activeRole: userRole,
      investigatorId: req.investigator?.id,
      timestamp: new Date().toISOString()
    });
  };
};
