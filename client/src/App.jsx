import React, { useState } from 'react';
import AppLayout from './components/layout/AppLayout';
import DashboardView from './views/DashboardView';
import TransactionExplorerView from './views/TransactionExplorerView';
import AccountInvestigationView from './views/AccountInvestigationView';
import FundFlowGraphView from './views/FundFlowGraphView';
import InvestigationWorkspaceView from './views/InvestigationWorkspaceView';
import ForensicReportsView from './views/ForensicReportsView';
import { ShieldCheck } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [targetAccountId, setTargetAccountId] = useState('918237491024');
  const [currentRole, setCurrentRole] = useState('INVESTIGATOR_LEAD');

  const handleInvestigateAccount = (accId) => {
    if (accId) setTargetAccountId(accId);
    setActiveTab('accounts');
  };

  return (
    <AppLayout 
      activeTab={activeTab} 
      setActiveTab={setActiveTab}
      currentRole={currentRole}
      onRoleChange={setCurrentRole}
    >
      {activeTab === 'dashboard' ? (
        <DashboardView 
          onNavigateToTransactions={() => setActiveTab('transactions')}
          onInvestigateAccount={handleInvestigateAccount}
        />
      ) : activeTab === 'transactions' ? (
        <TransactionExplorerView 
          onNavigateToAccount={handleInvestigateAccount}
        />
      ) : activeTab === 'accounts' ? (
        <AccountInvestigationView 
          initialAccountId={targetAccountId}
          currentRole={currentRole}
        />
      ) : activeTab === 'graph' ? (
        <FundFlowGraphView 
          onNavigateToAccount={handleInvestigateAccount}
        />
      ) : activeTab === 'cases' ? (
        <InvestigationWorkspaceView 
          onNavigateToAccount={handleInvestigateAccount}
          currentRole={currentRole}
        />
      ) : activeTab === 'reports' ? (
        <ForensicReportsView 
          currentRole={currentRole}
        />
      ) : null}

      {/* Global Forensic Application Footer */}
      <footer className="mt-12 pt-6 pb-8 border-t border-surface-border flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-3 max-w-7xl mx-auto print:hidden">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-slate-400" />
          <span><strong>Fraud-Naashak</strong> • Intelligent Mule Account Detection & Financial Fraud Investigation Platform</span>
        </div>
        <div className="font-mono text-[11px]">
          Engine Build: v1.9.0 • Stage 9 • Legal Evidence & Reports Active
        </div>
      </footer>
    </AppLayout>
  );
}
