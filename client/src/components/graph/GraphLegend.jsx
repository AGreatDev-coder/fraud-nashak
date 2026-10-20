import React from 'react';
import { Info, ShieldAlert, ArrowRight, Activity } from 'lucide-react';

export default function GraphLegend() {
  return (
    <div className="bg-surface/90 backdrop-blur-md rounded-xl border border-surface-border p-3.5 shadow-md space-y-2.5 text-[11px] max-w-xs">
      <div className="flex items-center gap-1.5 font-bold text-slate-800 pb-1.5 border-b border-slate-100">
        <Activity className="w-3.5 h-3.5 text-brand-600" />
        <span>Graph Visual Legend</span>
      </div>

      {/* Node Tiers */}
      <div className="space-y-1">
        <span className="text-[10px] uppercase font-semibold text-slate-400 block">Entity Nodes</span>
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-red-600"></span>
          <span className="text-slate-700">Critical Mule (Score ≥ 80)</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
          <span className="text-slate-700">Suspicious Intermediary (60–79)</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-600"></span>
          <span className="text-slate-700">Clean Commercial Node (&lt; 40)</span>
        </div>
      </div>

      {/* Edge Vectors */}
      <div className="space-y-1 pt-1.5 border-t border-slate-100">
        <span className="text-[10px] uppercase font-semibold text-slate-400 block">Directed Fund Edges</span>
        <div className="flex items-center gap-2">
          <div className="w-4 h-0.5 bg-red-500"></div>
          <span className="text-slate-700">Rapid Pass-Through / Dispersal</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-0.5 bg-blue-500 border-b border-dashed border-blue-500"></div>
          <span className="text-slate-700">Circular Fund Loop</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-0.5 bg-slate-400"></div>
          <span className="text-slate-700">Standard Legitimate Flow</span>
        </div>
      </div>
    </div>
  );
}
