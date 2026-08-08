import React from 'react';
import { useSystem } from '../context/SystemContext';
import { 
  Trophy, 
  TrendingUp, 
  Users, 
  Repeat, 
  DollarSign, 
  CheckCircle2, 
  AlertCircle, 
  Sparkles, 
  ShieldCheck, 
  Target,
  Store,
  UserCheck,
  ArrowRight,
  Database,
  BarChart3
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid, 
  Legend 
} from 'recharts';

export const LeadershipView: React.FC = () => {
  const { filters, factMetrics, sources, setActiveView } = useSystem();

  // Helper to resolve source name
  const getSourceName = (sourceId: string) => {
    const s = sources.find(src => src.source_id === sourceId);
    return s ? s.source_name : sourceId;
  };

  // Region multipliers & adjustments
  const regionFactorMap: Record<string, { factor: number; cacAdj: number; ltvAdj: number; returnAdj: number; offlineAdj: number; label: string }> = {
    'North India': { factor: 0.32, cacAdj: -40, ltvAdj: 700, returnAdj: 1.3, offlineAdj: 2.0, label: 'North India' },
    'South India': { factor: 0.28, cacAdj: 30, ltvAdj: 400, returnAdj: 0.7, offlineAdj: -2.0, label: 'South India' },
    'West India': { factor: 0.22, cacAdj: -20, ltvAdj: -400, returnAdj: -1.0, offlineAdj: 1.0, label: 'West India' },
    'East India': { factor: 0.12, cacAdj: 90, ltvAdj: -1100, returnAdj: -3.3, offlineAdj: -1.0, label: 'East India' },
    'Central India': { factor: 0.06, cacAdj: 130, ltvAdj: -1700, returnAdj: -4.8, offlineAdj: 3.0, label: 'Central India' },
  };

  const regObj = (filters.region && regionFactorMap[filters.region]) ? regionFactorMap[filters.region] : { factor: 1.0, cacAdj: 0, ltvAdj: 0, returnAdj: 0, offlineAdj: 0, label: 'All India' };
  const factor = regObj.factor;

  // Base quarter values (National scale)
  let baseMarketShare = 19.6;
  let shareYoY = "-0.1% YoY";
  let shareStatus: 'Good' | 'Warning' | 'Critical' = 'Good';

  let baseRevenueCr = 29785;
  let revYoY = "+9.0% YoY";
  let revStatus: 'Good' | 'Warning' | 'Critical' = 'Good';

  let baseProfitCr = 211;
  let profitYoY = "Turnaround";
  let profitStatus: 'Good' | 'Warning' | 'Critical' = 'Good';

  let baseActiveUsersM = 125.0;
  let usersYoY = "+11.2% YoY";
  let usersStatus: 'Good' | 'Warning' | 'Critical' = 'Good';

  let baseRetentionPct = 68.5;
  let retentionYoY = "+3.2% YoY";
  let retentionStatus: 'Good' | 'Warning' | 'Critical' = 'Good';

  let baseOfflinePct = 62.0;
  let offlineYoY = "+1.5% YoY";
  let offlineStatus: 'Good' | 'Warning' | 'Critical' = 'Good';

  let baseHealthScore = 88;

  // Customer & Channel Performance base values
  let baseCAC = 1420;
  let cacYoY = "-4.5% YoY (Optimized)";

  let baseLTV = 18500;
  let ltvYoY = "+8.2% YoY Growth";

  let baseReturnRate = 42.8;
  let returnYoY = "+2.1% YoY Repeat";

  let baseAcquisitionsM = 18.5;
  let acqYoY = "+5.4% YoY Expansion";

  // Apply quarter filters if selected
  if (filters.quarter === 'Q1 2025') {
    baseMarketShare = 19.7;
    shareYoY = "Baseline";
    baseRevenueCr = 26971;
    revYoY = "Baseline";
    baseProfitCr = 185;
    profitYoY = "Baseline";
    baseActiveUsersM = 112.0;
    usersYoY = "Baseline";
    baseRetentionPct = 64.2;
    retentionYoY = "Baseline";
    baseOfflinePct = 61.0;
    offlineYoY = "Baseline";
    baseHealthScore = 82;

    baseCAC = 1480;
    cacYoY = "Baseline";
    baseLTV = 17100;
    ltvYoY = "Baseline";
    baseReturnRate = 40.5;
    returnYoY = "Baseline";
    baseAcquisitionsM = 16.8;
    acqYoY = "Baseline";
  } else if (filters.quarter === 'FY2025') {
    baseMarketShare = 20.0;
    shareYoY = "+0.3% YoY";
    baseRevenueCr = 29785;
    revYoY = "+9.0% YoY";
    baseProfitCr = 580;
    profitYoY = "+175% YoY";
    baseActiveUsersM = 120.0;
    usersYoY = "+7.1% YoY";
    baseRetentionPct = 66.8;
    retentionYoY = "+2.6% YoY";
    baseOfflinePct = 62.5;
    offlineYoY = "+2.0% YoY";
    baseHealthScore = 86;

    baseCAC = 1440;
    cacYoY = "-3.2% YoY";
    baseLTV = 17800;
    ltvYoY = "+6.5% YoY";
    baseReturnRate = 41.5;
    returnYoY = "+1.8% YoY";
    baseAcquisitionsM = 17.6;
    acqYoY = "+4.8% YoY";
  } else if (filters.quarter === 'FY23') {
    baseMarketShare = 17.5;
    shareYoY = "FY23 Base";
    baseRevenueCr = 29785;
    revYoY = "+9.0% YoY";
    baseProfitCr = 211;
    profitYoY = "Turnaround";
    baseActiveUsersM = 92.5;
    usersYoY = "FY23 Base";
    baseRetentionPct = 58.0;
    retentionYoY = "FY23 Base";
    baseOfflinePct = 60.0;
    offlineYoY = "FY23 Base";
    baseHealthScore = 80;

    baseCAC = 1520;
    cacYoY = "FY23 Base";
    baseLTV = 16200;
    ltvYoY = "FY23 Base";
    baseReturnRate = 38.2;
    returnYoY = "FY23 Base";
    baseAcquisitionsM = 14.2;
    acqYoY = "FY23 Base";
  } else if (filters.quarter === 'FY22') {
    baseMarketShare = 16.8;
    shareYoY = "FY22 Base";
    baseRevenueCr = 26971;
    revYoY = "FY22 Base";
    baseProfitCr = 85;
    profitYoY = "FY22 Base";
    baseActiveUsersM = 75.0;
    usersYoY = "FY22 Base";
    baseRetentionPct = 52.0;
    retentionYoY = "FY22 Base";
    baseOfflinePct = 59.0;
    offlineYoY = "FY22 Base";
    baseHealthScore = 76;

    baseCAC = 1580;
    cacYoY = "FY22 Base";
    baseLTV = 15000;
    ltvYoY = "FY22 Base";
    baseReturnRate = 35.0;
    returnYoY = "FY22 Base";
    baseAcquisitionsM = 12.0;
    acqYoY = "FY22 Base";
  } else if (filters.quarter === 'FY20') {
    baseMarketShare = 16.2;
    shareYoY = "FY20 Base";
    baseRevenueCr = 25060;
    revYoY = "+45.7% YoY";
    baseProfitCr = -349;
    profitYoY = "Loss";
    profitStatus = 'Warning';
    baseActiveUsersM = 55.0;
    usersYoY = "FY20 Base";
    baseRetentionPct = 44.0;
    retentionYoY = "FY20 Base";
    baseOfflinePct = 58.0;
    offlineYoY = "FY20 Base";
    baseHealthScore = 72;

    baseCAC = 1650;
    cacYoY = "FY20 Base";
    baseLTV = 13500;
    ltvYoY = "FY20 Base";
    baseReturnRate = 30.0;
    returnYoY = "FY20 Base";
    baseAcquisitionsM = 9.5;
    acqYoY = "FY20 Base";
  }

  // Combined calculations (incorporating regional factor & adjustments)
  const finalMarketShare = `${baseMarketShare}%`;
  const finalRevenue = `₹${Math.round(baseRevenueCr * factor).toLocaleString()} Cr`;
  const finalProfit = baseProfitCr < 0 
    ? `-₹${Math.abs(Math.round(baseProfitCr * factor)).toLocaleString()} Cr`
    : `₹${Math.round(baseProfitCr * factor).toLocaleString()} Cr`;
  const finalActiveUsers = `${(baseActiveUsersM * factor).toFixed(1)}M`;
  const finalRetention = `${(baseRetentionPct).toFixed(1)}%`;
  const finalOfflineShare = `${(baseOfflinePct + regObj.offlineAdj).toFixed(1)}%`;
  const finalHealthScore = Math.min(100, Math.max(0, baseHealthScore + (factor < 1.0 ? Math.round((factor - 0.2) * 5) : 0)));

  // Customer & Channel Performance final values
  const finalCAC = `₹${(baseCAC + regObj.cacAdj).toLocaleString()}`;
  const finalLTV = `₹${(baseLTV + regObj.ltvAdj).toLocaleString()}`;
  const finalReturnRate = `${(baseReturnRate + regObj.returnAdj).toFixed(1)}%`;
  const finalAcquisitions = `${(baseAcquisitionsM * factor).toFixed(1)}M`;

  // Targets (adjusted for region if filtered)
  const targetRevenue = `₹${Math.round(33000 * factor).toLocaleString()} Cr`;

  // Chart 1: Revenue Trend Data (FY19 to FY23)
  const revenueChartData = [
    { period: 'FY19', Revenue: +(17202 * factor).toFixed(0), Profit: +(-19 * factor).toFixed(0) },
    { period: 'FY20', Revenue: +(25060 * factor).toFixed(0), Profit: +(-349 * factor).toFixed(0) },
    { period: 'FY22', Revenue: +(26971 * factor).toFixed(0), Profit: +(85 * factor).toFixed(0) },
    { period: 'FY23', Revenue: +(29785 * factor).toFixed(0), Profit: +(211 * factor).toFixed(0) },
  ];

  // Chart 2: Market Share Trend Data
  const marketShareChartData = [
    { period: 'Q4 2019', Vivo: 18.2, Samsung: 19.8, OPPO: 12.0 },
    { period: 'Q1 2025', Vivo: 19.7, Samsung: 16.4, OPPO: 14.8 },
    { period: 'FY 2025', Vivo: 20.0, Samsung: 16.8, OPPO: 15.0 },
    { period: 'Q1 2026', Vivo: 19.6, Samsung: 17.1, OPPO: 15.3 },
  ];

  // Verified Metrics subset (First 5)
  const topVerifiedMetrics = factMetrics.slice(0, 5);

  const renderStatusBadge = (status: 'Good' | 'Warning' | 'Critical') => {
    if (status === 'Good') {
      return (
        <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 shrink-0">
          <CheckCircle2 className="w-2.5 h-2.5" /> Good
        </span>
      );
    } else if (status === 'Warning') {
      return (
        <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/30 shrink-0">
          <AlertCircle className="w-2.5 h-2.5" /> Warning
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-500/15 text-rose-300 border border-rose-500/30 shrink-0">
        <AlertCircle className="w-2.5 h-2.5" /> Critical
      </span>
    );
  };

  return (
    <div className="space-y-8 pb-10 animate-fade-in text-slate-100 max-w-7xl mx-auto">
      
      {/* SECTION 1: EXECUTIVE SUMMARY */}
      <div className="glass-panel rounded-2xl p-6 text-slate-100 shadow-xl border border-white/10 bg-gradient-to-br from-slate-900/90 via-slate-950 to-indigo-950/40 relative overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Company Overview (7 cols) */}
          <div className="lg:col-span-7 space-y-4 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="bg-indigo-500/20 text-indigo-300 border border-indigo-400/30 px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider flex items-center gap-1">
                  <Trophy className="w-3 h-3 text-amber-400" />
                  #1 Smartphone Brand in India {filters.region && filters.region !== 'ALL' ? `(${filters.region})` : ''}
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                Vivo India Executive Performance
              </h2>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                Vivo India operates as a leading smartphone brand in India, commanding {finalMarketShare} market share backed by an extensive offline distribution network spanning {finalOfflineShare} of total sales. Operating at {finalRevenue} in annual revenue, Vivo maintains robust consumer traction across {finalActiveUsers} active users.
              </p>
            </div>

            {/* Business Health Score Gauge Box */}
            <div className="bg-slate-900/80 border border-indigo-500/25 rounded-xl p-3.5 flex items-center gap-4">
              <div className="relative w-16 h-16 flex flex-col items-center justify-center rounded-full bg-slate-950 border-3 border-indigo-500 shadow-lg shrink-0">
                <span className="text-xl font-black text-white">{finalHealthScore}</span>
                <span className="text-[8px] font-bold text-slate-400 uppercase">/100</span>
              </div>
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-white">Business Health Index</span>
                  <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/15 px-2 py-0.5 rounded-full border border-emerald-500/30">
                    Optimal Health
                  </span>
                </div>
                <p className="text-[11px] text-slate-400">
                  Strong operational health driven by market share leadership, net profit recovery, and high customer retention.
                </p>
              </div>
            </div>
          </div>

          {/* Executive Summary (5 cols) */}
          <div className="lg:col-span-5 bg-slate-900/90 border border-indigo-500/30 rounded-xl p-5 space-y-3.5 flex flex-col justify-between shadow-lg">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-300 uppercase tracking-wider border-b border-white/10 pb-2.5">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              Executive Takeaways
            </div>
            <ul className="space-y-3 text-xs text-slate-200 flex-1 flex flex-col justify-around">
              <li className="flex items-start gap-2.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0 mt-1" />
                <span className="leading-relaxed"><strong>Market Leadership:</strong> Maintained #1 spot at {finalMarketShare} market share, outperforming Samsung (17.1%) and OPPO (15.3%).</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-2 h-2 rounded-full bg-indigo-400 shrink-0 mt-1" />
                <span className="leading-relaxed"><strong>Financial Growth:</strong> Reached {finalRevenue} in revenue ({revYoY}) with an audited net profit turnaround of {finalProfit}.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-2 h-2 rounded-full bg-cyan-400 shrink-0 mt-1" />
                <span className="leading-relaxed"><strong>Customer Loyalty:</strong> Expanded active user base to {finalActiveUsers} with an industry-leading {finalRetention} retention rate.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-2 h-2 rounded-full bg-purple-400 shrink-0 mt-1" />
                <span className="leading-relaxed"><strong>Offline Distribution:</strong> Commands a dominant {finalOfflineShare} channel share backed by nationwide retail presence across 280+ cities.</span>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* SECTION 2: PRIMARY KPI CARDS (EXACTLY SIX) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-indigo-400" />
            Primary Corporate KPIs
          </h3>
          <span className="text-[11px] text-slate-400">
            {filters.quarter !== 'ALL' ? filters.quarter : 'Q1 2026 Latest'} {filters.region && filters.region !== 'ALL' ? `• ${filters.region}` : ''}
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
          
          {/* Card 1: Market Share */}
          <div className="glass-card rounded-xl p-4 border border-white/10 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-semibold text-slate-400 truncate">Market Share</span>
              <Trophy className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            </div>
            <div className="text-xl sm:text-2xl font-black text-white">{finalMarketShare}</div>
            <div className="flex items-center justify-between pt-1">
              <span className="text-[10px] text-slate-400 font-medium">{shareYoY}</span>
              {renderStatusBadge(shareStatus)}
            </div>
          </div>

          {/* Card 2: Revenue */}
          <div className="glass-card rounded-xl p-4 border border-white/10 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-semibold text-slate-400 truncate">Revenue</span>
              <DollarSign className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
            </div>
            <div className="text-xl sm:text-2xl font-black text-white">{finalRevenue}</div>
            <div className="flex items-center justify-between pt-1">
              <span className="text-[10px] text-slate-400 font-medium">{revYoY}</span>
              {renderStatusBadge(revStatus)}
            </div>
          </div>

          {/* Card 3: Profit */}
          <div className="glass-card rounded-xl p-4 border border-white/10 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-semibold text-slate-400 truncate">Profit</span>
              <TrendingUp className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            </div>
            <div className="text-xl sm:text-2xl font-black text-white">{finalProfit}</div>
            <div className="flex items-center justify-between pt-1">
              <span className="text-[10px] text-slate-400 font-medium">{profitYoY}</span>
              {renderStatusBadge(profitStatus)}
            </div>
          </div>

          {/* Card 4: Active Customers */}
          <div className="glass-card rounded-xl p-4 border border-white/10 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-semibold text-slate-400 truncate">Active Customers</span>
              <Users className="w-3.5 h-3.5 text-blue-400 shrink-0" />
            </div>
            <div className="text-xl sm:text-2xl font-black text-white">{finalActiveUsers}</div>
            <div className="flex items-center justify-between pt-1">
              <span className="text-[10px] text-slate-400 font-medium">{usersYoY}</span>
              {renderStatusBadge(usersStatus)}
            </div>
          </div>

          {/* Card 5: Customer Retention */}
          <div className="glass-card rounded-xl p-4 border border-white/10 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-semibold text-slate-400 truncate">Customer Retention</span>
              <Repeat className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
            </div>
            <div className="text-xl sm:text-2xl font-black text-white">{finalRetention}</div>
            <div className="flex items-center justify-between pt-1">
              <span className="text-[10px] text-slate-400 font-medium">{retentionYoY}</span>
              {renderStatusBadge(retentionStatus)}
            </div>
          </div>

          {/* Card 6: Offline Channel Share */}
          <div className="glass-card rounded-xl p-4 border border-white/10 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-semibold text-slate-400 truncate">Offline Channel Share</span>
              <Store className="w-3.5 h-3.5 text-purple-400 shrink-0" />
            </div>
            <div className="text-xl sm:text-2xl font-black text-white">{finalOfflineShare}</div>
            <div className="flex items-center justify-between pt-1">
              <span className="text-[10px] text-slate-400 font-medium">{offlineYoY}</span>
              {renderStatusBadge(offlineStatus)}
            </div>
          </div>

        </div>
      </div>

      {/* SECTION 3: CUSTOMER & CHANNEL PERFORMANCE (FOUR COMPACT CARDS) */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
          <UserCheck className="w-4 h-4 text-cyan-400" />
          Customer & Channel Performance
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
          
          {/* Compact Card 1: CAC */}
          <div className="glass-panel rounded-xl p-3.5 border border-white/10 flex items-center justify-between">
            <div>
              <div className="text-[11px] text-slate-400 font-medium">Blended Acquisition Cost (CAC)</div>
              <div className="text-lg font-extrabold text-white">{finalCAC}</div>
              <div className="text-[10px] text-emerald-400 font-medium mt-0.5">{cacYoY}</div>
            </div>
            {renderStatusBadge('Good')}
          </div>

          {/* Compact Card 2: LTV */}
          <div className="glass-panel rounded-xl p-3.5 border border-white/10 flex items-center justify-between">
            <div>
              <div className="text-[11px] text-slate-400 font-medium">Gross Revenue LTV (1-Cycle)</div>
              <div className="text-lg font-extrabold text-white">{finalLTV}</div>
              <div className="text-[10px] text-indigo-400 font-medium mt-0.5">{ltvYoY}</div>
            </div>
            {renderStatusBadge('Good')}
          </div>

          {/* Compact Card 3: Return Customer Rate */}
          <div className="glass-panel rounded-xl p-3.5 border border-white/10 flex items-center justify-between">
            <div>
              <div className="text-[11px] text-slate-400 font-medium">Return Customer Rate</div>
              <div className="text-lg font-extrabold text-white">{finalReturnRate}</div>
              <div className="text-[10px] text-cyan-400 font-medium mt-0.5">{returnYoY}</div>
            </div>
            {renderStatusBadge('Good')}
          </div>

          {/* Compact Card 4: Customer Acquisition */}
          <div className="glass-panel rounded-xl p-3.5 border border-white/10 flex items-center justify-between">
            <div>
              <div className="text-[11px] text-slate-400 font-medium">New Acquisitions</div>
              <div className="text-lg font-extrabold text-white">{finalAcquisitions}</div>
              <div className="text-[10px] text-blue-400 font-medium mt-0.5">{acqYoY}</div>
            </div>
            {renderStatusBadge('Good')}
          </div>

        </div>
      </div>

      {/* SECTION 4: PERFORMANCE TRENDS (2 CHARTS ONLY) */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-emerald-400" />
          Performance Trends
        </h3>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          
          {/* Chart 1: Revenue Trend */}
          <div className="glass-panel rounded-2xl p-5 border border-white/10 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-extrabold text-white flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-indigo-400" />
                  Revenue Trend (FY19 – FY23)
                </h4>
                <p className="text-[11px] text-slate-400">Annual audited revenue in ₹ Crore {filters.region && filters.region !== 'ALL' ? `(${filters.region})` : ''}</p>
              </div>
              <span className="text-[10px] font-bold text-indigo-300 bg-indigo-500/15 border border-indigo-500/30 px-2 py-0.5 rounded">
                +9.0% CAGR Growth
              </span>
            </div>

            <div className="h-56 w-full pt-2">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={revenueChartData} margin={{ top: 10, right: 15, left: -15, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.5} />
                  <XAxis dataKey="period" stroke="#94A3B8" tick={{ fontSize: 11 }} />
                  <YAxis stroke="#94A3B8" tick={{ fontSize: 11 }} domain={['auto', 'auto']} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0F172A', borderColor: '#334155', borderRadius: '10px', fontSize: '11px' }}
                    formatter={(val: any) => [`₹${val?.toLocaleString()} Cr`, 'Revenue']}
                  />
                  <Line type="monotone" dataKey="Revenue" name="Revenue (₹ Cr)" stroke="#6366F1" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Chart 2: Market Share Trend */}
          <div className="glass-panel rounded-2xl p-5 border border-white/10 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-extrabold text-white flex items-center gap-2">
                  <Trophy className="w-4 h-4 text-emerald-400" />
                  Market Share Trend vs Competitors
                </h4>
                <p className="text-[11px] text-slate-400">Smartphone shipment share % (IDC / Counterpoint)</p>
              </div>
              <span className="text-[10px] font-bold text-emerald-300 bg-emerald-500/15 border border-emerald-500/30 px-2 py-0.5 rounded">
                #1 Brand Leader
              </span>
            </div>

            <div className="h-56 w-full pt-2">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={marketShareChartData} margin={{ top: 10, right: 15, left: -15, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.5} />
                  <XAxis dataKey="period" stroke="#94A3B8" tick={{ fontSize: 11 }} />
                  <YAxis stroke="#94A3B8" tick={{ fontSize: 11 }} domain={[10, 22]} tickFormatter={(v) => `${v}%`} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0F172A', borderColor: '#334155', borderRadius: '10px', fontSize: '11px' }}
                    formatter={(val: any) => [`${val}%`, '']}
                  />
                  <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '5px' }} />
                  <Line type="monotone" dataKey="Vivo" name="Vivo (#1)" stroke="#10B981" strokeWidth={3} dot={{ r: 4 }} />
                  <Line type="monotone" dataKey="Samsung" name="Samsung" stroke="#3B82F6" strokeWidth={2} strokeDasharray="3 3" />
                  <Line type="monotone" dataKey="OPPO" name="OPPO" stroke="#F59E0B" strokeWidth={2} strokeDasharray="3 3" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

        </div>
      </div>

      {/* SECTION 5: STRATEGIC BUSINESS TARGETS (SIMPLIFIED GROUP TARGETS) */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
          <Target className="w-4 h-4 text-amber-400" />
          Strategic Corporate Targets
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          {/* Target 1: Market Share */}
          <div className="glass-panel rounded-xl p-4 border border-white/10 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-300">Market Share Target</span>
              <span className="text-[10px] font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                FY26 Horizon
              </span>
            </div>
            <div className="flex items-baseline justify-between">
              <div>
                <span className="text-[10px] text-slate-400 uppercase font-semibold">Current</span>
                <div className="text-lg font-black text-white">{finalMarketShare}</div>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-slate-400 uppercase font-semibold">Target</span>
                <div className="text-lg font-black text-indigo-400">21.0%</div>
              </div>
            </div>
            {/* Simple Progress Bar */}
            <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden border border-white/5">
              <div className="bg-gradient-to-r from-indigo-500 to-emerald-400 h-full rounded-full" style={{ width: `${Math.min(100, Math.round((baseMarketShare / 21.0) * 100))}%` }} />
            </div>
            <div className="text-[10px] text-slate-400 text-right font-medium">
              {Math.min(100, Math.round((baseMarketShare / 21.0) * 100))}% Target Realized
            </div>
          </div>

          {/* Target 2: Revenue Target */}
          <div className="glass-panel rounded-xl p-4 border border-white/10 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-300">Revenue Target</span>
              <span className="text-[10px] font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                FY26 Horizon
              </span>
            </div>
            <div className="flex items-baseline justify-between">
              <div>
                <span className="text-[10px] text-slate-400 uppercase font-semibold">Current</span>
                <div className="text-lg font-black text-white">{finalRevenue}</div>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-slate-400 uppercase font-semibold">Target</span>
                <div className="text-lg font-black text-indigo-400">{targetRevenue}</div>
              </div>
            </div>
            {/* Simple Progress Bar */}
            <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden border border-white/5">
              <div className="bg-gradient-to-r from-indigo-500 to-emerald-400 h-full rounded-full" style={{ width: `${Math.min(100, Math.round((baseRevenueCr / 33000) * 100))}%` }} />
            </div>
            <div className="text-[10px] text-slate-400 text-right font-medium">
              {Math.min(100, Math.round((baseRevenueCr / 33000) * 100))}% Target Realized
            </div>
          </div>

          {/* Target 3: Offline Channel Target */}
          <div className="glass-panel rounded-xl p-4 border border-white/10 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-300">Offline Channel Share Target</span>
              <span className="text-[10px] font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                FY26 Horizon
              </span>
            </div>
            <div className="flex items-baseline justify-between">
              <div>
                <span className="text-[10px] text-slate-400 uppercase font-semibold">Current</span>
                <div className="text-lg font-black text-white">{finalOfflineShare}</div>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-slate-400 uppercase font-semibold">Target</span>
                <div className="text-lg font-black text-indigo-400">65.0%</div>
              </div>
            </div>
            {/* Simple Progress Bar */}
            <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden border border-white/5">
              <div className="bg-gradient-to-r from-indigo-500 to-emerald-400 h-full rounded-full" style={{ width: `${Math.min(100, Math.round(((baseOfflinePct + regObj.offlineAdj) / 65.0) * 100))}%` }} />
            </div>
            <div className="text-[10px] text-slate-400 text-right font-medium">
              {Math.min(100, Math.round(((baseOfflinePct + regObj.offlineAdj) / 65.0) * 100))}% Target Realized
            </div>
          </div>

        </div>
      </div>

      {/* SECTION 6: VERIFIED METRICS (FIRST 5 SOURCED FACT REPOSITORY) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
            <Database className="w-4 h-4 text-purple-400" />
            Verified Fact Metrics Sample
          </h3>
          <button 
            onClick={() => setActiveView('master_tables')}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-400 hover:text-indigo-300 transition-colors bg-indigo-500/10 hover:bg-indigo-500/20 px-3 py-1.5 rounded-lg border border-indigo-500/30 cursor-pointer"
          >
            View Complete Repository
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="glass-panel rounded-2xl border border-white/10 overflow-hidden shadow-lg">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-900/90 text-slate-400 font-bold uppercase text-[10px] border-b border-white/10 tracking-wider">
                <tr>
                  <th className="py-3 px-4">Metric Name</th>
                  <th className="py-3 px-4">Value</th>
                  <th className="py-3 px-4">Source</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 bg-slate-950/40">
                {topVerifiedMetrics.map((item) => (
                  <tr key={item.metric_id} className="hover:bg-slate-900/50 transition-colors">
                    <td className="py-3 px-4 font-semibold text-white">{item.metric_name}</td>
                    <td className="py-3 px-4 text-indigo-300 font-mono font-bold">
                      {typeof item.value === 'number' ? item.value.toLocaleString() : item.value} {item.unit}
                    </td>
                    <td className="py-3 px-4 text-slate-400">
                      <span className="bg-slate-800 text-slate-300 px-2 py-0.5 rounded text-[11px] border border-white/5">
                        {getSourceName(item.source_id)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

    </div>
  );
};
