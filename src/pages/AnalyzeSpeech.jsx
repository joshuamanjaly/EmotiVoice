import React, { useState } from 'react';
import { UploadCloud, FileAudio, Trash2, Sparkles, CheckCircle2, AlertCircle, Play, Music } from 'lucide-react';
import { WaveformPlayer } from '../components/audio/WaveformPlayer';
import { PredictionResultCard } from '../components/prediction/PredictionResultCard';
import { ProbabilityBarChart } from '../components/prediction/ProbabilityBarChart';
import { EmotionTimeline } from '../components/prediction/EmotionTimeline';
import { AudioFeatureCard } from '../components/audio/AudioFeatureCard';
import { SAMPLE_AUDIO_PRESETS } from '../data/mockData';
import { predictAudioEmotion } from '../services/api';

export const AnalyzeSpeech = ({ onAnalysisComplete }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileUrl, setFileUrl] = useState(null);
  const [fileError, setFileError] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [processStep, setProcessStep] = useState(0); // 0: Idle, 1: Uploading, 2: Feature Extraction, 3: Model Inference, 4: Complete
  const [result, setResult] = useState(null);

  const steps = [
    'Uploading audio buffer',
    'Extracting 40 MFCCs & Spectral Features',
    'Executing ResNet1D-BiLSTM model inference',
    'Generating emotion probabilities',
    'Analysis Completed'
  ];

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    validateAndSetFile(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      validateAndSetFile(e.dataTransfer.files[0]);
    }
  };

  const validateAndSetFile = (file) => {
    setFileError('');
    setResult(null);

    if (!file) return;

    // Supported formats
    const validExtensions = ['wav', 'mp3', 'm4a', 'ogg', 'webm', 'flac'];
    const ext = file.name.split('.').pop().toLowerCase();

    if (!validExtensions.includes(ext)) {
      setFileError('Invalid file format. Please upload a WAV, MP3, M4A, OGG, or WEBM audio file.');
      return;
    }

    if (file.size > 25 * 1024 * 1024) {
      setFileError('File size exceeds the 25MB maximum limit.');
      return;
    }

    setSelectedFile(file);
    const url = URL.createObjectURL(file);
    setFileUrl(url);
  };

  const selectSamplePreset = (preset) => {
    setFileError('');
    setResult(null);
    setSelectedFile({
      name: preset.name,
      size: preset.fileSize || '380 KB',
      presetData: preset
    });
    setFileUrl(null);
  };

  const handleStartAnalysis = async () => {
    if (!selectedFile) return;

    setIsProcessing(true);
    setProcessStep(1);

    // Simulate multi-stage ML pipeline UI progress
    setTimeout(() => setProcessStep(2), 500);
    setTimeout(() => setProcessStep(3), 1100);

    try {
      let res;
      if (selectedFile.presetData) {
        // Use preset acoustic data
        const preset = selectedFile.presetData;
        res = await predictAudioEmotion(new Blob(), preset.name);
      } else {
        res = await predictAudioEmotion(selectedFile, selectedFile.name);
      }

      setTimeout(() => {
        setProcessStep(4);
        setResult(res);
        setIsProcessing(false);
        if (onAnalysisComplete) onAnalysisComplete(res);
      }, 1600);
    } catch (err) {
      console.error('Analysis error:', err);
      setFileError('Failed to analyze audio file. Please check file formatting or server status.');
      setIsProcessing(false);
      setProcessStep(0);
    }
  };

  const clearSelection = () => {
    setSelectedFile(null);
    setFileUrl(null);
    setResult(null);
    setFileError('');
    setProcessStep(0);
  };

  return (
    <div className="space-y-8 animate-fade-in max-w-5xl mx-auto">
      {/* Title Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">Analyze Speech Emotion</h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Upload an audio file or select a pre-loaded sample to evaluate emotional speech characteristics using deep learning.
        </p>
      </div>

      {/* Upload Box */}
      {!selectedFile && (
        <div 
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
          className="glass-card rounded-3xl p-10 border-2 border-dashed border-slate-700/80 hover:border-indigo-500/80 text-center space-y-4 transition-all group cursor-pointer"
        >
          <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 mx-auto flex items-center justify-center group-hover:scale-110 transition-transform">
            <UploadCloud className="w-8 h-8" />
          </div>

          <div>
            <h3 className="text-lg font-bold text-white">Drag and drop audio file here</h3>
            <p className="text-xs text-slate-400 mt-1">
              Supports <strong className="text-slate-200">WAV, MP3, M4A, OGG, WEBM</strong> (Max file size: 25MB)
            </p>
          </div>

          <label className="inline-block px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-lg shadow-indigo-600/30 cursor-pointer transition-all">
            Browse Audio File
            <input type="file" accept="audio/*" onChange={handleFileChange} className="hidden" />
          </label>
        </div>
      )}

      {/* Sample Preset Selection Grid */}
      {!selectedFile && (
        <div className="space-y-3">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
            Or test with pre-loaded speech sample presets:
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {SAMPLE_AUDIO_PRESETS.map((preset) => (
              <button
                key={preset.id}
                onClick={() => selectSamplePreset(preset)}
                className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-indigo-500/60 text-left space-y-2 transition-all hover:scale-[1.02] group"
              >
                <div className="flex items-center justify-between">
                  <span className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400 group-hover:bg-indigo-500 group-hover:text-white transition-colors">
                    <Music className="w-4 h-4" />
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">{preset.fileSize}</span>
                </div>
                <div>
                  <h4 className="font-bold text-xs text-white group-hover:text-indigo-300 transition-colors">{preset.name}</h4>
                  <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">{preset.description}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {fileError && (
        <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{fileError}</span>
        </div>
      )}

      {/* Selected File Preview Box */}
      {selectedFile && !result && (
        <div className="glass-card rounded-3xl p-6 border border-slate-800 space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/30">
                <FileAudio className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">{selectedFile.name}</h3>
                <span className="text-xs text-slate-400">
                  Ready for feature extraction & classification
                </span>
              </div>
            </div>

            <button
              onClick={clearSelection}
              disabled={isProcessing}
              className="p-2 rounded-xl bg-slate-800 hover:bg-rose-500/20 text-slate-400 hover:text-rose-300 transition-colors"
              title="Remove File"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>

          {/* Audio Waveform Player */}
          {fileUrl && <WaveformPlayer audioUrl={fileUrl} title={selectedFile.name} />}

          {/* Progress Indicator */}
          {isProcessing && (
            <div className="space-y-3 p-4 rounded-2xl bg-slate-950/80 border border-slate-800">
              <div className="flex items-center justify-between text-xs font-bold text-slate-200">
                <span className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-indigo-400 animate-spin" />
                  {steps[processStep]}
                </span>
                <span className="font-mono text-indigo-400">{processStep * 25}%</span>
              </div>

              <div className="w-full bg-slate-900 rounded-full h-2 overflow-hidden border border-slate-800">
                <div 
                  className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-rose-500 transition-all duration-300"
                  style={{ width: `${processStep * 25}%` }}
                />
              </div>
            </div>
          )}

          {/* Analyze Button */}
          <div className="flex justify-end gap-3">
            <button
              onClick={clearSelection}
              disabled={isProcessing}
              className="px-4 py-2.5 rounded-xl bg-slate-800 text-slate-300 hover:text-white text-xs font-semibold"
            >
              Cancel
            </button>

            <button
              onClick={handleStartAnalysis}
              disabled={isProcessing}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-extrabold text-xs shadow-lg shadow-indigo-600/30 flex items-center gap-2 hover:opacity-90 disabled:opacity-50"
            >
              <Sparkles className="w-4 h-4" />
              {isProcessing ? 'Analyzing Audio...' : 'Analyze Speech Emotion'}
            </button>
          </div>
        </div>
      )}

      {/* Prediction Output Section */}
      {result && (
        <div className="space-y-6 animate-fade-in">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              Analysis Completed
            </h2>

            <button
              onClick={clearSelection}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold"
            >
              Analyze Another File
            </button>
          </div>

          <PredictionResultCard result={result} filename={selectedFile?.name} />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ProbabilityBarChart probabilities={result.probabilities} />
            <AudioFeatureCard features={result.audioFeatures} />
          </div>

          {result.timeline && <EmotionTimeline timeline={result.timeline} />}
        </div>
      )}
    </div>
  );
};
