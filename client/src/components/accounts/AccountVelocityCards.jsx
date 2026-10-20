import React from 'react';
import { 
  ArrowDownLeft, 
  ArrowUpRight, 
  Percent, 
  Clock, 
  TrendingUp, 
  Zap, 
  AlertOctagon 
} from 'lucide-react';

export default function AccountVelocityCards({ velocity }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
      {/* 24h Inflow Card */}
      <div className="bg-surface rounded-xl border border-surface-border p-4 shadow-xs">
        <div className="flex items-center justify-between text-slate-400">
          <span className="text-[11px] font-semibold uppercase tracking-wider">24h Gross Inflow</span>
          <div className="w-7 h-7 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600">
            <ArrowDownLeft className="w-4 h-4" />
          </div>
        </div>
        <div className="mt-2 text-xl font-bold font-mono text-slate-900">
          {velocity.inflow24h}
        </div>
        <div className="text-[11px] text-slate-400 mt-1 flex items-center gap-1">
          <span className="font-semibold text-slate-700">{velocity.inflowCount24h} Credits</span>
          <span>across multiple handles</span>
        </div>
      </div>

      {/* 24h Outflow Card */}
      <div className="bg-surface rounded-xl border border-surface-border p-4 shadow-xs">
        <div className="flex items-center justify-between text-slate-400">
          <span className="text-[11px] font-semibold uppercase tracking-wider">24h Gross Outflow</span>
          <div className="w-7 h-7 rounded-lg bg-red-50 border border-red-200 flex items-center justify-center text-red-600">
            <ArrowUpRight className="w-4 h-4" />
          </div>
        </div>
        <div className="mt-2 text-xl font-bold font-mono text-slate-900">
          {velocity.outflow24h}
        </div>
        <div className="text-[11px] text-slate-400 mt-1 flex items-center gap-1">
          <span className="font-semibold text-slate-700">{velocity.outflowCount24h} Debits</span>
          <span>disbursed rapidly</span>
        </div>
      </div>

      {/* Retention Rate Card (Crucial Mule Signature) */}
      <div className="bg-surface rounded-xl border border-red-200 p-4 shadow-xs bg-red-50/20">
        <div className="flex items-center justify-between text-slate-400">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-red-900">
            Fund Retention Rate
          </span>
          <div className="w-7 h-7 rounded-lg bg-red-100 flex items-center justify-center text-red-700">
            <Percent className="w-4 h-4" />
          </div>
        </div>
        <div className="mt-2 flex items-baseline gap-2">
          <span className="text-xl font-bold font-mono text-red-700">
            {velocity.retentionRate}
          </span>
          <span className="text-[10px] font-bold uppercase text-red-600 px-1.5 py-0.5 rounded bg-red-100">
            Drain Signature
          </span>
        </div>
        <div className="text-[11px] text-red-600/80 mt-1">
          Net retained balance: <strong className="text-slate-900">{velocity.netRetainedBalance}</strong>
        </div>
      </div>

      {/* Holding Velocity & Turnover Spike */}
      <div className="bg-surface rounded-xl border border-surface-border p-4 shadow-xs">
        <div className="flex items-center justify-between text-slate-400">
          <span className="text-[11px] font-semibold uppercase tracking-wider">Pass-Through Speed</span>
          <div className="w-7 h-7 rounded-lg bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600">
            <Clock className="w-4 h-4" />
          </div>
        </div>
        <div className="mt-2 flex items-baseline gap-2">
          <span className="text-xl font-bold font-mono text-slate-900">
            {velocity.avgHoldingTime}
          </span>
          <span className="text-[10px] font-bold text-amber-700 px-1.5 py-0.5 rounded bg-amber-100">
            {velocity.turnoverSpikeRatio}
          </span>
        </div>
        <div className="text-[11px] text-slate-400 mt-1 truncate">
          Baseline avg: {velocity.baselineMonthlyAvg}
        </div>
      </div>
    </div>
  );
}
