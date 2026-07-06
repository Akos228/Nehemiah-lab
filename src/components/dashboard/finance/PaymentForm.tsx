'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { FileText, X } from 'lucide-react';

interface PaymentFormProps {
  initialData?: any;
  onSubmit: (data: any) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export const PaymentForm = ({ initialData, onSubmit, onCancel, isLoading }: PaymentFormProps) => {
  const [proofLink, setProofLink] = useState(initialData?.proof_url || '');

  return (
    <form onSubmit={(e) => { e.preventDefault(); onSubmit({ proof_url: proofLink }); }} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold uppercase tracking-wider text-pure-black/50">Montant (FCFA)</label>
          <Input 
            type="number" 
            placeholder="Ex: 5000" 
            required 
            defaultValue={initialData?.amount} 
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold uppercase tracking-wider text-pure-black/50">Date du paiement</label>
          <Input 
            type="date" 
            required 
            defaultValue={initialData?.payment_date} 
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold uppercase tracking-wider text-pure-black/50">Bénéficiaire / Enfant</label>
          <Input 
            placeholder="Nom de l'enfant ou du prestataire" 
            required 
            defaultValue={initialData?.beneficiary} 
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold uppercase tracking-wider text-pure-black/50">Type de paiement</label>
          <select className="px-3 py-2 bg-white border border-pure-black/20 rounded-md focus:border-brand-red focus:ring-1 focus:ring-brand-red outline-none transition-all">
            <option value="mensualite">Mensualité</option>
            <option value="inscription">Frais d'inscription</option>
            <option value="don">Don / Soutien</option>
            <option value="autre">Autre</option>
          </select>
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-bold uppercase tracking-wider text-pure-black/50">Commentaire / Référence</label>
        <textarea 
          className="px-3 py-2 bg-white border border-pure-black/20 rounded-md focus:border-brand-red focus:ring-1 focus:ring-brand-red outline-none transition-all min-h-[80px]" 
          placeholder="Note additionnelle..."
          defaultValue={initialData?.comment}
        />
      </div>

      <div className="space-y-3">
        <label className="text-xs font-bold uppercase tracking-wider text-pure-black/50">Preuve de paiement (Lien ou Description)</label>
        <div className="relative flex items-center gap-3">
          <div className="p-2 bg-pure-black/5 rounded-lg text-pure-black/40">
            <FileText size={20} />
          </div>
          <Input 
            placeholder="Collez le lien de la capture ou décrivez la preuve..." 
            value={proofLink}
            onChange={(e) => setProofLink(e.target.value)}
            className="flex-1"
          />
        </div>
        <p className="text-[10px] text-pure-black/40 italic">
          Note: L'upload de fichiers est désactivé pour rester sur le plan gratuit (Spark).
        </p>
      </div>

      <div className="flex items-center gap-3 justify-end pt-4">
        <Button variant="ghost" onClick={onCancel} type="button">
          Annuler
        </Button>
        <Button variant="primary" type="submit" isLoading={isLoading}>
          Enregistrer le paiement
        </Button>
      </div>
    </form>
  );
};