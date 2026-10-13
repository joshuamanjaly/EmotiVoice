import React from 'react';
import { Award, CheckCircle } from 'lucide-react';

export const ModelComparisonTable = ({ comparisonData }) => {
  if (!comparisonData || comparisonData.length === 0) return null;

  return (
    <div className="glass-card rounded-2xl p-6 border border-slate-800 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-400" />
            Benchmarked Machine Learning Models
          </h3>
          <p className="text-xs text-slate-400">
            Comparative evaluation across evaluated classifier architectures on the dataset.
          </p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="border-b border-slate-800/80 text-slate-400 font-semibold uppercase tracking-wider">
              <th className="py-3 px-4">Model Name</th>
              <th className="py-3 px-4">Architecture / Pipeline</th>
              <th className="py-3 px-4 text-right">Accuracy</th>
              <th className="py-3 px-4 text-right">Precision</th>
              <th className="py-3 px-4 text-right">Recall</th>
              <th className="py-3 px-4 text-right">F1 Score</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60">
            {comparisonData.map((model, idx) => (
              <tr 
                key={idx} 
                className={`transition-colors ${
                  model.isBest 
                    ? 'bg-indigo-500/10 border-l-4 border-l-indigo-500 text-white font-bold' 
                    : 'text-slate-300 hover:bg-slate-900/40'
                }`}
              >
                <td className="py-3.5 px-4 font-semibold flex items-center gap-2">
                  <span>{model.name}</span>
                  {model.isBest && (
                    <span className="px-2 py-0.5 text-[10px] font-extrabold uppercase rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                      <CheckCircle className="w-3 h-3" /> Selected Model
                    </span>
                  )}
                </td>
                <td className="py-3.5 px-4 text-slate-400 font-mono text-[11px]">{model.architecture}</td>
                <td className="py-3.5 px-4 text-right font-mono font-bold text-indigo-300">{model.accuracy}%</td>
                <td className="py-3.5 px-4 text-right font-mono">{model.precision}%</td>
                <td className="py-3.5 px-4 text-right font-mono">{model.recall}%</td>
                <td className="py-3.5 px-4 text-right font-mono font-bold text-emerald-400">{model.f1}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
