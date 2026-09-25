'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import { CheckCircle2, XCircle, Clock, Play } from 'lucide-react';

export default function RegressionPage() {
  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 font-sans">
      <Navbar />

      <main className="max-w-[1400px] mx-auto p-8 space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-200">
          <div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">Automated Regression Suite</h1>
            <p className="text-xs text-slate-500 font-mono mt-1">Parallel seed execution and failure reporting across test suites.</p>
          </div>
          <button className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-xl shadow-md transition flex items-center space-x-2">
            <Play className="w-4 h-4 fill-current" />
            <span>Launch Full Regression</span>
          </button>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-md overflow-hidden">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-mono uppercase">
              <tr>
                <th className="p-3">Test Name</th>
                <th className="p-3">Random Seed</th>
                <th className="p-3">Duration</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <tr>
                <td className="p-3 font-bold text-slate-900">fifo_sanity_test</td>
                <td className="p-3 font-mono text-slate-500">0x3F82A1</td>
                <td className="p-3 font-mono text-slate-500">1.2s</td>
                <td className="p-3"><span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 font-bold border border-emerald-200">PASSED</span></td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-slate-900">fifo_overflow_test</td>
                <td className="p-3 font-mono text-slate-500">0x9110B2</td>
                <td className="p-3 font-mono text-slate-500">3.8s</td>
                <td className="p-3"><span className="px-2.5 py-1 rounded-full bg-rose-50 text-rose-700 font-bold border border-rose-200">FAILED</span></td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-slate-900">fifo_random_stress_test</td>
                <td className="p-3 font-mono text-slate-500">0x1204C9</td>
                <td className="p-3 font-mono text-slate-500">5.4s</td>
                <td className="p-3"><span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 font-bold border border-emerald-200">PASSED</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}