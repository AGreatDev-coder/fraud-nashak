import React from 'react';
import { 
  Network, 
  ArrowRight, 
  ArrowUpRight, 
  ArrowDownLeft, 
  ShieldAlert, 
  ExternalLink 
} from 'lucide-react';

export default function CounterpartyList({ counterparties, onSelectAccount }) {
  return (
    <div className="bg-surface rounded-xl border border-surface-border p-6 shadow-xs space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-surface-border">
        <div>
          <h2 className="text-sm font-bold text-slate-900 tracking-tight">
            Connected Counterparty Nodes
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Primary remitter and beneficiary entities linked to this account.
          </p>
        </div>
        <span className="text-xs font-mono font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
          {counterparties.length} Nodes
        </span>
      </div>

      <div className="space-y-3">
        {counterparties.map((cp, idx) => (
          <div
            key={idx}
            className="p-3.5 rounded-lg border border-slate-200 bg-slate-50/40 hover:bg-slate-50 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3"
          >
            {/* Counterparty Identity */}
            <div className="space-y-0.5">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-900">
                  {cp.holderName}
                </span>
                <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded border font-semibold ${
                  cp.direction === 'Outflow'
                    ? 'bg-red-50 text-red-700 border-red-200'
                    : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                }`}>
                  {cp.direction}
                </span>
              </div>
              <div className="text-[11px] text-slate-500 flex items-center gap-2">
                <span className="font-mono">{cp.accountNumber}</span>
                <span className="text-slate-300">•</span>
                <span>{cp.bank}</span>
              </div>
              <div className="text-[10px] text-slate-400">
                Role: <strong className="text-slate-700">{cp.relationship}</strong>
              </div>
            </div>

            {/* Volume & Actions */}
            <div className="flex items-center justify-between sm:justify-end gap-4 shrink-0">
              <div className="text-right">
                <div className="font-mono font-bold text-xs text-slate-900">
                  {cp.volumeExchanged}
                </div>
                <div className="text-[10px] text-slate-400">
                  {cp.transactionCount} transfers
                </div>
              </div>

              {/* Risk Badge */}
              <span className={`px-2 py-0.5 rounded-full font-mono font-bold text-xs border ${
                cp.counterpartyRisk >= 80
                  ? 'bg-red-50 text-red-700 border-red-200'
                  : 'bg-amber-50 text-amber-700 border-amber-200'
              }`}>
                {cp.counterpartyRisk}
              </span>

              {/* Action Button */}
              {onSelectAccount && (
                <button
                  onClick={() => onSelectAccount(cp.accountNumber)}
                  title="Inspect Counterparty Dossier"
                  className="p-1.5 rounded-lg text-slate-500 hover:text-brand-600 hover:bg-brand-50 border border-slate-200 hover:border-brand-200 transition-colors"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
