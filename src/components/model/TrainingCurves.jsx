import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export const TrainingCurves = ({ historyData = [] }) => {
  if (!historyData || historyData.length === 0) return null;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Accuracy Curves */}
      <div className="glass-card rounded-2xl p-6 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-white">Model Accuracy vs Epochs</h3>
            <p className="text-xs text-slate-400">Training vs. Validation accuracy convergence curve.</p>
          </div>
          <div className="flex items-center gap-3 text-xs font-semibold">
            <span className="flex items-center gap-1 text-indigo-400">
              <span className="w-2.5 h-2.5 rounded-full bg-indigo-500" /> Train Acc
            </span>
            <span className="flex items-center gap-1 text-emerald-400">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> Val Acc
            </span>
          </div>
        </div>

        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={historyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" />
              <XAxis dataKey="epoch" stroke="#64748B" fontSize={11} />
              <YAxis domain={[40, 100]} stroke="#64748B" fontSize={11} unit="%" />
              <Tooltip 
                contentStyle={{ backgroundColor: '#0F172A', borderColor: '#334155', borderRadius: '0.75rem', color: '#fff', fontSize: '12px' }}
              />
              <Line type="monotone" dataKey="trainAcc" stroke="#6366F1" strokeWidth={2} dot={false} name="Train Accuracy %" />
              <Line type="monotone" dataKey="valAcc" stroke="#10B981" strokeWidth={2} dot={false} name="Val Accuracy %" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Loss Curves */}
      <div className="glass-card rounded-2xl p-6 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-white">Categorical Cross-Entropy Loss</h3>
            <p className="text-xs text-slate-400">Training vs. Validation loss optimization curve.</p>
          </div>
          <div className="flex items-center gap-3 text-xs font-semibold">
            <span className="flex items-center gap-1 text-rose-400">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500" /> Train Loss
            </span>
            <span className="flex items-center gap-1 text-amber-400">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500" /> Val Loss
            </span>
          </div>
        </div>

        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={historyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" />
              <XAxis dataKey="epoch" stroke="#64748B" fontSize={11} />
              <YAxis stroke="#64748B" fontSize={11} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#0F172A', borderColor: '#334155', borderRadius: '0.75rem', color: '#fff', fontSize: '12px' }}
              />
              <Line type="monotone" dataKey="trainLoss" stroke="#F43F5E" strokeWidth={2} dot={false} name="Train Loss" />
              <Line type="monotone" dataKey="valLoss" stroke="#F59E0B" strokeWidth={2} dot={false} name="Val Loss" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
