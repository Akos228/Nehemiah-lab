'use client';

import React from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

interface ChildFormProps {
  initialData?: any;
  onSubmit: (data: any) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export const ChildForm = ({ initialData, onSubmit, onCancel, isLoading }: ChildFormProps) => {
  return (
    <form onSubmit={(e) => { e.preventDefault(); onSubmit({ /* form data */ }); }} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input 
          label="Prénom" 
          placeholder="Ex: Koffi" 
          required 
          defaultValue={initialData?.first_name} 
        />
        <Input 
          label="Nom" 
          placeholder="Ex: Ama" 
          required 
          defaultValue={initialData?.last_name} 
        />
        <Input 
          label="Date de Naissance" 
          type="date" 
          required 
          defaultValue={initialData?.birth_date} 
        />
        <Input 
          label="Contact Parent" 
          type="tel" 
          placeholder="+228 ..." 
          required 
          defaultValue={initialData?.parent_contact} 
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-bold uppercase tracking-wider text-pure-black/50">Centre d'affectation</label>
        <select 
          className="px-3 py-2 bg-white border border-pure-black/20 rounded-md focus:border-brand-red focus:ring-1 focus:ring-brand-red outline-none transition-all"
          defaultValue={initialData?.center_id}
        >
          <option value="center-1">Lomé 1</option>
          <option value="center-2">Lomé 2</option>
          <option value="center-3">Kpalimé</option>
          <option value="center-4">Atakpamé</option>
        </select>
      </div>

      <div className="flex items-center gap-3 justify-end pt-4">
        <Button variant="ghost" onClick={onCancel} type="button">
          Annuler
        </Button>
        <Button variant="primary" type="submit" isLoading={isLoading}>
          {initialData ? 'Enregistrer les modifications' : 'Inscrire l\'enfant'}
        </Button>
      </div>
    </form>
  );
};