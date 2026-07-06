'use client';

import React, { useState, useEffect } from 'react';
import { Table } from '@/components/ui/Table';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { Search, Filter, Calendar, Download, CheckCircle } from 'lucide-react';
import { Attendance } from '@/types/database';

import { db } from '@/lib/firebase/config';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { AttendanceForm } from '@/components/dashboard/attendance/AttendanceForm';

export default function AttendancePage() {
  const [attendance, setAttendance] = useState<Attendance[]>([]);
  const [childrenMap, setChildrenMap] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [dateFilter, setDateFilter] = useState(new Date().toISOString().split('T')[0]);
  const [centerFilter, setCenterFilter] = useState('all');
  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => {
    fetchAttendanceAndChildren();
  }, [dateFilter, centerFilter]);

  async function fetchAttendanceAndChildren() {
    setLoading(true);
    try {
      // 1. Fetch children to map IDs to names
      const childrenSnap = await getDocs(collection(db, 'children'));
      const map: Record<string, string> = {};
      childrenSnap.forEach(doc => {
        map[doc.id] = doc.data().full_name;
      });
      setChildrenMap(map);

      // 2. Fetch attendance with filters
      let q = query(collection(db, 'attendance'), where('date', '==', dateFilter));
      
      if (centerFilter !== 'all') {
        q = query(q, where('center_id', '==', centerFilter));
      }

      const attSnap = await getDocs(q);
      const data = attSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Attendance[];
      setAttendance(data);
    } catch (err) {
      console.error('Error fetching attendance:', err);
    } finally {
      setLoading(false);
    }
  }

  const filteredAttendance = attendance.filter(att => {
    const childName = childrenMap[att.child_id] || 'Inconnu';
    return childName.toLowerCase().includes(search.toLowerCase());
  });

  // Explicitly typing the columns to match TableProps<T>
  const columns: {
    header: string;
    accessor: keyof Attendance | ((item: Attendance) => React.ReactNode);
    className?: string;
  }[] = [
    { 
      header: 'Enfant', 
      accessor: (item: Attendance) => (
        <span className="font-bold text-pure-black">{childrenMap[item.child_id] || 'Inconnu'}</span>
      ) 
    },
    { 
      header: 'Statut', 
      accessor: (item: Attendance) => (
        <Badge variant={item.check_in ? 'success' : 'danger'}>
          {item.check_in ? 'Présent' : 'Absent'}
        </Badge>
      ) 
    },
    { header: 'Heure Entrée', accessor: 'check_in' },
    { header: 'Heure Sortie', accessor: 'check_out' },
    { header: 'Date', accessor: 'date' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-pure-black tracking-tight">Suivi des Présences</h1>
          <p className="text-pure-black/60">Historique et contrôle des entrées/sorties des enfants.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="secondary" className="gap-2">
            <Download size={16} />
            Exporter Rapport
          </Button>
          <Button variant="primary" className="gap-2" onClick={() => setIsFormOpen(true)}>
            <CheckCircle size={16} />
            Nouvelle Session
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-pure-black/30" size={18} />
          <Input 
            className="pl-10" 
            placeholder="Rechercher un enfant..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2 bg-white border border-pure-black/10 rounded-full px-3 py-1.5 shadow-sm">
          <Calendar size={16} className="text-pure-black/40" />
          <input 
            type="date" 
            className="bg-transparent text-sm font-medium outline-none text-pure-black cursor-pointer"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2 bg-white border border-pure-black/10 rounded-full px-3 py-1.5 shadow-sm">
          <Filter size={16} className="text-pure-black/40" />
          <select className="bg-transparent text-sm font-medium outline-none text-pure-black cursor-pointer">
            <option value="all">Tous les centres</option>
            <option value="center-1">Lomé 1</option>
            <option value="center-2">Lomé 2</option>
          </select>
        </div>
      </div>

      <Table 
        data={filteredAttendance} 
        columns={columns}
      >
        {(item) => (
          <div className="flex items-center justify-end gap-2">
            <Button variant="ghost" className="p-2 text-pure-black/60 hover:text-pure-black">
              <Edit2 size={16} />
            </Button>
          </div>
        )}
      </Table>

      {isFormOpen && (
        <AttendanceForm 
          onClose={() => setIsFormOpen(false)} 
          onSave={() => {
            setIsFormOpen(false);
            fetchAttendanceAndChildren();
          }} 
        />
      )}
    </div>
  );
}

function Edit2({ size }: { size: number }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
    </svg>
  );
}