import React, { useState, useEffect } from 'react';
import { MOCK_ACCOUNTS } from '../data/mockAccountData';
import { getAccountByNumber, getAccounts, updateAccountStatus, addCaseEvidence } from '../services/api';
import AccountProfileHeader from '../components/accounts/AccountProfileHeader';
import AccountVelocityCards from '../components/accounts/AccountVelocityCards';
import RiskScoreBreakdown from '../components/accounts/RiskScoreBreakdown';
import CounterpartyList from '../components/accounts/CounterpartyList';
import { 
  ArrowLeftRight, 
  Clock, 
  ArrowDownLeft, 
  ArrowUpRight, 
  Copy, 
  CheckCircle2, 
  Eye, 
  Filter, 
  ShieldAlert, 
  Loader2 
} from 'lucide-react';

export default function AccountInvestigationView({ 
  initialAccountId = '918237491024', 
  onNavigateToGraph,
  currentRole = 'INVESTIGATOR_LEAD'
}) {
  const [selectedAccountId, setSelectedAccountId] = useState(initialAccountId);
  const [account, setAccount] = useState(MOCK_ACCOUNTS[initialAccountId] || MOCK_ACCOUNTS['918237491024']);
  const [accountsList, setAccountsList] = useState([]);
  const [copiedUtr, setCopiedUtr] = useState(null);
  const [directionFilter, setDirectionFilter] = useState('ALL');
  const [isLoading, setIsLoading] = useState(false);

  // Sync with initialAccountId if parent navigates to a new account
  useEffect(() => {
    if (initialAccountId && initialAccountId !== selectedAccountId) {
      setSelectedAccountId(initialAccountId);
    }
  }, [initialAccountId]);

  // Load all available accounts for switcher
  useEffect(() => {
    let isMounted = true;
    getAccounts().then(data => {
      if (isMounted && data && data.length > 0) {
        setAccountsList(data);
      }
    });
    return () => { isMounted = false; };
  }, []);

  // Load selected account dossier
  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);
    getAccountByNumber(selectedAccountId).then((data) => {
      if (isMounted) {
        if (data) {
          setAccount(data);
        } else {
          setAccount(MOCK_ACCOUNTS[selectedAccountId] || MOCK_ACCOUNTS['918237491024']);
        }
        setIsLoading(false);
      }
    });
    return () => { isMounted = false; };
  }, [selectedAccountId]);

  const handleLienAction = async (accNumber) => {
    const updated = await updateAccountStatus(accNumber, 'Lien Enforced / Account Frozen');
    if (updated) {
      setAccount(prev => ({ ...prev, status: 'Lien Enforced / Account Frozen' }));
    }
  };

  const handleAttachToCase = async (acc) => {
    const evidenceData = {
      type: 'ACCOUNT',
      accountNumber: acc.accountNumber,
      holderName: acc.holderName,
      bank: acc.bank,
      riskScore: acc.riskScore,
      rule: acc.primaryFlag || 'Deterministic High Mule Velocity',
      detail: `${acc.holderName} (${acc.bank}) flagged with score ${acc.riskScore}/100. Persona: ${acc.accountPersona}.`
    };
    await addCaseEvidence('CS-108', evidenceData);
  };

  const handleCopy = (text, key) => {
    navigator.clipboard.writeText(text);
    setCopiedUtr(key);
    setTimeout(() => setCopiedUtr(null), 1800);
  };

  const transactions = account.transactions || [];
  const filteredTransactions = transactions.filter((tx) => {
    if (directionFilter === 'ALL') return true;
    return tx.direction?.toUpperCase() === directionFilter;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* 1. Account Profile Header with Switcher & Identity */}
      <div className="relative">
        {isLoading && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/70 rounded-xl">
            <div className="flex items-center gap-2">
              <Loader2 className="w-5 h-5 text-brand-600 animate-spin" />
              <span className="text-xs font-semibold text-slate-600">Loading account dossier…</span>
            </div>
          </div>
        )}
        <AccountProfileHeader
          account={account}
          selectedAccountId={selectedAccountId}
          onSelectAccount={(accId) => setSelectedAccountId(accId)}
          allAccounts={accountsList}
          onLienAction={handleLienAction}
          onAttachToCase={handleAttachToCase}
          currentRole={currentRole}
        />
      </div>


      {/* 2. Account Velocity & Retention Telemetry Cards */}
      {account.velocityMetrics && (
        <AccountVelocityCards velocity={account.velocityMetrics} />
      )}

      {/* 3. Explainable Risk Scoring Engine & Counterparty Nodes */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-7">
          <RiskScoreBreakdown
            indicators={account.riskIndicators || []}
            totalScore={account.riskScore || 0}
          />
        </div>
        <div className="lg:col-span-5">
          <CounterpartyList
            counterparties={account.counterparties || []}
            onSelectAccount={(accId) => {
              setSelectedAccountId(accId);
            }}
          />
        </div>
      </div>

      {/* 4. Account-Specific Transaction Audit Ledger */}
      <div className="bg-surface rounded-xl border border-surface-border shadow-xs overflow-hidden">
        <div className="p-5 border-b border-surface-border flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-bold text-slate-900 tracking-tight">
                Account Transfer Audit Ledger
              </h2>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200">
                {filteredTransactions.length} Recorded Movements
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Chronological log of transactions associated with account {account.accountNumber}.
            </p>
          </div>

          {/* Direction Filter */}
          <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-lg">
            {['ALL', 'INFLOW', 'OUTFLOW'].map((dir) => (
              <button
                key={dir}
                onClick={() => setDirectionFilter(dir)}
                className={`px-3 py-1 rounded-md text-xs font-semibold transition-all ${
                  directionFilter === dir
                    ? 'bg-surface text-slate-900 shadow-xs'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                {dir === 'ALL' ? 'All Flows' : dir}
              </button>
            ))}
          </div>
        </div>

        {/* Ledger Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50/75 border-b border-surface-border text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                <th className="py-3 px-6">Timestamp & UTR</th>
                <th className="py-3 px-6">Direction</th>
                <th className="py-3 px-6">Counterparty Node</th>
                <th className="py-3 px-6 text-right">Amount (₹)</th>
                <th className="py-3 px-6 text-center">Channel</th>
                <th className="py-3 px-6">Detected Pattern</th>
                <th className="py-3 px-6 text-center">Mule Score</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredTransactions.length === 0 ? (
                <tr>
                  <td colSpan="7" className="py-8 text-center text-slate-400">
                    No transactions recorded for this account.
                  </td>
                </tr>
              ) : (
                filteredTransactions.map((tx, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-6 font-mono font-medium text-slate-900">
                      <div className="flex items-center gap-1.5">
                        <span>{tx.utr}</span>
                        <button
                          onClick={() => handleCopy(tx.utr, `utr-${idx}`)}
                          className="text-slate-400 hover:text-slate-700"
                        >
                          {copiedUtr === `utr-${idx}` ? (
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </div>
                      <div className="text-[11px] text-slate-400 font-sans mt-0.5 flex items-center gap-1">
                        <Clock className="w-3 h-3 text-slate-300" />
                        {tx.timestamp}
                      </div>
                    </td>

                    <td className="py-3.5 px-6">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-semibold border ${
                        tx.direction === 'Inflow'
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                          : 'bg-red-50 text-red-700 border-red-200'
                      }`}>
                        {tx.direction === 'Inflow' ? (
                          <ArrowDownLeft className="w-3.5 h-3.5" />
                        ) : (
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        )}
                        {tx.direction}
                      </span>
                    </td>

                    <td className="py-3.5 px-6 font-medium text-slate-800">
                      {tx.counterparty}
                    </td>

                    <td className="py-3.5 px-6 text-right font-mono font-bold text-slate-900">
                      {tx.amount}
                    </td>

                    <td className="py-3.5 px-6 text-center font-mono">
                      <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-[11px] border border-slate-200">
                        {tx.channel}
                      </span>
                    </td>

                    <td className="py-3.5 px-6">
                      <span className="inline-block px-2 py-0.5 rounded text-[11px] font-semibold bg-red-50 text-red-700 border border-red-200">
                        {tx.pattern}
                      </span>
                    </td>

                    <td className="py-3.5 px-6 text-center">
                      <span className="px-2.5 py-0.5 rounded-full font-mono font-bold text-xs bg-red-50 text-red-700 border border-red-200">
                        {tx.riskScore}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
