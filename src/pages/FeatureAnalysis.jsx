import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { AudioWaveform, Zap, Sliders, Activity, Cpu } from 'lucide-react';

export const FeatureAnalysis = () => {
  // Generate mock time-series frame signal curves
  const numFrames = 30;
  const featureTimelineData = Array.from({ length: numFrames }, (_, i) => {
    const time = (i * 0.15).toFixed(2);
    const rms = Number((Math.sin(i * 0.3) * 0.04 + 0.05 + Math.random() * 0.01).toFixed(4));
    const zcr = Number((Math.cos(i * 0.25) * 0.04 + 0.08 + Math.random() * 0.01).toFixed(4));
    const centroid = Math.round(2200 + Math.sin(i * 0.4) * 600 + Math.random() * 150);
    const bandwidth = Math.round(centroid * 0.72);
    const rolloff = Math.round(centroid * 1.45);

    return {
      frame: `f${i+1}`,
      time: `${time}s`,
      rms,
      zcr,
      centroid,
      bandwidth,
      rolloff
    };
  });

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">Audio Feature Analysis</h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Technical acoustic feature descriptor extraction visualizer corresponding to Librosa Python DSP algorithms.
        </p>
      </div>

      {/* MFCC Coefficient Matrix Heatmap */}
      <div className="glass-card rounded-2xl p-6 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <AudioWaveform className="w-5 h-5 text-indigo-400" />
              40 MFCC Coefficient Matrix
            </h3>
            <p className="text-xs text-slate-400">
              Mel-Frequency Cepstral Coefficients calculated per short-time Fourier transform frame.
            </p>
          </div>
          <span className="text-xs font-mono text-indigo-300 font-semibold bg-indigo-500/10 px-2.5 py-1 rounded-lg border border-indigo-500/20">
            40 Coefficients x 30 Time Frames
          </span>
        </div>

        <div className="grid grid-cols-10 sm:grid-cols-20 gap-1 p-3 rounded-2xl bg-slate-950 border border-slate-800/80">
          {Array.from({ length: 40 }, (_, idx) => {
            const val = Math.sin(idx * 0.4) * 4.2;
            const heat = (val + 5) / 10;
            return (
              <div 
                key={idx}
                className="h-10 rounded text-[9px] font-mono flex flex-col items-center justify-center font-bold border transition-transform hover:scale-110"
                style={{
                  backgroundColor: `rgba(99, 102, 241, ${0.2 + heat * 0.6})`,
                  borderColor: `rgba(99, 102, 241, ${0.4 + heat * 0.4})`,
                  color: '#fff'
                }}
                title={`MFCC #${idx + 1}: ${val.toFixed(2)}`}
              >
                <span>c{idx+1}</span>
                <span className="text-[8px] text-slate-300">{val.toFixed(1)}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Spectral Centroid & Bandwidth Curves */}
      <div className="glass-card rounded-2xl p-6 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Cpu className="w-5 h-5 text-cyan-400" />
              Spectral Centroid, Bandwidth & Rolloff (Hz)
            </h3>
            <p className="text-xs text-slate-400">Frequency center of mass and spectral distribution over time.</p>
          </div>
          <div className="flex items-center gap-3 text-xs font-semibold">
            <span className="text-indigo-400">Centroid</span>
            <span className="text-emerald-400">Bandwidth</span>
            <span className="text-amber-400">Rolloff</span>
          </div>
        </div>

        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={featureTimelineData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" />
              <XAxis dataKey="time" stroke="#64748B" fontSize={11} />
              <YAxis stroke="#64748B" fontSize={11} unit="Hz" />
              <Tooltip contentStyle={{ backgroundColor: '#0F172A', borderColor: '#334155', borderRadius: '0.75rem', color: '#fff', fontSize: '12px' }} />
              <Area type="monotone" dataKey="rolloff" stroke="#F59E0B" fill="#F59E0B" fillOpacity={0.1} strokeWidth={2} name="Spectral Rolloff" />
              <Area type="monotone" dataKey="centroid" stroke="#6366F1" fill="#6366F1" fillOpacity={0.2} strokeWidth={2} name="Spectral Centroid" />
              <Area type="monotone" dataKey="bandwidth" stroke="#10B981" fill="#10B981" fillOpacity={0.2} strokeWidth={2} name="Spectral Bandwidth" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* RMS Energy & ZCR Curves Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* RMS Energy */}
        <div className="glass-card rounded-2xl p-6 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Zap className="w-5 h-5 text-amber-400" />
              Root Mean Square (RMS) Energy
            </h3>
            <span className="text-xs font-mono text-slate-400">Time Envelope</span>
          </div>

          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={featureTimelineData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" />
                <XAxis dataKey="time" stroke="#64748B" fontSize={11} />
                <YAxis stroke="#64748B" fontSize={11} />
                <Tooltip contentStyle={{ backgroundColor: '#0F172A', borderColor: '#334155', borderRadius: '0.75rem', color: '#fff', fontSize: '12px' }} />
                <Area type="monotone" dataKey="rms" stroke="#F59E0B" fill="#F59E0B" fillOpacity={0.3} strokeWidth={2} name="RMS Energy" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Zero Crossing Rate */}
        <div className="glass-card rounded-2xl p-6 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Activity className="w-5 h-5 text-rose-400" />
              Zero Crossing Rate (ZCR)
            </h3>
            <span className="text-xs font-mono text-slate-400">Frequency Sign Flips</span>
          </div>

          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={featureTimelineData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" />
                <XAxis dataKey="time" stroke="#64748B" fontSize={11} />
                <YAxis stroke="#64748B" fontSize={11} />
                <Tooltip contentStyle={{ backgroundColor: '#0F172A', borderColor: '#334155', borderRadius: '0.75rem', color: '#fff', fontSize: '12px' }} />
                <Area type="monotone" dataKey="zcr" stroke="#F43F5E" fill="#F43F5E" fillOpacity={0.3} strokeWidth={2} name="Zero Crossing Rate" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};
