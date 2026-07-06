'use client';

import React from 'react';
import { Users, School, UserCheck, CreditCard, TrendingUp } from 'lucide-react';

interface StatItem {
  label: string;
  value: string;
  icon: any;
  trend: string;
  trendUp: boolean;
}

const stats: StatItem[] = [
  { label: 'Total Enfants', value: '1,284', icon: Users, trend: '+12%', trendUp: true },
  { label: 'Centres Actifs', value: '12', icon: School, trend: 'Stable', trendUp: true },
  { label: 'Teachers Actifs', value: '48', icon: UserCheck, trend: '+3', trendUp: true },
  { label: 'Revenus Mensuels', value: '2.4M FCFA', icon: CreditCard, trend: '+8%', trendUp: true },
];

export const DGStatsGrid = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, idx) => (
        <div key={idx} className="p-6 bg-white border border-pure-black/10 rounded-2xl hover:shadow-lg transition-all duration-300 group">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-pure-black text-white rounded-xl group-hover:bg-brand-red transition-colors duration-300">
              <stat.icon size={24} />
            </div>
            <div className={`flex items-center gap-1 text-xs font-bold ${stat.trendUp ? 'text-green-600' : 'text-red-600'}`}>
              <TrendingUp size={14} />
              {stat.trend}
            </div>
          </div>
          <div className="text-3xl font-bold text-pure-black tracking-tight">{stat.value}</div>
          <div className="text-sm text-pure-black/50 font-medium mt-1">{stat.label}</div>
        </div>
      ))}
    </div>
  );
};