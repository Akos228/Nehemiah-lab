'use client';

import React from 'react';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Clock, BookOpen, MapPin } from 'lucide-react';

interface Session {
  id: string;
  title: string;
  subject: string;
  startTime: string;
  endTime: string;
  room: string;
  status: 'current' | 'upcoming' | 'past';
}

const mockSessions: Session[] = [
  { id: '1', title: 'Soutien Mathématiques', subject: 'Maths', startTime: '08:00', endTime: '10:00', room: 'Salle A1', status: 'current' },
  { id: '2', title: 'Atelier Anglais', subject: 'Anglais', startTime: '10:30', endTime: '12:30', room: 'Salle B2', status: 'upcoming' },
  { id: '3', title: 'Lecture & Écriture', subject: 'Français', startTime: '14:00', endTime: '16:00', room: 'Salle A1', status: 'upcoming' },
];

export const TeacherSessionCard = () => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-bold text-pure-black tracking-tight">Mes Séances du Jour</h3>
      <div className="grid grid-cols-1 gap-4">
        {mockSessions.map((session) => (
          <div 
            key={session.id} 
            className={`p-5 border rounded-2xl transition-all duration-300 ${
              session.status === 'current' 
                ? 'border-brand-red bg-brand-red/5 ring-1 ring-brand-red' 
                : 'border-pure-black/10 bg-white'
            }`}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${session.status === 'current' ? 'bg-brand-red text-white' : 'bg-pure-black text-white'}`}>
                  <BookOpen size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-pure-black leading-none">{session.title}</h4>
                  <span className="text-xs text-pure-black/50">{session.subject}</span>
                </div>
              </div>
              <Badge variant={session.status === 'current' ? 'primary' : 'outline'}>
                {session.status === 'current' ? 'En cours' : 'À venir'}
              </Badge>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="flex items-center gap-2 text-xs text-pure-black/60">
                <Clock size={14} />
                <span>{session.startTime} - {session.endTime}</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-pure-black/60">
                <MapPin size={14} />
                <span>{session.room}</span>
              </div>
            </div>

            <div className="flex gap-2">
              <Button variant="primary" className="flex-1 py-2 text-xs" disabled={session.status !== 'current'}>
                Prendre Présence
              </Button>
              <Button variant="secondary" className="flex-1 py-2 text-xs">
                Noter Élèves
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};