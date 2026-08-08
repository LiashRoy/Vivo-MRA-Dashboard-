import React from 'react';
import { useSystem } from '../context/SystemContext';
import { ActiveView } from '../types';
import { VivoLogo } from './VivoLogo';
import { 
  BarChart3, 
  Store, 
  SearchCode, 
  GitFork, 
  FilePlus2, 
  Database, 
  BookOpen, 
  RotateCcw,
  ShieldCheck,
  Menu,
  X,
  SlidersHorizontal,
  LayoutDashboard,
  Sparkles,
  Globe,
  Building2,
  Package,
  Users
} from 'lucide-react';

interface SidebarProps {
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ mobileMenuOpen, setMobileMenuOpen }) => {
  const { 
    activeView, 
    setActiveView, 
    factMetrics 
  } = useSystem();

  const views: { id: ActiveView; label: string; shortLabel: string; icon: React.FC<{ className?: string }> }[] = [
    { id: 'leadership', label: '1. Leadership View', shortLabel: 'Leadership Outcomes', icon: BarChart3 },
    { id: 'operating', label: '2. Operating View', shortLabel: 'Operating Channels', icon: Store },
    { id: 'diagnostic', label: '3. Diagnostic View', shortLabel: 'Diagnostic & Unit Econ', icon: SearchCode },
    { id: 'trees', label: '4. Investment & Return Trees', shortLabel: 'Trees Hierarchy', icon: GitFork },
    { id: 'ingestion', label: '5. Ingestion Form', shortLabel: 'Data Ingestion', icon: FilePlus2 },
    { id: 'master_tables', label: '6. Master Tables (DB)', shortLabel: 'Database Masters', icon: Database },
    { id: 'written_brief', label: '7. Written Brief & Sources', shortLabel: 'Written Brief', icon: BookOpen },
  ];

  return (
    <aside className={`
      fixed inset-y-0 left-0 z-50 w-64 glass-sidebar text-white flex flex-col shrink-0 transition-transform duration-300 md:relative md:h-full md:translate-x-0
      ${mobileMenuOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full md:translate-x-0'}
    `}>
      {/* Brand Header */}
      <div className="p-6 flex items-center justify-between border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center rounded-lg shadow-md overflow-hidden">
            <VivoLogo className="h-7 w-auto" />
          </div>
          <div>
            <span className="text-slate-100 font-bold tracking-tight text-base block leading-tight">Intelligence</span>
            <span className="text-[10px] text-indigo-300/80 font-medium tracking-wider uppercase">Executive System</span>
          </div>
        </div>
        <button 
          onClick={() => setMobileMenuOpen(false)}
          className="md:hidden text-slate-400 hover:text-white p-1.5 rounded-lg cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* View Navigation */}
      <div className="px-5 pt-6 pb-2 text-[10px] font-bold uppercase tracking-widest text-slate-400/90">
        Decision Views
      </div>
      <nav className="flex-1 px-4 space-y-1.5 overflow-y-auto no-scrollbar">
        {views.map((v) => {
          const Icon = v.icon;
          const isActive = activeView === v.id;
          return (
            <button
              key={v.id}
              onClick={() => {
                setActiveView(v.id);
                setMobileMenuOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-medium text-xs transition-all text-left cursor-pointer ${
                isActive
                  ? 'bg-indigo-500/25 text-indigo-200 border border-indigo-400/30 font-semibold shadow-sm backdrop-blur-md'
                  : 'text-slate-400 hover:bg-white/5 hover:text-slate-100 border border-transparent'
              }`}
            >
              <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-indigo-300' : 'text-slate-400'}`} />
              <span className="truncate">{v.shortLabel}</span>
            </button>
          );
        })}
      </nav>

      {/* Sidebar Footer Info Widget */}
      <div className="p-5 mt-auto border-t border-white/10">
        <div className="glass-card rounded-xl p-3.5 text-xs space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-slate-400 uppercase font-semibold text-[10px] tracking-wider">Fact Repository</span>
            <span className="text-emerald-300 text-[10px] font-medium bg-emerald-500/15 px-2 py-0.5 rounded-md border border-emerald-500/30 backdrop-blur-xs">
              Verified
            </span>
          </div>
          <div className="text-base font-bold text-slate-100">
            {factMetrics.length} <span className="text-xs font-normal text-slate-400">Sourced Metrics</span>
          </div>
          <p className="text-[10px] text-slate-400">
            IDC • Counterpoint • RoC Filings
          </p>
        </div>
      </div>
    </aside>
  );
};

interface HeaderProps {
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
}

export const Header: React.FC<HeaderProps> = ({ mobileMenuOpen, setMobileMenuOpen }) => {
  const { 
    activeView, 
    filters, 
    setFilters, 
    sources, 
    resetToDefaults 
  } = useSystem();

  const views: { id: ActiveView; title: string; subtitle: string }[] = [
    { id: 'leadership', title: '1. Leadership View', subtitle: 'Are We Winning? — Market share, revenue, and core outcomes.' },
    { id: 'operating', title: '2. Operating View', subtitle: 'Where is Waste? — Retail vs Online channel deployment.' },
    { id: 'diagnostic', title: '3. Diagnostic View', subtitle: 'What Broke? — Market shifts & competitor impact factors.' },
    { id: 'trees', title: '4. Investment & Return Trees', subtitle: 'Structured category breakdown & disclosed metrics.' },
    { id: 'ingestion', title: '5. Data Ingestion', subtitle: 'Log new verified market facts into single source database.' },
    { id: 'master_tables', title: '6. Database Master Tables', subtitle: 'Audit log, dimensions, targets & fact store.' },
    { id: 'written_brief', title: '7. Written Brief & Bibliography', subtitle: 'Executive briefing, assumptions, and primary sources.' },
  ];

  const currentViewObj = views.find(v => v.id === activeView) || views[0];

  return (
    <div className="w-full flex flex-col shrink-0 sticky top-0 z-40 glass-header bg-slate-950/90 backdrop-blur-xl">
      <header className="min-h-[4rem] flex flex-wrap items-center justify-between px-6 sm:px-8 py-3 shrink-0 border-b border-white/10">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-slate-300 hover:text-white bg-slate-800/80 rounded-lg cursor-pointer"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div className="md:hidden flex items-center justify-center rounded-md overflow-hidden">
            <VivoLogo className="h-6 w-auto" />
          </div>
          <div>
            <h1 className="text-lg sm:text-xl font-bold text-slate-100 tracking-tight">
              {currentViewObj.title}
            </h1>
            <p className="text-xs text-slate-400 font-normal">
              {currentViewObj.subtitle}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 mt-2 sm:mt-0">
          <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium bg-indigo-500/15 text-indigo-300 border border-indigo-400/30 backdrop-blur-md">
            <ShieldCheck className="w-3.5 h-3.5 text-indigo-300" /> Sourced Facts
          </span>

          <button
            onClick={resetToDefaults}
            title="Reset dataset to verified public defaults"
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 rounded-lg border border-white/10 transition-all cursor-pointer backdrop-blur-md"
          >
            <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
            <span>Reset Data</span>
          </button>
        </div>
      </header>

      {/* Global Filter Bar: Req 18 - Interactive Filters */}
      <div className="bg-slate-950/60 backdrop-blur-md border-b border-white/10 px-6 sm:px-8 py-2 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-300">
        <div className="flex items-center gap-2 text-slate-400 font-medium">
          <SlidersHorizontal className="w-3.5 h-3.5 text-indigo-400" />
          <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-200">
            {activeView === 'trees' ? 'Standardized Display Options:' : 'Interactive Filters (Req 18):'}
          </span>
        </div>

        {activeView === 'trees' ? (
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-1.5 bg-slate-900/90 text-slate-200 border border-white/10 rounded-lg px-2.5 py-1 text-xs font-medium shadow-xs">
              <span className="text-slate-400 text-[11px]">Time:</span>
              <span className="text-indigo-300 font-bold">FY2025 (Standard Baseline)</span>
            </div>
            <div className="flex items-center gap-1.5 bg-slate-900/90 text-slate-200 border border-white/10 rounded-lg px-2.5 py-1 text-xs font-medium shadow-xs">
              <span className="text-slate-400 text-[11px]">Region:</span>
              <span className="text-indigo-300 font-bold">All India (National Scope)</span>
            </div>
          </div>
        ) : (
          <div className="flex flex-wrap items-center gap-2">
            {/* 1. Quarter Filter */}
            <div className="flex items-center gap-1">
              <span className="text-slate-400 text-[11px]">Quarter:</span>
              <select
                id="filter-quarter"
                value={filters.quarter}
                onChange={(e) => setFilters(prev => ({ ...prev, quarter: e.target.value }))}
                className="bg-slate-900/90 text-slate-200 border border-white/10 rounded-lg px-2 py-1 text-xs font-medium focus:outline-none focus:border-indigo-500 cursor-pointer"
              >
                <option value="ALL">All Periods</option>
                <option value="Q1 2026">Q1 2026 (IDC Latest)</option>
                <option value="Q1 2025">Q1 2025 (IDC Baseline)</option>
                <option value="FY2025">FY 2025 (Counterpoint)</option>
                <option value="FY23">FY23 (RoC Peak)</option>
                <option value="FY22">FY22 (RoC Financials)</option>
                <option value="FY20">FY20 (RoC Growth)</option>
              </select>
            </div>

            {/* 2. Region Filter */}
            <div className="flex items-center gap-1">
              <span className="text-slate-400 text-[11px]">Region:</span>
              <select
                id="filter-region"
                value={filters.region || 'ALL'}
                onChange={(e) => setFilters(prev => ({ ...prev, region: e.target.value }))}
                className="bg-slate-900/90 text-slate-200 border border-white/10 rounded-lg px-2 py-1 text-xs font-medium focus:outline-none focus:border-indigo-500 cursor-pointer"
              >
                <option value="ALL">All India Regions</option>
                <option value="North India">North India (Delhi/NCR/UP)</option>
                <option value="South India">South India (KA/TN/AP/TS)</option>
                <option value="West India">West India (MH/GJ)</option>
                <option value="East India">East India (WB/OD/NE)</option>
                <option value="Central India">Central India (MP/CG)</option>
              </select>
            </div>

            {(filters.quarter !== 'ALL' || filters.source_id !== 'ALL' || (filters.region && filters.region !== 'ALL')) && (
              <button
                onClick={() => setFilters({ quarter: 'ALL', region: 'ALL', department: 'ALL', sbu_id: 'ALL', source_id: 'ALL' })}
                className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold ml-1 cursor-pointer bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20"
              >
                Reset All
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};


