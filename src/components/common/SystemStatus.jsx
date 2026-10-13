import React, { useState, useEffect } from 'react';
import { Activity, Server, Cpu, CheckCircle2, AlertCircle, RefreshCw } from 'lucide-react';
import { checkBackendHealth, getApiMode, setApiMode } from '../../services/api';

export const SystemStatus = ({ isCompact = false }) => {
  const [status, setStatus] = useState({ status: 'checking', mode: 'Initializing...' });
  const [useLiveApi, setUseLiveApi] = useState(getApiMode());
  const [loading, setLoading] = useState(false);

  const refreshHealth = async () => {
    setLoading(true);
    const result = await checkBackendHealth();
    setStatus(result);
    setLoading(false);
  };

  useEffect(() => {
    refreshHealth();
  }, [useLiveApi]);

  const toggleApiMode = () => {
    const nextState = !useLiveApi;
    setUseLiveApi(nextState);
    setApiMode(nextState);
  };

  if (isCompact) {
    return (
      <div className="flex items-center gap-2 text-xs">
        <span className="relative flex h-2 w-2">
          <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
            status.status === 'online' ? 'bg-emerald-400' : 'bg-amber-400'
          }`} />
          <span className={`relative inline-flex rounded-full h-2 w-2 ${
            status.status === 'online' ? 'bg-emerald-500' : 'bg-amber-500'
          }`} />
        </span>
        <span className="text-slate-300 font-medium">
          {status.status === 'online' ? 'FastAPI Connected' : 'Browser Audio ML Engine'}
        </span>
      </div>
    );
  }

  return (
    <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800/80 text-xs text-slate-300 space-y-2.5">
      <div className="flex items-center justify-between pb-2 border-b border-slate-800/60">
        <span className="font-semibold text-slate-200 flex items-center gap-1.5">
          <Activity className="w-3.5 h-3.5 text-indigo-400" />
          System Health
        </span>
        <button 
          onClick={refreshHealth}
          className="text-slate-400 hover:text-white transition-colors"
          title="Refresh API Status"
        >
          <RefreshCw className={`w-3 h-3 ${loading ? 'animate-spin' : ''}`} />
        </button>
      </div>

      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <span className="text-slate-400 flex items-center gap-1.5">
            <Server className="w-3 h-3 text-slate-400" />
            Backend
          </span>
          <span className={`font-medium flex items-center gap-1 ${
            status.status === 'online' ? 'text-emerald-400' : 'text-amber-400'
          }`}>
            <span className={`w-1.5 h-1.5 rounded-full ${
              status.status === 'online' ? 'bg-emerald-400' : 'bg-amber-400'
            }`} />
            {status.status === 'online' ? 'Connected' : 'Standalone'}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-slate-400 flex items-center gap-1.5">
            <Cpu className="w-3 h-3 text-slate-400" />
            ML Model
          </span>
          <span className="text-emerald-400 font-medium flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3 text-emerald-400" />
            Loaded (ResNet1D)
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-slate-400">REST API</span>
          <span className="text-slate-300 font-mono text-[11px]">
            {useLiveApi ? 'http://localhost:8000' : 'Local Web Audio'}
          </span>
        </div>
      </div>

      <div className="pt-2 border-t border-slate-800/60 flex items-center justify-between">
        <span className="text-[11px] text-slate-400">Live API Toggle:</span>
        <button
          onClick={toggleApiMode}
          className={`px-2 py-0.5 text-[10px] font-semibold rounded-md border transition-all ${
            useLiveApi 
              ? 'bg-indigo-500/20 text-indigo-300 border-indigo-500/40' 
              : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-white'
          }`}
        >
          {useLiveApi ? 'FastAPI Active' : 'Standalone Demo'}
        </button>
      </div>
    </div>
  );
};
