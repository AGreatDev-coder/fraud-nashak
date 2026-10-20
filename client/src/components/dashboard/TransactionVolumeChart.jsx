import React, { useState } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';
import { TRANSACTION_VOLUME_TREND } from '../../data/mockDashboardData';
import { Calendar, Filter, AlertOctagon } from 'lucide-react';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-surface border border-surface-border p-3 rounded-lg shadow-md text-xs font-sans">
        <p className="font-semibold text-slate-800 mb-1.5">{label} 2026 Audit Period</p>
        <div className="space-y-1">
          <p className="text-slate-600 flex items-center justify-between gap-4">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-brand-600"></span>
              Standard Volume:
            </span>
            <span className="font-mono font-semibold text-slate-900">
              ₹{payload[0]?.value}L
            </span>
          </p>
          <p className="text-red-600 flex items-center justify-between gap-4">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-red-500"></span>
              Flagged Suspicious:
            </span>
            <span className="font-mono font-bold text-red-700">
              ₹{payload[1]?.value}L
            </span>
          </p>
        </div>
      </div>
    );
  }
  return null;
};

export default function TransactionVolumeChart() {
  const [timeRange, setTimeRange] = useState('10M');

  return (
    <div className="bg-surface rounded-xl border border-surface-border p-6 shadow-xs">
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-surface-border">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-sm font-bold text-slate-900 tracking-tight">
              Transaction Volume & Anomaly Inflow
            </h2>
            <span className="px-2 py-0.5 rounded text-[11px] font-medium bg-red-50 text-red-700 border border-red-200 flex items-center gap-1">
              <AlertOctagon className="w-3 h-3" />
              Syndicate Spikes Detected
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Aggregated gross volume vs flagged high-velocity mule pass-throughs (in Lakhs)
          </p>
        </div>

        {/* Filter controls */}
        <div className="flex items-center gap-2">
          {['30D', '90D', '10M'].map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                timeRange === range
                  ? 'bg-slate-900 text-white'
                  : 'text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {range === '10M' ? 'All (YTD)' : range}
            </button>
          ))}
        </div>
      </div>

      {/* Chart Canvas */}
      <div className="h-72 mt-6 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={TRANSACTION_VOLUME_TREND}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorStandard" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#2563EB" stopOpacity={0.15}/>
                <stop offset="95%" stopColor="#2563EB" stopOpacity={0.0}/>
              </linearGradient>
              <linearGradient id="colorSuspicious" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#DC2626" stopOpacity={0.25}/>
                <stop offset="95%" stopColor="#DC2626" stopOpacity={0.0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
            <XAxis 
              dataKey="month" 
              tickLine={false} 
              axisLine={{ stroke: '#CBD5E1' }} 
              tick={{ fill: '#64748B', fontSize: 11 }}
            />
            <YAxis 
              tickLine={false} 
              axisLine={false} 
              tick={{ fill: '#64748B', fontSize: 11 }}
              tickFormatter={(val) => `₹${val}L`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="standardVolume"
              name="Standard Volume (₹)"
              stroke="#2563EB"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorStandard)"
            />
            <Area
              type="monotone"
              dataKey="suspiciousVolume"
              name="Suspicious Inflow (₹)"
              stroke="#DC2626"
              strokeWidth={2.5}
              fillOpacity={1}
              fill="url(#colorSuspicious)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Forensic annotation footer */}
      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-brand-600"></span>
            Total Legitimate Cleared Volume
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-600"></span>
            Flagged Mule Structuring / Smurfing
          </span>
        </div>
        <span className="font-mono text-slate-400">Peak Anomaly: July (+112L surge)</span>
      </div>
    </div>
  );
}
