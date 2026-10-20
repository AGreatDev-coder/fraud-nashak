import React from 'react';
import { Search, Filter, RotateCcw, AlertTriangle, ShieldCheck, Zap } from 'lucide-react';

export default function TransactionFilters({
  searchQuery,
  setSearchQuery,
  selectedSeverity,
  setSelectedSeverity,
  selectedChannel,
  setSelectedChannel,
  selectedPattern,
  setSelectedPattern,
  selectedAmountRange,
  setSelectedAmountRange,
  onReset
}) {
  const severities = [
    { id: 'ALL', label: 'All Severity' },
    { id: 'Critical', label: 'Critical (80-100)', color: 'text-red-700 bg-red-50 border-red-200' },
    { id: 'High', label: 'High (60-79)', color: 'text-amber-700 bg-amber-50 border-amber-200' },
    { id: 'Medium', label: 'Medium (40-59)', color: 'text-yellow-700 bg-yellow-50 border-yellow-200' },
    { id: 'Low', label: 'Normal / Low (<40)', color: 'text-emerald-700 bg-emerald-50 border-emerald-200' },
  ];

  const channels = ['ALL', 'UPI', 'IMPS', 'RTGS', 'NEFT', 'CASH_ATM'];

  const patterns = [
    'ALL',
    'Rapid Pass-Through',
    'Fan-In Smurfing',
    'Threshold Structuring',
    'Fund Splitting (Fan-Out)',
    'Circular Velocity',
    'Cash-Out Layering'
  ];

  const amountRanges = [
    { id: 'ALL', label: 'All Amounts' },
    { id: 'UNDER_50K', label: '< ₹50K (Structuring Zone)' },
    { id: '50K_TO_2L', label: '₹50K – ₹2L' },
    { id: 'OVER_2L', label: '> ₹2L (High Value)' },
  ];

  return (
    <div className="bg-surface rounded-xl border border-surface-border p-5 shadow-xs space-y-4">
      {/* Search & Top Action */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by UTR reference, Account Number, Bank IFSC, or Holder Name..."
            className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-9 pr-4 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all"
          />
        </div>

        <button
          onClick={onReset}
          className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200/80 rounded-lg transition-colors shrink-0"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Filters</span>
        </button>
      </div>

      {/* Filter Row 1: Severity & Pattern */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3 pt-1">
        {/* Risk Severity Pills */}
        <div className="md:col-span-7 flex flex-wrap items-center gap-1.5">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mr-1">Risk Tier:</span>
          {severities.map((sev) => (
            <button
              key={sev.id}
              onClick={() => setSelectedSeverity(sev.id)}
              className={`px-2.5 py-1 rounded-md text-xs font-medium border transition-all ${
                selectedSeverity === sev.id
                  ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                  : 'bg-surface text-slate-600 border-slate-200 hover:bg-slate-50'
              }`}
            >
              {sev.label}
            </button>
          ))}
        </div>

        {/* Pattern Select Dropdown */}
        <div className="md:col-span-5 flex items-center gap-2">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider shrink-0">Pattern:</span>
          <select
            value={selectedPattern}
            onChange={(e) => setSelectedPattern(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
          >
            {patterns.map((pat) => (
              <option key={pat} value={pat}>
                {pat === 'ALL' ? 'All Detected Patterns' : pat}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Filter Row 2: Channel & Amount Range */}
      <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-slate-100 text-xs">
        {/* Payment Channels */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mr-1">Channel:</span>
          {channels.map((ch) => (
            <button
              key={ch}
              onClick={() => setSelectedChannel(ch)}
              className={`px-2.5 py-1 rounded-md text-xs font-mono font-medium transition-colors ${
                selectedChannel === ch
                  ? 'bg-brand-50 text-brand-700 border border-brand-200 font-semibold'
                  : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100'
              }`}
            >
              {ch}
            </button>
          ))}
        </div>

        {/* Amount Buckets */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mr-1">Value:</span>
          {amountRanges.map((rng) => (
            <button
              key={rng.id}
              onClick={() => setSelectedAmountRange(rng.id)}
              className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors ${
                selectedAmountRange === rng.id
                  ? 'bg-slate-800 text-white font-semibold'
                  : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100 border border-transparent'
              }`}
            >
              {rng.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
