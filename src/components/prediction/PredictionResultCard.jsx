import React from 'react';
import { getEmotionConfig, formatPercent, formatDate } from '../../utils/emotionHelpers';
import { Sparkles, Download, CheckCircle2, Share2 } from 'lucide-react';
import { exportToJSON } from '../../utils/exportUtils';

export const PredictionResultCard = ({ result, filename }) => {
  if (!result) return null;

  const emotion = result.emotion || 'Neutral';
  const confidence = result.confidence || 0.9;
  const config = getEmotionConfig(emotion);
  const confidencePct = (confidence > 1 ? confidence : confidence * 100).toFixed(1);

  const handleDownloadResult = () => {
    exportToJSON({
      filename: filename || 'speech_sample.wav',
      predictedEmotion: emotion,
      confidenceScore: `${confidencePct}%`,
      emotionProbabilities: result.probabilities,
      audioFeatures: result.audioFeatures,
      timestamp: new Date().toISOString()
    }, `${filename || 'prediction'}_emotion_report.json`);
  };

  return (
    <div className="glass-card rounded-3xl p-8 border border-slate-800 relative overflow-hidden space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400">
          <Sparkles className="w-4 h-4 text-indigo-400" />
          ML Emotion Prediction Result
        </div>
        <span className="text-xs font-medium text-slate-400">
          {formatDate(result.timestamp || new Date().toISOString())}
        </span>
      </div>

      {/* Prominent Emotion Banner */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-6 p-6 rounded-2xl bg-gradient-to-r from-slate-900/90 via-slate-900/60 to-slate-950 border border-slate-800/80">
        <div className="flex items-center gap-5">
          <div 
            className="w-20 h-20 rounded-2xl flex items-center justify-center text-4xl shadow-xl border border-white/10"
            style={{ backgroundColor: config.bgColor, borderColor: config.borderColor }}
          >
            <span>{config.emoji}</span>
          </div>

          <div>
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest block">Detected Emotion</span>
            <h1 
              className="text-4xl font-black tracking-tight uppercase"
              style={{ color: config.color }}
            >
              {config.name}
            </h1>
            <p className="text-xs text-slate-400 mt-1 max-w-sm">{config.description}</p>
          </div>
        </div>

        {/* Confidence Percentage Metric */}
        <div className="text-center sm:text-right min-w-[160px] p-4 rounded-xl bg-slate-950/70 border border-slate-800/80">
          <span className="text-xs font-semibold text-slate-400 block mb-1">Model Confidence</span>
          <div className="text-3xl font-extrabold text-white tracking-tight">{confidencePct}%</div>
          
          <div className="w-full bg-slate-800 rounded-full h-2 mt-2 overflow-hidden border border-slate-700/50">
            <div 
              className="h-full rounded-full transition-all duration-700"
              style={{ width: `${confidencePct}%`, backgroundColor: config.color }}
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-2">
        <button
          onClick={handleDownloadResult}
          className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-2 border border-slate-700 transition-colors"
        >
          <Download className="w-4 h-4 text-indigo-400" /> Download JSON Report
        </button>
      </div>
    </div>
  );
};
