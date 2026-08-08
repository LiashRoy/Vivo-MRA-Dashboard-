import React, { useState } from 'react';
import { useSystem } from '../context/SystemContext';
import { 
  Store, 
  Building, 
  MapPin, 
  TrendingUp, 
  Layers, 
  Award, 
  Sparkles,
  ShieldCheck,
  Ban,
  CheckCircle2,
  PieChart as PieChartIcon,
  Target,
  Zap,
  ArrowRight,
  Lightbulb,
  RefreshCw,
  ChevronDown,
  ChevronUp,
  Briefcase,
  Globe,
  DollarSign,
  UserCheck,
  HelpCircle,
  FileText
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell, 
  Tooltip 
} from 'recharts';

export const OperatingView: React.FC = () => {
  const { factMetrics, filteredFactMetrics, openCitationModal, filters, setFilters } = useSystem();

  // Collapsible & Tab States
  const [showOfflineDetails, setShowOfflineDetails] = useState<boolean>(false);
  const [showOnlineDetails, setShowOnlineDetails] = useState<boolean>(false);
  const [activeStrategyTab, setActiveStrategyTab] = useState<'problems' | 'solutions' | 'initiatives' | 'marketing' | 'notes'>('solutions');

  // Facts
  const offline62 = factMetrics.find(f => f.metric_id === 'FACT-010'); // 62%
  const online38 = factMetrics.find(f => f.metric_id === 'FACT-012');  // 38%
  const xSeriesGrowthFact = factMetrics.find(f => f.metric_id === 'FACT-030'); // +185%
  const eboStores = factMetrics.find(f => f.metric_id === 'FACT-031'); // 600+
  const flagships = factMetrics.find(f => f.metric_id === 'FACT-032'); // 5

  const isFiltered = filters.quarter !== 'ALL' || (filters.region && filters.region !== 'ALL') || filters.source_id !== 'ALL' || (filters.sbu_id && filters.sbu_id !== 'ALL');

  // Dynamic values based on active period filter
  let offlineShare = 62;
  let onlineShare = 38;
  let periodLabel = "Q1 2026";
  let sourceLabel = "IDC Q1 2026";
  let bannerDescription = (
    <>
      Offline retail share in India stands at <strong>62% in Q1 2026</strong>. Vivo operates a nationwide network of <strong>600+ Exclusive Outlets</strong> across 280+ cities, 20+ experience centers, and 5 flagship superstores.
    </>
  );

  if (filters.quarter === 'Q1 2025') {
    offlineShare = 58;
    onlineShare = 42;
    periodLabel = "Q1 2025";
    sourceLabel = "IDC Q1 2025";
    bannerDescription = (
      <>
        Showing <strong>Q1 2025 Baseline Filter</strong>: Offline retail share was <strong>58.0%</strong> with online e-commerce representing <strong>42.0%</strong>.
      </>
    );
  } else if (filters.quarter === 'FY2025') {
    offlineShare = 60;
    onlineShare = 40;
    periodLabel = "FY 2025";
    sourceLabel = "Counterpoint FY25";
    bannerDescription = (
      <>
        Showing <strong>Full-Year 2025 Filter</strong>: Offline retail share averaged <strong>60.0%</strong> as physical retail expansion continued nationwide.
      </>
    );
  } else if (filters.quarter === 'FY23') {
    offlineShare = 55;
    onlineShare = 45;
    periodLabel = "FY23";
    sourceLabel = "RoC Filings & Retail Tracker";
    bannerDescription = (
      <>
        Showing <strong>FY23 Filter</strong>: Offline retail share was <strong>55.0%</strong> during record revenue expansion to ₹29,784.90 crore.
      </>
    );
  } else if (filters.quarter === 'FY22') {
    offlineShare = 52;
    onlineShare = 48;
    periodLabel = "FY22";
    sourceLabel = "RoC Filings & Retail Tracker";
    bannerDescription = (
      <>
        Showing <strong>FY22 Filter</strong>: Offline retail share reached <strong>52.0%</strong> during post-pandemic retail network expansion.
      </>
    );
  } else if (filters.quarter === 'FY20') {
    offlineShare = 50;
    onlineShare = 50;
    periodLabel = "FY20";
    sourceLabel = "RoC Filings & Retail Tracker";
    bannerDescription = (
      <>
        Showing <strong>FY20 Filter</strong>: Equal <strong>50/50 offline/online balance</strong> during early tier-2/3 retail rollout.
      </>
    );
  } else if (filters.quarter === 'FY19') {
    offlineShare = 48;
    onlineShare = 52;
    periodLabel = "FY19";
    sourceLabel = "RoC Filings & Retail Tracker";
    bannerDescription = (
      <>
        Showing <strong>FY19 Filter</strong>: Baseline channel mix of <strong>48.0% offline</strong> and <strong>52.0% online</strong>.
      </>
    );
  } else if (filters.quarter === 'Q4 2019') {
    offlineShare = 48;
    onlineShare = 52;
    periodLabel = "Q4 2019";
    sourceLabel = "Counterpoint Q4 2019";
    bannerDescription = (
      <>
        Showing <strong>Q4 2019 Historical Surge Filter</strong>: Offline share was <strong>48.0%</strong> during the record +132% YoY share surge.
      </>
    );
  }

  // SBU Channel Mix Overrides & Period Scaling
  let periodFactor = 1.0;
  let periodBaselineLabel = 'Q1 2025 Baseline: 58.0%';
  if (filters.quarter === 'Q4 2019') {
    periodFactor = 0.55;
    periodBaselineLabel = '2018 Baseline: 52.0%';
  } else if (filters.quarter === 'FY19') {
    periodFactor = 0.58;
    periodBaselineLabel = 'FY18 Baseline: 53.0%';
  } else if (filters.quarter === 'FY20') {
    periodFactor = 0.68;
    periodBaselineLabel = 'FY19 Baseline: 55.0%';
  } else if (filters.quarter === 'FY22') {
    periodFactor = 0.82;
    periodBaselineLabel = 'FY21 Baseline: 56.0%';
  } else if (filters.quarter === 'FY23') {
    periodFactor = 0.90;
    periodBaselineLabel = 'FY22 Baseline: 57.0%';
  } else if (filters.quarter === 'Q1 2025') {
    periodFactor = 0.96;
    periodBaselineLabel = 'Q1 2024 Baseline: 57.5%';
  } else if (filters.quarter === 'FY2025') {
    periodFactor = 0.98;
    periodBaselineLabel = 'FY24 Baseline: 58.0%';
  }

  if (filters.sbu_id === 'SBU-X') {
    offlineShare = 72;
    onlineShare = 28;
    bannerDescription = (
      <>
        Showing <strong>X-Series (Flagship) Filter</strong>: Premium camera buyers prefer in-person testing, resulting in a <strong>72.0% offline share</strong>.
      </>
    );
  } else if (filters.sbu_id === 'SBU-V') {
    offlineShare = 65;
    onlineShare = 35;
    bannerDescription = (
      <>
        Showing <strong>V-Series (Upper Mid-Range) Filter</strong>: Balanced omni-channel distribution with <strong>65.0% offline retail share</strong>.
      </>
    );
  } else if (filters.sbu_id === 'SBU-Y') {
    offlineShare = 60;
    onlineShare = 40;
    bannerDescription = (
      <>
        Showing <strong>Y-Series (Mass Base) Filter</strong>: Strong multi-brand trade presence maintaining <strong>60.0% offline retail share</strong>.
      </>
    );
  } else if (filters.sbu_id === 'SBU-IQOO') {
    offlineShare = 15;
    onlineShare = 85;
    bannerDescription = (
      <>
        Showing <strong>iQOO Sub-Brand Filter</strong>: Digital performance brand operating at <strong>85.0% online e-commerce share</strong>.
      </>
    );
  }

  // Regional Overrides
  if (filters.region && filters.region !== 'ALL') {
    if (filters.region === 'North India') {
      offlineShare = 66;
      onlineShare = 34;
      bannerDescription = (
        <>
          Showing <strong>North India Region Filter</strong>: General Trade dominance in Delhi/NCR, UP, Punjab drives a <strong>66.0% offline share</strong> across 210 EBOs.
        </>
      );
    } else if (filters.region === 'South India') {
      offlineShare = 58;
      onlineShare = 42;
      bannerDescription = (
        <>
          Showing <strong>South India Region Filter</strong>: Metro digital adoption across Karnataka, TN, AP drives a <strong>58.0% offline / 42.0% online balance</strong>.
        </>
      );
    } else if (filters.region === 'West India') {
      offlineShare = 60;
      onlineShare = 40;
      bannerDescription = (
        <>
          Showing <strong>West India Region Filter</strong>: Balanced coverage across Maharashtra and Gujarat yields a <strong>60.0% offline channel mix</strong>.
        </>
      );
    } else if (filters.region === 'East India') {
      offlineShare = 70;
      onlineShare = 30;
      bannerDescription = (
        <>
          Showing <strong>East India Region Filter</strong>: High Tier-2/3 retail reliance drives a <strong>70.0% offline store share</strong>.
        </>
      );
    } else if (filters.region === 'Central India') {
      offlineShare = 72;
      onlineShare = 28;
      bannerDescription = (
        <>
          Showing <strong>Central India Region Filter</strong>: General Trade promoter counters in MP & CG yield a <strong>72.0% offline share</strong>.
        </>
      );
    }
  }

  // Dynamic Store Counts
  let eboBaseCount = 600;
  let expCenterBaseCount = 20;

  if (filters.sbu_id === 'SBU-X') {
    eboBaseCount = 650;
    expCenterBaseCount = 25;
  } else if (filters.sbu_id === 'SBU-V') {
    eboBaseCount = 600;
    expCenterBaseCount = 20;
  } else if (filters.sbu_id === 'SBU-Y') {
    eboBaseCount = 550;
    expCenterBaseCount = 15;
  } else if (filters.sbu_id === 'SBU-IQOO') {
    eboBaseCount = 120;
    expCenterBaseCount = 5;
  }

  const regionFactorMap: Record<string, number> = {
    'North India': 0.35,
    'South India': 0.30,
    'West India': 0.22,
    'East India': 0.08,
    'Central India': 0.05,
  };
  const regStoreFactor = (filters.region && regionFactorMap[filters.region]) ? regionFactorMap[filters.region] : 1.0;

  const eboCount = Math.round(eboBaseCount * (periodFactor < 0.8 ? periodFactor * 0.9 : 1) * regStoreFactor);
  const expCenterCount = Math.max(1, Math.round(expCenterBaseCount * (periodFactor < 0.8 ? periodFactor * 0.9 : 1) * regStoreFactor));

  // Dynamic Unit Economics based on filters
  let blendedCac = 1420;
  let customerLtv = 18500;
  let offlineCac = 2150;
  let offlineLtv = 20500;
  let onlineCac = 1420;
  let onlineLtv = 17200;

  if (filters.sbu_id === 'SBU-X') {
    blendedCac = 3100;
    customerLtv = 46500;
    offlineCac = 3450;
    offlineLtv = 51000;
    onlineCac = 2600;
    onlineLtv = 39500;
  } else if (filters.sbu_id === 'SBU-V') {
    blendedCac = 2050;
    customerLtv = 28200;
    offlineCac = 2300;
    offlineLtv = 30500;
    onlineCac = 1550;
    onlineLtv = 24000;
  } else if (filters.sbu_id === 'SBU-Y') {
    blendedCac = 1120;
    customerLtv = 14800;
    offlineCac = 1300;
    offlineLtv = 15800;
    onlineCac = 890;
    onlineLtv = 13200;
  } else if (filters.sbu_id === 'SBU-IQOO') {
    blendedCac = 1280;
    customerLtv = 23500;
    offlineCac = 1850;
    offlineLtv = 26000;
    onlineCac = 1150;
    onlineLtv = 22800;
  }

  if (filters.quarter === 'Q4 2019') {
    blendedCac = Math.round(blendedCac * 0.58);
    customerLtv = Math.round(customerLtv * 0.68);
    offlineCac = Math.round(offlineCac * 0.60);
    offlineLtv = Math.round(offlineLtv * 0.70);
    onlineCac = Math.round(onlineCac * 0.54);
    onlineLtv = Math.round(onlineLtv * 0.66);
  } else if (filters.quarter === 'FY19') {
    blendedCac = Math.round(blendedCac * 0.60);
    customerLtv = Math.round(customerLtv * 0.65);
    offlineCac = Math.round(offlineCac * 0.62);
    offlineLtv = Math.round(offlineLtv * 0.66);
    onlineCac = Math.round(onlineCac * 0.56);
    onlineLtv = Math.round(onlineLtv * 0.64);
  } else if (filters.quarter === 'FY20') {
    blendedCac = Math.round(blendedCac * 0.70);
    customerLtv = Math.round(customerLtv * 0.75);
    offlineCac = Math.round(offlineCac * 0.72);
    offlineLtv = Math.round(offlineLtv * 0.76);
    onlineCac = Math.round(onlineCac * 0.66);
    onlineLtv = Math.round(onlineLtv * 0.73);
  } else if (filters.quarter === 'FY22') {
    blendedCac = Math.round(blendedCac * 0.84);
    customerLtv = Math.round(customerLtv * 0.88);
    offlineCac = Math.round(offlineCac * 0.86);
    offlineLtv = Math.round(offlineLtv * 0.88);
    onlineCac = Math.round(onlineCac * 0.80);
    onlineLtv = Math.round(onlineLtv * 0.87);
  } else if (filters.quarter === 'FY23') {
    blendedCac = Math.round(blendedCac * 0.91);
    customerLtv = Math.round(customerLtv * 0.94);
    offlineCac = Math.round(offlineCac * 0.92);
    offlineLtv = Math.round(offlineLtv * 0.94);
    onlineCac = Math.round(onlineCac * 0.88);
    onlineLtv = Math.round(onlineLtv * 0.93);
  } else if (filters.quarter === 'Q1 2025') {
    blendedCac = Math.round(blendedCac * 0.96);
    customerLtv = Math.round(customerLtv * 0.98);
    offlineCac = Math.round(offlineCac * 0.97);
    offlineLtv = Math.round(offlineLtv * 0.98);
    onlineCac = Math.round(onlineCac * 0.95);
    onlineLtv = Math.round(onlineLtv * 0.98);
  } else if (filters.quarter === 'FY2025') {
    blendedCac = Math.round(blendedCac * 0.98);
    customerLtv = Math.round(customerLtv * 1.01);
    offlineCac = Math.round(offlineCac * 0.99);
    offlineLtv = Math.round(offlineLtv * 1.01);
    onlineCac = Math.round(onlineCac * 0.97);
    onlineLtv = Math.round(onlineLtv * 1.01);
  }

  if (filters.region && filters.region !== 'ALL') {
    if (filters.region === 'South India') {
      blendedCac = Math.round(blendedCac * 1.10);
      customerLtv = Math.round(customerLtv * 1.15);
      offlineCac = Math.round(offlineCac * 1.12);
      offlineLtv = Math.round(offlineLtv * 1.18);
      onlineCac = Math.round(onlineCac * 1.08);
      onlineLtv = Math.round(onlineLtv * 1.12);
    } else if (filters.region === 'North India') {
      blendedCac = Math.round(blendedCac * 1.05);
      customerLtv = Math.round(customerLtv * 1.08);
      offlineCac = Math.round(offlineCac * 1.06);
      offlineLtv = Math.round(offlineLtv * 1.10);
      onlineCac = Math.round(onlineCac * 1.04);
      onlineLtv = Math.round(onlineLtv * 1.05);
    } else if (filters.region === 'West India') {
      blendedCac = Math.round(blendedCac * 1.02);
      customerLtv = Math.round(customerLtv * 1.04);
      offlineCac = Math.round(offlineCac * 1.03);
      offlineLtv = Math.round(offlineLtv * 1.05);
      onlineCac = Math.round(onlineCac * 1.01);
      onlineLtv = Math.round(onlineLtv * 1.03);
    } else if (filters.region === 'East India') {
      blendedCac = Math.round(blendedCac * 0.88);
      customerLtv = Math.round(customerLtv * 0.85);
      offlineCac = Math.round(offlineCac * 0.90);
      offlineLtv = Math.round(offlineLtv * 0.86);
      onlineCac = Math.round(onlineCac * 0.85);
      onlineLtv = Math.round(onlineLtv * 0.83);
    } else if (filters.region === 'Central India') {
      blendedCac = Math.round(blendedCac * 0.82);
      customerLtv = Math.round(customerLtv * 0.80);
      offlineCac = Math.round(offlineCac * 0.84);
      offlineLtv = Math.round(offlineLtv * 0.81);
      onlineCac = Math.round(onlineCac * 0.80);
      onlineLtv = Math.round(onlineLtv * 0.78);
    }
  }

  const blendedRatio = (customerLtv / blendedCac).toFixed(1);
  const offlineRatio = (offlineLtv / offlineCac).toFixed(1);
  const onlineRatio = (onlineLtv / onlineCac).toFixed(1);

  // Dynamic SBU Growth metrics
  let xSeriesGrowth = '+185% YoY Growth';
  if (filters.quarter === 'Q4 2019' || filters.quarter === 'FY19') xSeriesGrowth = '+110% YoY Growth';
  else if (filters.quarter === 'FY20') xSeriesGrowth = '+95% YoY Growth';
  else if (filters.quarter === 'FY22') xSeriesGrowth = '+140% YoY Growth';
  else if (filters.quarter === 'FY23') xSeriesGrowth = '+160% YoY Growth';

  // Offline Channels Dynamic Investment & Returns Calculation
  const offlineItemsBase = [
    { name: 'Exclusive Brand Outlets (EBOs)', desc: 'Rent, fit-outs & franchise support', scope: `${eboCount}+ Exclusive Stores across 280+ cities`, baseInv: 420, baseRev: 5450, baseCac: 2100 },
    { name: 'In-Store Promoter (ISP) Network', desc: 'Promoter payroll & sales commission', scope: `${Math.round(25000 * (periodFactor < 0.8 ? periodFactor : 1)).toLocaleString('en-IN')}+ Active promoters nationwide`, baseInv: 380, baseRev: 4820, baseCac: 2180 },
    { name: 'Multi-Brand Outlet (MBO) Trade Incentives', desc: 'Retail partner margins & quarterly targets', scope: `${Math.round(70000 * (periodFactor < 0.8 ? periodFactor : 1)).toLocaleString('en-IN')}+ General trade multi-brand stores`, baseInv: 290, baseRev: 3910, baseCac: 2050 },
    { name: 'Outdoor OOH & Storefront Branding', desc: 'Billboards, glow signs & dealer boards', scope: 'High-density Tier-1/2 metro locations', baseInv: 150, baseRev: 1840, baseCac: 2250 },
    { name: 'Flagship Experience Centers', desc: 'Experiential hubs & tech showcases', scope: `${expCenterCount} Experience Centers & Superstores`, baseInv: 95, baseRev: 1280, baseCac: 2120 },
  ];

  const offlineItems = offlineItemsBase.map(item => {
    const scale = filters.sbu_id !== 'ALL' ? (filters.sbu_id === 'SBU-IQOO' ? 0.2 : (filters.sbu_id === 'SBU-X' ? 0.35 : filters.sbu_id === 'SBU-V' ? 0.45 : 0.5)) : 1;
    const inv = Math.round(item.baseInv * periodFactor * scale);
    const rev = Math.round(item.baseRev * periodFactor * scale);
    const cac = Math.round(item.baseCac * (filters.quarter === 'Q4 2019' || filters.quarter === 'FY19' ? 0.6 : 1) * (filters.sbu_id === 'SBU-X' ? 1.6 : filters.sbu_id === 'SBU-Y' ? 0.6 : 1));
    const mult = inv > 0 ? (rev / inv).toFixed(1) : '0.0';
    return { ...item, inv, rev, cac, mult };
  });

  const totalOfflineInv = offlineItems.reduce((acc, curr) => acc + curr.inv, 0);
  const totalOfflineRev = offlineItems.reduce((acc, curr) => acc + curr.rev, 0);
  const totalOfflineRoi = totalOfflineInv > 0 ? (totalOfflineRev / totalOfflineInv).toFixed(1) : '12.9';

  // Online Channels Dynamic Investment & Returns Calculation
  const onlineItemsBase = [
    { name: 'Marketplace Sponsored Ads', desc: 'Flipkart & Amazon India placement', scope: 'Big Billion Days & Diwali event slots', baseInv: 310, baseRev: 4650, baseCac: 1380 },
    { name: 'Search Ads & Performance Max', desc: 'Google Search, YouTube & Shopping', scope: 'High-intent camera & phone queries', baseInv: 180, baseRev: 2420, baseCac: 1410 },
    { name: 'Social & Programmatic Media', desc: 'Meta (Instagram/FB) & Display', scope: 'Youth audience targeting (Y & V-series)', baseInv: 140, baseRev: 1680, baseCac: 1520 },
    { name: 'Influencer & Tech Creator Partnerships', desc: 'Tech reviewers & lifestyle creators', scope: 'Unboxing, camera tests & benchmark reels', baseInv: 110, baseRev: 1450, baseCac: 1250 },
    { name: 'Direct E-store (vivo.com/in)', desc: 'First-party D2C website & app store', scope: 'Direct customer acquisition & trade-in', baseInv: 90, baseRev: 1310, baseCac: 980 },
  ];

  const onlineItems = onlineItemsBase.map(item => {
    const scale = filters.sbu_id !== 'ALL' ? (filters.sbu_id === 'SBU-IQOO' ? 1.4 : (filters.sbu_id === 'SBU-X' ? 0.35 : filters.sbu_id === 'SBU-V' ? 0.45 : 0.5)) : 1;
    const inv = Math.round(item.baseInv * periodFactor * scale);
    const rev = Math.round(item.baseRev * periodFactor * scale);
    const cac = Math.round(item.baseCac * (filters.quarter === 'Q4 2019' || filters.quarter === 'FY19' ? 0.58 : 1) * (filters.sbu_id === 'SBU-X' ? 1.8 : filters.sbu_id === 'SBU-Y' ? 0.65 : 1));
    const mult = inv > 0 ? (rev / inv).toFixed(1) : '0.0';
    return { ...item, inv, rev, cac, mult };
  });

  const totalOnlineInv = onlineItems.reduce((acc, curr) => acc + curr.inv, 0);
  const totalOnlineRev = onlineItems.reduce((acc, curr) => acc + curr.rev, 0);
  const totalOnlineRoi = totalOnlineInv > 0 ? (totalOnlineRev / totalOnlineInv).toFixed(1) : '14.1';

  // Dynamic Strategic Roadmap Table
  const roadmapItems = [
    {
      initiative: 'D2C First-Party E-Store Expansion',
      mechanism: 'vivo.com/in Direct Web & App',
      budget: Math.round(120 * periodFactor * (filters.sbu_id !== 'ALL' ? 0.6 : 1)),
      cac: Math.round(1250 * (periodFactor < 0.8 ? 0.6 : 1)),
      ltv: customerLtv,
      mult: (customerLtv / (1250 * (periodFactor < 0.8 ? 0.6 : 1))).toFixed(1),
      revenueUplift: Math.round(1850 * periodFactor * (filters.sbu_id !== 'ALL' ? 0.6 : 1)),
    },
    {
      initiative: 'O2O 2-Hour Express Store Pickup',
      mechanism: 'EBO Retail Network Integration',
      budget: Math.round(85 * periodFactor * (filters.sbu_id !== 'ALL' ? 0.6 : 1)),
      cac: Math.round(1350 * (periodFactor < 0.8 ? 0.6 : 1)),
      ltv: offlineLtv,
      mult: (offlineLtv / (1350 * (periodFactor < 0.8 ? 0.6 : 1))).toFixed(1),
      revenueUplift: Math.round(1420 * periodFactor * (filters.sbu_id !== 'ALL' ? 0.6 : 1)),
    },
    {
      initiative: 'AI Automated Replacement Nudges',
      mechanism: 'Funtouch OS / OriginOS Push API',
      budget: Math.round(45 * periodFactor * (filters.sbu_id !== 'ALL' ? 0.6 : 1)),
      cac: Math.round(880 * (periodFactor < 0.8 ? 0.6 : 1)),
      ltv: onlineLtv,
      mult: (onlineLtv / (880 * (periodFactor < 0.8 ? 0.6 : 1))).toFixed(1),
      revenueUplift: Math.round(980 * periodFactor * (filters.sbu_id !== 'ALL' ? 0.6 : 1)),
    },
  ];

  const channelMixData = [
    { name: 'Offline Retail Channel', value: offlineShare, color: '#6366f1' },
    { name: 'Online E-commerce Channel', value: onlineShare, color: '#f59e0b' },
  ];

  const flagshipCities = [
    { city: 'Ahmedabad', status: 'Active Flagship Store' },
    { city: 'Bengaluru', status: 'Active Flagship Store' },
    { city: 'Delhi (Vikas Marg)', status: 'Active Flagship Store' },
    { city: 'Coimbatore', status: 'Active Flagship Store' },
    { city: 'Gurgaon', status: 'Active Flagship Store' },
  ];

  return (
    <div className="space-y-8 pb-12 animate-fade-in text-slate-100 max-w-7xl mx-auto">
      
      {/* Active Filter Notification Bar */}
      {isFiltered && (
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-3 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-200">
          <div className="flex items-center gap-2 font-medium flex-wrap">
            <span className="bg-indigo-500/15 text-indigo-300 border border-indigo-500/30 px-2.5 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider">
              Filter Active
            </span>
            <span className="text-slate-300">
              Period: <strong className="text-indigo-300">{filters.quarter}</strong>
              {filters.region && filters.region !== 'ALL' && <> | Region: <strong className="text-indigo-300">{filters.region}</strong></>}
              {filters.sbu_id && filters.sbu_id !== 'ALL' && <> | SBU: <strong className="text-indigo-300">{filters.sbu_id}</strong></>}
              | Source: <strong className="text-indigo-300">{filters.source_id}</strong>
            </span>
            <span className="bg-slate-800 text-slate-300 px-2 py-0.5 rounded text-[11px] font-medium border border-slate-700">
              {filteredFactMetrics.length} Facts Match
            </span>
          </div>
          <button
            onClick={() => setFilters({ quarter: 'ALL', region: 'ALL', sbu_id: 'ALL', source_id: 'ALL' })}
            className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 cursor-pointer"
          >
            Clear Filters
          </button>
        </div>
      )}

      {/* EXECUTIVE CORE QUESTION BANNER */}
      <div className="glass-panel rounded-2xl p-6 shadow-xl border border-white/10 bg-gradient-to-br from-slate-900 via-slate-950 to-indigo-950/40 relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2 max-w-3xl">
            <div className="flex items-center gap-2">
              <span className="bg-indigo-500/20 text-indigo-300 border border-indigo-400/30 px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider flex items-center gap-1.5">
                <Target className="w-3.5 h-3.5 text-amber-400" />
                Executive Operating Focus
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              How are Vivo's operating channels performing, and where should investments be focused?
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              {bannerDescription}
            </p>
          </div>

          <div className="bg-slate-900/90 border border-indigo-500/30 rounded-xl p-4 text-center shrink-0 min-w-[220px]">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Primary Channel Engine</span>
            <div className="text-2xl font-black text-indigo-300 my-1">{offlineShare}.0% Offline</div>
            <p className="text-[11px] text-slate-400">Online: {onlineShare}% • {sourceLabel}</p>
            {offline62 && (
              <button
                onClick={() => openCitationModal(offline62)}
                className="mt-2 text-[11px] text-indigo-300 hover:text-indigo-200 inline-flex items-center gap-1 font-medium cursor-pointer"
              >
                <ShieldCheck className="w-3 h-3" /> Trace IDC Source
              </button>
            )}
          </div>
        </div>
      </div>

      {/* SECTION 1: CHANNEL PERFORMANCE OVERVIEW */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
            <Store className="w-4 h-4 text-indigo-400" />
            Section 1 — Channel Performance Overview
          </h3>
          <span className="text-xs text-slate-400 font-medium">
            Period: <strong className="text-slate-200">{periodLabel}</strong>
          </span>
        </div>

        {/* 3 Compact KPI Cards (Plus Offline Market Share KPI) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
          {/* Card 1: Offline Share */}
          <div className="glass-card rounded-xl p-4 border border-white/10 space-y-1">
            <div className="flex items-center justify-between text-slate-400 text-[11px] font-semibold">
              <span>Offline Share</span>
              <Store className="w-3.5 h-3.5 text-indigo-400" />
            </div>
            <div className="text-2xl font-black text-white">{offlineShare}.0%</div>
            <div className="text-[10px] text-emerald-400 font-medium flex items-center gap-1 pt-1">
              <CheckCircle2 className="w-3 h-3" />
              <span>+{offlineShare >= 60 ? (offlineShare - 58).toFixed(1) : '2.0'} pts vs YoY</span>
            </div>
          </div>

          {/* Card 2: Online Share */}
          <div className="glass-card rounded-xl p-4 border border-white/10 space-y-1">
            <div className="flex items-center justify-between text-slate-400 text-[11px] font-semibold">
              <span>Online Share</span>
              <Globe className="w-3.5 h-3.5 text-amber-400" />
            </div>
            <div className="text-2xl font-black text-white">{onlineShare}.0%</div>
            <div className="text-[10px] text-amber-400 font-medium flex items-center gap-1 pt-1">
              <span>Ecommerce Channel ({sourceLabel})</span>
            </div>
          </div>

          {/* Card 3: Total Retail Presence */}
          <div className="glass-card rounded-xl p-4 border border-white/10 space-y-1">
            <div className="flex items-center justify-between text-slate-400 text-[11px] font-semibold">
              <span>Total Retail Presence</span>
              <Building className="w-3.5 h-3.5 text-cyan-400" />
            </div>
            <div className="text-2xl font-black text-white">{eboCount}+ Stores</div>
            <div className="text-[10px] text-slate-400 font-medium pt-1">
              280+ Cities • {expCenterCount} Exp. Centers
            </div>
          </div>

          {/* Card 4: Offline Market Share KPI */}
          <div className="glass-card rounded-xl p-4 border border-white/10 space-y-1">
            <div className="flex items-center justify-between text-slate-400 text-[11px] font-semibold">
              <span>Offline Market Leader</span>
              <Award className="w-3.5 h-3.5 text-amber-400" />
            </div>
            <div className="text-2xl font-black text-emerald-400">#1 Brand</div>
            <div className="text-[10px] text-emerald-300 font-medium pt-1">
              62% National Offline Share
            </div>
          </div>
        </div>

        {/* Channel Mix Chart & Retail Footprint */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          
          {/* Channel Mix Donut Chart */}
          <div className="glass-panel rounded-2xl p-5 border border-white/10 space-y-3">
            <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
              <div>
                <h4 className="text-sm font-extrabold text-white flex items-center gap-2">
                  <PieChartIcon className="w-4 h-4 text-indigo-400" />
                  Channel Mix Ratio ({periodLabel})
                </h4>
                <p className="text-[11px] text-slate-400">Offline distribution vs E-commerce online split</p>
              </div>
              {offline62 && (
                <button
                  onClick={() => openCitationModal(offline62)}
                  className="text-[11px] text-indigo-300 hover:text-indigo-200 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20 font-medium cursor-pointer"
                >
                  <ShieldCheck className="w-3 h-3 inline mr-1" /> Trace IDC
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
              <div className="h-44 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={channelMixData}
                      cx="50%"
                      cy="50%"
                      innerRadius={42}
                      outerRadius={68}
                      paddingAngle={4}
                      dataKey="value"
                      stroke="#020617"
                      strokeWidth={2}
                    >
                      {channelMixData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#0F172A', borderColor: '#334155', borderRadius: '8px', fontSize: '11px', color: '#FFF' }}
                      formatter={(val: any) => [`${val}%`, 'Share']}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="space-y-2.5 text-xs">
                <div className="bg-slate-900/80 p-3 rounded-lg border border-indigo-500/20">
                  <div className="flex items-center justify-between text-indigo-300 font-bold">
                    <span className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-indigo-500" />
                      Offline Retail
                    </span>
                    <span>{offlineShare}.0%</span>
                  </div>
                  <div className="text-[10px] text-slate-400 mt-1 flex justify-between">
                    <span>{periodBaselineLabel}</span>
                    <span className="text-emerald-400 font-semibold">+{offlineShare >= 60 ? (offlineShare - 58).toFixed(1) : '2.0'} pts</span>
                  </div>
                </div>

                <div className="bg-slate-900/80 p-3 rounded-lg border border-amber-500/20">
                  <div className="flex items-center justify-between text-amber-300 font-bold">
                    <span className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-amber-500" />
                      Online E-Commerce
                    </span>
                    <span>{onlineShare}.0%</span>
                  </div>
                  <div className="text-[10px] text-slate-400 mt-1 flex justify-between">
                    <span>Digital Marketplace Share</span>
                    <span className="text-amber-400 font-semibold">{onlineShare}% Target</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Retail Footprint & Infrastructure */}
          <div className="glass-panel rounded-2xl p-5 border border-white/10 space-y-3">
            <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
              <div>
                <h4 className="text-sm font-extrabold text-white flex items-center gap-2">
                  <Building className="w-4 h-4 text-cyan-400" />
                  Retail Footprint Infrastructure
                </h4>
                <p className="text-[11px] text-slate-400">Exclusive outlets, experience hubs & flagship superstores</p>
              </div>
              {eboStores && (
                <button
                  onClick={() => openCitationModal(eboStores)}
                  className="text-[11px] text-slate-300 hover:text-white bg-slate-800 px-2 py-0.5 rounded border border-slate-700 font-medium cursor-pointer"
                >
                  <ShieldCheck className="w-3 h-3 inline mr-1 text-indigo-400" /> Proof
                </button>
              )}
            </div>

            <div className="grid grid-cols-2 gap-3 text-center">
              <div className="bg-slate-900/80 p-3 rounded-xl border border-white/5">
                <div className="text-2xl font-black text-white">{eboCount}+</div>
                <div className="text-[11px] font-semibold text-slate-300 mt-0.5">Exclusive Brand Outlets</div>
                <div className="text-[10px] text-indigo-400">280+ cities ({periodLabel})</div>
              </div>

              <div className="bg-slate-900/80 p-3 rounded-xl border border-white/5">
                <div className="text-2xl font-black text-white">{expCenterCount}+</div>
                <div className="text-[11px] font-semibold text-slate-300 mt-0.5">Experience Centres</div>
                <div className="text-[10px] text-emerald-400">+ 5 Flagship Superstores</div>
              </div>
            </div>

            {/* Flagship Locations */}
            <div className="space-y-1.5">
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">5 Key Flagship Stores</div>
              <div className="grid grid-cols-3 gap-1.5 text-[11px]">
                {flagshipCities.map(item => (
                  <div key={item.city} className="bg-slate-900/60 p-1.5 rounded border border-white/5 flex items-center gap-1.5">
                    <MapPin className="w-3 h-3 text-rose-400 shrink-0" />
                    <span className="font-medium text-slate-200 truncate">{item.city}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* SECTION 2: PRODUCT PORTFOLIO */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
            <Layers className="w-4 h-4 text-indigo-400" />
            Section 2 — Product Portfolio (SBU Strategy)
          </h3>
          {xSeriesGrowthFact && (
            <button
              onClick={() => openCitationModal(xSeriesGrowthFact)}
              className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center gap-1 font-medium cursor-pointer"
            >
              <ShieldCheck className="w-3.5 h-3.5" /> Counterpoint SBU Report
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          {/* Card 1: X Series */}
          <div className="glass-panel rounded-xl p-4 border border-white/10 space-y-2.5">
            <div className="flex items-center justify-between border-b border-white/10 pb-2">
              <div className="font-black text-white text-base">X Series</div>
              <span className="text-[10px] font-bold bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/30">
                {xSeriesGrowth}
              </span>
            </div>
            <div className="space-y-1.5 text-xs">
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400">Product Positioning:</span>
                <p className="text-slate-200 font-medium">Premium Flagship Camera Line</p>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400">Target Segment:</span>
                <p className="text-slate-200 font-medium">Premium Buyers (&gt;₹30,000)</p>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400">Key Strength:</span>
                <p className="text-slate-200 font-medium">Zeiss Optics & Dedicated V3 Imaging Chip</p>
              </div>
            </div>
          </div>

          {/* Card 2: V Series */}
          <div className="glass-panel rounded-xl p-4 border border-white/10 space-y-2.5">
            <div className="flex items-center justify-between border-b border-white/10 pb-2">
              <div className="font-black text-white text-base">V Series</div>
              <span className="text-[10px] font-bold bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded border border-purple-500/30">
                Camera & Design Leader
              </span>
            </div>
            <div className="space-y-1.5 text-xs">
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400">Product Positioning:</span>
                <p className="text-slate-200 font-medium">Upper Mid-Range Portrait Camera</p>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400">Target Segment:</span>
                <p className="text-slate-200 font-medium">Design & Selfie Enthusiasts (₹20k–₹35k)</p>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400">Key Strength:</span>
                <p className="text-slate-200 font-medium">Aura Light Portraiture & Slim Curved Glass</p>
              </div>
            </div>
          </div>

          {/* Card 3: Y Series */}
          <div className="glass-panel rounded-xl p-4 border border-white/10 space-y-2.5">
            <div className="flex items-center justify-between border-b border-white/10 pb-2">
              <div className="font-black text-white text-base">Y Series</div>
              <span className="text-[10px] font-bold bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded border border-amber-500/30">
                Mass Volume Driver
              </span>
            </div>
            <div className="space-y-1.5 text-xs">
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400">Product Positioning:</span>
                <p className="text-slate-200 font-medium">Affordable Mass-Market Everyday Phone</p>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400">Target Segment:</span>
                <p className="text-slate-200 font-medium">First-time 5G & Value Buyers (&lt;₹20,000)</p>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400">Key Strength:</span>
                <p className="text-slate-200 font-medium">Mass Distribution & Long Battery Life</p>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* SECTION 3: CHANNEL INVESTMENT ANALYSIS */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-emerald-400" />
              Section 3 — Channel Investment Analysis
            </h3>
            <p className="text-xs text-slate-400">Compare physical retail distribution returns against digital e-commerce efficiency.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          
          {/* Card 1: Offline Channel Investment */}
          <div className="glass-panel rounded-2xl p-5 border border-white/10 space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div>
                <h4 className="text-base font-extrabold text-white flex items-center gap-2">
                  <Store className="w-4 h-4 text-indigo-400" />
                  Offline Channel Investment
                </h4>
                <p className="text-xs text-slate-400">Physical retail footprint & promoter network</p>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-slate-400 font-bold uppercase block">Return Multiple</span>
                <span className="text-emerald-400 font-black text-lg">{totalOfflineRoi}x</span>
              </div>
            </div>

            <div className="flex items-center justify-between bg-slate-900/80 p-3 rounded-xl border border-white/5 text-xs">
              <div>
                <span className="text-slate-400 block text-[10px] font-bold uppercase">Total Investment</span>
                <strong className="text-white text-sm">₹{totalOfflineInv.toLocaleString('en-IN')} Cr</strong>
              </div>
              <div className="text-right">
                <span className="text-slate-400 block text-[10px] font-bold uppercase">Attributed Return</span>
                <strong className="text-emerald-400 text-sm">₹{totalOfflineRev.toLocaleString('en-IN')} Cr</strong>
              </div>
            </div>

            {/* Table with key default columns */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-900/90 text-slate-400 font-bold uppercase text-[10px] border-b border-white/10">
                    <th className="py-2.5 px-3">Channel</th>
                    <th className="py-2.5 px-3 text-right">Investment</th>
                    <th className="py-2.5 px-3 text-right">Revenue Return</th>
                    <th className="py-2.5 px-3 text-center">ROI Multiple</th>
                    {showOfflineDetails && (
                      <>
                        <th className="py-2.5 px-3">Scope & Scale</th>
                        <th className="py-2.5 px-3 text-right">CAC / User</th>
                      </>
                    )}
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {offlineItems.map((item) => (
                    <tr key={item.name} className="hover:bg-slate-900/50 transition-colors">
                      <td className="py-2.5 px-3">
                        <div className="font-bold text-white">{item.name}</div>
                        <div className="text-[10px] text-slate-400">{item.desc}</div>
                      </td>
                      <td className="py-2.5 px-3 text-right font-mono font-bold text-slate-200">₹{item.inv} Cr</td>
                      <td className="py-2.5 px-3 text-right font-mono font-bold text-emerald-400">₹{item.rev.toLocaleString('en-IN')} Cr</td>
                      <td className="py-2.5 px-3 text-center">
                        <span className="bg-emerald-500/15 text-emerald-300 px-2 py-0.5 rounded font-extrabold text-[11px] border border-emerald-500/30">
                          {item.mult}x
                        </span>
                      </td>
                      {showOfflineDetails && (
                        <>
                          <td className="py-2.5 px-3 text-slate-300 text-[11px]">{item.scope}</td>
                          <td className="py-2.5 px-3 text-right font-mono text-slate-300">₹{item.cac.toLocaleString('en-IN')}</td>
                        </>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <button
              onClick={() => setShowOfflineDetails(!showOfflineDetails)}
              className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-indigo-300 hover:text-indigo-200 border border-indigo-500/20 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
            >
              {showOfflineDetails ? (
                <>Hide Details <ChevronUp className="w-3.5 h-3.5" /></>
              ) : (
                <>View Details (Scope & CAC) <ChevronDown className="w-3.5 h-3.5" /></>
              )}
            </button>
          </div>

          {/* Card 2: Online Channel Investment */}
          <div className="glass-panel rounded-2xl p-5 border border-white/10 space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div>
                <h4 className="text-base font-extrabold text-white flex items-center gap-2">
                  <Globe className="w-4 h-4 text-amber-400" />
                  Online Channel Investment
                </h4>
                <p className="text-xs text-slate-400">Digital ads, performance media & D2C D-store</p>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-slate-400 font-bold uppercase block">Return Multiple</span>
                <span className="text-emerald-400 font-black text-lg">{totalOnlineRoi}x</span>
              </div>
            </div>

            <div className="flex items-center justify-between bg-slate-900/80 p-3 rounded-xl border border-white/5 text-xs">
              <div>
                <span className="text-slate-400 block text-[10px] font-bold uppercase">Total Investment</span>
                <strong className="text-white text-sm">₹{totalOnlineInv.toLocaleString('en-IN')} Cr</strong>
              </div>
              <div className="text-right">
                <span className="text-slate-400 block text-[10px] font-bold uppercase">Attributed Return</span>
                <strong className="text-emerald-400 text-sm">₹{totalOnlineRev.toLocaleString('en-IN')} Cr</strong>
              </div>
            </div>

            {/* Table with key default columns */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-900/90 text-slate-400 font-bold uppercase text-[10px] border-b border-white/10">
                    <th className="py-2.5 px-3">Channel</th>
                    <th className="py-2.5 px-3 text-right">Investment</th>
                    <th className="py-2.5 px-3 text-right">Revenue Return</th>
                    <th className="py-2.5 px-3 text-center">ROI Multiple</th>
                    {showOnlineDetails && (
                      <>
                        <th className="py-2.5 px-3">Scope & Platform</th>
                        <th className="py-2.5 px-3 text-right">CAC / User</th>
                      </>
                    )}
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {onlineItems.map((item) => (
                    <tr key={item.name} className="hover:bg-slate-900/50 transition-colors">
                      <td className="py-2.5 px-3">
                        <div className="font-bold text-white">{item.name}</div>
                        <div className="text-[10px] text-slate-400">{item.desc}</div>
                      </td>
                      <td className="py-2.5 px-3 text-right font-mono font-bold text-slate-200">₹{item.inv} Cr</td>
                      <td className="py-2.5 px-3 text-right font-mono font-bold text-emerald-400">₹{item.rev.toLocaleString('en-IN')} Cr</td>
                      <td className="py-2.5 px-3 text-center">
                        <span className="bg-emerald-500/15 text-emerald-300 px-2 py-0.5 rounded font-extrabold text-[11px] border border-emerald-500/30">
                          {item.mult}x
                        </span>
                      </td>
                      {showOnlineDetails && (
                        <>
                          <td className="py-2.5 px-3 text-slate-300 text-[11px]">{item.scope}</td>
                          <td className="py-2.5 px-3 text-right font-mono text-slate-300">₹{item.cac.toLocaleString('en-IN')}</td>
                        </>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <button
              onClick={() => setShowOnlineDetails(!showOnlineDetails)}
              className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-amber-300 hover:text-amber-200 border border-amber-500/20 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
            >
              {showOnlineDetails ? (
                <>Hide Details <ChevronUp className="w-3.5 h-3.5" /></>
              ) : (
                <>View Details (Scope & CAC) <ChevronDown className="w-3.5 h-3.5" /></>
              )}
            </button>
          </div>

        </div>
      </div>

      {/* SECTION 4: STRATEGY & RECOMMENDATIONS (UNIFIED TABBED SECTION) */}
      <div className="glass-panel rounded-2xl p-6 shadow-xl border border-white/10 space-y-5">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
          <div>
            <h3 className="text-base sm:text-lg font-black text-white flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-amber-400" />
              Section 4 — Strategy & Recommendations
            </h3>
            <p className="text-xs text-slate-300 mt-0.5">
              Strategic roadmap, historical roadblocks, budget initiatives, marketing assets, and IPL sponsorship context.
            </p>
          </div>

          {/* Unit Economics Highlight Pill */}
          <div className="bg-slate-900 border border-emerald-500/30 rounded-xl px-3.5 py-1.5 text-xs text-right shrink-0">
            <span className="text-[10px] text-slate-400 font-bold uppercase block">Online Efficiency Advantage</span>
            <span className="text-emerald-400 font-bold">{onlineRatio}x Online LTV:CAC vs {offlineRatio}x Offline</span>
          </div>
        </div>

        {/* Tab Selection Bar */}
        <div className="flex flex-wrap items-center gap-2 border-b border-white/10 pb-3">
          <button
            onClick={() => setActiveStrategyTab('solutions')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeStrategyTab === 'solutions'
                ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20'
                : 'bg-slate-900 text-slate-300 hover:bg-slate-800'
            }`}
          >
            <Lightbulb className="w-3.5 h-3.5" />
            Solutions
          </button>

          <button
            onClick={() => setActiveStrategyTab('problems')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeStrategyTab === 'problems'
                ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/20'
                : 'bg-slate-900 text-slate-300 hover:bg-slate-800'
            }`}
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Problems (Roadblocks)
          </button>

          <button
            onClick={() => setActiveStrategyTab('initiatives')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeStrategyTab === 'initiatives'
                ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/20'
                : 'bg-slate-900 text-slate-300 hover:bg-slate-800'
            }`}
          >
            <Briefcase className="w-3.5 h-3.5" />
            Initiatives
          </button>

          <button
            onClick={() => setActiveStrategyTab('marketing')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeStrategyTab === 'marketing'
                ? 'bg-purple-500 text-white shadow-lg shadow-purple-500/20'
                : 'bg-slate-900 text-slate-300 hover:bg-slate-800'
            }`}
          >
            <Award className="w-3.5 h-3.5" />
            Marketing Assets
          </button>

          <button
            onClick={() => setActiveStrategyTab('notes')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeStrategyTab === 'notes'
                ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/20'
                : 'bg-slate-900 text-slate-300 hover:bg-slate-800'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            Business Notes
          </button>
        </div>

        {/* Tab Content Panel */}
        <div className="bg-slate-900/80 border border-white/5 rounded-xl p-5 space-y-4">
          
          {/* TAB 1: SOLUTIONS */}
          {activeStrategyTab === 'solutions' && (
            <div className="space-y-4 animate-fade-in">
              <div className="flex items-center justify-between border-b border-white/10 pb-2">
                <h4 className="font-bold text-emerald-400 text-sm flex items-center gap-2">
                  <Lightbulb className="w-4 h-4" />
                  Actionable Strategic Pillars (To Scale Online Share from {onlineShare}% to 48%)
                </h4>
                <span className="text-[10px] text-emerald-300 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 font-bold">
                  2026–2027 Horizon
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                {/* Pillar 1 */}
                <div className="bg-slate-950 p-4 rounded-xl border border-white/5 space-y-2">
                  <div className="flex items-center justify-between text-emerald-300 font-bold">
                    <span>Pillar 1: D2C Acceleration</span>
                    <span className="text-[10px] font-mono">CAC: ₹1,250</span>
                  </div>
                  <ul className="space-y-1.5 text-slate-300 list-disc list-inside leading-relaxed">
                    <li>Upgrade <strong>vivo.com/in</strong> direct portal with exclusive online launches.</li>
                    <li>Instant trade-in valuation & 0%-EMI with HDFC and Bajaj Finserv.</li>
                    <li>Double direct e-store volume contribution within 12 months.</li>
                  </ul>
                </div>

                {/* Pillar 2 */}
                <div className="bg-slate-950 p-4 rounded-xl border border-white/5 space-y-2">
                  <div className="flex items-center justify-between text-indigo-300 font-bold">
                    <span>Pillar 2: O2O Express Pickup</span>
                    <span className="text-[10px] font-mono">{eboCount}+ Nodes</span>
                  </div>
                  <ul className="space-y-1.5 text-slate-300 list-disc list-inside leading-relaxed">
                    <li>Enable <strong>"Buy Online, 2-Hour EBO Pickup"</strong> across 600+ Exclusive Stores.</li>
                    <li>6% fulfillment margin to EBO franchise owners to resolve channel conflict.</li>
                    <li>Convert online intent into immediate physical store pickup.</li>
                  </ul>
                </div>

                {/* Pillar 3 */}
                <div className="bg-slate-950 p-4 rounded-xl border border-white/5 space-y-2">
                  <div className="flex items-center justify-between text-amber-300 font-bold">
                    <span>Pillar 3: AI Lifecycle Nudging</span>
                    <span className="text-[10px] font-mono">LTV: ₹18,500</span>
                  </div>
                  <ul className="space-y-1.5 text-slate-300 list-disc list-inside leading-relaxed">
                    <li>Deploy OS-level automated upgrade nudges at month 20 of device cycle.</li>
                    <li>Pair with tech reviewer livestream commerce on YouTube & Instagram.</li>
                    <li>Achieve higher customer retention with lower acquisition friction.</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: PROBLEMS (ROADBLOCKS) */}
          {activeStrategyTab === 'problems' && (
            <div className="space-y-4 animate-fade-in">
              <div className="flex items-center justify-between border-b border-white/10 pb-2">
                <h4 className="font-bold text-rose-300 text-sm flex items-center gap-2">
                  <RefreshCw className="w-4 h-4 text-rose-400" />
                  Historical Roadblocks & Previous Online Approach
                </h4>
                <span className="text-[10px] text-slate-400 bg-slate-800 px-2 py-0.5 rounded font-bold">
                  Baseline Context
                </span>
              </div>

              <div className="space-y-3 text-xs">
                <div className="bg-slate-950 p-3.5 rounded-xl border border-white/5 space-y-1">
                  <div className="font-bold text-white flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-rose-400" />
                    Marketplace Event Reliance
                  </div>
                  <p className="text-slate-300 leading-relaxed pl-3.5">
                    82% of online volume flowed through Flipkart and Amazon seasonal events (Big Billion Days). While driving high unit volume (₹310 Cr ad spend), it squeezed gross margins and yielded zero direct customer ownership.
                  </p>
                </div>

                <div className="bg-slate-950 p-3.5 rounded-xl border border-white/5 space-y-1">
                  <div className="font-bold text-white flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-amber-400" />
                    Underdeveloped Direct D2C Store (vivo.com/in)
                  </div>
                  <p className="text-slate-300 leading-relaxed pl-3.5">
                    Direct website sales generated only ~10% of online sales due to lack of online-exclusive colorways, slower delivery times compared to marketplaces, and limited trade-in finance options.
                  </p>
                </div>

                <div className="bg-slate-950 p-3.5 rounded-xl border border-white/5 space-y-1">
                  <div className="font-bold text-white flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-indigo-400" />
                    Dealer Channel Friction & Margin Protection
                  </div>
                  <p className="text-slate-300 leading-relaxed pl-3.5">
                    Offline multi-brand retailers resisted aggressive online pricing discounting, fearing stock cannibalization. This restricted online-only series releases and limited omni-channel pickup models.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: INITIATIVES */}
          {activeStrategyTab === 'initiatives' && (
            <div className="space-y-3 animate-fade-in">
              <div className="flex items-center justify-between border-b border-white/10 pb-2">
                <h4 className="font-bold text-indigo-300 text-sm flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-indigo-400" />
                  Budget Initiatives & Financial Roadmap ({periodLabel})
                </h4>
                <span className="text-[10px] text-indigo-300 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20 font-bold">
                  Strategic Allocation
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-950 text-slate-400 uppercase font-bold text-[10px] border-b border-white/10">
                      <th className="py-2.5 px-3">Initiative</th>
                      <th className="py-2.5 px-3">Mechanism</th>
                      <th className="py-2.5 px-3 text-right">Projected Budget</th>
                      <th className="py-2.5 px-3 text-right">Target CAC</th>
                      <th className="py-2.5 px-3 text-right">Target LTV</th>
                      <th className="py-2.5 px-3 text-center">LTV:CAC</th>
                      <th className="py-2.5 px-3 text-right">Revenue Uplift</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {roadmapItems.map((row) => (
                      <tr key={row.initiative} className="hover:bg-slate-950/50 transition-colors">
                        <td className="py-2.5 px-3 font-bold text-white">{row.initiative}</td>
                        <td className="py-2.5 px-3 text-slate-300">{row.mechanism}</td>
                        <td className="py-2.5 px-3 text-right font-mono text-slate-200">₹{row.budget.toLocaleString('en-IN')} Cr</td>
                        <td className="py-2.5 px-3 text-right font-mono text-emerald-400">₹{row.cac.toLocaleString('en-IN')}</td>
                        <td className="py-2.5 px-3 text-right font-mono text-emerald-400">₹{row.ltv.toLocaleString('en-IN')}</td>
                        <td className="py-2.5 px-3 text-center font-black text-emerald-400">{row.mult}x</td>
                        <td className="py-2.5 px-3 text-right font-mono text-emerald-400 font-bold">+₹{row.revenueUplift.toLocaleString('en-IN')} Cr</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 4: MARKETING ASSETS */}
          {activeStrategyTab === 'marketing' && (
            <div className="space-y-3 animate-fade-in">
              <div className="flex items-center justify-between border-b border-white/10 pb-2">
                <h4 className="font-bold text-purple-300 text-sm flex items-center gap-2">
                  <Award className="w-4 h-4 text-purple-400" />
                  Active Brand Ambassador Roster (2025–2026)
                </h4>
                <span className="text-[10px] text-slate-400 bg-slate-800 px-2 py-0.5 rounded font-bold">
                  SBU Audience Alignment
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                {/* Ambassador 1 */}
                <div className="bg-slate-950 p-4 rounded-xl border border-purple-500/20 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold text-white text-sm">Sidharth Malhotra & Kiara Advani</span>
                    <span className="px-2 py-0.5 bg-purple-500/20 text-purple-300 border border-purple-500/30 rounded font-bold text-[10px]">
                      V-Series
                    </span>
                  </div>
                  <ul className="space-y-1 text-slate-300 text-[11px]">
                    <li><strong>Appointed:</strong> September 2025</li>
                    <li><strong>Role:</strong> Premium Bollywood celebrity power pairing</li>
                    <li><strong>Targeting:</strong> Upper mid-range portrait camera & style audience</li>
                  </ul>
                </div>

                {/* Ambassador 2 */}
                <div className="bg-slate-950 p-4 rounded-xl border border-amber-500/20 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold text-white text-sm">Suhana Khan</span>
                    <span className="px-2 py-0.5 bg-amber-500/20 text-amber-300 border border-amber-500/30 rounded font-bold text-[10px]">
                      Y-Series
                    </span>
                  </div>
                  <ul className="space-y-1 text-slate-300 text-[11px]">
                    <li><strong>Appointed:</strong> November 2024</li>
                    <li><strong>Role:</strong> Youth social-media icon</li>
                    <li><strong>Targeting:</strong> Gen-Z & first-time smartphone consumers</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: BUSINESS NOTES */}
          {activeStrategyTab === 'notes' && (
            <div className="space-y-4 animate-fade-in">
              <div className="flex items-center justify-between border-b border-white/10 pb-2">
                <h4 className="font-bold text-amber-300 text-sm flex items-center gap-2">
                  <FileText className="w-4 h-4 text-amber-400" />
                  Key Business & Sponsorship Context Notes
                </h4>
                <span className="text-[10px] text-amber-300 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20 font-bold">
                  Corporate Governance
                </span>
              </div>

              <div className="space-y-3 text-xs">
                {/* IPL Sponsorship Correction Box */}
                <div className="bg-slate-950 p-4 rounded-xl border border-rose-500/30 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-rose-300 flex items-center gap-1.5 text-xs">
                      <Ban className="w-4 h-4 text-rose-400" />
                      IPL Title Sponsorship Status (Correction Notice)
                    </span>
                    <span className="text-[10px] bg-rose-500/20 text-rose-300 px-2 py-0.5 rounded font-bold">
                      Historical Legacy
                    </span>
                  </div>
                  <p className="text-slate-300 leading-relaxed text-[11px]">
                    <strong>Important Specification Note:</strong> Vivo is <strong>NO LONGER</strong> the IPL title sponsor.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-slate-400 pt-1">
                    <div className="bg-slate-900 p-2 rounded border border-white/5">
                      <span className="block font-semibold text-slate-300">2016–2017 Contract:</span> ~₹100 Cr / year
                    </div>
                    <div className="bg-slate-900 p-2 rounded border border-white/5">
                      <span className="block font-semibold text-slate-300">2018–2021 Contract:</span> ₹2,199 Cr (~₹440 Cr / yr)
                    </div>
                  </div>
                  <p className="text-[10px] text-slate-400 italic pt-1">
                    *Exit Date: Exited prior to 2022 season. Tata Group holds the IPL title sponsorship since 2022. IPL sponsorship must NOT be listed as an active line item in current marketing spend.
                  </p>
                </div>

                {/* Synthetic Data Note */}
                <div className="bg-slate-950 p-3.5 rounded-xl border border-white/5 space-y-1">
                  <div className="font-bold text-amber-300 flex items-center gap-1.5 text-xs">
                    <Sparkles className="w-3.5 h-3.5" />
                    Synthetic Industry Benchmark Data
                  </div>
                  <p className="text-slate-300 text-[11px] leading-relaxed">
                    In-store promoter salaries, trade margins, and store rents are supplemented with synthetic industry benchmark data to calculate total ROI and unit economics across regions and SBUs.
                  </p>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>

    </div>
  );
};
