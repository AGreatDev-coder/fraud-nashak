// Server-side Graph Topology Data — Fraud-Naashak PS-01
// Synced with client mockGraphData.js (Stage 7 integration)
// Nodes include React Flow position, rich data fields (isMule, flagPattern, etc.)
// Edges include styling and suspicious-path flags consumed by FundFlowGraphView

export const GRAPH_NODES = [
  {
    id: 'node-origin',
    type: 'accountNode',
    position: { x: 50, y: 220 },
    data: {
      accountNumber: '110293817263',
      holderName: 'Digital Pay Gate',
      bank: 'Yes Bank',
      role: 'Inbound Aggregator / Source',
      riskScore: 78,
      riskSeverity: 'High',
      totalOutflow: '₹6,20,000',
      totalInflow: '₹0',
      isOriginator: true,
    }
  },
  {
    id: 'node-kishore',
    type: 'accountNode',
    position: { x: 380, y: 150 },
    data: {
      accountNumber: '918237491024',
      holderName: 'Kishore M. (Synthetic)',
      bank: 'Axis Bank',
      role: 'Tier-1 Mule Conduit',
      riskScore: 96,
      riskSeverity: 'Critical',
      totalOutflow: '₹17,90,000',
      totalInflow: '₹18,50,000',
      isMule: true,
      flagPattern: 'Rapid Pass-Through',
    }
  },
  {
    id: 'node-apex',
    type: 'accountNode',
    position: { x: 740, y: 150 },
    data: {
      accountNumber: '481920381920',
      holderName: 'Apex Digital Hub',
      bank: 'HDFC Bank',
      role: 'Layering & Smurfing Hub',
      riskScore: 92,
      riskSeverity: 'Critical',
      totalOutflow: '₹29,80,000',
      totalInflow: '₹30,40,000',
      isMule: true,
      flagPattern: 'Fan-In Smurfing',
    }
  },
  {
    id: 'node-pooja',
    type: 'accountNode',
    position: { x: 1100, y: 80 },
    data: {
      accountNumber: '601928471920',
      holderName: 'Pooja Verma (Student)',
      bank: 'State Bank of India',
      role: 'Dormant Mule & Splitter',
      riskScore: 88,
      riskSeverity: 'Critical',
      totalOutflow: '₹11,80,000',
      totalInflow: '₹12,00,000',
      isMule: true,
      flagPattern: 'Fund Splitting',
    }
  },
  {
    id: 'node-suresh',
    type: 'accountNode',
    position: { x: 740, y: 400 },
    data: {
      accountNumber: '718293847192',
      holderName: 'Suresh N. (Synthetic)',
      bank: 'Kotak Mahindra',
      role: 'Circular Conduit Node',
      riskScore: 68,
      riskSeverity: 'Medium',
      totalOutflow: '₹4,40,000',
      totalInflow: '₹4,40,000',
      flagPattern: 'Circular Loop',
    }
  },
  {
    id: 'node-vortex',
    type: 'accountNode',
    position: { x: 1450, y: 80 },
    data: {
      accountNumber: '293847192837',
      holderName: 'Vortex Global Tech LLP',
      bank: 'ICICI Bank',
      role: 'Layering Intermediary',
      riskScore: 78,
      riskSeverity: 'High',
      totalOutflow: '₹2,15,000',
      totalInflow: '₹2,15,000',
      flagPattern: 'Intermediary Relay',
    }
  },
  {
    id: 'node-cashout',
    type: 'accountNode',
    position: { x: 1450, y: 320 },
    data: {
      accountNumber: 'ATM-990192',
      holderName: 'Cash Out Terminal #44',
      bank: 'ICICI ATM Network',
      role: 'Physical Extraction Exit',
      riskScore: 95,
      riskSeverity: 'Critical',
      totalOutflow: '₹0',
      totalInflow: '₹1,95,000',
      isCashOut: true,
      flagPattern: 'Cash Withdrawal',
    }
  },
  {
    id: 'node-clean-b2b',
    type: 'accountNode',
    position: { x: 380, y: 440 },
    data: {
      accountNumber: '551928371920',
      holderName: 'National Retailers Ltd',
      bank: 'Punjab National Bank',
      role: 'Verified Commercial B2B',
      riskScore: 18,
      riskSeverity: 'Low',
      totalOutflow: '₹8,50,000',
      totalInflow: '₹0',
      isClean: true,
    }
  }
];

export const GRAPH_EDGES = [
  {
    id: 'edge-1',
    source: 'node-origin',
    target: 'node-kishore',
    animated: true,
    style: { stroke: '#EF4444', strokeWidth: 2.5 },
    data: {
      utr: 'UTR20261018812901',
      amount: '₹4,80,000',
      rawAmount: 480000,
      channel: 'IMPS',
      timestamp: '14:13:00',
      pattern: 'Inbound Influx',
      isSuspiciousPath: true,
    }
  },
  {
    id: 'edge-2',
    source: 'node-kishore',
    target: 'node-apex',
    animated: true,
    style: { stroke: '#EF4444', strokeWidth: 3 },
    data: {
      utr: 'UTR20261018948192',
      amount: '₹4,50,000',
      rawAmount: 450000,
      channel: 'IMPS',
      timestamp: '14:24:10 (11m delta)',
      pattern: 'Rapid Pass-Through',
      rule: 'RULE-VELOCITY-04',
      isSuspiciousPath: true,
    }
  },
  {
    id: 'edge-3',
    source: 'node-apex',
    target: 'node-pooja',
    animated: true,
    style: { stroke: '#EF4444', strokeWidth: 3 },
    data: {
      utr: 'UTR20261018948195',
      amount: '₹4,40,000',
      rawAmount: 440000,
      channel: 'RTGS',
      timestamp: '14:28:44',
      pattern: 'Rapid Relay',
      rule: 'RULE-VELOCITY-04',
      isSuspiciousPath: true,
    }
  },
  {
    id: 'edge-4',
    source: 'node-pooja',
    target: 'node-vortex',
    animated: true,
    style: { stroke: '#F59E0B', strokeWidth: 2 },
    data: {
      utr: 'UTR20261018948201',
      amount: '₹2,15,000',
      rawAmount: 215000,
      channel: 'IMPS',
      timestamp: '14:35:12',
      pattern: 'Fund Splitting (Tranche A)',
      rule: 'RULE-SPLIT-02',
      isSuspiciousPath: true,
    }
  },
  {
    id: 'edge-5',
    source: 'node-pooja',
    target: 'node-suresh',
    animated: true,
    style: { stroke: '#F59E0B', strokeWidth: 2 },
    data: {
      utr: 'UTR20261018948205',
      amount: '₹2,20,000',
      rawAmount: 220000,
      channel: 'IMPS',
      timestamp: '14:36:04',
      pattern: 'Fund Splitting (Tranche B)',
      rule: 'RULE-SPLIT-02',
      isSuspiciousPath: true,
    }
  },
  {
    id: 'edge-6',
    source: 'node-suresh',
    target: 'node-kishore',
    animated: true,
    style: { stroke: '#3B82F6', strokeWidth: 2, strokeDasharray: '4 4' },
    data: {
      utr: 'UTR20261018749102',
      amount: '₹1,50,000',
      rawAmount: 150000,
      channel: 'IMPS',
      timestamp: '12:15:30',
      pattern: 'Circular Velocity Loop',
      rule: 'RULE-LOOP-05',
      isSuspiciousPath: true,
    }
  },
  {
    id: 'edge-7',
    source: 'node-vortex',
    target: 'node-cashout',
    animated: true,
    style: { stroke: '#DC2626', strokeWidth: 3 },
    data: {
      utr: 'ATM-49102-SURAT',
      amount: '₹1,95,000',
      rawAmount: 195000,
      channel: 'CASH_ATM',
      timestamp: '15:10:00',
      pattern: 'Cash-Out Layering Exit',
      rule: 'RULE-CASHOUT-06',
      isSuspiciousPath: true,
    }
  },
  {
    id: 'edge-8',
    source: 'node-clean-b2b',
    target: 'node-suresh',
    animated: false,
    style: { stroke: '#94A3B8', strokeWidth: 1.5 },
    data: {
      utr: 'UTR20261018610291',
      amount: '₹8,50,000',
      rawAmount: 850000,
      channel: 'RTGS',
      timestamp: '11:02:18',
      pattern: 'Standard B2B Payment',
      isSuspiciousPath: false,
    }
  }
];
