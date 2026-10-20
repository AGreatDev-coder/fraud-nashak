// In-memory data store for fallback & seeding
export const SEED_METRICS = {
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
  activeCasesSubtext: '5 awaiting lien/freeze review'
};

export const SEED_TRANSACTIONS = [
  {
    utr: 'UTR20261018948192',
    timestamp: '2026-10-18 14:24:10',
    senderAccount: '918237491024',
    senderName: 'Kishore M. (Synthetic)',
    senderBank: 'Axis Bank',
    senderIfsc: 'UTIB000104',
    receiverAccount: '481920381920',
    receiverName: 'Apex Digital Hub',
    receiverBank: 'HDFC Bank',
    receiverIfsc: 'HDFC000042',
    amount: 450000,
    formattedAmount: '₹4,50,000',
    channel: 'IMPS',
    riskScore: 96,
    riskSeverity: 'Critical',
    pattern: 'Rapid Pass-Through',
    ruleTriggered: 'RULE-VELOCITY-04',
    ruleDescription: 'Outflow occurred within 11 minutes of high-value credit, depleting 96.8% of available account balance.',
    ipAddress: '103.21.244.18',
    deviceLocation: 'New Delhi, DL',
    narration: 'IMPS/P2A/9182374/Consultancy',
    flagged: true
  },
  {
    utr: 'UTR20261018948195',
    timestamp: '2026-10-18 14:28:44',
    senderAccount: '481920381920',
    senderName: 'Apex Digital Hub',
    senderBank: 'HDFC Bank',
    senderIfsc: 'HDFC000042',
    receiverAccount: '601928471920',
    receiverName: 'Pooja Verma (Student)',
    receiverBank: 'State Bank of India',
    receiverIfsc: 'SBIN000182',
    amount: 440000,
    formattedAmount: '₹4,40,000',
    channel: 'RTGS',
    riskScore: 92,
    riskSeverity: 'Critical',
    pattern: 'Rapid Pass-Through',
    ruleTriggered: 'RULE-VELOCITY-04',
    ruleDescription: 'Second-tier rapid relay: 97.7% of previous inbound IMPS credit moved to dormant savings account.',
    ipAddress: '103.21.244.18',
    deviceLocation: 'New Delhi, DL',
    narration: 'RTGS/HDFC/AdvanceRetainer',
    flagged: true
  },
  {
    utr: 'UTR20261018948201',
    timestamp: '2026-10-18 14:35:12',
    senderAccount: '601928471920',
    senderName: 'Pooja Verma (Student)',
    senderBank: 'State Bank of India',
    senderIfsc: 'SBIN000182',
    receiverAccount: '293847192837',
    receiverName: 'Vortex Global Tech LLP',
    receiverBank: 'ICICI Bank',
    receiverIfsc: 'ICIC000091',
    amount: 215000,
    formattedAmount: '₹2,15,000',
    channel: 'IMPS',
    riskScore: 88,
    riskSeverity: 'Critical',
    pattern: 'Fund Splitting (Fan-Out)',
    ruleTriggered: 'RULE-SPLIT-02',
    ruleDescription: 'Immediate split of lump sum into dual tranches across unrelated business entities.',
    ipAddress: '49.36.128.91',
    deviceLocation: 'Jaipur, RJ',
    narration: 'IMPS/P2A/VendorClearance',
    flagged: true
  },
  {
    utr: 'UTR20261018948205',
    timestamp: '2026-10-18 14:36:04',
    senderAccount: '601928471920',
    senderName: 'Pooja Verma (Student)',
    senderBank: 'State Bank of India',
    senderIfsc: 'SBIN000182',
    receiverAccount: '718293847192',
    receiverName: 'Suresh N. (Synthetic)',
    receiverBank: 'Kotak Mahindra',
    receiverIfsc: 'KKBK000129',
    amount: 220000,
    formattedAmount: '₹2,20,000',
    channel: 'IMPS',
    riskScore: 88,
    riskSeverity: 'Critical',
    pattern: 'Fund Splitting (Fan-Out)',
    ruleTriggered: 'RULE-SPLIT-02',
    ruleDescription: 'Second tranche of split; destination account is in high-risk watchlist tier.',
    ipAddress: '49.36.128.91',
    deviceLocation: 'Jaipur, RJ',
    narration: 'IMPS/P2A/LogisticsPayment',
    flagged: true
  },
  {
    utr: 'UTR20261018812901',
    timestamp: '2026-10-18 13:50:22',
    senderAccount: '110293817263',
    senderName: 'Digital Pay Gate',
    senderBank: 'Yes Bank',
    senderIfsc: 'YESB000018',
    receiverAccount: '481920381920',
    receiverName: 'Apex Digital Hub',
    receiverBank: 'HDFC Bank',
    receiverIfsc: 'HDFC000042',
    amount: 48500,
    formattedAmount: '₹48,500',
    channel: 'UPI',
    riskScore: 78,
    riskSeverity: 'High',
    pattern: 'Threshold Structuring',
    ruleTriggered: 'RULE-STRUCT-01',
    ruleDescription: 'Transfer calibrated just below ₹50,000 mandatory PAN reporting threshold.',
    ipAddress: '157.34.19.102',
    deviceLocation: 'Mumbai, MH',
    narration: 'UPI/9820192819@okaxis/Settlement',
    flagged: true
  },
  {
    utr: 'UTR20261018749102',
    timestamp: '2026-10-18 12:15:30',
    senderAccount: '718293847192',
    senderName: 'Suresh N. (Synthetic)',
    senderBank: 'Kotak Mahindra',
    senderIfsc: 'KKBK000129',
    receiverAccount: '918237491024',
    receiverName: 'Kishore M. (Synthetic)',
    receiverBank: 'Axis Bank',
    receiverIfsc: 'UTIB000104',
    amount: 150000,
    formattedAmount: '₹1,50,000',
    channel: 'IMPS',
    riskScore: 68,
    riskSeverity: 'Medium',
    pattern: 'Circular Velocity',
    ruleTriggered: 'RULE-LOOP-05',
    ruleDescription: 'Funds returning to originating network entity after passing through multiple hops.',
    ipAddress: '115.112.98.4',
    deviceLocation: 'Ahmedabad, GJ',
    narration: 'IMPS/P2A/LoanRepayment',
    flagged: true
  },
  {
    utr: 'UTR20261018310928',
    timestamp: '2026-10-18 08:12:40',
    senderAccount: '293847192837',
    senderName: 'Vortex Global Tech LLP',
    senderBank: 'ICICI Bank',
    senderIfsc: 'ICIC000091',
    receiverAccount: '990192837481',
    receiverName: 'ATM Cash Out Terminal #44',
    receiverBank: 'ICICI Bank (ATM)',
    receiverIfsc: 'ICIC000091',
    amount: 195000,
    formattedAmount: '₹1,95,000',
    channel: 'CASH_ATM',
    riskScore: 95,
    riskSeverity: 'Critical',
    pattern: 'Cash-Out Layering',
    ruleTriggered: 'RULE-CASHOUT-06',
    ruleDescription: 'Substantial sequential physical ATM cash withdrawals following multi-hop mule inbound credits.',
    ipAddress: '182.74.88.19',
    deviceLocation: 'Surat, GJ',
    narration: 'ATM-WDL/TXN49102/SURAT-STN',
    flagged: true
  }
];

export const SEED_ACCOUNTS = [
  {
    accountNumber: '918237491024',
    holderName: 'Kishore M. (Synthetic)',
    accountPersona: 'Individual Savings Account (Unemployed / High Turnover)',
    bank: 'Axis Bank',
    branch: 'Connaught Place, New Delhi',
    ifsc: 'UTIB000104',
    openedDate: '14-Feb-2024 (8 months old)',
    kycStatus: 'Basic Aadhaar OTP (Tier 1)',
    panHash: 'A*****910K',
    riskScore: 96,
    riskSeverity: 'Critical',
    primaryFlag: 'Rapid Pass-Through Mule (Tier-1 Layering)',
    recommendedAction: 'Immediate Section 102 CrPC Lien / Account Freeze Review',
    status: 'Flagged for Freeze',
    velocityMetrics: {
      inflow24h: '₹18,50,000',
      inflowCount24h: 6,
      outflow24h: '₹17,90,000',
      outflowCount24h: 4,
      netRetainedBalance: '₹60,000',
      retentionRate: '3.2%',
      avgHoldingTime: '11 mins',
      turnoverSpikeRatio: '32.4x Baseline',
      baselineMonthlyAvg: '₹12,500 / month'
    },
    riskIndicators: [
      {
        id: 'RULE-VELOCITY-04',
        name: 'Rapid Pass-Through Velocity',
        category: 'Fund Velocity',
        points: 35,
        maxPoints: 35,
        severity: 'Critical',
        condition: 'Outflow > 90% within 15 minutes of inbound credit',
        evidence: 'Received ₹18.5L across 6 UPI credits; ₹17.9L transferred out via IMPS/RTGS within 11 minutes.',
        triggered: true
      },
      {
        id: 'RULE-RETENTION-01',
        name: 'Abnormal Low Fund Retention',
        category: 'Balance Behavior',
        points: 25,
        maxPoints: 25,
        severity: 'Critical',
        condition: 'Retention rate < 5% on accounts with daily inflow > ₹5,00,000',
        evidence: 'Account retains only 3.2% of transacted volume. End-of-day balance returned to near-zero.',
        triggered: true
      }
    ],
    counterparties: [
      {
        accountNumber: '481920381920',
        holderName: 'Apex Digital Hub',
        bank: 'HDFC Bank',
        relationship: 'Primary Outflow Beneficiary',
        volumeExchanged: '₹13,50,000',
        transactionCount: 3,
        direction: 'Outflow',
        counterpartyRisk: 92
      }
    ],
    transactions: [
      {
        utr: 'UTR20261018948192',
        timestamp: '2026-10-18 14:24:10',
        direction: 'Outflow',
        counterparty: 'Apex Digital Hub (HDFC)',
        amount: '₹4,50,000',
        channel: 'IMPS',
        pattern: 'Rapid Pass-Through',
        riskScore: 96
      },
      {
        utr: 'UTR20261018749102',
        timestamp: '2026-10-18 12:15:30',
        direction: 'Inflow',
        counterparty: 'Suresh N. (Kotak)',
        amount: '₹1,50,000',
        channel: 'IMPS',
        pattern: 'Circular Velocity Loop',
        riskScore: 68
      },
      {
        utr: 'UTR20261018812901',
        timestamp: '2026-10-18 13:50:22',
        direction: 'Inflow',
        counterparty: 'Digital Pay Gate (Yes Bank)',
        amount: '₹4,80,000',
        channel: 'IMPS',
        pattern: 'Inbound Influx',
        riskScore: 78
      }
    ]
  },
  {
    accountNumber: '481920381920',
    holderName: 'Apex Digital Hub',
    accountPersona: 'Sole Proprietorship Current Account',
    bank: 'HDFC Bank',
    branch: 'Fort, Mumbai',
    ifsc: 'HDFC000042',
    openedDate: '02-Jun-2024 (4 months old)',
    kycStatus: 'GSTIN Verified (Synthetic)',
    panHash: 'B*****441P',
    riskScore: 92,
    riskSeverity: 'Critical',
    primaryFlag: 'Mule Aggregator & Layering Hub (Fan-In Smurfing)',
    recommendedAction: 'Mandatory STR Filing & ED Alert',
    status: 'Investigator Assigned',
    velocityMetrics: {
      inflow24h: '₹30,40,000',
      inflowCount24h: 32,
      outflow24h: '₹29,80,000',
      outflowCount24h: 5,
      netRetainedBalance: '₹60,000',
      retentionRate: '1.9%',
      avgHoldingTime: '22 mins',
      turnoverSpikeRatio: '48.2x Baseline',
      baselineMonthlyAvg: '₹25,000 / month'
    },
    riskIndicators: [
      {
        id: 'RULE-SMURF-03',
        name: 'Fan-In Smurfing / Structuring Aggregation',
        category: 'Network Topology',
        points: 35,
        maxPoints: 35,
        severity: 'Critical',
        condition: '>20 micro-transfers received and aggregated within 60 minutes',
        evidence: 'Received 32 micro-transfers of ~₹9,500 each in 40 minutes followed by single large RTGS disbursement.',
        triggered: true
      }
    ],
    counterparties: [
      {
        accountNumber: '918237491024',
        holderName: 'Kishore M. (Synthetic)',
        bank: 'Axis Bank',
        relationship: 'Inbound Feeder Node',
        volumeExchanged: '₹13,50,000',
        transactionCount: 3,
        direction: 'Inflow',
        counterpartyRisk: 96
      }
    ],
    transactions: [
      {
        utr: 'UTR20261018948195',
        timestamp: '2026-10-18 14:28:44',
        direction: 'Outflow',
        counterparty: 'Pooja Verma (SBI)',
        amount: '₹4,40,000',
        channel: 'RTGS',
        pattern: 'Rapid Pass-Through',
        riskScore: 92
      },
      {
        utr: 'UTR20261018948192',
        timestamp: '2026-10-18 14:24:10',
        direction: 'Inflow',
        counterparty: 'Kishore M. (Axis Bank)',
        amount: '₹4,50,000',
        channel: 'IMPS',
        pattern: 'Rapid Pass-Through',
        riskScore: 96
      },
      {
        utr: 'UTR20261018812901',
        timestamp: '2026-10-18 13:50:22',
        direction: 'Inflow',
        counterparty: 'Digital Pay Gate (Yes Bank)',
        amount: '₹48,500',
        channel: 'UPI',
        pattern: 'Threshold Structuring',
        riskScore: 78
      }
    ]
  },
  {
    accountNumber: '601928471920',
    holderName: 'Pooja Verma (Student)',
    accountPersona: 'Zero-Balance Student Savings Account',
    bank: 'State Bank of India',
    branch: 'University Campus, Jaipur',
    ifsc: 'SBIN000182',
    openedDate: '19-Aug-2022 (4 years old)',
    kycStatus: 'Student ID & Aadhaar Verified',
    panHash: 'C*****882Q',
    riskScore: 88,
    riskSeverity: 'Critical',
    primaryFlag: 'Dormancy Surge & Fund Splitting',
    recommendedAction: 'Contact Account Holder for Mule Coercion / Compromise Audit',
    status: 'Case Created (#CS-104)',
    velocityMetrics: {
      inflow24h: '₹12,00,000',
      inflowCount24h: 4,
      outflow24h: '₹11,80,000',
      outflowCount24h: 3,
      netRetainedBalance: '₹20,000',
      retentionRate: '1.6%',
      avgHoldingTime: '8 mins',
      turnoverSpikeRatio: '180.0x Baseline',
      baselineMonthlyAvg: '₹1,500 / month'
    },
    riskIndicators: [
      {
        id: 'RULE-DORMANT-02',
        name: 'Severe Dormancy Spike on Student Profile',
        category: 'Account Lifecycle',
        points: 35,
        maxPoints: 35,
        severity: 'Critical',
        condition: 'Zero balance for >180 days followed by sudden multi-lakh influx',
        evidence: 'Account balance stayed below ₹1,000 for 180+ days; suddenly received ₹12.0L.',
        triggered: true
      }
    ],
    counterparties: [],
    transactions: [
      {
        utr: 'UTR20261018948201',
        timestamp: '2026-10-18 14:35:12',
        direction: 'Outflow',
        counterparty: 'Vortex Global Tech LLP (ICICI)',
        amount: '₹2,15,000',
        channel: 'IMPS',
        pattern: 'Fund Splitting (Tranche A)',
        riskScore: 88
      },
      {
        utr: 'UTR20261018948205',
        timestamp: '2026-10-18 14:36:04',
        direction: 'Outflow',
        counterparty: 'Suresh N. (Kotak)',
        amount: '₹2,20,000',
        channel: 'IMPS',
        pattern: 'Fund Splitting (Tranche B)',
        riskScore: 88
      },
      {
        utr: 'UTR20261018948195',
        timestamp: '2026-10-18 14:28:44',
        direction: 'Inflow',
        counterparty: 'Apex Digital Hub (HDFC)',
        amount: '₹4,40,000',
        channel: 'RTGS',
        pattern: 'Rapid Relay',
        riskScore: 92
      }
    ]
  }
];

export const SEED_CASES = [
  {
    id: 'CS-108',
    title: 'Operation QuickDrain — High-Velocity UPI Layering Ring',
    category: 'Digital Arrest Scam',
    priority: 'Critical',
    status: 'Pending Bank Lien / Freeze',
    createdDate: '2026-10-18 14:30',
    assignedInvestigator: 'Officer S. Sharma (Lead Cyber FIU)',
    targetAccount: '918237491024',
    targetHolder: 'Kishore M. (Synthetic)',
    targetBank: 'Axis Bank',
    volumeAtRisk: '₹18,50,000',
    summary: 'Multi-hop pass-through network utilizing newly opened Axis Bank account to rapidly disperse extorted digital arrest funds into HDFC aggregation hubs within 11 minutes.',
    pinnedEvidence: [
      {
        id: 'ev-1',
        type: 'ACCOUNT',
        accountNumber: '918237491024',
        holderName: 'Kishore M. (Synthetic)',
        bank: 'Axis Bank',
        riskScore: 96,
        detail: 'Tier-1 Mule Conduit • Retention rate: 3.2%'
      },
      {
        id: 'ev-3',
        type: 'TRANSACTION',
        utr: 'UTR20261018948192',
        amount: '₹4,50,000',
        channel: 'IMPS',
        timestamp: '14:24:10',
        rule: 'RULE-VELOCITY-04',
        detail: 'Rapid Pass-Through: Transferred 96.8% balance in 11 mins'
      }
    ],
    timeline: [
      {
        id: 'tl-1',
        timestamp: '2026-10-18 14:13:00',
        actor: 'Rule Engine',
        action: 'Anomaly Triggered',
        detail: 'RULE-VELOCITY-04 fired for Account 918237491024.'
      },
      {
        id: 'tl-2',
        timestamp: '2026-10-18 14:30:15',
        actor: 'Officer S. Sharma',
        action: 'Case Created',
        detail: 'Initiated formal case dossier #CS-108 under PS-01 protocol.'
      }
    ],
    notes: [
      {
        id: 'nt-1',
        author: 'Officer S. Sharma',
        timestamp: '2026-10-18 14:50',
        content: 'Axis Bank nodal desk contacted. Immediate lien petition requested.'
      }
    ]
  }
];
