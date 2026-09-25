'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import { Target, FileText, CheckCircle2, Plus } from 'lucide-react';

export default function PlanPage() {
  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 font-sans">
      <Navbar />

      <main className="max-w-[1400px] mx-auto p-8 space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-200">
          <div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">Verification Plan & Mining</h1>
            <p className="text-xs text-slate-500 font-mono mt-1">Natural language specification mining and coverage target extraction.</p>
          </div>
          <button className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-xl shadow-md transition flex items-center space-x-2">
            <Plus className="w-4 h-4" />
            <span>Add Constraint Target</span>
          </button>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-md space-y-4">
          <h2 className="text-xs font-extrabold uppercase text-slate-800">Mined Verification Features</h2>
          <div className="divide-y divide-slate-100">
            <div className="py-4 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-900">FIFO Full/Empty Flag Assertions</h3>
                <p className="text-xs text-slate-500 mt-0.5">Ensure full flag asserts on overflow attempt and empty flag asserts on underflow attempt.</p>
              </div>
              <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">Mined & Active</span>
            </div>
            <div className="py-4 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-900">Concurrent Read/Write Pointers</h3>
                <p className="text-xs text-slate-500 mt-0.5">Verify simultaneous read and write operations maintain correct pointer integrity.</p>
              </div>
              <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-amber-50 text-amber-700 border border-amber-200">Pending Harness</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}