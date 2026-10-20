import React from 'react';
import { 
  Search, 
  ShieldAlert, 
  Briefcase, 
  Clock, 
  ArrowRight, 
  CheckCircle2, 
  FolderLock,
  Layers
} from 'lucide-react';

export default function CaseListLedger({
  cases,
  selectedCaseId,
  onSelectCase,
  searchQuery,
  setSearchQuery,
  statusFilter,
  setStatusFilter
}) {
  const statusOptions = [
    { id: 'ALL', label: 'All Cases' },
    { id: 'Pending Bank Lien / Freeze', label: 'Pending Lien' },
    { id: 'Under Investigation', label: 'In Progress' },
    { id: 'Evidence Packaged for FIR', label: 'Packaged' }
  ];

  const filteredCases = cases.filter((c) => {
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matches = 
        c.id.toLowerCase().includes(q) ||
        c.title.toLowerCase().includes(q) ||
        c.targetAccount.toLowerCase().includes(q) ||
        c.targetHolder.toLowerCase().includes(q);
      if (!matches) return false;
    }

    if (statusFilter !== 'ALL' && c.status !== statusFilter) {
      return false;
    }

    return true;
  });

  return (
    <div className="bg-surface rounded-xl border border-surface-border p-5 shadow-xs flex flex-col h-full space-y-4">
      {/* Header & Search */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FolderLock className="w-4 h-4 text-brand-600" />
            <h2 className="text-sm font-bold text-slate-900 tracking-tight">
              Investigation Master Ledger
            </h2>
          </div>
          <span className="text-xs font-mono font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
            {filteredCases.length} Cases
          </span>
        </div>

        {/* Search Input */}
        <div className="relative">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search Case ID, Target Account, Title..."
            className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-8 pr-3 py-1.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
          />
        </div>

        {/* Status Filter Buttons */}
        <div className="flex flex-wrap gap-1 bg-slate-100 p-1 rounded-lg">
          {statusOptions.map((opt) => (
            <button
              key={opt.id}
              onClick={() => setStatusFilter(opt.id)}
              className={`px-2.5 py-1 rounded text-[11px] font-medium transition-all ${
                statusFilter === opt.id
                  ? 'bg-surface text-slate-900 font-bold shadow-xs'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Case List Cards */}
      <div className="space-y-2.5 flex-1 overflow-y-auto pr-1">
        {filteredCases.length === 0 ? (
          <div className="text-center py-10 text-slate-400 text-xs">
            No cases match the selected filter.
          </div>
        ) : (
          filteredCases.map((c) => {
            const isSelected = selectedCaseId === c.id;
            return (
              <div
                key={c.id}
                onClick={() => onSelectCase(c.id)}
                className={`p-3.5 rounded-xl border transition-all cursor-pointer text-xs space-y-2 ${
                  isSelected
                    ? 'bg-brand-50/50 border-brand-400 shadow-sm'
                    : 'bg-surface hover:bg-slate-50 border-surface-border'
                }`}
              >
                {/* Case Top Bar */}
                <div className="flex items-center justify-between">
                  <span className="font-mono font-bold text-slate-900 text-xs flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-brand-600"></span>
                    #{c.id}
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded-full font-mono font-bold text-[10px] border ${
                      c.priority === 'Critical'
                        ? 'bg-red-50 text-red-700 border-red-200'
                        : 'bg-amber-50 text-amber-700 border-amber-200'
                    }`}
                  >
                    {c.priority}
                  </span>
                </div>

                {/* Case Title */}
                <h3 className="font-bold text-slate-800 line-clamp-1 leading-snug">
                  {c.title}
                </h3>

                {/* Target Account & Bank */}
                <div className="text-[11px] text-slate-500 flex items-center justify-between">
                  <span>Target: <strong className="text-slate-700">{c.targetHolder}</strong></span>
                  <span className="font-mono text-slate-400">{c.targetBank}</span>
                </div>

                {/* Footer: Volume & Status */}
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
                  <span className="font-mono font-bold text-slate-900">
                    {c.volumeAtRisk}
                  </span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-semibold border ${
                    c.status.includes('Lien')
                      ? 'bg-red-50 text-red-700 border-red-200'
                      : c.status.includes('FIR')
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                      : 'bg-slate-100 text-slate-700 border-slate-200'
                  }`}>
                    {c.status}
                  </span>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
