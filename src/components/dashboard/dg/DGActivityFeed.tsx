'use client';

import React from 'react';
import { Badge } from '@/components/ui/Badge';
import { Clock, UserPlus, CheckCircle, AlertCircle } from 'lucide-react';

interface Activity {
  id: string;
  type: 'inscription' | 'paiement' | 'presence' | 'validation';
  message: string;
  center: string;
  time: string;
  status: 'success' | 'warning' | 'info';
}

const mockActivities: Activity[] = [
  { id: '1', type: 'inscription', message: 'Nouvel enfant inscrit: Koffi Ama', center: 'Lomé 1', time: 'Il y a 5 min', status: 'success' },
  { id: '2', type: 'paiement', message: 'Paiement reçu: Marie Yao (Mensualité)', center: 'Lomé 2', time: 'Il y a 15 min', status: 'info' },
  { id: '3', type: 'validation', message: 'Nouveau teacher en attente: Marc Esso', center: 'Kpalimé', time: 'Il y a 1h', status: 'warning' },
  { id: '4', type: 'presence', message: 'Taux de présence critique: Centre Atakpamé', center: 'Atakpamé', time: 'Il y a 3h', status: 'warning' },
  { id: '5', type: 'inscription', message: 'Nouvel enfant inscrit: Sarah Mensah', center: 'Lomé 1', time: 'Il y a 5h', status: 'success' },
];

export const DGActivityFeed = () => {
  return (
    <div className="p-6 bg-white border border-pure-black/10 rounded-2xl h-full">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-pure-black tracking-tight">Activités Récentes</h3>
        <button className="text-xs font-bold text-brand-red hover:underline uppercase tracking-wider">Voir tout</button>
      </div>
      
      <div className="space-y-6">
        {mockActivities.map((activity) => (
          <div key={activity.id} className="flex gap-4 group">
            <div className="relative">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                activity.status === 'success' ? 'bg-green-100 text-green-600' : 
                activity.status === 'warning' ? 'bg-red-100 text-brand-red' : 'bg-pure-black/5 text-pure-black/60'
              }`}>
                {activity.type === 'inscription' && <UserPlus size={18} />}
                {activity.type === 'paiement' && <CheckCircle size={18} />}
                {activity.type === 'validation' && <UserPlus size={18} />}
                {activity.type === 'presence' && <AlertCircle size={18} />}
              </div>
              {/* Timeline line */}
              <div className="absolute top-10 left-1/2 -translate-x-1/2 w-px h-full bg-pure-black/5 group-last:hidden" />
            </div>
            
            <div className="flex-1 pb-6">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-bold text-pure-black">{activity.message}</span>
                <div className="flex items-center gap-1 text-[10px] text-pure-black/40 font-medium">
                  <Clock size={12} />
                  {activity.time}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline">{activity.center}</Badge>
                <Badge variant={activity.status === 'success' ? 'success' : activity.status === 'warning' ? 'danger' : 'secondary'}>
                  {activity.type}
                </Badge>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};