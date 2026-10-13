import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, RotateCcw, Activity } from 'lucide-react';
import { formatDuration } from '../../utils/emotionHelpers';

export const WaveformPlayer = ({ audioUrl, waveformPeaks = [], duration = 0, title = 'Audio Sample' }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [totalDuration, setTotalDuration] = useState(duration || 0);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const audioRef = useRef(null);
  const canvasRef = useRef(null);

  // Generate fallback peaks if empty
  const peaks = waveformPeaks.length > 0 ? waveformPeaks : 
    Array.from({ length: 60 }, (_, i) => Math.abs(Math.sin(i * 0.25) * 0.8 + 0.15));

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
    const handleLoadedMetadata = () => setTotalDuration(audio.duration || duration);
    const handleEnded = () => setIsPlaying(false);

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [duration]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(err => console.warn('Audio playback error:', err));
    }
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    const seekTime = pos * totalDuration;
    if (audioRef.current && totalDuration > 0) {
      audioRef.current.currentTime = seekTime;
      setCurrentTime(seekTime);
    }
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    audioRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleVolumeChange = (e) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (audioRef.current) {
      audioRef.current.volume = val;
      if (val === 0) setIsMuted(true);
      else setIsMuted(false);
    }
  };

  const progressPercent = totalDuration > 0 ? (currentTime / totalDuration) * 100 : 0;

  return (
    <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800/80 space-y-3">
      {audioUrl && <audio ref={audioRef} src={audioUrl} preload="metadata" />}

      <div className="flex items-center justify-between text-xs font-semibold text-slate-300">
        <span className="flex items-center gap-1.5 text-indigo-400">
          <Activity className="w-4 h-4" />
          {title}
        </span>
        <span className="font-mono text-slate-400">
          {formatDuration(currentTime)} / {formatDuration(totalDuration)}
        </span>
      </div>

      {/* Waveform Canvas / Peaks Display */}
      <div 
        onClick={handleSeek}
        className="relative h-16 w-full bg-slate-950/80 rounded-xl p-2 cursor-pointer flex items-end justify-between gap-1 overflow-hidden border border-slate-800/60 group"
      >
        {/* Progress Overlay */}
        <div 
          className="absolute inset-y-0 left-0 bg-indigo-500/15 border-r border-indigo-500/50 transition-all pointer-events-none"
          style={{ width: `${progressPercent}%` }}
        />

        {peaks.map((val, idx) => {
          const barProgress = (idx / peaks.length) * 100;
          const isPlayed = barProgress <= progressPercent;
          return (
            <div
              key={idx}
              className={`w-full rounded-full transition-all duration-75 ${
                isPlayed 
                  ? 'bg-gradient-to-t from-indigo-500 to-purple-400 opacity-90' 
                  : 'bg-slate-700/60 group-hover:bg-slate-600/80'
              }`}
              style={{ height: `${Math.max(12, val * 100)}%` }}
            />
          );
        })}
      </div>

      {/* Player Controls */}
      <div className="flex items-center justify-between pt-1">
        <div className="flex items-center gap-3">
          <button
            onClick={togglePlay}
            className="w-10 h-10 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white flex items-center justify-center shadow-lg shadow-indigo-600/30 hover:scale-105 active:scale-95 transition-all"
          >
            {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current ml-0.5" />}
          </button>

          <button
            onClick={() => {
              if (audioRef.current) {
                audioRef.current.currentTime = 0;
                setCurrentTime(0);
              }
            }}
            className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white transition-colors"
            title="Restart Audio"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>

        {/* Volume Controls */}
        <div className="flex items-center gap-2">
          <button 
            onClick={toggleMute}
            className="text-slate-400 hover:text-white transition-colors"
          >
            {isMuted || volume === 0 ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4" />}
          </button>
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={isMuted ? 0 : volume}
            onChange={handleVolumeChange}
            className="w-20 h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
          />
        </div>
      </div>
    </div>
  );
};
