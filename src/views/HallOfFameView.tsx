'use client';

import React, { useState } from 'react';
import { HALL_OF_FAME_ENTRIES } from '../data/mockData';
import { Trophy, Award, Star, Shield, Medal, CheckCircle2 } from 'lucide-react';

export const HallOfFameView: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<string>('all');

  const categories = [
    'all',
    'National Representative',
    'Best Cadet',
    'Outstanding Alumni',
    'Camp Senior',
  ];

  const filteredEntries = HALL_OF_FAME_ENTRIES.filter((e) => {
    return selectedFilter === 'all' || e.category === selectedFilter;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 text-xs font-mono uppercase tracking-widest">
          <Trophy className="w-3.5 h-3.5" />
          <span>Supreme Honors</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-naval font-bold text-white tracking-tight">
          Hall of Fame
        </h1>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
          The permanent roll of distinguished cadets and alumni whose dedication, courage, and
          excellence defined the legacy of Government College of Engineering Kalahandi Naval NCC.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center justify-center gap-2 overflow-x-auto pb-2 border-b border-amber-500/20">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setSelectedFilter(c)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
              selectedFilter === c
                ? 'bg-amber-500 text-[#001428] font-bold shadow-lg shadow-amber-500/20 border border-amber-300'
                : 'bg-[#001830] hover:bg-[#002244] text-slate-300 border border-white/10'
            }`}
          >
            {c === 'all' ? 'All Honorees' : c}
          </button>
        ))}
      </div>

      {/* Hall of Fame Cards with Gold Military Crest Framing */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredEntries.map((entry, idx) => (
          <div
            key={idx}
            className="p-8 rounded-3xl bg-gradient-to-b from-[#001f3f] via-[#00172e] to-[#001020] border-2 border-amber-400/40 hover:border-amber-300 shadow-2xl relative overflow-hidden flex flex-col justify-between group transition-all"
          >
            {/* Gold Corner Accents */}
            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-amber-400" />
            <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-amber-400" />
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-amber-400" />
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-amber-400" />

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono font-bold text-amber-300 bg-amber-400/10 px-2.5 py-1 rounded border border-amber-400/30 uppercase">
                  {entry.category}
                </span>
                <span className="text-xs font-mono text-slate-400">{entry.batch}</span>
              </div>

              <div>
                <h3 className="font-serif text-xl font-bold text-white group-hover:text-amber-300 transition-colors">
                  {entry.name}
                </h3>
                <div className="text-xs text-sky-300 font-semibold mt-0.5">
                  {entry.title}
                </div>
              </div>

              <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-xs font-mono text-amber-200">
                ⭐ {entry.achievement}
              </div>

              <blockquote className="text-xs text-slate-300 leading-relaxed italic border-l-2 border-amber-400 pl-3">
                &ldquo;{entry.citation}&rdquo;
              </blockquote>
            </div>

            <div className="pt-6 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-400 mt-6">
              <span>GCEK Roll of Honor</span>
              <span className="font-mono text-amber-400">Distinction Awarded</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
