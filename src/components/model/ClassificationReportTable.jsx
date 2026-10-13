import React from 'react';
import { EmotionBadge } from '../common/EmotionBadge';

export const ClassificationReportTable = ({ reportData = [] }) => {
  if (!reportData || reportData.length === 0) return null;

  return (
    <div className="glass-card rounded-2xl p-6 border border-slate-800 space-y-4">
      <div>
        <h3 className="text-base font-bold text-white">Class-wise Evaluation Breakdown</h3>
        <p className="text-xs text-slate-400">Scikit-learn classification report metrics per emotion class.</p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="border-b border-slate-800/80 text-slate-400 font-semibold uppercase tracking-wider">
              <th className="py-3 px-4">Emotion Class</th>
              <th className="py-3 px-4 text-right">Precision</th>
              <th className="py-3 px-4 text-right">Recall</th>
              <th className="py-3 px-4 text-right">F1 Score</th>
              <th className="py-3 px-4 text-right">Test Support</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60">
            {reportData.map((row) => (
              <tr key={row.emotion} className="hover:bg-slate-900/50 transition-colors">
                <td className="py-3 px-4">
                  <EmotionBadge emotion={row.emotion} size="sm" />
                </td>
                <td className="py-3 px-4 text-right font-mono font-medium text-slate-200">
                  {(row.precision * 100).toFixed(1)}%
                </td>
                <td className="py-3 px-4 text-right font-mono font-medium text-slate-200">
                  {(row.recall * 100).toFixed(1)}%
                </td>
                <td className="py-3 px-4 text-right font-mono font-bold text-indigo-400">
                  {(row.f1 * 100).toFixed(1)}%
                </td>
                <td className="py-3 px-4 text-right font-mono text-slate-400">
                  {row.support}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
