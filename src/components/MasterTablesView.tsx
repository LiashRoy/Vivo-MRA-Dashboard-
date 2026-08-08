import React, { useState, useEffect } from 'react';
import { useSystem } from '../context/SystemContext';
import { Database, Search, ExternalLink, ShieldCheck, History, List, Layers, Tag, User } from 'lucide-react';

export const MasterTablesView: React.FC = () => {
  const { categories, sbus, sources, factMetrics, filteredFactMetrics, kpiTargets, activityLogs, openCitationModal, filters, setFilters } = useSystem();

  const [activeDbTab, setActiveDbTab] = useState<'fact_metric' | 'dim_category' | 'dim_sbu' | 'dim_source' | 'kpi_target' | 'activity_log'>('fact_metric');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [useGlobalFilterOnly, setUseGlobalFilterOnly] = useState<boolean>(false);

  // Reset scroll container position when switching database tabs
  useEffect(() => {
    const scrollContainer = document.querySelector('.overflow-y-auto');
    if (scrollContainer) {
      scrollContainer.scrollTop = 0;
    }
  }, [activeDbTab]);

  const isFiltered = filters.quarter !== 'ALL' || filters.source_id !== 'ALL';
  const displayedFacts = (isFiltered || useGlobalFilterOnly) ? filteredFactMetrics : factMetrics;

  return (
    <div className="space-y-6 pb-12 animate-fade-in">
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

      {/* Database Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 sm:p-6 text-slate-100 shadow-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="bg-blue-500/10 text-blue-300 border border-blue-500/20 px-2.5 py-0.5 rounded text-[11px] font-semibold flex items-center gap-1.5">
                <Database className="w-3.5 h-3.5" />
                Database & Master Tables
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Single Source of Truth (`fact_metric`)
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              Relational tables storing all verified market facts, dimensions, KPI targets, and audit trail logs.
            </p>
          </div>

          <div className="text-xs text-slate-400 bg-slate-950 p-2.5 rounded-lg border border-slate-800 shrink-0">
            <strong>fact_metric</strong> unifies all verified investment & return data
          </div>
        </div>
      </div>

      {/* Database Navigation Tabs */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-1.5 flex flex-wrap gap-1.5 text-xs shadow-sm text-slate-100">
        <button
          onClick={() => setActiveDbTab('fact_metric')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-semibold transition-all cursor-pointer ${
            activeDbTab === 'fact_metric'
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <Database className="w-3.5 h-3.5" />
          <span>fact_metric ({factMetrics.length})</span>
        </button>

        <button
          onClick={() => setActiveDbTab('dim_category')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-semibold transition-all cursor-pointer ${
            activeDbTab === 'dim_category'
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <Tag className="w-3.5 h-3.5" />
          <span>dim_category ({categories.length})</span>
        </button>

        <button
          onClick={() => setActiveDbTab('dim_sbu')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-semibold transition-all cursor-pointer ${
            activeDbTab === 'dim_sbu'
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>dim_sbu ({sbus.length})</span>
        </button>

        <button
          onClick={() => setActiveDbTab('dim_source')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-semibold transition-all cursor-pointer ${
            activeDbTab === 'dim_source'
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <List className="w-3.5 h-3.5" />
          <span>dim_source ({sources.length})</span>
        </button>

        <button
          onClick={() => setActiveDbTab('kpi_target')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-semibold transition-all cursor-pointer ${
            activeDbTab === 'kpi_target'
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>kpi_target ({kpiTargets.length})</span>
        </button>

        <button
          onClick={() => setActiveDbTab('activity_log')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-semibold transition-all cursor-pointer ${
            activeDbTab === 'activity_log'
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <History className="w-3.5 h-3.5" />
          <span>activity_log ({activityLogs.length})</span>
        </button>
      </div>

      {/* Search Input */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-3 flex items-center justify-between gap-4 shadow-sm text-slate-100">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder={`Search ${activeDbTab} records...`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-slate-950 text-white border border-slate-700 rounded-xl pl-9 pr-3 py-1.5 text-xs w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>

      {/* Table Content */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-sm text-slate-100">
        <div className="overflow-x-auto">
          
          {/* TAB 1: FACT_METRIC */}
          {activeDbTab === 'fact_metric' && (
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-950 text-slate-300 font-bold uppercase tracking-wider text-[11px] border-b border-slate-800">
                <tr>
                  <th className="p-3.5">Metric ID</th>
                  <th className="p-3.5">Period</th>
                  <th className="p-3.5">Metric Name</th>
                  <th className="p-3.5">Value & Unit</th>
                  <th className="p-3.5">Category</th>
                  <th className="p-3.5">SBU</th>
                  <th className="p-3.5">Source</th>
                  <th className="p-3.5">Entered At</th>
                  <th className="p-3.5 text-right">Provenance</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {displayedFacts
                  .filter(f => !searchTerm || f.metric_name.toLowerCase().includes(searchTerm.toLowerCase()) || f.quarter.toLowerCase().includes(searchTerm.toLowerCase()) || f.metric_id.toLowerCase().includes(searchTerm.toLowerCase()))
                  .map(f => (
                    <tr key={f.metric_id} className="hover:bg-slate-800/60 transition-colors">
                      <td className="p-3.5 font-mono text-indigo-400 font-bold">{f.metric_id}</td>
                      <td className="p-3.5 font-semibold text-white">{f.quarter}</td>
                      <td className="p-3.5 font-medium text-slate-200">{f.metric_name}</td>
                      <td className="p-3.5 font-extrabold text-emerald-400">{f.value} {f.unit}</td>
                      <td className="p-3.5 font-mono text-amber-400 font-bold">{f.category_id}</td>
                      <td className="p-3.5 text-slate-400">{f.sbu_id || 'Brand-Wide'}</td>
                      <td className="p-3.5 text-slate-400">{f.source_id}</td>
                      <td className="p-3.5 text-slate-500">{f.entered_at}</td>
                      <td className="p-3.5 text-right">
                        <button
                          onClick={() => openCitationModal(f)}
                          className="px-2.5 py-1 bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-300 rounded-lg font-bold border border-indigo-500/20 transition-colors inline-flex items-center gap-1 cursor-pointer"
                        >
                          <span>Citation</span>
                          <ExternalLink className="w-3 h-3 text-indigo-400" />
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          )}

          {/* TAB 2: DIM_CATEGORY */}
          {activeDbTab === 'dim_category' && (
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-950 text-slate-300 font-bold uppercase tracking-wider text-[11px] border-b border-slate-800">
                <tr>
                  <th className="p-3.5">Category ID</th>
                  <th className="p-3.5">Name</th>
                  <th className="p-3.5">Tree Type</th>
                  <th className="p-3.5">Parent ID</th>
                  <th className="p-3.5">Sub-Category</th>
                  <th className="p-3.5">Real World Basis</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {categories
                  .filter(c => !searchTerm || c.name.toLowerCase().includes(searchTerm.toLowerCase()) || c.category_id.toLowerCase().includes(searchTerm.toLowerCase()))
                  .map(c => (
                    <tr key={c.category_id} className="hover:bg-slate-800/60 transition-colors">
                      <td className="p-3.5 font-mono text-amber-400 font-bold">{c.category_id}</td>
                      <td className="p-3.5 font-bold text-white">{c.name}</td>
                      <td className="p-3.5 uppercase font-mono text-indigo-400 font-bold">{c.tree_type}</td>
                      <td className="p-3.5 text-slate-500">{c.parent_id || '— (Root)'}</td>
                      <td className="p-3.5 text-slate-500">{c.sub_category || '—'}</td>
                      <td className="p-3.5 text-slate-400 italic">{c.real_world_basis || 'Standard'}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          )}

          {/* TAB 3: DIM_SBU */}
          {activeDbTab === 'dim_sbu' && (
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-950 text-slate-300 font-bold uppercase tracking-wider text-[11px] border-b border-slate-800">
                <tr>
                  <th className="p-3.5">SBU ID</th>
                  <th className="p-3.5">Name</th>
                  <th className="p-3.5">Description</th>
                  <th className="p-3.5">Assigned Ambassador</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {sbus.map(s => (
                  <tr key={s.sbu_id} className="hover:bg-slate-800/60 transition-colors">
                    <td className="p-3.5 font-mono text-emerald-400 font-bold">{s.sbu_id}</td>
                    <td className="p-3.5 font-bold text-white">{s.name}</td>
                    <td className="p-3.5 text-slate-400">{s.description}</td>
                    <td className="p-3.5 text-amber-300 font-semibold">{s.ambassador || '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {/* TAB 4: DIM_SOURCE */}
          {activeDbTab === 'dim_source' && (
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-950 text-slate-300 font-bold uppercase tracking-wider text-[11px] border-b border-slate-800">
                <tr>
                  <th className="p-3.5">Source ID</th>
                  <th className="p-3.5">Name</th>
                  <th className="p-3.5">Type</th>
                  <th className="p-3.5">Publisher</th>
                  <th className="p-3.5">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {sources.map(src => (
                  <tr key={src.source_id} className="hover:bg-slate-800/60 transition-colors">
                    <td className="p-3.5 font-mono text-purple-400 font-bold">{src.source_id}</td>
                    <td className="p-3.5 font-bold text-white">{src.name}</td>
                    <td className="p-3.5 uppercase font-mono text-indigo-400 font-bold">{src.type}</td>
                    <td className="p-3.5 font-semibold text-slate-200">{src.publisher}</td>
                    <td className="p-3.5 text-slate-400">{src.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {/* TAB 5: KPI_TARGET */}
          {activeDbTab === 'kpi_target' && (
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-950 text-slate-300 font-bold uppercase tracking-wider text-[11px] border-b border-slate-800">
                <tr>
                  <th className="p-3.5">KPI ID</th>
                  <th className="p-3.5">Period</th>
                  <th className="p-3.5">Primary Outcome</th>
                  <th className="p-3.5">Current</th>
                  <th className="p-3.5">Group Target</th>
                  <th className="p-3.5">Best So Far</th>
                  <th className="p-3.5">Assumed By</th>
                  <th className="p-3.5">Rationale</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {kpiTargets.map(k => (
                  <tr key={k.kpi_id} className="hover:bg-slate-800/60 transition-colors">
                    <td className="p-3.5 font-mono text-amber-400 font-bold">{k.kpi_id}</td>
                    <td className="p-3.5 font-semibold text-white">{k.period}</td>
                    <td className="p-3.5 font-bold text-white">{k.primary_outcome}</td>
                    <td className="p-3.5 font-bold text-slate-300">{k.current_value}</td>
                    <td className="p-3.5 font-extrabold text-amber-300">{k.target_value}</td>
                    <td className="p-3.5 text-emerald-400 font-bold">{k.best_so_far}</td>
                    <td className="p-3.5 text-slate-400">{k.set_by}</td>
                    <td className="p-3.5 text-slate-400 italic">"{k.rationale}"</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {/* TAB 6: ACTIVITY_LOG */}
          {activeDbTab === 'activity_log' && (
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-950 text-slate-300 font-bold uppercase tracking-wider text-[11px] border-b border-slate-800">
                <tr>
                  <th className="p-3.5">Log ID</th>
                  <th className="p-3.5">Action</th>
                  <th className="p-3.5">Table</th>
                  <th className="p-3.5">Record ID</th>
                  <th className="p-3.5">User</th>
                  <th className="p-3.5">Timestamp</th>
                  <th className="p-3.5">Audit Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {activityLogs.map(l => (
                  <tr key={l.log_id} className="hover:bg-slate-800/60 transition-colors">
                    <td className="p-3.5 font-mono text-slate-500">{l.log_id}</td>
                    <td className="p-3.5 font-bold uppercase text-emerald-400">{l.action}</td>
                    <td className="p-3.5 font-mono text-indigo-400 font-bold">{l.table_affected}</td>
                    <td className="p-3.5 font-mono text-amber-400 font-bold">{l.record_id}</td>
                    <td className="p-3.5 font-semibold text-slate-200">{l.user}</td>
                    <td className="p-3.5 text-slate-500">{l.timestamp}</td>
                    <td className="p-3.5 text-slate-300">{l.details}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

        </div>
      </div>
    </div>
  );
};
