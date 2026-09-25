'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import { ShieldCheck, Zap, Sliders } from 'lucide-react';

export default function AssertionsPage() {
  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 font-sans">
      <Navbar />

      <main className="max-w-[1400px] mx-auto p-8 space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-200">
          <div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">SystemVerilog Assertion (SVA) Settings</h1>
            <p className="text-xs text-slate-500 font-mono mt-1">Configure auto-generated SVA properties and formal proof rules.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-md space-y-4">
            <div className="flex items-center space-x-2 pb-3 border-b border-slate-100">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
              <h2 className="text-xs font-extrabold uppercase text-slate-800">Auto-Generated Assertions</h2>
            </div>
            <div className="space-y-3 font-mono text-xs">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-amber-700 font-bold">assert_overflow:</span>
                <p className="text-slate-600 mt-1">property (@(posedge clk) full & wr_en |=&gt; $stable(dout));</p>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-amber-700 font-bold">assert_underflow:</span>
                <p className="text-slate-600 mt-1">property (@(posedge clk) empty & rd_en |=&gt; $stable(dout));</p>
              </div>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-md space-y-4">
            <div className="flex items-center space-x-2 pb-3 border-b border-slate-100">
              <Sliders className="w-5 h-5 text-amber-600" />
              <h2 className="text-xs font-extrabold uppercase text-slate-800">Formal Solver Rules</h2>
            </div>
            <div className="space-y-3 text-xs">
              <label className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-200 cursor-pointer">
                <span className="font-semibold text-slate-700">Enable Bound Proof Depth (100 cycles)</span>
                <input type="checkbox" defaultChecked className="accent-amber-500 w-4 h-4" />
              </label>
              <label className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-200 cursor-pointer">
                <span className="font-semibold text-slate-700">Auto-Inject Cover Directives</span>
                <input type="checkbox" defaultChecked className="accent-amber-500 w-4 h-4" />
              </label>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}