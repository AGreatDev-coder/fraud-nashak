// Synthetic Investigation Cases Dataset for Fraud-Naashak (PS-01)
export const INITIAL_CASES_DATA = [
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
        id: 'ev-2',
        type: 'ACCOUNT',
        accountNumber: '481920381920',
        holderName: 'Apex Digital Hub',
        bank: 'HDFC Bank',
        riskScore: 92,
        detail: 'Layering & Smurfing Hub • 32 inbound micro-transfers'
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
      },
      {
        id: 'ev-4',
        type: 'TRANSACTION',
        utr: 'UTR20261018812901',
        amount: '₹4,80,000',
        channel: 'IMPS',
        timestamp: '14:13:00',
        rule: 'RULE-INBOUND-01',
        detail: 'Inbound Influx from aggregator node'
      }
    ],

    timeline: [
      {
        id: 'tl-1',
        timestamp: '2026-10-18 14:13:00',
        actor: 'Rule Engine (Deterministic v1.0)',
        action: 'Anomaly Triggered',
        detail: 'RULE-VELOCITY-04 fired for Account 918237491024 (Risk Score: 96/100).'
      },
      {
        id: 'tl-2',
        timestamp: '2026-10-18 14:30:15',
        actor: 'Officer S. Sharma',
        action: 'Case Created',
        detail: 'Initiated formal case dossier #CS-108 under PS-01 protocol.'
      },
      {
        id: 'tl-3',
        timestamp: '2026-10-18 14:45:00',
        actor: 'Officer S. Sharma',
        action: 'Lien Petition Dispatched',
        detail: 'Formal Section 102 CrPC freezing directive emailed to Axis Bank Nodal Compliance Cell.'
      },
      {
        id: 'tl-4',
        timestamp: '2026-10-18 15:10:22',
        actor: 'Officer S. Sharma',
        action: 'Counterparty Linked',
        detail: 'Topological connection pinned to Apex Digital Hub (HDFC - 481920381920).'
      }
    ],

    notes: [
      {
        id: 'nt-1',
        author: 'Officer S. Sharma',
        timestamp: '2026-10-18 14:50',
        content: 'Axis Bank nodal desk contacted. Account balance currently ₹60,000. Immediate lien petition requested to prevent remaining exit.'
      },
      {
        id: 'nt-2',
        author: 'Officer S. Sharma',
        timestamp: '2026-10-18 15:15',
        content: 'Secondary entity Apex Digital Hub appears to be a sole proprietorship registered 4 months ago. Likely operating as a layering conduit.'
      }
    ]
  },

  {
    id: 'CS-104',
    title: 'Campus Mule Syndicate — Pooja Verma Student Account Exploit',
    category: 'Student Account Coercion',
    priority: 'Critical',
    status: 'Under Investigation',
    createdDate: '2026-10-18 15:00',
    assignedInvestigator: 'Inspector R. Patil',
    targetAccount: '601928471920',
    targetHolder: 'Pooja Verma (Student)',
    targetBank: 'State Bank of India',
    volumeAtRisk: '₹12,00,000',
    summary: 'Zero-balance student account dormant for 180 days suddenly received ₹12.0L and immediately split funds into dual tranches within 8 minutes.',

    pinnedEvidence: [
      {
        id: 'ev-5',
        type: 'ACCOUNT',
        accountNumber: '601928471920',
        holderName: 'Pooja Verma (Student)',
        bank: 'State Bank of India',
        riskScore: 88,
        detail: 'Dormancy Surge & Fund Splitter'
      },
      {
        id: 'ev-6',
        type: 'TRANSACTION',
        utr: 'UTR20261018948201',
        amount: '₹2,15,000',
        channel: 'IMPS',
        timestamp: '14:35:12',
        rule: 'RULE-SPLIT-02',
        detail: 'Fund Splitting: Tranche A to Vortex Global Tech'
      }
    ],

    timeline: [
      {
        id: 'tl-5',
        timestamp: '2026-10-18 14:36:00',
        actor: 'Rule Engine',
        action: 'Anomaly Triggered',
        detail: 'Dormancy surge detected (>180x baseline turnover).'
      },
      {
        id: 'tl-6',
        timestamp: '2026-10-18 15:00:00',
        actor: 'Inspector R. Patil',
        action: 'Case Created',
        detail: 'Case #CS-104 assigned for student KYC verification.'
      }
    ],

    notes: [
      {
        id: 'nt-3',
        author: 'Inspector R. Patil',
        timestamp: '2026-10-18 15:05',
        content: 'College administration contacted. Student has not attended classes for 2 weeks. Possible rented account syndicate.'
      }
    ]
  },

  {
    id: 'CS-099',
    title: 'Structuring Syndicate Beta — Sub-₹50,000 Smurfing Funnel',
    category: 'Structuring / Smurfing',
    priority: 'High',
    status: 'Evidence Packaged for FIR',
    createdDate: '2026-10-17 11:20',
    assignedInvestigator: 'Officer S. Sharma',
    targetAccount: '481920381920',
    targetHolder: 'Apex Digital Hub',
    targetBank: 'HDFC Bank',
    volumeAtRisk: '₹30,40,000',
    summary: '32 micro-transfers of ~₹9,500 systematically remitted to avoid PAN reporting limits, followed by consolidated RTGS exit.',

    pinnedEvidence: [
      {
        id: 'ev-7',
        type: 'ACCOUNT',
        accountNumber: '481920381920',
        holderName: 'Apex Digital Hub',
        bank: 'HDFC Bank',
        riskScore: 92,
        detail: 'Fan-In Smurfing Hub'
      }
    ],

    timeline: [
      {
        id: 'tl-7',
        timestamp: '2026-10-17 11:20:00',
        actor: 'Officer S. Sharma',
        action: 'Case Created',
        detail: 'Initiated structuring investigation.'
      },
      {
        id: 'tl-8',
        timestamp: '2026-10-18 10:00:00',
        actor: 'Officer S. Sharma',
        action: 'Evidence Packaged',
        detail: 'Forensic PDF dossier compiled for formal FIR filing.'
      }
    ],

    notes: [
      {
        id: 'nt-4',
        author: 'Officer S. Sharma',
        timestamp: '2026-10-18 10:15',
        content: 'Investigation concluded. Evidentiary report generated for Cyber Crime Branch FIR.'
      }
    ]
  }
];
