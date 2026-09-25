'use client';

import React from 'react';
import Link from 'next/link';

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 px-6 py-3 flex items-center justify-between shadow-sm">
      {/* Registered ASTRIXCORE Gold Logo & Title */}
      <Link href="/" className="flex items-center space-x-3 group">
        <div className="p-2 bg-slate-900 rounded-lg shadow-md flex items-center justify-center transition group-hover:bg-slate-800">
          <svg
            width="28"
            height="28"
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="shrink-0"
          >
            <rect x="6" y="6" width="88" height="88" stroke="#D1A751" strokeWidth="8" fill="none" />
            <line x1="50" y1="6" x2="50" y2="34" stroke="#D1A751" strokeWidth="8" />
            <line x1="50" y1="66" x2="50" y2="94" stroke="#D1A751" strokeWidth="8" />
            <line x1="6" y1="50" x2="34" y2="50" stroke="#D1A751" strokeWidth="8" />
            <line x1="66" y1="50" x2="94" y2="50" stroke="#D1A751" strokeWidth="8" />
            <circle cx="50" cy="50" r="9" fill="#D1A751" />
          </svg>
        </div>

        <div>
          <div className="flex items-center space-x-2">
            <span className="text-lg font-extrabold tracking-[0.2em] text-slate-900 font-sans uppercase">
              ASTRIXCORE
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-50 border border-amber-200 text-amber-700 font-semibold">
              v2.4
            </span>
          </div>
          <p className="text-[10px] text-slate-500 font-mono tracking-wide -mt-0.5">
            Verification Platform
          </p>
        </div>
      </Link>

      {/* Navigation Sub-Page Links */}
      <nav className="hidden lg:flex items-center space-x-5 text-xs font-bold uppercase tracking-wider text-slate-600">
        <Link href="/" className="hover:text-amber-600 transition">Dashboard</Link>
        <Link href="/rtl" className="hover:text-amber-600 transition">RTL</Link>
        <Link href="/plan" className="hover:text-amber-600 transition">Plan</Link>
        <Link href="/assertions" className="hover:text-amber-600 transition">Assertions</Link>
        <Link href="/tests" className="hover:text-amber-600 transition">Tests</Link>
        <Link href="/simulation" className="hover:text-amber-600 transition">Simulation</Link>
        <Link href="/failures" className="hover:text-amber-600 transition">Failures</Link>
        <Link href="/regression" className="hover:text-amber-600 transition">Regression</Link>
        <Link href="/traceability" className="hover:text-amber-600 transition">Traceability</Link>
        <Link href="/settings" className="hover:text-amber-600 transition">Settings</Link>
      </nav>
    </header>
  );
}