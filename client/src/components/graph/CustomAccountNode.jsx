import React, { memo } from 'react';
import { Handle, Position } from '@xyflow/react';
import { Building2, ShieldAlert, ArrowUpRight, ArrowDownLeft, ShieldCheck, Zap } from 'lucide-react';

function CustomAccountNode({ data, selected }) {
  const isCritical = data.riskScore >= 80;
  const isHigh = data.riskScore >= 60 && data.riskScore < 80;

  return (
    <div
      className={`w-64 rounded-xl border bg-surface p-3.5 shadow-md transition-all duration-200 select-none ${
        selected
          ? 'ring-2 ring-brand-500 border-brand-500 shadow-lg'
          : isCritical
          ? 'border-red-200 hover:border-red-400 hover:shadow-lg'
          : 'border-slate-200 hover:border-slate-400'
      }`}
    >
      {/* Target Handles */}
      <Handle
        type="target"
        position={Position.Left}
        className="w-2.5 h-2.5 bg-slate-400 border-2 border-white rounded-full"
      />
      <Handle
        type="target"
        position={Position.Top}
        id="top"
        className="w-2.5 h-2.5 bg-slate-400 border-2 border-white rounded-full"
      />

      {/* Node Header */}
      <div className="flex items-center justify-between pb-2 border-b border-slate-100">
        <div className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-500 truncate">
          <Building2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <span className="truncate">{data.bank}</span>
        </div>

        {/* Risk Badge */}
        <span
          className={`px-2 py-0.5 rounded-full font-mono font-bold text-[10px] border ${
            isCritical
              ? 'bg-red-50 text-red-700 border-red-200'
              : isHigh
              ? 'bg-amber-50 text-amber-700 border-amber-200'
              : 'bg-emerald-50 text-emerald-700 border-emerald-200'
          }`}
        >
          {data.riskScore}/100
        </span>
      </div>

      {/* Account Info */}
      <div className="mt-2 space-y-1">
        <div className="font-bold text-xs text-slate-900 truncate">
          {data.holderName}
        </div>
        <div className="font-mono text-[10px] text-slate-400">
          {data.accountNumber}
        </div>
      </div>

      {/* Role Pill */}
      <div className="mt-2">
        <span
          className={`inline-block px-2 py-0.5 rounded text-[10px] font-semibold border ${
            isCritical
              ? 'bg-red-50 text-red-700 border-red-100'
              : isHigh
              ? 'bg-amber-50 text-amber-700 border-amber-100'
              : 'bg-slate-50 text-slate-600 border-slate-200'
          }`}
        >
          {data.role}
        </span>
      </div>

      {/* Inflow vs Outflow Mini-Ledger */}
      <div className="mt-2.5 pt-2 border-t border-slate-100 grid grid-cols-2 gap-2 text-[10px]">
        <div>
          <span className="text-slate-400 block">Total Inflow</span>
          <span className="font-mono font-semibold text-emerald-600">
            {data.totalInflow}
          </span>
        </div>
        <div>
          <span className="text-slate-400 block">Total Outflow</span>
          <span className="font-mono font-semibold text-red-600">
            {data.totalOutflow}
          </span>
        </div>
      </div>

      {/* Source Handles */}
      <Handle
        type="source"
        position={Position.Right}
        className="w-2.5 h-2.5 bg-brand-600 border-2 border-white rounded-full"
      />
      <Handle
        type="source"
        position={Position.Bottom}
        id="bottom"
        className="w-2.5 h-2.5 bg-brand-600 border-2 border-white rounded-full"
      />
    </div>
  );
}

export default memo(CustomAccountNode);
