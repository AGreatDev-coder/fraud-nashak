import React from 'react';
import { Users, AlertTriangle, Zap, Briefcase, TrendingUp, ShieldAlert, ArrowUpRight } from 'lucide-react';
import { DASHBOARD_METRICS } from '../../data/mockDashboardData';

export default function MetricCards() {
  const cards = [
    {
      title: 'Total Accounts Analyzed',
      value: DASHBOARD_METRICS.totalAccountsAnalyzed.toLocaleString('en-IN'),
      badge: '+12.4%',
      badgeType: 'neutral',
      subtitle: 'Evaluated across 6 partner banks',
      icon: Users,
      iconColor: 'text-brand-600',
      iconBg: 'bg-brand-50 border-brand-100',
    },
    {
      title: 'Suspicious Mule Accounts',
      value: DASHBOARD_METRICS.muleFlagsDetected.toLocaleString('en-IN'),
      badge: `${DASHBOARD_METRICS.muleFlagsCritical} Critical`,
      badgeType: 'critical',
      subtitle: '+34 flagged in the last 24 hours',
      icon: ShieldAlert,
      iconColor: 'text-risk-critical',
      iconBg: 'bg-risk-critical-bg border-risk-critical-border',
    },
    {
      title: 'High-Risk Fund Velocity',
      value: DASHBOARD_METRICS.highRiskVelocity,
      badge: '+18.2% Spike',
      badgeType: 'warning',
      subtitle: 'Total volume transacted across flagged nodes',
      icon: Zap,
      iconColor: 'text-amber-600',
      iconBg: 'bg-amber-50 border-amber-200',
    },
    {
      title: 'Active Investigation Cases',
      value: DASHBOARD_METRICS.activeCases.toString(),
      badge: `${DASHBOARD_METRICS.activeCasesUrgent} Urgent`,
      badgeType: 'urgent',
      subtitle: '5 accounts pending bank freeze petition',
      icon: Briefcase,
      iconColor: 'text-indigo-600',
      iconBg: 'bg-indigo-50 border-indigo-100',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
      {cards.map((card, idx) => {
        const Icon = card.icon;
        return (
          <div
            key={idx}
            className="bg-surface rounded-xl border border-surface-border p-5 shadow-xs hover:border-slate-300 transition-all"
          >
            <div className="flex items-start justify-between">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                {card.title}
              </span>
              <div className={`w-8 h-8 rounded-lg border flex items-center justify-center ${card.iconBg}`}>
                <Icon className={`w-4 h-4 ${card.iconColor}`} />
              </div>
            </div>

            <div className="mt-3 flex items-baseline gap-2.5">
              <span className="text-2xl font-bold tracking-tight text-slate-900 font-mono">
                {card.value}
              </span>
              <span
                className={`inline-flex items-center text-[11px] font-semibold px-2 py-0.5 rounded-full border ${
                  card.badgeType === 'critical'
                    ? 'bg-red-50 text-red-700 border-red-200'
                    : card.badgeType === 'warning'
                    ? 'bg-amber-50 text-amber-700 border-amber-200'
                    : card.badgeType === 'urgent'
                    ? 'bg-indigo-50 text-indigo-700 border-indigo-200'
                    : 'bg-slate-100 text-slate-700 border-slate-200'
                }`}
              >
                <ArrowUpRight className="w-3 h-3 mr-0.5 inline" />
                {card.badge}
              </span>
            </div>

            <p className="mt-2 text-xs text-slate-400 font-normal">
              {card.subtitle}
            </p>
          </div>
        );
      })}
    </div>
  );
}
