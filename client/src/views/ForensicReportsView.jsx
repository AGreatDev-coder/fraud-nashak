import React, { useState, useEffect } from 'react';
import { 
  FileSpreadsheet, 
  Printer, 
  Download, 
  Copy, 
  CheckCircle2, 
  FileText, 
  ShieldAlert, 
  Building2, 
  ChevronDown, 
  RefreshCw,
  Loader2,
  Lock
} from 'lucide-react';
import { getCases, getCaseReport } from '../services/api';
import FormalReportDocument from '../components/reports/FormalReportDocument';

const TEMPLATES = [
  { id: 'COMPREHENSIVE', label: 'Comprehensive FIU Dossier', desc: 'Complete 7-section intelligence package' },
  { id: 'SECTION_102_LIEN', label: 'Section 102 CrPC Lien Notice', desc: 'Urgent debit-freeze requisition for bank nodal officers' },
  { id: 'FIR_ADDENDUM', label: 'FIR Evidentiary Addendum', desc: 'Court & Police station filing exhibit' }
];

export default function ForensicReportsView({ currentRole = 'INVESTIGATOR_LEAD' }) {
  const [cases, setCases] = useState([]);
  const [selectedCaseId, setSelectedCaseId] = useState('CS-108');
  const [activeTemplate, setActiveTemplate] = useState('COMPREHENSIVE');
  const [reportData, setReportData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [copiedNotice, setCopiedNotice] = useState(false);

  // Load cases list
  useEffect(() => {
    let isMounted = true;
    getCases().then(data => {
      if (isMounted && data && data.length > 0) {
        setCases(data);
        if (!selectedCaseId) setSelectedCaseId(data[0].id);
      }
    });
    return () => { isMounted = false; };
  }, []);

  // Fetch compiled report data
  const loadReport = async () => {
    if (!selectedCaseId) return;
    setIsLoading(true);
    const data = await getCaseReport(selectedCaseId, activeTemplate);
    if (data) {
      setReportData(data);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    loadReport();
  }, [selectedCaseId, activeTemplate]);

  const handlePrint = () => {
    window.print();
  };

  const handleExportJSON = () => {
    if (!reportData) return;
    const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${reportData.reportId || 'fraud-naashak-report'}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleCopyNotice = () => {
    if (!reportData) return;
    const noticeText = `FORMAL SECTION 102 CrPC REQUISITION / ACCOUNT FREEZE DIRECTIVE
Reference: ${reportData.reportId}
Case Ref: ${reportData.caseOverview?.title} (ID: ${reportData.caseOverview?.id})
Target Account Number: ${reportData.targetAccount?.accountNumber}
Target Account Holder: ${reportData.targetAccount?.holderName}
Institution / IFSC: ${reportData.targetAccount?.bank} (${reportData.targetAccount?.ifsc})
Volume Layered / At Risk: ${reportData.caseOverview?.volumeAtRisk}

DIRECTIVE UNDER SECTION 102 CrPC / BNSS:
You are hereby formally directed by the Cyber Crime & Financial Intelligence Unit to place an immediate DEBIT-FREEZE on Account #${reportData.targetAccount?.accountNumber}.
All outbound transfers, UPI mandates, and ATM withdrawals must cease immediately to prevent dissipation of illicit fraud proceeds.
Submit certified account ledger statements and KYC mandate documents within 48 hours.

Investigating Officer: ${reportData.investigator?.name}
Designation: ${reportData.investigator?.role} (ID: ${reportData.investigator?.id})
Date of Requisition: ${reportData.generatedDate}`;

    navigator.clipboard.writeText(noticeText);
    setCopiedNotice(true);
    setTimeout(() => setCopiedNotice(false), 2500);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Top Banner & Operational Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 print:hidden">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
              Forensic Investigation Reports
            </h1>
            <span className="text-xs px-2.5 py-0.5 rounded-full font-semibold bg-brand-50 text-brand-700 border border-brand-200">
              Legal Evidence Packaging
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Package observed multi-hop transaction trails into printable Section 102 CrPC bank lien requisitions and formal FIR addendums.
          </p>
        </div>

        {/* Global Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleCopyNotice}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 bg-surface hover:bg-slate-50 border border-surface-border rounded-lg shadow-xs transition-colors"
          >
            {copiedNotice ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-slate-500" />}
            <span>{copiedNotice ? 'Notice Copied!' : 'Copy Bank Notice'}</span>
          </button>

          <button
            onClick={handleExportJSON}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 bg-surface hover:bg-slate-50 border border-surface-border rounded-lg shadow-xs transition-colors"
          >
            <Download className="w-3.5 h-3.5 text-slate-500" />
            <span>Export JSON</span>
          </button>

          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-brand-600 hover:bg-brand-700 rounded-lg shadow-xs transition-colors"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print / Save PDF</span>
          </button>
        </div>
      </div>

      {/* Control Selector Bar (Case & Template) */}
      <div className="bg-surface rounded-xl border border-surface-border p-4 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4 print:hidden">
        {/* Case Switcher */}
        <div className="flex items-center gap-3 w-full md:w-auto">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider shrink-0">
            Case Dossier:
          </span>
          <div className="relative flex-1 md:w-80">
            <select
              value={selectedCaseId}
              onChange={(e) => setSelectedCaseId(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-3 pr-8 py-2 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 cursor-pointer appearance-none truncate"
            >
              {cases.length > 0 ? (
                cases.map((c) => (
                  <option key={c.id} value={c.id}>
                    #{c.id}: {c.title} [{c.priority}]
                  </option>
                ))
              ) : (
                <option value="CS-108">#CS-108: Operation QuickDrain — High-Velocity UPI Layering Ring</option>
              )}
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        {/* Template Selector Tabs */}
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg w-full md:w-auto overflow-x-auto">
          {TEMPLATES.map((tmpl) => (
            <button
              key={tmpl.id}
              onClick={() => setActiveTemplate(tmpl.id)}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold whitespace-nowrap transition-all ${
                activeTemplate === tmpl.id
                  ? 'bg-surface text-slate-900 shadow-xs'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              {tmpl.label}
            </button>
          ))}
        </div>
      </div>

      {/* Document Canvas Container */}
      <div className="relative min-h-[600px]">
        {isLoading && (
          <div className="absolute inset-0 z-20 flex items-center justify-center bg-white/70 backdrop-blur-xs rounded-xl">
            <div className="flex items-center gap-2 bg-surface px-4 py-2.5 rounded-xl border border-surface-border shadow-md">
              <Loader2 className="w-5 h-5 text-brand-600 animate-spin" />
              <span className="text-xs font-semibold text-slate-700">Compiling legal evidence dossier…</span>
            </div>
          </div>
        )}

        {reportData && (
          <FormalReportDocument 
            reportData={reportData} 
            template={activeTemplate} 
          />
        )}
      </div>
    </div>
  );
}
