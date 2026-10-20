import React, { useState } from 'react';
import { 
  Building2, 
  ShieldAlert, 
  Calendar, 
  Copy, 
  CheckCircle2, 
  AlertTriangle, 
  Download, 
  Lock, 
  FolderPlus,
  UserCheck,
  ChevronDown
} from 'lucide-react';

export default function AccountProfileHeader({
  account,
  selectedAccountId,
  onSelectAccount,
  allAccounts = [],
  onLienAction,
  onAttachToCase,
  currentRole = 'INVESTIGATOR_LEAD'
}) {
  const [copied, setCopied] = useState(false);
  const [actionDone, setActionDone] = useState(null);

  const canFreeze = currentRole === 'INVESTIGATOR_LEAD';
  const canAttach = currentRole !== 'AUDITOR';

  const handleCopy = () => {
    navigator.clipboard.writeText(account.accountNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleAction = async (type) => {
    if (type === 'lien') {
      if (!canFreeze) return;
      if (onLienAction) await onLienAction(account.accountNumber);
      setActionDone('lien');
      setTimeout(() => setActionDone(null), 3000);
    } else if (type === 'case') {
      if (!canAttach) return;
      if (onAttachToCase) await onAttachToCase(account);
      setActionDone('case');
      setTimeout(() => setActionDone(null), 3000);
    }
  };

  const fallbackAccounts = [
    { accountNumber: '918237491024', holderName: 'Kishore M.', bank: 'Axis', riskScore: 96 },
    { accountNumber: '481920381920', holderName: 'Apex Digital Hub', bank: 'HDFC', riskScore: 92 },
    { accountNumber: '601928471920', holderName: 'Pooja Verma', bank: 'SBI', riskScore: 88 }
  ];

  const displayAccounts = allAccounts && allAccounts.length > 0 ? allAccounts : fallbackAccounts;
  const isFrozen = account.status?.includes('Lien') || account.status?.includes('Frozen');

  return (
    <div className="bg-surface rounded-xl border border-surface-border p-6 shadow-xs space-y-5">
      {/* Top Bar: Account Switcher & Action Buttons */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-surface-border">
        {/* Account Switcher Dropdown */}
        <div className="flex items-center gap-3">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Auditing Dossier:
          </span>
          <div className="relative">
            <select
              value={selectedAccountId}
              onChange={(e) => onSelectAccount(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-lg pl-3 pr-8 py-1.5 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 cursor-pointer appearance-none max-w-xs md:max-w-md"
            >
              {displayAccounts.map((acc) => (
                <option key={acc.accountNumber} value={acc.accountNumber}>
                  {acc.holderName} ({acc.bank} - {acc.accountNumber}) [Score: {acc.riskScore}]
                </option>
              ))}
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {/* Account Status Badge */}
          {account.status && (
            <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${
              isFrozen
                ? 'bg-red-50 text-red-700 border-red-200 animate-pulse'
                : 'bg-slate-100 text-slate-700 border-slate-200'
            }`}>
              ● {account.status}
            </span>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          {/* RBAC Protected Lien / Freeze Button */}
          <button
            onClick={() => handleAction('lien')}
            disabled={isFrozen || !canFreeze}
            title={!canFreeze ? "Requires Lead Investigator clearance (Sec 102 CrPC)" : isFrozen ? "Lien already recorded" : ""}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all flex items-center gap-1.5 ${
              !canFreeze
                ? 'bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed'
                : isFrozen || actionDone === 'lien'
                ? 'bg-red-600 text-white border-red-600'
                : 'bg-red-50 hover:bg-red-100 text-red-700 border-red-200'
            }`}
          >
            <Lock className="w-3.5 h-3.5" />
            <span>
              {isFrozen 
                ? 'Lien Enforced (Frozen)' 
                : !canFreeze 
                ? 'Lien Freeze (Lead Only)' 
                : actionDone === 'lien' 
                ? 'Freezing Account...' 
                : 'Flag for Lien / Freeze'}
            </span>
          </button>

          {/* RBAC Protected Case Evidence Button */}
          <button
            onClick={() => handleAction('case')}
            disabled={!canAttach}
            title={!canAttach ? "Read-Only clearance: Action restricted" : ""}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all flex items-center gap-1.5 ${
              !canAttach
                ? 'bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed'
                : actionDone === 'case'
                ? 'bg-brand-600 text-white border-brand-600'
                : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
            }`}
          >
            <FolderPlus className="w-3.5 h-3.5 text-slate-500" />
            <span>
              {!canAttach
                ? 'Attach (Restricted)'
                : actionDone === 'case'
                ? 'Pinned to Case #CS-108'
                : 'Attach to Case'}
            </span>
          </button>

          <button
            onClick={() => alert(`Exporting formal Account Dossier PDF for ${account.accountNumber}...`)}
            className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-brand-600 hover:bg-brand-700 text-white transition-colors flex items-center gap-1.5 shadow-xs"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Dossier</span>
          </button>
        </div>
      </div>



      {/* Main Profile Header Details */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left 9 Cols: Entity Profile Information */}
        <div className="lg:col-span-9 space-y-3">
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-xl font-bold tracking-tight text-slate-900">
              {account.holderName}
            </h1>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-red-50 text-red-700 border border-red-200">
              <ShieldAlert className="w-3.5 h-3.5 text-red-600" />
              {account.primaryFlag}
            </span>
          </div>

          <p className="text-xs text-slate-500 font-medium">
            {account.accountPersona}
          </p>

          {/* Badges and Bank Details Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200">
              <span className="text-[10px] font-semibold text-slate-400 uppercase block">Account Number</span>
              <div className="flex items-center gap-1.5 font-mono font-bold text-slate-900 text-xs mt-0.5">
                <span>{account.accountNumber}</span>
                <button
                  onClick={handleCopy}
                  title="Copy account number"
                  className="text-slate-400 hover:text-slate-700"
                >
                  {copied ? <CheckCircle2 className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                </button>
              </div>
            </div>

            <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200">
              <span className="text-[10px] font-semibold text-slate-400 uppercase block">Institution & Branch</span>
              <div className="font-semibold text-slate-800 text-xs mt-0.5 truncate">
                {account.bank} ({account.ifsc})
              </div>
              <div className="text-[10px] text-slate-400 truncate">{account.branch}</div>
            </div>

            <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200">
              <span className="text-[10px] font-semibold text-slate-400 uppercase block">KYC Verification</span>
              <div className="flex items-center gap-1 text-slate-700 text-xs font-medium mt-0.5">
                <UserCheck className="w-3.5 h-3.5 text-brand-600" />
                <span>{account.kycStatus}</span>
              </div>
              <div className="text-[10px] text-slate-400 font-mono">PAN: {account.panHash}</div>
            </div>

            <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200">
              <span className="text-[10px] font-semibold text-slate-400 uppercase block">Account Age</span>
              <div className="flex items-center gap-1 text-slate-700 text-xs font-medium mt-0.5">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                <span>{account.openedDate}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right 3 Cols: Big Mule Risk Score Dial */}
        <div className="lg:col-span-3 bg-red-50/70 border border-red-200 rounded-xl p-4 flex flex-col items-center justify-center text-center">
          <span className="text-[10px] font-bold text-red-900 uppercase tracking-wider">
            Deterministic Mule Score
          </span>
          <div className="text-4xl font-black font-mono text-red-700 mt-1">
            {account.riskScore}<span className="text-lg font-normal text-red-400">/100</span>
          </div>
          <span className="mt-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase bg-red-600 text-white shadow-xs">
            {account.riskSeverity} Risk Tier
          </span>
          <span className="text-[10px] text-red-600/80 mt-2 font-medium">
            Threshold: ≥80 points indicates high mule syndicate probability
          </span>
        </div>
      </div>
    </div>
  );
}
