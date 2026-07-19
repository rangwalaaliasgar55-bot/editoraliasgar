"use client";

import React from 'eact';
import { Moon, Sun, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Topbar = () => {
  return (
    <header className="h-16 border-b border-white/5 bg-[#0B0C0E]/80 backdrop-blur-md flex items-center justify-between px-8 sticky top-0 z-10">
      <div className="text-sm text-gray-500 font-mono">
        {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'hort', day: 'numeric' })}
      </div>
      
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white hover:bg-white/5">
          <Bell size={20} />
        </Button>
        <div className="h-8 w-[1px] bg-white/10 mx-2" />
        <div className="flex items-center gap-3 pl-2">
          <div className="text-right">
            <p className="text-xs font-medium text-white">Alex Editor</p>
            <p className="text-[10px] text-gray-500 uppercase tracking-wider">Pro Plan</p>
          </div>
          <div className="h-8 w-8 rounded-full bg-[#2DD4BF]/20 border border-[#2DD4BF]/30 flex items-center justify-center text-[#2DD4BF] text-xs font-bold">
            AE
          </div>
        </div>
      </div>
    </header>
  );
};

export default Topbar;