'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Users, 
  School, 
  CreditCard, 
  Settings, 
  UserPlus, 
  UserCheck,
  ShieldAlert,
  Menu,
  X
} from 'lucide-react';
import { Role } from '@/types/database';

interface SidebarProps {
  role: Role;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export const Sidebar = ({ role, isOpen, setIsOpen }: SidebarProps) => {
  const pathname = usePathname();

  const menuConfig: Record<Role, { name: string; href: string; icon: any }[]> = {
    DG: [
      { name: 'Vue d\'ensemble', href: '/dashboard', icon: LayoutDashboard },
      { name: 'Gestion Centres', href: '/dashboard/centers', icon: School },
      { name: 'Gestion Enfants', href: '/dashboard/children', icon: Users },
      { name: 'Invitations', href: '/dashboard/invitations', icon: UserPlus },
      { name: 'Validations', href: '/dashboard/approvals', icon: UserCheck },
      { name: 'Finance Globale', href: '/dashboard/finance', icon: CreditCard },
      { name: 'Paramètres', href: '/dashboard/settings', icon: Settings },
    ],
    COORDINATOR: [
      { name: 'Vue Centre', href: '/dashboard', icon: LayoutDashboard },
      { name: 'Mes Enfants', href: '/dashboard/children', icon: Users },
      { name: 'Présences', href: '/dashboard/attendance', icon: ShieldAlert },
      { name: 'Évaluations', href: '/dashboard/evaluations', icon: UserCheck },
      { name: 'Paramètres', href: '/dashboard/settings', icon: Settings },
    ],
    TEACHER: [
      { name: 'Mon Dashboard', href: '/dashboard', icon: LayoutDashboard },
      { name: 'Mes Enfants', href: '/dashboard/children', icon: Users },
      { name: 'Saisie Présences', href: '/dashboard/attendance', icon: ShieldAlert },
      { name: 'Saisie Notes', href: '/dashboard/evaluations', icon: UserCheck },
    ],
    ACCOUNTANT: [
      { name: 'Vue Finance', href: '/dashboard', icon: LayoutDashboard },
      { name: 'Paiements', href: '/dashboard/payments', icon: CreditCard },
      { name: 'Rapports', href: '/dashboard/reports', icon: LayoutDashboard },
      { name: 'Paramètres', href: '/dashboard/settings', icon: Settings },
    ],
    SECRETARY: [
      { name: 'Accueil', href: '/dashboard', icon: LayoutDashboard },
      { name: 'Inscriptions', href: '/dashboard/children', icon: Users },
      { name: 'Présences', href: '/dashboard/attendance', icon: ShieldAlert },
      { name: 'Paramètres', href: '/dashboard/settings', icon: Settings },
    ],
  };

  const items = menuConfig[role] || menuConfig['TEACHER'];

  return (
    <>
      {/* Mobile Toggle */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed bottom-6 right-6 z-50 p-4 bg-brand-red text-white rounded-full shadow-xl active:scale-90 transition-transform"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <aside className={`
        fixed lg:static inset-y-0 left-0 z-40 
        ${isOpen ? 'w-64 translate-x-0' : 'w-0 -translate-x-full lg:w-20 lg:translate-x-0'} 
        transition-all duration-300 ease-in-out
        bg-pure-black text-pure-white flex flex-col border-r border-pure-black
      `}>
        <div className="p-6 flex items-center justify-between h-16">
          {isOpen && (
            <h1 className="text-xl font-bold tracking-tighter whitespace-nowrap overflow-hidden">
              Nehemiah <span className="text-brand-red">Lab</span>
            </h1>
          )}
          <button 
            onClick={() => setIsOpen(false)} 
            className="lg:hidden p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 px-4 space-y-2 mt-4 overflow-y-auto">
          {items.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link 
                key={item.name} 
                href={item.href}
                className={`flex items-center gap-3 p-3 rounded-lg transition-all group ${
                  isActive 
                    ? 'bg-brand-red text-white shadow-lg shadow-brand-red/20' 
                    : 'text-white/60 hover:bg-white/5 hover:text-white'
                }`}
              >
                <item.icon size={20} className={`${isActive ? 'text-white' : 'text-white/60 group-hover:text-white'}`} />
                {isOpen && <span className="font-medium whitespace-nowrap">{item.name}</span>}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/10">
          <div className={`flex items-center gap-3 p-3 rounded-lg text-white/40 ${isOpen ? 'justify-start' : 'justify-center'}`}>
            <div className="w-8 h-8 rounded-full bg-brand-red text-white flex items-center justify-center text-xs font-bold">
              NL
            </div>
            {isOpen && (
              <div className="flex flex-col overflow-hidden">
                <span className="text-xs font-bold truncate">Admin User</span>
                <span className="text-[10px] opacity-60 truncate">{role}</span>
              </div>
            )}
          </div>
        </div>
      </aside>
    </>
  );
};