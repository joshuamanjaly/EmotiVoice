import React from 'react';
import { CheckCircle2, AlertTriangle, XCircle, Info, X } from 'lucide-react';

export const Toast = ({ toast, onClose }) => {
  if (!toast) return null;

  const icons = {
    success: <CheckCircle2 className="w-5 h-5 text-emerald-400" />,
    warning: <AlertTriangle className="w-5 h-5 text-amber-400" />,
    error: <XCircle className="w-5 h-5 text-rose-400" />,
    info: <Info className="w-5 h-5 text-indigo-400" />,
  };

  const borders = {
    success: 'border-emerald-500/30 bg-emerald-950/40 text-emerald-200',
    warning: 'border-amber-500/30 bg-amber-950/40 text-amber-200',
    error: 'border-rose-500/30 bg-rose-950/40 text-rose-200',
    info: 'border-indigo-500/30 bg-indigo-950/40 text-indigo-200',
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 flex items-center gap-3 p-4 rounded-xl border backdrop-blur-lg shadow-xl max-w-md animate-slide-up transition-all">
      <div className={`p-2 rounded-lg border ${borders[toast.type] || borders.info}`}>
        {icons[toast.type] || icons.info}
      </div>
      <div className="flex-1 text-sm font-medium text-slate-100">
        {toast.message}
      </div>
      <button 
        onClick={onClose}
        className="p-1 rounded-md text-slate-400 hover:text-white transition-colors"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};
