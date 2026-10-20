import React, { useState } from 'react';
import { 
  RECENT_ALERTS_DATA 
} from '../../data/mockDashboardData';
import { 
  ShieldAlert, 
  ExternalLink, 
  Clock, 
  ArrowRight, 
  Copy, 
  CheckCircle2, 
  Filter, 
  Search,
  Eye,
  AlertTriangle
} from 'lucide-react';

export default function RecentAlertsLedger({ onInvestigate }) {
  const [filterSeverity, setFilterSeverity] = useState('ALL');
  const [copiedId, setCopiedId] = useState(null);
  const [selectedAlert, setSelectedAlert] = useState(null);

  const handleCopy = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filteredData = filterSeverity === 'ALL'
    ? RECENT_ALERTS_DATA
    : RECENT_ALERTS_DATA.filter(item => item.severity.toUpperCase() === filterSeverity);

  return (
    <div className="bg-surface rounded-xl border border-surface-border shadow-xs overflow-hidden">
      {/* Table Header */}
      <div className="p-6 border-b border-surface-border flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-base font-bold text-slate-900 tracking-tight">
              Investigation Alert Ledger
            </h2>
            <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-red-50 text-red-700 border border-red-200">
              Live Priority Queue
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Accounts exhibiting high-velocity structuring, rapid pass-throughs, or dormancy spikes.
          </p>
        </div>

        {/* Severity Filter Tabs */}
        <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-lg self-start md:self-auto">
          {['ALL', 'CRITICAL', 'HIGH', 'MEDIUM'].map((sev) => (
            <button
              key={sev}
              onClick={() => setFilterSeverity(sev)}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
                filterSeverity === sev
                  ? 'bg-surface text-slate-900 shadow-xs'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              {sev === 'ALL' ? 'All Alerts' : sev}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/75 border-b border-surface-border text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
              <th className="py-3 px-6">Account & Institution</th>
              <th className="py-3 px-6">Account Holder</th>
              <th className="py-3 px-6 text-center">Mule Risk Score</th>
              <th className="py-3 px-6">Detected Pattern & Evidence</th>
              <th className="py-3 px-6 text-right">Flow Volume</th>
              <th className="py-3 px-6 text-center">Status</th>
              <th className="py-3 px-6 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-xs">
            {filteredData.map((alert) => (
              <tr 
                key={alert.id}
                className="hover:bg-slate-50/80 transition-colors group"
              >
                {/* Account & Bank */}
                <td className="py-4 px-6">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-semibold text-slate-900 tracking-tight">
                      {alert.accountNumber}
                    </span>
                    <button
                      onClick={() => handleCopy(alert.accountNumber, alert.id)}
                      title="Copy account number"
                      className="text-slate-400 hover:text-slate-600 p-0.5 rounded transition-colors"
                    >
                      {copiedId === alert.id ? (
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5">
                    {alert.bank}
                  </div>
                </td>

                {/* Account Holder */}
                <td className="py-4 px-6 font-medium text-slate-800">
                  <div>{alert.accountHolder}</div>
                  <div className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5">
                    <Clock className="w-3 h-3 text-slate-300" />
                    {alert.flaggedTime}
                  </div>
                </td>

                {/* Risk Score */}
                <td className="py-4 px-6 text-center">
                  <div className="inline-flex items-center justify-center">
                    <span 
                      className={`px-2.5 py-1 rounded-full font-mono font-bold text-xs border ${
                        alert.riskScore >= 85
                          ? 'bg-red-50 text-red-700 border-red-200 ring-2 ring-red-100/50'
                          : alert.riskScore >= 70
                          ? 'bg-amber-50 text-amber-700 border-amber-200'
                          : 'bg-yellow-50 text-yellow-700 border-yellow-200'
                      }`}
                    >
                      {alert.riskScore}/100
                    </span>
                  </div>
                </td>

                {/* Pattern & Evidence */}
                <td className="py-4 px-6 max-w-xs">
                  <div className="font-semibold text-slate-900 flex items-center gap-1.5">
                    <span className={`w-1.5 h-1.5 rounded-full ${alert.riskScore >= 85 ? 'bg-red-500' : 'bg-amber-500'}`}></span>
                    {alert.pattern}
                  </div>
                  <div className="text-[11px] text-slate-500 mt-0.5 line-clamp-2 leading-relaxed">
                    {alert.patternDetail}
                  </div>
                </td>

                {/* Flow Volume */}
                <td className="py-4 px-6 text-right font-mono font-semibold text-slate-900">
                  {alert.flowVolume}
                  <div className="text-[10px] text-slate-400 font-sans font-normal">
                    {alert.linkedNodes} Connected Nodes
                  </div>
                </td>

                {/* Status */}
                <td className="py-4 px-6 text-center">
                  <span className="inline-block px-2.5 py-1 rounded-md text-[11px] font-medium bg-slate-100 text-slate-700 border border-slate-200">
                    {alert.status}
                  </span>
                </td>

                {/* Action */}
                <td className="py-4 px-6 text-right">
                  <button
                    onClick={() => {
                      if (onInvestigate) onInvestigate(alert.accountNumber);
                    }}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-brand-50 hover:bg-brand-600 text-brand-700 hover:text-white rounded-lg text-xs font-semibold border border-brand-200 hover:border-transparent transition-all shadow-xs"
                  >
                    <span>Investigate</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Table Footer */}
      <div className="p-4 bg-slate-50 border-t border-surface-border flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-2">
        <span>Showing <strong>5 of 384</strong> flagged accounts • Synthetic evaluation set</span>
        <span className="font-mono text-[11px] text-slate-400">Deterministic scoring rule: #RULE-VELOCITY-04</span>
      </div>

      {/* Quick Evidence Preview Drawer (Modal) */}
      {selectedAlert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4">
          <div className="bg-surface rounded-2xl border border-surface-border shadow-xl max-w-lg w-full p-6 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-surface-border">
              <div className="flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-risk-critical" />
                <h3 className="font-bold text-slate-900 text-base">
                  Forensic Evidence Preview
                </h3>
              </div>
              <button 
                onClick={() => setSelectedAlert(null)}
                className="text-slate-400 hover:text-slate-700 text-sm font-semibold p-1"
              >
                ✕
              </button>
            </div>

            <div className="mt-4 space-y-3.5 text-xs">
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 grid grid-cols-2 gap-2">
                <div>
                  <span className="text-slate-400 text-[10px] uppercase font-semibold">Account Number</span>
                  <p className="font-mono font-bold text-slate-900 text-sm">{selectedAlert.accountNumber}</p>
                </div>
                <div>
                  <span className="text-slate-400 text-[10px] uppercase font-semibold">Mule Risk Score</span>
                  <p className="font-mono font-bold text-red-600 text-sm">{selectedAlert.riskScore}/100 (Critical)</p>
                </div>
                <div>
                  <span className="text-slate-400 text-[10px] uppercase font-semibold">Bank & IFSC</span>
                  <p className="text-slate-700 font-medium">{selectedAlert.bank}</p>
                </div>
                <div>
                  <span className="text-slate-400 text-[10px] uppercase font-semibold">Flow Velocity</span>
                  <p className="font-mono font-bold text-slate-900">{selectedAlert.flowVolume}</p>
                </div>
              </div>

              <div>
                <span className="text-slate-500 font-semibold block mb-1">Triggered Heuristic Pattern:</span>
                <div className="p-3 bg-red-50/70 border border-red-200 rounded-lg text-slate-800 leading-relaxed font-medium">
                  {selectedAlert.patternDetail}
                </div>
              </div>

              <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg text-amber-800 text-[11px] leading-relaxed">
                <strong>Investigator Guidance:</strong> Account displays characteristics of a secondary layering tier mule. Fund dispersal occurs in under 15 minutes to defeat standard AML settlement cycles.
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-surface-border flex items-center justify-end gap-2.5">
              <button
                onClick={() => setSelectedAlert(null)}
                className="px-4 py-2 rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-colors"
              >
                Close Preview
              </button>
              <button
                onClick={() => {
                  if (onInvestigate) onInvestigate(selectedAlert.accountNumber);
                  setSelectedAlert(null);
                }}
                className="px-4 py-2 rounded-lg text-xs font-semibold bg-brand-600 hover:bg-brand-700 text-white transition-colors flex items-center gap-1.5"
              >
                <span>Full Account Dossier</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
