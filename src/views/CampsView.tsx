'use client';

import React, { useState } from 'react';
import { CampDetail } from '../types';
import { useUnitData } from '../context/UnitDataContext';
import {
  Compass,
  MapPin,
  Clock,
  Shield,
  CheckCircle2,
  HelpCircle,
  ChevronDown,
  ChevronRight,
  Anchor,
  Sparkles,
  Award,
  Edit3,
  Plus,
  Trash2,
  X,
  Save,
} from 'lucide-react';

interface CampsViewProps {
  initialCampSlug?: string;
  onOpenCustomizer?: (tab?: 'unit' | 'co' | 'anoCto' | 'cadets' | 'camps' | 'events' | 'achievements' | unknown) => void;
}

export const CampsView: React.FC<CampsViewProps> = ({
  initialCampSlug,
  onOpenCustomizer: propOnOpenCustomizer,
}) => {
  const { camps, openCustomizer } = useUnitData();
  const [activeCampSlug, setActiveCampSlug] = useState<string>(
    initialCampSlug || (camps[0]?.slug ?? 'ainsc')
  );
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  // Restore onOpenCustomizer: prop with fallback to UnitDataContext openCustomizer
  const onOpenCustomizer = (
    tabOrEvent?: 'unit' | 'co' | 'anoCto' | 'cadets' | 'camps' | 'events' | 'achievements' | unknown
  ) => {
    const validTabs = ['unit', 'co', 'anoCto', 'cadets', 'camps', 'events', 'achievements'];
    const tab =
      typeof tabOrEvent === 'string' && validTabs.includes(tabOrEvent)
        ? (tabOrEvent as 'unit' | 'co' | 'anoCto' | 'cadets' | 'camps' | 'events' | 'achievements')
        : 'camps';
    if (propOnOpenCustomizer) {
      propOnOpenCustomizer(tab);
    } else {
      openCustomizer(tab);
    }
  };

  const currentCamp =
    camps.find((c) => c.slug === activeCampSlug || c.id === activeCampSlug) || camps[0];

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 text-xs font-mono uppercase tracking-widest">
          <Compass className="w-3.5 h-3.5" />
          <span>Naval Training Expeditions</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-naval font-bold text-white tracking-tight">
          Camps & Maritime Hub
        </h1>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
          Comprehensive operational guides, selection procedures, and training syllabi for all
          major national, state, and specialized naval training camps.
        </p>
      </div>

      {/* Camp Navigation Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-amber-500/20 scrollbar-thin">
        {camps.map((camp) => {
          const isActive = camp.slug === activeCampSlug || camp.id === activeCampSlug;
          return (
            <button
              key={camp.id || camp.slug}
              onClick={() => {
                setActiveCampSlug(camp.slug || camp.id);
                setOpenFaqIndex(null);
              }}
              className={`px-4 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-2 cursor-pointer ${
                isActive
                  ? 'bg-amber-500 text-[#001428] font-bold shadow-lg shadow-amber-500/20 border border-amber-300'
                  : 'bg-[#001b36] hover:bg-[#00254a] text-slate-300 border border-white/10'
              }`}
            >
              <span>{camp.shortName}</span>
            </button>
          );
        })}
        {onOpenCustomizer && (
          <button
            onClick={() => onOpenCustomizer('camps')}
            className="px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-400/40 transition-all flex items-center gap-1.5 cursor-pointer ml-auto"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>Add / Edit Camps</span>
          </button>
        )}
      </div>

      {/* Main Camp Detail Page */}
      {currentCamp && (
        <div className="space-y-12 animate-in fade-in duration-200">
          {/* Camp Hero Banner */}
          <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-[#001f3f] via-[#002d5a] to-[#00172e] border-2 border-amber-500/30 shadow-2xl relative overflow-hidden">
            <div className="relative z-10 max-w-4xl space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex flex-wrap items-center gap-3 text-xs">
                  <span className="px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 font-mono font-bold border border-amber-400/40">
                    {currentCamp.badge}
                  </span>
                  <span className="flex items-center gap-1.5 text-slate-300">
                    <MapPin className="w-3.5 h-3.5 text-amber-400" />
                    {currentCamp.location}
                  </span>
                  <span className="flex items-center gap-1.5 text-slate-300">
                    <Clock className="w-3.5 h-3.5 text-sky-400" />
                    {currentCamp.duration}
                  </span>
                </div>
                {onOpenCustomizer && (
                  <button
                    onClick={() => onOpenCustomizer('camps')}
                    className="px-3 py-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-400/40 text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <Edit3 className="w-3 h-3 text-amber-400" />
                    <span>Edit This Camp</span>
                  </button>
                )}
              </div>

              <h2 className="text-3xl sm:text-4xl font-naval font-bold text-white tracking-tight">
                {currentCamp.fullName}
              </h2>

              <p className="text-sm sm:text-base text-amber-200/90 font-serif italic">
                &ldquo;{currentCamp.tagline}&rdquo;
              </p>

              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed pt-2">
                {currentCamp.overview}
              </p>
            </div>
          </div>

        {/* Section: Selection Procedure (Phases) */}
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
            <h3 className="font-serif text-2xl font-bold text-white">
              Selection Procedure & Phases
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {currentCamp.selectionProcedure.map((phase, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-[#001830] border border-amber-500/20 hover:border-amber-400/40 transition-colors shadow-lg flex flex-col justify-between"
              >
                <div>
                  <div className="w-8 h-8 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-400 font-mono font-bold text-sm flex items-center justify-center mb-3">
                    0{idx + 1}
                  </div>
                  <h4 className="font-serif text-sm font-bold text-white mb-2">
                    {phase.phase}
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed mb-4">
                    {phase.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-white/10 space-y-1">
                  <div className="text-[10px] font-mono uppercase tracking-wider text-sky-300">
                    Key Benchmarks:
                  </div>
                  {phase.keyTests.map((test, tIdx) => (
                    <div key={tIdx} className="text-xs text-slate-300 flex items-center gap-1.5">
                      <span className="w-1 h-1 rounded-full bg-amber-400" />
                      <span>{test}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section: Eligibility & Medical Criteria */}
        <div className="p-8 rounded-3xl bg-[#00162c] border border-sky-400/30 space-y-6">
          <div className="flex items-center gap-2">
            <Shield className="w-6 h-6 text-sky-400" />
            <h3 className="font-serif text-2xl font-bold text-white">
              Eligibility & Medical Standards
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-xs sm:text-sm text-slate-300">
            <div className="space-y-4">
              <div>
                <span className="font-semibold text-white block mb-1">Academic & Attendance</span>
                <p className="text-slate-300">{currentCamp.eligibility.academic}</p>
              </div>

              <div>
                <span className="font-semibold text-white block mb-1">Prior NCC Standing</span>
                <p className="text-slate-300">{currentCamp.eligibility.nccRequirement}</p>
              </div>

              <div>
                <span className="font-semibold text-white block mb-1">Swimming Proficiency</span>
                <p className="text-slate-300 text-amber-300 font-medium">
                  {currentCamp.eligibility.swimming}
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <span className="font-semibold text-white block">Physical Stamina Requirements:</span>
              <div className="space-y-2">
                {currentCamp.eligibility.physical.map((pReq, pIdx) => (
                  <div
                    key={pIdx}
                    className="flex items-center gap-2 p-2.5 rounded-xl bg-white/5 border border-white/10 text-xs"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{pReq}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Section: Preparation Guide */}
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
            <h3 className="font-serif text-2xl font-bold text-white">
              Tactical Preparation Guide
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentCamp.preparationGuide.map((guide, gIdx) => (
              <div
                key={gIdx}
                className="p-6 rounded-2xl bg-[#001a35] border border-amber-500/20 shadow-lg space-y-3"
              >
                <h4 className="font-serif text-base font-bold text-amber-300 flex items-center gap-2">
                  <Anchor className="w-4 h-4 text-amber-400" />
                  {guide.title}
                </h4>
                <ul className="space-y-2 text-xs text-slate-300">
                  {guide.points.map((pt, pIdx) => (
                    <li key={pIdx} className="flex items-start gap-2">
                      <span className="text-amber-400 shrink-0 mt-0.5">•</span>
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Section: Previous Year Experiences */}
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-400" />
            <h3 className="font-serif text-2xl font-bold text-white">
              Cadet Experiences & Ground Realities
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {currentCamp.experiences.map((exp, eIdx) => (
              <div
                key={eIdx}
                className="p-6 sm:p-7 rounded-2xl bg-gradient-to-br from-[#001e3d] to-[#001328] border border-amber-400/30 shadow-xl space-y-4"
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="font-serif font-bold text-white text-base">
                    {exp.cadetName} ({exp.rank})
                  </span>
                  <span className="font-mono text-sky-300">{exp.batch}</span>
                </div>
                <blockquote className="text-xs sm:text-sm text-slate-200 italic leading-relaxed border-l-2 border-amber-400 pl-3.5">
                  &ldquo;{exp.quote}&rdquo;
                </blockquote>
                <div className="text-xs text-amber-300/90 pt-2 border-t border-white/10 font-medium">
                  Key Achievement: {exp.highlights}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section: FAQs Accordion */}
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-sky-400" />
            <h3 className="font-serif text-2xl font-bold text-white">
              Frequently Asked Questions
            </h3>
          </div>

          <div className="space-y-3">
            {currentCamp.faqs.map((faq, fIdx) => {
              const isOpen = openFaqIndex === fIdx;
              return (
                <div
                  key={fIdx}
                  className="rounded-xl bg-[#001830] border border-white/10 overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => toggleFaq(fIdx)}
                    className="w-full flex items-center justify-between p-4 sm:p-5 text-left text-xs sm:text-sm font-semibold text-white hover:text-amber-300 cursor-pointer"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-slate-400 transition-transform ${
                        isOpen ? 'rotate-180 text-amber-400' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-4 sm:px-5 pb-5 pt-1 text-xs text-slate-300 leading-relaxed border-t border-white/5">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
      )}
    </div>
  );
};
