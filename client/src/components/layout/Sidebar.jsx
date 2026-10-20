import React from 'react';
import { 
  LayoutDashboard, 
  ArrowLeftRight, 
  ShieldAlert, 
  Network, 
  FolderLock, 
  FileSpreadsheet, 
  ShieldCheck, 
  Database
} from 'lucide-react';

export default function Sidebar({ activeTab = 'dashboard', setActiveTab }) {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, badge: null },
    { id: 'transactions', label: 'Transaction Explorer', icon: ArrowLeftRight, badge: 'Live' },
    { id: 'accounts', label: 'Account Investigation', icon: ShieldAlert, badge: 'Live' },
    { id: 'graph', label: 'Fund-Flow Graph', icon: Network, badge: 'Live' },
    { id: 'cases', label: 'Investigation Workspace', icon: FolderLock, badge: 'Live' },
    { id: 'reports', label: 'Forensic Reports', icon: FileSpreadsheet, badge: 'Live' },
  ];

  return (
    <aside className="w-64 bg-surface border-r border-surface-border flex flex-col h-screen sticky top-0 shrink-0 z-20">
      {/* Brand Header */}
      <div className="h-16 flex items-center px-6 border-b border-surface-border">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-brand-600 flex items-center justify-center text-white shadow-sm shadow-brand-500/20">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <div className="font-bold text-slate-900 tracking-tight text-lg leading-tight flex items-center gap-1.5">
              Fraud-Naashak
            </div>
            <div className="text-[10px] font-semibold tracking-wider text-slate-400 uppercase">
              Financial Intelligence
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Links */}
      <div className="p-4 flex-1 space-y-1.5 overflow-y-auto">
        <div className="px-3 py-1.5 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
          Investigation Core
        </div>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isCurrent = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => {
                if (['dashboard', 'transactions', 'accounts', 'graph', 'cases', 'reports'].includes(item.id)) {
                  if (setActiveTab) setActiveTab(item.id);
                } else {
                  alert(`${item.label} will be activated in ${item.badge}.`);
                }
              }}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isCurrent
                  ? 'bg-brand-50 text-brand-700 border border-brand-100 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon className={`w-4 h-4 ${isCurrent ? 'text-brand-600' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </div>
              {item.badge && (
                <span className={`text-[10px] px-1.5 py-0.5 rounded font-mono font-medium border ${
                  item.badge === 'Live'
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                    : 'bg-slate-100 text-slate-500 border-slate-200'
                }`}>
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* System & Dataset Mode Banner */}
      <div className="p-4 border-t border-surface-border">
        <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 space-y-1.5">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
            <Database className="w-3.5 h-3.5 text-brand-600" />
            <span>Dataset Mode</span>
          </div>
          <p className="text-[11px] text-slate-500 leading-relaxed">
            Active: <span className="font-semibold text-slate-700">Synthetic Banking Records</span> (PS-01 Sandbox)
          </p>
        </div>
      </div>
    </aside>
  );
}
