import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = ({ label, error, className = '', ...props }: InputProps) => {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && (
        <label className="text-xs font-bold uppercase tracking-wider text-pure-black/50">
          {label}
        </label>
      )}
      <input 
        className={`px-3 py-2 bg-white border border-pure-black/20 rounded-md focus:border-brand-red focus:ring-1 focus:ring-brand-red outline-none transition-all ${error ? 'border-red-500' : ''} ${className}`} 
        {...props} 
      />
      {error && (
        <span className="text-xs text-red-500 font-medium">{error}</span>
      )}
    </div>
  );
};