'use client';

import React, { useState, useEffect } from 'react';
import { auth, db } from '@/lib/firebase/config';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { Role, Profile } from '@/types/database';
import { DGStatsGrid } from '@/components/dashboard/dg/DGStatsGrid';
import { DGActivityFeed } from '@/components/dashboard/dg/DGActivityFeed';
import { DGQuickActions } from '@/components/dashboard/dg/DGQuickActions';
import { CoordinatorStats } from '@/components/dashboard/coordinator/CoordinatorStats';
import { CoordinatorChildList } from '@/components/dashboard/coordinator/CoordinatorChildList';
import { CoordinatorSessionTracker } from '@/components/dashboard/coordinator/CoordinatorSessionTracker';
import { TeacherStats } from '@/components/dashboard/teacher/TeacherStats';
import { TeacherAttendanceTable } from '@/components/dashboard/teacher/TeacherAttendanceTable';
import { TeacherSessionCard } from '@/components/dashboard/teacher/TeacherSessionCard';
import { Button } from '@/components/ui/Button';
import { Filter, Download } from 'lucide-react';

export default function DashboardPage() {
  const [role, setRole] = useState<Role | null>(null);
  const [loading, setLoading] = useState(true);
  const [centerFilter, setCenterFilter] = useState('Tous les centres');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      try {
        if (user) {
          const docRef = doc(db, 'profiles', user.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setRole((docSnap.data() as Profile).role);
          } else {
            setRole('TEACHER');
          }
        }
      } catch (err) {
        console.error('Error fetching role:', err);
      } finally {
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-brand-red border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // --- DG VIEW ---
  if (role === 'DG') {
    // Mock data for centers to demonstrate filtering
    const centersData = [
      { name: 'Lomé 1', children: 450, presence: '98%', status: 'Optimal', activity: 'Saisie terminée' },
      { name: 'Lomé 2', children: 320, presence: '92%', status: 'Stable', activity: 'En cours' },
      { name: 'Kpalimé', children: 210, presence: '85%', status: 'Attention', activity: 'Retard' },
      { name: 'Atakpamé', children: 304, presence: '78%', status: 'Critique', activity: 'Alerte' },
    ];

    const filteredCenters = centerFilter === 'Tous les centres' 
      ? centersData 
      : centersData.filter(c => c.name === centerFilter);

    return (
      <div className="space-y-8 animate-in fade-in duration-500">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-pure-black tracking-tight">Vue d'Ensemble DG</h1>
            <p className="text-pure-black/60">Analyse globale et pilotage de Nehemiah Lab.</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-white border border-pure-black/10 rounded-full px-3 py-1.5 shadow-sm">
              <Filter size={16} className="text-pure-black/40" />
              <select 
                className="bg-transparent text-sm font-medium outline-none text-pure-black cursor-pointer"
                value={centerFilter}
                onChange={(e) => setCenterFilter(e.target.value)}
              >
                <option value="Tous les centres">Tous les centres</option>
                <option value="Lomé 1">Lomé 1</option>
                <option value="Lomé 2">Lomé 2</option>
                <option value="Kpalimé">Kpalimé</option>
                <option value="Atakpamé">Atakpamé</option>
              </select>
            </div>
            <Button variant="secondary" className="gap-2" onClick={() => alert('Export PDF en cours de développement pour le MVP')}>
              <Download size={16} />
              Exporter
            </Button>
          </div>
        </div>

        <DGQuickActions />
        <DGStatsGrid />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 p-6 bg-white border border-pure-black/10 rounded-2xl shadow-sm">
            <h3 className="text-lg font-bold text-pure-black tracking-tight mb-6">
              {centerFilter === 'Tous les centres' ? 'Performance par Centre' : `Performance : ${centerFilter}`}
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-pure-black text-pure-white">
                    <th className="px-4 py-3 text-xs font-bold uppercase tracking-wider rounded-tl-xl">Centre</th>
                    <th className="px-4 py-3 text-xs font-bold uppercase tracking-wider">Enfants</th>
                    <th className="px-4 py-3 text-xs font-bold uppercase tracking-wider">Présence</th>
                    <th className="px-4 py-3 text-xs font-bold uppercase tracking-wider rounded-tr-xl">Statut</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-pure-black/5">
                  {filteredCenters.map((center, i) => (
                    <tr key={i} className="hover:bg-pure-black/[0.02] transition-colors">
                      <td className="px-4 py-4 text-sm font-bold text-pure-black">{center.name}</td>
                      <td className="px-4 py-4 text-sm text-pure-black/70">{center.children}</td>
                      <td className="px-4 py-4 text-sm text-pure-black/70">{center.presence}</td>
                      <td className="px-4 py-4 text-sm">
                        <span className={`px-2 py-0.5 text-[10px] font-bold uppercase rounded-full ${
                          center.status === 'Optimal' ? 'bg-green-100 text-green-700' : 
                          center.status === 'Critique' ? 'bg-red-100 text-brand-red' : 'bg-pure-black/10 text-pure-black'
                        }`}>
                          {center.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="lg:col-span-1">
            <DGActivityFeed />
          </div>
        </div>
      </div>
    );
  }

  // --- COORDINATOR VIEW ---
  if (role === 'COORDINATOR') {
    return (
      <div className="space-y-8 animate-in fade-in duration-500">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-pure-black tracking-tight">Dashboard Centre</h1>
            <p className="text-pure-black/60">Gestion opérationnelle du Centre Lomé 1.</p>
          </div>
          <Button variant="primary" className="gap-2">
            Prendre Présence
          </Button>
        </div>

        <CoordinatorStats />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="p-6 bg-white border border-pure-black/10 rounded-2xl shadow-sm">
              <h3 className="text-lg font-bold text-pure-black tracking-tight mb-6">Liste des Enfants</h3>
              <CoordinatorChildList />
            </div>
          </div>
          <div className="lg:col-span-1">
            <CoordinatorSessionTracker />
          </div>
        </div>
      </div>
    );
  }

  // --- TEACHER VIEW ---
  if (role === 'TEACHER') {
    return (
      <div className="space-y-8 animate-in fade-in duration-500">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-pure-black tracking-tight">Mon Espace Teacher</h1>
            <p className="text-pure-black/60">Suivi quotidien et gestion des séances - Centre Lomé 1.</p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="secondary" className="gap-2">
              Mon Calendrier
            </Button>
            <Button variant="primary" className="gap-2">
              Saisie Rapide
            </Button>
          </div>
        </div>

        <TeacherStats />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="p-6 bg-white border border-pure-black/10 rounded-2xl shadow-sm">
              <TeacherAttendanceTable />
            </div>
          </div>
          <div className="lg:col-span-1">
            <TeacherSessionCard />
          </div>
        </div>
      </div>
    );
  }

  // --- FALLBACK ---
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-4">
      <h1 className="text-2xl font-bold">Dashboard en cours de développement</h1>
      <p className="text-pure-black/60">L'interface pour le rôle {role} sera disponible prochainement.</p>
      <Button variant="primary" onClick={() => window.location.href = '/login'}>
        Retour au Login
      </Button>
    </div>
  );
}