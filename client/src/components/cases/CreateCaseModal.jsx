import React, { useState } from 'react';
import { X, Briefcase, Plus, ShieldAlert } from 'lucide-react';

export default function CreateCaseModal({ isOpen, onClose, onCreateCase }) {
  const [title, setTitle] = useState('');
  const [targetAccount, setTargetAccount] = useState('');
  const [priority, setPriority] = useState('Critical');
  const [category, setCategory] = useState('Digital Arrest Scam');
  const [summary, setSummary] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !targetAccount.trim()) return;

    const newCase = {
      id: `CS-${Math.floor(100 + Math.random() * 900)}`,
      title: title.trim(),
      category,
      priority,
      status: 'Open',
      createdDate: new Date().toISOString().replace('T', ' ').substring(0, 16),
      assignedInvestigator: 'Officer S. Sharma (Lead Cyber FIU)',
      targetAccount: targetAccount.trim(),
      targetHolder: 'Under Formal Ingestion',
      targetBank: 'Partner Bank Network',
      volumeAtRisk: 'Evaluating...',
      summary: summary.trim() || 'Preliminary case dossier opened for forensic audit.',
      pinnedEvidence: [],
      timeline: [
        {
          id: `tl-${Date.now()}`,
          timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16),
          actor: 'Officer S. Sharma',
          action: 'Case Initiated',
          detail: 'Case file officially established under PS-01 protocol.'
        }
      ],
      notes: []
    };

    onCreateCase(newCase);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4 animate-in fade-in duration-150">
      <div className="bg-surface rounded-2xl border border-surface-border shadow-2xl max-w-lg w-full p-6 text-xs space-y-4">
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-3 border-b border-surface-border">
          <div className="flex items-center gap-2">
            <Briefcase className="w-4 h-4 text-brand-600" />
            <h3 className="font-bold text-slate-900 text-sm">
              Initiate New Fraud Investigation Case
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700 p-1"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="space-y-3.5">
          <div>
            <label className="block text-slate-700 font-semibold mb-1">Case Title</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Operation QuickDrain — High-Velocity UPI Layering Ring"
              className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-700 font-semibold mb-1">Target Account Number</label>
              <input
                type="text"
                required
                value={targetAccount}
                onChange={(e) => setTargetAccount(e.target.value)}
                placeholder="e.g., 918237491024"
                className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 font-mono text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
              />
            </div>

            <div>
              <label className="block text-slate-700 font-semibold mb-1">Priority Level</label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
              >
                <option value="Critical">Critical Priority</option>
                <option value="High">High Priority</option>
                <option value="Medium">Medium Priority</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-slate-700 font-semibold mb-1">Incident Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
            >
              <option value="Digital Arrest Scam">Digital Arrest Scam</option>
              <option value="Phishing Syndicate">Phishing Syndicate</option>
              <option value="Student Account Coercion">Student Account Coercion</option>
              <option value="Structuring / Smurfing">Structuring / Smurfing</option>
              <option value="Illegal Betting Laundering">Illegal Betting Laundering</option>
            </select>
          </div>

          <div>
            <label className="block text-slate-700 font-semibold mb-1">Preliminary Investigative Summary</label>
            <textarea
              rows={3}
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              placeholder="Detail observed topological patterns, transfer velocity, and immediate action items..."
              className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 resize-none"
            />
          </div>

          <div className="pt-3 border-t border-surface-border flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg text-xs font-semibold bg-brand-600 hover:bg-brand-700 text-white transition-colors flex items-center gap-1.5 shadow-xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Create Case File</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
