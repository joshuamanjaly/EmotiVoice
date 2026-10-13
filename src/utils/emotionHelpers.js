export const EMOTIONS = {
  Happy: {
    name: 'Happy',
    color: '#F59E0B',
    bgColor: 'rgba(245, 158, 11, 0.15)',
    borderColor: 'rgba(245, 158, 11, 0.4)',
    textColor: 'text-amber-400',
    badgeClass: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
    emoji: '😊',
    description: 'High pitch variance, elevated energy, positive vocal resonance.',
  },
  Sad: {
    name: 'Sad',
    color: '#3B82F6',
    bgColor: 'rgba(59, 130, 246, 0.15)',
    borderColor: 'rgba(59, 130, 246, 0.4)',
    textColor: 'text-blue-400',
    badgeClass: 'bg-blue-500/10 text-blue-400 border-blue-500/30',
    emoji: '😔',
    description: 'Lower pitch contours, reduced RMS intensity, elongated pauses.',
  },
  Angry: {
    name: 'Angry',
    color: '#EF4444',
    bgColor: 'rgba(239, 68, 68, 0.15)',
    borderColor: 'rgba(239, 68, 68, 0.4)',
    textColor: 'text-red-400',
    badgeClass: 'bg-red-500/10 text-red-400 border-red-500/30',
    emoji: '😠',
    description: 'High voice intensity, rapid articulation, sharp zero-crossing rate spikes.',
  },
  Fear: {
    name: 'Fear',
    color: '#8B5CF6',
    bgColor: 'rgba(139, 92, 246, 0.15)',
    borderColor: 'rgba(139, 92, 246, 0.4)',
    textColor: 'text-purple-400',
    badgeClass: 'bg-purple-500/10 text-purple-400 border-purple-500/30',
    emoji: '😨',
    description: 'Irregular pitch contours, tremor in micro-features, elevated spectral centroid.',
  },
  Neutral: {
    name: 'Neutral',
    color: '#14B8A6',
    bgColor: 'rgba(20, 184, 166, 0.15)',
    borderColor: 'rgba(20, 184, 166, 0.4)',
    textColor: 'text-teal-400',
    badgeClass: 'bg-teal-500/10 text-teal-400 border-teal-500/30',
    emoji: '😐',
    description: 'Balanced frequency distribution, stable pitch line, standard cadence.',
  },
  Disgust: {
    name: 'Disgust',
    color: '#10B981',
    bgColor: 'rgba(16, 185, 129, 0.15)',
    borderColor: 'rgba(16, 185, 129, 0.4)',
    textColor: 'text-emerald-400',
    badgeClass: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
    emoji: '🤢',
    description: 'Low mean pitch, creaky voice voice quality, prolonged vocal tract resonances.',
  },
  Surprise: {
    name: 'Surprise',
    color: '#EC4899',
    bgColor: 'rgba(236, 72, 153, 0.15)',
    borderColor: 'rgba(236, 72, 153, 0.4)',
    textColor: 'text-pink-400',
    badgeClass: 'bg-pink-500/10 text-pink-400 border-pink-500/30',
    emoji: '😲',
    description: 'Abrupt F0 pitch inflection, sudden gain surge, wide spectral bandwidth.',
  },
  Calm: {
    name: 'Calm',
    color: '#06B6D4',
    bgColor: 'rgba(6, 182, 212, 0.15)',
    borderColor: 'rgba(6, 182, 212, 0.4)',
    textColor: 'text-cyan-400',
    badgeClass: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30',
    emoji: '😌',
    description: 'Smooth pitch transitions, moderate low energy, soft spectral roll-off.',
  }
};

export const getEmotionConfig = (emotionName) => {
  const normalized = emotionName ? emotionName.charAt(0).toUpperCase() + emotionName.slice(1).toLowerCase() : 'Neutral';
  return EMOTIONS[normalized] || EMOTIONS.Neutral;
};

export const formatPercent = (val) => {
  if (val === undefined || val === null) return '0%';
  const num = typeof val === 'string' ? parseFloat(val) : val;
  return `${(num > 1 ? num : num * 100).toFixed(1)}%`;
};

export const formatDuration = (seconds) => {
  if (!seconds || isNaN(seconds)) return '0.0s';
  const mins = Math.floor(seconds / 60);
  const secs = (seconds % 60).toFixed(1);
  return mins > 0 ? `${mins}m ${secs}s` : `${secs}s`;
};

export const formatDate = (isoString) => {
  if (!isoString) return 'Just now';
  const date = new Date(isoString);
  const now = new Date();
  const diffHours = (now - date) / (1000 * 60 * 60);
  
  if (diffHours < 1) return 'Just now';
  if (diffHours < 24) return `Today at ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
  if (diffHours < 48) return `Yesterday at ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
  
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
};
