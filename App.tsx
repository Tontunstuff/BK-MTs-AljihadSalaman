/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { HeaderNavbar } from './components/HeaderNavbar';
import { SiswaContainer } from './components/siswa/SiswaContainer';
import { GuruDashboard } from './components/guru/GuruDashboard';
import { MobileFrame } from './components/MobileFrame';
import { ArchitectureDocModal } from './components/docs/ArchitectureDocModal';
import { OfflineIndicator } from './components/pwa/OfflineIndicator';

function MainApp() {
  const { role, isMobileFrame, showDocModal, setShowDocModal } = useApp();

  return (
    <div className="min-h-screen bg-slate-100/80 text-slate-900 flex flex-col font-sans">
      {/* Top Header Navbar */}
      <HeaderNavbar />

      {/* Main Screen Body */}
      <main className="flex-1">
        {role === 'siswa' ? (
          <MobileFrame isFrameActive={isMobileFrame}>
            <SiswaContainer />
          </MobileFrame>
        ) : (
          <div className="p-3 sm:p-6">
            <GuruDashboard />
          </div>
        )}
      </main>

      {/* Architecture & Database Blueprint Modal */}
      <ArchitectureDocModal
        isOpen={showDocModal}
        onClose={() => setShowDocModal(false)}
      />

      {/* Offline Connectivity Indicator */}
      <OfflineIndicator />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <MainApp />
    </AppProvider>
  );
}
