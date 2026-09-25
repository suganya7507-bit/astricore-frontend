import React from 'react';
import './globals.css';
import Sidebar from '../components/Sidebar';

export const metadata = {
  title: 'AstrixCore - EDA AI Platform',
  description: 'Autonomous RTL Verification & Coverage Closure Suite',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-slate-100 text-slate-800 antialiased font-sans min-h-screen">
        <div className="flex min-h-screen">
          {/* Main vertical sidebar */}
          <Sidebar />

          {/* Page content */}
          <main className="flex-1 overflow-y-auto">{children}</main>
        </div>
      </body>
    </html>
  );
}