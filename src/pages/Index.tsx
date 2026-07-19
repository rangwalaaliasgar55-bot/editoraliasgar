"use client";

import React, { useState } from 'react';
import { MadeWithDyad } from '@/components/made-with-dyad';
import Sidebar from '@/components/layout/Sidebar';
import Topbar from '@/components/layout/Topbar';

const Index = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex min-h-screen bg-[#0B0C0E] text-white">
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      
      <div className="flex-1 flex flex-col min-w-0">
        <Topbar />
        
        <main className="flex-1 p-8 overflow-y-auto">
          <div className="max-w-7xl mx-auto">
            <header className="mb-8">
              <h1 className="text-3xl font-semibold tracking-tight">Dashboard</h1>
              <p className="text-gray-500 mt-1">Welcome back, here's what's happening today.</p>
            </header>

            {/* Stat Cards Placeholder */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-32 rounded-xl bg-white/[0.04] border border-white/5 backdrop-blur-sm p-6 relative overflow-hidden group">
                  <div className="absolute top-0 left-0 w-1 h-full bg-[#2DD4BF]/20 group-hover:bg-[#2DD4BF]/50 transition-colors" />
                  <p className="text-sm text-gray-500 font-medium">Metric {i}</p>
                  <p className="text-2xl font-mono mt-2">$0.00</p>
                </div>
              ))}
            </div>

            {/* Main Content Area Placeholder */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 h-96 rounded-xl bg-white/[0.04] border border-white/5 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wider">Revenue Trend</h3>
                  <div className="flex gap-2">
                    <div className="h-2 w-2 rounded-full bg-[#2DD4BF]" />
                    <div className="h-2 w-2 rounded-full bg-white/10" />
                  </div>
                </div>
                <div className="w-full h-full flex items-center justify-center text-gray-600 italic">
                  Chart visualization coming in Phase 6
                </div>
              </div>
              
              <div className="h-96 rounded-xl bg-white/[0.04] border border-white/5 p-6">
                <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-4">Recent Activity</h3>
                <div className="space-y-4">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="flex items-center gap-3 text-sm">
                      <div className="h-2 w-2 rounded-full bg-white/20" />
                      <span className="text-gray-400 flex-1">Activity log entry {i}</span>
                      <span className="text-gray-600 text-xs font-mono">2h ago</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>
        <MadeWithDyad />
      </div>
    </div>
  );
};

export default Index;