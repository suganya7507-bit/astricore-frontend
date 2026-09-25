'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import { Layers, Sparkles, CheckCircle2, Code } from 'lucide-react';

export default function TestsPage() {
  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 font-sans">
      <Navbar />

      <main className="max-w-[1400px] mx-auto p-8 space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-200">
          <div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">UVM Testbench & Generator</h1>
            <p className="text-xs text-slate-500 font-mono mt-1">Auto-generated SystemVerilog UVM environment components.</p>
          </div>
          <button className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-xl shadow-md transition flex items-center space-x-2">
            <Sparkles className="w-4 h-4" />
            <span>Generate New UVM Suite</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-md space-y-3">
            <h2 className="text-xs font-extrabold uppercase text-slate-800 pb-2 border-b border-slate-100">UVM Hierarchy</h2>
            <ul className="space-y-2 text-xs font-mono">
              <li className="p-2 rounded bg-amber-50 border border-amber-200 text-amber-900 font-bold">uvm_test_top</li>
              <li className="pl-4 p-2 rounded bg-slate-50 border border-slate-100 text-slate-700">├── fifo_env</li>
              <li className="pl-8 p-2 rounded bg-slate-50 border border-slate-100 text-slate-700">│   ├── fifo_agent</li>
              <li className="pl-12 p-2 rounded bg-slate-50 border border-slate-100 text-slate-700">│   │   ├── fifo_sequencer</li>
              <li className="pl-12 p-2 rounded bg-slate-50 border border-slate-100 text-slate-700">│   │   ├── fifo_driver</li>
              <li className="pl-12 p-2 rounded bg-slate-50 border border-slate-100 text-slate-700">│   │   └── fifo_monitor</li>
              <li className="pl-8 p-2 rounded bg-slate-50 border border-slate-100 text-slate-700">│   └── fifo_scoreboard</li>
            </ul>
          </div>

          <div className="lg:col-span-2 bg-white border border-slate-200 rounded-2xl p-6 shadow-md space-y-4">
            <h2 className="text-xs font-extrabold uppercase text-slate-800 pb-2 border-b border-slate-100">Driver Code (`fifo_driver.sv`)</h2>
            <pre className="p-4 bg-slate-900 text-amber-300 font-mono text-xs rounded-xl overflow-x-auto">
{`class fifo_driver extends uvm_driver #(fifo_transaction);
  \`uvm_component_utils(fifo_driver)

  virtual fifo_if vif;

  task run_phase(uvm_phase phase);
    forever begin
      seq_item_port.get_next_item(req);
      drive_transfer(req);
      seq_item_port.item_done();
    end
  endtask
endclass`}
            </pre>
          </div>
        </div>
      </main>
    </div>
  );
}