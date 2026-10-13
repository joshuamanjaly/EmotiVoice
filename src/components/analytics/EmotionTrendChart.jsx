import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export const EmotionTrendChart = () => {
  const trendData = [
    { date: 'Oct 04', Happy: 12, Neutral: 15, Sad: 8, Angry: 6, Fear: 4 },
    { date: 'Oct 05', Happy: 18, Neutral: 14, Sad: 10, Angry: 8, Fear: 5 },
    { date: 'Oct 06', Happy: 24, Neutral: 18, Sad: 12, Angry: 5, Fear: 3 },
    { date: 'Oct 07', Happy: 20, Neutral: 22, Sad: 14, Angry: 10, Fear: 6 },
    { date: 'Oct 08', Happy: 28, Neutral: 25, Sad: 15, Angry: 7, Fear: 4 },
    { date: 'Oct 09', Happy: 32, Neutral: 20, Sad: 18, Angry: 12, Fear: 8 },
    { date: 'Oct 10', Happy: 35, Neutral: 28, Sad: 16, Angry: 9, Fear: 5 },
  ];

  return (
    <div className="glass-card rounded-2xl p-6 border border-slate-800 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-bold text-white">Speech Emotion Frequency Trends</h3>
          <p className="text-xs text-slate-400">Daily frequency shifts across top detected emotions.</p>
        </div>
        <div className="flex items-center gap-3 text-xs font-semibold">
          <span className="flex items-center gap-1 text-amber-400">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400" /> Happy
          </span>
          <span className="flex items-center gap-1 text-teal-400">
            <span className="w-2.5 h-2.5 rounded-full bg-teal-400" /> Neutral
          </span>
          <span className="flex items-center gap-1 text-blue-400">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-400" /> Sad
          </span>
        </div>
      </div>

      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={trendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorHappy" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.4}/>
                <stop offset="95%" stopColor="#F59E0B" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorNeutral" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#14B8A6" stopOpacity={0.4}/>
                <stop offset="95%" stopColor="#14B8A6" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorSad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.4}/>
                <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" />
            <XAxis dataKey="date" stroke="#64748B" fontSize={11} />
            <YAxis stroke="#64748B" fontSize={11} />
            <Tooltip 
              contentStyle={{ backgroundColor: '#0F172A', borderColor: '#334155', borderRadius: '0.75rem', color: '#fff', fontSize: '12px' }}
            />
            <Area type="monotone" dataKey="Happy" stroke="#F59E0B" fillOpacity={1} fill="url(#colorHappy)" strokeWidth={2} />
            <Area type="monotone" dataKey="Neutral" stroke="#14B8A6" fillOpacity={1} fill="url(#colorNeutral)" strokeWidth={2} />
            <Area type="monotone" dataKey="Sad" stroke="#3B82F6" fillOpacity={1} fill="url(#colorSad)" strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
