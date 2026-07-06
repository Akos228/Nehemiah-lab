'use client';

import React, { useState, useEffect } from 'react';
import { db } from '@/lib/firebase/config';
import { collection, query, where, getDocs, updateDoc, doc, orderBy } from 'firebase/firestore';
import { Button } from '@/components/ui/Button';
import { UserCheck, UserX, Clock } from 'lucide-react';
import { Profile } from '@/types/database';

export default function ApprovalsPage() {
  const [pendingProfiles, setPendingProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPendingProfiles();
  }, []);

  async function fetchPendingProfiles() {
    setLoading(true);
    try {
      const q = query(
        collection(db, 'profiles'),
        where('status', '==', 'pending'),
        orderBy('created_at', 'desc')
      );
      const querySnapshot = await getDocs(q);
      const profiles = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Profile[];
      
      setPendingProfiles(profiles);
    } catch (err: any) {
      console.error('Error fetching pending profiles:', err);
      alert(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleStatusChange(id: string, status: 'approved' | 'rejected') {
    try {
      const docRef = doc(db, 'profiles', id);
      await updateDoc(docRef, { status });
      await fetchPendingProfiles();
    } catch (err: any) {
      console.error('Error updating status:', err);
      alert(err.message);
    }
  }

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-brand-red border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-pure-black tracking-tight">Validations</h1>
        <p className="text-pure-black/60">Approuvez les nouveaux membres ayant rejoint l'équipe via invitation.</p>
      </div>

      {pendingProfiles.length === 0 ? (
        <div className="p-12 border border-dashed border-pure-black/20 rounded-2xl text-center space-y-4">
          <div className="mx-auto w-12 h-12 bg-pure-black/5 rounded-full flex items-center justify-center text-pure-black/40">
            <Clock size={24} />
          </div>
          <p className="text-pure-black/60">Aucun compte en attente de validation.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {pendingProfiles.map((profile) => (
            <div key={profile.id} className="p-6 border border-pure-black/10 rounded-2xl bg-white flex flex-col md:flex-row md:items-center justify-between gap-6 hover:shadow-sm transition-shadow">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-pure-black text-white flex items-center justify-center font-bold">
                  {profile.full_name.charAt(0)}
                </div>
                <div>
                  <h3 className="font-bold text-pure-black">{profile.full_name}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs font-bold uppercase px-2 py-0.5 bg-black text-white rounded-full">
                      {profile.role}
                    </span>
                    <span className="text-xs text-pure-black/40">
                      Inscrit le {new Date(profile.created_at).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Button 
                  variant="ghost" 
                  className="text-red-600 hover:bg-red-50" 
                  onClick={() => handleStatusChange(profile.id, 'rejected')}
                >
                  <UserX size={18} />
                  Rejeter
                </Button>
                <Button 
                  variant="primary" 
                  onClick={() => handleStatusChange(profile.id, 'approved')}
                >
                  <UserCheck size={18} />
                  Approuver
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}