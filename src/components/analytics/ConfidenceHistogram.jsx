import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export const ConfidenceHistogram = ({ history = [] }) => {
  const buckets = [
    { range: '50-60%', count: 2 },
    { range: '60-70%', count: 5 },
    { range: '70-80%', count: 14 },
    { range: '80-90%', count: 48 },
    { range: '90-100%', count: 85 },
  ];

  return (
    <div className="glass-card rounded-2xl p-6 border border-slate-800 space-y-4">
      <div>
        <h3 className="text-base font-bold text-white">Prediction Confidence Histogram</h3>
        <p className="text-xs text-slate-400">Distribution of prediction confidence ranges.</p>
      </div>

      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={buckets} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" />
            <XAxis dataKey="range" stroke="#64748B" fontSize={11} />
            <YAxis stroke="#64748B" fontSize={11} />
            <Tooltip 
              contentStyle={{ backgroundColor: '#0F172A', borderColor: '#334155', borderRadius: '0.75rem', color: '#fff', fontSize: '12px' }}
            />
            <Bar dataKey="count" fill="#6366F1" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
