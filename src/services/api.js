import { extractAudioFeaturesFromBlob, predictEmotionFromAudioFeatures } from '../utils/audioProcessor';
import { INITIAL_HISTORY, MODEL_INFO, MODEL_PERFORMANCE } from '../data/mockData';

// Base API URL configurable via environment variable VITE_API_BASE_URL
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api/v1';

// Local reactive storage for standalone browser mode
let localHistoryStore = [...INITIAL_HISTORY];
let forceLiveApi = false; // Toggleable in settings

export const setApiMode = (useLiveBackend) => {
  forceLiveApi = useLiveBackend;
};

export const getApiMode = () => forceLiveApi;

/**
 * Health check endpoint GET /health
 */
export const checkBackendHealth = async () => {
  if (!forceLiveApi && !import.meta.env.VITE_API_BASE_URL) {
    return { status: 'offline', mode: 'Standalone Browser (Local Audio Context)' };
  }
  
  try {
    const response = await fetch(`${API_BASE_URL}/health`, { method: 'GET' });
    if (response.ok) {
      const data = await response.json();
      return { status: 'online', modelLoaded: true, details: data };
    }
    return { status: 'offline', mode: 'Standalone Browser Engine' };
  } catch (err) {
    return { status: 'offline', mode: 'Standalone Browser Engine', error: err.message };
  }
};

/**
 * Predict audio emotion POST /predict
 */
export const predictAudioEmotion = async (fileOrBlob, filename = 'speech_audio.wav') => {
  // Try Live REST API first if configured or forced
  if (forceLiveApi || import.meta.env.VITE_API_BASE_URL) {
    try {
      const formData = new FormData();
      formData.append('file', fileOrBlob, filename);

      const response = await fetch(`${API_BASE_URL}/predict`, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        // Add to history store
        const historyEntry = formatPredictionForHistory(result, filename);
        localHistoryStore.unshift(historyEntry);
        return result;
      }
    } catch (err) {
      console.warn('Backend API request failed, falling back to Web Audio client engine:', err);
    }
  }

  // Fallback / Standalone Web Audio API Engine
  const features = await extractAudioFeaturesFromBlob(fileOrBlob);
  const prediction = predictEmotionFromAudioFeatures(features);
  
  const historyEntry = {
    id: `SER-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
    filename,
    duration: features.duration,
    emotion: prediction.emotion,
    confidence: prediction.confidence,
    probabilities: prediction.probabilities,
    timestamp: new Date().toISOString(),
    status: 'Completed',
    audioFeatures: features,
    timeline: prediction.timeline
  };

  localHistoryStore.unshift(historyEntry);
  return prediction;
};

/**
 * Get Prediction History GET /history
 */
export const fetchPredictionHistory = async () => {
  if (forceLiveApi || import.meta.env.VITE_API_BASE_URL) {
    try {
      const res = await fetch(`${API_BASE_URL}/history`);
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn('Failed to fetch remote history, returning local store.');
    }
  }
  return [...localHistoryStore];
};

/**
 * Delete item from history DELETE /history/:id
 */
export const deleteHistoryItem = async (id) => {
  localHistoryStore = localHistoryStore.filter(item => item.id !== id);
  return { success: true, id };
};

/**
 * Clear all history
 */
export const clearHistory = async () => {
  localHistoryStore = [];
  return { success: true };
};

/**
 * Get Model Information GET /model-info
 */
export const fetchModelInfo = async () => {
  if (forceLiveApi || import.meta.env.VITE_API_BASE_URL) {
    try {
      const res = await fetch(`${API_BASE_URL}/model-info`);
      if (res.ok) return await res.json();
    } catch (e) {}
  }
  return MODEL_INFO;
};

/**
 * Get Model Performance Evaluation GET /model-performance
 */
export const fetchModelPerformance = async () => {
  if (forceLiveApi || import.meta.env.VITE_API_BASE_URL) {
    try {
      const res = await fetch(`${API_BASE_URL}/model-performance`);
      if (res.ok) return await res.json();
    } catch (e) {}
  }
  return MODEL_PERFORMANCE;
};

const formatPredictionForHistory = (result, filename) => {
  return {
    id: `SER-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
    filename: filename || 'audio_sample.wav',
    duration: result.duration || 4.0,
    emotion: result.emotion,
    confidence: result.confidence,
    probabilities: result.probabilities,
    timestamp: new Date().toISOString(),
    status: 'Completed',
    audioFeatures: result.audioFeatures || {}
  };
};
