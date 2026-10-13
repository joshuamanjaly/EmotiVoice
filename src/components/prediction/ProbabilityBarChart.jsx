import React from 'react';
import { getEmotionConfig, EMOTIONS } from '../../utils/emotionHelpers';
import { BarChart3 } from 'lucide-react';

export const ProbabilityBarChart = ({ probabilities }) => {
  if (!probabilities) return null;

  // Convert object or map to sorted array
  const probabilityList = Object.keys(EMOTIONS).map((key) => {
    const lowerKey = key.toLowerCase();
    const prob = probabilities[lowerKey] !== undefined ? probabilities[lowerKey] : (probabilities[key] || 0);
    const pct = prob > 1 ? prob : prob * 100;
    return {
      emotion: key,
      probability: prob,
      percentage: pct.toFixed(1),
      config: getEmotionConfig(key)
    };
  }).sort((a, b) => b.probability - a.probability);

  return (
    <div className="glass-card rounded-2xl p-6 border border-slate-800 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-indigo-400" />
          Emotion Probabilities Breakdown
        </h3>
        <span className="text-xs text-slate-400 font-medium">Softmax Multi-Class Output</span>
      </div>

      <div className="space-y-3">
        {probabilityList.map((item) => (
          <div key={item.emotion} className="space-y-1">
            <div className="flex items-center justify-between text-xs font-semibold">
              <span className="flex items-center gap-2 text-slate-200">
                <span>{item.config.emoji}</span>
                <span>{item.emotion}</span>
              </span>
              <span className="font-mono text-slate-300">{item.percentage}%</span>
            </div>

            <div className="w-full bg-slate-950 rounded-full h-3 p-0.5 border border-slate-800/80">
              <div
                className="h-full rounded-full transition-all duration-700 relative group"
                style={{
                  width: `${Math.max(2, item.percentage)}%`,
                  backgroundColor: item.config.color,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
