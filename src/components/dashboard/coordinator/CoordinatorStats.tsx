'use client';

import React from 'react';
import { Users, UserCheck, Clock, AlertTriangle } from 'lucide-react';

interface StatItem {
  label: string;
  value: string;
  icon: any;
  subtext: string;
  color: 'red' | 'black';
}

const stats: StatItem[] = [
  { label: 'Enfants Inscrits', value: '142', icon: Users, subtext: 'Ce centre', color: 'black' },
  { label: 'Présence Actuelle', value: '88%', icon: Clock, subtext: 'Aujourd\'hui', color: 'red' },
  { label: 'Teachers Actifs', value: '6', icon: UserCheck, subtext: 'En service', color: 'black' },
  { label: 'Alertes Conduite', value: '3', icon: AlertTriangle, subtext: 'À traiter', color: 'red' },
];

export const CoordinatorStats = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, idx) => (
        <div key={idx} className="p-5 bg-white border border-pure-black/10 rounded-2xl hover:shadow-md transition-all duration-300 group">
          <div className="flex items-center justify-between mb-3">
            <div className={`p-2 rounded-lg transition-colors duration-300 ${
              stat.color === 'red' ? 'bg-brand-red text-white' : 'bg-pure-black text-white'
            }`}>
              <stat.icon size={20} />
            </div>
          </div>
          <div className="text-2xl font-bold text-pure-black tracking-tight">{stat.value}</div>
          <div className="flex items-center justify-between mt-1">
            <span className="text-xs font-medium text-pure-black/50">{stat.label}</span>
            <span className="text-[10px] font-bold uppercase text-pure-black/30">{stat.subtext}</span>
          </div>
        </div>
      ))}
    </div>
  );
};