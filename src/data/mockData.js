/**
 * Comprehensive Dataset & Mock Data for EmotiVoice Dashboard
 */

export const INITIAL_HISTORY = [
  {
    id: 'SER-2026-0941',
    filename: 'speech_actor01_happy_01.wav',
    duration: 4.2,
    emotion: 'Happy',
    confidence: 0.942,
    probabilities: {
      happy: 0.942,
      neutral: 0.028,
      surprise: 0.018,
      calm: 0.008,
      sad: 0.002,
      angry: 0.001,
      fear: 0.001,
      disgust: 0.000
    },
    timestamp: '2026-10-10T14:22:00Z',
    status: 'Completed',
    audioFeatures: {
      rmsEnergy: 0.0782,
      zeroCrossingRate: 0.1124,
      spectralCentroid: '2840 Hz',
      spectralBandwidth: '2100 Hz',
      spectralRolloff: '4450 Hz',
      sampleRate: 22050
    },
    timeline: [
      { timeRange: '00:00 - 00:02', emotion: 'Neutral', confidence: 0.88 },
      { timeRange: '00:02 - 00:04', emotion: 'Happy', confidence: 0.96 }
    ]
  },
  {
    id: 'SER-2026-0940',
    filename: 'meeting_interview_clip.mp3',
    duration: 6.8,
    emotion: 'Neutral',
    confidence: 0.895,
    probabilities: {
      neutral: 0.895,
      calm: 0.062,
      sad: 0.023,
      happy: 0.012,
      fear: 0.004,
      surprise: 0.002,
      angry: 0.001,
      disgust: 0.001
    },
    timestamp: '2026-10-10T12:15:00Z',
    status: 'Completed',
    audioFeatures: {
      rmsEnergy: 0.0415,
      zeroCrossingRate: 0.0782,
      spectralCentroid: '2150 Hz',
      spectralBandwidth: '1680 Hz',
      spectralRolloff: '3600 Hz',
      sampleRate: 22050
    }
  },
  {
    id: 'SER-2026-0939',
    filename: 'customer_support_call_04.wav',
    duration: 5.4,
    emotion: 'Angry',
    confidence: 0.918,
    probabilities: {
      angry: 0.918,
      disgust: 0.045,
      fear: 0.021,
      neutral: 0.010,
      sad: 0.004,
      surprise: 0.001,
      happy: 0.001,
      calm: 0.000
    },
    timestamp: '2026-10-10T10:45:00Z',
    status: 'Completed',
    audioFeatures: {
      rmsEnergy: 0.1245,
      zeroCrossingRate: 0.1680,
      spectralCentroid: '3450 Hz',
      spectralBandwidth: '2650 Hz',
      spectralRolloff: '5200 Hz',
      sampleRate: 22050
    }
  },
  {
    id: 'SER-2026-0938',
    filename: 'narration_audio_track.m4a',
    duration: 8.1,
    emotion: 'Calm',
    confidence: 0.952,
    probabilities: {
      calm: 0.952,
      neutral: 0.038,
      sad: 0.006,
      happy: 0.003,
      fear: 0.001,
      disgust: 0.000,
      surprise: 0.000,
      angry: 0.000
    },
    timestamp: '2026-10-09T18:30:00Z',
    status: 'Completed',
    audioFeatures: {
      rmsEnergy: 0.0310,
      zeroCrossingRate: 0.0540,
      spectralCentroid: '1850 Hz',
      spectralBandwidth: '1420 Hz',
      spectralRolloff: '3100 Hz',
      sampleRate: 22050
    }
  },
  {
    id: 'SER-2026-0937',
    filename: 'voice_memo_sadness.wav',
    duration: 3.9,
    emotion: 'Sad',
    confidence: 0.884,
    probabilities: {
      sad: 0.884,
      fear: 0.056,
      neutral: 0.038,
      calm: 0.015,
      disgust: 0.004,
      happy: 0.002,
      angry: 0.001,
      surprise: 0.000
    },
    timestamp: '2026-10-09T14:10:00Z',
    status: 'Completed',
    audioFeatures: {
      rmsEnergy: 0.0240,
      zeroCrossingRate: 0.0490,
      spectralCentroid: '1720 Hz',
      spectralBandwidth: '1310 Hz',
      spectralRolloff: '2900 Hz',
      sampleRate: 22050
    }
  },
  {
    id: 'SER-2026-0936',
    filename: 'surprised_reaction_02.wav',
    duration: 2.7,
    emotion: 'Surprise',
    confidence: 0.906,
    probabilities: {
      surprise: 0.906,
      happy: 0.058,
      fear: 0.022,
      neutral: 0.010,
      angry: 0.002,
      calm: 0.001,
      sad: 0.001,
      disgust: 0.000
    },
    timestamp: '2026-10-08T16:05:00Z',
    status: 'Completed',
    audioFeatures: {
      rmsEnergy: 0.0910,
      zeroCrossingRate: 0.1340,
      spectralCentroid: '3120 Hz',
      spectralBandwidth: '2410 Hz',
      spectralRolloff: '4890 Hz',
      sampleRate: 22050
    }
  },
  {
    id: 'SER-2026-0935',
    filename: 'emergency_call_anxiety.wav',
    duration: 4.8,
    emotion: 'Fear',
    confidence: 0.879,
    probabilities: {
      fear: 0.879,
      sad: 0.065,
      surprise: 0.032,
      angry: 0.014,
      neutral: 0.007,
      disgust: 0.002,
      happy: 0.001,
      calm: 0.000
    },
    timestamp: '2026-10-07T11:20:00Z',
    status: 'Completed',
    audioFeatures: {
      rmsEnergy: 0.0650,
      zeroCrossingRate: 0.1420,
      spectralCentroid: '2980 Hz',
      spectralBandwidth: '2280 Hz',
      spectralRolloff: '4620 Hz',
      sampleRate: 22050
    }
  },
  {
    id: 'SER-2026-0934',
    filename: 'speech_disgust_sample.wav',
    duration: 3.5,
    emotion: 'Disgust',
    confidence: 0.862,
    probabilities: {
      disgust: 0.862,
      angry: 0.071,
      sad: 0.042,
      neutral: 0.018,
      fear: 0.005,
      calm: 0.001,
      happy: 0.001,
      surprise: 0.000
    },
    timestamp: '2026-10-06T09:40:00Z',
    status: 'Completed',
    audioFeatures: {
      rmsEnergy: 0.0480,
      zeroCrossingRate: 0.0620,
      spectralCentroid: '1940 Hz',
      spectralBandwidth: '1510 Hz',
      spectralRolloff: '3250 Hz',
      sampleRate: 22050
    }
  }
];

export const MODEL_INFO = {
  name: 'ResNet1D-BiLSTM-SER',
  architecture: '1D Deep Convolutional Residual Network + BiLSTM with Multi-Head Attention',
  dataset: 'RAVDESS + CREMA-D + TESS + SAVEE Combined Corpus',
  numClasses: 8,
  classes: ['Happy', 'Sad', 'Angry', 'Fear', 'Neutral', 'Disgust', 'Surprise', 'Calm'],
  trainingSamples: 14400,
  testingSamples: 3600,
  featureExtraction: '40 MFCCs + Spectral Centroid + Bandwidth + Rolloff + Zero Crossing Rate (Librosa)',
  sampleRate: '22,050 Hz (Mono)',
  frameSize: '2048 ms (Hop length: 512 ms)',
  version: 'v2.4.0-Production',
  trainedDate: '2026-09-15',
  accuracy: 0.942,
  precision: 0.938,
  recall: 0.940,
  f1Score: 0.939
};

export const MODEL_PERFORMANCE = {
  metrics: {
    accuracy: 0.942,
    precision: 0.938,
    recall: 0.940,
    f1Score: 0.939,
    testLoss: 0.182
  },
  classificationReport: [
    { emotion: 'Happy', precision: 0.948, recall: 0.952, f1: 0.950, support: 450 },
    { emotion: 'Sad', precision: 0.925, recall: 0.931, f1: 0.928, support: 450 },
    { emotion: 'Angry', precision: 0.962, recall: 0.958, f1: 0.960, support: 450 },
    { emotion: 'Fear', precision: 0.915, recall: 0.920, f1: 0.917, support: 450 },
    { emotion: 'Neutral', precision: 0.951, recall: 0.964, f1: 0.957, support: 450 },
    { emotion: 'Disgust', precision: 0.912, recall: 0.898, f1: 0.905, support: 450 },
    { emotion: 'Surprise', precision: 0.934, recall: 0.941, f1: 0.937, support: 450 },
    { emotion: 'Calm', precision: 0.958, recall: 0.956, f1: 0.957, support: 450 }
  ],
  confusionMatrix: {
    labels: ['Happy', 'Sad', 'Angry', 'Fear', 'Neutral', 'Disgust', 'Surprise', 'Calm'],
    // Matrix values representing sample counts or percentages (8x8)
    data: [
      [428,  4,  2,  3,  6,  1,  5,  1], // Happy
      [  3,419,  1, 12,  8,  5,  0,  2], // Sad
      [  4,  1,431,  6,  2,  5,  1,  0], // Angry
      [  5, 15,  8,414,  3,  2,  3,  0], // Fear
      [  4,  7,  1,  2,434,  0,  0,  2], // Neutral
      [  2, 18, 14,  6,  4,404,  2,  0], // Disgust
      [ 12,  0,  3,  8,  3,  1,423,  0], // Surprise
      [  1,  4,  0,  0, 11,  0,  0,430]  // Calm
    ]
  },
  trainingHistory: Array.from({ length: 50 }, (_, i) => {
    const epoch = i + 1;
    const progress = epoch / 50;
    const trainAcc = Math.min(0.985, 0.45 + 0.52 * (1 - Math.exp(-progress * 4.5)) + (Math.random() * 0.01 - 0.005));
    const valAcc = Math.min(0.942, 0.42 + 0.51 * (1 - Math.exp(-progress * 4.0)) + (Math.random() * 0.015 - 0.0075));
    const trainLoss = Math.max(0.08, 1.8 * Math.exp(-progress * 4.2) + (Math.random() * 0.02 - 0.01));
    const valLoss = Math.max(0.18, 1.9 * Math.exp(-progress * 3.8) + (Math.random() * 0.03 - 0.015));
    
    return {
      epoch,
      trainAcc: Number((trainAcc * 100).toFixed(2)),
      valAcc: Number((valAcc * 100).toFixed(2)),
      trainLoss: Number(trainLoss.toFixed(4)),
      valLoss: Number(valLoss.toFixed(4))
    };
  }),
  comparisonModels: [
    { name: 'ResNet1D + BiLSTM (Current)', architecture: 'Deep 1D CNN + BiLSTM + Attention', accuracy: 94.2, precision: 93.8, recall: 94.0, f1: 93.9, isBest: true },
    { name: 'Standard 2D CNN (Spectrogram)', architecture: '4-Layer 2D CNN on Mel-Spectrograms', accuracy: 89.4, precision: 88.9, recall: 89.1, f1: 89.0, isBest: false },
    { name: 'Random Forest Ensemble', architecture: '500 Estimators on 180 Audio Features', accuracy: 78.6, precision: 77.9, recall: 78.2, f1: 78.0, isBest: false },
    { name: 'Support Vector Machine (SVM)', architecture: 'RBF Kernel with C=10.0, Gamma=scale', accuracy: 75.1, precision: 74.5, recall: 74.8, f1: 74.6, isBest: false },
    { name: 'Multi-Layer Perceptron (MLP)', architecture: '3 Dense Layers (256, 128, 64 units)', accuracy: 81.3, precision: 80.8, recall: 81.0, f1: 80.9, isBest: false }
  ]
};

export const SAMPLE_AUDIO_PRESETS = [
  {
    id: 'sample-happy',
    name: 'Sample Happy Speech.wav',
    duration: 3.8,
    emotion: 'Happy',
    description: 'Upbeat speaker expressing enthusiastic news.',
    fileSize: '340 KB',
    audioFeatures: {
      rmsEnergy: 0.0812,
      zeroCrossingRate: 0.1180,
      spectralCentroid: '2950 Hz',
      spectralBandwidth: '2150 Hz',
      spectralRolloff: '4580 Hz',
      sampleRate: 22050
    }
  },
  {
    id: 'sample-angry',
    name: 'Sample Angry Speech.wav',
    duration: 4.5,
    emotion: 'Angry',
    description: 'High intensity voice with rapid cadence.',
    fileSize: '412 KB',
    audioFeatures: {
      rmsEnergy: 0.1280,
      zeroCrossingRate: 0.1710,
      spectralCentroid: '3510 Hz',
      spectralBandwidth: '2720 Hz',
      spectralRolloff: '5340 Hz',
      sampleRate: 22050
    }
  },
  {
    id: 'sample-sad',
    name: 'Sample Sad Speech.wav',
    duration: 4.1,
    emotion: 'Sad',
    description: 'Low intensity, slow pace with falling intonation.',
    fileSize: '380 KB',
    audioFeatures: {
      rmsEnergy: 0.0235,
      zeroCrossingRate: 0.0460,
      spectralCentroid: '1690 Hz',
      spectralBandwidth: '1280 Hz',
      spectralRolloff: '2850 Hz',
      sampleRate: 22050
    }
  },
  {
    id: 'sample-calm',
    name: 'Sample Calm Speech.wav',
    duration: 5.2,
    emotion: 'Calm',
    description: 'Steady, soft voice with even pitch control.',
    fileSize: '490 KB',
    audioFeatures: {
      rmsEnergy: 0.0340,
      zeroCrossingRate: 0.0580,
      spectralCentroid: '1890 Hz',
      spectralBandwidth: '1460 Hz',
      spectralRolloff: '3150 Hz',
      sampleRate: 22050
    }
  }
];
