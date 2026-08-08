import React, { useState } from 'react';
import { useSystem } from '../context/SystemContext';
import { MetricUnit } from '../types';
import { 
  FilePlus2, 
  ShieldCheck, 
  AlertCircle, 
  CheckCircle2, 
  Send, 
  ExternalLink, 
  Calendar, 
  Database, 
  User, 
  Building2, 
  Tag 
} from 'lucide-react';

export const DataIngestionView: React.FC = () => {
  const { categories, sbus, sources, addFactMetric, setActiveView } = useSystem();

  const [quarter, setQuarter] = useState<string>('Q2 2026');
  const [sourceId, setSourceId] = useState<string>(sources[0]?.source_id || '');
  const [categoryId, setCategoryId] = useState<string>('RET-402');
  const [sbuId, setSbuId] = useState<string>('SBU-ALL');
  const [metricName, setMetricName] = useState<string>('Q2 2026 Smartphone Shipment Share');
  const [metricValue, setMetricValue] = useState<string>('19.8');
  const [unit, setUnit] = useState<MetricUnit>('%');
  const [citationUrl, setCitationUrl] = useState<string>('https://www.idc.com/getdoc.jsp?containerId=prIN525126');
  const [enteredBy, setEnteredBy] = useState<string>('Market Intelligence Officer');
  const [notes, setNotes] = useState<string>('Logged new quarterly market share report.');

  const [alert, setAlert] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAlert(null);

    const valNum = parseFloat(metricValue);

    const result = addFactMetric({
      quarter,
      category_id: categoryId,
      sbu_id: sbuId === 'NONE' ? null : sbuId,
      source_id: sourceId,
      metric_name: metricName,
      value: isNaN(valNum) ? metricValue : valNum,
      unit,
      entered_by: enteredBy,
      citation_url: citationUrl,
      notes,
    });

    if (result.success) {
      setAlert({
        type: 'success',
        message: `Metric "${metricName}" (${metricValue} ${unit}) for ${quarter} logged successfully into fact_metric!`
      });
    } else {
      setAlert({
        type: 'error',
        message: result.error || 'Failed to ingest data.'
      });
    }
  };

  return (
    <div className="space-y-6 pb-12 animate-fade-in w-full">
      {/* Ingestion Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 sm:p-6 text-slate-100 shadow-sm">
        <div className="flex items-center gap-2 mb-1.5">
          <span className="bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 px-2.5 py-0.5 rounded text-[11px] font-semibold flex items-center gap-1.5">
            <FilePlus2 className="w-3.5 h-3.5" />
            Data Ingestion Portal
          </span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
          Log Market Report Metric
        </h2>
        <p className="text-slate-300 text-xs sm:text-sm mt-1 leading-relaxed">
          Log verified report metrics (IDC, Counterpoint, RoC Filings) directly into the single source of truth (`fact_metric`).
        </p>
      </div>

      {/* Alert Banner */}
      {alert && (
        <div className={`p-3.5 rounded-lg border flex items-start justify-between gap-3 text-xs font-medium ${
          alert.type === 'success' 
            ? 'bg-emerald-950/40 text-emerald-200 border-emerald-800/60' 
            : 'bg-rose-950/40 text-rose-200 border-rose-800/60'
        }`}>
          <div className="flex items-center gap-2">
            {alert.type === 'success' ? <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" /> : <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />}
            <span>{alert.message}</span>
          </div>
          {alert.type === 'success' && (
            <button
              onClick={() => setActiveView('master_tables')}
              className="underline text-emerald-400 hover:text-emerald-300 shrink-0 font-semibold cursor-pointer"
            >
              View in Database
            </button>
          )}
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm space-y-5 text-slate-100">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          
          {/* Report Date / Quarter */}
          <div className="space-y-1">
            <label className="font-semibold text-slate-200 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-indigo-400" />
              Report Date / Quarter <span className="text-rose-400">*</span>
            </label>
            <input
              type="text"
              value={quarter}
              onChange={(e) => setQuarter(e.target.value)}
              placeholder="e.g. Q2 2026 or FY24"
              required
              className="w-full bg-slate-950 text-slate-200 border border-slate-700 rounded-md p-2 focus:outline-none focus:border-indigo-500 font-medium"
            />
          </div>

          {/* Primary Source Dropdown */}
          <div className="space-y-1">
            <label className="font-semibold text-slate-200 flex items-center gap-1.5">
              <Database className="w-3.5 h-3.5 text-purple-400" />
              Publication Source <span className="text-rose-400">*</span>
            </label>
            <select
              value={sourceId}
              onChange={(e) => setSourceId(e.target.value)}
              required
              className="w-full bg-slate-950 text-slate-200 border border-slate-700 rounded-md p-2 focus:outline-none focus:border-indigo-500 font-medium"
            >
              {sources.map(src => (
                <option key={src.source_id} value={src.source_id}>
                  {src.publisher} — {src.name} ({src.type})
                </option>
              ))}
            </select>
          </div>

          {/* Category ID Dropdown */}
          <div className="space-y-1">
            <label className="font-semibold text-slate-200 flex items-center gap-1.5">
              <Tag className="w-3.5 h-3.5 text-amber-400" />
              Leaf Category ID <span className="text-rose-400">*</span>
            </label>
            <select
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              required
              className="w-full bg-slate-950 text-slate-200 border border-slate-700 rounded-md p-2 focus:outline-none focus:border-indigo-500 font-medium"
            >
              {categories.map(cat => (
                <option key={cat.category_id} value={cat.category_id}>
                  {cat.category_id}: {cat.name} ({cat.tree_type.toUpperCase()})
                </option>
              ))}
            </select>
          </div>

          {/* Strategic Business Unit Dropdown */}
          <div className="space-y-1">
            <label className="font-semibold text-slate-200 flex items-center gap-1.5">
              <Building2 className="w-3.5 h-3.5 text-emerald-400" />
              SBU / Series (Optional)
            </label>
            <select
              value={sbuId}
              onChange={(e) => setSbuId(e.target.value)}
              className="w-full bg-slate-950 text-slate-200 border border-slate-700 rounded-md p-2 focus:outline-none focus:border-indigo-500 font-medium"
            >
              <option value="NONE">Brand-Wide (No specific SBU)</option>
              {sbus.map(s => (
                <option key={s.sbu_id} value={s.sbu_id}>
                  {s.sbu_id}: {s.name}
                </option>
              ))}
            </select>
          </div>

          {/* Metric Name */}
          <div className="space-y-1 sm:col-span-2">
            <label className="font-semibold text-slate-200">
              Metric Description / Name <span className="text-rose-400">*</span>
            </label>
            <input
              type="text"
              value={metricName}
              onChange={(e) => setMetricName(e.target.value)}
              placeholder="e.g. Vivo National Smartphone Shipment Share"
              required
              className="w-full bg-slate-950 text-slate-200 border border-slate-700 rounded-md p-2 focus:outline-none focus:border-indigo-500 font-medium"
            />
          </div>

          {/* Metric Value & Unit */}
          <div className="space-y-1">
            <label className="font-semibold text-slate-200">
              Metric Value <span className="text-rose-400">*</span>
            </label>
            <input
              type="text"
              value={metricValue}
              onChange={(e) => setMetricValue(e.target.value)}
              placeholder="e.g. 19.8"
              required
              className="w-full bg-slate-950 text-indigo-300 border border-slate-700 rounded-md p-2 focus:outline-none focus:border-indigo-500 font-bold"
            />
          </div>

          <div className="space-y-1">
            <label className="font-semibold text-slate-200">
              Unit <span className="text-rose-400">*</span>
            </label>
            <select
              value={unit}
              onChange={(e) => setUnit(e.target.value as MetricUnit)}
              required
              className="w-full bg-slate-950 text-slate-200 border border-slate-700 rounded-md p-2 focus:outline-none focus:border-indigo-500 font-medium"
            >
              <option value="%">% (Percentage)</option>
              <option value="₹ crore">₹ crore (INR Currency)</option>
              <option value="count">count (Quantity)</option>
              <option value="text">text (Qualitative Descriptor)</option>
            </select>
          </div>

          {/* Citation URL */}
          <div className="space-y-1 sm:col-span-2">
            <label className="font-semibold text-slate-200 flex items-center gap-1.5">
              <ExternalLink className="w-3.5 h-3.5 text-indigo-400" />
              Source URL / Citation Reference <span className="text-rose-400">*</span>
            </label>
            <input
              type="url"
              value={citationUrl}
              onChange={(e) => setCitationUrl(e.target.value)}
              placeholder="https://..."
              required
              className="w-full bg-slate-950 text-slate-200 border border-slate-700 rounded-md p-2 focus:outline-none focus:border-indigo-500 font-mono text-xs"
            />
          </div>

          {/* Entered By */}
          <div className="space-y-1 sm:col-span-2">
            <label className="font-semibold text-slate-200 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-slate-400" />
              Entered By (Audit User) <span className="text-rose-400">*</span>
            </label>
            <input
              type="text"
              value={enteredBy}
              onChange={(e) => setEnteredBy(e.target.value)}
              required
              className="w-full bg-slate-950 text-slate-200 border border-slate-700 rounded-md p-2 focus:outline-none focus:border-indigo-500 font-medium"
            />
          </div>

          {/* Context Notes */}
          <div className="space-y-1 sm:col-span-2">
            <label className="font-semibold text-slate-200">Notes / Audit Context</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={2}
              className="w-full bg-slate-950 text-slate-200 border border-slate-700 rounded-md p-2 focus:outline-none focus:border-indigo-500 text-xs"
            />
          </div>

        </div>

        <div className="pt-2 flex justify-end">
          <button
            type="submit"
            className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-lg shadow-xs transition-colors cursor-pointer"
          >
            <Send className="w-4 h-4" />
            <span>Ingest Fact Metric into Database</span>
          </button>
        </div>
      </form>
    </div>
  );
};
