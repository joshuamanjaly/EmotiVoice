import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import { MobileNav } from './components/layout/MobileNav';
import { Toast } from './components/common/Toast';

import { Dashboard } from './pages/Dashboard';
import { AnalyzeSpeech } from './pages/AnalyzeSpeech';
import { LiveRecording } from './pages/LiveRecording';
import { History } from './pages/History';
import { Analytics } from './pages/Analytics';
import { ModelPerformance } from './pages/ModelPerformance';
import { FeatureAnalysis } from './pages/FeatureAnalysis';
import { About } from './pages/About';

import { INITIAL_HISTORY } from './data/mockData';
import { fetchPredictionHistory, deleteHistoryItem, clearHistory } from './services/api';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [history, setHistory] = useState(INITIAL_HISTORY);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    // Load initial history from API / local store
    fetchPredictionHistory().then((data) => {
      if (data && data.length > 0) setHistory(data);
    });
  }, []);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  const handleAnalysisComplete = (newResult) => {
    fetchPredictionHistory().then((updated) => {
      setHistory(updated);
      showToast(`Predicted emotion: ${newResult.emotion} (${((newResult.confidence || 0.9) * 100).toFixed(1)}%)`, 'success');
    });
  };

  const handleDeleteHistoryItem = (id) => {
    deleteHistoryItem(id).then(() => {
      setHistory(prev => prev.filter(item => item.id !== id));
      showToast('Record deleted from prediction history.', 'info');
    });
  };

  const handleClearHistory = () => {
    clearHistory().then(() => {
      setHistory([]);
      showToast('All history records cleared.', 'warning');
    });
  };

  const renderActivePage = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard history={history} onNavigate={setActiveTab} />;
      case 'analyze':
        return <AnalyzeSpeech onAnalysisComplete={handleAnalysisComplete} />;
      case 'live':
        return <LiveRecording onAnalysisComplete={handleAnalysisComplete} />;
      case 'history':
        return <History history={history} onDeleteItem={handleDeleteHistoryItem} onClearAll={handleClearHistory} />;
      case 'analytics':
        return <Analytics history={history} />;
      case 'performance':
        return <ModelPerformance />;
      case 'features':
        return <FeatureAnalysis />;
      case 'about':
        return <About />;
      default:
        return <Dashboard history={history} onNavigate={setActiveTab} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#070A12] text-slate-100 flex flex-col lg:flex-row antialiased">
      {/* Mobile Top Navigation */}
      <MobileNav activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Persistent Desktop Sidebar */}
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        className="hidden lg:flex" 
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen">
        <Header 
          onQuickAnalyze={() => setActiveTab('analyze')}
          onQuickRecord={() => setActiveTab('live')}
        />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          {renderActivePage()}
        </main>
      </div>

      {/* Global Notification Toast */}
      <Toast toast={toast} onClose={() => setToast(null)} />
    </div>
  );
}
