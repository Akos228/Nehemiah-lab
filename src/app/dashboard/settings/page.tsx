'use client';

import React from 'react';
import { Button } from '@/components/ui/Button';
import { User, Lock, Bell, Globe } from 'lucide-react';

export default function SettingsPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-bold text-pure-black tracking-tight">Paramètres</h1>
        <p className="text-pure-black/60">Gérez vos préférences et la configuration de votre compte.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 bg-white border border-pure-black/10 rounded-2xl shadow-sm space-y-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-brand-red/10 text-brand-red rounded-lg">
              <User size={20} />
            </div>
            <h3 className="font-bold text-pure-black">Profil Personnel</h3>
          </div>
          <p className="text-sm text-pure-black/60">Modifiez vos informations personnelles, votre photo de profil et vos coordonnées.</p>
          <Button variant="secondary" className="w-full">Modifier le profil</Button>
        </div>

        <div className="p-6 bg-white border border-pure-black/10 rounded-2xl shadow-sm space-y-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-brand-red/10 text-brand-red rounded-lg">
              <Lock size={20} />
            </div>
            <h3 className="font-bold text-pure-black">Sécurité</h3>
          </div>
          <p className="text-sm text-pure-black/60">Changez votre mot de passe et gérez vos options de sécurité.</p>
          <Button variant="secondary" className="w-full">Modifier le mot de passe</Button>
        </div>

        <div className="p-6 bg-white border border-pure-black/10 rounded-2xl shadow-sm space-y-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-brand-red/10 text-brand-red rounded-lg">
              <Bell size={20} />
            </div>
            <h3 className="font-bold text-pure-black">Notifications</h3>
          </div>
          <p className="text-sm text-pure-black/60">Configurez les alertes pour les présences, les invitations et les rapports.</p>
          <Button variant="secondary" className="w-full">Gérer les notifications</Button>
        </div>

        <div className="p-6 bg-white border border-pure-black/10 rounded-2xl shadow-sm space-y-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-brand-red/10 text-brand-red rounded-lg">
              <Globe size={20} />
            </div>
            <h3 className="font-bold text-pure-black">Préférences Système</h3>
          </div>
          <p className="text-sm text-pure-black/60">Langue, fuseau horaire et format de date.</p>
          <Button variant="secondary" className="w-full">Configurer</Button>
        </div>
      </div>
    </div>
  );
}