'use client';

import React, { useState } from 'react';
import { Table } from '@/components/ui/Table';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { CheckCircle, XCircle, Clock } from 'lucide-react';

interface ChildAttendance {
  id: string;
  name: string;
  status: 'present' | 'absent' | 'late' | 'pending';
  checkIn: string | null;
  checkOut: string | null;
}

const mockAttendance: ChildAttendance[] = [
  { id: '1', name: 'Koffi Ama', status: 'present', checkIn: '08:05', checkOut: null },
  { id: '2', name: 'Marie Yao', status: 'absent', checkIn: null, checkOut: null },
  { id: '3', name: 'Jean Dupont', status: 'late', checkIn: '08:45', checkOut: null },
  { id: '4', name: 'Sarah Mensah', status: 'present', checkIn: '07:55', checkOut: null },
  { id: '5', name: 'Luc Yao', status: 'pending', checkIn: null, checkOut: null },
];

export const TeacherAttendanceTable = () => {
  const [attendance, setAttendance] = useState(mockAttendance);

  const toggleStatus = (id: string, status: ChildAttendance['status']) => {
    setAttendance(prev => prev.map(child => 
      child.id === id ? { ...child, status, checkIn: status === 'present' ? '08:00' : null } : child
    ));
  };

  // Explicitly typing the columns to match TableProps<T>
  const columns: {
    header: string;
    accessor: keyof ChildAttendance | ((item: ChildAttendance) => React.ReactNode);
    className?: string;
  }[] = [
    { header: 'Élève', accessor: 'name', className: 'font-bold text-pure-black' },
    { 
      header: 'Statut', 
      accessor: (item: ChildAttendance) => (
        <div className="flex items-center gap-2">
          <Badge variant={item.status === 'present' ? 'success' : item.status === 'absent' ? 'danger' : 'outline'}>
            {item.status === 'present' ? 'Présent' : item.status === 'absent' ? 'Absent' : item.status === 'late' ? 'Retard' : 'En attente'}
          </Badge>
        </div>
      ) 
    },
    { header: 'Entrée', accessor: 'checkIn' },
    { header: 'Sortie', accessor: 'checkOut' },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-lg font-bold text-pure-black tracking-tight">Prise de Présence</h3>
        <div className="flex gap-2">
          <Button variant="ghost" className="text-xs py-1 h-8">Réinitialiser</Button>
          <Button variant="primary" className="text-xs py-1 h-8 gap-2">
            <CheckCircle size={14} />
            Valider la session
          </Button>
        </div>
      </div>

      <Table 
        data={attendance} 
        columns={columns}
      >
        {(item) => (
          <div className="flex items-center justify-end gap-2">
            <Button 
              variant="ghost" 
              className="p-1.5 text-green-600 hover:bg-green-50" 
              onClick={() => toggleStatus(item.id, 'present')}
              title="Marquer Présent"
            >
              <CheckCircle size={16} />
            </Button>
            <Button 
              variant="ghost" 
              className="p-1.5 text-red-600 hover:bg-red-50" 
              onClick={() => toggleStatus(item.id, 'absent')}
              title="Marquer Absent"
            >
              <XCircle size={16} />
            </Button>
            <Button 
              variant="ghost" 
              className="p-1.5 text-orange-500 hover:bg-orange-50" 
              onClick={() => toggleStatus(item.id, 'late')}
              title="Marquer Retard"
            >
              <Clock size={16} />
            </Button>
          </div>
        )}
      </Table>
    </div>
  );
};