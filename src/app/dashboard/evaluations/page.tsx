'use client';

import React, { useState } from 'react';
import { Table } from '@/components/ui/Table';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';
import { EvaluationForm } from '@/components/dashboard/evaluations/EvaluationForm';
import { Search, Plus, Filter, TrendingUp as TrendingUpIcon } from 'lucide-react';
import { Evaluation } from '@/types/database';

const mockEvaluations: Evaluation[] = [
  { id: '1', child_id: 'child-1', teacher_id: 'user-1', category: 'academique', score: '16/20', comments: 'Excellente progression en calcul mental.', evaluation_date: '2024-05-15', created_at: '2024-05-15' },
  { id: '2', child_id: 'child-1', teacher_id: 'user-1', category: 'comportement', score: 'A', comments: 'Très attentif et participatif.', evaluation_date: '2024-05-15', created_at: '2024-05-15' },
  { id: '3', child_id: 'child-2', teacher_id: 'user-2', category: 'academique', score: '12/20', comments: 'Doit travailler la lecture.', evaluation_date: '2024-05-14', created_at: '2024-05-14' },
  { id: '4', child_id: 'child-3', teacher_id: 'user-1', category: 'participation', score: 'B', comments: 'S\'implique davantage dans les activités de groupe.', evaluation_date: '2024-05-13', created_at: '2024-05-13' },
];

export default function EvaluationsPage() {
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filterCategory, setFilterCategory] = useState('Toutes');

  const filteredEvals = mockEvaluations.filter(ev => 
    (ev.comments.toLowerCase().includes(search.toLowerCase()) || ev.category.toLowerCase().includes(search.toLowerCase())) &&
    (filterCategory === 'Toutes' || ev.category === filterCategory)
  );

  // Explicitly typing the columns to match TableProps<T>
  const columns: {
    header: string;
    accessor: keyof Evaluation | ((item: Evaluation) => React.ReactNode);
    className?: string;
  }[] = [
    { 
      header: 'Enfant', 
      accessor: (item: Evaluation) => {
        const children: Record<string, string> = { 'child-1': 'Koffi Ama', 'child-2': 'Marie Yao', 'child-3': 'Jean Dupont' };
        return <span className="font-bold text-pure-black">{children[item.child_id] || 'Inconnu'}</span>;
      } 
    },
    { 
      header: 'Catégorie', 
      accessor: (item: Evaluation) => (
        <Badge variant="outline">{item.category}</Badge>
      ) 
    },
    { header: 'Note / Score', accessor: 'score', className: 'font-bold text-brand-red' },
    { header: 'Date', accessor: 'evaluation_date' },
    { 
      header: 'Commentaire', 
      accessor: (item: Evaluation) => (
        <span className="text-sm text-pure-black/70 truncate max-w-xs block">{item.comments}</span>
      ) 
    },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-pure-black tracking-tight">Suivi des Évaluations</h1>
          <p className="text-pure-black/60">Analyse des progrès et compétences des enfants.</p>
        </div>
        <Button variant="primary" className="gap-2" onClick={() => setIsModalOpen(true)}>
          <Plus size={18} />
          Nouvelle Évaluation
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-center">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-pure-black/30" size={18} />
          <Input 
            className="pl-10" 
            placeholder="Rechercher un commentaire ou une catégorie..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2 bg-white border border-pure-black/10 rounded-full px-3 py-1.5 shadow-sm">
          <Filter size={16} className="text-pure-black/40" />
          <select 
            className="bg-transparent text-sm font-medium outline-none text-pure-black cursor-pointer"
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
          >
            <option value="Toutes">Toutes catégories</option>
            <option value="academique">Académique</option>
            <option value="comportement">Comportement</option>
            <option value="participation">Participation</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3">
          <Table 
            data={filteredEvals} 
            columns={columns}
          >
            {(item) => (
              <Button variant="ghost" className="p-2 text-pure-black/60 hover:text-pure-black">
                Détails
              </Button>
            )}
          </Table>
        </div>
        
        <div className="p-6 bg-pure-black text-white rounded-2xl shadow-xl">
          <div className="flex items-center gap-2 mb-6">
            <TrendingUpIcon size={20} className="text-brand-red" />
            <h3 className="font-bold">Analyse Globale</h3>
          </div>
          <div className="space-y-6">
            <div className="flex justify-between items-end">
              <span className="text-xs text-white/50 uppercase font-bold">Taux de réussite</span>
              <span className="text-2xl font-bold">84%</span>
            </div>
            <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
              <div className="bg-brand-red h-full w-[84%]" />
            </div>
            <p className="text-xs text-white/60 leading-relaxed">
              La majorité des enfants progressent rapidement en calcul mental ce trimestre.
            </p>
          </div>
        </div>
      </div>

      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title="Saisir une Évaluation"
        size="md"
      >
        <EvaluationForm 
          childName="Koffi Ama" 
          sessionTitle="Soutien Mathématiques" 
          onSubmit={(data) => {
            console.log('Saving evaluation:', data);
            setIsModalOpen(false);
          }} 
          onCancel={() => setIsModalOpen(false)} 
        />
      </Modal>
    </div>
  );
}