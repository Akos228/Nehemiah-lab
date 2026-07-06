'use client';

import React, { useState } from 'react';
import { Table } from '@/components/ui/Table';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';
import { ChildForm } from '@/components/dashboard/children/ChildForm';
import { Search, Plus, Edit2, Eye, Filter } from 'lucide-react';
import { Child } from '@/types/database';

const mockChildren: Child[] = [
  { id: '1', first_name: 'Koffi', last_name: 'Ama', birth_date: '2012-05-14', center_id: 'center-1', parent_contact: '+228 90000001', status: 'active', created_at: '2024-01-10' },
  { id: '2', first_name: 'Marie', last_name: 'Yao', birth_date: '2013-08-22', center_id: 'center-1', parent_contact: '+228 90000002', status: 'active', created_at: '2024-01-12' },
  { id: '3', first_name: 'Jean', last_name: 'Dupont', birth_date: '2011-11-05', center_id: 'center-2', parent_contact: '+228 90000003', status: 'inactive', created_at: '2023-12-01' },
  { id: '4', first_name: 'Sarah', last_name: 'Mensah', birth_date: '2014-02-28', center_id: 'center-3', parent_contact: '+228 90000004', status: 'active', created_at: '2024-02-15' },
  { id: '5', first_name: 'Luc', last_name: 'Yao', birth_date: '2012-09-10', center_id: 'center-1', parent_contact: '+228 90000005', status: 'active', created_at: '2024-01-20' },
];

export default function ChildrenPage() {
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedChild, setSelectedChild] = useState<Child | null>(null);
  const [filterCenter, setFilterCenter] = useState('Tous');

  const filteredChildren = mockChildren.filter(child => 
    (child.first_name + ' ' + child.last_name).toLowerCase().includes(search.toLowerCase()) &&
    (filterCenter === 'Tous' || child.center_id === filterCenter)
  );

  // Explicitly typing the columns to match TableProps<T>
  const columns: {
    header: string;
    accessor: keyof Child | ((item: Child) => React.ReactNode);
    className?: string;
  }[] = [
    { 
      header: 'Enfant', 
      accessor: (item: Child) => (
        <span className="font-bold text-pure-black">{item.first_name} {item.last_name}</span>
      ) 
    },
    { header: 'Centre', accessor: (item: Child) => {
      const centers: Record<string, string> = { 'center-1': 'Lomé 1', 'center-2': 'Lomé 2', 'center-3': 'Kpalimé', 'center-4': 'Atakpamé' };
      return centers[item.center_id] || 'Inconnu';
    }},
    { header: 'Date Naiss.', accessor: 'birth_date' },
    { 
      header: 'Statut', 
      accessor: (item: Child) => (
        <Badge variant={item.status === 'active' ? 'success' : 'danger'}>
          {item.status === 'active' ? 'Actif' : 'Inactif'}
        </Badge>
      ) 
    },
  ];

  const handleOpenAdd = () => {
    setSelectedChild(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (child: Child) => {
    setSelectedChild(child);
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-pure-black tracking-tight">Gestion des Enfants</h1>
          <p className="text-pure-black/60">Répertoire complet des enfants accompagnés par Nehemiah Lab.</p>
        </div>
        <Button variant="primary" className="gap-2" onClick={handleOpenAdd}>
          <Plus size={18} />
          Inscrire un enfant
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-center">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-pure-black/30" size={18} />
          <Input 
            className="pl-10" 
            placeholder="Rechercher un enfant par nom..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2 bg-white border border-pure-black/10 rounded-full px-3 py-1.5 shadow-sm">
          <Filter size={16} className="text-pure-black/40" />
          <select 
            className="bg-transparent text-sm font-medium outline-none text-pure-black cursor-pointer"
            value={filterCenter}
            onChange={(e) => setFilterCenter(e.target.value)}
          >
            <option value="Tous">Tous les centres</option>
            <option value="center-1">Lomé 1</option>
            <option value="center-2">Lomé 2</option>
            <option value="center-3">Kpalimé</option>
            <option value="center-4">Atakpamé</option>
          </select>
        </div>
      </div>

      <Table 
        data={filteredChildren} 
        columns={columns}
      >
        {(item) => (
          <div className="flex items-center justify-end gap-2">
            <Button variant="ghost" className="p-2 text-pure-black/60 hover:text-pure-black" onClick={() => console.log('View', item.id)}>
              <Eye size={16} />
            </Button>
            <Button variant="ghost" className="p-2 text-pure-black/60 hover:text-pure-black" onClick={() => handleOpenEdit(item)}>
              <Edit2 size={16} />
            </Button>
          </div>
        )}
      </Table>

      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title={selectedChild ? "Modifier l'enfant" : "Nouvelle Inscription"}
        size="md"
      >
        <ChildForm 
          initialData={selectedChild} 
          onSubmit={(data) => {
            console.log('Saving child:', data);
            setIsModalOpen(false);
          }} 
          onCancel={() => setIsModalOpen(false)} 
        />
      </Modal>
    </div>
  );
}