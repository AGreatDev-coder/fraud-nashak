// Input Validation & Defense-in-Depth Sanitization Middleware — Fraud-Naashak PS-01
// Protects investigative APIs against NoSQL query injections, parameter tampering, and malformed identifiers

// Sanitize query parameters to reject or neutralize NoSQL injection vectors
export const sanitizeQuery = (req, res, next) => {
  if (req.query && typeof req.query === 'object') {
    for (const key of Object.keys(req.query)) {
      if (key.startsWith('$')) {
        delete req.query[key];
        continue;
      }
      const val = req.query[key];
      if (typeof val === 'object' && val !== null) {
        // Remove nested Mongo query operators like { $gt: "" }
        for (const subKey of Object.keys(val)) {
          if (subKey.startsWith('$')) {
            delete val[subKey];
          }
        }
      }
    }
  }
  next();
};

// Validate Account Number format
export const validateAccountNumber = (req, res, next) => {
  const accountNumber = req.params.accountNumber || req.body.accountNumber;

  if (!accountNumber) {
    return res.status(400).json({
      success: false,
      code: 'INVALID_INPUT',
      message: 'Account number is required.'
    });
  }

  // Account numbers in banking are 6 to 24 alphanumeric characters
  const cleanAccount = String(accountNumber).trim();
  const validPattern = /^[A-Za-z0-9]{6,24}$/;

  if (!validPattern.test(cleanAccount)) {
    return res.status(400).json({
      success: false,
      code: 'INVALID_ACCOUNT_FORMAT',
      message: `Account number '${accountNumber}' contains invalid characters or does not meet length standards (6-24 chars).`
    });
  }

  next();
};

// Validate UTR format
export const validateUtr = (req, res, next) => {
  const utr = req.params.utr || req.body.utr;

  if (!utr) {
    return res.status(400).json({
      success: false,
      code: 'INVALID_INPUT',
      message: 'Transaction UTR reference is required.'
    });
  }

  const cleanUtr = String(utr).trim();
  const validPattern = /^[A-Za-z0-9_-]{6,32}$/;

  if (!validPattern.test(cleanUtr)) {
    return res.status(400).json({
      success: false,
      code: 'INVALID_UTR_FORMAT',
      message: `Transaction UTR reference '${utr}' contains invalid characters.`
    });
  }

  next();
};
