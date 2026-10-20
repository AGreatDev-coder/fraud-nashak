import React, { useState } from 'react';
import { 
  ArrowUpDown, 
  Copy, 
  CheckCircle2, 
  Eye, 
  ArrowRight, 
  AlertOctagon, 
  ShieldCheck, 
  Clock, 
  Layers,
  ExternalLink
} from 'lucide-react';

export default function TransactionTable({ transactions, onSelectTransaction }) {
  const [copiedKey, setCopiedKey] = useState(null);
  const [sortField, setSortField] = useState('timestamp');
  const [sortOrder, setSortOrder] = useState('desc');

  const handleCopy = (text, key) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 1800);
  };

  const handleSort = (field) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('desc');
    }
  };

  const sortedTransactions = [...transactions].sort((a, b) => {
    let aVal = a[sortField];
    let bVal = b[sortField];

    if (sortField === 'amount' || sortField === 'riskScore') {
      return sortOrder === 'asc' ? aVal - bVal : bVal - aVal;
    }
    // String or date
    return sortOrder === 'asc'
      ? String(aVal).localeCompare(String(bVal))
      : String(bVal).localeCompare(String(aVal));
  });

  const getChannelBadge = (ch) => {
    switch (ch) {
      case 'UPI':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'IMPS':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'RTGS':
        return 'bg-sky-50 text-sky-700 border-sky-200';
      case 'NEFT':
        return 'bg-teal-50 text-teal-700 border-teal-200';
      case 'CASH_ATM':
        return 'bg-amber-50 text-amber-800 border-amber-200 font-bold';
      default:
        return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="bg-surface rounded-xl border border-surface-border shadow-xs overflow-hidden">
      {/* Table Toolbar */}
      <div className="px-6 py-4 border-b border-surface-border flex items-center justify-between text-xs text-slate-500">
        <span className="font-medium">
          Showing <strong className="text-slate-900 font-mono">{sortedTransactions.length}</strong> forensic transactions
        </span>
        <div className="flex items-center gap-2">
          <span className="text-[11px] text-slate-400">Sort by:</span>
          <button
            onClick={() => handleSort('timestamp')}
            className={`px-2.5 py-1 rounded border font-medium ${
              sortField === 'timestamp' ? 'bg-slate-100 text-slate-900 border-slate-300' : 'border-slate-200'
            }`}
          >
            Timestamp {sortField === 'timestamp' && (sortOrder === 'desc' ? '↓' : '↑')}
          </button>
          <button
            onClick={() => handleSort('amount')}
            className={`px-2.5 py-1 rounded border font-medium ${
              sortField === 'amount' ? 'bg-slate-100 text-slate-900 border-slate-300' : 'border-slate-200'
            }`}
          >
            Amount {sortField === 'amount' && (sortOrder === 'desc' ? '↓' : '↑')}
          </button>
          <button
            onClick={() => handleSort('riskScore')}
            className={`px-2.5 py-1 rounded border font-medium ${
              sortField === 'riskScore' ? 'bg-slate-100 text-slate-900 border-slate-300' : 'border-slate-200'
            }`}
          >
            Risk Score {sortField === 'riskScore' && (sortOrder === 'desc' ? '↓' : '↑')}
          </button>
        </div>
      </div>

      {/* Forensic Data Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/75 border-b border-surface-border text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
              <th className="py-3.5 px-6">UTR & Timestamp</th>
              <th className="py-3.5 px-6">Sender Entity</th>
              <th className="py-3.5 px-6">Beneficiary / Receiver</th>
              <th className="py-3.5 px-6 text-center">Channel</th>
              <th className="py-3.5 px-6 text-right">Amount (₹)</th>
              <th className="py-3.5 px-6 text-center">Mule Risk Score</th>
              <th className="py-3.5 px-6">Pattern Detected</th>
              <th className="py-3.5 px-6 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-xs">
            {sortedTransactions.length === 0 ? (
              <tr>
                <td colSpan="8" className="py-12 text-center text-slate-400">
                  No transactions match the selected filters. Try broadening your criteria.
                </td>
              </tr>
            ) : (
              sortedTransactions.map((tx) => (
                <tr 
                  key={tx.id} 
                  className="hover:bg-slate-50/80 transition-colors group"
                >
                  {/* UTR & Timestamp */}
                  <td className="py-4 px-6 whitespace-nowrap">
                    <div className="flex items-center gap-1.5 font-mono font-semibold text-slate-900">
                      <span>{tx.utr}</span>
                      <button
                        onClick={() => handleCopy(tx.utr, `utr-${tx.id}`)}
                        title="Copy UTR Reference"
                        className="text-slate-400 hover:text-slate-700 p-0.5 rounded transition-colors"
                      >
                        {copiedKey === `utr-${tx.id}` ? (
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>
                    <div className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5 font-sans">
                      <Clock className="w-3 h-3 text-slate-300" />
                      {tx.timestamp}
                    </div>
                  </td>

                  {/* Sender Entity */}
                  <td className="py-4 px-6">
                    <div className="font-semibold text-slate-800">{tx.senderName}</div>
                    <div className="flex items-center gap-1.5 text-[11px] text-slate-400 font-mono mt-0.5">
                      <span>{tx.senderAccount}</span>
                      <span className="text-slate-300">•</span>
                      <span className="font-sans text-slate-500">{tx.senderBank}</span>
                    </div>
                  </td>

                  {/* Beneficiary Entity */}
                  <td className="py-4 px-6">
                    <div className="font-semibold text-slate-800">{tx.receiverName}</div>
                    <div className="flex items-center gap-1.5 text-[11px] text-slate-400 font-mono mt-0.5">
                      <span>{tx.receiverAccount}</span>
                      <span className="text-slate-300">•</span>
                      <span className="font-sans text-slate-500">{tx.receiverBank}</span>
                    </div>
                  </td>

                  {/* Channel Badge */}
                  <td className="py-4 px-6 text-center">
                    <span className={`inline-block px-2.5 py-1 rounded-md text-[11px] font-mono border ${getChannelBadge(tx.channel)}`}>
                      {tx.channel}
                    </span>
                  </td>

                  {/* Amount */}
                  <td className="py-4 px-6 text-right whitespace-nowrap">
                    <div className="font-mono font-bold text-slate-900 text-sm">
                      {tx.formattedAmount}
                    </div>
                    <div className="text-[10px] text-slate-400 font-mono">
                      Gross transfer
                    </div>
                  </td>

                  {/* Mule Risk Score */}
                  <td className="py-4 px-6 text-center">
                    <span 
                      className={`inline-block px-2.5 py-0.5 rounded-full font-mono font-bold text-xs border ${
                        tx.riskScore >= 80
                          ? 'bg-red-50 text-red-700 border-red-200 ring-2 ring-red-100/50'
                          : tx.riskScore >= 60
                          ? 'bg-amber-50 text-amber-700 border-amber-200'
                          : tx.riskScore >= 40
                          ? 'bg-yellow-50 text-yellow-700 border-yellow-200'
                          : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                      }`}
                    >
                      {tx.riskScore}
                    </span>
                  </td>

                  {/* Pattern Detected */}
                  <td className="py-4 px-6 max-w-xs">
                    {tx.pattern !== 'None' ? (
                      <div>
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold bg-red-50 text-red-700 border border-red-200">
                          <AlertOctagon className="w-3 h-3 text-red-500" />
                          {tx.pattern}
                        </span>
                        <div className="text-[11px] text-slate-400 mt-1 truncate font-mono">
                          {tx.ruleTriggered}
                        </div>
                      </div>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium bg-slate-50 text-slate-500 border border-slate-200">
                        <ShieldCheck className="w-3 h-3 text-emerald-500" />
                        Clean Commercial Flow
                      </span>
                    )}
                  </td>

                  {/* Action */}
                  <td className="py-4 px-6 text-right whitespace-nowrap">
                    <button
                      onClick={() => onSelectTransaction(tx)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-brand-50 hover:bg-brand-600 text-brand-700 hover:text-white rounded-lg text-xs font-semibold border border-brand-200 hover:border-transparent transition-all shadow-xs"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Inspect</span>
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="p-4 bg-slate-50 border-t border-surface-border flex items-center justify-between text-xs text-slate-400">
        <span>Deterministic Rule Evaluation: Active on 12 sample multi-hop records</span>
        <span className="font-mono text-[11px]">PS-01 Forensic Ledger Engine</span>
      </div>
    </div>
  );
}
