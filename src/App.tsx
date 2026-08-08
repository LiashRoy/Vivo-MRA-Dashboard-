import React, { useState, useEffect, useRef } from 'react';
import { SystemProvider, useSystem } from './context/SystemContext';
import { Sidebar, Header } from './components/Header';
import { LeadershipView } from './components/LeadershipView';
import { OperatingView } from './components/OperatingView';
import { DiagnosticView } from './components/DiagnosticView';
import { InvestmentReturnTreesView } from './components/InvestmentReturnTreesView';
import { DataIngestionView } from './components/DataIngestionView';
import { MasterTablesView } from './components/MasterTablesView';
import { WrittenBriefView } from './components/WrittenBriefView';
import { CitationModal } from './components/CitationModal';

const MainLayout: React.FC = () => {
  const { activeView } = useSystem();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Scroll to top whenever activeView changes
  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = 0;
    }
  }, [activeView]);

  return (
    <div className="w-full h-screen overflow-hidden bg-slate-950 text-slate-100 font-sans flex flex-col md:flex-row min-w-0 selection:bg-indigo-600 selection:text-white relative">
      {/* Liquid Ambient Background Glow Orbs */}
      <div className="liquid-glow-1"></div>
      <div className="liquid-glow-2"></div>
      <div className="liquid-glow-3"></div>

      <Sidebar mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />
      <div ref={scrollContainerRef} className="flex-1 flex flex-col min-w-0 h-full overflow-y-auto relative z-10">
        <Header mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />
        <main className="flex-1 p-6 sm:p-8 lg:p-10 space-y-8 sm:space-y-10 bg-transparent text-slate-100 w-full">
          <div className="w-full space-y-8 sm:space-y-10">
            {activeView === 'leadership' && <LeadershipView />}
            {activeView === 'operating' && <OperatingView />}
            {activeView === 'diagnostic' && <DiagnosticView />}
            {activeView === 'trees' && <InvestmentReturnTreesView />}
            {activeView === 'ingestion' && <DataIngestionView />}
            {activeView === 'master_tables' && <MasterTablesView />}
            {activeView === 'written_brief' && <WrittenBriefView />}
          </div>
        </main>
      </div>
      <CitationModal />
    </div>
  );
};

export default function App() {
  return (
    <SystemProvider>
      <MainLayout />
    </SystemProvider>
  );
}


