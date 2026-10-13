import React, { useState } from 'react';
import { LiveAudioRecorder } from '../components/audio/LiveAudioRecorder';
import { PredictionResultCard } from '../components/prediction/PredictionResultCard';
import { ProbabilityBarChart } from '../components/prediction/ProbabilityBarChart';
import { AudioFeatureCard } from '../components/audio/AudioFeatureCard';
import { predictAudioEmotion } from '../services/api';

export const LiveRecording = ({ onAnalysisComplete }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState(null);
  const [recordedFilename, setRecordedFilename] = useState('');

  const handleAnalyzeRecord = async (audioBlob, filename) => {
    setIsProcessing(true);
    setRecordedFilename(filename);

    try {
      const res = await predictAudioEmotion(audioBlob, filename);
      setResult(res);
      setIsProcessing(false);
      if (onAnalysisComplete) onAnalysisComplete(res);
    } catch (err) {
      console.error('Error analyzing recorded audio:', err);
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-8 animate-fade-in max-w-4xl mx-auto">
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">Live Speech Analysis</h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Record speech directly through your browser microphone and inspect instant emotion prediction breakdowns.
        </p>
      </div>

      <LiveAudioRecorder onAnalyzeRecord={handleAnalyzeRecord} isProcessing={isProcessing} />

      {result && (
        <div className="space-y-6 animate-fade-in">
          <h2 className="text-lg font-bold text-white">Live Recording Prediction Result</h2>
          <PredictionResultCard result={result} filename={recordedFilename} />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ProbabilityBarChart probabilities={result.probabilities} />
            <AudioFeatureCard features={result.audioFeatures} />
          </div>
        </div>
      )}
    </div>
  );
};
