import React, { useState } from 'react';
import { EMOTIONS } from '../../utils/emotionHelpers';

export const ConfusionMatrix = ({ matrixData }) => {
  const [hoverCell, setHoverCell] = useState(null);

  if (!matrixData) return null;

  const { labels, data } = matrixData;

  // Find max value for heat intensity scaling
  let maxVal = 1;
  data.forEach(row => row.forEach(val => { if (val > maxVal) maxVal = val; }));

  return (
    <div className="glass-card rounded-2xl p-6 border border-slate-800 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-bold text-white">Multiclass Confusion Matrix</h3>
          <p className="text-xs text-slate-400">
            True Label (Rows) vs. Model Predicted Label (Columns) evaluation grid.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-400 font-medium">
          <span>Low</span>
          <div className="w-16 h-3 rounded bg-gradient-to-r from-slate-900 via-indigo-900 to-indigo-600 border border-slate-700" />
          <span>High Intensity</span>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-center border-collapse text-xs font-mono">
          <thead>
            <tr>
              <th className="p-2 text-slate-400 font-semibold text-left">True \ Pred</th>
              {labels.map((lbl) => (
                <th key={lbl} className="p-2 text-slate-300 font-bold">
                  {lbl.substring(0, 3)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, rIdx) => (
              <tr key={labels[rIdx]}>
                <td className="p-2 font-bold text-slate-300 text-left whitespace-nowrap">
                  {labels[rIdx]}
                </td>
                {row.map((val, cIdx) => {
                  const intensity = val / maxVal;
                  const isDiagonal = rIdx === cIdx;
                  
                  // Color calculation
                  let bgColor = `rgba(30, 41, 59, ${0.3 + intensity * 0.4})`;
                  if (isDiagonal) {
                    bgColor = `rgba(99, 102, 241, ${0.3 + intensity * 0.7})`;
                  } else if (val > 10) {
                    bgColor = `rgba(239, 68, 68, ${0.2 + intensity * 0.5})`;
                  }

                  return (
                    <td
                      key={cIdx}
                      onMouseEnter={() => setHoverCell({ trueLabel: labels[rIdx], predLabel: labels[cIdx], val })}
                      onMouseLeave={() => setHoverCell(null)}
                      className={`p-2.5 rounded-lg border border-slate-800/60 font-bold transition-all ${
                        isDiagonal ? 'text-white border-indigo-500/40 shadow-inner' : 'text-slate-300'
                      }`}
                      style={{ backgroundColor: bgColor }}
                    >
                      {val}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {hoverCell && (
        <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 flex items-center justify-between animate-fade-in">
          <span>
            True Class: <strong className="text-white">{hoverCell.trueLabel}</strong> → Predicted Class: <strong className="text-indigo-400">{hoverCell.predLabel}</strong>
          </span>
          <span className="font-bold text-white bg-indigo-500/20 px-2 py-0.5 rounded border border-indigo-500/40">
            {hoverCell.val} samples
          </span>
        </div>
      )}
    </div>
  );
};
