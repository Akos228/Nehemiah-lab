'use client';

import React from 'react';
import { Users, BookOpen, Star, Clock } from 'lucide-react';

interface StatItem {
  label: string;
  value: string;
  icon: any;
  subtext: string;
}

const stats: StatItem[] = [
  { label: 'Enfants Suivis', value: '24', icon: Users, subtext: 'Ce mois' },
  { label: 'Heures de Cours', value: '42h', icon: Clock, subtext: 'Cumulées' },
  { label: 'Séances Effectuées', value: '18', icon: BookOpen, subtext: 'Ce trimestre' },
  { label: 'Moyenne Éval.', value: '14/20', icon: Star, subtext: 'Global' },
];

export const TeacherStats = () => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, idx) => (
        <div key={idx} className="p-4 bg-white border border-pure-black/10 rounded-2xl hover:border-brand-red transition-all duration-300">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-pure-black text-white rounded-lg">
              <stat.icon size={18} />
            </div>
          </div>
          <div className="text-xl font-bold text-pure-black tracking-tight">{stat.value}</div>
          <div className="text-[10px] font-medium text-pure-black/50 uppercase tracking-wider">{stat.label}</div>
          <div className="text-[10px] text-brand-red font-bold mt-1">{stat.subtext}</div>
        </div>
      ))}
    </div>
  );
};