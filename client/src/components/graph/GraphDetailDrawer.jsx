import React from 'react';
import { 
  X, 
  ShieldAlert, 
  ArrowRight, 
  Building2, 
  Copy, 
  CheckCircle2, 
  Clock, 
  ExternalLink,
  FolderPlus,
  AlertTriangle
} from 'lucide-react';

export default function GraphDetailDrawer({
  selectedItem,
  itemType,
  onClose,
  onNavigateToAccount
}) {
  if (!selectedItem) return null;

  return (
    <div className="absolute top-20 right-6 w-96 bg-surface/95 backdrop-blur-md rounded-2xl border border-surface-border shadow-2xl p-5 z-20 animate-in slide-in-from-right duration-150 text-xs space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-surface-border">
        <div className="flex items-center gap-2">
          <ShieldAlert className={`w-4 h-4 ${itemType === 'node' ? 'text-red-600' : 'text-brand-600'}`} />
          <h3 className="font-bold text-slate-900">
            {itemType === 'node' ? 'Account Node Inspector' : 'Directed Transfer Vector'}
          </h3>
        </div>
        <button
          onClick={onClose}
          className="text-slate-400 hover:text-slate-700 p-1 rounded-lg"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Node Inspector Details */}
      {itemType === 'node' && (
        <div className="space-y-3.5">
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-sm text-slate-900">{selectedItem.data.holderName}</span>
              <span className="px-2 py-0.5 rounded-full font-mono font-bold text-xs bg-red-50 text-red-700 border border-red-200">
                {selectedItem.data.riskScore}/100
              </span>
            </div>
            <div className="font-mono text-slate-500 text-[11px]">{selectedItem.data.accountNumber}</div>
            <div className="text-slate-500 text-xs flex items-center gap-1.5">
              <Building2 className="w-3.5 h-3.5 text-slate-400" />
              <span>{selectedItem.data.bank}</span>
            </div>
          </div>

          <div className="p-3 bg-red-50/70 border border-red-200 rounded-xl space-y-1">
            <span className="text-[10px] font-bold text-red-900 uppercase">Assigned Mule Role</span>
            <p className="font-semibold text-red-700">{selectedItem.data.role}</p>
            {selectedItem.data.flagPattern && (
              <p className="text-[11px] text-red-600/90">Flag: {selectedItem.data.flagPattern}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-2 text-center">
            <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200">
              <span className="text-[10px] text-slate-400 block uppercase">24h Inflow</span>
              <span className="font-mono font-bold text-emerald-600">{selectedItem.data.totalInflow}</span>
            </div>
            <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200">
              <span className="text-[10px] text-slate-400 block uppercase">24h Outflow</span>
              <span className="font-mono font-bold text-red-600">{selectedItem.data.totalOutflow}</span>
            </div>
          </div>

          <button
            onClick={() => onNavigateToAccount && onNavigateToAccount(selectedItem.data.accountNumber)}
            className="w-full py-2 bg-brand-600 hover:bg-brand-700 text-white font-semibold rounded-lg shadow-xs flex items-center justify-center gap-1.5 transition-colors"
          >
            <span>Open Full Account Dossier</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Edge Inspector Details */}
      {itemType === 'edge' && (
        <div className="space-y-3.5">
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-slate-500 font-semibold text-[11px] uppercase">Transfer Volume</span>
              <span className="font-mono font-bold text-slate-900 text-sm">{selectedItem.data.amount}</span>
            </div>
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-slate-400">Channel</span>
              <span className="font-mono font-bold text-brand-600">{selectedItem.data.channel}</span>
            </div>
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-slate-400">Timestamp</span>
              <span className="font-mono text-slate-700">{selectedItem.data.timestamp}</span>
            </div>
          </div>

          <div className="p-3 bg-red-50/70 border border-red-200 rounded-xl space-y-1">
            <span className="text-[10px] font-bold text-red-900 uppercase">Multi-Hop Heuristic Flag</span>
            <p className="font-semibold text-red-700">{selectedItem.data.pattern}</p>
            {selectedItem.data.rule && (
              <p className="text-[11px] font-mono text-red-600/90">{selectedItem.data.rule}</p>
            )}
          </div>

          <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200 font-mono text-[11px] text-slate-600 truncate">
            UTR: {selectedItem.data.utr}
          </div>

          <button
            onClick={() => alert(`Transaction ${selectedItem.data.utr} pinned to active case file.`)}
            className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-lg shadow-xs flex items-center justify-center gap-1.5 transition-colors"
          >
            <FolderPlus className="w-3.5 h-3.5" />
            <span>Pin Vector to Case Dossier</span>
          </button>
        </div>
      )}
    </div>
  );
}
