'use client';

import React, { useState } from 'react';
import { DEFENCE_CAREERS } from '../data/mockData';
import { DefenceCareer } from '../types';
import {
  Shield,
  Anchor,
  Compass,
  CheckCircle2,
  Calendar,
  BookOpen,
  ArrowRight,
  ExternalLink,
  Award,
  Zap,
} from 'lucide-react';

export const CareersView: React.FC = () => {
  const [activeCode, setActiveCode] = useState<string>(DEFENCE_CAREERS[0].code);

  const selectedCareer =
    DEFENCE_CAREERS.find((c) => c.code === activeCode) || DEFENCE_CAREERS[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 text-xs font-mono uppercase tracking-widest">
          <Shield className="w-3.5 h-3.5" />
          <span>Pathways to the Commission</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-naval font-bold text-white tracking-tight">
          Defence Career Hub
        </h1>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
          Comprehensive roadmaps for commissioning as an Officer in the Indian Armed Forces and
          maritime services, with special emphasis on NCC &apos;C&apos; Certificate direct entry waivers.
        </p>
      </div>

      {/* Career Option Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-amber-500/20 scrollbar-thin">
        {DEFENCE_CAREERS.map((car) => {
          const isActive = car.code === activeCode;
          return (
            <button
              key={car.id}
              onClick={() => setActiveCode(car.code)}
              className={`px-4 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                isActive
                  ? 'bg-amber-500 text-[#001428] font-bold shadow-lg shadow-amber-500/20 border border-amber-300'
                  : 'bg-[#001830] hover:bg-[#002244] text-slate-300 border border-white/10'
              }`}
            >
              <span>{car.name}</span>
            </button>
          );
        })}
      </div>

      {/* Selected Career Card Details */}
      <div className="p-8 sm:p-10 rounded-3xl bg-[#001f3f] border-2 border-amber-500/30 shadow-2xl space-y-8 animate-in fade-in duration-150">
        {/* Banner */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-white/10 pb-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-amber-300 mb-2">
              <span>{selectedCareer.branch}</span>
              <span aria-hidden="true">·</span>
              <span>Notified {selectedCareer.examFrequency}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-naval font-bold text-white">
              {selectedCareer.name}
            </h2>
          </div>
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-xs font-mono space-y-1">
            <span className="text-slate-400 block">Age Limit:</span>
            <span className="text-amber-400 font-bold text-sm">{selectedCareer.ageLimit}</span>
          </div>
        </div>

        {/* NCC Special Benefit Callout */}
        <div className="p-5 rounded-2xl bg-gradient-to-r from-amber-500/20 via-amber-500/10 to-transparent border border-amber-400/40 flex items-start gap-4">
          <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400 shrink-0 mt-0.5">
            <Zap className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-amber-300 font-bold">
              NCC &apos;C&apos; Certificate Direct Advantage
            </span>
            <p className="text-xs sm:text-sm text-slate-200 mt-1 leading-relaxed">
              {selectedCareer.nccBenefit}
            </p>
          </div>
        </div>

        {/* 2-Column Specs: Eligibility & Selection Steps */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 text-xs sm:text-sm text-slate-300">
          <div className="space-y-4">
            <h3 className="font-serif text-lg font-bold text-white flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              Eligibility Criteria
            </h3>
            <p className="leading-relaxed bg-white/5 p-4 rounded-xl border border-white/10">
              {selectedCareer.eligibility}
            </p>

            <h3 className="font-serif text-lg font-bold text-white flex items-center gap-2 pt-2">
              <BookOpen className="w-5 h-5 text-sky-400" />
              Syllabus & Exam Pattern
            </h3>
            <p className="leading-relaxed bg-white/5 p-4 rounded-xl border border-white/10">
              {selectedCareer.syllabusOverview}
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="font-serif text-lg font-bold text-white flex items-center gap-2">
              <Compass className="w-5 h-5 text-amber-400" />
              Sequential Selection Stages
            </h3>
            <div className="space-y-2.5">
              {selectedCareer.selectionProcess.map((step, sIdx) => (
                <div
                  key={sIdx}
                  className="flex items-start gap-3 p-3.5 rounded-xl bg-white/5 border border-white/10"
                >
                  <span className="w-6 h-6 rounded-full bg-amber-400/20 text-amber-400 font-mono font-bold flex items-center justify-center text-xs shrink-0 mt-0.5">
                    {sIdx + 1}
                  </span>
                  <span className="text-xs text-slate-200">{step}</span>
                </div>
              ))}
            </div>

            <div className="pt-2">
              <span className="font-mono text-xs text-sky-300 uppercase block mb-2 font-bold">
                Recommended Study Portals:
              </span>
              <div className="flex flex-wrap gap-2">
                {selectedCareer.recommendedResources.map((res, rIdx) => (
                  <span
                    key={rIdx}
                    className="px-3 py-1.5 rounded-lg bg-sky-500/10 text-sky-300 text-xs border border-sky-400/20"
                  >
                    {res}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
