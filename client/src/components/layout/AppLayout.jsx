import React, { useState } from 'react';
import Sidebar from './Sidebar';
import TopNavbar from './TopNavbar';

export default function AppLayout({ children, activeTab, setActiveTab, currentRole, onRoleChange }) {
  return (
    <div className="flex min-h-screen bg-canvas text-slate-900 font-sans">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="flex-1 flex flex-col min-w-0">
        <TopNavbar activeTab={activeTab} currentRole={currentRole} onRoleChange={onRoleChange} />
        <main className="flex-1 p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
