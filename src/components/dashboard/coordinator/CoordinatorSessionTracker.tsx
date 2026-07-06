'use client';

import React from 'react';
import { Badge } from '@/components/ui/Badge';
import { Clock, PlayCircle, CheckCircle2 } from 'lucide-react';

interface Session {
  id: string;
  title: string;
  teacher: string;
  startTime: string;
  endTime: string;
  status: 'ongoing' | 'completed' | 'scheduled';
}

const mockSessions: Session[] = [
  { id: '1', title: 'Soutien Mathématiques', teacher: 'M. Koffi', startTime: '08:00', endTime: '10:00', status: 'completed' },
  { id: '2', title: 'Atelier Anglais', teacher: 'Mme. Yao', startTime: '10:30', endTime: '12:30', status: 'ongoing' },
  { id: '3', title: 'Lecture & Écriture', teacher: 'M. Esso', startTime: '14:00', endTime: '16:00', status: 'scheduled' },
];

export const CoordinatorSessionTracker = () => {
  return (
    <div className="p-6 bg-white border border-pure-black/10 rounded-2xl h-full">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-pure-black tracking-tight">Séances du Jour</h3>
        <Badge variant="outline">Lomé 1</Badge>
      </div>

      <div className="space-y-4">
        {mockSessions.map((session) => (
          <div key={session.id} className="p-4 border border-pure-black/5 rounded-xl hover:border-brand-red/30 transition-colors group">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${
                  session.status === 'ongoing' ? 'bg-brand-red text-white animate-pulse' : 
                  session.status === 'completed' ? 'bg-pure-black text-white' : 'bg-pure-black/5 text-pure-black/60'
                }`}>
                  {session.status === 'ongoing' ? <PlayCircle size={16} /> : <Clock size={16} />}
                </div>
                <span className="font-bold text-sm text-pure-black">{session.title}</span>
              </div>
              <Badge variant={session.status === 'ongoing' ? 'primary' : session.status === 'completed' ? 'secondary' : 'outline'}>
                {session.status === 'ongoing' ? 'En cours' : session.status === 'completed' ? 'Terminé' : 'Prévu'}
              </Badge>
            </div>
            
            <div className="flex items-center justify-between text-xs text-pure-black/50">
              <div className="flex items-center gap-1">
                <span className="font-medium text-pure-black">{session.teacher}</span>
              </div>
              <div className="flex items-center gap-2">
                <span>{session.startTime}</span>
                <span className="text-pure-black/20">→</span>
                <span>{session.endTime}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};