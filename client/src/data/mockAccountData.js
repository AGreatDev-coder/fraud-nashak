// Synthetic Account Dossiers for Fraud-Naashak (Clearly labeled for investigative demonstration)
export const MOCK_ACCOUNTS = {
  '918237491024': {
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
      retentionRate: '3.2%', // Telltale mule metric
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
      },
      {
        id: 'RULE-FANIN-03',
        name: 'High Fan-In Dispersal Ratio',
        category: 'Network Topology',
        points: 20,
        maxPoints: 20,
        severity: 'High',
        condition: 'Multiple unrelated UPI handles transferring into single destination node within 60 mins',
        evidence: '6 independent UPI handles remitted funds without prior transaction history with beneficiary.',
        triggered: true
      },
      {
        id: 'RULE-DORMANT-02',
        name: 'Sudden Dormancy-to-Hyperactive Spike',
        category: 'Account Lifecycle',
        points: 16,
        maxPoints: 20,
        severity: 'High',
        condition: 'Turnover surge > 15x compared to 180-day baseline',
        evidence: 'Account averaged ₹12,500/month for 7 months; surged to ₹18.5L in 24 hours (32.4x increase).',
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
        counterpartyRisk: 92,
        severity: 'Critical'
      },
      {
        accountNumber: '718293847192',
        holderName: 'Suresh N. (Synthetic)',
        bank: 'Kotak Mahindra',
        relationship: 'Circular Loop Intermediary',
        volumeExchanged: '₹4,40,000',
        transactionCount: 1,
        direction: 'Outflow',
        counterpartyRisk: 68,
        severity: 'Medium'
      },
      {
        accountNumber: '110293817263',
        holderName: 'Digital Pay Gate',
        bank: 'Yes Bank',
        relationship: 'Inbound Aggregator',
        volumeExchanged: '₹6,20,000',
        transactionCount: 2,
        direction: 'Inflow',
        counterpartyRisk: 78,
        severity: 'High'
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
        utr: 'UTR20261018812901',
        timestamp: '2026-10-18 14:13:00',
        direction: 'Inflow',
        counterparty: 'Digital Pay Gate (Yes Bank)',
        amount: '₹4,80,000',
        channel: 'IMPS',
        pattern: 'Inbound Influx',
        riskScore: 82
      },
      {
        utr: 'UTR20261018749102',
        timestamp: '2026-10-18 12:15:30',
        direction: 'Inflow',
        counterparty: 'Suresh N. (Kotak)',
        amount: '₹1,50,000',
        channel: 'IMPS',
        pattern: 'Circular Velocity',
        riskScore: 68
      }
    ]
  },

  '481920381920': {
    accountNumber: '481920381920',
    holderName: 'Apex Digital Hub',
    accountPersona: 'Sole Proprietorship Current Account (Recently Registered)',
    bank: 'HDFC Bank',
    branch: 'Fort, Mumbai',
    ifsc: 'HDFC000042',
    openedDate: '02-Jun-2024 (4 months old)',
    kycStatus: 'GSTIN Verified (Synthetic)',
    panHash: 'B*****441P',
    riskScore: 92,
    riskSeverity: 'Critical',
    primaryFlag: 'Mule Aggregator & Layering Hub (Fan-In Smurfing)',
    recommendedAction: 'Mandatory STR (Suspicious Transaction Report) Filing & ED Alert',
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
      },
      {
        id: 'RULE-RETENTION-01',
        name: 'Abnormal Low Fund Retention',
        category: 'Balance Behavior',
        points: 25,
        maxPoints: 25,
        severity: 'Critical',
        condition: 'Retention rate < 5% on accounts with daily inflow > ₹5,00,000',
        evidence: 'Account retains 1.9% of funds, operating as a zero-balance passthrough pipe.',
        triggered: true
      },
      {
        id: 'RULE-STRUCT-01',
        name: 'Threshold Structuring (<₹50,000)',
        category: 'Compliance Evasion',
        points: 20,
        maxPoints: 20,
        severity: 'High',
        condition: 'Systematic credits calibrated just below statutory reporting limits',
        evidence: '8 consecutive credits received between ₹48,500 and ₹49,800 to avoid automatic AML reporting.',
        triggered: true
      },
      {
        id: 'RULE-VELOCITY-04',
        name: 'Rapid Pass-Through Velocity',
        category: 'Fund Velocity',
        points: 12,
        maxPoints: 20,
        severity: 'Medium',
        condition: 'Bulk disbursement within 30 minutes of accumulation',
        evidence: 'Aggregated balance transferred onward to Pooja Verma (SBI) via RTGS within 22 minutes.',
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
        counterpartyRisk: 96,
        severity: 'Critical'
      },
      {
        accountNumber: '601928471920',
        holderName: 'Pooja Verma (Student)',
        bank: 'State Bank of India',
        relationship: 'Outflow Layering Target',
        volumeExchanged: '₹4,40,000',
        transactionCount: 1,
        direction: 'Outflow',
        counterpartyRisk: 88,
        severity: 'Critical'
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
        counterparty: 'Kishore M. (Axis)',
        amount: '₹4,50,000',
        channel: 'IMPS',
        pattern: 'Rapid Pass-Through',
        riskScore: 96
      }
    ]
  },

  '601928471920': {
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
        evidence: 'Account balance stayed below ₹1,000 for 180+ days; suddenly received ₹12.0L from unrelated commercial accounts.',
        triggered: true
      },
      {
        id: 'RULE-SPLIT-02',
        name: 'Immediate Multi-Tranche Fund Splitting',
        category: 'Fund Velocity',
        points: 30,
        maxPoints: 30,
        severity: 'Critical',
        condition: 'Inflow divided and disbursed in equal halves across two separate banks in <10 mins',
        evidence: 'Received ₹4.40L and immediately split into ₹2.15L (Vortex) and ₹2.20L (Suresh N.) within 8 minutes.',
        triggered: true
      },
      {
        id: 'RULE-RETENTION-01',
        name: 'Abnormal Low Fund Retention',
        category: 'Balance Behavior',
        points: 23,
        maxPoints: 25,
        severity: 'High',
        condition: 'Retention rate < 5% on accounts with daily inflow > ₹5,00,000',
        evidence: 'Only ₹20,000 retained out of ₹12.0L transacted volume.',
        triggered: true
      }
    ],

    counterparties: [
      {
        accountNumber: '481920381920',
        holderName: 'Apex Digital Hub',
        bank: 'HDFC Bank',
        relationship: 'Upstream Inbound Sender',
        volumeExchanged: '₹4,40,000',
        transactionCount: 1,
        direction: 'Inflow',
        counterpartyRisk: 92,
        severity: 'Critical'
      },
      {
        accountNumber: '293847192837',
        holderName: 'Vortex Global Tech LLP',
        bank: 'ICICI Bank',
        relationship: 'Split Beneficiary A',
        volumeExchanged: '₹2,15,000',
        transactionCount: 1,
        direction: 'Outflow',
        counterpartyRisk: 78,
        severity: 'High'
      },
      {
        accountNumber: '718293847192',
        holderName: 'Suresh N. (Synthetic)',
        bank: 'Kotak Mahindra',
        relationship: 'Split Beneficiary B',
        volumeExchanged: '₹2,20,000',
        transactionCount: 1,
        direction: 'Outflow',
        counterpartyRisk: 68,
        severity: 'Medium'
      }
    ],

    transactions: [
      {
        utr: 'UTR20261018948201',
        timestamp: '2026-10-18 14:35:12',
        direction: 'Outflow',
        counterparty: 'Vortex Global Tech (ICICI)',
        amount: '₹2,15,000',
        channel: 'IMPS',
        pattern: 'Fund Splitting',
        riskScore: 88
      },
      {
        utr: 'UTR20261018948205',
        timestamp: '2026-10-18 14:36:04',
        direction: 'Outflow',
        counterparty: 'Suresh N. (Kotak)',
        amount: '₹2,20,000',
        channel: 'IMPS',
        pattern: 'Fund Splitting',
        riskScore: 88
      }
    ]
  }
};
