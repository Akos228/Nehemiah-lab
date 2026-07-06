'use client';

import React, { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { auth, db } from '@/lib/firebase/config';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

export default function InvitePage() {
  const params = useParams();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleAcceptInvite = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // 1. Validate token in Firestore (mock logic for MVP)
      const inviteRef = doc(db, 'invitations', params.token as string);
      const inviteSnap = await getDoc(inviteRef);

      if (!inviteSnap.exists()) {
        throw new Error('L\'invitation est invalide ou a expiré.');
      }

      const inviteData = inviteSnap.data();

      // 2. Create user in Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // 3. Create profile in Firestore
      await setDoc(doc(db, 'profiles', user.uid), {
        full_name: inviteData.full_name,
        role: inviteData.role,
        center_id: inviteData.center_id,
        email: email,
        created_at: new Date().toISOString(),
      });

      // 4. Mark invitation as used
      await setDoc(inviteRef, { ...inviteData, used: true, used_at: new Date().toISOString() }, { merge: true });

      router.push('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Une erreur est survenue lors de la création du compte.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-pure-white p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold tracking-tighter text-pure-black">
            Rejoindre <span className="text-brand-red">Nehemiah Lab</span>
          </h1>
          <p className="text-pure-black/60">Complétez votre inscription pour accéder à votre espace.</p>
        </div>

        <div className="bg-white border border-pure-black/10 p-8 rounded-3xl shadow-xl space-y-6">
          <form onSubmit={handleAcceptInvite} className="space-y-4">
            <Input 
              label="Email professionnel" 
              type="email" 
              placeholder="email@nehemiahlab.com" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
            <Input 
              label="Définir un mot de passe" 
              type="password" 
              placeholder="••••••••" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
            
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-600 text-xs rounded-lg font-medium">
                {error}
              </div>
            )}

            <Button variant="primary" className="w-full py-6 text-lg" type="submit" isLoading={loading}>
              Activer mon compte
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}