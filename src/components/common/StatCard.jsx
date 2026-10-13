import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

export const StatCard = ({ title, value, change, changeType = 'positive', description, icon: Icon, color = 'indigo' }) => {
  const colorMap = {
    indigo: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
    amber: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    emerald: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    purple: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
    cyan: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
    rose: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
  };

  const badgeColor = colorMap[color] || colorMap.indigo;

  return (
    <div className="glass-card rounded-2xl p-5 relative overflow-hidden group">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">{title}</span>
        {Icon && (
          <div className={`p-2.5 rounded-xl border ${badgeColor} transition-transform group-hover:scale-110`}>
            <Icon className="w-5 h-5" />
          </div>
        )}
      </div>

      <div className="flex items-baseline gap-2 mb-2">
        <div className="text-3xl font-extrabold text-white tracking-tight">{value}</div>
        {change && (
          <span className={`inline-flex items-center gap-0.5 text-xs font-semibold px-2 py-0.5 rounded-full ${
            changeType === 'positive' 
              ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
              : changeType === 'negative' 
              ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20' 
              : 'bg-slate-700/50 text-slate-300'
          }`}>
            {changeType === 'positive' && <TrendingUp className="w-3 h-3" />}
            {changeType === 'negative' && <TrendingDown className="w-3 h-3" />}
            {changeType === 'neutral' && <Minus className="w-3 h-3" />}
            {change}
          </span>
        )}
      </div>

      {description && (
        <p className="text-xs text-slate-400 line-clamp-1">{description}</p>
      )}

      <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-indigo-500/5 rounded-full blur-xl group-hover:bg-indigo-500/10 transition-all pointer-events-none" />
    </div>
  );
};
