import React, { useState, useRef, useEffect } from 'react';
import { Mic, Square, Pause, Play, RefreshCw, Sparkles, AlertCircle, CheckCircle2 } from 'lucide-react';
import { WaveformPlayer } from './WaveformPlayer';

export const LiveAudioRecorder = ({ onAnalyzeRecord, isProcessing = false }) => {
  const [recordingState, setRecordingState] = useState('idle'); // idle | recording | paused | stopped
  const [recordSeconds, setRecordSeconds] = useState(0);
  const [audioBlob, setAudioBlob] = useState(null);
  const [audioUrl, setAudioUrl] = useState(null);
  const [micError, setMicError] = useState('');

  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const timerRef = useRef(null);
  const canvasRef = useRef(null);
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const animFrameRef = useRef(null);

  useEffect(() => {
    return () => {
      stopRecordingCleanup();
    };
  }, []);

  const startTimer = () => {
    timerRef.current = setInterval(() => {
      setRecordSeconds(prev => prev + 1);
    }, 1000);
  };

  const stopTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
  };

  const drawLiveWaveform = () => {
    if (!canvasRef.current || !analyserRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const analyser = analyserRef.current;
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const render = () => {
      animFrameRef.current = requestAnimationFrame(render);
      analyser.getByteFrequencyData(dataArray);

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const barWidth = (canvas.width / bufferLength) * 2.5;
      let x = 0;

      for (let i = 0; i < bufferLength; i++) {
        const barHeight = (dataArray[i] / 255) * canvas.height;

        const gradient = ctx.createLinearGradient(0, canvas.height, 0, 0);
        gradient.addColorStop(0, '#6366F1');
        gradient.addColorStop(1, '#EC4899');

        ctx.fillStyle = gradient;
        ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
        x += barWidth + 1;
      }
    };
    render();
  };

  const startRecording = async () => {
    setMicError('');
    setAudioBlob(null);
    setAudioUrl(null);
    setRecordSeconds(0);
    audioChunksRef.current = [];

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      
      // Setup Web Audio Analyser
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      const audioCtx = new AudioCtx();
      audioContextRef.current = audioCtx;
      const analyser = audioCtx.createAnalyser();
      analyser.fftSize = 64;
      analyserRef.current = analyser;

      const source = audioCtx.createMediaStreamSource(stream);
      source.connect(analyser);

      // Setup MediaRecorder
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) audioChunksRef.current.push(event.data);
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        const url = URL.createObjectURL(blob);
        setAudioBlob(blob);
        setAudioUrl(url);
        stream.getTracks().forEach(track => track.stop());
        if (audioContextRef.current) audioContextRef.current.close();
        if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      };

      mediaRecorder.start(100);
      setRecordingState('recording');
      startTimer();
      drawLiveWaveform();
    } catch (err) {
      console.error('Microphone access error:', err);
      setMicError('Microphone permission denied or unavailable on your browser. Please check microphone settings.');
      setRecordingState('idle');
    }
  };

  const pauseRecording = () => {
    if (mediaRecorderRef.current && recordingState === 'recording') {
      mediaRecorderRef.current.pause();
      setRecordingState('paused');
      stopTimer();
    } else if (mediaRecorderRef.current && recordingState === 'paused') {
      mediaRecorderRef.current.resume();
      setRecordingState('recording');
      startTimer();
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && (recordingState === 'recording' || recordingState === 'paused')) {
      mediaRecorderRef.current.stop();
      setRecordingState('stopped');
      stopTimer();
    }
  };

  const stopRecordingCleanup = () => {
    stopTimer();
    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    if (audioContextRef.current) audioContextRef.current.close();
  };

  const resetRecording = () => {
    stopRecordingCleanup();
    setRecordingState('idle');
    setRecordSeconds(0);
    setAudioBlob(null);
    setAudioUrl(null);
    setMicError('');
  };

  const handleAnalyze = () => {
    if (!audioBlob) return;
    const filename = `live_rec_${new Date().getTime()}.wav`;
    onAnalyzeRecord(audioBlob, filename);
  };

  const formatTimer = (secs) => {
    const mins = Math.floor(secs / 60);
    const remainingSecs = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${remainingSecs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="glass-card rounded-3xl p-8 max-w-2xl mx-auto space-y-6 text-center border border-slate-800">
      <div>
        <h2 className="text-2xl font-black text-white tracking-tight">Live Speech Recording</h2>
        <p className="text-xs text-slate-400 mt-1">
          Speak into your microphone to record real-time audio for emotion classification.
        </p>
      </div>

      {/* Mic Animation Button */}
      <div className="relative flex items-center justify-center py-6">
        {recordingState === 'recording' && (
          <div className="absolute w-40 h-40 rounded-full bg-rose-500/20 animate-ping pointer-events-none" />
        )}

        <button
          onClick={
            recordingState === 'idle' 
              ? startRecording 
              : recordingState === 'stopped' 
              ? resetRecording 
              : stopRecording
          }
          disabled={isProcessing}
          className={`w-32 h-32 rounded-full flex flex-col items-center justify-center shadow-2xl transition-all transform hover:scale-105 active:scale-95 z-10 ${
            recordingState === 'recording'
              ? 'bg-gradient-to-tr from-rose-600 to-red-500 text-white shadow-rose-600/40 ring-4 ring-rose-500/30'
              : recordingState === 'paused'
              ? 'bg-amber-600 text-white shadow-amber-600/40'
              : recordingState === 'stopped'
              ? 'bg-emerald-600 text-white shadow-emerald-600/40'
              : 'bg-gradient-to-tr from-indigo-600 to-purple-600 text-white shadow-indigo-600/40'
          }`}
        >
          {recordingState === 'recording' ? (
            <>
              <Square className="w-10 h-10 fill-current mb-1 animate-pulse" />
              <span className="text-[11px] font-bold uppercase tracking-wider">Stop</span>
            </>
          ) : recordingState === 'stopped' ? (
            <>
              <CheckCircle2 className="w-10 h-10 mb-1" />
              <span className="text-[11px] font-bold uppercase tracking-wider">Ready</span>
            </>
          ) : (
            <>
              <Mic className="w-10 h-10 mb-1" />
              <span className="text-[11px] font-bold uppercase tracking-wider">Record</span>
            </>
          )}
        </button>
      </div>

      {/* Timer & Canvas Visualizer */}
      <div className="space-y-3">
        <div className="text-3xl font-mono font-extrabold text-white tracking-wider">
          {formatTimer(recordSeconds)}
        </div>

        {/* Real-time Spectrum Canvas */}
        <div className="h-16 w-full max-w-md mx-auto bg-slate-950/80 rounded-2xl border border-slate-800/80 overflow-hidden p-2 flex items-center justify-center">
          {recordingState === 'recording' || recordingState === 'paused' ? (
            <canvas ref={canvasRef} width="300" height="60" className="w-full h-full" />
          ) : (
            <span className="text-xs text-slate-400 font-medium">
              {recordingState === 'stopped' ? 'Audio clip captured' : 'Waveform visualizer ready'}
            </span>
          )}
        </div>
      </div>

      {micError && (
        <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2 justify-center">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{micError}</span>
        </div>
      )}

      {/* Controls */}
      <div className="flex items-center justify-center gap-4 pt-2">
        {recordingState === 'recording' && (
          <button
            onClick={pauseRecording}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-2 border border-slate-700"
          >
            <Pause className="w-4 h-4" /> Pause
          </button>
        )}

        {recordingState === 'paused' && (
          <button
            onClick={pauseRecording}
            className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-semibold flex items-center gap-2"
          >
            <Play className="w-4 h-4" /> Resume
          </button>
        )}

        {(recordingState === 'stopped' || audioBlob) && (
          <>
            <button
              onClick={resetRecording}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold flex items-center gap-2 border border-slate-700"
            >
              <RefreshCw className="w-4 h-4" /> Re-record
            </button>

            <button
              onClick={handleAnalyze}
              disabled={isProcessing}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white text-xs font-bold flex items-center gap-2 shadow-lg shadow-emerald-500/25 hover:opacity-90 transition-all disabled:opacity-50"
            >
              <Sparkles className="w-4 h-4" />
              {isProcessing ? 'Analyzing Audio...' : 'Analyze Recorded Speech'}
            </button>
          </>
        )}
      </div>

      {audioUrl && (
        <div className="pt-4 border-t border-slate-800">
          <WaveformPlayer audioUrl={audioUrl} duration={recordSeconds} title="Captured Live Voice Recording" />
        </div>
      )}
    </div>
  );
};
