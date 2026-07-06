import React, { useEffect } from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const Modal = ({ isOpen, onClose, title, children, size = 'md' }: ModalProps) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  if (!isOpen) return null;

  const sizeClasses: Record<'sm' | 'md' | 'lg' | 'xl', string> = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-pure-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className={`relative w-full ${sizeClasses[size]} bg-white rounded-2xl shadow-2xl animate-in zoom-in-95 duration-200 overflow-hidden`}>
        <div className="flex items-center justify-between p-6 border-b border-pure-black/10">
          <h3 className="text-xl font-bold text-pure-black tracking-tight">
            {title || 'Information'}
          </h3>
          <button 
            onClick={onClose} 
            className="p-2 hover:bg-pure-black/5 rounded-full transition-colors text-pure-black/40 hover:text-pure-black"
          >
            <X size={20} />
          </button>
        </div>
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
};