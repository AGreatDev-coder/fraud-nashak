import React from 'react';
import { 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle, 
  HelpCircle, 
  FileCode, 
  Info,
  Scale
} from 'lucide-react';

export default function RiskScoreBreakdown({ indicators, totalScore }) {
  return (
    <div className="bg-surface rounded-xl border border-surface-border p-6 shadow-xs space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-surface-border">
        <div>
          <div className="flex items-center gap-2">
            <Scale className="w-4 h-4 text-brand-600" />
            <h2 className="text-sm font-bold text-slate-900 tracking-tight">
              Explainable Risk Scoring Engine
            </h2>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-brand-50 text-brand-700 border border-brand-200">
              Deterministic v1.0
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Mathematically reproducible indicator contributions. No black-box inference.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono">
          <span className="text-slate-400">Total Accumulation:</span>
          <span className="px-2.5 py-1 rounded-md bg-red-50 text-red-700 font-bold border border-red-200">
            {totalScore} / 100 Points
          </span>
        </div>
      </div>

      {/* Rules Breakdown Cards */}
      <div className="space-y-3.5">
        {indicators.map((rule) => {
          const percentage = (rule.points / rule.maxPoints) * 100;
          return (
            <div
              key={rule.id}
              className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-slate-50 transition-colors space-y-2.5"
            >
              {/* Rule Title & Points */}
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-900">
                      {rule.name}
                    </span>
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-200/70 text-slate-700 font-semibold">
                      {rule.id}
                    </span>
                    <span className="text-[10px] px-1.5 py-0.2 rounded font-medium bg-slate-100 text-slate-500 border border-slate-200">
                      {rule.category}
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-400 font-mono">
                    Condition: <span className="text-slate-600">{rule.condition}</span>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <div className="font-mono font-bold text-xs text-red-600">
                    +{rule.points} <span className="text-slate-400 font-normal">/ {rule.maxPoints} pts</span>
                  </div>
                  <span className="text-[10px] font-semibold text-red-500 uppercase">
                    Breached
                  </span>
                </div>
              </div>

              {/* Progress Contribution Bar */}
              <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                <div
                  className="h-full bg-red-600 rounded-full transition-all duration-500"
                  style={{ width: `${percentage}%` }}
                ></div>
              </div>

              {/* Concrete Forensic Evidence */}
              <div className="p-2.5 bg-white rounded-lg border border-slate-200 text-xs text-slate-700 leading-relaxed flex items-start gap-2">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900">Observed Evidence:</strong> {rule.evidence}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Disclaimers & Regulatory Notice */}
      <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl flex items-start gap-2 text-[11px] text-amber-900 leading-relaxed">
        <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
        <div>
          <strong>Regulatory Compliance Standard:</strong> Under RBI KYC/AML master directions, high heuristic score triggers serve as evidentiary rationale to initiate formal inquiries. Human investigator validation is mandatory prior to filing formal Suspicious Transaction Reports (STRs).
        </div>
      </div>
    </div>
  );
}
