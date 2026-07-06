'use client';

import React, { useState } from 'react';
import { auth, db } from '@/lib/firebase/config';
import { collection, addDoc } from 'firebase/firestore';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { UserPlus, Mail, ShieldCheck } from 'lucide-react';
import { Role } from '@/types/database';

export default function InvitationsPage() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    role: 'TEACHER' as Role,
    center_id: '',
  });

  const handleSendInvitation = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);

    try {
      const token = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
      
      await addDoc(collection(db, 'invitations'), {
        email: formData.email,
        role: formData.role,
        center_id: formData.center_id || null,
        token: token,
        status: 'pending',
        expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days
        created_by: auth.currentUser?.uid,
        created_at: new Date().toISOString(),
      });

      setSuccess(true);
      setFormData({ email: '', role: 'TEACHER', center_id: '' });
    } catch (err: any) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-pure-black tracking-tight">Invitations</h1>
        <p className="text-pure-black/60">Invitez de nouveaux membres à rejoindre l'équipe Nehemiah Lab.</p>
      </div>

      <div className="p-8 border border-pure-black/10 rounded-2xl bg-white shadow-sm">
        <form onSubmit={handleSendInvitation} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input 
              label="Email du membre" 
              type="email" 
              value={formData.email} 
              onChange={(e) => setFormData({...formData, email: e.target.value})} 
              placeholder="email@exemple.com"
              required 
            />
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-pure-black/50">Rôle</label>
              <select 
                className="px-3 py-2 bg-white border border-pure-black/20 rounded-md focus:border-brand-red focus:ring-1 focus:ring-brand-red outline-none transition-all"
                value={formData.role}
                onChange={(e) => setFormData({...formData, role: e.target.value as Role})}
              >
                <option value="COORDINATOR">Coordinateur</option>
                <option value="TEACHER">Teacher / Formateur</option>
                <option value="ACCOUNTANT">Comptable</option>
                <option value="SECRETARY">Secrétaire</option>
              </select>
            </div>
          </div>

          <Input 
            label="ID du Centre (Optionnel)" 
            value={formData.center_id} 
            onChange={(e) => setFormData({...formData, center_id: e.target.value})} 
            placeholder="UUID du centre"
          />

          <Button type="submit" className="w-full py-3" isLoading={loading}>
            <UserPlus size={18} />
            Envoyer l'invitation
          </Button>
        </form>

        {success && (
          <div className="mt-6 p-4 bg-green-50 border border-green-200 text-green-700 rounded-xl text-sm flex items-center gap-3">
            <ShieldCheck size={18} />
            L'invitation a été envoyée avec succès. Le membre peut maintenant créer son compte.
          </div>
        )}
      </div>

      <div className="p-6 border border-pure-black/10 rounded-2xl bg-pure-black text-white">
        <div className="flex items-center gap-3 mb-4">
          <Mail className="text-brand-red" />
          <h3 className="font-bold">Note sur l'envoi</h3>
        </div>
        <p className="text-sm text-white/60 leading-relaxed">
          Pour cet MVP, le lien d'invitation est généré en base de données. 
          En production, un email automatique sera envoyé via un service comme SendGrid ou Resend.
        </p>
      </div>
    </div>
  );
}