import React from 'react';
import { Clock, Activity } from 'lucide-react';
import { getEmotionConfig } from '../../utils/emotionHelpers';

export const EmotionTimeline = ({ timeline }) => {
  if (!timeline || timeline.length === 0) return null;

  return (
    <div className="glass-card rounded-2xl p-6 border border-slate-800 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <Clock className="w-5 h-5 text-indigo-400" />
          Segmented Emotion Timeline
        </h3>
        <span className="text-xs text-slate-400 font-medium">Temporal Shift Analysis</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {timeline.map((seg, idx) => {
          const config = getEmotionConfig(seg.emotion);
          const confPct = ((seg.confidence || 0.9) * 100).toFixed(1);
          return (
            <div 
              key={idx} 
              className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800/80 space-y-2 hover:border-slate-700 transition-colors"
            >
              <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
                <span className="flex items-center gap-1">
                  <Activity className="w-3 h-3 text-indigo-400" />
                  {seg.timeRange}
                </span>
                <span className="text-slate-400">{confPct}%</span>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-lg">{config.emoji}</span>
                <span className="font-bold text-sm" style={{ color: config.color }}>
                  {config.name}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
