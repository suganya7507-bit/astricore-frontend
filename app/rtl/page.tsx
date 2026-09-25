'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import { FileCode, Cpu, CheckCircle2, Upload, Code2 } from 'lucide-react';

export default function RtlPage() {
  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 font-sans">
      <Navbar />

      <main className="max-w-[1400px] mx-auto p-8 space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-200">
          <div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">RTL Design & AST Parsing</h1>
            <p className="text-xs text-slate-500 font-mono mt-1">Upload SystemVerilog HDL files for AST extraction and lint analysis.</p>
          </div>
          <button className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-xl shadow-md transition flex items-center space-x-2">
            <Upload className="w-4 h-4" />
            <span>Upload RTL File</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white border border-slate-200 rounded-2xl p-6 shadow-md">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
              <div className="flex items-center space-x-2">
                <Code2 className="w-4 h-4 text-amber-600" />
                <h2 className="text-xs font-extrabold uppercase text-slate-800">SystemVerilog Source Code</h2>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-600">fifo.sv</span>
            </div>
            <pre className="p-4 bg-slate-900 text-amber-300 font-mono text-xs rounded-xl overflow-x-auto">
{`module sync_fifo #(
  parameter DATA_WIDTH = 8,
  parameter DEPTH = 16
)(
  input wire clk,
  input wire rst_n,
  input wire wr_en,
  input wire rd_en,
  input wire [DATA_WIDTH-1:0] din,
  output reg [DATA_WIDTH-1:0] dout,
  output wire full,
  output wire empty
);
  // SystemVerilog AST extracted successfully...
endmodule`}
            </pre>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-md space-y-4">
            <h2 className="text-xs font-extrabold uppercase text-slate-800 pb-3 border-b border-slate-100">AST Analysis Summary</h2>
            <div className="space-y-3 text-xs">
              <div className="flex justify-between py-2 border-b border-slate-100">
                <span className="text-slate-500">Module Name</span>
                <span className="font-mono font-bold text-slate-900">sync_fifo</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-100">
                <span className="text-slate-500">Parameters</span>
                <span className="font-mono font-bold text-amber-700">2 Parameters</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-100">
                <span className="text-slate-500">Input Ports</span>
                <span className="font-mono font-bold text-slate-900">5 Ports</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-slate-500">Output Ports</span>
                <span className="font-mono font-bold text-slate-900">3 Ports</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}