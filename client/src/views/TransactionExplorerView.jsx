import React, { useState, useEffect } from 'react';
import TransactionFilters from '../components/transactions/TransactionFilters';
import TransactionTable from '../components/transactions/TransactionTable';
import TransactionDetailDrawer from '../components/transactions/TransactionDetailDrawer';
import { MOCK_TRANSACTIONS, TRANSACTION_SUMMARY_METRICS } from '../data/mockTransactionData';
import { getTransactions, addCaseEvidence } from '../services/api';
import { 
  ArrowLeftRight, 
  Download, 
  ShieldAlert, 
  Zap, 
  Layers, 
  Filter,
  CheckCircle2,
  FileSpreadsheet,
  Loader2
} from 'lucide-react';

export default function TransactionExplorerView({ onNavigateToAccount }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSeverity, setSelectedSeverity] = useState('ALL');
  const [selectedChannel, setSelectedChannel] = useState('ALL');
  const [selectedPattern, setSelectedPattern] = useState('ALL');
  const [selectedAmountRange, setSelectedAmountRange] = useState('ALL');
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [pinnedCases, setPinnedCases] = useState([]);
  
  const [transactions, setTransactions] = useState(MOCK_TRANSACTIONS);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    const minAmount = selectedAmountRange === '50K_TO_2L' ? 50000 : selectedAmountRange === 'OVER_2L' ? 200000 : null;
    const maxAmount = selectedAmountRange === 'UNDER_50K' ? 50000 : selectedAmountRange === '50K_TO_2L' ? 200000 : null;

    getTransactions({
      search: searchQuery,
      severity: selectedSeverity,
      channel: selectedChannel,
      pattern: selectedPattern,
      minAmount,
      maxAmount
    }).then((data) => {
      if (isMounted) {
        if (data && data.length > 0) {
          setTransactions(data);
        } else {
          // Client fallback filtering
          let local = [...MOCK_TRANSACTIONS];
          if (searchQuery.trim()) {
            const q = searchQuery.toLowerCase();
            local = local.filter(tx => 
              tx.utr.toLowerCase().includes(q) ||
              tx.senderAccount.toLowerCase().includes(q) ||
              tx.receiverAccount.toLowerCase().includes(q) ||
              tx.senderName.toLowerCase().includes(q) ||
              tx.receiverName.toLowerCase().includes(q)
            );
          }
          if (selectedSeverity !== 'ALL') local = local.filter(tx => tx.riskSeverity === selectedSeverity);
          if (selectedChannel !== 'ALL') local = local.filter(tx => tx.channel === selectedChannel);
          if (selectedPattern !== 'ALL') local = local.filter(tx => tx.pattern === selectedPattern);
          setTransactions(local);
        }
        setLoading(false);
      }
    });

    return () => { isMounted = false; };
  }, [searchQuery, selectedSeverity, selectedChannel, selectedPattern, selectedAmountRange]);

  const handleReset = () => {
    setSearchQuery('');
    setSelectedSeverity('ALL');
    setSelectedChannel('ALL');
    setSelectedPattern('ALL');
    setSelectedAmountRange('ALL');
  };

  const handleAddToCase = async (txn) => {
    if (!pinnedCases.some(item => item.id === txn.id)) {
      setPinnedCases(prev => [...prev, txn]);
    }
    const evidenceData = {
      type: 'TRANSACTION',
      utr: txn.utr,
      amount: txn.formattedAmount || `₹${Number(txn.amount || 0).toLocaleString('en-IN')}`,
      channel: txn.channel,
      timestamp: txn.timestamp,
      riskScore: txn.riskScore,
      rule: txn.ruleTriggered || txn.pattern || 'Suspicious Mule Pass-Through',
      detail: `Transfer of ${txn.formattedAmount || txn.amount} from ${txn.senderName} (${txn.senderAccount}) to ${txn.receiverName} (${txn.receiverAccount}) via ${txn.channel}. Detected pattern: ${txn.pattern}.`
    };
    await addCaseEvidence('CS-108', evidenceData);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
              Transaction Explorer
            </h1>
            <span className="text-xs px-2.5 py-0.5 rounded-full font-semibold bg-brand-50 text-brand-700 border border-brand-200">
              API Connected
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Search, filter, and inspect financial transactions across partner banks to trace mule fund layering.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => alert(`Exporting ${transactions.length} filtered records to CSV...`)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-700 bg-surface hover:bg-slate-50 border border-surface-border rounded-lg shadow-xs transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Quick Summary Telemetry Bar */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-surface rounded-xl border border-surface-border p-4 shadow-xs">
          <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
            Total Transactions Screened
          </div>
          <div className="mt-1 font-mono text-xl font-bold text-slate-900">
            {TRANSACTION_SUMMARY_METRICS.totalScreened.toLocaleString('en-IN')}
          </div>
          <div className="text-[11px] text-slate-400 mt-0.5">Audit cycle 2026-Q4</div>
        </div>

        <div className="bg-surface rounded-xl border border-surface-border p-4 shadow-xs">
          <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
            Flagged Suspicious Transfers
          </div>
          <div className="mt-1 font-mono text-xl font-bold text-red-600">
            {TRANSACTION_SUMMARY_METRICS.flaggedTransfers}
          </div>
          <div className="text-[11px] text-red-500 mt-0.5">30.9% anomaly rate</div>
        </div>

        <div className="bg-surface rounded-xl border border-surface-border p-4 shadow-xs">
          <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
            High-Risk Inflow Volume
          </div>
          <div className="mt-1 font-mono text-xl font-bold text-slate-900">
            {TRANSACTION_SUMMARY_METRICS.flaggedVolume}
          </div>
          <div className="text-[11px] text-slate-400 mt-0.5">Layered across flagged nodes</div>
        </div>

        <div className="bg-surface rounded-xl border border-surface-border p-4 shadow-xs">
          <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
            Case Evidence Pinned
          </div>
          <div className="mt-1 font-mono text-xl font-bold text-brand-600">
            {pinnedCases.length} Transactions
          </div>
          <div className="text-[11px] text-brand-600 mt-0.5">Active investigation session</div>
        </div>
      </div>

      {/* Multi-faceted Filter Controls */}
      <TransactionFilters
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedSeverity={selectedSeverity}
        setSelectedSeverity={setSelectedSeverity}
        selectedChannel={selectedChannel}
        setSelectedChannel={setSelectedChannel}
        selectedPattern={selectedPattern}
        setSelectedPattern={setSelectedPattern}
        selectedAmountRange={selectedAmountRange}
        setSelectedAmountRange={setSelectedAmountRange}
        onReset={handleReset}
      />

      {/* Forensic Ledger Table */}
      <div className="relative">
        {loading && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/70 rounded-xl">
            <div className="flex items-center gap-2">
              <Loader2 className="w-5 h-5 text-brand-600 animate-spin" />
              <span className="text-xs font-semibold text-slate-600">Fetching transactions from API…</span>
            </div>
          </div>
        )}
        <TransactionTable
          transactions={transactions}
          onSelectTransaction={(txn) => setSelectedTransaction(txn)}
        />
      </div>

      {/* Detail Slide-out Drawer */}
      {selectedTransaction && (
        <TransactionDetailDrawer
          transaction={selectedTransaction}
          onClose={() => setSelectedTransaction(null)}
          onAddToCase={handleAddToCase}
        />
      )}
    </div>
  );
}
