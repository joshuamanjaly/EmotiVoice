import React, { useState } from 'react';
import { Search, Bell, Settings, Mic, Radio, Sparkles, X, Check } from 'lucide-react';

export const Header = ({ onQuickAnalyze, onQuickRecord }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, title: 'Model v2.4 Loaded', desc: 'ResNet1D-BiLSTM trained on 14.4k speech samples.', time: '10m ago', read: false },
    { id: 2, title: 'Accuracy Threshold Met', desc: 'Validation F1-score reached 93.9%.', time: '1h ago', read: false },
    { id: 3, title: 'Audio Features Ready', desc: 'Librosa 40 MFCC feature extractor updated.', time: '2h ago', read: true }
  ]);

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <header className="sticky top-0 z-20 bg-[#0B0F19]/80 backdrop-blur-md border-b border-slate-800/80 px-6 py-4 flex items-center justify-between gap-4">
      {/* Page Header Title */}
      <div>
        <h1 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
          Speech Emotion Recognition
          <span className="px-2 py-0.5 text-[10px] font-extrabold uppercase rounded-md bg-indigo-500/10 text-indigo-400 border border-indigo-500/30">
            v2.4 AI
          </span>
        </h1>
        <p className="text-xs text-slate-400 font-medium">
          Analyze speech patterns and identify emotional characteristics using AI.
        </p>
      </div>

      {/* Right Tools & Actions */}
      <div className="flex items-center gap-3">
        {/* Quick Action Buttons */}
        <button
          onClick={onQuickAnalyze}
          className="hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-xs font-semibold hover:opacity-90 shadow-md shadow-indigo-600/20 transition-all"
        >
          <Mic className="w-3.5 h-3.5" />
          Upload Speech
        </button>

        <button
          onClick={onQuickRecord}
          className="hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold transition-all"
        >
          <Radio className="w-3.5 h-3.5 text-rose-400 animate-pulse" />
          Live Mic
        </button>

        {/* Notifications Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors relative"
            title="Notifications"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 text-[10px] font-bold text-white flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl z-50 overflow-hidden animate-slide-down">
              <div className="p-3 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
                <span className="text-xs font-bold text-white">System Notifications</span>
                {unreadCount > 0 && (
                  <button 
                    onClick={markAllRead}
                    className="text-[11px] text-indigo-400 hover:text-indigo-300 font-semibold flex items-center gap-1"
                  >
                    <Check className="w-3 h-3" /> Mark read
                  </button>
                )}
              </div>
              <div className="max-h-64 overflow-y-auto divide-y divide-slate-800/60">
                {notifications.map(n => (
                  <div key={n.id} className={`p-3 text-xs ${n.read ? 'opacity-60 bg-transparent' : 'bg-indigo-500/5'}`}>
                    <div className="flex items-center justify-between font-semibold text-slate-200">
                      <span>{n.title}</span>
                      <span className="text-[10px] text-slate-400">{n.time}</span>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-1">{n.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
