'use client';

import React, { useEffect, useState } from 'react';
import { Activity, CheckCircle2, AlertCircle, Play, Server, ShieldCheck } from 'lucide-react';

const stages = [
  { id: 1, name: 'AST Parsing', desc: 'SystemVerilog AST extraction', category: 'Ingestion' },
  { id: 2, name: 'RTL Analysis', desc: 'Control & data path modeling', category: 'Analysis' },
  { id: 3, name: 'Spec Analysis', desc: 'Natural language constraint mining', category: 'Analysis' },
  { id: 4, name: 'Assertion Gen', desc: 'SVA / PSL auto-generation', category: 'Generation' },
  { id: 5, name: 'Testbench Gen', desc: 'UVM / SystemVerilog harness', category: 'Generation' },
  { id: 6, name: 'Compile Pass', desc: 'Simulator compilation', category: 'Execution' },
  { id: 7, name: 'Simulation Run', desc: 'Dynamic test execution', category: 'Execution' },
  { id: 8, name: 'Formal Proof', desc: 'Property checking & model', category: 'Verification' },
  { id: 9, name: 'Coverage Collect', desc: 'Line, toggle, functional cov', category: 'Coverage' },
  { id: 10, name: 'Gap Analysis', desc: 'Uncovered bin detection', category: 'Analysis' },
  { id: 11, name: 'Auto Remediation', desc: 'Directed test injection', category: 'Closure' },
  { id: 12, name: 'Report Signoff', desc: 'Coverage closure certificate', category: 'Signoff' },
];

export default function DashboardPage() {
  const [backendConnected, setBackendConnected] = useState<boolean | null>(null);

  useEffect(() => {
    const checkBackend = async () => {
      try {
        const res = await fetch('http://127.0.0.1:8000/api/health', { cache: 'no-store' });
        if (res.ok) {
          setBackendConnected(true);
        } else {
          setBackendConnected(false);
        }
      } catch (err) {
        setBackendConnected(false);
      }
    };

    checkBackend();
    const interval = setInterval(checkBackend, 5000); // Check every 5 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Autonomous RTL Verification & Coverage Closure</h1>
          <p className="text-slate-500 text-sm mt-1">Industrial-grade AI verification suite designed for high-reliability SoC development.</p>
        </div>
        <button className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-lg shadow-sm transition">
          <Play className="w-4 h-4" /> Run Synchronous FIFO Demo
        </button>
      </div>

      {/* Main Grid: Pipeline (Left) + Backend Telemetry (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Section (2 Columns): 12-Stage Pipeline Grid */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-slate-800">12-Stage Verification Pipeline</h2>
            <span className="text-xs font-mono bg-slate-200 text-slate-700 px-2 py-1 rounded">STAGES 01–12</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {stages.map((stage) => (
              <div key={stage.id} className="p-3.5 bg-white rounded-xl border border-slate-200 shadow-sm hover:border-blue-400 transition flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 font-bold text-sm shrink-0">
                  {stage.id}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-slate-800 text-sm truncate">{stage.name}</h3>
                    <span className="text-[10px] uppercase tracking-wider font-mono text-slate-400">{stage.category}</span>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">{stage.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Section (1 Column): Telemetry & Status Panel */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-slate-800">Engine Telemetry</h2>

          {/* Live Backend Connection Card */}
          <div className={`p-4 rounded-xl border shadow-sm ${
            backendConnected === true 
              ? 'bg-emerald-50/50 border-emerald-200' 
              : backendConnected === false 
              ? 'bg-rose-50/50 border-rose-200' 
              : 'bg-slate-50 border-slate-200'
          }`}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-slate-700 flex items-center gap-2">
                <Server className="w-4 h-4 text-slate-500" /> FastAPI Engine
              </span>
              {backendConnected === true && (
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Connected
                </span>
              )}
              {backendConnected === false && (
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-rose-700 bg-rose-100 px-2.5 py-0.5 rounded-full">
                  <AlertCircle className="w-3.5 h-3.5" /> Offline
                </span>
              )}
              {backendConnected === null && (
                <span className="text-xs text-slate-400">Pinging...</span>
              )}
            </div>
            <p className="text-xs text-slate-600 font-mono">Target: http://127.0.0.1:8000/api/health</p>
            
            {backendConnected === false && (
              <div className="mt-3 p-2.5 bg-white/80 rounded border border-rose-200 text-xs text-rose-700 space-y-1">
                <p className="font-semibold">Backend is not responding!</p>
                <p className="text-[11px] text-slate-600">Run this command in your Python backend terminal:</p>
                <code className="block bg-slate-900 text-emerald-400 p-1.5 rounded font-mono text-[10px]">
                  uvicorn main:app --reload --host 127.0.0.1 --port 8000
                </code>
              </div>
            )}
          </div>

          {/* Summary Metric Cards */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3.5 bg-white border border-slate-200 rounded-xl shadow-sm">
              <p className="text-xs text-slate-500 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-blue-500" /> Assertion Pass
              </p>
              <p className="text-xl font-bold text-slate-800 mt-1">98.4%</p>
            </div>
            <div className="p-3.5 bg-white border border-slate-200 rounded-xl shadow-sm">
              <p className="text-xs text-slate-500 flex items-center gap-1">
                <Activity className="w-3.5 h-3.5 text-emerald-500" /> Coverage
              </p>
              <p className="text-xl font-bold text-slate-800 mt-1">94.2%</p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}