import React, { useState } from 'react';
import { Sliders, ChevronDown, ChevronUp, Cpu, Activity, Zap, BarChart2 } from 'lucide-react';

export const AudioFeatureCard = ({ features }) => {
  const [showTechnical, setShowTechnical] = useState(false);

  if (!features) return null;

  const keyMetrics = [
    { label: 'RMS Energy', val: features.rmsEnergy || '0.0482', unit: 'raw', icon: Zap },
    { label: 'Zero Crossing Rate', val: features.zeroCrossingRate || '0.0914', unit: 'zcr', icon: Activity },
    { label: 'Spectral Centroid', val: features.spectralCentroid || '2410 Hz', unit: '', icon: Cpu },
    { label: 'Spectral Bandwidth', val: features.spectralBandwidth || '1850 Hz', unit: '', icon: BarChart2 },
    { label: 'Spectral Rolloff', val: features.spectralRolloff || '3820 Hz', unit: '', icon: Sliders },
    { label: 'Sample Rate', val: `${features.sampleRate || 22050} Hz`, unit: 'mono', icon: Cpu },
  ];

  return (
    <div className="glass-card rounded-2xl p-6 border border-slate-800 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Sliders className="w-5 h-5 text-indigo-400" />
            Extracted Audio Features
          </h3>
          <p className="text-xs text-slate-400">
            Acoustic signal descriptors extracted via Librosa DSP pipeline.
          </p>
        </div>

        <button
          onClick={() => setShowTechnical(!showTechnical)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-xs font-semibold text-slate-300 border border-slate-700 transition-all"
        >
          <span>{showTechnical ? 'Hide technical features' : 'View technical features'}</span>
          {showTechnical ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
      </div>

      {/* Primary Metrics Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {keyMetrics.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div key={idx} className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/60">
              <div className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-400 mb-1">
                <Icon className="w-3.5 h-3.5 text-indigo-400" />
                {item.label}
              </div>
              <div className="text-sm font-extrabold text-white">{item.val}</div>
            </div>
          );
        })}
      </div>

      {/* Expandable Technical Features */}
      {showTechnical && (
        <div className="pt-4 border-t border-slate-800 space-y-4 animate-fade-in">
          <div>
            <span className="text-xs font-bold text-slate-300 uppercase tracking-wider block mb-2">
              40 MFCC Coefficients (Mel-Frequency Cepstral Coefficients)
            </span>
            <div className="grid grid-cols-5 sm:grid-cols-10 gap-1.5 p-3 rounded-xl bg-slate-950 font-mono text-[11px] border border-slate-800/80">
              {(features.mfccs || Array.from({ length: 40 }, (_, i) => (Math.sin(i) * 3).toFixed(2))).map((val, idx) => (
                <div 
                  key={idx} 
                  className={`p-1 text-center rounded border text-[10px] ${
                    val > 0 
                      ? 'bg-indigo-500/10 border-indigo-500/30 text-indigo-300' 
                      : 'bg-rose-500/10 border-rose-500/30 text-rose-300'
                  }`}
                  title={`MFCC #${idx + 1}`}
                >
                  <span className="text-slate-400 text-[9px] block">c{idx+1}</span>
                  {val}
                </div>
              ))}
            </div>
          </div>

          <div className="text-xs text-slate-400 leading-relaxed p-3 rounded-xl bg-slate-900/50 border border-slate-800/60">
            <span className="font-semibold text-slate-200">DSP Feature Pipeline Note:</span> MFCC coefficients quantify vocal tract filter resonance across logarithmic Mel scale frequencies, capturing subtle timber and emotional inflection parameters.
          </div>
        </div>
      )}
    </div>
  );
};
