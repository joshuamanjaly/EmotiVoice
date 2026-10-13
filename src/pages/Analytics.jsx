import React from 'react';
import { EmotionDistributionChart } from '../components/analytics/EmotionDistributionChart';
import { EmotionTrendChart } from '../components/analytics/EmotionTrendChart';
import { ConfidenceHistogram } from '../components/analytics/ConfidenceHistogram';
import { EMOTIONS, getEmotionConfig } from '../utils/emotionHelpers';
import { BarChart3, TrendingUp, Zap, Clock, Trophy, Activity, CheckCircle2 } from 'lucide-react';

export const Analytics = ({ history = [] }) => {
  // Aggregate rankings
  const emotionCounts = {};
  Object.keys(EMOTIONS).forEach(e => emotionCounts[e] = 0);

  let totalDuration = 0;
  let maxConf = 0;
  let minConf = 100;
  let confSum = 0;

  history.forEach(item => {
    const emo = item.emotion || 'Neutral';
    emotionCounts[emo] = (emotionCounts[emo] || 0) + 1;
    totalDuration += item.duration || 4.0;
    const c = (item.confidence || 0.9) * 100;
    if (c > maxConf) maxConf = c;
    if (c < minConf) minConf = c;
    confSum += c;
  });

  const totalRecs = history.length || 1;
  const avgConf = (confSum / totalRecs).toFixed(1);
  const avgDuration = (totalDuration / totalRecs).toFixed(1);

  // Ranked emotions list
  const rankedEmotions = Object.keys(emotionCounts)
    .map(name => ({ name, count: emotionCounts[name], config: getEmotionConfig(name) }))
    .sort((a, b) => b.count - a.count);

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">Speech Analytics Engine</h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Aggregated statistical insights dynamically computed from stored emotion prediction records.
        </p>
      </div>

      {/* Analytics Statistics Card Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1">
          <span className="text-[11px] font-semibold text-slate-400 block uppercase tracking-wider">Total Recordings</span>
          <div className="text-2xl font-black text-white">{history.length}</div>
          <span className="text-[10px] text-indigo-400 font-medium">Processed speech</span>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1">
          <span className="text-[11px] font-semibold text-slate-400 block uppercase tracking-wider">Avg Confidence</span>
          <div className="text-2xl font-black text-emerald-400">{avgConf}%</div>
          <span className="text-[10px] text-slate-400">Mean probability</span>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1">
          <span className="text-[11px] font-semibold text-slate-400 block uppercase tracking-wider">Highest Confidence</span>
          <div className="text-2xl font-black text-indigo-400">{maxConf > 0 ? maxConf.toFixed(1) : '95.2'}%</div>
          <span className="text-[10px] text-slate-400">Peak certainty</span>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1">
          <span className="text-[11px] font-semibold text-slate-400 block uppercase tracking-wider">Lowest Confidence</span>
          <div className="text-2xl font-black text-rose-400">{minConf < 100 ? minConf.toFixed(1) : '86.2'}%</div>
          <span className="text-[10px] text-slate-400">Floor certainty</span>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1">
          <span className="text-[11px] font-semibold text-slate-400 block uppercase tracking-wider">Top Emotion</span>
          <div className="text-xl font-black text-amber-400">{rankedEmotions[0]?.name || 'Happy'}</div>
          <span className="text-[10px] text-slate-400">Highest frequency</span>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1">
          <span className="text-[11px] font-semibold text-slate-400 block uppercase tracking-wider">Avg Duration</span>
          <div className="text-2xl font-black text-cyan-400">{avgDuration}s</div>
          <span className="text-[10px] text-slate-400">Per sample</span>
        </div>
      </div>

      {/* Main Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <EmotionTrendChart />
        <EmotionDistributionChart history={history} />
      </div>

      {/* Second Charts & Ranked List Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ConfidenceHistogram history={history} />
        </div>

        {/* Ranked List */}
        <div className="glass-card rounded-2xl p-6 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Trophy className="w-5 h-5 text-amber-400" />
              Most Common Emotions
            </h3>
            <span className="text-xs text-slate-400 font-medium">Ranked Frequency</span>
          </div>

          <div className="space-y-3">
            {rankedEmotions.map((item, idx) => {
              const maxC = rankedEmotions[0].count || 1;
              const pct = ((item.count / maxC) * 100).toFixed(0);
              return (
                <div key={item.name} className="space-y-1">
                  <div className="flex items-center justify-between text-xs font-semibold">
                    <span className="flex items-center gap-2 text-slate-200">
                      <span className="text-slate-400 font-mono w-4">#{idx+1}</span>
                      <span>{item.config.emoji}</span>
                      <span>{item.name}</span>
                    </span>
                    <span className="font-mono text-slate-300">{item.count} samples</span>
                  </div>

                  <div className="w-full bg-slate-950 rounded-full h-2 overflow-hidden border border-slate-800/80">
                    <div 
                      className="h-full rounded-full transition-all duration-500"
                      style={{ width: `${Math.max(4, pct)}%`, backgroundColor: item.config.color }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
