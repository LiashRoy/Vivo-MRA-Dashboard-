import React from 'react';
import { useSystem } from '../context/SystemContext';
import { 
  X, 
  ExternalLink, 
  CheckCircle2, 
  FileText, 
  User, 
  Clock, 
  Building2, 
  Tag, 
  ShieldCheck,
  AlertTriangle
} from 'lucide-react';

export const CitationModal: React.FC = () => {
  const { selectedMetricForCitation, closeCitationModal, sources, categories, sbus } = useSystem();

  if (!selectedMetricForCitation) return null;

  const metric = selectedMetricForCitation;
  const source = sources.find(s => s.source_id === metric.source_id);
  const category = categories.find(c => c.category_id === metric.category_id);
  const sbu = sbus.find(s => s.sbu_id === metric.sbu_id);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs animate-fade-in">
      <div 
        className="bg-slate-900 text-slate-100 border border-slate-800 rounded-xl shadow-2xl max-w-lg w-full overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-slate-950 px-5 py-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 bg-indigo-500/10 text-indigo-400 rounded-lg border border-indigo-500/20">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">Source & Provenance Verification</h3>
              <p className="text-[11px] text-slate-400 font-medium">Verified Public Data Reference</p>
            </div>
          </div>
          <button 
            onClick={closeCitationModal}
            className="p-1 text-slate-400 hover:text-white rounded-md hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-4 text-xs">
          {/* Metric Highlight */}
          <div className="bg-slate-950/80 border border-slate-800 rounded-lg p-3.5">
            <div className="text-[10px] text-indigo-400 font-bold uppercase tracking-wider mb-1">
              {metric.quarter} • Metric Value
            </div>
            <div className="flex items-baseline justify-between">
              <span className="text-sm font-bold text-white">{metric.metric_name}</span>
              <span className="text-xl font-extrabold text-indigo-300 ml-2">
                {metric.value} <span className="text-xs font-normal text-slate-400">{metric.unit}</span>
              </span>
            </div>
            {metric.notes && (
              <p className="text-xs text-slate-300 mt-2 bg-slate-900 p-2.5 rounded border border-slate-800">
                "{metric.notes}"
              </p>
            )}
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-2 gap-2.5 text-xs">
            <div className="bg-slate-950/60 p-2.5 rounded-lg border border-slate-800">
              <div className="text-slate-400 font-medium flex items-center gap-1.5 mb-0.5 text-[11px]">
                <Tag className="w-3.5 h-3.5 text-indigo-400" />
                <span>Category ID</span>
              </div>
              <div className="font-semibold text-slate-200">
                {category ? `${category.category_id}: ${category.name}` : metric.category_id}
              </div>
            </div>

            <div className="bg-slate-950/60 p-2.5 rounded-lg border border-slate-800">
              <div className="text-slate-400 font-medium flex items-center gap-1.5 mb-0.5 text-[11px]">
                <Building2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Strategic Business Unit</span>
              </div>
              <div className="font-semibold text-slate-200">
                {sbu ? `${sbu.name}` : 'Brand-Wide (Vivo India)'}
              </div>
            </div>

            <div className="bg-slate-950/60 p-2.5 rounded-lg border border-slate-800">
              <div className="text-slate-400 font-medium flex items-center gap-1.5 mb-0.5 text-[11px]">
                <User className="w-3.5 h-3.5 text-amber-400" />
                <span>Sourced By</span>
              </div>
              <div className="font-semibold text-slate-200">{metric.entered_by}</div>
            </div>

            <div className="bg-slate-950/60 p-2.5 rounded-lg border border-slate-800">
              <div className="text-slate-400 font-medium flex items-center gap-1.5 mb-0.5 text-[11px]">
                <Clock className="w-3.5 h-3.5 text-cyan-400" />
                <span>Ingestion Timestamp</span>
              </div>
              <div className="font-semibold text-slate-200">{metric.entered_at}</div>
            </div>
          </div>

          {/* Source Document Details */}
          <div className="bg-slate-950/60 p-3.5 rounded-lg border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-indigo-400" />
                Primary Source Publication
              </span>
              <span className="px-1.5 py-0.5 text-[10px] font-bold rounded bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 uppercase">
                {source?.type || 'Tracker'}
              </span>
            </div>

            <div className="font-bold text-white text-xs">
              {source ? source.name : 'Public Domain Market Release'}
            </div>

            {source?.publisher && (
              <p className="text-[11px] text-slate-400">
                Publisher: <strong className="text-slate-200">{source.publisher}</strong>
              </p>
            )}

            {source?.description && (
              <p className="text-[11px] text-slate-400 leading-relaxed pt-0.5">
                {source.description}
              </p>
            )}

            {/* Direct Citation Link */}
            <div className="pt-1.5">
              <a 
                href={metric.citation_url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-md text-xs font-semibold bg-indigo-600 hover:bg-indigo-700 text-white transition-colors w-full justify-center shadow-xs cursor-pointer"
              >
                <span>Open Sourced Citation Link</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Audit Verification Badge */}
          <div className="flex items-center justify-between text-[11px] text-slate-400 bg-slate-950/40 p-2.5 rounded-lg border border-slate-800">
            {source?.source_id === 'SRC-SYNTHETIC-BENCHMARK-2026' || (metric.notes && metric.notes.includes('Synthetic Added Data')) ? (
              <div className="flex items-center gap-1.5 text-amber-300 font-semibold">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                <span>Synthetic Added Data (Industry Benchmark Model)</span>
              </div>
            ) : (
              <div className="flex items-center gap-1.5 text-emerald-400 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Verified Fact Metric</span>
              </div>
            )}
            <span className="text-slate-500 font-mono text-[10px]">Audit ID: {metric.metric_id}</span>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-slate-950 px-5 py-3 border-t border-slate-800 flex justify-end">
          <button
            onClick={closeCitationModal}
            className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-md transition-colors cursor-pointer"
          >
            Close Provenance View
          </button>
        </div>
      </div>
    </div>
  );
};
