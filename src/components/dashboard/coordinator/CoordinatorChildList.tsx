'use client';

import React, { useState } from 'react';
import { Table } from '@/components/ui/Table';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Search, MoreVertical, UserPlus } from 'lucide-react';

interface ChildMock {
  id: string;
  name: string;
  status: 'Présent' | 'Absent' | 'Retard';
  lastEvaluation: string;
  behavior: 'Excellent' | 'Stable' | 'Alerte';
}

const mockChildren: ChildMock[] = [
  { id: '1', name: 'Koffi Ama', status: 'Présent', lastEvaluation: '12/05', behavior: 'Excellent' },
  { id: '2', name: 'Marie Yao', status: 'Absent', lastEvaluation: '10/05', behavior: 'Stable' },
  { id: '3', name: 'Jean Dupont', status: 'Présent', lastEvaluation: '14/05', behavior: 'Alerte' },
  { id: '4', name: 'Sarah Mensah', status: 'Présent', lastEvaluation: '11/05', behavior: 'Excellent' },
  { id: '5', name: 'Luc Yao', status: 'Retard', lastEvaluation: '09/05', behavior: 'Stable' },
];

export const CoordinatorChildList = () => {
  const [search, setSearch] = useState('');

  const filteredChildren = mockChildren.filter(child => 
    child.name.toLowerCase().includes(search.toLowerCase())
  );

  // Explicitly typing the columns to match TableProps<T>
  const columns: {
    header: string;
    accessor: keyof ChildMock | ((item: ChildMock) => React.ReactNode);
    className?: string;
  }[] = [
    { header: 'Enfant', accessor: 'name', className: 'font-bold text-pure-black' },
    { 
      header: 'Statut', 
      accessor: (item: ChildMock) => (
        <Badge variant={item.status === 'Présent' ? 'success' : item.status === 'Absent' ? 'danger' : 'outline'}>
          {item.status}
        </Badge>
      ) 
    },
    { header: 'Dernière Éval.', accessor: 'lastEvaluation' },
    { 
      header: 'Conduite', 
      accessor: (item: ChildMock) => (
        <Badge variant={item.behavior === 'Excellent' ? 'primary' : item.behavior === 'Alerte' ? 'danger' : 'secondary'}>
          {item.behavior}
        </Badge>
      ) 
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-pure-black/30" size={18} />
          <Input 
            className="pl-10" 
            placeholder="Rechercher un enfant..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <Button variant="primary" className="gap-2">
          <UserPlus size={18} />
          Inscrire Enfant
        </Button>
      </div>

      <Table 
        data={filteredChildren} 
        columns={columns}
      >
        {(item) => (
          <div className="flex items-center justify-end">
            <Button variant="ghost" className="p-2">
              <MoreVertical size={16} />
            </Button>
          </div>
        )}
      </Table>
    </div>
  );
};