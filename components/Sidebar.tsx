'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Code2,
  FileSpreadsheet,
  ShieldAlert,
  TestTube2,
  PlaySquare,
  BarChart3,
  Bug,
  RotateCcw,
  GitMerge,
  Settings,
  Cpu
} from 'lucide-react';

const NAV_ITEMS = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'RTL Explorer', href: '/rtl', icon: Code2 },
  { name: 'Verification Plan', href: '/plan', icon: FileSpreadsheet },
  { name: 'Assertions', href: '/assertions', icon: ShieldAlert },
  { name: 'Tests', href: '/tests', icon: TestTube2 },
  { name: 'Simulation', href: '/simulation', icon: PlaySquare },
  { name: 'Coverage', href: '/coverage', icon: BarChart3 },
  { name: 'Failures', href: '/failures', icon: Bug },
  { name: 'Regression', href: '/regression', icon: RotateCcw },
  { name: 'Traceability', href: '/traceability', icon: GitMerge },
  { name: 'Settings', href: '/settings', icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-slate-50 border-r border-slate-200 flex flex-col h-screen sticky top-0 shrink-0 text-slate-700">
      {/* Brand Header */}
      <div className="p-5 border-b border-slate-200 bg-white">
        <Link href="/" className="flex items-center space-x-3">
          <div className="p-2 bg-amber-50 border border-amber-300 rounded-lg shadow-sm flex items-center justify-center">
            <svg
              width="24"
              height="24"
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect x="6" y="6" width="88" height="88" stroke="#D97706" strokeWidth="8" fill="none" />
              <line x1="50" y1="6" x2="50" y2="34" stroke="#D97706" strokeWidth="8" />
              <line x1="50" y1="66" x2="50" y2="94" stroke="#D97706" strokeWidth="8" />
              <line x1="6" y1="50" x2="34" y2="50" stroke="#D97706" strokeWidth="8" />
              <line x1="66" y1="50" x2="94" y2="50" stroke="#D97706" strokeWidth="8" />
              <circle cx="50" cy="50" r="9" fill="#D97706" />
            </svg>
          </div>

          <div>
            <div className="flex items-center space-x-2">
              <span className="text-base font-black tracking-wider text-slate-900 uppercase font-sans">
                ASTRIXCORE
              </span>
            </div>
            <span className="inline-block text-[9px] font-mono px-1.5 py-0.5 bg-amber-100 border border-amber-300 text-amber-800 rounded font-bold mt-0.5">
              EDA AI v0.1
            </span>
          </div>
        </Link>
        <p className="text-[10px] text-slate-500 font-mono tracking-tight mt-2">
          Enterprise Autonomous Verification Suite
        </p>
      </div>

      {/* Navigation Modules */}
      <div className="flex-1 overflow-y-auto p-4 space-y-1">
        <div className="text-[10px] font-mono uppercase tracking-widest text-slate-400 font-bold px-3 py-2">
          Navigation Modules
        </div>

        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center space-x-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
                isActive
                  ? 'bg-blue-50 text-blue-700 border border-blue-200 font-bold shadow-sm'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-blue-600' : 'text-slate-400'}`} />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </div>

      {/* Backend Engine Connectivity Status */}
      <div className="p-4 border-t border-slate-200 bg-white">
        <div className="flex items-center space-x-2 text-[11px] font-mono text-emerald-600">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-bold">Engine Connected</span>
        </div>
        <div className="text-[10px] font-mono text-slate-500 mt-0.5">
          http://localhost:8000/api
        </div>
      </div>
    </aside>
  );
}