import React from 'react';
import { 
  Search, 
  RotateCcw, 
  Sparkles, 
  Filter, 
  Layers, 
  AlertOctagon, 
  ShieldCheck 
} from 'lucide-react';

export default function GraphControlsBar({
  searchQuery,
  setSearchQuery,
  highlightSyndicate,
  setHighlightSyndicate,
  minAmountFilter,
  setMinAmountFilter,
  riskFilter,
  setRiskFilter,
  onReset
}) {
  return (
    <div className="bg-surface/90 backdrop-blur-md rounded-xl border border-surface-border p-3.5 shadow-md flex flex-wrap items-center justify-between gap-3 text-xs">
      {/* Search Node */}
      <div className="relative w-64">
        <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Locate node (Name, Bank, Account)..."
          className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-8 pr-3 py-1.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
        />
      </div>

      {/* Middle Controls: Filters & Toggles */}
      <div className="flex flex-wrap items-center gap-2">
        {/* Syndicate Path Highlighting */}
        <button
          onClick={() => setHighlightSyndicate(!highlightSyndicate)}
          className={`px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1.5 border transition-all ${
            highlightSyndicate
              ? 'bg-red-600 text-white border-red-600 shadow-xs'
              : 'bg-red-50 text-red-700 border-red-200 hover:bg-red-100'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>{highlightSyndicate ? 'Mule Ring Highlighted' : 'Trace Mule Syndicate Flow'}</span>
        </button>

        {/* Amount Filter */}
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg">
          <span className="text-[10px] font-semibold text-slate-400 uppercase px-1.5">Value:</span>
          {[
            { id: 0, label: 'All Transfers' },
            { id: 200000, label: '> ₹2L' },
            { id: 400000, label: '> ₹4L' }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setMinAmountFilter(item.id)}
              className={`px-2 py-0.5 rounded text-[11px] font-medium transition-colors ${
                minAmountFilter === item.id
                  ? 'bg-surface text-slate-900 shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Risk Filter */}
        <button
          onClick={() => setRiskFilter(riskFilter === 'ALL' ? 'SUSPICIOUS_ONLY' : 'ALL')}
          className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
            riskFilter === 'SUSPICIOUS_ONLY'
              ? 'bg-slate-900 text-white border-slate-900'
              : 'bg-surface text-slate-700 border-slate-200 hover:bg-slate-50'
          }`}
        >
          {riskFilter === 'SUSPICIOUS_ONLY' ? 'Suspicious Nodes Only' : 'All Nodes'}
        </button>
      </div>

      {/* Reset Camera / Layout */}
      <button
        onClick={onReset}
        className="px-2.5 py-1.5 rounded-lg text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200/80 font-semibold flex items-center gap-1 transition-colors"
      >
        <RotateCcw className="w-3.5 h-3.5" />
        <span>Reset Canvas</span>
      </button>
    </div>
  );
}
