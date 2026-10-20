import React, { useState } from 'react';
import { 
  Building2, 
  ShieldAlert, 
  Clock, 
  Trash2, 
  Plus, 
  Send, 
  Download, 
  CheckCircle2, 
  User, 
  ArrowRight,
  FileText,
  Lock,
  Layers,
  Sparkles
} from 'lucide-react';

export default function CaseDetailPanel({
  caseItem,
  onStatusChange,
  onAddNote,
  onRemoveEvidence,
  onNavigateToAccount,
  currentRole = 'INVESTIGATOR_LEAD'
}) {
  const [noteContent, setNoteContent] = useState('');

  const canChangeStatus = currentRole === 'INVESTIGATOR_LEAD';
  const canAddNote = currentRole !== 'AUDITOR';
  const canDeleteEvidence = currentRole === 'INVESTIGATOR_LEAD';

  if (!caseItem) {
    return (
      <div className="bg-surface rounded-xl border border-surface-border p-12 shadow-xs flex flex-col items-center justify-center text-center text-slate-400">
        <FileText className="w-10 h-10 mb-3 text-slate-300" />
        <p className="text-sm font-semibold text-slate-600">Select a case file from the ledger to inspect evidence.</p>
        <p className="text-xs text-slate-400 mt-1">Or initiate a new investigation case.</p>
      </div>
    );
  }

  const handleNoteSubmit = (e) => {
    e.preventDefault();
    if (!canAddNote || !noteContent.trim()) return;
    onAddNote(caseItem.id, noteContent.trim());
    setNoteContent('');
  };

  const statusOptions = [
    'Open',
    'Under Investigation',
    'Pending Bank Lien / Freeze',
    'Evidence Packaged for FIR',
    'Closed'
  ];

  return (
    <div className="bg-surface rounded-xl border border-surface-border p-6 shadow-xs space-y-6">
      {/* 1. Case Top Identity & Status Switcher */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-surface-border">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="font-mono font-bold text-slate-400 text-xs">
              CASE #{caseItem.id}
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded-full font-bold uppercase bg-red-50 text-red-700 border border-red-200">
              {caseItem.priority} Priority
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded-full font-semibold bg-slate-100 text-slate-600 border border-slate-200">
              {caseItem.category}
            </span>
          </div>
          <h2 className="text-lg font-bold text-slate-900 tracking-tight">
            {caseItem.title}
          </h2>
          <div className="text-xs text-slate-500 flex items-center gap-3">
            <span>Investigator: <strong className="text-slate-800">{caseItem.assignedInvestigator}</strong></span>
            <span>•</span>
            <span>Created: {caseItem.createdDate}</span>
          </div>
        </div>

        {/* Status Lifecycle Selector */}
        <div className="flex items-center gap-2 shrink-0">
          <span className="text-xs font-semibold text-slate-400 uppercase">Status:</span>
          <select
            value={caseItem.status}
            disabled={!canChangeStatus}
            title={!canChangeStatus ? "Status transition requires Lead Investigator clearance" : ""}
            onChange={(e) => onStatusChange(caseItem.id, e.target.value)}
            className={`border rounded-lg px-3 py-1.5 text-xs font-bold transition-colors ${
              !canChangeStatus 
                ? 'bg-slate-100 text-slate-500 border-slate-200 cursor-not-allowed'
                : 'bg-slate-50 border-slate-200 text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 cursor-pointer'
            }`}
          >
            {statusOptions.map((st) => (
              <option key={st} value={st}>
                {st}
              </option>
            ))}
          </select>


          <button
            onClick={() => alert(`Exporting formal case dossier PDF for #${caseItem.id}...`)}
            className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-brand-600 hover:bg-brand-700 text-white transition-colors flex items-center gap-1.5 shadow-xs"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Case PDF</span>
          </button>
        </div>
      </div>

      {/* 2. Executive Incident Summary */}
      <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs space-y-1">
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
          Incident Overview & Syndicate Modus Operandi
        </span>
        <p className="text-slate-700 leading-relaxed font-medium">
          {caseItem.summary}
        </p>
        <div className="pt-2 flex items-center gap-4 text-[11px] text-slate-500">
          <span>Target Account: <strong className="font-mono text-slate-800">{caseItem.targetAccount} ({caseItem.targetBank})</strong></span>
          <span>Volume at Risk: <strong className="font-mono text-red-600">{caseItem.volumeAtRisk}</strong></span>
        </div>
      </div>

      {/* 3. Pinned Forensic Evidence Inventory */}
      <div className="space-y-3">
        <div className="flex items-center justify-between pb-2 border-b border-surface-border">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-brand-600" />
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Pinned Forensic Evidence ({caseItem.pinnedEvidence.length} Items)
            </h3>
          </div>
          <span className="text-[11px] text-slate-400">Section 65B Indian Evidence Act compliant</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {caseItem.pinnedEvidence.map((ev) => (
            <div
              key={ev.id}
              className="p-3 bg-surface rounded-xl border border-slate-200 shadow-xs flex items-start justify-between gap-2 hover:border-slate-300 transition-colors text-xs"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded font-bold uppercase ${
                    ev.type === 'ACCOUNT' ? 'bg-red-50 text-red-700 border border-red-200' : 'bg-blue-50 text-blue-700 border border-blue-200'
                  }`}>
                    {ev.type}
                  </span>
                  <span className="font-mono font-bold text-slate-900">
                    {ev.type === 'ACCOUNT' ? ev.accountNumber : ev.utr}
                  </span>
                </div>
                <div className="font-medium text-slate-700">
                  {ev.type === 'ACCOUNT' ? `${ev.holderName} (${ev.bank})` : `${ev.amount} via ${ev.channel}`}
                </div>
                <div className="text-[11px] text-slate-400">
                  {ev.detail}
                </div>
              </div>

              {canDeleteEvidence && (
                <button
                  onClick={() => onRemoveEvidence(caseItem.id, ev.id)}
                  title="Remove evidence pin"
                  className="text-slate-400 hover:text-red-600 p-1 rounded transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* 4. Evidence Timeline & Case Notes Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-2">
        {/* Left 6 cols: Chronological Timeline */}
        <div className="lg:col-span-6 space-y-3">
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5 pb-2 border-b border-surface-border">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            <span>Audit-Proof Case Timeline</span>
          </h3>

          <div className="space-y-3 text-xs pl-2 border-l-2 border-slate-200">
            {caseItem.timeline.map((event) => (
              <div key={event.id} className="relative pl-3 space-y-0.5">
                <div className="absolute -left-[19px] top-1 w-2.5 h-2.5 rounded-full bg-brand-500 border-2 border-white"></div>
                <div className="flex items-center justify-between text-[11px]">
                  <span className="font-bold text-slate-900">{event.action}</span>
                  <span className="font-mono text-slate-400">{event.timestamp}</span>
                </div>
                <p className="text-slate-600 text-[11px]">{event.detail}</p>
                <span className="text-[10px] text-slate-400 block font-mono">By: {event.actor}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right 6 cols: Investigator Notes & Live Form */}
        <div className="lg:col-span-6 space-y-3">
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5 pb-2 border-b border-surface-border">
            <FileText className="w-3.5 h-3.5 text-slate-400" />
            <span>Investigator Case Notes</span>
          </h3>

          {/* Notes Ledger */}
          <div className="space-y-2.5 max-h-56 overflow-y-auto pr-1">
            {caseItem.notes.map((note) => (
              <div
                key={note.id}
                className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-1"
              >
                <div className="flex items-center justify-between text-[10px] font-semibold text-slate-400">
                  <span className="text-slate-700">{note.author}</span>
                  <span className="font-mono">{note.timestamp}</span>
                </div>
                <p className="text-slate-700 text-xs leading-relaxed">
                  {note.content}
                </p>
              </div>
            ))}
          </div>

          {/* Add Note Form or Read-Only Notice */}
          {canAddNote ? (
            <form onSubmit={handleNoteSubmit} className="pt-2">
              <div className="relative">
                <textarea
                  value={noteContent}
                  onChange={(e) => setNoteContent(e.target.value)}
                  placeholder="Log forensic observation, nodal bank call reference, or legal petition update..."
                  rows={2}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 resize-none"
                />
                <button
                  type="submit"
                  disabled={!noteContent.trim()}
                  className="absolute right-2.5 bottom-3.5 px-3 py-1 bg-brand-600 hover:bg-brand-700 disabled:bg-slate-300 text-white text-xs font-semibold rounded-lg transition-colors flex items-center gap-1 shadow-xs"
                >
                  <Send className="w-3 h-3" />
                  <span>Log Note</span>
                </button>
              </div>
            </form>
          ) : (
            <div className="p-2.5 bg-slate-100 rounded-lg text-[11px] text-slate-500 text-center font-medium border border-slate-200 mt-2">
              🔒 Read-Only Auditor clearance: Logging case notes is restricted.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
