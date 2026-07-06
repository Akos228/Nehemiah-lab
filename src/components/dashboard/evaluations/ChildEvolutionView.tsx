'use client';

import React from 'react';
import { Badge } from '@/components/ui/Badge';
import { TrendingUp, Award, AlertCircle } from 'lucide-react';

interface EvolutionData {
  date: string;
  score: string;
  category: string;
  comment: string;
}

const mockEvolution: EvolutionData[] = [
  { date: '2024-03-10', score: '10/20', category: 'academique', comment: 'Débuts difficiles en lecture.' },
  { date: '2024-04-05', score: '12/20', category: 'academique', comment: 'Progression notable dans la reconnaissance des lettres.' },
  { date: '2024-05-15', score: '16/20', category: 'academique', comment: 'Excellente progression en calcul mental.' },
];

export const ChildEvolutionView = ({ childName }: { childName: string }) => {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-bold text-pure-black tracking-tight">Évolution de {childName}</h3>
          <p className="text-sm text-pure-black/60">Suivi pédagogique et progression temporelle.</p>
        </div>
        <Badge variant="primary">En progression</Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 bg-pure-black text-white rounded-2xl flex flex-col items-center justify-center text-center space-y-2">
          <Award size={32} className="text-brand-red mb-2" />
          <span className="text-xs uppercase font-bold opacity-60">Meilleure Note</span>
          <span className="text-3xl font-bold">16/20</span>
        </div>
        <div className="p-6 bg-white border border-pure-black/10 rounded-2xl flex flex-col items-center justify-center text-center space-y-2">
          <TrendingUp size={32} className="text-brand-red mb-2" />
          <span className="text-xs uppercase font-bold text-pure-black/50">Progression</span>
          <span className="text-3xl font-bold text-pure-black">+60%</span>
        </div>
        <div className="p-6 bg-white border border-pure-black/10 rounded-2xl flex flex-col items-center justify-center text-center space-y-2">
          <AlertCircle size={32} className="text-pure-black/30 mb-2" />
          <span className="text-xs uppercase font-bold text-pure-black/50">Points d'attention</span>
          <span className="text-3xl font-bold text-pure-black">2</span>
        </div>
      </div>

      <div className="relative pl-8 space-y-8 before:content-[''] before:absolute before:left-3 before:top-2 before:bottom-2 before:w-px before:bg-pure-black/10">
        {mockEvolution.map((ev, idx) => (
          <div key={idx} className="relative">
            <div className="absolute -left-8 top-1 w-4 h-4 rounded-full bg-white border-2 border-brand-red" />
            <div className="p-4 bg-white border border-pure-black/10 rounded-xl hover:border-brand-red transition-colors">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-pure-black/40">{ev.date}</span>
                <span className="text-sm font-bold text-brand-red">{ev.score}</span>
              </div>
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="outline" className="text-[10px]">{ev.category}</Badge>
              </div>
              <p className="text-sm text-pure-black/70">{ev.comment}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};