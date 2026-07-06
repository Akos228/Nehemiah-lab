'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { UserPlus, UserCheck, Users, CreditCard, School } from 'lucide-react';
import { Button } from '@/components/ui/Button';

const actions = [
  { label: 'Inviter un membre', href: '/dashboard/invitations', icon: UserPlus, color: 'bg-brand-red text-white' },
  { label: 'Valider comptes', href: '/dashboard/approvals', icon: UserCheck, color: 'bg-pure-black text-white' },
  { label: 'Gérer Enfants', href: '/dashboard/children', icon: Users, color: 'bg-pure-black/5 text-pure-black' },
  { label: 'Comptabilité', href: '/dashboard/finance', icon: CreditCard, color: 'bg-pure-black/5 text-pure-black' },
  { label: 'Centres', href: '/dashboard/centers', icon: School, color: 'bg-pure-black/5 text-pure-black' },
];

export const DGQuickActions = () => {
  const router = useRouter();

  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
      {actions.map((action, idx) => (
        <button 
          key={idx}
          onClick={() => router.push(action.href)}
          className="flex flex-col items-center justify-center p-4 border border-pure-black/10 rounded-2xl bg-white hover:border-brand-red transition-all duration-200 group active:scale-95"
        >
          <div className={`p-3 rounded-xl mb-3 transition-colors duration-300 ${action.color} group-hover:bg-brand-red group-hover:text-white`}>
            <action.icon size={20} />
          </div>
          <span className="text-xs font-bold text-pure-black text-center leading-tight">
            {action.label}
          </span>
        </button>
      ))}
    </div>
  );
};