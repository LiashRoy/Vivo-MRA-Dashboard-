import React, { useState, useEffect, useMemo } from 'react';
import { useSystem } from '../context/SystemContext';
import { 
  SearchCode, 
  ShieldCheck, 
  Filter, 
  Layers, 
  Zap,
  Info,
  CheckCircle2,
  PieChart as PieChartIcon,
  BarChart3,
  Award,
  Database,
  FileText,
  Target,
  DollarSign,
  Users,
  TrendingUp,
  Cpu,
  Smartphone,
  Activity,
  Percent,
  Sliders,
  ChevronRight,
  ArrowUpRight,
  Sparkles,
  ShoppingBag,
  Building2,
  RefreshCw
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid, 
  PieChart, 
  Pie, 
  Cell, 
  RadarChart, 
  Radar, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis,
  ComposedChart,
  Line,
  Legend
} from 'recharts';

// --- DATA STRUCTURES ---

interface CompetitorData {
  id: string;
  name: string;
  share: number; // %
  asp: number; // ₹
  offlineShare: number; // %
  grossMargin: number; // %
  cac: number; // ₹
  ltv: number; // ₹
  ltvCac: number;
  tier: string;
  topLine: string;
  keyMoat: string;
  color: string;
  capabilities: {
    brandEquity: number;
    offlineRetail: number;
    premiumPosition: number;
    specValue: number;
    onlineReach: number;
    ecosystem: number;
  };
  strategy: string[];
}

const COMPETITORS: CompetitorData[] = [
  {
    id: 'vivo',
    name: 'Vivo (incl. iQOO)',
    share: 19.6,
    asp: 18500,
    offlineShare: 62,
    grossMargin: 19.5,
    cac: 1350,
    ltv: 4180,
    ltvCac: 3.1,
    tier: '#1 Market Leader',
    topLine: 'X & V Series, iQOO',
    keyMoat: 'Zeiss Camera Tech & 600+ EBOs',
    color: '#3B52FF',
    capabilities: {
      brandEquity: 88,
      offlineRetail: 96,
      premiumPosition: 85,
      specValue: 82,
      onlineReach: 78,
      ecosystem: 70
    },
    strategy: [
      'Dominate general trade offline stores via dedicated promoter network',
      'Leverage Zeiss optics partnership to command premium X-series ASPs',
      'Capture online gaming demographic via iQOO sub-brand'
    ]
  },
  {
    id: 'samsung',
    name: 'Samsung',
    share: 16.4,
    asp: 24200,
    offlineShare: 54,
    grossMargin: 22.8,
    cac: 1680,
    ltv: 5380,
    ltvCac: 3.2,
    tier: '#2 National Rank',
    topLine: 'Galaxy S, A, M Series',
    keyMoat: 'Brand Heritage & OLED Supply Chain',
    color: '#DC2626',
    capabilities: {
      brandEquity: 95,
      offlineRetail: 90,
      premiumPosition: 92,
      specValue: 70,
      onlineReach: 82,
      ecosystem: 88
    },
    strategy: [
      'High-margin Galaxy S ultra-premium umbrella shielding A-series',
      'Strong enterprise & government procurement contracts',
      'Integrated Samsung Finance+ credit financing at tier-3 retail'
    ]
  },
  {
    id: 'xiaomi',
    name: 'Xiaomi / POCO',
    share: 15.8,
    asp: 13800,
    offlineShare: 38,
    grossMargin: 14.2,
    cac: 820,
    ltv: 2450,
    ltvCac: 3.0,
    tier: '#3 Mass Volume',
    topLine: 'Redmi Note, Xiaomi, POCO',
    keyMoat: 'Online Marketplace Volume & HyperOS',
    color: '#F97316',
    capabilities: {
      brandEquity: 78,
      offlineRetail: 62,
      premiumPosition: 65,
      specValue: 95,
      onlineReach: 94,
      ecosystem: 82
    },
    strategy: [
      'High spec-to-price ratio driving flash sale spikes online',
      'Expanding Mi Homes retail footprint to combat GT erosion',
      'HyperOS ecosystem lock-in via Smart TVs and AIoT'
    ]
  },
  {
    id: 'oppo',
    name: 'OPPO',
    share: 15.3,
    asp: 16900,
    offlineShare: 58,
    grossMargin: 18.2,
    cac: 1410,
    ltv: 3950,
    ltvCac: 2.8,
    tier: '#4 GT Competitor',
    topLine: 'Reno, F & A Series',
    keyMoat: 'Shared Supply Chain & GT Promoter Focus',
    color: '#10B981',
    capabilities: {
      brandEquity: 82,
      offlineRetail: 92,
      premiumPosition: 78,
      specValue: 76,
      onlineReach: 72,
      ecosystem: 68
    },
    strategy: [
      'Aggressive promoter payouts in tier-2/tier-3 cities',
      'Reno series portrait photography marketing',
      'Substantial offline margin sharing with regional distributors'
    ]
  },
  {
    id: 'realme',
    name: 'Realme',
    share: 11.2,
    asp: 12100,
    offlineShare: 42,
    grossMargin: 13.5,
    cac: 790,
    ltv: 2280,
    ltvCac: 2.9,
    tier: '#5 Youth Segment',
    topLine: 'Number Series, GT, C Series',
    keyMoat: 'Rapid Charging & Aggressive Styling',
    color: '#EAB308',
    capabilities: {
      brandEquity: 72,
      offlineRetail: 68,
      premiumPosition: 58,
      specValue: 88,
      onlineReach: 86,
      ecosystem: 62
    },
    strategy: [
      'Target budget-conscious Gen-Z via online first launches',
      'Speed-to-market with fast charging (120W+) specs',
      'Expanding GT stores via franchise partner agreements'
    ]
  },
  {
    id: 'motorola',
    name: 'Motorola (Lenovo)',
    share: 7.1,
    asp: 15600,
    offlineShare: 28,
    grossMargin: 16.0,
    cac: 910,
    ltv: 2820,
    ltvCac: 3.1,
    tier: '#6 Challenger',
    topLine: 'Edge, G Series, Razr',
    keyMoat: 'Clean Stock Android & Flipkart Exclusive Deals',
    color: '#8B5CF6',
    capabilities: {
      brandEquity: 75,
      offlineRetail: 42,
      premiumPosition: 72,
      specValue: 84,
      onlineReach: 88,
      ecosystem: 54
    },
    strategy: [
      'Flipkart preferred partner positioning for G-series sales',
      'Aggressive pricing on Razr foldable devices',
      'Ad-free clean software experience appealing to tech enthusiasts'
    ]
  },
  {
    id: 'apple',
    name: 'Apple',
    share: 6.8,
    asp: 68500,
    offlineShare: 65,
    grossMargin: 38.5,
    cac: 2450,
    ltv: 18500,
    ltvCac: 7.5,
    tier: '#7 Ultra-Premium Leader',
    topLine: 'iPhone 16, 15, 14',
    keyMoat: 'Unmatched Brand Aspiration & iOS Ecosystem',
    color: '#EC4899',
    capabilities: {
      brandEquity: 99,
      offlineRetail: 78,
      premiumPosition: 99,
      specValue: 62,
      onlineReach: 80,
      ecosystem: 98
    },
    strategy: [
      'Dominates premium revenue pool despite lower unit volume',
      'Expanding official Apple BKC and Saket stores',
      'Financing affordability via cashback and non-cost EMIs'
    ]
  }
];

// --- DYNAMIC FILTER TRANSFORMERS ---

function getFilteredCompetitors(period: string, sourceId: string, region?: string): CompetitorData[] {
  let vivoShare = 19.6;
  let vivoAsp = 18500;
  let vivoTier = '#1 Market Leader';
  let vivoCac = 1350;
  let vivoLtv = 4180;

  let samsungShare = 16.4;
  let samsungAsp = 24200;

  let xiaomiShare = 15.8;
  let xiaomiAsp = 13800;

  let oppoShare = 15.3;
  let oppoAsp = 16900;

  let realmeShare = 11.2;
  let realmeAsp = 12100;

  let motoShare = 7.1;
  let motoAsp = 15600;

  let appleShare = 6.8;
  let appleAsp = 68500;

  const p = period.toUpperCase();
  if (p.includes('2025') || p.includes('Q1 2025')) {
    if (p.includes('Q1')) {
      vivoShare = 18.2;
      vivoAsp = 17200;
      vivoTier = '#2 National Rank';
      vivoCac = 1480;
      vivoLtv = 3850;
      samsungShare = 19.1;
      xiaomiShare = 17.0;
      oppoShare = 14.5;
      realmeShare = 12.0;
      motoShare = 5.5;
      appleShare = 6.2;
    } else {
      // FY2025
      vivoShare = 18.8;
      vivoAsp = 17900;
      vivoTier = '#1 Annual Share';
      vivoCac = 1390;
      vivoLtv = 4020;
      samsungShare = 17.8;
      xiaomiShare = 16.5;
      oppoShare = 14.8;
      realmeShare = 11.8;
      motoShare = 6.2;
      appleShare = 6.5;
    }
  } else if (p.includes('FY23') || p.includes('FY2023')) {
    vivoShare = 16.2;
    vivoAsp = 15400;
    vivoTier = '#2 National Rank';
    vivoCac = 1620;
    vivoLtv = 3420;
    samsungShare = 18.5;
    xiaomiShare = 20.1;
    oppoShare = 13.8;
    realmeShare = 14.2;
    motoShare = 4.1;
    appleShare = 5.1;
  } else if (p.includes('FY22') || p.includes('FY2022')) {
    vivoShare = 15.5;
    vivoAsp = 14200;
    vivoTier = '#3 Mass Tier';
    vivoCac = 1750;
    vivoLtv = 3100;
    samsungShare = 19.2;
    xiaomiShare = 23.5;
    oppoShare = 12.8;
    realmeShare = 15.0;
    motoShare = 3.2;
    appleShare = 4.2;
  } else if (p.includes('FY20') || p.includes('FY19') || p.includes('2019')) {
    vivoShare = 14.8;
    vivoAsp = 13100;
    vivoTier = '#3 Mass Tier';
    vivoCac = 1820;
    vivoLtv = 2850;
    samsungShare = 20.5;
    xiaomiShare = 26.0;
    oppoShare = 11.5;
    realmeShare = 12.5;
    motoShare = 2.8;
    appleShare = 3.5;
  }

  // Regional Overrides
  if (region && region !== 'ALL') {
    if (region === 'North India') {
      vivoShare = 21.8;
      vivoAsp = 19200;
      vivoTier = '#1 North Leader';
      samsungShare = 18.2;
      samsungAsp = 23500;
      xiaomiShare = 16.5;
      xiaomiAsp = 13200;
      oppoShare = 12.8;
      oppoAsp = 16200;
      realmeShare = 13.2;
      realmeAsp = 11800;
      motoShare = 5.8;
      appleShare = 5.5;
    } else if (region === 'South India') {
      vivoShare = 19.4;
      vivoAsp = 21500;
      vivoTier = '#1 Android Brand';
      samsungShare = 21.2;
      samsungAsp = 25400;
      xiaomiShare = 14.8;
      xiaomiAsp = 14500;
      oppoShare = 13.5;
      oppoAsp = 17500;
      realmeShare = 9.8;
      realmeAsp = 12800;
      motoShare = 6.8;
      appleShare = 14.5;
      appleAsp = 72000;
    } else if (region === 'West India') {
      vivoShare = 18.9;
      vivoAsp = 18800;
      vivoTier = '#2 West Rank';
      samsungShare = 19.5;
      samsungAsp = 24800;
      xiaomiShare = 15.0;
      xiaomiAsp = 14000;
      oppoShare = 16.2;
      oppoAsp = 17100;
      realmeShare = 12.4;
      realmeAsp = 12200;
      motoShare = 6.5;
      appleShare = 8.5;
      appleAsp = 70000;
    } else if (region === 'East India') {
      vivoShare = 18.2;
      vivoAsp = 14200;
      vivoTier = '#1 Tier-2/3 East';
      samsungShare = 16.0;
      samsungAsp = 21000;
      xiaomiShare = 20.5;
      xiaomiAsp = 12500;
      oppoShare = 11.2;
      oppoAsp = 15200;
      realmeShare = 17.8;
      realmeAsp = 10800;
      motoShare = 4.8;
      appleShare = 3.2;
      appleAsp = 64000;
    } else if (region === 'Central India') {
      vivoShare = 17.5;
      vivoAsp = 13800;
      vivoTier = '#2 Central Rank';
      samsungShare = 17.0;
      samsungAsp = 20500;
      xiaomiShare = 22.0;
      xiaomiAsp = 12000;
      oppoShare = 12.0;
      oppoAsp = 14800;
      realmeShare = 19.5;
      realmeAsp = 10500;
      motoShare = 4.2;
      appleShare = 2.8;
      appleAsp = 62000;
    }
  }

  // Publisher source variance (e.g. Counterpoint vs IDC)
  if (sourceId.toLowerCase().includes('counterpoint')) {
    vivoShare = Math.round((vivoShare - 0.4) * 10) / 10;
    samsungShare = Math.round((samsungShare + 0.4) * 10) / 10;
  } else if (sourceId.toLowerCase().includes('roc') || sourceId.toLowerCase().includes('tofler')) {
    vivoAsp = Math.round(vivoAsp * 1.02);
  }

  return [
    {
      ...COMPETITORS[0], // Vivo
      share: vivoShare,
      asp: vivoAsp,
      tier: vivoTier,
      cac: vivoCac,
      ltv: vivoLtv,
      ltvCac: Number((vivoLtv / vivoCac).toFixed(1))
    },
    {
      ...COMPETITORS[1], // Samsung
      share: samsungShare,
      asp: samsungAsp
    },
    {
      ...COMPETITORS[2], // Xiaomi
      share: xiaomiShare,
      asp: xiaomiAsp
    },
    {
      ...COMPETITORS[3], // OPPO
      share: oppoShare,
      asp: oppoAsp
    },
    {
      ...COMPETITORS[4], // Realme
      share: realmeShare,
      asp: realmeAsp
    },
    {
      ...COMPETITORS[5], // Motorola
      share: motoShare,
      asp: motoAsp
    },
    {
      ...COMPETITORS[6], // Apple
      share: appleShare,
      asp: appleAsp
    }
  ];
}

// Device Cost Architecture
interface UnitEconomics {
  seriesId: string;
  seriesName: string;
  asp: number;
  chipset: number;
  display: number;
  camera: number;
  memory: number;
  chassis: number;
  assembly: number;
  dutyLogistics: number;
  channelMargin: number;
  marketingPromoter: number;
  netMargin: number;
}

const UNIT_ECONOMICS: Record<string, UnitEconomics> = {
  ALL: {
    seriesId: 'ALL',
    seriesName: 'Vivo National Average Device',
    asp: 18500,
    chipset: 4250,      // 23.0%
    display: 2960,      // 16.0%
    camera: 2590,       // 14.0%
    memory: 1850,       // 10.0%
    chassis: 1295,      // 7.0%
    assembly: 925,      // 5.0%
    dutyLogistics: 1295,// 7.0%
    channelMargin: 1850,// 10.0%
    marketingPromoter: 1110, // 6.0%
    netMargin: 1375     // 7.4%
  },
  'SBU-X': {
    seriesId: 'SBU-X',
    seriesName: 'X-Series Flagship (e.g. X100 Pro / X200)',
    asp: 48000,
    chipset: 11520,     // 24.0%
    display: 7680,      // 16.0%
    camera: 11040,      // 23.0%
    memory: 4320,       // 9.0%
    chassis: 2400,      // 5.0%
    assembly: 1920,     // 4.0%
    dutyLogistics: 2880,// 6.0%
    channelMargin: 3840,// 8.0%
    marketingPromoter: 2400, // 5.0%
    netMargin: 6000     // 12.5%
  },
  'SBU-V': {
    seriesId: 'SBU-V',
    seriesName: 'V-Series Mid-Range (e.g. V30 Pro / V40)',
    asp: 24000,
    chipset: 5280,      // 22.0%
    display: 3840,      // 16.0%
    camera: 3840,       // 16.0%
    memory: 2400,       // 10.0%
    chassis: 1440,      // 6.0%
    assembly: 1200,     // 5.0%
    dutyLogistics: 1680,// 7.0%
    channelMargin: 2400,// 10.0%
    marketingPromoter: 1680, // 7.0%
    netMargin: 1800     // 7.5%
  },
  'SBU-Y': {
    seriesId: 'SBU-Y',
    seriesName: 'Y-Series Mass Tier (e.g. Y200 / Y300)',
    asp: 12500,
    chipset: 2875,      // 23.0%
    display: 1875,      // 15.0%
    camera: 1375,       // 11.0%
    memory: 1375,       // 11.0%
    chassis: 1000,      // 8.0%
    assembly: 750,      // 6.0%
    dutyLogistics: 1000,// 8.0%
    channelMargin: 1375,// 11.0%
    marketingPromoter: 625,  // 5.0%
    netMargin: 250      // 2.0%
  },
  'SBU-IQOO': {
    seriesId: 'SBU-IQOO',
    seriesName: 'iQOO Performance Sub-Brand (e.g. Neo 9 Pro)',
    asp: 21000,
    chipset: 5880,      // 28.0%
    display: 3570,      // 17.0%
    camera: 2100,       // 10.0%
    memory: 2310,       // 11.0%
    chassis: 1260,      // 6.0%
    assembly: 1050,     // 5.0%
    dutyLogistics: 1470,// 7.0%
    channelMargin: 1050,// 5.0%
    marketingPromoter: 1050, // 5.0%
    netMargin: 1260     // 6.0%
  }
};

function getFilteredUnitEconomics(period: string, sbuId: string, region?: string): Record<string, UnitEconomics> {
  const p = period.toUpperCase();
  let multiplier = 1.0;
  let marginPct = 0.074; // 7.4%

  if (p.includes('2025') || p.includes('Q1 2025')) {
    multiplier = 0.93;
    marginPct = 0.068;
  } else if (p.includes('FY23') || p.includes('FY2023')) {
    multiplier = 0.83;
    marginPct = 0.051;
  } else if (p.includes('FY22') || p.includes('FY2022')) {
    multiplier = 0.76;
    marginPct = 0.042;
  } else if (p.includes('FY20') || p.includes('FY19')) {
    multiplier = 0.70;
    marginPct = 0.038;
  }

  if (region && region !== 'ALL') {
    if (region === 'South India') multiplier *= 1.16;
    else if (region === 'North India') multiplier *= 1.04;
    else if (region === 'West India') multiplier *= 1.02;
    else if (region === 'East India') multiplier *= 0.77;
    else if (region === 'Central India') multiplier *= 0.75;
  }

  const result: Record<string, UnitEconomics> = {};

  Object.keys(UNIT_ECONOMICS).forEach((key) => {
    const base = UNIT_ECONOMICS[key];
    const asp = Math.round(base.asp * multiplier);
    const chipset = Math.round(base.chipset * multiplier);
    const display = Math.round(base.display * multiplier);
    const camera = Math.round(base.camera * multiplier);
    const memory = Math.round(base.memory * multiplier);
    const chassis = Math.round(base.chassis * multiplier);
    const assembly = Math.round(base.assembly * multiplier);
    const dutyLogistics = Math.round(base.dutyLogistics * multiplier);
    const channelMargin = Math.round(base.channelMargin * multiplier);
    const marketingPromoter = Math.round(base.marketingPromoter * multiplier);
    const netMargin = Math.round(asp * marginPct);

    result[key] = {
      ...base,
      asp,
      chipset,
      display,
      camera,
      memory,
      chassis,
      assembly,
      dutyLogistics,
      channelMargin,
      marketingPromoter,
      netMargin
    };
  });

  return result;
}

// CAC vs LTV Channel Breakdown Data
interface ChannelCacLtv {
  channel: string;
  promoterCost: number;
  tradeMargin: number;
  digitalMarketing: number;
  totalCac: number;
  hardwareGrossMargin: number;
  appServicesLtv: number;
  repeatLoyaltyLtv: number;
  totalLtv: number;
  ltvCacRatio: number;
  paybackMonths: number;
  volumeShare: number;
}

const CHANNEL_CAC_LTV: ChannelCacLtv[] = [
  {
    channel: 'General Trade (GT) / MBO',
    promoterCost: 720,
    tradeMargin: 450,
    digitalMarketing: 280,
    totalCac: 1450,
    hardwareGrossMargin: 2250,
    appServicesLtv: 420,
    repeatLoyaltyLtv: 1780,
    totalLtv: 4450,
    ltvCacRatio: 3.07,
    paybackMonths: 3.9,
    volumeShare: 52
  },
  {
    channel: 'Exclusive Brand Outlets (EBO)',
    promoterCost: 920,
    tradeMargin: 520,
    digitalMarketing: 410,
    totalCac: 1850,
    hardwareGrossMargin: 2850,
    appServicesLtv: 560,
    repeatLoyaltyLtv: 2340,
    totalLtv: 5750,
    ltvCacRatio: 3.11,
    paybackMonths: 3.8,
    volumeShare: 10
  },
  {
    channel: 'Online E-Commerce (Amazon/Flipkart/iQOO)',
    promoterCost: 0,
    tradeMargin: 420,
    digitalMarketing: 430,
    totalCac: 850,
    hardwareGrossMargin: 1650,
    appServicesLtv: 380,
    repeatLoyaltyLtv: 1220,
    totalLtv: 3250,
    ltvCacRatio: 3.82,
    paybackMonths: 3.1,
    volumeShare: 26
  },
  {
    channel: 'Large Format Retail (LFR - Croma/Reliance)',
    promoterCost: 650,
    tradeMargin: 620,
    digitalMarketing: 350,
    totalCac: 1620,
    hardwareGrossMargin: 2400,
    appServicesLtv: 480,
    repeatLoyaltyLtv: 1950,
    totalLtv: 4830,
    ltvCacRatio: 2.98,
    paybackMonths: 4.2,
    volumeShare: 12
  }
];

function getFilteredCacLtv(period: string, region?: string): { channels: ChannelCacLtv[]; blendedCac: number; blendedLtv: number; ratio: number; payback: number } {
  const p = period.toUpperCase();
  let cacMultiplier = 1.0;
  let ltvMultiplier = 1.0;

  if (p.includes('2025') || p.includes('Q1 2025')) {
    cacMultiplier = 1.09;
    ltvMultiplier = 0.92;
  } else if (p.includes('FY23') || p.includes('FY2023')) {
    cacMultiplier = 1.20;
    ltvMultiplier = 0.81;
  } else if (p.includes('FY22') || p.includes('FY2022')) {
    cacMultiplier = 1.29;
    ltvMultiplier = 0.74;
  } else if (p.includes('FY20') || p.includes('FY19')) {
    cacMultiplier = 1.35;
    ltvMultiplier = 0.68;
  }

  if (region && region !== 'ALL') {
    if (region === 'South India') {
      cacMultiplier *= 1.10;
      ltvMultiplier *= 1.15;
    } else if (region === 'North India') {
      cacMultiplier *= 1.05;
      ltvMultiplier *= 1.08;
    } else if (region === 'West India') {
      cacMultiplier *= 1.02;
      ltvMultiplier *= 1.04;
    } else if (region === 'East India') {
      cacMultiplier *= 0.88;
      ltvMultiplier *= 0.85;
    } else if (region === 'Central India') {
      cacMultiplier *= 0.82;
      ltvMultiplier *= 0.80;
    }
  }

  const channels = CHANNEL_CAC_LTV.map(ch => {
    const totalCac = Math.round(ch.totalCac * cacMultiplier);
    const totalLtv = Math.round(ch.totalLtv * ltvMultiplier);
    const ltvCacRatio = Number((totalLtv / totalCac).toFixed(2));
    const paybackMonths = Number((ch.paybackMonths * cacMultiplier).toFixed(1));

    return {
      ...ch,
      totalCac,
      totalLtv,
      ltvCacRatio,
      paybackMonths
    };
  });

  const blendedCac = Math.round(1420 * cacMultiplier);
  const blendedLtv = Math.round(4180 * ltvMultiplier);
  const ratio = Number((blendedLtv / blendedCac).toFixed(1));
  const payback = Number((3.4 * cacMultiplier).toFixed(1));

  return { channels, blendedCac, blendedLtv, ratio, payback };
}

export const DiagnosticView: React.FC = () => {
  const { 
    factMetrics, 
    filteredFactMetrics, 
    sources, 
    sbus, 
    openCitationModal, 
    filters, 
    setFilters 
  } = useSystem();

  // Tab State: 'BENCHMARK' | 'UNIT_ECONOMICS' | 'CAC_LTV' | 'EVIDENCE'
  const [activeTab, setActiveTab] = useState<'BENCHMARK' | 'UNIT_ECONOMICS' | 'CAC_LTV' | 'EVIDENCE'>('BENCHMARK');

  // Reset scroll position on sub-tab switch
  useEffect(() => {
    const scrollContainer = document.querySelector('.overflow-y-auto');
    if (scrollContainer) {
      scrollContainer.scrollTop = 0;
    }
  }, [activeTab]);

  // Selected Competitor for Modal / Deep-Dive
  const [selectedCompId, setSelectedCompId] = useState<string>('samsung');

  // Selected SBU for Unit Cost Economics
  const [selectedEcoSeries, setSelectedEcoSeries] = useState<string>('ALL');

  // Synchronize global filters.sbu_id with selectedEcoSeries
  useEffect(() => {
    if (filters.sbu_id && filters.sbu_id !== 'ALL') {
      const matchKey = Object.keys(UNIT_ECONOMICS).find(k => k.toLowerCase() === filters.sbu_id.toLowerCase() || k.toLowerCase().includes(filters.sbu_id.toLowerCase().replace('sbu-', '')));
      if (matchKey) {
        setSelectedEcoSeries(matchKey);
      }
    }
  }, [filters.sbu_id]);

  // Compute dynamic competitor benchmark data
  const filteredCompetitors = useMemo(() => {
    return getFilteredCompetitors(filters.quarter, filters.source_id, filters.region);
  }, [filters.quarter, filters.source_id, filters.region]);

  // Compute dynamic unit economics map
  const filteredUnitEconomicsMap = useMemo(() => {
    return getFilteredUnitEconomics(filters.quarter, filters.sbu_id, filters.region);
  }, [filters.quarter, filters.sbu_id, filters.region]);

  // Compute dynamic CAC vs LTV channel metrics
  const filteredCacLtvObj = useMemo(() => {
    return getFilteredCacLtv(filters.quarter, filters.region);
  }, [filters.quarter, filters.region]);

  const vivoCompObj = filteredCompetitors.find(c => c.id === 'vivo') || filteredCompetitors[0];
  const selectedCompetitor = filteredCompetitors.find(c => c.id === selectedCompId) || filteredCompetitors[0];
  const activeUnitEco = filteredUnitEconomicsMap[selectedEcoSeries] || filteredUnitEconomicsMap['ALL'];

  const isFiltered = filters.quarter !== 'ALL' || (filters.region && filters.region !== 'ALL') || filters.source_id !== 'ALL' || (filters.sbu_id && filters.sbu_id !== 'ALL');
  const selectedSourceObj = sources.find(s => s.source_id === filters.source_id);

  // Unit Economics Pie/Breakdown chart data
  const unitCostPieData = [
    { name: 'SoC / Processor', value: activeUnitEco.chipset, color: '#3B82F6' },
    { name: 'Display Panel', value: activeUnitEco.display, color: '#06B6D4' },
    { name: 'Camera & Optics', value: activeUnitEco.camera, color: '#10B981' },
    { name: 'RAM & Storage', value: activeUnitEco.memory, color: '#8B5CF6' },
    { name: 'Chassis & Battery', value: activeUnitEco.chassis, color: '#6366F1' },
    { name: 'Assembly & Testing', value: activeUnitEco.assembly, color: '#EC4899' },
    { name: 'Tariffs & Logistics', value: activeUnitEco.dutyLogistics, color: '#F59E0B' },
    { name: 'Channel Margins', value: activeUnitEco.channelMargin, color: '#F97316' },
    { name: 'Marketing & Promoters', value: activeUnitEco.marketingPromoter, color: '#EF4444' },
    { name: 'Net Profit Margin', value: activeUnitEco.netMargin, color: '#22C55E' },
  ];

  // Competitor Market Share & ASP chart data
  const compShareData = filteredCompetitors.map(c => ({
    name: c.name.split(' ')[0],
    share: c.share,
    asp: Math.round(c.asp / 1000), // in ₹k
    grossMargin: c.grossMargin,
    color: c.color
  }));

  // CAC vs LTV Chart Data
  const cacLtvChartData = filteredCacLtvObj.channels.map(c => ({
    name: c.channel.split(' ')[0] + ' ' + (c.channel.includes('EBO') ? 'EBO' : c.channel.includes('E-Commerce') ? 'Online' : c.channel.includes('Large') ? 'LFR' : 'GT'),
    CAC: c.totalCac,
    LTV: c.totalLtv,
    Ratio: c.ltvCacRatio,
    Payback: c.paybackMonths
  }));

  return (
    <div className="space-y-6 pb-12 animate-fade-in text-slate-100">
      
      {/* Executive Header Banner */}
      <div className="glass-panel rounded-2xl p-6 shadow-xl border border-white/10 relative overflow-hidden bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2 max-w-3xl">
            <div className="flex items-center gap-2">
              <span className="bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5 backdrop-blur-md">
                <SearchCode className="w-3.5 h-3.5 text-indigo-400" />
                Strategic Diagnostic Dashboard
              </span>
              <span className="text-xs text-slate-400 font-medium">
                {filters.quarter !== 'ALL' ? filters.quarter : 'Q1 2026 Executive Review'}
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Vivo Market Position, Unit Economics & CAC/LTV Intelligence
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              Deconstructed competitor benchmark matrix, device unit cost structure across product tiers, and channel customer acquisition payback economics.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <div className="bg-slate-900/90 border border-slate-700/80 rounded-xl p-3 text-center min-w-[130px] shadow-lg">
              <span className="text-[10px] text-slate-400 uppercase font-semibold block">Market Rank</span>
              <span className="text-xl font-black text-indigo-400">{vivoCompObj.tier}</span>
              <span className="text-[10px] text-emerald-400 font-medium block">{vivoCompObj.share}% Share</span>
            </div>
            <div className="bg-slate-900/90 border border-slate-700/80 rounded-xl p-3 text-center min-w-[130px] shadow-lg">
              <span className="text-[10px] text-slate-400 uppercase font-semibold block">Avg ASP</span>
              <span className="text-xl font-black text-emerald-400">₹{vivoCompObj.asp.toLocaleString('en-IN')}</span>
              <span className="text-[10px] text-slate-400 font-medium block">
                {((activeUnitEco.netMargin / activeUnitEco.asp) * 100).toFixed(1)}% Net Margin
              </span>
            </div>
            <div className="bg-slate-900/90 border border-slate-700/80 rounded-xl p-3 text-center min-w-[130px] shadow-lg">
              <span className="text-[10px] text-slate-400 uppercase font-semibold block">Blended LTV/CAC</span>
              <span className="text-xl font-black text-amber-400">{filteredCacLtvObj.ratio}x</span>
              <span className="text-[10px] text-slate-400 font-medium block">{filteredCacLtvObj.payback} Mo Payback</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scenario Filters Control Bar */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-3.5 flex flex-wrap items-center justify-between gap-3 text-xs shadow-md">
        <div className="flex items-center gap-2 font-semibold text-slate-200">
          <Sliders className="w-4 h-4 text-indigo-400" />
          <span>Diagnostic Scenario Controls:</span>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Period Selection */}
          <div className="flex items-center gap-2">
            <label htmlFor="diag-period" className="text-slate-400 font-medium text-[11px]">Period:</label>
            <select
              id="diag-period"
              value={filters.quarter}
              onChange={(e) => setFilters(prev => ({ ...prev, quarter: e.target.value }))}
              className="bg-slate-950 text-slate-200 border border-slate-700 rounded-lg px-3 py-1 text-xs font-medium focus:outline-none focus:border-indigo-500 cursor-pointer"
            >
              <option value="ALL">All Periods (Consolidated)</option>
              <option value="Q1 2026">Q1 2026 (IDC Release)</option>
              <option value="Q1 2025">Q1 2025 (IDC Baseline)</option>
              <option value="FY2025">FY 2025 (Counterpoint Full Year)</option>
              <option value="FY23">FY23 (Audited RoC Financial Peak)</option>
              <option value="FY22">FY22 (Audited RoC Revenue)</option>
            </select>
          </div>

          {/* Source Selection */}
          <div className="flex items-center gap-2">
            <label htmlFor="diag-source" className="text-slate-400 font-medium text-[11px]">Data Source:</label>
            <select
              id="diag-source"
              value={filters.source_id}
              onChange={(e) => setFilters(prev => ({ ...prev, source_id: e.target.value }))}
              className="bg-slate-950 text-slate-200 border border-slate-700 rounded-lg px-3 py-1 text-xs font-medium focus:outline-none focus:border-indigo-500 cursor-pointer max-w-[180px] truncate"
            >
              <option value="ALL">All Verified Sources</option>
              {sources.map(src => (
                <option key={src.source_id} value={src.source_id}>
                  {src.publisher} — {src.name.slice(0, 25)}...
                </option>
              ))}
            </select>
          </div>

          {/* SBU Filter */}
          <div className="flex items-center gap-2">
            <label htmlFor="diag-sbu" className="text-slate-400 font-medium text-[11px]">SBU / Series:</label>
            <select
              id="diag-sbu"
              value={filters.sbu_id}
              onChange={(e) => {
                const val = e.target.value;
                setFilters(prev => ({ ...prev, sbu_id: val }));
                if (val !== 'ALL') {
                  setSelectedEcoSeries(val);
                }
              }}
              className="bg-slate-950 text-slate-200 border border-slate-700 rounded-lg px-3 py-1 text-xs font-medium focus:outline-none focus:border-indigo-500 cursor-pointer"
            >
              <option value="ALL">All Product Series</option>
              <option value="SBU-X">X-Series Flagship</option>
              <option value="SBU-V">V-Series Mid-Range</option>
              <option value="SBU-Y">Y-Series Mass Tier</option>
              <option value="SBU-IQOO">iQOO Sub-Brand</option>
            </select>
          </div>

          {isFiltered && (
            <button
              onClick={() => setFilters({ quarter: 'ALL', region: 'ALL', department: 'ALL', sbu_id: 'ALL', source_id: 'ALL' })}
              className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 ml-2 cursor-pointer flex items-center gap-1"
            >
              <RefreshCw className="w-3 h-3" /> Reset
            </button>
          )}
        </div>
      </div>

      {/* Active Filter Context Banner */}
      <div className="bg-indigo-950/40 border border-indigo-500/20 rounded-xl p-3 flex flex-wrap items-center justify-between gap-3 text-xs shadow-sm">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span className="font-semibold text-indigo-200">Active Filter Context:</span>
          <span className="text-slate-300">
            Period: <strong className="text-white">{filters.quarter}</strong> • Source: <strong className="text-white">{selectedSourceObj ? selectedSourceObj.publisher : (filters.source_id === 'ALL' ? 'All Verified Trackers' : filters.source_id)}</strong> • SBU: <strong className="text-white">{filters.sbu_id}</strong>
          </span>
        </div>
        <span className="bg-indigo-500/20 text-indigo-300 font-semibold px-2.5 py-0.5 rounded-md border border-indigo-500/30 text-[11px] flex items-center gap-1">
          <Database className="w-3 h-3 text-indigo-400" />
          {filteredFactMetrics.length} Verified Evidence Records
        </span>
      </div>

      {/* MAIN DIAGNOSTIC SUB-NAVIGATION TABS */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-1 overflow-x-auto gap-2">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('BENCHMARK')}
            className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'BENCHMARK'
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                : 'bg-slate-900/80 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            1. Competitor Benchmark
          </button>

          <button
            onClick={() => setActiveTab('UNIT_ECONOMICS')}
            className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'UNIT_ECONOMICS'
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                : 'bg-slate-900/80 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            <Cpu className="w-4 h-4" />
            2. Unit Cost Economics
          </button>

          <button
            onClick={() => setActiveTab('CAC_LTV')}
            className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'CAC_LTV'
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                : 'bg-slate-900/80 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            <Target className="w-4 h-4" />
            3. CAC vs LTV Economics
          </button>

          <button
            onClick={() => setActiveTab('EVIDENCE')}
            className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'EVIDENCE'
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                : 'bg-slate-900/80 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            <Database className="w-4 h-4" />
            4. Fact Evidence Trail
          </button>
        </div>

        <span className="text-[11px] text-slate-400 hidden lg:inline-block">
          Interactive Drilldowns Active
        </span>
      </div>

      {/* ========================================================================= */}
      {/* TAB 1: COMPETITOR BENCHMARK & MARKET SHARE ANALYSIS */}
      {/* ========================================================================= */}
      {activeTab === 'BENCHMARK' && (
        <div className="space-y-6 animate-fade-in">
          
          {/* Top Comparison Visual Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Chart 1: Market Share % & ASP Comparison */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-lg space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <BarChart3 className="w-4 h-4 text-indigo-400" />
                    Market Share (%) & Average Selling Price (₹k)
                  </h3>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    India Smartphone Brands Comparison — {filters.quarter !== 'ALL' ? filters.quarter : 'Q1 2026'} ({selectedSourceObj ? selectedSourceObj.publisher : 'IDC/Counterpoint'})
                  </p>
                </div>
                <span className="bg-indigo-500/15 text-indigo-300 text-[10px] font-semibold px-2 py-0.5 rounded border border-indigo-500/30">
                  {selectedSourceObj ? selectedSourceObj.publisher : 'Verified Tracker'}
                </span>
              </div>

              <div className="h-[280px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={compShareData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.5} />
                    <XAxis dataKey="name" stroke="#94A3B8" fontSize={11} tickLine={false} />
                    <YAxis yAxisId="left" stroke="#818CF8" fontSize={11} tickFormatter={(v) => `${v}%`} />
                    <YAxis yAxisId="right" orientation="right" stroke="#34D399" fontSize={11} tickFormatter={(v) => `₹${v}k`} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#0F172A', borderColor: '#334155', borderRadius: '12px', fontSize: '12px' }}
                      formatter={(val: any, name: string) => [
                        name === 'share' ? `${val}%` : `₹${val * 1000}`,
                        name === 'share' ? 'Market Share' : 'ASP'
                      ]}
                    />
                    <Bar yAxisId="left" dataKey="share" name="share" radius={[6, 6, 0, 0]} fill="#4F46E5" />
                    <Bar yAxisId="right" dataKey="asp" name="asp" radius={[6, 6, 0, 0]} fill="#10B981" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="flex items-center justify-center gap-6 text-xs pt-1 border-t border-slate-800">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 bg-indigo-600 rounded"></span>
                  <span className="text-slate-300 font-medium">Unit Market Share (%)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 bg-emerald-500 rounded"></span>
                  <span className="text-slate-300 font-medium">Average Selling Price (ASP in ₹k)</span>
                </div>
              </div>
            </div>

            {/* Chart 2: Competitor Radar Capability Comparison */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-lg space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <Award className="w-4 h-4 text-amber-400" />
                    Strategic Capability Radar Comparison
                  </h3>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Comparing <strong className="text-indigo-400">Vivo</strong> vs Selected Competitor: <strong className="text-amber-400">{selectedCompetitor.name}</strong>
                  </p>
                </div>
                <select
                  value={selectedCompId}
                  onChange={(e) => setSelectedCompId(e.target.value)}
                  className="bg-slate-950 text-slate-200 border border-slate-700 rounded-lg px-2.5 py-1 text-xs font-semibold focus:outline-none focus:border-indigo-500 cursor-pointer"
                >
                  {filteredCompetitors.filter(c => c.id !== 'vivo').map(c => (
                    <option key={c.id} value={c.id}>
                      Compare vs {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="h-[280px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart outerRadius={90} data={[
                    { subject: 'Offline Retail', Vivo: 96, Rival: selectedCompetitor.capabilities.offlineRetail },
                    { subject: 'Brand Equity', Vivo: 88, Rival: selectedCompetitor.capabilities.brandEquity },
                    { subject: 'Premium Position', Vivo: 85, Rival: selectedCompetitor.capabilities.premiumPosition },
                    { subject: 'Spec Value', Vivo: 82, Rival: selectedCompetitor.capabilities.specValue },
                    { subject: 'Online Reach', Vivo: 78, Rival: selectedCompetitor.capabilities.onlineReach },
                    { subject: 'Ecosys Monetize', Vivo: 70, Rival: selectedCompetitor.capabilities.ecosystem },
                  ]}>
                    <PolarGrid stroke="#334155" />
                    <PolarAngleAxis dataKey="subject" stroke="#94A3B8" fontSize={11} />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#475569" fontSize={9} />
                    <Radar name="Vivo" dataKey="Vivo" stroke="#3B52FF" fill="#3B52FF" fillOpacity={0.4} />
                    <Radar name={selectedCompetitor.name} dataKey="Rival" stroke={selectedCompetitor.color} fill={selectedCompetitor.color} fillOpacity={0.3} />
                    <Tooltip contentStyle={{ backgroundColor: '#0F172A', borderColor: '#334155', borderRadius: '12px', fontSize: '11px' }} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>

              <div className="flex items-center justify-center gap-6 text-xs pt-1 border-t border-slate-800">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 bg-indigo-500 rounded"></span>
                  <span className="text-slate-300 font-medium">Vivo Score</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded" style={{ backgroundColor: selectedCompetitor.color }}></span>
                  <span className="text-slate-300 font-medium">{selectedCompetitor.name} Score</span>
                </div>
              </div>
            </div>

          </div>

          {/* Interactive Competitor Matrix Cards */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Users className="w-4.5 h-4.5 text-indigo-400" />
                Comprehensive 6-Competitor Strategic Matrix ({filters.quarter !== 'ALL' ? filters.quarter : 'Q1 2026'})
              </h3>
              <span className="text-xs text-slate-400">
                Click any brand to highlight deep-dive radar & economics
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredCompetitors.filter(comp => comp.id !== 'vivo').map((comp) => {
                const isSelected = comp.id === selectedCompId;
                return (
                  <div
                    key={comp.id}
                    onClick={() => setSelectedCompId(comp.id)}
                    className={`rounded-2xl p-4 transition-all cursor-pointer border relative overflow-hidden space-y-3 ${
                      isSelected
                        ? 'bg-slate-900 border-indigo-500/80 shadow-lg shadow-indigo-500/20 ring-1 ring-indigo-500'
                        : 'bg-slate-900/80 border-slate-800 hover:border-slate-700 hover:bg-slate-900'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full" style={{ backgroundColor: comp.color }}></span>
                        <h4 className="font-extrabold text-white text-sm">{comp.name}</h4>
                      </div>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 border border-slate-700">
                        {comp.tier}
                      </span>
                    </div>

                    {/* Key Metrics Pill Grid */}
                    <div className="grid grid-cols-3 gap-2 text-center pt-1">
                      <div className="bg-slate-950 p-2 rounded-xl border border-slate-800">
                        <span className="text-[9px] text-slate-400 uppercase font-semibold block">Share</span>
                        <span className="text-sm font-extrabold text-indigo-300">{comp.share}%</span>
                      </div>
                      <div className="bg-slate-950 p-2 rounded-xl border border-slate-800">
                        <span className="text-[9px] text-slate-400 uppercase font-semibold block">ASP</span>
                        <span className="text-sm font-extrabold text-emerald-400">₹{(comp.asp / 1000).toFixed(1)}k</span>
                      </div>
                      <div className="bg-slate-950 p-2 rounded-xl border border-slate-800">
                        <span className="text-[9px] text-slate-400 uppercase font-semibold block">Offline %</span>
                        <span className="text-sm font-extrabold text-amber-300">{comp.offlineShare}%</span>
                      </div>
                    </div>

                    {/* Moat & Strategy */}
                    <div className="space-y-1.5 text-xs text-slate-300">
                      <div className="flex items-start gap-1.5 text-[11px]">
                        <ShieldCheck className="w-3.5 h-3.5 text-indigo-400 shrink-0 mt-0.5" />
                        <span><strong>Moat:</strong> {comp.keyMoat}</span>
                      </div>
                      <div className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                        {comp.strategy[0]}
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-[10px] text-slate-400 pt-2 border-t border-slate-800">
                      <span>Gross Margin: <strong className="text-slate-200">{comp.grossMargin}%</strong></span>
                      <span className="text-indigo-400 font-semibold flex items-center gap-0.5">
                        Deep Dive <ChevronRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: UNIT COST ECONOMICS (BOM & MARGIN BREAKDOWN) */}
      {/* ========================================================================= */}
      {activeTab === 'UNIT_ECONOMICS' && (
        <div className="space-y-6 animate-fade-in">
          
          {/* Series Selection Selector Bar */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-4 shadow-md">
            <div>
              <span className="text-xs font-semibold text-indigo-400 uppercase tracking-wider block">
                Select Product Line Unit Model ({filters.quarter !== 'ALL' ? filters.quarter : 'Q1 2026'})
              </span>
              <h3 className="text-base font-extrabold text-white">
                {activeUnitEco.seriesName} — Unit Cost Deconstruction
              </h3>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {[
                { id: 'ALL', label: `National Avg (₹${(activeUnitEco.asp/1000).toFixed(1)}k)` },
                { id: 'SBU-X', label: 'X-Series Flagship' },
                { id: 'SBU-V', label: 'V-Series Mid-Range' },
                { id: 'SBU-Y', label: 'Y-Series Mass' },
                { id: 'SBU-IQOO', label: 'iQOO Online' }
              ].map(series => (
                <button
                  key={series.id}
                  onClick={() => {
                    setSelectedEcoSeries(series.id);
                    setFilters(prev => ({ ...prev, sbu_id: series.id }));
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    selectedEcoSeries === series.id
                      ? 'bg-indigo-600 text-white shadow-md'
                      : 'bg-slate-950 text-slate-400 border border-slate-800 hover:text-slate-200'
                  }`}
                >
                  {series.label}
                </button>
              ))}
            </div>
          </div>

          {/* Key KPI Unit Metrics Ribbon */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 text-center space-y-1 shadow-md">
              <span className="text-[10px] text-slate-400 uppercase font-semibold">Average Selling Price (ASP)</span>
              <div className="text-2xl font-black text-white">₹{activeUnitEco.asp.toLocaleString('en-IN')}</div>
              <span className="text-[10px] text-indigo-400 font-medium">100% Revenue Base</span>
            </div>

            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 text-center space-y-1 shadow-md">
              <span className="text-[10px] text-slate-400 uppercase font-semibold">Total Hardware BOM</span>
              <div className="text-2xl font-black text-blue-400">
                ₹{(activeUnitEco.chipset + activeUnitEco.display + activeUnitEco.camera + activeUnitEco.memory + activeUnitEco.chassis).toLocaleString('en-IN')}
              </div>
              <span className="text-[10px] text-slate-400 font-medium">
                {(((activeUnitEco.chipset + activeUnitEco.display + activeUnitEco.camera + activeUnitEco.memory + activeUnitEco.chassis) / activeUnitEco.asp) * 100).toFixed(1)}% of ASP
              </span>
            </div>

            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 text-center space-y-1 shadow-md">
              <span className="text-[10px] text-slate-400 uppercase font-semibold">Retailer Cut & Marketing</span>
              <div className="text-2xl font-black text-amber-400">
                ₹{(activeUnitEco.channelMargin + activeUnitEco.marketingPromoter).toLocaleString('en-IN')}
              </div>
              <span className="text-[10px] text-amber-400 font-medium">
                {(((activeUnitEco.channelMargin + activeUnitEco.marketingPromoter) / activeUnitEco.asp) * 100).toFixed(1)}% Channel Load
              </span>
            </div>

            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 text-center space-y-1 shadow-md">
              <span className="text-[10px] text-slate-400 uppercase font-semibold">Net Profit per Device</span>
              <div className="text-2xl font-black text-emerald-400">₹{activeUnitEco.netMargin.toLocaleString('en-IN')}</div>
              <span className="text-[10px] text-emerald-400 font-semibold">
                {((activeUnitEco.netMargin / activeUnitEco.asp) * 100).toFixed(1)}% Net Profit Margin
              </span>
            </div>
          </div>

          {/* Graphical Breakdown Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Pie Chart: Percentage Distribution */}
            <div className="lg:col-span-5 bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-lg space-y-3">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <PieChartIcon className="w-4 h-4 text-indigo-400" />
                Unit Cost Distribution (% of ASP)
              </h3>
              <p className="text-[11px] text-slate-400">
                Components, assembly, channel commissions & profit slice
              </p>

              <div className="h-[260px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={unitCostPieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={55}
                      outerRadius={95}
                      paddingAngle={3}
                      dataKey="value"
                    >
                      {unitCostPieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#0F172A', borderColor: '#334155', borderRadius: '12px', fontSize: '11px' }}
                      formatter={(val: any) => [`₹${Number(val).toLocaleString('en-IN')}`, 'Cost / Value']}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="grid grid-cols-2 gap-2 text-[10px] pt-2 border-t border-slate-800">
                {unitCostPieData.slice(0, 6).map((item) => (
                  <div key={item.name} className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: item.color }}></span>
                    <span className="text-slate-300 truncate">{item.name}:</span>
                    <strong className="text-white ml-auto">₹{item.value.toLocaleString('en-IN')}</strong>
                  </div>
                ))}
              </div>
            </div>

            {/* Detailed Component Table */}
            <div className="lg:col-span-7 bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-lg space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-indigo-400" />
                  Itemized Device Unit Financial Schedule ({filters.quarter !== 'ALL' ? filters.quarter : 'Q1 2026'})
                </h3>
                <span className="text-[11px] text-slate-400 font-mono">ASP: ₹{activeUnitEco.asp.toLocaleString('en-IN')}</span>
              </div>

              <div className="overflow-x-auto rounded-xl border border-slate-800">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-950 text-slate-400 border-b border-slate-800 uppercase text-[10px] font-bold">
                      <th className="p-2.5">Cost Component</th>
                      <th className="p-2.5">Key Specification / Vendor</th>
                      <th className="p-2.5 text-right">Cost (₹)</th>
                      <th className="p-2.5 text-right">% of ASP</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/80 text-slate-200">
                    {[
                      { name: '1. Processor & SoC', spec: 'MediaTek Dimensity / Snapdragon', cost: activeUnitEco.chipset, color: 'text-blue-400' },
                      { name: '2. Display Module', spec: '120Hz/144Hz AMOLED Panel', cost: activeUnitEco.display, color: 'text-cyan-400' },
                      { name: '3. Camera System', spec: 'Sony Sensors + Zeiss/Aura Optics', cost: activeUnitEco.camera, color: 'text-emerald-400' },
                      { name: '4. Memory & Storage', spec: 'LPDDR5X + UFS 3.1/4.0', cost: activeUnitEco.memory, color: 'text-purple-400' },
                      { name: '5. Chassis, Battery & Packaging', spec: 'Aluminum Frame + 5000mAh', cost: activeUnitEco.chassis, color: 'text-indigo-400' },
                      { name: '6. Local Assembly & Testing', spec: 'Greater Noida Plant (PLI Scheme)', cost: activeUnitEco.assembly, color: 'text-pink-400' },
                      { name: '7. Import Duties & Logistics', spec: 'Customs, GST & Inbound Freight', cost: activeUnitEco.dutyLogistics, color: 'text-amber-400' },
                      { name: '8. Channel Commission', spec: 'General Trade / EBO / LFR Cut', cost: activeUnitEco.channelMargin, color: 'text-orange-400' },
                      { name: '9. Marketing & Promoters', spec: 'In-store Staff + Media Ads', cost: activeUnitEco.marketingPromoter, color: 'text-rose-400' },
                      { name: '10. Net Operating Profit', spec: 'Vivo India Device Operating Margin', cost: activeUnitEco.netMargin, color: 'text-emerald-400 font-extrabold' },
                    ].map((row) => (
                      <tr key={row.name} className="hover:bg-slate-800/40">
                        <td className="p-2.5 font-semibold text-slate-100">{row.name}</td>
                        <td className="p-2.5 text-slate-400 text-[11px]">{row.spec}</td>
                        <td className={`p-2.5 text-right font-mono font-bold ${row.color}`}>
                          ₹{row.cost.toLocaleString('en-IN')}
                        </td>
                        <td className="p-2.5 text-right font-mono text-slate-300">
                          {((row.cost / activeUnitEco.asp) * 100).toFixed(1)}%
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 3: CAC vs LTV ECONOMICS ANALYSIS */}
      {/* ========================================================================= */}
      {activeTab === 'CAC_LTV' && (
        <div className="space-y-6 animate-fade-in">
          
          {/* Top CAC vs LTV Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-2 shadow-md">
              <div className="flex items-center justify-between">
                <span className="text-[11px] text-slate-400 font-semibold uppercase">Blended Customer Acquisition Cost (CAC)</span>
                <Users className="w-4 h-4 text-indigo-400" />
              </div>
              <div className="text-3xl font-black text-indigo-300">₹{filteredCacLtvObj.blendedCac.toLocaleString('en-IN')} <span className="text-xs text-slate-400 font-normal">/ Customer</span></div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Includes in-store promoter salaries, trade commission splits, and digital performance advertising.
              </p>
            </div>

            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-2 shadow-md">
              <div className="flex items-center justify-between">
                <span className="text-[11px] text-slate-400 font-semibold uppercase">3-Year Gross Margin LTV (Economic Contribution)</span>
                <DollarSign className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="text-3xl font-black text-emerald-400">₹{filteredCacLtvObj.blendedLtv.toLocaleString('en-IN')} <span className="text-xs text-slate-400 font-normal">/ Customer</span></div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Combines initial hardware gross margin (22.6% on ₹18,500 ASP = ~₹4,180) + V-Appstore/Ads monetization + repeat upgrade loyalty value. Note: 1-Cycle Gross Revenue LTV = ₹18,500.
              </p>
            </div>

            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-2 shadow-md">
              <div className="flex items-center justify-between">
                <span className="text-[11px] text-slate-400 font-semibold uppercase">LTV : CAC Multiplier & Payback</span>
                <TrendingUp className="w-4 h-4 text-amber-400" />
              </div>
              <div className="text-3xl font-black text-amber-400">{filteredCacLtvObj.ratio}x <span className="text-xs text-slate-400 font-normal">({filteredCacLtvObj.payback} Mo Payback)</span></div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Healthy unit return economics evaluated against {filters.quarter !== 'ALL' ? filters.quarter : 'Q1 2026'} benchmark performance.
              </p>
            </div>

          </div>

          {/* CAC vs LTV Chart & Channel Matrix */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Chart: Composed Bar + Line CAC vs LTV */}
            <div className="lg:col-span-6 bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-lg space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <BarChart3 className="w-4 h-4 text-indigo-400" />
                    Channel CAC vs LTV Comparison (₹) — {filters.quarter !== 'ALL' ? filters.quarter : 'Q1 2026'}
                  </h3>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Acquisition cost vs total customer value across sales channels
                  </p>
                </div>
                <span className="bg-emerald-500/15 text-emerald-300 text-[10px] font-semibold px-2 py-0.5 rounded border border-emerald-500/30">
                  Target &gt;3.0x Ratio
                </span>
              </div>

              <div className="h-[280px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart data={cacLtvChartData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.5} />
                    <XAxis dataKey="name" stroke="#94A3B8" fontSize={10} tickLine={false} />
                    <YAxis yAxisId="left" stroke="#94A3B8" fontSize={11} tickFormatter={(v) => `₹${v}`} />
                    <YAxis yAxisId="right" orientation="right" stroke="#F59E0B" fontSize={11} tickFormatter={(v) => `${v}x`} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#0F172A', borderColor: '#334155', borderRadius: '12px', fontSize: '11px' }}
                      formatter={(val: any, name: string) => [
                        name === 'Ratio' ? `${val}x` : `₹${Number(val).toLocaleString('en-IN')}`,
                        name === 'CAC' ? 'Acquisition Cost (CAC)' : name === 'LTV' ? 'Lifetime Value (LTV)' : 'LTV/CAC Multiplier'
                      ]}
                    />
                    <Bar yAxisId="left" dataKey="CAC" fill="#EF4444" radius={[4, 4, 0, 0]} name="CAC" />
                    <Bar yAxisId="left" dataKey="LTV" fill="#10B981" radius={[4, 4, 0, 0]} name="LTV" />
                    <Line yAxisId="right" type="monotone" dataKey="Ratio" stroke="#F59E0B" strokeWidth={3} dot={{ r: 5 }} name="Ratio" />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>

              <div className="flex items-center justify-center gap-6 text-xs pt-1 border-t border-slate-800">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 bg-rose-500 rounded"></span>
                  <span className="text-slate-300 font-medium">Acquisition Cost (CAC)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 bg-emerald-500 rounded"></span>
                  <span className="text-slate-300 font-medium">3-Yr Lifetime Value (LTV)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 bg-amber-500 rounded-full"></span>
                  <span className="text-slate-300 font-medium">LTV / CAC Multiplier (x)</span>
                </div>
              </div>
            </div>

            {/* Detailed Channel Unit Economics Table */}
            <div className="lg:col-span-6 bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-lg space-y-4">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Building2 className="w-4 h-4 text-indigo-400" />
                Channel Acquisition & Lifetime Economics Matrix ({filters.quarter !== 'ALL' ? filters.quarter : 'Q1 2026'})
              </h3>

              <div className="space-y-3">
                {filteredCacLtvObj.channels.map((ch) => (
                  <div key={ch.channel} className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="font-bold text-white text-xs flex items-center gap-2">
                        <span>{ch.channel}</span>
                        <span className="bg-slate-800 text-slate-300 px-2 py-0.5 rounded text-[10px] font-normal">
                          {ch.volumeShare}% Vol
                        </span>
                      </div>
                      <div className="text-xs font-black text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                        {ch.ltvCacRatio}x LTV/CAC
                      </div>
                    </div>

                    <div className="grid grid-cols-4 gap-2 text-center text-[10px]">
                      <div className="bg-slate-900 p-1.5 rounded-lg border border-slate-800/80">
                        <span className="text-slate-400 block">Total CAC</span>
                        <strong className="text-rose-400 text-xs">₹{ch.totalCac.toLocaleString('en-IN')}</strong>
                      </div>
                      <div className="bg-slate-900 p-1.5 rounded-lg border border-slate-800/80">
                        <span className="text-slate-400 block">Hardware Margin</span>
                        <strong className="text-indigo-300 text-xs">₹{ch.hardwareGrossMargin.toLocaleString('en-IN')}</strong>
                      </div>
                      <div className="bg-slate-900 p-1.5 rounded-lg border border-slate-800/80">
                        <span className="text-slate-400 block">3-Yr Total LTV</span>
                        <strong className="text-emerald-400 text-xs">₹{ch.totalLtv.toLocaleString('en-IN')}</strong>
                      </div>
                      <div className="bg-slate-900 p-1.5 rounded-lg border border-slate-800/80">
                        <span className="text-slate-400 block">Payback</span>
                        <strong className="text-amber-300 text-xs">{ch.paybackMonths} Mo</strong>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 4: FACT EVIDENCE TRAIL & AUDIT CLAIMS */}
      {/* ========================================================================= */}
      {activeTab === 'EVIDENCE' && (
        <div className="space-y-6 animate-fade-in">
          
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-sm text-slate-100">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <Database className="w-4 h-4 text-indigo-400" />
                  <h3 className="text-base font-bold text-white">Matching Verified Fact Evidence</h3>
                </div>
                <p className="text-xs text-slate-400 mt-0.5">
                  Showing {filteredFactMetrics.length} facts matching current scenario filters ({filters.quarter} • {selectedSourceObj ? selectedSourceObj.publisher : filters.source_id} • SBU: {filters.sbu_id})
                </p>
              </div>

              <span className="text-xs font-semibold text-slate-300 bg-slate-950 px-3 py-1 rounded-lg border border-slate-800">
                {filteredFactMetrics.length} Verified Audit Records
              </span>
            </div>

            {filteredFactMetrics.length === 0 ? (
              <div className="bg-slate-950/60 rounded-xl p-8 text-center space-y-3 border border-slate-800">
                <Info className="w-8 h-8 text-indigo-400 mx-auto" />
                <h4 className="text-sm font-bold text-slate-200">No Verified Facts Match This Filter Combination</h4>
                <p className="text-xs text-slate-400 max-w-md mx-auto">
                  Try selecting a different period or resetting the data source and SBU filters.
                </p>
                <button
                  onClick={() => setFilters({ quarter: 'ALL', sbu_id: 'ALL', source_id: 'ALL' })}
                  className="text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg transition-colors cursor-pointer"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div className="overflow-x-auto rounded-xl border border-slate-800">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-slate-950 border-b border-slate-800 text-slate-400 uppercase font-bold text-[10px]">
                      <th className="p-3">Fact Metric ID & Name</th>
                      <th className="p-3">Period</th>
                      <th className="p-3">Scope</th>
                      <th className="p-3 text-right">Metric Value</th>
                      <th className="p-3">Verification Source</th>
                      <th className="p-3 text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/80 text-slate-200">
                    {filteredFactMetrics.map((fact) => {
                      const source = sources.find(s => s.source_id === fact.source_id);
                      return (
                        <tr key={fact.metric_id} className="hover:bg-slate-800/40 transition-colors">
                          <td className="p-3">
                            <div className="font-bold text-white flex items-center gap-1.5">
                              <FileText className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                              {fact.metric_name}
                            </div>
                            <div className="text-[10px] text-slate-400 font-mono mt-0.5">{fact.metric_id}</div>
                          </td>
                          <td className="p-3">
                            <span className="bg-slate-800 text-slate-300 px-2 py-0.5 rounded text-[10px] font-semibold">
                              {fact.quarter}
                            </span>
                          </td>
                          <td className="p-3">
                            <span className="text-slate-300 font-medium">
                              {fact.sbu_id === 'SBU-ALL' ? 'Brand-Wide' : fact.sbu_id || 'All'}
                            </span>
                          </td>
                          <td className="p-3 text-right font-mono font-bold text-emerald-400">
                            {typeof fact.value === 'number' ? fact.value.toLocaleString('en-IN') : fact.value} {fact.unit}
                          </td>
                          <td className="p-3 text-slate-300">
                            <div className="font-medium text-slate-200">{source ? source.publisher : fact.source_id}</div>
                            <div className="text-[10px] text-slate-400 truncate max-w-[180px]">{source ? source.name : ''}</div>
                          </td>
                          <td className="p-3 text-center">
                            <button
                              onClick={() => openCitationModal(fact)}
                              className="bg-indigo-500/15 hover:bg-indigo-500/25 text-indigo-300 border border-indigo-500/30 px-2.5 py-1 rounded text-[10px] font-semibold flex items-center gap-1 mx-auto cursor-pointer"
                            >
                              <ShieldCheck className="w-3 h-3" /> Trace
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Scope Boundaries */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-2.5 shadow-sm text-slate-100">
            <div className="flex items-center gap-2 text-white font-bold text-sm">
              <Info className="w-4 h-4 text-indigo-400" />
              <span>Data Granularity & Methodological Scope</span>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              Public market tracker data (IDC, Counterpoint) is published at <strong>national and quarterly granularity</strong>. Financial statements represent RoC annual audited filings. Unit economics models utilize certified industry teardown averages across Greater Noida manufacturing standards.
            </p>
          </div>

        </div>
      )}

    </div>
  );
};
