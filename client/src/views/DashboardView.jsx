import React, { useState, useEffect } from 'react';
import MetricCards from '../components/dashboard/MetricCards';
import TransactionVolumeChart from '../components/dashboard/TransactionVolumeChart';
import RiskDistributionWidget from '../components/dashboard/RiskDistributionWidget';
import RecentAlertsLedger from '../components/dashboard/RecentAlertsLedger';
import { ShieldCheck, Download, RefreshCw, AlertTriangle, Loader2 } from 'lucide-react';
import { getDashboardMetrics } from '../services/api';
import { DASHBOARD_METRICS } from '../data/mockDashboardData';

export default function DashboardView({ onNavigateToTransactions, onInvestigateAccount }) {
  const [metrics, setMetrics] = useState(DASHBOARD_METRICS);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [metricsSource, setMetricsSource] = useState('mock'); // 'api' | 'mock'

  const loadMetrics = async () => {
    setIsRefreshing(true);
    const data = await getDashboardMetrics();
    if (data) {
      setMetrics(data);
      setMetricsSource('api');
    } else {
      setMetricsSource('mock');
    }
    setIsLoading(false);
    setTimeout(() => setIsRefreshing(false), 500);
  };

  useEffect(() => {
    loadMetrics();
  }, []);

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Page Banner & Operational Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
              Investigation Dashboard
            </h1>
            <span className="text-xs px-2.5 py-0.5 rounded-full font-semibold bg-brand-50 text-brand-700 border border-brand-200">
              PS-01 Mule Intelligence
            </span>
            <span className={`text-xs px-2.5 py-0.5 rounded-full font-semibold border ${
              metricsSource === 'api'
                ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                : 'bg-amber-50 text-amber-700 border-amber-200'
            }`}>
              {isLoading ? '○ Loading…' : metricsSource === 'api' ? '● Live Metrics' : '● Synthetic Demo'}
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Deterministic rule telemetry, high-velocity fund anomalies, and mule syndicate flags.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={loadMetrics}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 bg-surface hover:bg-slate-50 border border-surface-border rounded-lg shadow-xs transition-colors"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-slate-500 ${isRefreshing ? 'animate-spin' : ''}`} />
            <span>Refresh Metrics</span>
          </button>
          <button
            onClick={() => alert('Telemetry summary exported (Synthetic Demo Report)')}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-brand-600 hover:bg-brand-700 rounded-lg shadow-xs transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Telemetry</span>
          </button>
        </div>
      </div>

      {/* Advisory Callout */}
      <div className="bg-amber-50/80 border border-amber-200 rounded-xl p-3.5 flex items-start gap-3 text-xs text-amber-900">
        <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
        <div className="leading-relaxed">
          <span className="font-semibold">Investigator Advisory:</span> This workstation uses reproducible deterministic heuristics to flag suspicious mule patterns. Flagged scores indicate high probability of illicit intermediary utility and serve as decision-support for formal banking lien petitions.
        </div>
      </div>

      {/* Section 1: KPI Telemetry Cards */}
      <section aria-label="Key Performance Metrics" className="relative">
        {isLoading && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/70 rounded-xl">
            <Loader2 className="w-6 h-6 text-brand-600 animate-spin" />
          </div>
        )}
        <MetricCards metrics={metrics} />
      </section>

      {/* Section 2: Visual Telemetry (Volume & Risk Tiers) */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6" aria-label="Transaction Trends and Risk Distribution">
        <div className="lg:col-span-8">
          <TransactionVolumeChart />
        </div>
        <div className="lg:col-span-4">
          <RiskDistributionWidget />
        </div>
      </section>

      {/* Section 3: Live Priority Alert Ledger */}
      <section aria-label="Priority Investigation Alerts">
        <RecentAlertsLedger onInvestigate={onInvestigateAccount || onNavigateToTransactions} />
      </section>
    </div>
  );
}
