'use client';

import React, { useState } from 'react';
import { Table } from '@/components/ui/Table';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';
import { PaymentForm } from '@/components/dashboard/finance/PaymentForm';
import { Search, Plus, Filter, Download, Eye, CreditCard } from 'lucide-react';

interface Payment {
  id: string;
  amount: number;
  payment_date: string;
  beneficiary: string;
  type: string;
  status: 'Payé' | 'En attente' | 'Rejeté';
  proof_url: string | null;
  center: string;
}

const mockPayments: Payment[] = [
  { id: '1', amount: 5000, payment_date: '2024-05-20', beneficiary: 'Koffi Ama', type: 'mensualite', status: 'Payé', proof_url: 'https://via.placeholder.com/400x600', center: 'Lomé 1' },
  { id: '2', amount: 10000, payment_date: '2024-05-19', beneficiary: 'Marie Yao', type: 'inscription', status: 'En attente', proof_url: null, center: 'Lomé 1' },
  { id: '3', amount: 2500, payment_date: '2024-05-18', beneficiary: 'Jean Dupont', type: 'mensualite', status: 'Payé', proof_url: 'https://via.placeholder.com/400x600', center: 'Lomé 2' },
  { id: '4', amount: 50000, payment_date: '2024-05-15', beneficiary: 'Donateur Anonyme', type: 'don', status: 'Payé', proof_url: 'https://via.placeholder.com/400x600', center: 'Global' },
  { id: '5', amount: 5000, payment_date: '2024-05-10', beneficiary: 'Sarah Mensah', type: 'mensualite', status: 'Rejeté', proof_url: 'https://via.placeholder.com/400x600', center: 'Kpalimé' },
];

export default function FinancePage() {
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);
  const [filterCenter, setFilterCenter] = useState('Tous');

  const filteredPayments = mockPayments.filter(p => 
    (p.beneficiary.toLowerCase().includes(search.toLowerCase()) || p.type.toLowerCase().includes(search.toLowerCase())) &&
    (filterCenter === 'Tous' || p.center === filterCenter)
  );

  // Explicitly typing the columns to match TableProps<T>
  const columns: {
    header: string;
    accessor: keyof Payment | ((item: Payment) => React.ReactNode);
    className?: string;
  }[] = [
    { 
      header: 'Bénéficiaire', 
      accessor: (item: Payment) => <span className="font-bold text-pure-black">{item.beneficiary}</span> 
    },
    { header: 'Montant', accessor: (item: Payment) => <span className="font-mono font-bold">{item.amount.toLocaleString()} FCFA</span> },
    { header: 'Date', accessor: 'payment_date' },
    { 
      header: 'Type', 
      accessor: (item: Payment) => <Badge variant="outline">{item.type}</Badge> 
    },
    { 
      header: 'Statut', 
      accessor: (item: Payment) => (
        <Badge variant={item.status === 'Payé' ? 'success' : item.status === 'En attente' ? 'outline' : 'danger'}>
          {item.status}
        </Badge>
      ) 
    },
    { header: 'Centre', accessor: 'center' },
  ];

  const handleOpenAdd = () => {
    setSelectedPayment(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (payment: Payment) => {
    setSelectedPayment(payment);
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Header & Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-pure-black tracking-tight">Comptabilité</h1>
            <p className="text-pure-black/60">Gestion des flux financiers et preuves de paiement.</p>
          </div>
          <Button variant="primary" className="gap-2" onClick={handleOpenAdd}>
            <Plus size={18} />
            Enregistrer Paiement
          </Button>
        </div>
        
        <div className="p-6 bg-pure-black text-white rounded-2xl shadow-xl flex items-center justify-between">
          <div>
            <p className="text-xs uppercase font-bold opacity-60 mb-1">Total Recettes (Mois)</p>
            <h2 className="text-3xl font-bold">1,245,000 <span className="text-sm font-normal opacity-60">FCFA</span></h2>
          </div>
          <div className="p-3 bg-brand-red rounded-xl">
            <CreditCard size={24} />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 items-center">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-pure-black/30" size={18} />
          <Input 
            className="pl-10" 
            placeholder="Rechercher un bénéficiaire ou type..." 
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
            <option value="Lomé 1">Lomé 1</option>
            <option value="Lomé 2">Lomé 2</option>
            <option value="Kpalimé">Kpalimé</option>
            <option value="Atakpamé">Atakpamé</option>
          </select>
        </div>
        <Button variant="secondary" className="gap-2 ml-auto">
          <Download size={16} />
          Export CSV
        </Button>
      </div>

      {/* Payments Table */}
      <Table 
        data={filteredPayments} 
        columns={columns}
      >
        {(item) => (
          <div className="flex items-center justify-end gap-2">
            <Button variant="ghost" className="p-2 text-pure-black/60 hover:text-pure-black" onClick={() => console.log('View Proof', item.proof_url)}>
              <Eye size={16} />
            </Button>
            <Button variant="ghost" className="p-2 text-pure-black/60 hover:text-pure-black" onClick={() => handleOpenEdit(item)}>
              <Edit2 size={16} />
            </Button>
          </div>
        )}
      </Table>

      {/* Payment Modal */}
      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title={selectedPayment ? "Modifier le paiement" : "Nouveau Paiement"}
        size="md"
      >
        <PaymentForm 
          initialData={selectedPayment} 
          onSubmit={(data) => {
            console.log('Saving payment:', data);
            setIsModalOpen(false);
          }} 
          onCancel={() => setIsModalOpen(false)} 
        />
      </Modal>
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