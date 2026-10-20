import React, { useState, useEffect } from 'react';
import { Search, Bell, Shield, User, Activity, Database, ChevronDown, Check, Lock, ShieldAlert } from 'lucide-react';
import { checkBackendHealth, setInvestigatorClearance } from '../../services/api';

const CLEARANCE_ROLES = [
  {
    id: 'INVESTIGATOR_LEAD',
    title: 'Lead Investigator',
    clearance: 'Level 3 • Full Section 102 CrPC Lien Authority',
    badge: 'LEAD',
    badgeClass: 'bg-red-50 text-red-700 border-red-200',
    avatar: 'SS',
    name: 'Officer S. Sharma (Lead FIU)',
    badgeColor: 'bg-red-500'
  },
  {
    id: 'FORENSIC_ANALYST',
    title: 'Forensic Analyst',
    clearance: 'Level 2 • Investigation & Evidence Pinning',
    badge: 'ANALYST',
    badgeClass: 'bg-blue-50 text-blue-700 border-blue-200',
    avatar: 'AK',
    name: 'Analyst A. Kumar',
    badgeColor: 'bg-blue-500'
  },
  {
    id: 'AUDITOR',
    title: 'Compliance Auditor',
    clearance: 'Level 1 • Read-Only Oversight Clearance',
    badge: 'AUDITOR',
    badgeClass: 'bg-slate-100 text-slate-700 border-slate-200',
    avatar: 'PM',
    name: 'Auditor P. Mehta',
    badgeColor: 'bg-slate-500'
  }
];

export default function TopNavbar({ activeTab = 'Dashboard', currentRole = 'INVESTIGATOR_LEAD', onRoleChange }) {
  const [health, setHealth] = useState({ status: 'CHECKING', database: 'Connecting...' });
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    let isMounted = true;
    checkBackendHealth().then(res => {
      if (isMounted) setHealth(res);
    });
    const interval = setInterval(() => {
      checkBackendHealth().then(res => {
        if (isMounted) setHealth(res);
      });
    }, 15000);
    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  const activeRoleData = CLEARANCE_ROLES.find(r => r.id === currentRole) || CLEARANCE_ROLES[0];
  const isConnected = health.status === 'HEALTHY';

  const handleSelectRole = (role) => {
    setInvestigatorClearance(role.id, role.name, `IND-FIU-${role.badge}`);
    if (onRoleChange) onRoleChange(role.id);
    setIsDropdownOpen(false);
  };

  return (
    <header className="h-16 bg-surface border-b border-surface-border px-8 flex items-center justify-between sticky top-0 z-30">
      {/* Left: Breadcrumb / View Title */}
      <div className="flex items-center gap-3">
        <span className="text-xs font-medium text-slate-400">Home</span>
        <span className="text-xs text-slate-300">/</span>
        <span className="text-xs font-semibold text-slate-700 capitalize">
          {activeTab} Overview
        </span>

        {/* Live Backend / DB Status Badge */}
        <span className={`ml-2 inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border ${
          isConnected 
            ? 'bg-emerald-50 text-emerald-700 border-emerald-200' 
            : 'bg-amber-50 text-amber-700 border-amber-200'
        }`}>
          <span className={`w-1.5 h-1.5 rounded-full ${isConnected ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`}></span>
          <span>{isConnected ? 'API: Connected (MongoDB)' : 'API: In-Memory Sandbox'}</span>
        </span>
      </div>

      {/* Center: Quick Search */}
      <div className="w-96">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search Account No, UTR reference, IFSC, PAN..."
            className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-9 pr-4 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all"
          />
        </div>
      </div>

      {/* Right: Security Clearance Switcher & Investigator Profile */}
      <div className="flex items-center gap-4">
        {/* Rule Engine Status */}
        <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-600">
          <Activity className="w-3.5 h-3.5 text-brand-600" />
          <span>Rule Engine: <strong className="text-slate-900 font-medium">Deterministic v1.0</strong></span>
        </div>

        {/* Alerts Pill */}
        <button 
          title="3 Unassigned Critical Alerts"
          className="relative p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-50 rounded-lg border border-transparent hover:border-slate-200 transition-colors"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-risk-critical ring-2 ring-white"></span>
        </button>

        <div className="h-6 w-px bg-slate-200"></div>

        {/* Investigator Clearance Switcher Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-2.5 p-1.5 pr-2.5 rounded-lg hover:bg-slate-50 border border-transparent hover:border-slate-200 transition-all text-left"
            title="Click to switch security clearance role"
          >
            <div className="relative">
              <div className="w-8 h-8 rounded-full bg-brand-100 border border-brand-200 flex items-center justify-center text-brand-700 font-semibold text-xs shadow-xs">
                {activeRoleData.avatar}
              </div>
              <span className={`absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2 border-white ${activeRoleData.badgeColor}`}></span>
            </div>
            <div className="hidden md:block text-left">
              <div className="text-xs font-semibold text-slate-800 leading-tight flex items-center gap-1.5">
                <span>{activeRoleData.name}</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </div>
              <div className="text-[10px] text-slate-400 flex items-center gap-1">
                <span className={`px-1 py-0.2 rounded font-mono font-bold text-[9px] border ${activeRoleData.badgeClass}`}>
                  {activeRoleData.badge}
                </span>
                <span>Cyber Crime & FIU</span>
              </div>
            </div>
          </button>

          {/* Interactive Role Dropdown Menu */}
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-72 bg-surface rounded-xl border border-surface-border shadow-xl p-2 z-50 text-xs animate-in fade-in zoom-in-95 duration-150">
              <div className="px-3 py-2 border-b border-surface-border mb-1">
                <div className="font-bold text-slate-900 text-xs">Investigator Clearance Switcher</div>
                <div className="text-[10px] text-slate-400 mt-0.5">Toggle authorization tier to demo RBAC rules</div>
              </div>

              <div className="space-y-1">
                {CLEARANCE_ROLES.map((role) => {
                  const isSelected = role.id === currentRole;
                  return (
                    <button
                      key={role.id}
                      onClick={() => handleSelectRole(role)}
                      className={`w-full flex items-start gap-2.5 p-2.5 rounded-lg text-left transition-colors ${
                        isSelected 
                          ? 'bg-brand-50/70 border border-brand-100 text-slate-900' 
                          : 'hover:bg-slate-50 text-slate-700'
                      }`}
                    >
                      <div className="w-7 h-7 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-xs font-bold text-slate-700 shrink-0 mt-0.5">
                        {role.avatar}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-xs text-slate-800 truncate">{role.title}</span>
                          {isSelected && <Check className="w-3.5 h-3.5 text-brand-600 shrink-0" />}
                        </div>
                        <div className="text-[10px] text-slate-500 mt-0.5 line-clamp-1">{role.clearance}</div>
                        <span className={`inline-block mt-1 px-1.5 py-0.2 rounded text-[9px] font-mono font-bold border ${role.badgeClass}`}>
                          {role.badge} CLEARANCE
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="mt-2 pt-2 border-t border-surface-border px-2 text-[10px] text-slate-400 leading-tight">
                🔒 RBAC: Bank lien freezes strictly restricted to <strong>LEAD</strong> clearance under Sec 102 CrPC.
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

