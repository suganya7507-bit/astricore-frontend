'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import { AlertTriangle, Bug, Terminal, RefreshCw, ArrowRight } from 'lucide-react';

export default function FailuresPage() {
  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 font-sans">
      <Navbar />

      <main className="max-w-[1400px] mx-auto p-8 space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-200">
          <div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">Failure Triage & Waveform Debug</h1>
            <p className="text-xs text-slate-500 font-mono mt-1">Automatic root cause analysis, stack trace inspection, and wave dumps.</p>
          </div>
          <button className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-xl shadow-md transition flex items-center space-x-2">
            <RefreshCw className="w-4 h-4" />
            <span>Re-run Failed Tests</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-4 bg-white border border-slate-200 rounded-2xl p-6 shadow-md space-y-4">
            <h2 className="text-xs font-extrabold uppercase text-slate-800 pb-3 border-b border-slate-100 flex items-center space-x-2">
              <Bug className="w-4 h-4 text-rose-600" />
              <span>Detected Failures (2)</span>
            </h2>

            <div className="space-y-3">
              <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 cursor-pointer hover:shadow-md transition">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-rose-900">FIFO_OVERFLOW_01</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-100 text-rose-700 font-bold">CRITICAL</span>
                </div>
                <p className="text-xs text-rose-700 mt-1">Full flag failed to assert during cycle #1420 write command.</p>
              </div>

              <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 cursor-pointer hover:shadow-md transition">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-amber-900">UVM_PHASE_TIMEOUT</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-100 text-amber-700 font-bold">WARNING</span>
                </div>
                <p className="text-xs text-amber-700 mt-1">Run phase exceeded 5000ns without sequence completion.</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-8 bg-white border border-slate-200 rounded-2xl p-6 shadow-md space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h2 className="text-xs font-extrabold uppercase text-slate-800 flex items-center space-x-2">
                <Terminal className="w-4 h-4 text-amber-600" />
                <span>Simulation Waveform Trace Log</span>
              </h2>
              <span className="text-[10px] font-mono px-2.5 py-0.5 rounded bg-slate-100 text-slate-600">sim_dump.vcd</span>
            </div>

            <pre className="p-4 bg-slate-900 text-emerald-400 font-mono text-xs rounded-xl overflow-x-auto leading-relaxed">
{`[1410 ns] UVM_INFO my_driver.sv(42) @ 1410: Driver driving DATA = 0xAF
[1415 ns] SVA_CHECKER_FAIL: assert_full_flag - Assertion failed on clock posedge!
[1415 ns] Expected: full == 1'b1 | Actual: full == 1'b0
[1420 ns] UVM_ERROR my_monitor.sv(88) @ 1420: Data corruption detected at FIFO output!
[1420 ns] AI Remediation: Proposing patch to sync_fifo.sv line 45 (pointer wrap logic).`}
            </pre>
          </div>
        </div>
      </main>
    </div>
  );
}