'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '@/lib/firebase/config';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      console.log('Tentative de connexion pour:', email);
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log('Connexion réussie, UID:', userCredential.user.uid);
      router.push('/dashboard');
    } catch (err: any) {
      console.error('Détails de l\'erreur de login:', err);
      setError(`Erreur : ${err.message || 'Identifiants invalides ou erreur de connexion.'}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-pure-white p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold tracking-tighter text-pure-black">
            Nehemiah <span className="text-brand-red">Lab</span>
          </h1>
          <p className="text-pure-black/60">Connectez-vous pour accéder au dashboard</p>
        </div>

        <div className="bg-white border border-pure-black/10 p-8 rounded-3xl shadow-xl space-y-6">
          <form onSubmit={handleLogin} className="space-y-4">
            <Input 
              label="Email" 
              type="email" 
              placeholder="email@nehemiahlab.com" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
            <Input 
              label="Mot de passe" 
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
              Se connecter
            </Button>
          </form>
        </div>
        
        <p className="text-center text-xs text-pure-black/40">
          Accès restreint au personnel autorisé de Nehemiah Lab.
        </p>
      </div>
    </div>
  );
}