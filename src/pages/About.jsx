import React from 'react';
import { 
  Sparkles, 
  Mic, 
  Sliders, 
  BrainCircuit, 
  CheckCircle2, 
  BarChart3, 
  ArrowRight,
  Database,
  Code2,
  Cpu,
  Layers,
  Server
} from 'lucide-react';

export const About = () => {
  const pipelineSteps = [
    { title: 'Audio Input', desc: 'WAV, MP3, or Live WebRTC Mic Recording stream', icon: Mic, color: 'text-indigo-400' },
    { title: 'Preprocessing', desc: 'Resampling to 22.05kHz, noise reduction & silence trim', icon: Sliders, color: 'text-purple-400' },
    { title: 'Feature Extraction', desc: '40 MFCCs, Spectral Centroid, Bandwidth, Rolloff & ZCR via Librosa', icon: Cpu, color: 'text-cyan-400' },
    { title: 'ML Inference', desc: '1D Deep ResNet + BiLSTM Multi-Head Attention Neural Network', icon: BrainCircuit, color: 'text-rose-400' },
    { title: 'Emotion Prediction', desc: 'Softmax output probabilities across 8 emotion classes', icon: CheckCircle2, color: 'text-emerald-400' },
    { title: 'Visualization', desc: 'Interactive Recharts dashboard & feature breakdown report', icon: BarChart3, color: 'text-amber-400' },
  ];

  const techStack = [
    { name: 'Python', category: 'Backend / Data Science', desc: 'Core language for audio processing and model training', color: 'border-amber-500/30 bg-amber-500/10 text-amber-300' },
    { name: 'Librosa', category: 'Audio Signal Processing', desc: 'Extraction of 40 MFCCs, Spectral Centroid, ZCR, and Chroma', color: 'border-indigo-500/30 bg-indigo-500/10 text-indigo-300' },
    { name: 'NumPy & Pandas', category: 'Matrix & Tensor Math', desc: 'High-performance audio array math and feature dataframe ops', color: 'border-cyan-500/30 bg-cyan-500/10 text-cyan-300' },
    { name: 'Scikit-learn', category: 'ML Evaluation & Baseline', desc: 'Metrics classification report, confusion matrix, & baseline models', color: 'border-orange-500/30 bg-orange-500/10 text-orange-300' },
    { name: 'TensorFlow / Keras', category: 'Deep Learning Framework', desc: 'Deep 1D ResNet + BiLSTM multi-class classification neural net', color: 'border-rose-500/30 bg-rose-500/10 text-rose-300' },
    { name: 'FastAPI', category: 'Backend REST Service', desc: 'Asynchronous Python web server for serving model inferencing APIs', color: 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300' },
    { name: 'React.js & Vite', category: 'Frontend Application', desc: 'Modern component-based responsive dashboard interface', color: 'border-sky-500/30 bg-sky-500/10 text-sky-300' },
    { name: 'Tailwind CSS', category: 'Styling & Design System', desc: 'Dark theme glassmorphism design tokens and micro-animations', color: 'border-purple-500/30 bg-purple-500/10 text-purple-300' },
  ];

  const datasets = [
    { name: 'RAVDESS', desc: 'Ryerson Audio-Visual Database of Emotional Speech and Song (24 actors, 8 emotions)', samples: '7,356 files' },
    { name: 'CREMA-D', desc: 'Crowd-sourced Emotional Multimodal Actors Dataset (91 actors, 6 emotions)', samples: '7,442 files' },
    { name: 'TESS', desc: 'Toronto Emotional Speech Set (2 female speakers, 7 emotions)', samples: '2,800 files' },
    { name: 'SAVEE', desc: 'Surrey Audio-Visual Expressed Emotion (4 male actors, 7 emotions)', samples: '480 files' }
  ];

  return (
    <div className="space-y-10 animate-fade-in max-w-5xl mx-auto">
      {/* Hero Header */}
      <div className="text-center space-y-3 py-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-300 text-xs font-semibold border border-indigo-500/30">
          <Sparkles className="w-3.5 h-3.5" />
          Academic & Enterprise AI Demonstration Project
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">About EmotiVoice</h1>
        <p className="text-sm text-slate-300 max-w-2xl mx-auto leading-relaxed">
          An end-to-end Speech Emotion Recognition (SER) software platform combining Digital Signal Processing (DSP) with Deep Learning classification neural networks.
        </p>
      </div>

      {/* What is SER? */}
      <div className="glass-card rounded-3xl p-8 border border-slate-800 space-y-4">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <Layers className="w-5 h-5 text-indigo-400" />
          What is Speech Emotion Recognition?
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          Speech Emotion Recognition (SER) is a specialized subfield of Artificial Intelligence and Natural Language Processing focused on identifying human emotional states directly from acoustic vocal signals. Unlike text-based sentiment analysis, SER inspects non-verbal acoustic characteristics such as pitch contours (fundamental frequency F0), energy intensity (RMS), vocal tract resonances (MFCCs), and speech rate (ZCR).
        </p>
      </div>

      {/* Visual Pipeline Flowchart */}
      <div className="glass-card rounded-3xl p-8 border border-slate-800 space-y-6">
        <div className="text-center space-y-1">
          <h2 className="text-xl font-bold text-white">System Architecture & ML Pipeline</h2>
          <p className="text-xs text-slate-400">Sequential data flow from raw acoustic audio buffer to dashboard analytics.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {pipelineSteps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div key={idx} className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800/80 space-y-2 relative group hover:border-indigo-500/50 transition-all">
                <div className="flex items-center justify-between">
                  <span className="p-2 rounded-xl bg-slate-900 border border-slate-800">
                    <Icon className={`w-5 h-5 ${step.color}`} />
                  </span>
                  <span className="font-mono text-[10px] font-bold text-slate-400">0{idx+1}</span>
                </div>
                <div>
                  <h3 className="font-bold text-sm text-white">{step.title}</h3>
                  <p className="text-xs text-slate-400 mt-1">{step.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Technologies Used Grid */}
      <div className="space-y-4">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Code2 className="w-5 h-5 text-purple-400" />
            Technologies Used
          </h2>
          <p className="text-xs text-slate-400">Core technology stack utilized across backend model training and frontend rendering.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {techStack.map((tech) => (
            <div key={tech.name} className={`p-4 rounded-2xl border ${tech.color} space-y-2 transition-transform hover:scale-[1.02]`}>
              <span className="text-[10px] font-extrabold uppercase tracking-widest block opacity-75">{tech.category}</span>
              <h3 className="font-extrabold text-base text-white">{tech.name}</h3>
              <p className="text-xs opacity-90 line-clamp-2">{tech.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Datasets Used */}
      <div className="glass-card rounded-3xl p-8 border border-slate-800 space-y-4">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <Database className="w-5 h-5 text-emerald-400" />
          Benchmark Training Datasets
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {datasets.map((ds) => (
            <div key={ds.name} className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800/80 space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-bold text-sm text-white">{ds.name}</span>
                <span className="px-2 py-0.5 text-[10px] font-mono font-bold rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/30">
                  {ds.samples}
                </span>
              </div>
              <p className="text-xs text-slate-400">{ds.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
