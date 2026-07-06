'use client';

import React, { useState } from 'react';
import { Bell, User, ChevronDown, Search } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

interface NavbarProps {
  userName?: string;
  userRole?: string;
  currentCenter?: string;
}

export const Navbar = ({ userName = 'Utilisateur', userRole = 'Staff', currentCenter = 'Tous les centres' }: NavbarProps) => {
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  return (
    <header className="h-16 border-b border-pure-black/5 bg-white flex items-center justify-between px-4 md:px-8 sticky top-0 z-30">
      <div className="flex items-center gap-4 flex-1">
        <div className="hidden md:flex items-center relative w-full max-w-md">
          <Search className="absolute left-3 text-pure-black/30" size={18} />
          <input 
            type="text" 
            placeholder="Recherche rapide..." 
            className="w-full pl-10 pr-4 py-2 bg-pure-black/5 border-transparent focus:bg-white focus:border-brand-red rounded-full text-sm outline-none transition-all"
          />
        </div>
      </div>

      <div className="flex items-center gap-3 md:gap-6">
        {/* Center Switcher (Visible for DG/Coordinator) */}
        <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 bg-pure-black/5 rounded-full border border-pure-black/10 cursor-pointer hover:bg-pure-black/10 transition-colors">
          <span className="text-xs font-medium text-pure-black/60">Centre:</span>
          <span className="text-xs font-bold text-pure-black">{currentCenter}</span>
          <ChevronDown size={14} className="text-pure-black/40" />
        </div>

        {/* Notifications */}
        <div className="relative">
          <button 
            onClick={() => setNotificationsOpen(!notificationsOpen)}
            className="p-2 hover:bg-pure-black/5 rounded-full transition-colors relative"
          >
            <Bell size={20} className="text-pure-black/70" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-brand-red rounded-full border-2 border-white"></span>
          </button>
          
          {notificationsOpen && (
            <div className="absolute right-0 mt-2 w-80 bg-white border border-pure-black/10 rounded-2xl shadow-xl z-50 overflow-hidden animate-in slide-in-from-top-2 duration-200">
              <div className="p-4 border-b border-pure-black/5 font-bold text-sm">Notifications</div>
              <div className="max-h-96 overflow-y-auto p-2 space-y-1">
                <div className="p-3 hover:bg-pure-black/5 rounded-lg text-xs transition-colors cursor-pointer">
                  <p className="font-medium">Nouvelle inscription</p>
                  <p className="text-pure-black/50">Jean Dupont a été inscrit au centre Lomé 1</p>
                </div>
                <div className="p-3 hover:bg-pure-black/5 rounded-lg text-xs transition-colors cursor-pointer">
                  <p className="font-medium">Paiement en attente</p>
                  <p className="text-pure-black/50">Preuve de paiement reçue pour Marie Koffi</p>
                </div>
              </div>
              <div className="p-3 bg-pure-black/5 text-center">
                <button className="text-[10px] font-bold uppercase text-brand-red hover:underline">Tout voir</button>
              </div>
            </div>
          )}
        </div>

        {/* User Profile */}
        <div className="flex items-center gap-3 pl-4 border-l border-pure-black/10">
          <div className="hidden md:flex flex-col items-end">
            <span className="text-sm font-bold text-pure-black leading-none">{userName}</span>
            <span className="text-[10px] font-medium text-pure-black/40 uppercase tracking-wider">{userRole}</span>
          </div>
          <div className="w-9 h-9 rounded-full bg-pure-black text-white flex items-center justify-center text-xs font-bold border-2 border-white shadow-sm ring-1 ring-pure-black/10">
            {userName.charAt(0)}
          </div>
        </div>
      </div>
    </header>
  );
};