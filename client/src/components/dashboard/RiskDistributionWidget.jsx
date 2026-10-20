import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { RISK_DISTRIBUTION_DATA } from '../../data/mockDashboardData';
import { ShieldCheck, Info } from 'lucide-react';

const CustomPieTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-surface border border-surface-border p-2.5 rounded-lg shadow-md text-xs">
        <p className="font-semibold text-slate-800">{data.name}</p>
        <p className="text-slate-600 mt-1">
          Accounts: <span className="font-mono font-bold text-slate-900">{data.value}</span> ({data.percentage})
        </p>
      </div>
    );
  }
  return null;
};

export default function RiskDistributionWidget() {
  return (
    <div className="bg-surface rounded-xl border border-surface-border p-6 shadow-xs flex flex-col justify-between">
      {/* Header */}
      <div>
        <div className="flex items-center justify-between pb-3 border-b border-surface-border">
          <h2 className="text-sm font-bold text-slate-900 tracking-tight">
            Mule Risk Tier Breakdown
          </h2>
          <span className="text-xs font-mono font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
            384 Flagged
          </span>
        </div>
        <p className="text-xs text-slate-500 mt-2">
          Heuristic risk score distribution across evaluated account nodes.
        </p>
      </div>

      {/* Donut Chart */}
      <div className="h-48 my-3 relative flex items-center justify-center">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Tooltip content={<CustomPieTooltip />} />
            <Pie
              data={RISK_DISTRIBUTION_DATA}
              cx="50%"
              cy="50%"
              innerRadius={55}
              outerRadius={75}
              paddingAngle={4}
              dataKey="value"
            >
              {RISK_DISTRIBUTION_DATA.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>

        {/* Center Indicator */}
        <div className="absolute text-center pointer-events-none">
          <div className="text-xl font-bold font-mono text-slate-900 leading-tight">384</div>
          <div className="text-[10px] uppercase font-semibold text-slate-400">Total Flags</div>
        </div>
      </div>

      {/* Tier Ledger Breakdown */}
      <div className="space-y-3 pt-2">
        {RISK_DISTRIBUTION_DATA.map((tier, idx) => (
          <div key={idx} className="space-y-1">
            <div className="flex items-center justify-between text-xs">
              <span className="flex items-center gap-2 font-medium text-slate-700">
                <span className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: tier.color }}></span>
                {tier.name}
              </span>
              <span className="font-mono font-semibold text-slate-900">
                {tier.value} <span className="text-slate-400 font-normal">({tier.percentage})</span>
              </span>
            </div>
            {/* Visual Bar */}
            <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
              <div 
                className="h-full rounded-full transition-all duration-500" 
                style={{ width: tier.percentage, backgroundColor: tier.color }}
              ></div>
            </div>
          </div>
        ))}
      </div>

      {/* Regulatory Disclaimers */}
      <div className="mt-4 pt-3 border-t border-slate-100 flex items-start gap-1.5 text-[10px] text-slate-400 leading-normal">
        <Info className="w-3.5 h-3.5 shrink-0 mt-0.5 text-slate-400" />
        <span>Scores reflect rule-based indicators and necessitate manual investigator substantiation before lien enforcement.</span>
      </div>
    </div>
  );
}
