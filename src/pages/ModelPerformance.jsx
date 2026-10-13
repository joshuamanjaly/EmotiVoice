import React from 'react';
import { StatCard } from '../components/common/StatCard';
import { ConfusionMatrix } from '../components/model/ConfusionMatrix';
import { TrainingCurves } from '../components/model/TrainingCurves';
import { ModelComparisonTable } from '../components/model/ModelComparisonTable';
import { ClassificationReportTable } from '../components/model/ClassificationReportTable';
import { MODEL_INFO, MODEL_PERFORMANCE } from '../data/mockData';
import { BrainCircuit, Cpu, Database, CheckCircle2, Award, Layers } from 'lucide-react';

export const ModelPerformance = () => {
  const { metrics, classificationReport, confusionMatrix, trainingHistory, comparisonModels } = MODEL_PERFORMANCE;

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Title */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">Model Evaluation & Benchmark</h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Empirical classification performance metrics, confusion matrices, and training curves of the Speech Emotion Recognition model.
        </p>
      </div>

      {/* Model Information Overview Card */}
      <div className="glass-card rounded-3xl p-6 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              <BrainCircuit className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                {MODEL_INFO.name}
                <span className="px-2 py-0.5 text-[10px] font-extrabold uppercase rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  {MODEL_INFO.version}
                </span>
              </h2>
              <p className="text-xs text-slate-400">{MODEL_INFO.architecture}</p>
            </div>
          </div>

          <div className="hidden sm:block text-right text-xs">
            <span className="text-slate-400 block">Trained Date</span>
            <span className="font-mono text-slate-200 font-semibold">{MODEL_INFO.trainedDate}</span>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
          <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/60">
            <span className="text-slate-400 text-[11px] block font-medium">Training Corpus</span>
            <span className="font-bold text-white text-sm mt-0.5 block">{MODEL_INFO.dataset}</span>
          </div>

          <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/60">
            <span className="text-slate-400 text-[11px] block font-medium">Train / Test Samples</span>
            <span className="font-bold text-white text-sm mt-0.5 block font-mono">
              {MODEL_INFO.trainingSamples.toLocaleString()} / {MODEL_INFO.testingSamples.toLocaleString()}
            </span>
          </div>

          <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/60">
            <span className="text-slate-400 text-[11px] block font-medium">Emotion Classes</span>
            <span className="font-bold text-white text-sm mt-0.5 block font-mono">
              {MODEL_INFO.numClasses} Classes
            </span>
          </div>

          <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/60">
            <span className="text-slate-400 text-[11px] block font-medium">Feature Extraction</span>
            <span className="font-bold text-indigo-300 text-xs mt-0.5 block truncate" title={MODEL_INFO.featureExtraction}>
              {MODEL_INFO.featureExtraction}
            </span>
          </div>
        </div>
      </div>

      {/* METRICS CARDS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Test Accuracy"
          value={`${(metrics.accuracy * 100).toFixed(1)}%`}
          change="Overall"
          changeType="positive"
          description="Overall dataset classification accuracy"
          icon={CheckCircle2}
          color="indigo"
        />

        <StatCard
          title="Weighted Precision"
          value={`${(metrics.precision * 100).toFixed(1)}%`}
          change="Precision"
          changeType="positive"
          description="Positive predictive value across classes"
          icon={Award}
          color="emerald"
        />

        <StatCard
          title="Weighted Recall"
          value={`${(metrics.recall * 100).toFixed(1)}%`}
          change="Sensitivity"
          changeType="positive"
          description="True positive rate across classes"
          icon={Layers}
          color="amber"
        />

        <StatCard
          title="Macro F1 Score"
          value={`${(metrics.f1Score * 100).toFixed(1)}%`}
          change="Harmonic Mean"
          changeType="positive"
          description="Harmonic mean of precision and recall"
          icon={BrainCircuit}
          color="purple"
        />
      </div>

      {/* Confusion Matrix */}
      <ConfusionMatrix matrixData={confusionMatrix} />

      {/* Classification Report Table */}
      <ClassificationReportTable reportData={classificationReport} />

      {/* Training Curves */}
      <TrainingCurves historyData={trainingHistory} />

      {/* Model Comparison */}
      <ModelComparisonTable comparisonData={comparisonModels} />
    </div>
  );
};
