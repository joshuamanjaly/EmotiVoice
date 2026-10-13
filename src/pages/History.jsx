import React, { useState } from 'react';
import { EmotionBadge } from '../components/common/EmotionBadge';
import { Modal } from '../components/common/Modal';
import { PredictionResultCard } from '../components/prediction/PredictionResultCard';
import { ProbabilityBarChart } from '../components/prediction/ProbabilityBarChart';
import { AudioFeatureCard } from '../components/audio/AudioFeatureCard';
import { EMOTIONS, formatDate, formatDuration } from '../utils/emotionHelpers';
import { exportToCSV, exportToJSON } from '../utils/exportUtils';
import { 
  Search, 
  Filter, 
  Download, 
  Trash2, 
  Eye, 
  ChevronLeft, 
  ChevronRight, 
  RotateCcw,
  FileSpreadsheet
} from 'lucide-react';

export const History = ({ history = [], onDeleteItem, onClearAll }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEmotion, setSelectedEmotion] = useState('All');
  const [minConfidence, setMinConfidence] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedItem, setSelectedItem] = useState(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);
  const [clearConfirmOpen, setClearConfirmOpen] = useState(false);

  const itemsPerPage = 6;

  // Filter items
  const filteredHistory = history.filter((item) => {
    const matchesSearch = item.filename.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesEmotion = selectedEmotion === 'All' || item.emotion.toLowerCase() === selectedEmotion.toLowerCase();
    const matchesConf = (item.confidence || 0) * 100 >= minConfidence;
    return matchesSearch && matchesEmotion && matchesConf;
  });

  // Pagination
  const totalPages = Math.ceil(filteredHistory.length / itemsPerPage) || 1;
  const paginatedItems = filteredHistory.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleExportCSV = () => {
    exportToCSV(filteredHistory, 'speech_emotion_analysis_history.csv');
  };

  const handleExportJSON = () => {
    exportToJSON(filteredHistory, 'speech_emotion_analysis_history.json');
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">Prediction History</h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Browse, filter, and export all historical audio speech emotion classification records.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleExportCSV}
            className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-2 border border-slate-700 transition-colors"
          >
            <FileSpreadsheet className="w-4 h-4 text-emerald-400" /> Export CSV
          </button>

          <button
            onClick={handleExportJSON}
            className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-2 border border-slate-700 transition-colors"
          >
            <Download className="w-4 h-4 text-indigo-400" /> JSON Report
          </button>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="glass-card rounded-2xl p-4 border border-slate-800 flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3 flex-1 min-w-[280px]">
          {/* Search Box */}
          <div className="relative flex-1 min-w-[200px]">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search audio files..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
            />
          </div>

          {/* Emotion Filter */}
          <select
            value={selectedEmotion}
            onChange={(e) => setSelectedEmotion(e.target.value)}
            className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
          >
            <option value="All">All Emotions</option>
            {Object.keys(EMOTIONS).map((emo) => (
              <option key={emo} value={emo}>{emo}</option>
            ))}
          </select>

          {/* Min Confidence Slider */}
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span>Min Confidence:</span>
            <input
              type="range"
              min="0"
              max="95"
              step="5"
              value={minConfidence}
              onChange={(e) => setMinConfidence(Number(e.target.value))}
              className="w-20 h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
            />
            <span className="font-mono text-slate-200 w-8">{minConfidence}%</span>
          </div>
        </div>

        {/* Clear Filters & Delete All */}
        <div className="flex items-center gap-2">
          {(searchQuery || selectedEmotion !== 'All' || minConfidence > 0) && (
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedEmotion('All');
                setMinConfidence(0);
              }}
              className="text-xs text-slate-400 hover:text-white flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Reset Filters
            </button>
          )}

          <button
            onClick={() => setClearConfirmOpen(true)}
            className="text-xs text-rose-400 hover:text-rose-300 flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-rose-500/10 border border-rose-500/20"
          >
            <Trash2 className="w-3.5 h-3.5" /> Clear History
          </button>
        </div>
      </div>

      {/* History Table */}
      <div className="glass-card rounded-2xl border border-slate-800 overflow-hidden">
        {paginatedItems.length === 0 ? (
          <div className="p-12 text-center space-y-3">
            <p className="text-slate-400 text-sm font-semibold">No speech analyses found matching your filter criteria.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-800/80 text-slate-400 font-semibold uppercase tracking-wider bg-slate-950/40">
                  <th className="py-3 px-4">File Name</th>
                  <th className="py-3 px-4">Duration</th>
                  <th className="py-3 px-4">Predicted Emotion</th>
                  <th className="py-3 px-4">Confidence</th>
                  <th className="py-3 px-4">Date / Time</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {paginatedItems.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-900/50 transition-colors">
                    <td className="py-3.5 px-4 font-semibold text-slate-200">
                      <div>
                        <span className="block truncate max-w-[200px]" title={item.filename}>{item.filename}</span>
                        <span className="text-[10px] font-mono text-slate-400">{item.id}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 font-mono text-slate-400">{formatDuration(item.duration)}</td>
                    <td className="py-3.5 px-4">
                      <EmotionBadge emotion={item.emotion} size="sm" />
                    </td>
                    <td className="py-3.5 px-4 font-mono font-bold text-indigo-300">
                      {(item.confidence * 100).toFixed(1)}%
                    </td>
                    <td className="py-3.5 px-4 text-slate-400 text-[11px]">{formatDate(item.timestamp)}</td>
                    <td className="py-3.5 px-4">
                      <span className="px-2 py-0.5 text-[10px] font-semibold rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        {item.status || 'Completed'}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right space-x-1">
                      <button
                        onClick={() => setSelectedItem(item)}
                        className="p-1.5 rounded-lg bg-slate-800 hover:bg-indigo-600 text-slate-300 hover:text-white transition-colors"
                        title="View Analysis Details"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={() => onDeleteItem(item.id)}
                        className="p-1.5 rounded-lg bg-slate-800 hover:bg-rose-600 text-slate-300 hover:text-white transition-colors"
                        title="Delete Record"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination Controls */}
        <div className="p-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400 bg-slate-950/40">
          <span>Showing {paginatedItems.length} of {filteredHistory.length} records</span>
          
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-white"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="font-semibold text-slate-200">Page {currentPage} of {totalPages}</span>
            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-white"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Item Details Modal */}
      {selectedItem && (
        <Modal
          isOpen={!!selectedItem}
          onClose={() => setSelectedItem(null)}
          title={`History Record: ${selectedItem.filename}`}
          maxWidth="max-w-4xl"
        >
          <div className="space-y-6">
            <PredictionResultCard result={selectedItem} filename={selectedItem.filename} />
            <ProbabilityBarChart probabilities={selectedItem.probabilities} />
            <AudioFeatureCard features={selectedItem.audioFeatures} />
          </div>
        </Modal>
      )}

      {/* Clear All Confirmation Modal */}
      {clearConfirmOpen && (
        <Modal
          isOpen={clearConfirmOpen}
          onClose={() => setClearConfirmOpen(false)}
          title="Confirm History Reset"
          maxWidth="max-w-md"
        >
          <div className="space-y-4">
            <p className="text-xs text-slate-300">
              Are you sure you want to delete all speech emotion analysis history records? This action cannot be undone.
            </p>

            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => setClearConfirmOpen(false)}
                className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold"
              >
                Cancel
              </button>

              <button
                onClick={() => {
                  onClearAll();
                  setClearConfirmOpen(false);
                }}
                className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold shadow-lg shadow-rose-600/30"
              >
                Delete All History
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
