# EmotiVoice — Speech Emotion Recognition Dashboard

> **AI-Powered Speech Emotion Analysis Platform**  
> An academic and enterprise-grade Speech Emotion Recognition (SER) web application built with React, Tailwind CSS, Recharts, and Web Audio API, designed for seamless Python/FastAPI ML backend integration.

---

## 📌 Overview

**EmotiVoice** analyzes acoustic characteristics in human speech to classify vocal emotions (Happy, Sad, Angry, Fear, Neutral, Disgust, Surprise, Calm). It provides an interactive interface for uploading audio or recording live speech, visualizing waveforms and acoustic features (MFCC, Spectral Centroid, RMS Energy, Zero Crossing Rate), exploring prediction history, and evaluating machine learning model benchmarks.

---

## ✨ Features

- **📊 Comprehensive Analytics Dashboard**
  - High-level KPIs: Total analyses, top detected emotion, model accuracy, and average confidence score.
  - Interactive Donut & Area charts for emotion distributions and daily classification trends.
  - Recent prediction logs with quick-view modal inspections.

- **🎙️ Speech Analysis & Live Recording**
  - **Audio File Upload**: Drag-and-drop support for WAV, MP3, M4A, OGG, and WEBM (up to 25MB).
  - **Sample Audio Presets**: Pre-loaded speech samples for instant demonstration without uploading files.
  - **Live WebRTC Microphone**: Real-time microphone capture with live frequency canvas spectrum visualizer.
  - **Waveform Audio Player**: Scrubbable waveform playback with progress tracking and volume control.

- **🧠 Deep Learning Prediction & Feature Extraction**
  - Multiclass probability breakdown (Softmax distribution across 8 emotion categories).
  - Segmented emotion timeline showing temporal shifts across audio clips.
  - Acoustic signal parameter extraction (40 MFCCs, Spectral Centroid, Bandwidth, Rolloff, RMS Energy, Zero Crossing Rate).

- **📈 Model Performance & Evaluation**
  - Complete evaluation suite for ML benchmarks (Accuracy: 94.2%, F1-Score: 93.9%).
  - Interactive 8×8 multiclass Confusion Matrix with heatmap intensity.
  - Detailed Classification Report (Precision, Recall, F1, Support).
  - Training Curves (Accuracy vs. Epochs & Cross-Entropy Loss vs. Epochs).
  - Model comparison benchmarks (ResNet1D-BiLSTM vs. 2D CNN, Random Forest, SVM, MLP).

- **📁 Data History & Export**
  - Filterable and searchable analysis table (by emotion class, date, confidence threshold, and filename).
  - One-click export to **CSV** and **JSON** formats.
  - Full modal inspection of prior predictions and features.

- **🔌 Backend-Ready Architecture**
  - Modular API service layer (`src/services/api.js`) ready to connect to a Python/FastAPI backend.
  - Built-in standalone browser Web Audio API engine for local feature extraction and demonstration when running offline.

---

## 🛠️ Technology Stack

### Frontend
- **Framework**: React 18 (Vite)
- **Styling**: Tailwind CSS (Dark Glassmorphic UI theme)
- **Icons**: Lucide React
- **Data Visualization**: Recharts
- **Audio Processing**: Web Audio API & WebRTC MediaRecorder

### Supported Backend Stack (Integration Ready)
- **Framework**: FastAPI (Python)
- **DSP / Audio Processing**: Librosa, NumPy, SciPy
- **Data Science**: Pandas, Scikit-learn
- **Machine Learning**: TensorFlow / Keras / PyTorch (ResNet1D + BiLSTM)

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18.0.0 or later)
- npm or yarn

### Installation

1. **Clone or navigate to the project directory**:
   ```bash
   cd voicerec
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

4. **Open in browser**:
   Navigate to `http://localhost:3000` (or the URL displayed in the terminal).

### Building for Production

```bash
npm run build
```
The optimized production bundle will be generated in the `dist/` directory.

---

## 🔗 Backend API Contract

EmotiVoice is configured to connect to standard REST endpoints. Set `VITE_API_BASE_URL` in an `.env` file to point to your Python server:

```env
VITE_API_BASE_URL=http://localhost:8000/api/v1
```

### Endpoints
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/predict` | Upload audio file and receive emotion probabilities & features |
| `POST` | `/record` | Process live recorded audio blob |
| `GET` | `/history` | Fetch historical predictions |
| `GET` | `/analytics` | Retrieve aggregated prediction statistics |
| `GET` | `/model-info` | Get architecture & dataset metadata |
| `GET` | `/model-performance`| Fetch evaluation metrics & confusion matrix |
| `GET` | `/health` | Check backend & model status |

---

## 📁 Project Structure

```text
voicerec/
├── public/                 # Static assets & icons
├── src/
│   ├── components/
│   │   ├── analytics/      # Recharts distribution & trend charts
│   │   ├── audio/          # Waveform player, live mic recorder & feature cards
│   │   ├── common/         # Stat cards, emotion badges, system status, modals, toasts
│   │   ├── layout/         # Sidebar navigation, header, and mobile drawer
│   │   ├── model/          # Confusion matrix, training curves & benchmark tables
│   │   └── prediction/     # Result cards, probability bars & segmented timeline
│   ├── data/               # Model benchmarks, presets & initial datasets
│   ├── pages/              # Main view pages (Dashboard, Analyze, Live, History, etc.)
│   ├── services/           # REST API client & service abstraction layer
│   ├── utils/              # Web Audio DSP feature extractor & export utilities
│   ├── App.jsx             # Root layout & page router
│   ├── index.css           # Tailwind configuration & glassmorphism styles
│   └── main.jsx            # React DOM mounting
├── index.html              # HTML template
├── package.json            # Project manifest & scripts
├── tailwind.config.js      # Custom theme colors & animations
└── vite.config.js          # Vite build configuration
```

---

## 📜 License

This project is licensed under the MIT License — see the LICENSE file for details.
