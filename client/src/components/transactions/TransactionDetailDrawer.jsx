import React, { useState } from 'react';
import { 
  X, 
  ShieldAlert, 
  ArrowRight, 
  CheckCircle2, 
  Copy, 
  Globe, 
  MapPin, 
  Clock, 
  FileText, 
  FolderPlus, 
  Network, 
  AlertTriangle,
  CreditCard
} from 'lucide-react';

export default function TransactionDetailDrawer({ transaction, onClose, onAddToCase }) {
  const [copiedText, setCopiedText] = useState(null);
  const [addedSuccess, setAddedSuccess] = useState(false);

  if (!transaction) return null;

  const handleCopy = (text, key) => {
    navigator.clipboard.writeText(text);
    setCopiedText(key);
    setTimeout(() => setCopiedText(null), 1800);
  };

  const handleCaseAdd = () => {
    setAddedSuccess(true);
    if (onAddToCase) onAddToCase(transaction);
    setTimeout(() => setAddedSuccess(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="w-full max-w-xl bg-surface h-full shadow-2xl border-l border-surface-border flex flex-col overflow-y-auto animate-in slide-in-from-right duration-200">
        {/* Drawer Header */}
        <div className="p-6 border-b border-surface-border flex items-center justify-between sticky top-0 bg-surface z-10">
          <div className="flex items-center gap-2.5">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
              transaction.riskScore >= 80 ? 'bg-red-50 text-red-600 border border-red-200' : 'bg-slate-100 text-slate-700'
            }`}>
              <ShieldAlert className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-900">
                Forensic Transaction Dossier
              </h2>
              <div className="flex items-center gap-2 text-xs font-mono text-slate-400 mt-0.5">
                <span>{transaction.utr}</span>
                <button
                  onClick={() => handleCopy(transaction.utr, 'utr')}
                  className="hover:text-slate-700 p-0.5 rounded transition-colors"
                >
                  {copiedText === 'utr' ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6 flex-1 text-xs">
          {/* Fund Transfer Visual Path */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-4">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
              Direct Fund Flow Vector
            </span>

            <div className="flex items-center justify-between gap-3">
              {/* Sender Box */}
              <div className="flex-1 bg-surface p-3 rounded-lg border border-slate-200 shadow-xs">
                <div className="text-[10px] font-semibold text-slate-400 uppercase">Sender Node</div>
                <div className="font-bold text-slate-900 mt-0.5 truncate">{transaction.senderName}</div>
                <div className="font-mono text-slate-600 text-[11px] mt-0.5">{transaction.senderAccount}</div>
                <div className="text-slate-400 text-[10px] mt-0.5">{transaction.senderBank}</div>
              </div>

              {/* Arrow with Value */}
              <div className="flex flex-col items-center shrink-0 px-1">
                <span className="font-mono font-bold text-slate-900 text-xs">
                  {transaction.formattedAmount}
                </span>
                <div className="flex items-center text-brand-600 my-1">
                  <div className="h-0.5 w-8 bg-brand-500"></div>
                  <ArrowRight className="w-4 h-4 -ml-1" />
                </div>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-brand-50 text-brand-700 border border-brand-200">
                  {transaction.channel}
                </span>
              </div>

              {/* Receiver Box */}
              <div className="flex-1 bg-surface p-3 rounded-lg border border-slate-200 shadow-xs">
                <div className="text-[10px] font-semibold text-slate-400 uppercase">Beneficiary Node</div>
                <div className="font-bold text-slate-900 mt-0.5 truncate">{transaction.receiverName}</div>
                <div className="font-mono text-slate-600 text-[11px] mt-0.5">{transaction.receiverAccount}</div>
                <div className="text-slate-400 text-[10px] mt-0.5">{transaction.receiverBank}</div>
              </div>
            </div>
          </div>

          {/* Explainable Risk Evidence Card */}
          <div className={`p-4 rounded-xl border space-y-3 ${
            transaction.riskScore >= 80 
              ? 'bg-red-50/70 border-red-200 text-red-950' 
              : 'bg-amber-50/70 border-amber-200 text-amber-950'
          }`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <AlertTriangle className={`w-4 h-4 ${transaction.riskScore >= 80 ? 'text-red-600' : 'text-amber-600'}`} />
                <span className="font-bold text-xs uppercase tracking-wider">
                  Explainable Rule Flag: {transaction.ruleTriggered}
                </span>
              </div>
              <span className={`px-2 py-0.5 rounded-full font-mono font-bold text-xs border ${
                transaction.riskScore >= 80 ? 'bg-red-100 text-red-800 border-red-300' : 'bg-amber-100 text-amber-800 border-amber-300'
              }`}>
                Score: {transaction.riskScore}/100
              </span>
            </div>

            <p className="text-xs font-medium leading-relaxed">
              {transaction.ruleDescription}
            </p>

            <div className="text-[11px] text-slate-600 bg-white/80 p-2.5 rounded-lg border border-red-100 leading-normal">
              <strong>Forensic Impact:</strong> High probability of being a designated layering intermediary. Recommended next investigative step is tracing inbound hops preceding this UTR.
            </div>
          </div>

          {/* Technical Metadata Grid */}
          <div className="space-y-3">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
              Network & Ingestion Metadata
            </span>

            <div className="grid grid-cols-2 gap-3">
              <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                <span className="text-slate-400 text-[10px] uppercase font-semibold flex items-center gap-1">
                  <Clock className="w-3 h-3" /> Exact Ingestion Time
                </span>
                <p className="font-mono font-semibold text-slate-800 mt-1">{transaction.timestamp}</p>
              </div>

              <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                <span className="text-slate-400 text-[10px] uppercase font-semibold flex items-center gap-1">
                  <Globe className="w-3 h-3" /> Originating IP Address
                </span>
                <p className="font-mono font-semibold text-slate-800 mt-1">{transaction.ipAddress}</p>
              </div>

              <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                <span className="text-slate-400 text-[10px] uppercase font-semibold flex items-center gap-1">
                  <MapPin className="w-3 h-3" /> Device Geolocation
                </span>
                <p className="font-semibold text-slate-800 mt-1">{transaction.deviceLocation}</p>
              </div>

              <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                <span className="text-slate-400 text-[10px] uppercase font-semibold flex items-center gap-1">
                  <CreditCard className="w-3 h-3" /> Settlement Channel
                </span>
                <p className="font-mono font-semibold text-slate-800 mt-1">{transaction.channel}</p>
              </div>
            </div>

            {/* Narration Memo */}
            <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
              <span className="text-slate-400 text-[10px] uppercase font-semibold block">
                Banking Narration Memo
              </span>
              <p className="font-mono text-slate-700 text-xs mt-1 break-all bg-white p-2 rounded border border-slate-200">
                {transaction.narration}
              </p>
            </div>
          </div>
        </div>

        {/* Drawer Footer Actions */}
        <div className="p-4 border-t border-surface-border bg-slate-50 flex items-center justify-between gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-200 transition-colors"
          >
            Close
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCaseAdd}
              className={`px-3.5 py-2 rounded-lg text-xs font-semibold border transition-all flex items-center gap-1.5 ${
                addedSuccess 
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-300' 
                  : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
              }`}
            >
              {addedSuccess ? (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Pinned to Case</span>
                </>
              ) : (
                <>
                  <FolderPlus className="w-3.5 h-3.5 text-slate-500" />
                  <span>Attach to Case</span>
                </>
              )}
            </button>

            <button
              onClick={() => alert(`Pre-configured for Stage 4 Fund Flow Graph: Node path for ${transaction.utr}`)}
              className="px-3.5 py-2 rounded-lg text-xs font-semibold bg-brand-600 hover:bg-brand-700 text-white transition-colors flex items-center gap-1.5 shadow-xs"
            >
              <Network className="w-3.5 h-3.5" />
              <span>Trace in Graph</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
