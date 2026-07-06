'use client';

import React from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

interface EvaluationFormProps {
  childName: string;
  sessionTitle: string;
  onSubmit: (data: any) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export const EvaluationForm = ({ childName, sessionTitle, onSubmit, onCancel, isLoading }: EvaluationFormProps) => {
  return (
    <form onSubmit={(e) => { e.preventDefault(); onSubmit({ /* form data */ }); }} className="space-y-6">
      <div className="p-4 bg-pure-black text-white rounded-xl mb-6">
        <p className="text-xs uppercase font-bold tracking-wider opacity-60">Évaluation pour</p>
        <h3 className="text-lg font-bold">{childName}</h3>
        <p className="text-xs opacity-80 mt-1">Séance: {sessionTitle}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold uppercase tracking-wider text-pure-black/50">Note / Score</label>
          <Input 
            type="text" 
            placeholder="Ex: 15/20 ou A" 
            required 
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold uppercase tracking-wider text-pure-black/50">Catégorie</label>
          <select className="px-3 py-2 bg-white border border-pure-black/20 rounded-md focus:border-brand-red focus:ring-1 focus:ring-brand-red outline-none transition-all">
            <option value="academique">Académique</option>
            <option value="comportement">Comportement</option>
            <option value="participation">Participation</option>
            <option value="autre">Autre</option>
          </select>
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-bold uppercase tracking-wider text-pure-black/50">Observations & Commentaires</label>
        <textarea 
          className="px-3 py-2 bg-white border border-pure-black/20 rounded-md focus:border-brand-red focus:ring-1 focus:ring-brand-red outline-none transition-all min-h-[120px]" 
          placeholder="Décrivez les progrès ou les points à améliorer..."
        />
      </div>

      <div className="flex items-center gap-3 justify-end pt-4">
        <Button variant="ghost" onClick={onCancel} type="button">
          Annuler
        </Button>
        <Button variant="primary" type="submit" isLoading={isLoading}>
          Enregistrer l'évaluation
        </Button>
      </div>
    </form>
  );
};