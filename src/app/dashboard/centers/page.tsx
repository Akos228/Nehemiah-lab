'use client';

import React, { useState, useEffect } from 'react';
import { db } from '@/lib/firebase/config';
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Building2, MapPin, Users, Save } from 'lucide-react';
import { Profile } from '@/types/database';

export default function CentersPage() {
  const [centers, setCenters] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCenter, setSelectedCenter] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState('');

  useEffect(() => {
    fetchCenters();
  }, []);

  async function fetchCenters() {
    setLoading(true);
    try {
      // In a real app, we'd have a 'centers' collection. 
      // For the MVP, we'll derive centers from profiles or use a mock list.
      const querySnapshot = await getDocs(collection(db, 'centers'));
      const centersData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      
      // Fallback to mock data if collection is empty
      if (centersData.length === 0) {
        setCenters([
          { id: 'center-1', name: 'Lomé 1', location: 'Quartier Administratif', children_count: 450 },
          { id: 'center-2', name: 'Lomé 2', location: 'Agoè-Nyivé', children_count: 320 },
          { id: 'center-3', name: 'Kpalimé', location: 'Plateaux', children_count: 210 },
          { id: 'center-4', name: 'Atakpamé', location: 'Centre', children_count: 304 },
        ]);
      } else {
        setCenters(centersData);
      }
    } catch (err) {
      console.error('Error fetching centers:', err);
    } finally {
      setLoading(false);
    }
  }

  const handleEditClick = (center: any) => {
    setSelectedCenter(center);
    setEditName(center.name);
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      if (selectedCenter) {
        await updateDoc(doc(db, 'centers', selectedCenter.id), {
          name: editName
        });
        setCenters(centers.map(c => c.id === selectedCenter.id ? { ...c, name: editName } : c));
      }
      setIsEditing(false);
    } catch (err) {
      alert('Erreur lors de la mise à jour du centre');
    }
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-brand-red border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-bold text-pure-black tracking-tight">Gestion des Centres</h1>
        <p className="text-pure-black/60">Configurez et gérez les différents centres de Nehemiah Lab.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {centers.map((center) => (
            <div 
              key={center.id} 
              className="p-6 bg-white border border-pure-black/10 rounded-2xl shadow-sm flex items-center justify-between hover:border-brand-red/30 transition-all cursor-pointer"
              onClick={() => handleEditClick(center)}
            >
              <div className="flex items-center gap-4">
                <div className="p-3 bg-pure-black text-white rounded-xl">
                  <Building2 size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-pure-black">{center.name}</h3>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="flex items-center gap-1 text-xs text-pure-black/50">
                      <MapPin size={12} /> {center.location}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-pure-black/50">
                      <Users size={12} /> {center.children_count} enfants
                    </span>
                  </div>
                </div>
              </div>
              <Button variant="secondary" className="text-xs px-2 py-1">Modifier</Button>
            </div>
          ))}
        </div>

        <div className="lg:col-span-1">
          {isEditing && selectedCenter ? (
            <div className="p-6 bg-white border border-pure-black/10 rounded-2xl shadow-sm space-y-6 sticky top-8">
              <h3 className="text-lg font-bold text-pure-black">Modifier le Centre</h3>
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase text-pure-black/50">Nom du Centre</label>
                  <input 
                    type="text" 
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="w-full px-3 py-2 border border-pure-black/20 rounded-md outline-none focus:border-brand-red transition-all"
                  />
                </div>
                <div className="flex gap-3">
                  <Button variant="secondary" className="flex-1" onClick={() => setIsEditing(false)}>
                    Annuler
                  </Button>
                  <Button variant="primary" className="flex-1 gap-2" onClick={handleSave}>
                    <Save size={16} />
                    Enregistrer
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-6 bg-pure-black text-white rounded-2xl shadow-sm space-y-4">
              <h3 className="font-bold">Informations</h3>
              <p className="text-sm text-white/60">
                Sélectionnez un centre dans la liste pour modifier ses informations générales.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}