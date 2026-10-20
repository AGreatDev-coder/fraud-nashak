import React from 'react';
import { 
  ShieldCheck, 
  ShieldAlert, 
  Building2, 
  Clock, 
  Calendar, 
  FileText, 
  Lock, 
  UserCheck, 
  AlertTriangle, 
  CheckCircle2, 
  Layers, 
  ArrowRight,
  Stamp,
  Award
} from 'lucide-react';

export default function FormalReportDocument({ reportData, template = 'COMPREHENSIVE' }) {
  if (!reportData) return null;

  const {
    reportId,
    generatedDate,
    classification,
    disclaimer,
    investigator,
    caseOverview,
    targetAccount,
    pinnedEvidence = [],
    timeline = [],
    legalDirectives
  } = reportData;

  const isLienNoticeOnly = template === 'SECTION_102_LIEN';
  const isFirAddendum = template === 'FIR_ADDENDUM';

  return (
    <div className="bg-white text-slate-900 font-sans p-8 md:p-12 max-w-4xl mx-auto shadow-lg border border-slate-200 rounded-xl print:border-none print:shadow-none print:p-0 print:max-w-none text-xs space-y-6">
      {/* 1. Official Header & Security Classification Banner */}
      <div className="border-b-2 border-slate-900 pb-4 space-y-2">
        <div className="flex items-center justify-between text-[11px] font-mono font-bold tracking-wider text-slate-500 uppercase">
          <span>{classification}</span>
          <span>REPORT ID: <strong className="text-slate-900">{reportId}</strong></span>
        </div>

        <div className="flex items-center justify-between gap-4 pt-2">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-slate-900 text-white flex items-center justify-center font-bold text-lg shadow-sm">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <div>
              <h1 className="text-lg md:text-xl font-black uppercase tracking-tight text-slate-900">
                {isLienNoticeOnly 
                  ? 'FORMAL SECTION 102 CrPC LIEN REQUISITION & DEBIT FREEZE NOTICE'
                  : isFirAddendum
                  ? 'FIR EVIDENTIARY ADDENDUM & SYNDICATE TOPOLOGY DOSSIER'
                  : 'FORENSIC FINANCIAL INTELLIGENCE INVESTIGATION DOSSIER'}
              </h1>
              <div className="text-[11px] font-medium text-slate-600">
                Fraud-Naashak Financial Crime Intelligence System • Protocol PS-01
              </div>
            </div>
          </div>

          <div className="text-right font-mono text-[11px] text-slate-500">
            <div>DATE: <strong>{generatedDate.substring(0, 10)}</strong></div>
            <div>TIME: <strong>{generatedDate.substring(11)} UTC</strong></div>
          </div>
        </div>

        {/* Mandatory Synthetic Data Notice */}
        <div className="bg-amber-50 border border-amber-300 rounded-lg p-2.5 text-[10px] text-amber-900 font-semibold text-center uppercase tracking-wide">
          ⚠️ {disclaimer}
        </div>
      </div>

      {/* 2. Executive Case & Target Identification */}
      <section className="space-y-2">
        <div className="flex items-center justify-between bg-slate-900 text-white px-3 py-1.5 rounded text-[11px] font-bold uppercase tracking-wider">
          <span>1. Incident & Target Entity Summary</span>
          <span>CASE REF: #{caseOverview.id}</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50 p-3.5 rounded-lg border border-slate-200">
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Case File Title</span>
            <div className="font-bold text-slate-900 mt-0.5 truncate">{caseOverview.title}</div>
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Incident Category</span>
            <div className="font-semibold text-slate-800 mt-0.5">{caseOverview.category}</div>
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Priority Level</span>
            <span className="inline-block px-2 py-0.5 mt-0.5 rounded text-[10px] font-mono font-bold uppercase bg-red-100 text-red-800 border border-red-300">
              {caseOverview.priority} Priority
            </span>
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Volume Layered / At Risk</span>
            <div className="font-mono font-bold text-red-700 mt-0.5 text-sm">{caseOverview.volumeAtRisk}</div>
          </div>
        </div>

        <div className="p-3 bg-white border border-slate-200 rounded-lg text-slate-700 leading-relaxed text-xs">
          <strong>Modus Operandi Summary:</strong> {caseOverview.summary}
        </div>
      </section>

      {/* 3. Section 102 CrPC Legal Directives & Freeze Notice */}
      <section className="space-y-2">
        <div className="flex items-center justify-between bg-red-800 text-white px-3 py-1.5 rounded text-[11px] font-bold uppercase tracking-wider">
          <span className="flex items-center gap-1.5">
            <Lock className="w-3.5 h-3.5" />
            <span>2. Statutory Debit Freeze Directives & Legal Notice</span>
          </span>
          <span className="font-mono text-[10px]">SECTION 102 CrPC MANDATE</span>
        </div>

        <div className="border border-red-200 bg-red-50/60 p-4 rounded-lg space-y-3">
          <div className="text-[11px] font-semibold text-red-950">
            <strong>NOTICE TO THE NODAL OFFICER / BRANCH MANAGER:</strong> This formal investigative requisition is issued under Section 102 of the Code of Criminal Procedure, 1973 (CrPC) / BNSS, concerning proceeds of cyber-enabled financial fraud.
          </div>

          <div className="space-y-1.5 pt-1">
            {legalDirectives?.orders?.map((order, idx) => (
              <div key={idx} className="flex items-start gap-2 text-xs text-red-900">
                <CheckCircle2 className="w-4 h-4 text-red-700 shrink-0 mt-0.5" />
                <span>{order}</span>
              </div>
            ))}
          </div>

          <div className="pt-2 border-t border-red-200 text-[10px] text-red-800 font-mono">
            Direct statutory compliance required within 4 business hours. Failure to freeze entails non-compliance citations under Cyber Security Directives.
          </div>
        </div>
      </section>

      {/* 4. Target Entity Dossier & Velocity Telemetry */}
      {targetAccount && (
        <section className="space-y-2">
          <div className="flex items-center justify-between bg-slate-900 text-white px-3 py-1.5 rounded text-[11px] font-bold uppercase tracking-wider">
            <span>3. Primary Flagged Account Telemetry</span>
            <span>SCORE: {targetAccount.riskScore}/100</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50 p-3.5 rounded-lg border border-slate-200 font-mono text-xs">
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 block font-sans">Account Number</span>
              <div className="font-bold text-slate-900 mt-0.5">{targetAccount.accountNumber}</div>
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 block font-sans">Account Holder</span>
              <div className="font-sans font-semibold text-slate-800 mt-0.5">{targetAccount.holderName}</div>
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 block font-sans">Institution / IFSC</span>
              <div className="font-sans text-slate-800 mt-0.5">{targetAccount.bank} ({targetAccount.ifsc})</div>
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 block font-sans">KYC Verification</span>
              <div className="font-sans text-slate-800 mt-0.5">{targetAccount.kycStatus}</div>
            </div>
          </div>

          {targetAccount.velocityMetrics && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 font-mono text-[11px]">
              <div className="bg-white border border-slate-200 p-2 rounded">
                <span className="text-slate-400 text-[10px] font-sans block">Fund Retention Rate</span>
                <span className="font-bold text-red-600">{targetAccount.velocityMetrics.retentionRate}</span> (Near-zero EOD)
              </div>
              <div className="bg-white border border-slate-200 p-2 rounded">
                <span className="text-slate-400 text-[10px] font-sans block">Avg Holding Time</span>
                <span className="font-bold text-red-600">{targetAccount.velocityMetrics.avgHoldingTime}</span> (Rapid pass-through)
              </div>
              <div className="bg-white border border-slate-200 p-2 rounded">
                <span className="text-slate-400 text-[10px] font-sans block">Turnover Spike</span>
                <span className="font-bold text-red-600">{targetAccount.velocityMetrics.turnoverSpikeRatio}</span>
              </div>
              <div className="bg-white border border-slate-200 p-2 rounded">
                <span className="text-slate-400 text-[10px] font-sans block">Net Retained Balance</span>
                <span className="font-bold text-slate-900">{targetAccount.velocityMetrics.netRetainedBalance}</span>
              </div>
            </div>
          )}
        </section>
      )}

      {/* 5. Deterministic Rule Score Breakdown */}
      {targetAccount?.riskIndicators && targetAccount.riskIndicators.length > 0 && !isLienNoticeOnly && (
        <section className="space-y-2">
          <div className="flex items-center justify-between bg-slate-900 text-white px-3 py-1.5 rounded text-[11px] font-bold uppercase tracking-wider">
            <span>4. Deterministic Heuristic Risk Evidence</span>
            <span>REPRODUCIBLE SCORING v1.0</span>
          </div>

          <table className="w-full border-collapse border border-slate-200 text-xs">
            <thead>
              <tr className="bg-slate-100 text-[10px] font-bold uppercase text-slate-600 text-left">
                <th className="p-2 border border-slate-200">Rule Ref</th>
                <th className="p-2 border border-slate-200">Anomaly Indicator</th>
                <th className="p-2 border border-slate-200">Observed Condition & Evidence</th>
                <th className="p-2 border border-slate-200 text-center">Score Weight</th>
              </tr>
            </thead>
            <tbody>
              {targetAccount.riskIndicators.map((rule, idx) => (
                <tr key={idx} className="border-b border-slate-200">
                  <td className="p-2 font-mono font-bold text-slate-800 border border-slate-200">{rule.id}</td>
                  <td className="p-2 font-semibold text-slate-900 border border-slate-200">{rule.name}</td>
                  <td className="p-2 text-slate-600 border border-slate-200 text-[11px]">{rule.evidence}</td>
                  <td className="p-2 font-mono font-bold text-center border border-slate-200 text-red-600">
                    +{rule.points} pts
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      )}

      {/* 6. Evidentiary Transaction Ledger */}
      <section className="space-y-2">
        <div className="flex items-center justify-between bg-slate-900 text-white px-3 py-1.5 rounded text-[11px] font-bold uppercase tracking-wider">
          <span>5. Pinned Evidentiary Artifacts & Transaction Ledger</span>
          <span>{pinnedEvidence.length} EXHIBITS</span>
        </div>

        {pinnedEvidence.length === 0 ? (
          <div className="p-4 bg-slate-50 border border-slate-200 rounded text-center text-slate-400">
            No evidentiary items currently pinned.
          </div>
        ) : (
          <table className="w-full border-collapse border border-slate-200 text-xs">
            <thead>
              <tr className="bg-slate-100 text-[10px] font-bold uppercase text-slate-600 text-left">
                <th className="p-2 border border-slate-200">Exhibit</th>
                <th className="p-2 border border-slate-200">Identifier (UTR / Account)</th>
                <th className="p-2 border border-slate-200">Forensic Context & Detail</th>
                <th className="p-2 border border-slate-200 text-right">Amount (₹)</th>
              </tr>
            </thead>
            <tbody>
              {pinnedEvidence.map((ev, idx) => (
                <tr key={idx} className="border-b border-slate-200 font-mono">
                  <td className="p-2 border border-slate-200 font-sans font-bold text-slate-700">
                    EX-{String(idx + 1).padStart(2, '0')} [{ev.type}]
                  </td>
                  <td className="p-2 border border-slate-200 font-bold text-slate-900">
                    {ev.type === 'ACCOUNT' ? ev.accountNumber : ev.utr}
                  </td>
                  <td className="p-2 border border-slate-200 font-sans text-slate-600 text-[11px]">
                    {ev.detail}
                  </td>
                  <td className="p-2 border border-slate-200 text-right font-bold text-slate-900">
                    {ev.amount || '—'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>

      {/* 7. Case Timeline of Interventions */}
      {!isLienNoticeOnly && (
        <section className="space-y-2">
          <div className="flex items-center justify-between bg-slate-900 text-white px-3 py-1.5 rounded text-[11px] font-bold uppercase tracking-wider">
            <span>6. Chronological Case Audit Timeline</span>
            <span>CHAIN OF CUSTODY</span>
          </div>

          <div className="border border-slate-200 rounded-lg divide-y divide-slate-100 bg-slate-50 p-2">
            {timeline.slice(0, 5).map((tl, idx) => (
              <div key={idx} className="p-2 flex items-start justify-between text-[11px] gap-3">
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span className="font-mono text-slate-500">{tl.timestamp}</span>
                  <span className="font-semibold text-slate-800">• {tl.action}:</span>
                  <span className="text-slate-600">{tl.detail}</span>
                </div>
                <span className="font-mono text-slate-400 shrink-0 text-[10px]">{tl.actor}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 8. Investigator Attestation & Digital Verification Seal */}
      <section className="pt-4 border-t-2 border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <div className="w-16 h-16 rounded-full border-2 border-dashed border-brand-500 flex flex-col items-center justify-center text-center p-1 text-brand-800">
            <Award className="w-5 h-5 text-brand-600" />
            <span className="text-[7px] font-bold uppercase tracking-tighter mt-0.5">FIU SEAL</span>
          </div>
          <div className="text-[11px] text-slate-600 leading-tight">
            <strong>OFFICIAL DIGITAL CERTIFICATION:</strong><br />
            This report is generated via Fraud-Naashak deterministic forensic heuristics.<br />
            Integrity Hash: <span className="font-mono text-[10px] text-slate-400">SHA256:7a4c90e1f4...89b1</span>
          </div>
        </div>

        <div className="text-right border-l-2 border-slate-200 pl-4 sm:min-w-56">
          <div className="font-mono text-[10px] text-slate-400 uppercase">Investigating Officer</div>
          <div className="font-bold text-slate-900 text-sm mt-0.5">{investigator?.name}</div>
          <div className="text-[11px] text-slate-600 font-medium">{investigator?.agency}</div>
          <div className="font-mono text-[10px] text-slate-400 mt-1">ID: {investigator?.id}</div>
        </div>
      </section>
    </div>
  );
}
