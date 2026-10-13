import React from 'react';
import { 
  LayoutDashboard, 
  Mic, 
  Radio, 
  History, 
  BarChart3, 
  BrainCircuit, 
  Sliders, 
  Info, 
  Sparkles,
  Settings,
  AudioWaveform
} from 'lucide-react';
import { SystemStatus } from '../common/SystemStatus';

export const NAV_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'analyze', label: 'Analyze Speech', icon: Mic },
  { id: 'live', label: 'Live Recording', icon: Radio, badge: 'Live' },
  { id: 'history', label: 'History', icon: History },
  { id: 'analytics', label: 'Analytics', icon: BarChart3 },
  { id: 'performance', label: 'Model Performance', icon: BrainCircuit },
  { id: 'features', label: 'Feature Analysis', icon: AudioWaveform },
  { id: 'about', label: 'About Project', icon: Info },
];

export const Sidebar = ({ activeTab, setActiveTab, className = '' }) => {
  return (
    <aside className={`w-64 bg-[#0B0F19]/90 backdrop-blur-xl border-r border-slate-800/80 flex flex-col justify-between h-screen sticky top-0 z-30 ${className}`}>
      {/* Top Logo & Title */}
      <div>
        <div className="p-5 flex items-center gap-3 border-b border-slate-800/80">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-rose-500 p-0.5 shadow-lg shadow-indigo-500/25 flex items-center justify-center">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-indigo-400 animate-pulse" />
            </div>
          </div>
          <div>
            <h1 className="font-extrabold text-lg tracking-tight text-white flex items-center gap-1.5">
              EmotiVoice
            </h1>
            <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest">SER AI Platform</p>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="p-3 space-y-1 mt-2">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-medium text-sm transition-all duration-150 group ${
                  isActive
                    ? 'bg-gradient-to-r from-indigo-600 to-indigo-700 text-white shadow-md shadow-indigo-600/30'
                    : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/60'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 transition-transform group-hover:scale-110 ${
                    isActive ? 'text-white' : 'text-slate-400 group-hover:text-indigo-400'
                  }`} />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className="px-1.5 py-0.5 text-[10px] font-bold rounded-full bg-rose-500/20 text-rose-400 border border-rose-500/30 animate-pulse">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Status & Settings */}
      <div className="p-3 space-y-3 border-t border-slate-800/80 bg-slate-950/40">
        <SystemStatus />
      </div>
    </aside>
  );
};
