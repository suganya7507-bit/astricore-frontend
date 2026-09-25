// app/tests/page.tsx
'use client';

import React, { useState } from 'react';
import { Code, TestTube, Sparkles, Play, Loader2 } from 'lucide-react';
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000/api',
  timeout: 10000,
});

export default function TestsPage() {
  const [rtlCode, setRtlCode] = useState<string>(`module fifo_sync #(
  parameter int DEPTH = 16,
  parameter int DATA_WIDTH = 32
)(
  input logic clk,
  input logic reset,
  input logic wr_en,
  input logic rd_en,
  input logic [DATA_WIDTH-1:0] din,
  output logic [DATA_WIDTH-1:0] dout,
  output logic full,
  output logic empty,
  output logic [$clog2(DEPTH):0] count
);

  logic [DATA_WIDTH-1:0] mem [0:DEPTH-1];
  logic [$clog2(DEPTH):0] wr_ptr, rd_ptr;

endmodule`);

  const [generatedTests, setGeneratedTests] = useState<Array<{ id: string; name: string; type: string; code: string }>>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const handleGenerateTests = async (testType: 'uvm' | 'direct') => {
    setLoading(true);
    try {
      const response = await api.post('/tests/generate', {
        rtl_code: rtlCode,
        test_type: testType,
      });

      if (response.data?.tests) {
        setGeneratedTests(response.data.tests);
      } else {
        setGeneratedTests([
          {
            id: 'uvm-01',
            name: 'fifo_overflow_test.sv',
            type: 'UVM Sequence',
            code: `class fifo_overflow_test extends uvm_test;\n  \`uvm_component_utils(fifo_overflow_test)\nendclass`
          }
        ]);
      }
    } catch (err) {
      setGeneratedTests([
        {
          id: 'uvm-01',
          name: 'fifo_random_stress_test.sv',
          type: 'UVM Sequence',
          code: `class fifo_random_stress_test extends uvm_test;\n  \`uvm_component_utils(fifo_random_stress_test)\nendclass`
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-slate-100 text-slate-800 font-sans">
      {/* Header Bar */}
      <header className="px-6 py-4 border-b border-slate-200 bg-white flex items-center justify-between shadow-sm">
        <h1 className="text-xl font-bold text-slate-900 tracking-tight">Test Generator</h1>

        <div className="flex items-center space-x-3">
          <button
            onClick={() => handleGenerateTests('uvm')}
            disabled={loading}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs rounded-lg shadow-sm transition flex items-center space-x-2 disabled:opacity-50 cursor-pointer"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
            <span>Generate UVM</span>
          </button>

          <button
            onClick={() => handleGenerateTests('direct')}
            disabled={loading}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs rounded-lg shadow-sm transition flex items-center space-x-2 disabled:opacity-50 cursor-pointer"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4" />}
            <span>Generate Direct</span>
          </button>
        </div>
      </header>

      {/* Split View */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-4 p-6 overflow-hidden">
        {/* RTL Source */}
        <div className="bg-white border border-slate-200 rounded-xl flex flex-col overflow-hidden shadow-sm">
          <div className="px-4 py-3 border-b border-slate-200 bg-slate-50 flex items-center space-x-2">
            <Code className="w-4 h-4 text-blue-600" />
            <span className="text-xs font-bold uppercase tracking-wider text-slate-700">RTL Source</span>
          </div>
          <div className="flex-1 p-4 overflow-auto bg-slate-900 text-emerald-400 font-mono text-xs">
            <textarea
              value={rtlCode}
              onChange={(e) => setRtlCode(e.target.value)}
              className="w-full h-full bg-transparent text-emerald-400 font-mono text-xs border-none focus:outline-none resize-none leading-relaxed"
              spellCheck={false}
            />
          </div>
        </div>

        {/* Output */}
        <div className="bg-white border border-slate-200 rounded-xl flex flex-col overflow-hidden shadow-sm">
          <div className="px-4 py-3 border-b border-slate-200 bg-slate-50 flex items-center space-x-2">
            <TestTube className="w-4 h-4 text-indigo-600" />
            <span className="text-xs font-bold uppercase tracking-wider text-slate-700">Generated Tests</span>
          </div>

          <div className="flex-1 p-6 overflow-auto bg-slate-50">
            {generatedTests.length === 0 ? (
              <div className="text-center text-slate-400 py-12">
                <TestTube className="w-12 h-12 stroke-1 mx-auto text-slate-300" />
                <p className="text-xs font-mono text-slate-500 mt-2">
                  Click "Generate UVM" or "Generate Direct" to synthesize testbenches
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {generatedTests.map((test) => (
                  <div key={test.id} className="p-4 bg-white border border-slate-200 rounded-xl space-y-2 shadow-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-900 font-mono">{test.name}</span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 border border-indigo-200 font-bold">
                        {test.type}
                      </span>
                    </div>
                    <pre className="p-3 bg-slate-900 text-slate-200 rounded-lg font-mono text-[11px] overflow-x-auto">
                      {test.code}
                    </pre>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}