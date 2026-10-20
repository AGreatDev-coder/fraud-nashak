// Synthetic sample data for Fraud-Naashak (Clearly labeled for demonstration)
export const DASHBOARD_METRICS = {
  totalAccountsAnalyzed: 142850,
  totalAccountsTrend: '+12.4% vs last cycle',
  muleFlagsDetected: 384,
  muleFlagsCritical: 98,
  muleFlagsTrend: '+34 flags today',
  highRiskVelocity: '₹4.82 Cr',
  highRiskVelocitySubtext: 'Transacted across flagged nodes',
  highRiskVelocityTrend: '+18.2% 24h spike',
  activeCases: 18,
  activeCasesUrgent: 5,
  activeCasesSubtext: '5 awaiting lien/freeze review',
  syntheticNotice: 'Simulated Forensic Dataset • For Investigative Evaluation Only'
};

export const TRANSACTION_VOLUME_TREND = [
  { month: 'Jan', standardVolume: 420, suspiciousVolume: 18 },
  { month: 'Feb', standardVolume: 510, suspiciousVolume: 24 },
  { month: 'Mar', standardVolume: 490, suspiciousVolume: 32 },
  { month: 'Apr', standardVolume: 680, suspiciousVolume: 85 }, // Anomaly spike
  { month: 'May', standardVolume: 610, suspiciousVolume: 42 },
  { month: 'Jun', standardVolume: 740, suspiciousVolume: 58 },
  { month: 'Jul', standardVolume: 820, suspiciousVolume: 112 }, // Major mule syndicate burst
  { month: 'Aug', standardVolume: 790, suspiciousVolume: 65 },
  { month: 'Sep', standardVolume: 880, suspiciousVolume: 74 },
  { month: 'Oct', standardVolume: 940, suspiciousVolume: 98 },
];

export const RISK_DISTRIBUTION_DATA = [
  { name: 'Critical Risk (80-100)', value: 98, color: '#DC2626', percentage: '25.5%' },
  { name: 'High Suspicion (60-79)', value: 146, color: '#EA580C', percentage: '38.0%' },
  { name: 'Moderate Watchlist (40-59)', value: 140, color: '#D97706', percentage: '36.5%' },
];

export const RECENT_ALERTS_DATA = [
  {
    id: 'ALT-1082',
    accountNumber: '918237491024',
    bank: 'Axis Bank (IFSC: UTIB000104)',
    accountHolder: 'Kishore M. (Synthetic)',
    riskScore: 96,
    severity: 'Critical',
    pattern: 'Rapid Pass-Through',
    patternDetail: 'Received ₹18.5L via 6 UPI credits; ₹17.9L transferred out via IMPS within 11 minutes',
    flowVolume: '₹18.50 Lakhs',
    flaggedTime: '8 mins ago',
    linkedNodes: 7,
    status: 'Needs Immediate Review'
  },
  {
    id: 'ALT-1081',
    accountNumber: '481920381920',
    bank: 'HDFC Bank (IFSC: HDFC000042)',
    accountHolder: 'Apex Digital Hub (Sole Prop)',
    riskScore: 92,
    severity: 'Critical',
    pattern: 'Fan-In Smurfing',
    patternDetail: '32 micro-transfers (₹9,500 each) in 40 minutes followed by single RTGS exit',
    flowVolume: '₹30.40 Lakhs',
    flaggedTime: '24 mins ago',
    linkedNodes: 33,
    status: 'Investigator Assigned'
  },
  {
    id: 'ALT-1080',
    accountNumber: '601928471920',
    bank: 'State Bank of India (IFSC: SBIN000182)',
    accountHolder: 'Pooja Verma (Synthetic Student A/c)',
    riskScore: 88,
    severity: 'Critical',
    pattern: 'Dormancy Spike',
    patternDetail: 'Zero balance for 180 days; sudden inflow of ₹12.0L from 4 unverified UPI handles',
    flowVolume: '₹12.00 Lakhs',
    flaggedTime: '45 mins ago',
    linkedNodes: 5,
    status: 'Case Created (#CS-104)'
  },
  {
    id: 'ALT-1079',
    accountNumber: '293847192837',
    bank: 'ICICI Bank (IFSC: ICIC000091)',
    accountHolder: 'Vortex Global Tech LLP',
    riskScore: 78,
    severity: 'High',
    pattern: 'Layering Intermediary',
    patternDetail: 'Equal split dispersal across 4 third-party accounts within 5 minutes',
    flowVolume: '₹44.20 Lakhs',
    flaggedTime: '1 hr ago',
    linkedNodes: 9,
    status: 'Under Investigation'
  },
  {
    id: 'ALT-1078',
    accountNumber: '718293847192',
    bank: 'Kotak Mahindra (IFSC: KKBK000129)',
    accountHolder: 'Suresh N. (Synthetic)',
    riskScore: 68,
    severity: 'Medium',
    pattern: 'Circular Velocity',
    patternDetail: 'Round-trip fund loops detected between 3 cooperative bank accounts',
    flowVolume: '₹8.75 Lakhs',
    flaggedTime: '2 hrs ago',
    linkedNodes: 4,
    status: 'Monitoring'
  }
];
