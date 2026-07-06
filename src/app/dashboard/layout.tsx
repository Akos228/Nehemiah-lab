'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Sidebar } from '@/components/layout/shared/Sidebar';
import { Navbar } from '@/components/layout/shared/Navbar';
import { auth, db } from '@/lib/firebase/config';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { Role, Profile } from '@/types/database';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [userProfile, setUserProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      try {
        console.log('Auth state changed. User:', user?.uid);
        if (!user) {
          console.log('No user authenticated, redirecting to login...');
          router.push('/login');
          return;
        }

        console.log('Fetching profile for UID:', user.uid);
        // Fetch profile from Firestore
        const docRef = doc(db, 'profiles', user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const profileData = docSnap.data();
          console.log('Profile found:', profileData);
          setUserProfile(profileData as Profile);
        } else {
          console.error('No profile found in Firestore for UID:', user.uid);
          router.push('/login');
        }
      } catch (err) {
        console.error('CRITICAL ERROR loading profile:', err);
        router.push('/login');
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-pure-white">
        <div className="w-8 h-8 border-4 border-brand-red border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!userProfile) return null;

  return (
    <div className="min-h-screen bg-pure-white flex">
      <Sidebar 
        role={userProfile.role} 
        isOpen={isSidebarOpen} 
        setIsOpen={setIsSidebarOpen} 
      />

      <div className="flex-1 flex flex-col min-w-0">
        <Navbar 
          userName={userProfile.full_name} 
          userRole={userProfile.role} 
          currentCenter="Centre Lomé 1" 
        />
        
        <main className="p-4 md:p-8 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}