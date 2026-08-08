/**
 * Vivo Marketing & Retail Decision-Making System
 * Data Model Definitions (Section 8 of Specification)
 */

export type TreeType = 'investment' | 'return';
export type MetricUnit = '%' | '₹ crore' | '₹' | '₹ / user' | 'count' | 'text' | 'ratio' | 'M visits' | 'M sessions' | 'M leads' | 'M signups' | 'M queries/mo' | '% share' | 'NPS index' | '% rate' | 'M units' | '% retention' | '% score';
export type SourceType = 'tracker' | 'filing' | 'press_release' | 'estimate';

export interface DimCategory {
  category_id: string; // e.g., 'INV-100', 'RET-402'
  name: string;
  parent_id: string | null;
  tree_type: TreeType;
  sub_category?: string;
  real_world_basis?: string;
  is_disclosed: boolean;
}

export interface DimSBU {
  sbu_id: string; // e.g., 'SBU-X', 'SBU-V', 'SBU-Y', 'SBU-IQOO', 'SBU-ALL'
  name: string;
  description: string;
  ambassador?: string;
}

export interface DimSource {
  source_id: string; // e.g., 'SRC-IDC', 'SRC-COUNTERPOINT', 'SRC-ROC'
  name: string;
  type: SourceType;
  publisher: string;
  description: string;
}

export interface FactMetric {
  metric_id: string;
  quarter: string; // e.g., 'Q1 2026', 'FY23', 'Q4 2019'
  category_id: string; // FK to DimCategory
  sbu_id: string | null; // FK to DimSBU
  source_id: string; // FK to DimSource
  metric_name: string;
  value: number | string;
  unit: MetricUnit;
  entered_by: string;
  entered_at: string;
  citation_url: string;
  notes?: string;
  is_illustrative?: boolean;
}

export interface KpiTarget {
  kpi_id: string;
  period: string;
  primary_outcome: string; // 'Market share', 'Revenue growth', 'Offline channel effectiveness'
  current_value: number | string;
  target_value: number | string;
  ideal_value: number | string;
  best_so_far: number | string;
  set_by: string; // e.g., 'Country Head Decision (Group Assumption)'
  rationale: string;
}

export interface ActivityLog {
  log_id: string;
  table_affected: string;
  record_id: string;
  action: 'INSERT' | 'UPDATE' | 'DELETE';
  user: string;
  timestamp: string;
  details: string;
}

export type ActiveView = 
  | 'leadership'
  | 'operating'
  | 'diagnostic'
  | 'trees'
  | 'ingestion'
  | 'master_tables'
  | 'written_brief';

export interface SystemFilter {
  quarter: string;
  region?: string;
  department?: string;
  sbu_id?: string;
  source_id: string;
  month?: string;
}
