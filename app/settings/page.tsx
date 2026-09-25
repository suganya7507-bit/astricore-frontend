'use client';

import React, { useState } from 'react';
import { 
  Sliders, 
  Database, 
  HardDrive, 
  Cpu, 
  Bot, 
  Shield, 
  Save, 
  CheckCircle2 
} from 'lucide-react';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('application');
  const [saved, setSaved] = useState(false);

  // Form state
  const [appName, setAppName] = useState('AstrixCore Verification AI');
  const [version, setVersion] = useState('0.1.0');
  const [apiPrefix, setApiPrefix] = useState('/api/v1');
  const [debugMode, setDebugMode] = useState(false);

  const [simulatorTool, setSimulatorTool] = useState('Siemens Questasim / ModelSim');
  const [simEndpoint, setSimEndpoint] = useState('http://localhost:8000/api');

  const [llmModel, setLlmModel] = useState('Cloud Hybrid (GPT-4o / Claude 3.5 Sonnet)');
  const [temperature, setTemperature] = useState('0.2');

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const navItems = [
    { id: 'application', label: 'Application', icon: Sliders },
    { id: 'database', label: 'Database', icon: Database },
    { id: 'storage', label: 'Storage', icon: HardDrive },
    { id: 'simulation', label: 'Simulation Engine', icon: Cpu },
    { id: 'ai', label: 'AI / LLM Core', icon: Bot },
    { id: 'security', label: 'Security & Auth', icon: Shield },
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">System & EDA Engine Settings</h1>
          <p className="text-slate-500 text-sm mt-1">
            Environment Variables, AI Model Bindings & Toolchain Configurations
          </p>
        </div>
        <button
          onClick={handleSave}
          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-lg shadow-sm transition"
        >
          <Save className="w-4 h-4" />
          {saved ? 'Saved!' : 'Save Changes'}
        </button>
      </div>

      {/* Main Layout: Sub-Nav Sidebar + Tab Content */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        
        {/* Left Sub-Navigation Menu */}
        <div className="space-y-4">
          <div className="bg-white rounded-xl border border-slate-200 p-2 shadow-sm space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition ${
                    isActive
                      ? 'bg-blue-50 text-blue-700 font-semibold'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-blue-600' : 'text-slate-400'}`} />
                  {item.label}
                </button>
              );
            })}
          </div>

          {/* Engine Health Panel */}
          <div className="bg-slate-900 text-white p-4 rounded-xl shadow-sm space-y-3">
            <h3 className="text-xs uppercase tracking-wider text-slate-400 font-mono font-bold">
              ENGINE HEALTH
            </h3>
            <div className="space-y-2 text-xs font-mono">
              <div className="flex items-center justify-between">
                <span className="text-slate-300">LLM Service:</span>
                <span className="text-emerald-400 font-bold flex items-center gap-1">
                  ● ONLINE
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-300">Verilator Linter:</span>
                <span className="text-emerald-400 font-bold flex items-center gap-1">
                  ● BOUND
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Active Tab Form Section */}
        <div className="md:col-span-3">
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm min-h-[450px]">
            
            {/* TAB 1: APPLICATION */}
            {activeTab === 'application' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-lg font-bold text-slate-900">Application Core Configuration</h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    General system identity, API routing parameters, and execution flags.
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1">
                      Application Name
                    </label>
                    <input
                      type="text"
                      value={appName}
                      onChange={(e) => setAppName(e.target.value)}
                      className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1">
                        Version
                      </label>
                      <input
                        type="text"
                        value={version}
                        onChange={(e) => setVersion(e.target.value)}
                        className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1">
                        API Prefix
                      </label>
                      <input
                        type="text"
                        value={apiPrefix}
                        onChange={(e) => setApiPrefix(e.target.value)}
                        className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-semibold text-slate-800">Debug Mode</h3>
                      <p className="text-xs text-slate-500">Enable verbose AST syntax parsing logs and raw LLM JSON trace output.</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={debugMode}
                      onChange={(e) => setDebugMode(e.target.checked)}
                      className="w-5 h-5 text-blue-600 rounded border-slate-300 focus:ring-blue-500 cursor-pointer"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: DATABASE */}
            {activeTab === 'database' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-lg font-bold text-slate-900">Database Connection</h2>
                  <p className="text-xs text-slate-500 mt-0.5">PostgreSQL / Vector DB configuration for RTL AST index and test logs.</p>
                </div>
                <div className="space-y-4">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="col-span-2">
                      <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1">Host</label>
                      <input type="text" defaultValue="127.0.0.1" className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1">Port</label>
                      <input type="text" defaultValue="5432" className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1">Database Name</label>
                    <input type="text" defaultValue="astrixcore_verification_db" className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg" />
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: STORAGE */}
            {activeTab === 'storage' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-lg font-bold text-slate-900">Artifact & Waveform Storage</h2>
                  <p className="text-xs text-slate-500 mt-0.5">Location for storing compiled VCD/FSDB dumps, coverage reports, and logs.</p>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1">Storage Provider</label>
                    <select className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg">
                      <option>Local Directory (./artifacts)</option>
                      <option>AWS S3 Bucket</option>
                      <option>MinIO S3 Compatible Storage</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1">Retention Period (Days)</label>
                    <input type="number" defaultValue="30" className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg" />
                  </div>
                </div>
              </div>
            )}

            {/* TAB 4: SIMULATION ENGINE */}
            {activeTab === 'simulation' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-lg font-bold text-slate-900">Simulator Engine Integration</h2>
                  <p className="text-xs text-slate-500 mt-0.5">EDA simulator toolchains, binary paths, and execution endpoints.</p>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1">Target Simulator Tool</label>
                    <select
                      value={simulatorTool}
                      onChange={(e) => setSimulatorTool(e.target.value)}
                      className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg bg-white"
                    >
                      <option value="Siemens Questasim / ModelSim">Siemens Questasim / ModelSim</option>
                      <option value="Verilator">Verilator (Open Source C++ Simulator)</option>
                      <option value="Synopsys VCS">Synopsys VCS</option>
                      <option value="Cadence Xcelium">Cadence Xcelium</option>
                      <option value="Icarus Verilog">Icarus Verilog (iverilog)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1">API Engine Endpoint</label>
                    <input
                      type="text"
                      value={simEndpoint}
                      onChange={(e) => setSimEndpoint(e.target.value)}
                      className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* TAB 5: AI / LLM CORE */}
            {activeTab === 'ai' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-lg font-bold text-slate-900">AI & LLM Core Configurations</h2>
                  <p className="text-xs text-slate-500 mt-0.5">Configure generative models for SVA generation, specification mining, and remediation.</p>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1">Primary Model Binding</label>
                    <select
                      value={llmModel}
                      onChange={(e) => setLlmModel(e.target.value)}
                      className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg bg-white"
                    >
                      <option value="Cloud Hybrid (GPT-4o / Claude 3.5 Sonnet)">Cloud Hybrid (GPT-4o / Claude 3.5 Sonnet)</option>
                      <option value="Local DeepSeek R1 / CodeLlama">Local On-Prem (DeepSeek-R1 / CodeLlama)</option>
                      <option value="Custom Verilog-LLM Fine-Tune">Custom Verilog-LLM Fine-Tune v2</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1">Temperature</label>
                    <input
                      type="text"
                      value={temperature}
                      onChange={(e) => setTemperature(e.target.value)}
                      className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* TAB 6: SECURITY & AUTH */}
            {activeTab === 'security' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-lg font-bold text-slate-900">Security & Authentication</h2>
                  <p className="text-xs text-slate-500 mt-0.5">Access tokens, RBAC roles, and API security keys.</p>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1">JWT Secret Token Key</label>
                    <input type="password" value="••••••••••••••••••••••••" readOnly className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg bg-slate-50" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1">Token Expiration (Hours)</label>
                    <input type="number" defaultValue="24" className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg" />
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>

      </div>
    </div>
  );
}