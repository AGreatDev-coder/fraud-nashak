import React, { useState, useEffect } from 'react';
import { INITIAL_CASES_DATA } from '../data/mockCaseData';
import { 
  getCases, 
  createCase, 
  updateCaseStatus, 
  addCaseNote, 
  removeCaseEvidence 
} from '../services/api';
import CaseListLedger from '../components/cases/CaseListLedger';
import CaseDetailPanel from '../components/cases/CaseDetailPanel';
import CreateCaseModal from '../components/cases/CreateCaseModal';
import { 
  FolderLock, 
  Plus, 
  Briefcase, 
  ShieldAlert, 
  Lock, 
  FileText,
  Clock
} from 'lucide-react';

export default function InvestigationWorkspaceView({ onNavigateToAccount, currentRole = 'INVESTIGATOR_LEAD' }) {
  const [cases, setCases] = useState(INITIAL_CASES_DATA);
  const [selectedCaseId, setSelectedCaseId] = useState('CS-108');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const isAuditor = currentRole === 'AUDITOR';

  useEffect(() => {
    let isMounted = true;
    getCases().then((data) => {
      if (isMounted && data && data.length > 0) {
        setCases(data);
      }
    });
    return () => { isMounted = false; };
  }, []);

  const selectedCase = cases.find((c) => c.id === selectedCaseId) || cases[0];

  const handleStatusChange = async (caseId, newStatus) => {
    // Optimistic UI update
    setCases(prevCases => prevCases.map(c => {
      if (c.id === caseId) {
        const updatedTimeline = [
          {
            id: `tl-${Date.now()}`,
            timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16),
            actor: 'Officer S. Sharma',
            action: 'Status Transition',
            detail: `Case status changed from '${c.status}' to '${newStatus}'.`
          },
          ...c.timeline
        ];
        return { ...c, status: newStatus, timeline: updatedTimeline };
      }
      return c;
    }));

    // Server update
    await updateCaseStatus(caseId, newStatus);
  };

  const handleAddNote = async (caseId, noteText) => {
    // Optimistic UI update
    const newNote = {
      id: `nt-${Date.now()}`,
      author: 'Officer S. Sharma',
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16),
      content: noteText
    };

    setCases(prevCases => prevCases.map(c => {
      if (c.id === caseId) {
        const updatedTimeline = [
          {
            id: `tl-${Date.now()}`,
            timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16),
            actor: 'Officer S. Sharma',
            action: 'Forensic Note Logged',
            detail: `Added case memo: "${noteText.substring(0, 40)}..."`
          },
          ...c.timeline
        ];
        return {
          ...c,
          notes: [newNote, ...(c.notes || [])],
          timeline: updatedTimeline
        };
      }
      return c;
    }));

    // Server update
    await addCaseNote(caseId, noteText, 'Officer S. Sharma');
  };

  const handleRemoveEvidence = async (caseId, evidenceId) => {
    setCases(prevCases => prevCases.map(c => {
      if (c.id === caseId) {
        return {
          ...c,
          pinnedEvidence: (c.pinnedEvidence || []).filter(e => e.id !== evidenceId)
        };
      }
      return c;
    }));

    await removeCaseEvidence(caseId, evidenceId);
  };

  const handleCreateCase = async (newCase) => {
    setCases([newCase, ...cases]);
    setSelectedCaseId(newCase.id);
    await createCase(newCase);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Top Banner & Case Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
              Investigation Workspace
            </h1>
            <span className="text-xs px-2.5 py-0.5 rounded-full font-semibold bg-brand-50 text-brand-700 border border-brand-200">
              API Connected
            </span>
            {isAuditor && (
              <span className="text-xs px-2.5 py-0.5 rounded-full font-semibold bg-slate-100 text-slate-700 border border-slate-200">
                🔒 Read-Only Auditor Mode
              </span>
            )}
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Bundle suspicious entities, trace evidentiary timelines, log forensic notes, and track Section 102 CrPC lien freeze petitions.
          </p>
        </div>

        <button
          onClick={() => {
            if (isAuditor) return;
            setIsModalOpen(true);
          }}
          disabled={isAuditor}
          title={isAuditor ? "Read-Only Auditor clearance: Case creation restricted" : ""}
          className={`inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-lg shadow-xs transition-colors self-start md:self-auto ${
            isAuditor
              ? 'bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed'
              : 'text-white bg-brand-600 hover:bg-brand-700'
          }`}
        >
          <Plus className="w-3.5 h-3.5" />
          <span>{isAuditor ? 'Case Initiation (Restricted)' : 'Initiate New Case'}</span>
        </button>
      </div>

      {/* Workspace Telemetry Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-surface rounded-xl border border-surface-border p-4 shadow-xs">
          <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
            Total Case Files
          </div>
          <div className="mt-1 font-mono text-xl font-bold text-slate-900">
            {cases.length} Active Dossiers
          </div>
          <div className="text-[11px] text-slate-400 mt-0.5">PS-01 Case Registry</div>
        </div>

        <div className="bg-surface rounded-xl border border-surface-border p-4 shadow-xs">
          <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
            Pending Bank Liens
          </div>
          <div className="mt-1 font-mono text-xl font-bold text-red-600">
            {cases.filter(c => c.status?.includes('Lien')).length} Critical Freezes
          </div>
          <div className="text-[11px] text-red-500 mt-0.5">Section 102 notices out</div>
        </div>

        <div className="bg-surface rounded-xl border border-surface-border p-4 shadow-xs">
          <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
            Total Layered Volume at Risk
          </div>
          <div className="mt-1 font-mono text-xl font-bold text-slate-900">
            ₹60.90 Lakhs
          </div>
          <div className="text-[11px] text-slate-400 mt-0.5">Across active cases</div>
        </div>

        <div className="bg-surface rounded-xl border border-surface-border p-4 shadow-xs">
          <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
            Lead Investigator
          </div>
          <div className="mt-1 font-semibold text-slate-800 text-sm">
            Officer S. Sharma
          </div>
          <div className="text-[11px] text-brand-600 font-medium mt-0.5">Cyber Crime & FIU Cell</div>
        </div>
      </div>

      {/* Master-Detail Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Master Case List (4 cols) */}
        <div className="lg:col-span-5 h-[700px]">
          <CaseListLedger
            cases={cases}
            selectedCaseId={selectedCaseId}
            onSelectCase={(id) => setSelectedCaseId(id)}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
          />
        </div>

        {/* Right Column: Case Working Dossier (7 cols) */}
        <div className="lg:col-span-7">
          <CaseDetailPanel
            caseItem={selectedCase}
            onStatusChange={handleStatusChange}
            onAddNote={handleAddNote}
            onRemoveEvidence={handleRemoveEvidence}
            onNavigateToAccount={onNavigateToAccount}
            currentRole={currentRole}
          />
        </div>
      </div>

      {/* Create Case Modal */}
      <CreateCaseModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreateCase={handleCreateCase}
      />
    </div>
  );
}
