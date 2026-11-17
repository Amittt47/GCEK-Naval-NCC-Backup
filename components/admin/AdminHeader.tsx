'use client';

import React from 'react';
import { Menu, Anchor, CheckCircle2 } from 'lucide-react';
import { useUnitData } from '../../src/context/UnitDataContext';
import { useAdmin } from './AdminContext';

interface AdminHeaderProps {
  onToggleSidebar?: () => void;
  title: string;
  subtitle?: string;
}

export function AdminHeader({ onToggleSidebar, title, subtitle }: AdminHeaderProps) {
  const { unitInfo } = useUnitData();
  const { toggleSidebar } = useAdmin();

  const handleToggle = onToggleSidebar || toggleSidebar;

  return (
    <header className="sticky top-0 z-30 w-full bg-[#001428]/95 border-b border-amber-500/20 backdrop-blur-md px-4 sm:px-6 py-4 mb-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={handleToggle}
            className="lg:hidden p-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/10"
            aria-label="Open Sidebar"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div>
            <h1 className="font-serif text-lg sm:text-xl font-bold text-white tracking-wide">
              {title}
            </h1>
            {subtitle && (
              <p className="text-xs text-slate-400 hidden sm:block">{subtitle}</p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#001f3f] border border-amber-500/30 text-amber-300 text-xs font-mono">
            <Anchor className="w-3.5 h-3.5 text-amber-400" />
            <span>4(O) Naval Unit NCC</span>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>Command Active</span>
          </div>
        </div>
      </div>
    </header>
  );
}
