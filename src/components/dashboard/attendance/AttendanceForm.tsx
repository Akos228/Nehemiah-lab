'use client';

import React, { useState, useEffect } from 'react';
import { db } from '@/lib/firebase/config';
import { collection, getDocs, writeBatch, doc } from 'firebase/firestore';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { X, CheckCircle2 } from 'lucide-react';

interface Child {
  id: string;
  full_name: string;
}

export function AttendanceForm({ onClose, onSave }: { onClose: () => void, onSave: () => void }) {
  const [children, setChildren] = useState<Child[]>([]);
  const [attendance, setAttendance] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(true);
  const [sessionDate, setSessionDate] = useState(new Date().toISOString().split('T')[0]);

  useEffect(() => {
    async function loadChildren() {
      try {
        const snap = await getDocs(collection(db, 'children'));
        const list = snap.docs.map(d => ({ id: d.id, ...d.data() } as Child));
        setChildren(list);
        
        // Initialize all as present by default
        const initialAttendance: Record<string, boolean> = {};
        list.forEach(c => initialAttendance[c.id] = true);
        setAttendance(initialAttendance);
      } catch (err) {
        console.error('Error loading children:', err);
      } finally {
        setLoading(false);
      }
    }
    loadChildren();
  }, []);

  const handleToggle = (id: string) => {
    setAttendance(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const batch = writeBatch(db);
      
      Object.entries(attendance).forEach(([childId, isPresent]) => {
        const attRef = doc(collection(db, 'attendance'));
        batch.set(attRef, {
          child_id: childId,
          date: sessionDate,
          check_in: isPresent ? '08:00' : '', // Simplified for MVP
          check_out: isPresent ? '12:00' : '',
          status: isPresent ? 'present' : 'absent',
          created_at: new Date().toISOString(),
        });
      });

      await batch.commit();
      onSave();
      onClose();
    } catch (err) {
      alert('Erreur lors de l\'enregistrement des présences');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="p-8 text-center">Chargement des enfants...</div>;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="p-6 border-b border-pure-black/10 flex items-center justify-between bg-pure-black text-white">
          <div>
            <h2 className="text-xl font-bold">Prise de Présence</h2>
            <p className="text-white/60 text-sm">Cochez les enfants présents pour la session</p>
          </div>
          <Button variant="ghost" className="text-white hover:bg-white/10" onClick={onClose}>
            <X size={24} />
          </Button>
        </div>

        <div className="p-6 space-y-6">
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <label className="text-xs font-bold uppercase text-pure-black/50 block mb-1">Date de la session</label>
              <input 
                type="date" 
                value={sessionDate}
                onChange={(e) => setSessionDate(e.target.value)}
                className="w-full px-3 py-2 border border-pure-black/20 rounded-md outline-none focus:border-brand-red"
              />
            </div>
          </div>

          <div className="max-h-[60vh] overflow-y-auto space-y-2 pr-2">
            {children.map(child => (
              <div 
                key={child.id} 
                onClick={() => handleToggle(child.id)}
                className={`p-4 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                  attendance[child.id] 
                    ? 'bg-green-50 border-green-200' 
                    : 'bg-white border-pure-black/10 hover:border-pure-black/30'
                }`}
              >
                <span className={`font-medium ${attendance[child.id] ? 'text-green-700' : 'text-pure-black'}`}>
                  {child.full_name}
                </span>
                {attendance[child.id] ? (
                  <CheckCircle2 className="text-green-600" size={20} />
                ) : (
                  <div className="w-5 h-5 rounded-full border-2 border-pure-black/20" />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="p-6 border-t border-pure-black/10 flex justify-end gap-3 bg-pure-black/5">
          <Button variant="secondary" onClick={onClose}>Annuler</Button>
          <Button variant="primary" onClick={handleSave} isLoading={loading}>
            Enregistrer la session
          </Button>
        </div>
      </div>
    </div>
  );
}