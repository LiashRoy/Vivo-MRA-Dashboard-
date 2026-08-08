import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  DimCategory, 
  DimSBU, 
  DimSource, 
  FactMetric, 
  KpiTarget, 
  ActivityLog, 
  ActiveView, 
  SystemFilter 
} from '../types';
import { 
  INITIAL_CATEGORIES, 
  INITIAL_SBUS, 
  INITIAL_SOURCES, 
  INITIAL_FACT_METRICS, 
  INITIAL_KPI_TARGETS, 
  INITIAL_ACTIVITY_LOGS 
} from '../data/initialData';

interface SystemContextType {
  categories: DimCategory[];
  sbus: DimSBU[];
  sources: DimSource[];
  factMetrics: FactMetric[];
  filteredFactMetrics: FactMetric[];
  kpiTargets: KpiTarget[];
  activityLogs: ActivityLog[];
  activeView: ActiveView;
  setActiveView: (view: ActiveView) => void;
  filters: SystemFilter;
  setFilters: React.Dispatch<React.SetStateAction<SystemFilter>>;
  selectedMetricForCitation: FactMetric | null;
  openCitationModal: (metric: FactMetric) => void;
  closeCitationModal: () => void;
  addFactMetric: (metric: Omit<FactMetric, 'metric_id' | 'entered_at'>) => { success: boolean; error?: string };
  updateKpiTarget: (kpiId: string, newTarget: number | string, newRationale?: string) => void;
  resetToDefaults: () => void;
}

const SystemContext = createContext<SystemContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = 'VIVO_DECISION_SYSTEM_DATA_V2';

export const SystemProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [categories] = useState<DimCategory[]>(INITIAL_CATEGORIES);
  const [sbus] = useState<DimSBU[]>(INITIAL_SBUS);
  const [sources] = useState<DimSource[]>(INITIAL_SOURCES);
  const [activeView, setActiveView] = useState<ActiveView>('leadership');
  
  const [filters, setFilters] = useState<SystemFilter>({
    quarter: 'ALL',
    region: 'ALL',
    sbu_id: 'ALL',
    source_id: 'ALL',
  });

  const [selectedMetricForCitation, setSelectedMetricForCitation] = useState<FactMetric | null>(null);

  // Load persistent state or fall back to defaults
  const [factMetrics, setFactMetrics] = useState<FactMetric[]>(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_facts`);
    if (saved) {
      try {
        const parsed: FactMetric[] = JSON.parse(saved);
        const existingIds = new Set(parsed.map(m => m.metric_id));
        const missingFromInitial = INITIAL_FACT_METRICS.filter(m => !existingIds.has(m.metric_id));
        return [...parsed, ...missingFromInitial];
      } catch (e) {
        console.error('Failed to parse saved facts', e);
      }
    }
    // Also clean up old V1 keys if present
    localStorage.removeItem('VIVO_DECISION_SYSTEM_DATA_V1_facts');
    localStorage.removeItem('VIVO_DECISION_SYSTEM_DATA_V1_targets');
    localStorage.removeItem('VIVO_DECISION_SYSTEM_DATA_V1_logs');
    return INITIAL_FACT_METRICS;
  });

  const [kpiTargets, setKpiTargets] = useState<KpiTarget[]>(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_targets`);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse saved targets', e);
      }
    }
    return INITIAL_KPI_TARGETS;
  });

  const [activityLogs, setActivityLogs] = useState<ActivityLog[]>(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_logs`);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse saved logs', e);
      }
    }
    return INITIAL_ACTIVITY_LOGS;
  });

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem(`${LOCAL_STORAGE_KEY}_facts`, JSON.stringify(factMetrics));
  }, [factMetrics]);

  useEffect(() => {
    localStorage.setItem(`${LOCAL_STORAGE_KEY}_targets`, JSON.stringify(kpiTargets));
  }, [kpiTargets]);

  useEffect(() => {
    localStorage.setItem(`${LOCAL_STORAGE_KEY}_logs`, JSON.stringify(activityLogs));
  }, [activityLogs]);

  const openCitationModal = (metric: FactMetric) => {
    setSelectedMetricForCitation(metric);
  };

  const closeCitationModal = () => {
    setSelectedMetricForCitation(null);
  };

  const addFactMetric = (newMetric: Omit<FactMetric, 'metric_id' | 'entered_at'>): { success: boolean; error?: string } => {
    // Validation rules (Section 7.1)
    if (!newMetric.quarter || newMetric.quarter.trim() === '') {
      return { success: false, error: 'Report date / quarter is mandatory.' };
    }
    if (!newMetric.source_id) {
      return { success: false, error: 'Source selection is mandatory.' };
    }
    if (!newMetric.category_id) {
      return { success: false, error: 'Category ID is mandatory.' };
    }
    if (typeof newMetric.value === 'number' && newMetric.value < 0) {
      return { success: false, error: 'Metric value must be ≥ 0.' };
    }
    if (!newMetric.citation_url || newMetric.citation_url.trim() === '') {
      return { success: false, error: 'Source URL / Citation reference is mandatory.' };
    }

    const metric_id = `FACT-${Date.now().toString().slice(-4)}`;
    const entered_at = new Date().toISOString().split('T')[0];

    const fullMetric: FactMetric = {
      ...newMetric,
      metric_id,
      entered_at,
    };

    setFactMetrics(prev => [fullMetric, ...prev]);

    // Append log
    const newLog: ActivityLog = {
      log_id: `LOG-${Date.now().toString().slice(-4)}`,
      table_affected: 'fact_metric',
      record_id: metric_id,
      action: 'INSERT',
      user: newMetric.entered_by || 'Data Entry User',
      timestamp: `${entered_at} ${new Date().toTimeString().slice(0, 8)}`,
      details: `Ingested ${newMetric.metric_name} (${newMetric.value} ${newMetric.unit}) for ${newMetric.quarter}.`
    };

    setActivityLogs(prev => [newLog, ...prev]);

    return { success: true };
  };

  const updateKpiTarget = (kpiId: string, newTarget: number | string, newRationale?: string) => {
    setKpiTargets(prev => prev.map(t => {
      if (t.kpi_id === kpiId) {
        return {
          ...t,
          target_value: newTarget,
          rationale: newRationale || t.rationale
        };
      }
      return t;
    }));

    const newLog: ActivityLog = {
      log_id: `LOG-${Date.now().toString().slice(-4)}`,
      table_affected: 'kpi_target',
      record_id: kpiId,
      action: 'UPDATE',
      user: 'Country Head (Group Stated Assumption)',
      timestamp: `${new Date().toISOString().split('T')[0]} ${new Date().toTimeString().slice(0, 8)}`,
      details: `Updated target for ${kpiId} to ${newTarget}.`
    };

    setActivityLogs(prev => [newLog, ...prev]);
  };

  const resetToDefaults = () => {
    setFactMetrics(INITIAL_FACT_METRICS);
    setKpiTargets(INITIAL_KPI_TARGETS);
    setActivityLogs(INITIAL_ACTIVITY_LOGS);
    localStorage.removeItem(`${LOCAL_STORAGE_KEY}_facts`);
    localStorage.removeItem(`${LOCAL_STORAGE_KEY}_targets`);
    localStorage.removeItem(`${LOCAL_STORAGE_KEY}_logs`);
  };

  // Compute filtered facts based on global filters
  const filteredFactMetrics = React.useMemo(() => {
    return factMetrics.filter(f => {
      // 1. Quarter / Period
      if (filters.quarter !== 'ALL') {
        const q = filters.quarter.toLowerCase();
        const fq = f.quarter.toLowerCase();
        if (fq !== q) {
          if (q === 'fy23' && fq !== 'fy23' && fq !== 'fy2023') return false;
          if (q === 'fy22' && fq !== 'fy22' && fq !== 'fy2022') return false;
          if (q === 'fy20' && fq !== 'fy20' && fq !== 'fy2020') return false;
          if (q === 'fy19' && fq !== 'fy19' && fq !== 'fy2019') return false;
          if (q === 'fy2025' && fq !== 'fy2025' && fq !== 'fy25') return false;
          if (!fq.includes(q) && !q.includes(fq)) return false;
        }
      }

      // 2. Source Filter
      if (filters.source_id !== 'ALL') {
        if (f.source_id !== filters.source_id) return false;
      }

      return true;
    });
  }, [factMetrics, filters]);

  const contextValue = React.useMemo(() => ({
    categories,
    sbus,
    sources,
    factMetrics,
    filteredFactMetrics,
    kpiTargets,
    activityLogs,
    activeView,
    setActiveView,
    filters,
    setFilters,
    selectedMetricForCitation,
    openCitationModal,
    closeCitationModal,
    addFactMetric,
    updateKpiTarget,
    resetToDefaults
  }), [
    categories,
    sbus,
    sources,
    factMetrics,
    filteredFactMetrics,
    kpiTargets,
    activityLogs,
    activeView,
    filters,
    selectedMetricForCitation
  ]);

  return (
    <SystemContext.Provider value={contextValue}>
      {children}
    </SystemContext.Provider>
  );
};

export const useSystem = () => {
  const context = useContext(SystemContext);
  if (!context) {
    throw new Error('useSystem must be used within a SystemProvider');
  }
  return context;
};
