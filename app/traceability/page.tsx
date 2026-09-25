// app/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Layers, Play, Check, Loader2 } from 'lucide-react';
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000/api',
  timeout: 5000,
});

const PIPELINE_STEPS = [
  { id: 1, name: 'AST Parsing', description: 'SystemVerilog AST extraction' },
  { id: 2, name: 'RTL Linting', description: 'Syntax & synthesis check' },
  { id: 3, name: 'Spec Analysis', description: 'Natural language constraint mining' },
  { id: 4, name: 'Assertion Gen', description: 'SVA / PSL auto-generation' },
  { id: 5, name: 'Testbench Gen', description: 'UVM / SystemVerilog harness' },
  { id: 6, name: 'Compile Pass', description: 'Simulator compilation' },
  { id: 7, name: 'Simulation Run', description: 'Dynamic test execution' },
  { id: 8, name: 'Formal Proof', description: 'Property checking & model' },
  { id: 9, name: 'Coverage Collect', description: 'Line, toggle, functional cov' },
  { id: 10, name: 'Gap Analysis', description: 'Uncovered bin detection' },
  { id: 11, name: 'Auto Remediation', description: 'Directed test injection' },
  { id: 12, name: 'Closure Audit', description: 'Verification sign-off report' },
];

export default function DashboardPage() {
  const router = useRouter();
  const [activeStep, setActiveStep] = useState<number>(1);
  const [executingDemo, setExecutingDemo] = useState<boolean>(false);

  const handleRunDemo = async () => {
    setExecutingDemo(true);
    for (let i = 1; i <= PIPELINE_STEPS.length; i++) {
      setActiveStep(i);
      await new Promise((resolve) => setTimeout(resolve, 180));
    }

    try {
      await api.post('/verification/run-fifo-demo');
    } catch (e) {
      // Fallback
    } finally {
      setExecutingDemo(false);
      router.push('/tests');
    }
  };

  return (
    <div className="p-8 space-y-8 bg-slate-100 min-h-screen text-slate-800 font-sans">
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-slate-200 bg-white p-6 rounded-2xl shadow-sm gap-4">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-widest px-2.5 py-1 bg-blue-50 text-blue-700 border border-blue-200 rounded font-bold">
            Tier-1 Silicon Verification Workflow
          </span>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight mt-2">
            Autonomous RTL Verification & Coverage Closure
          </h1>
          <p className="text-xs text-slate-500 mt-1 max-w-3xl leading-relaxed">
            Industrial-grade AI verification suite designed for high-reliability SoC development.
          </p>
        </div>

        <button
          onClick={handleRunDemo}
          disabled={executingDemo}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs uppercase tracking-wider rounded-xl shadow transition flex items-center justify-center space-x-2 shrink-0 cursor-pointer disabled:opacity-50"
        >
          {executingDemo ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Play className="w-4 h-4 fill-current" />
          )}
          <span>Run Synchronous FIFO Demo</span>
        </button>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Pipeline Column */}
        <aside className="lg:col-span-5 bg-white border border-slate-200 rounded-2xl p-5 shadow-sm flex flex-col h-fit">
          <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-200">
            <div className="flex items-center space-x-2">
              <Layers className="w-4 h-4 text-amber-600" />
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                12-Stage Verification Pipeline
              </h2>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-600 font-semibold">
              STAGES 01–12
            </span>
          </div>

          <div className="space-y-2">
            {PIPELINE_STEPS.map((step) => {
              const isActive = activeStep === step.id;
              const isPassed = activeStep > step.id;

              return (
                <div
                  key={step.id}
                  onClick={() => setActiveStep(step.id)}
                  className={`flex items-start space-x-3 p-3 rounded-xl transition border cursor-pointer ${
                    isActive
                      ? 'bg-amber-50 border-amber-300 text-amber-900 shadow-sm'
                      : isPassed
                      ? 'bg-slate-50 border-slate-200 text-slate-700'
                      : 'bg-white border-slate-200 hover:border-slate-300 text-slate-500'
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 ${
                      isPassed
                        ? 'bg-emerald-600 text-white'
                        : isActive
                        ? 'bg-amber-500 text-white'
                        : 'bg-slate-200 text-slate-600'
                    }`}
                  >
                    {isPassed ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : step.id}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className={`text-xs font-bold ${isActive ? 'text-amber-950' : 'text-slate-800'}`}>
                        {step.name}
                      </span>
                      <span className="text-[9px] font-mono text-slate-400 font-semibold">
                        STAGE {step.id.toString().padStart(2, '0')}
                      </span>
                    </div>
                    <p className="text-[10px] text-slate-500 truncate mt-0.5">
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </aside>

        {/* Intelligence Cards */}
        <main className="lg:col-span-7 space-y-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-4 bg-white border border-slate-200 rounded-xl shadow-sm">
              <span className="text-[10px] font-mono text-slate-500 uppercase font-semibold">Active Projects</span>
              <div className="text-xl font-extrabold text-slate-900 font-mono mt-1">2</div>
            </div>
            <div className="p-4 bg-white border border-slate-200 rounded-xl shadow-sm">
              <span className="text-[10px] font-mono text-slate-500 uppercase font-semibold">RTL Files</span>
              <div className="text-xl font-extrabold text-slate-900 font-mono mt-1">12</div>
            </div>
            <div className="p-4 bg-white border border-slate-200 rounded-xl shadow-sm">
              <span className="text-[10px] font-mono text-slate-500 uppercase font-semibold">SVA Rules</span>
              <div className="text-xl font-extrabold text-slate-900 font-mono mt-1">48</div>
            </div>
            <div className="p-4 bg-white border border-slate-200 rounded-xl shadow-sm">
              <span className="text-[10px] font-mono text-slate-500 uppercase font-semibold">Coverage Target</span>
              <div className="text-xl font-extrabold text-emerald-600 font-mono mt-1">88.5%</div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 bg-white border border-slate-200 rounded-2xl shadow-sm space-y-2">
              <span className="text-[10px] font-mono text-amber-600 font-bold uppercase">Hardware AST</span>
              <h3 className="text-sm font-bold text-slate-900">RTL Intelligence Engine</h3>
              <p className="text-xs text-slate-500">Deep SystemVerilog AST parsing.</p>
            </div>
            <div className="p-5 bg-white border border-slate-200 rounded-2xl shadow-sm space-y-2">
              <span className="text-[10px] font-mono text-blue-600 font-bold uppercase">Spec Matrix</span>
              <h3 className="text-sm font-bold text-slate-900">Verification Planner</h3>
              <p className="text-xs text-slate-500">Generates traceable verification plans.</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}