import React from 'react';
import { useSystem } from '../context/SystemContext';
import { BookOpen, ShieldCheck, ExternalLink, AlertTriangle, FileText, CheckCircle2, Building2 } from 'lucide-react';

export const WrittenBriefView: React.FC = () => {
  const { sources, filters, setFilters, filteredFactMetrics } = useSystem();
  const isFiltered = filters.quarter !== 'ALL' || filters.source_id !== 'ALL';

  return (
    <div className="space-y-6 pb-12 animate-fade-in w-full">
      {/* Active Filter Notification Bar */}
      {isFiltered && (
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-3.5 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-200">
          <div className="flex items-center gap-2 font-medium flex-wrap">
            <span className="bg-indigo-500/15 text-indigo-300 border border-indigo-500/30 px-2.5 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider">
              Filter Active
            </span>
            <span className="text-slate-300">
              Period: <strong className="text-indigo-300">{filters.quarter}</strong> | 
              Source: <strong className="text-indigo-300">{filters.source_id}</strong>
            </span>
            <span className="bg-slate-800 text-slate-300 px-2 py-0.5 rounded text-[11px] font-medium border border-slate-700">
              {filteredFactMetrics.length} Verified Facts Match
            </span>
          </div>
          <button
            onClick={() => setFilters({ quarter: 'ALL', sbu_id: 'ALL', source_id: 'ALL' })}
            className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 cursor-pointer"
          >
            Clear Filters
          </button>
        </div>
      )}

      {/* Written Summary Panel Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 sm:p-6 text-slate-100 shadow-sm space-y-1.5">
        <div className="flex items-center gap-2">
          <span className="bg-blue-500/10 text-blue-300 border border-blue-500/20 px-2.5 py-0.5 rounded text-[11px] font-semibold flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5" />
            Executive Brief & Sources
          </span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
          Vivo Marketing & Retail Decision System Brief
        </h2>
        <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
          Transparent brief detailing business context, decisions served, assumptions, data limits, and source bibliography.
        </p>
      </div>

      {/* 1. Business & Why */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm space-y-2.5 text-slate-100">
        <h3 className="text-base font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-2.5">
          <Building2 className="w-4 h-4 text-indigo-400" />
          1. Business Context & Selection Rationale
        </h3>
        <p className="text-xs text-slate-300 leading-relaxed">
          <strong>Business:</strong> Vivo — smartphone brand, India market (Vivo Mobile India Private Limited).
        </p>
        <p className="text-xs text-slate-300 leading-relaxed">
          Vivo operates on three operational pillars: an extensive offline retail network, an online/e-commerce channel, and brand marketing paired with performance campaigns. Its publicly available data is supported by quarterly market share releases (IDC and Counterpoint) and financial filings with the Registrar of Companies (RoC).
        </p>
      </div>

      {/* 2. Decisions Served */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm space-y-3.5 text-slate-100">
        <h3 className="text-base font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-2.5">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          2. Core Decisions Served
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="bg-slate-950/80 p-3.5 rounded-lg border border-slate-800 space-y-1.5">
            <div className="font-bold text-indigo-300 text-sm">1. Are We Winning?</div>
            <div className="text-slate-400 text-[11px]">User: <strong>Leadership (CMO, Country Head)</strong></div>
            <p className="text-slate-300 leading-relaxed text-xs">
              Evaluate whether Vivo maintains its #1 shipment share (19.6% Q1 2026) and revenue trajectory (₹29,784.90 Cr FY23) against Samsung (17.1%) and OPPO (15.3%).
            </p>
          </div>

          <div className="bg-slate-950/80 p-3.5 rounded-lg border border-slate-800 space-y-1.5">
            <div className="font-bold text-purple-300 text-sm">2. Where is the Waste?</div>
            <div className="text-slate-400 text-[11px]">User: <strong>Regional & Channel Heads</strong></div>
            <p className="text-slate-300 leading-relaxed text-xs">
              Determine if retail investments (600+ EBO stores, in-store promoter incentives) convert into market share gains proportional to outlay.
            </p>
          </div>

          <div className="bg-slate-950/80 p-3.5 rounded-lg border border-slate-800 space-y-1.5">
            <div className="font-bold text-amber-300 text-sm">3. What Broke?</div>
            <div className="text-slate-400 text-[11px]">User: <strong>Analysts & Regional Managers</strong></div>
            <p className="text-slate-300 leading-relaxed text-xs">
              Identify segment shifts and competitor momentum (OPPO +22% YoY, Motorola +14% YoY) affecting specific SBUs or price points.
            </p>
          </div>
        </div>
      </div>

      {/* 3. Group Assumptions & 4. Limitations */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        
        {/* Assumptions */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm space-y-2.5 text-slate-200">
          <h3 className="text-sm font-bold text-amber-300 flex items-center gap-2 border-b border-slate-800 pb-2.5">
            <CheckCircle2 className="w-4 h-4 text-amber-400" />
            Group Stated Assumptions
          </h3>
          <ul className="text-xs text-slate-300 space-y-2 leading-relaxed list-disc list-inside">
            <li>Quarterly targets are group-set illustrative benchmarks, since Vivo Mobile India does not publish internal target figures.</li>
            <li>SBU-level financials are inferred narratively from public reports (e.g., "X-series grew 185% YoY in 2025") as brand-wide financial statements are consolidated.</li>
          </ul>
        </div>

        {/* Limitations */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm space-y-2.5 text-slate-200">
          <h3 className="text-sm font-bold text-rose-400 flex items-center gap-2 border-b border-slate-800 pb-2.5">
            <AlertTriangle className="w-4 h-4 text-rose-400" />
            Data Granularity & Boundaries
          </h3>
          <ul className="text-xs text-slate-300 space-y-2 leading-relaxed list-disc list-inside">
            <li><strong>National/Quarterly Grain:</strong> Market tracker metrics reflect national quarterly totals. Store-level and daily data are un-disclosed.</li>
            <li><strong>Synthetic Industry Benchmarks:</strong> In-store promoter salaries, offline channel trade margins, and unpublicized campaign budgets are supplemented with synthetic industry benchmark data (explicitly labeled) to enable complete CAC & LTV calculations.</li>
            <li><strong>Filing Lag:</strong> Audited RoC financial filings reflect official annual reporting cycles.</li>
          </ul>
        </div>

      </div>

      {/* 5. Sources Used */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm space-y-3 text-slate-100">
        <h3 className="text-base font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-2.5">
          <FileText className="w-4 h-4 text-indigo-400" />
          Primary Sourced Publications Bibliography
        </h3>

        <div className="divide-y divide-slate-800 text-xs">
          {sources.map(src => (
            <div key={src.source_id} className="py-2.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="space-y-0.5">
                <div className="font-semibold text-white text-xs flex items-center gap-2">
                  <span>{src.name}</span>
                  <span className="px-1.5 py-0.5 text-[10px] font-medium rounded bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                    {src.type}
                  </span>
                </div>
                <div className="text-slate-400 text-[11px]">{src.publisher} • {src.description}</div>
              </div>
              <span className="font-mono text-[10px] text-slate-500 shrink-0">{src.source_id}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
