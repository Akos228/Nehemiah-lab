import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'danger' | 'success';
  className?: string;
}

export const Badge = ({ children, variant = 'secondary', className = '' }: BadgeProps) => {
  const variants = {
    primary: "bg-brand-red text-white",
    secondary: "bg-pure-black text-white",
    outline: "border border-pure-black text-pure-black",
    danger: "bg-red-100 text-red-700 border border-red-200",
    success: "bg-green-100 text-green-700 border border-green-200",
  };

  return (
    <span className={`px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-full ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
};