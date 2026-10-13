import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { EMOTIONS, getEmotionConfig } from '../../utils/emotionHelpers';

export const EmotionDistributionChart = ({ history = [] }) => {
  // Aggregate count from history or build fallback from sample counts
  const counts = {};
  Object.keys(EMOTIONS).forEach(e => counts[e] = 0);

  if (history.length > 0) {
    history.forEach(item => {
      const emo = item.emotion ? item.emotion.charAt(0).toUpperCase() + item.emotion.slice(1) : 'Neutral';
      if (counts[emo] !== undefined) counts[emo]++;
      else counts['Neutral']++;
    });
  } else {
    // Default baseline weights
    counts['Happy'] = 28;
    counts['Neutral'] = 22;
    counts['Sad'] = 18;
    counts['Angry'] = 12;
    counts['Calm'] = 8;
    counts['Fear'] = 6;
    counts['Surprise'] = 4;
    counts['Disgust'] = 2;
  }

  const data = Object.keys(counts)
    .map(key => ({
      name: key,
      value: counts[key],
      color: EMOTIONS[key].color
    }))
    .filter(item => item.value > 0);

  const total = data.reduce((sum, item) => sum + item.value, 0);

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const item = payload[0].payload;
      const pct = ((item.value / total) * 100).toFixed(1);
      const config = getEmotionConfig(item.name);
      return (
        <div className="p-3 rounded-xl bg-slate-900 border border-slate-700 shadow-xl text-xs space-y-1">
          <div className="font-bold flex items-center gap-1.5 text-white">
            <span>{config.emoji}</span>
            <span>{item.name}</span>
          </div>
          <div className="text-slate-300">
            Count: <span className="font-bold text-white">{item.value}</span> ({pct}%)
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="glass-card rounded-2xl p-6 border border-slate-800 space-y-4">
      <div>
        <h3 className="text-base font-bold text-white">Detected Emotion Distribution</h3>
        <p className="text-xs text-slate-400">Proportional classification share across analyzed speech samples.</p>
      </div>

      <div className="h-64 w-full relative">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={95}
              paddingAngle={4}
              dataKey="value"
              stroke="#0B0F19"
              strokeWidth={2}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>

        {/* Center Donut Label */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-2xl font-black text-white">{total}</span>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Samples</span>
        </div>
      </div>

      {/* Legend Badge Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-slate-800/80 text-xs">
        {data.map((item) => {
          const pct = ((item.value / total) * 100).toFixed(1);
          return (
            <div key={item.name} className="flex items-center justify-between p-2 rounded-lg bg-slate-950/60 border border-slate-800/60">
              <div className="flex items-center gap-1.5 truncate">
                <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: item.color }} />
                <span className="text-slate-300 truncate font-medium">{item.name}</span>
              </div>
              <span className="font-mono text-slate-400 font-bold ml-1">{pct}%</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
