'use client';

import React from 'react';
import { HubTab } from '../types';
import { useUnitData } from '../context/UnitDataContext';
import { ALUMNI_PROFILES } from '../data/mockData';
import { CrestLogo } from '../components/CrestLogo';
import { WarshipSilhouette } from '../components/WarshipSilhouette';
import {
  Anchor,
  Shield,
  Compass,
  Award,
  BookOpen,
  Calendar,
  ChevronRight,
  Bell,
  Star,
  ArrowRight,
  Flame,
  CheckCircle2,
  Users,
  ExternalLink,
  Edit3,
} from 'lucide-react';

interface HomeViewProps {
  onSelectTab?: (tab: HubTab, extraId?: string) => void;
  onOpenCustomizer?: (tab?: 'unit' | 'co' | 'anoCto' | 'cadets' | 'camps' | 'events' | 'achievements' | unknown) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  onSelectTab = () => {},
  onOpenCustomizer: propOnOpenCustomizer,
}) => {
  const { unitInfo, notices, achievements, openCustomizer } = useUnitData();
  const pinnedNotices = notices.filter((n) => n.isPinned);
  const featuredAchievements = achievements.slice(0, 3);
  const featuredAlumni = ALUMNI_PROFILES.slice(0, 2);

  // Restore onOpenCustomizer: prioritize passed prop, fallback to UnitDataContext openCustomizer
  const onOpenCustomizer = (
    tabOrEvent?: 'unit' | 'co' | 'anoCto' | 'cadets' | 'camps' | 'events' | 'achievements' | unknown
  ) => {
    const validTabs = ['unit', 'co', 'anoCto', 'cadets', 'camps', 'events', 'achievements'];
    const tab =
      typeof tabOrEvent === 'string' && validTabs.includes(tabOrEvent)
        ? (tabOrEvent as 'unit' | 'co' | 'anoCto' | 'cadets' | 'camps' | 'events' | 'achievements')
        : 'unit';
    if (propOnOpenCustomizer) {
      propOnOpenCustomizer(tab);
    } else {
      openCustomizer(tab);
    }
  };

  return (
    <div className="space-y-20 pb-16">
      {/* ======================================================== */}
      {/* 1. HERO SECTION */}
      {/* ======================================================== */}
      <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#001022] via-[#001f3f] to-[#001428] border-b border-amber-500/20">
        {/* Dynamic Ocean Ambient Waves Background */}
        <div className="absolute inset-0 pointer-events-none opacity-40">
          <div className="absolute -top-40 -left-40 w-96 h-96 bg-[#0077b6]/30 rounded-full blur-3xl animate-pulse" />
          <div className="absolute top-1/2 -right-40 w-[30rem] h-[30rem] bg-amber-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[#001428] to-transparent" />
        </div>

        {/* Warship Silhouette in Background */}
        <div className="absolute bottom-6 left-0 right-0 z-0">
          <WarshipSilhouette opacity={0.3} />
        </div>

        {/* Hero Content Container */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-8 pb-20">
          {/* Unit Insignia & Crest */}
          <div className="inline-flex justify-center mb-6">
            <div className="p-3.5 rounded-2xl bg-[#001f3f]/80 border-2 border-amber-400/40 shadow-[0_0_35px_rgba(212,175,55,0.25)] backdrop-blur-md">
              <CrestLogo size={74} />
            </div>
          </div>

          {/* Unit Identification Kicker */}
          <div className="flex flex-wrap items-center justify-center gap-2 text-xs font-mono tracking-widest text-amber-300 uppercase mb-3">
            <span className="font-bold text-amber-200">{unitInfo.affiliatedUnit}</span>
            <span aria-hidden="true">·</span>
            <span>{unitInfo.groupHQ}</span>
            <span aria-hidden="true">·</span>
            <span>{unitInfo.directorate}</span>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-naval font-bold text-white tracking-tight leading-none mb-6">
            {unitInfo.name.toUpperCase()}
          </h1>

          {/* Tagline & Motto */}
          <div className="max-w-3xl mx-auto mb-8 space-y-2">
            <p className="text-xl sm:text-2xl font-serif text-amber-200/95 italic font-medium">
              &ldquo;{unitInfo.motto}&rdquo;
            </p>
            <p className="text-sm font-serif text-sky-200 tracking-wider font-semibold">
              {unitInfo.navalMotto}
            </p>
            <p className="text-sm sm:text-base text-slate-300 font-normal leading-relaxed pt-2">
              {unitInfo.college}&apos;s premier military crucible. Forging technical engineering
              minds into decisive, blue-water maritime commanders for the Indian Armed Forces.
            </p>
          </div>

          {/* Call-to-Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3.5 mb-14">
            <button
              onClick={() => onSelectTab('camps')}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-[#001428] font-bold text-sm shadow-lg shadow-amber-500/20 hover:shadow-amber-500/40 transition-all flex items-center gap-2 cursor-pointer"
            >
              <Compass className="w-4 h-4" />
              <span>Explore Camps Hub</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </button>

            <button
              onClick={() => onSelectTab('calendar')}
              className="px-6 py-3 rounded-xl bg-[#002b5b] hover:bg-[#003d80] text-white border border-sky-400/40 font-semibold text-sm transition-all flex items-center gap-2 cursor-pointer shadow-md"
            >
              <Calendar className="w-4 h-4 text-emerald-400" />
              <span>Event Calendar</span>
            </button>

            <button
              onClick={() => onSelectTab('ssb-hub')}
              className="px-6 py-3 rounded-xl bg-[#002b5b] hover:bg-[#003d80] text-white border border-sky-400/40 font-semibold text-sm transition-all flex items-center gap-2 cursor-pointer shadow-md"
            >
              <Shield className="w-4 h-4 text-sky-400" />
              <span>SSB Prep Hub</span>
            </button>

            <button
              onClick={() => onSelectTab('notices')}
              className="px-5 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-slate-200 border border-white/15 font-medium text-sm transition-all flex items-center gap-2 cursor-pointer"
            >
              <Bell className="w-4 h-4 text-amber-400" />
              <span>Orders & Notices</span>
            </button>

            {onOpenCustomizer && (
              <button
                onClick={() => onOpenCustomizer('unit')}
                className="px-5 py-3 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-400/50 font-bold text-sm transition-all flex items-center gap-2 cursor-pointer shadow"
                title="Change Unit Info"
              >
                <Edit3 className="w-4 h-4 text-amber-400" />
                <span>Change Unit Info</span>
              </button>
            )}
          </div>

          {/* Four Quantified Pillars / Stats Counter */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto pt-4 border-t border-white/10">
            <div className="p-3.5 rounded-xl bg-[#001830]/70 border border-white/10 text-left">
              <div className="text-2xl sm:text-3xl font-bold font-mono text-amber-400 tabular-nums">
                {unitInfo.cadetStrength}
              </div>
              <div className="text-xs text-slate-300 font-medium mt-0.5">Active Naval Cadets</div>
              <div className="text-[11px] text-slate-400">SD & SW Strength</div>
            </div>

            <div className="p-3.5 rounded-xl bg-[#001830]/70 border border-white/10 text-left">
              <div className="text-2xl sm:text-3xl font-bold font-mono text-sky-400 tabular-nums">
                100%
              </div>
              <div className="text-xs text-slate-300 font-medium mt-0.5">B & C Cert Result</div>
              <div className="text-[11px] text-slate-400">Direct SSB Eligibility</div>
            </div>

            <div className="p-3.5 rounded-xl bg-[#001830]/70 border border-white/10 text-left">
              <div className="text-2xl sm:text-3xl font-bold font-mono text-emerald-400 tabular-nums">
                {achievements.length}
              </div>
              <div className="text-xs text-slate-300 font-medium mt-0.5">Documented Honors</div>
              <div className="text-[11px] text-slate-400">AINSC & RDC Honors</div>
            </div>

            <div className="p-3.5 rounded-xl bg-[#001830]/70 border border-white/10 text-left">
              <div className="text-2xl sm:text-3xl font-bold font-mono text-amber-300 tabular-nums">
                14
              </div>
              <div className="text-xs text-slate-300 font-medium mt-0.5">Officers Commissioned</div>
              <div className="text-[11px] text-slate-400">Navy, Army & Coast Guard</div>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 2. FLASH ANNOUNCEMENTS / PARADE TICKER */}
      {/* ======================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-[#001a35] via-[#00264d] to-[#001a35] border border-amber-500/30 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-3 shrink-0">
            <span className="flex h-3 w-3 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500" />
            </span>
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-300 bg-amber-500/10 px-2.5 py-1 rounded border border-amber-400/30">
              High Priority Notice
            </span>
          </div>

          <div className="min-w-0 flex-1">
            {pinnedNotices.length > 0 ? (
              <div className="space-y-1">
                <p className="text-sm font-semibold text-white truncate">
                  {pinnedNotices[0].title}
                </p>
                <p className="text-xs text-slate-300 line-clamp-1">
                  {pinnedNotices[0].content}
                </p>
              </div>
            ) : (
              <p className="text-xs text-slate-300">
                Regular Saturday Parade fall-in strictly at 0545 hrs at College Parade Ground.
              </p>
            )}
          </div>

          <button
            onClick={() => onSelectTab('notices')}
            className="shrink-0 text-xs font-semibold text-amber-300 hover:text-white bg-white/10 hover:bg-white/15 px-3.5 py-2 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <span>View All Notices</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 3. COMMAND HIERARCHY (1. CO LT. M DARSHAN, 2. ANO/CTO, 3. CADET INFORMATION) */}
      {/* ======================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="text-xs font-mono uppercase tracking-widest text-amber-400 mb-1">
              Hierarchy of Command
            </div>
            <h2 className="text-2xl sm:text-3xl font-naval font-bold text-white">
              Command Leadership & Cadet Roll
            </h2>
          </div>
          {onOpenCustomizer && (
            <button
              onClick={() => onOpenCustomizer('co')}
              className="px-3.5 py-1.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-400/40 text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer shadow self-start sm:self-auto"
            >
              <Edit3 className="w-3.5 h-3.5 text-amber-400" />
              <span>Edit Leadership & Cadets</span>
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Card 1: 1 NO. CO LT. M DARSHAN */}
          <div className="rounded-2xl bg-gradient-to-br from-[#002247] via-[#001c38] to-[#001224] border-2 border-amber-400/60 p-6 sm:p-8 relative overflow-hidden shadow-2xl flex flex-col justify-between">
            <div className="absolute top-0 right-0 w-36 h-36 bg-amber-400/10 rounded-full blur-2xl pointer-events-none" />
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-[11px] font-mono uppercase tracking-widest text-amber-300 bg-amber-400/20 px-3 py-1 rounded-full font-bold border border-amber-400/50 flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5" />
                  <span>Rank #1 · Commanding Officer (CO)</span>
                </span>
                <span className="text-xs font-mono text-amber-400 font-semibold">Indian Navy</span>
              </div>

              <div className="flex items-center gap-4 mb-4">
                <div className="w-18 h-18 rounded-2xl bg-[#001428] border-2 border-amber-400 overflow-hidden shrink-0 shadow-xl flex items-center justify-center text-amber-400 font-serif font-bold text-xl">
                  {unitInfo.co?.photoUrl ? (
                    <img
                      src={unitInfo.co.photoUrl}
                      alt={unitInfo.co.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <Shield className="w-10 h-10" />
                  )}
                </div>
                <div>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-white">
                    {unitInfo.co?.name || 'CO LT. M Darshan'}
                  </h3>
                  <p className="text-xs text-amber-300 font-medium">
                    {unitInfo.co?.designation || 'Commanding Officer (CO)'}
                  </p>
                  <p className="text-[11px] text-slate-300 font-mono mt-0.5">
                    {unitInfo.co?.unit || unitInfo.affiliatedUnit}
                  </p>
                </div>
              </div>

              <blockquote className="text-xs sm:text-sm text-slate-200 leading-relaxed italic border-l-2 border-amber-400/70 pl-4 py-1.5 mb-6 bg-black/20 rounded-r-xl">
                &ldquo;{unitInfo.co?.message || 'Carry out your training with supreme dedication. May the Lord of the Oceans be auspicious unto us! Sham No Varunah.'}&rdquo;
              </blockquote>
            </div>

            <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
              <span className="truncate pr-2">{unitInfo.co?.experience || 'Commissioned Officer · Indian Navy'}</span>
              {onOpenCustomizer && (
                <button
                  onClick={() => onOpenCustomizer('co')}
                  className="shrink-0 px-2.5 py-1 rounded-md bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-400/40 text-[11px] font-semibold transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <Edit3 className="w-3 h-3 text-amber-400" />
                  <span>Edit CO</span>
                </button>
              )}
            </div>
          </div>

          {/* Card 2: 2 NO. ANO / CTO */}
          <div className="rounded-2xl bg-gradient-to-br from-[#001f3f] via-[#001730] to-[#001020] border border-amber-500/30 p-6 sm:p-8 relative overflow-hidden shadow-2xl flex flex-col justify-between">
            <div className="absolute top-0 right-0 w-32 h-32 bg-sky-500/5 rounded-full blur-2xl pointer-events-none" />
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-[11px] font-mono uppercase tracking-widest text-sky-300 bg-sky-400/10 px-3 py-1 rounded-full font-bold border border-sky-400/30 flex items-center gap-1.5">
                  <Anchor className="w-3.5 h-3.5" />
                  <span>Rank #2 · Associate NCC Officer / CTO</span>
                </span>
                <span className="text-xs font-mono text-sky-400">Sub-Unit Head</span>
              </div>

              <div className="flex items-center gap-4 mb-4">
                <div className="w-18 h-18 rounded-2xl bg-[#001428] border-2 border-sky-400/60 overflow-hidden shrink-0 shadow-xl flex items-center justify-center text-sky-300 font-serif font-bold text-xl">
                  {unitInfo.anoCto?.photoUrl || unitInfo.cto?.photoUrl ? (
                    <img
                      src={unitInfo.anoCto?.photoUrl || unitInfo.cto?.photoUrl}
                      alt={unitInfo.anoCto?.name || unitInfo.cto?.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <Anchor className="w-10 h-10" />
                  )}
                </div>
                <div>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-white">
                    {unitInfo.anoCto?.name || unitInfo.cto?.name || 'Lt. (Dr.) Manoranjan Pradhan'}
                  </h3>
                  <p className="text-xs text-sky-300 font-medium">
                    {unitInfo.anoCto?.designation || unitInfo.cto?.designation}
                  </p>
                  <p className="text-[11px] text-slate-400">
                    {unitInfo.anoCto?.department || unitInfo.cto?.department}
                  </p>
                </div>
              </div>

              <blockquote className="text-xs sm:text-sm text-slate-300 leading-relaxed italic border-l-2 border-sky-400/60 pl-4 py-1.5 mb-6 bg-black/20 rounded-r-xl">
                &ldquo;{unitInfo.anoCto?.message || unitInfo.cto?.message}&rdquo;
              </blockquote>
            </div>

            <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
              <span className="truncate pr-2">{unitInfo.anoCto?.qualifications || unitInfo.cto?.qualifications}</span>
              {onOpenCustomizer && (
                <button
                  onClick={() => onOpenCustomizer('anoCto')}
                  className="shrink-0 px-2.5 py-1 rounded-md bg-sky-500/20 hover:bg-sky-500/30 text-sky-300 border border-sky-400/40 text-[11px] font-semibold transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <Edit3 className="w-3 h-3 text-sky-300" />
                  <span>Edit ANO/CTO</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* 3. CADET INFORMATION (Sequence: CC then POC .. with achievements) */}
        <div className="pt-4 space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
            <div>
              <div className="text-xs font-mono uppercase tracking-widest text-amber-400">
                Cadet Cadre Hierarchy (Sequence: CC then POC ..)
              </div>
              <h3 className="font-serif text-xl font-bold text-white flex items-center gap-2 mt-0.5">
                <Users className="w-5 h-5 text-amber-400" />
                <span>Cadet Information & Achievements</span>
              </h3>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono text-slate-400">
                {(unitInfo.cadetInformation || unitInfo.leadershipCadets || []).length} Cadets Listed
              </span>
              {onOpenCustomizer && (
                <button
                  onClick={() => onOpenCustomizer('cadets')}
                  className="px-3 py-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-400/40 text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer shadow"
                >
                  <Edit3 className="w-3.5 h-3.5 text-amber-400" />
                  <span>Edit Cadet Information</span>
                </button>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {(unitInfo.cadetInformation && unitInfo.cadetInformation.length > 0
              ? unitInfo.cadetInformation
              : (unitInfo.leadershipCadets || [])
            ).map((cadet, idx) => (
              <div
                key={cadet.id}
                className="p-5 rounded-2xl bg-gradient-to-br from-[#001f3f] to-[#001428] border border-amber-500/25 hover:border-amber-400/60 transition-all shadow-xl space-y-4 flex flex-col justify-between group"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-14 h-14 rounded-xl bg-black/50 border border-amber-400/50 overflow-hidden shrink-0 flex items-center justify-center text-amber-300 font-bold text-sm shadow">
                        {cadet.photoUrl ? (
                          <img
                            src={cadet.photoUrl}
                            alt={cadet.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          cadet.name.slice(0, 2).toUpperCase()
                        )}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded bg-amber-400/20 text-amber-300 border border-amber-400/30">
                            #{idx + 1} {cadet.rank.includes('CC') ? 'CC' : cadet.rank.includes('POC') ? 'POC' : cadet.rank.includes('LC') ? 'LC' : 'NC'}
                          </span>
                        </div>
                        <h4 className="font-serif font-bold text-white text-base mt-1 group-hover:text-amber-300 transition-colors">
                          {cadet.name}
                        </h4>
                        <div className="text-xs text-sky-300 font-medium">
                          {cadet.rank}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="text-xs text-slate-300 space-y-0.5 bg-black/20 p-2.5 rounded-xl border border-white/5">
                    <div className="font-medium text-white">{cadet.role}</div>
                    <div className="text-slate-400 text-[11px]">{cadet.yearBranch}</div>
                    {cadet.regimentalNumber && (
                      <div className="font-mono text-[10px] text-amber-400/90 pt-0.5">
                        Regt: {cadet.regimentalNumber}
                      </div>
                    )}
                  </div>

                  {/* Cadet Achievements */}
                  {cadet.achievements && (
                    <div className="space-y-1">
                      <div className="text-[10px] font-mono uppercase tracking-wider text-amber-400 flex items-center gap-1 font-semibold">
                        <Award className="w-3 h-3" />
                        <span>Cadet Achievements:</span>
                      </div>
                      <p className="text-xs text-amber-200/90 italic bg-amber-500/10 p-2.5 rounded-lg border border-amber-400/20 leading-relaxed">
                        &ldquo;{cadet.achievements}&rdquo;
                      </p>
                    </div>
                  )}
                </div>

                <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-400">
                  <span className="font-mono text-slate-400">4 Odisha Naval Unit</span>
                  {onOpenCustomizer && (
                    <button
                      onClick={() => onOpenCustomizer('cadets')}
                      className="text-[10px] text-amber-400 hover:text-amber-300 font-medium flex items-center gap-1 cursor-pointer transition-colors"
                    >
                      <Edit3 className="w-2.5 h-2.5" />
                      <span>Edit</span>
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 4. CAMPS HUB PREVIEW */}
      {/* ======================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="text-xs font-mono uppercase tracking-widest text-amber-400 mb-1">
              Field Crucible
            </div>
            <h2 className="text-2xl sm:text-3xl font-naval font-bold text-white">
              Naval Camps & National Expeditions
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
              From the deep water whaler pulling at AINSC INS Shivaji to marching down Kartavya Path
              at RDC New Delhi.
            </p>
          </div>
          <button
            onClick={() => onSelectTab('camps')}
            className="text-xs font-semibold text-amber-300 hover:text-white bg-amber-500/10 hover:bg-amber-500/20 border border-amber-400/30 px-4 py-2 rounded-lg transition-colors flex items-center gap-1.5 self-start md:self-auto cursor-pointer"
          >
            <span>All 7 Camp Guides</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Camp Card 1: AINSC */}
          <div className="p-6 rounded-2xl bg-[#001b36] border border-amber-500/20 hover:border-amber-400/50 transition-all group flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3 text-xs">
                <span className="font-mono text-amber-400 font-bold">INS SHIVAJI / KARWAR</span>
                <span className="text-slate-400">12 Days</span>
              </div>
              <h3 className="font-serif text-lg font-bold text-white group-hover:text-amber-300 transition-colors mb-2">
                AINSC · All India Nau Sainik Camp
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-4">
                The pinnacle national competition for naval cadets. Firing, whaler boat pulling,
                rigging, semaphore, and powered ship modeling.
              </p>
            </div>
            <button
              onClick={() => onSelectTab('camps')}
              className="text-xs font-semibold text-sky-400 group-hover:text-amber-300 flex items-center gap-1 pt-3 border-t border-white/10"
            >
              <span>Selection guide & syllabus</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Camp Card 2: RDC */}
          <div className="p-6 rounded-2xl bg-[#001b36] border border-amber-500/20 hover:border-amber-400/50 transition-all group flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3 text-xs">
                <span className="font-mono text-sky-400 font-bold">KARTAVYA PATH, NEW DELHI</span>
                <span className="text-slate-400">1 Month</span>
              </div>
              <h3 className="font-serif text-lg font-bold text-white group-hover:text-amber-300 transition-colors mb-2">
                RDC · Republic Day Camp
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-4">
                Marching in the All India Naval Contingent before the President and Prime Minister.
                Rigorous 116 paces/min drill cadences.
              </p>
            </div>
            <button
              onClick={() => onSelectTab('camps')}
              className="text-xs font-semibold text-sky-400 group-hover:text-amber-300 flex items-center gap-1 pt-3 border-t border-white/10"
            >
              <span>Selection process & eligibility</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Camp Card 3: NTAC Sea Sortie */}
          <div className="p-6 rounded-2xl bg-[#001b36] border border-amber-500/20 hover:border-amber-400/50 transition-all group flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3 text-xs">
                <span className="font-mono text-emerald-400 font-bold">EASTERN NAVAL COMMAND</span>
                <span className="text-slate-400">14 Days</span>
              </div>
              <h3 className="font-serif text-lg font-bold text-white group-hover:text-amber-300 transition-colors mb-2">
                NTAC · Warship Technical Attachment
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-4">
                Hands-on engineering attachment aboard Indian Navy destroyers and frigates. Gas
                turbines, radar suites, and 24hr sea sorties.
              </p>
            </div>
            <button
              onClick={() => onSelectTab('camps')}
              className="text-xs font-semibold text-sky-400 group-hover:text-amber-300 flex items-center gap-1 pt-3 border-t border-white/10"
            >
              <span>Engineering attachment details</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 5. ACHIEVEMENTS & WALL OF HONOR */}
      {/* ======================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="text-xs font-mono uppercase tracking-widest text-amber-400 mb-1">
              Roll of Honor
            </div>
            <h2 className="text-2xl sm:text-3xl font-naval font-bold text-white">
              Cadet Achievements Highlights
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
              Honoring GCEK cadets who stood atop national podiums and brought laurels to Odisha.
            </p>
          </div>
          <button
            onClick={() => onSelectTab('achievements')}
            className="text-xs font-semibold text-amber-300 hover:text-white bg-amber-500/10 hover:bg-amber-500/20 border border-amber-400/30 px-4 py-2 rounded-lg transition-colors flex items-center gap-1.5 self-start md:self-auto cursor-pointer"
          >
            <span>Full Achievement Timeline</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredAchievements.map((item) => (
            <div
              key={item.id}
              className="p-6 rounded-2xl bg-gradient-to-br from-[#001d3b] to-[#001429] border border-amber-400/25 shadow-lg flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs mb-3">
                  <span className="font-mono font-bold text-amber-400">{item.year}</span>
                  <span className="text-[11px] px-2 py-0.5 rounded bg-amber-400/10 text-amber-300 font-semibold border border-amber-400/20">
                    {item.category}
                  </span>
                </div>
                <h3 className="font-serif text-base font-bold text-white mb-1">
                  {item.cadetName}
                </h3>
                <p className="text-xs text-sky-300 font-medium mb-2.5">
                  {item.rank} · {item.campTitle}
                </p>
                <p className="text-xs text-slate-300 leading-relaxed mb-4">
                  {item.achievementDescription}
                </p>
              </div>

              <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs">
                <span className="text-slate-400">{item.location}</span>
                <span className="font-mono text-amber-300 font-medium text-[11px]">
                  {item.certificateId}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ======================================================== */}
      {/* 6. SSB HUB & DEFENCE CAREER BANNER */}
      {/* ======================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-r from-[#001f3f] via-[#002e5c] to-[#001f3f] border-2 border-amber-500/40 p-8 sm:p-12 relative overflow-hidden shadow-2xl">
          <div className="relative z-10 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/15 border border-amber-400/30 text-amber-300 text-xs font-mono uppercase tracking-wider mb-4">
              <Shield className="w-3.5 h-3.5" />
              <span>Direct SSB Entry for Naval NCC Cadets</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-naval font-bold text-white mb-4">
              Clear SSB & Step Into Commissioned Glory
            </h2>

            <p className="text-sm sm:text-base text-slate-200 leading-relaxed mb-8">
              Naval NCC &apos;C&apos; Certificate holders with &apos;B&apos; grade or above qualify
              for direct 5-day SSB interviews for the Indian Navy Executive Branch without appearing
              in the UPSC CDS written examination. Use our built-in OIR practice engine, PPDT
              timer, WAT flashcard trainer, and interview question bank.
            </p>

            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => onSelectTab('ssb-hub')}
                className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-[#001428] font-bold text-sm shadow-lg transition-all flex items-center gap-2 cursor-pointer"
              >
                <BookOpen className="w-4 h-4" />
                <span>Launch SSB Learning Portal</span>
              </button>

              <button
                onClick={() => onSelectTab('careers')}
                className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/15 text-white border border-white/20 font-semibold text-sm transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>Explore Navy & Defence Entries</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 7. ALUMNI DEFENCE OFFICERS SPOTLIGHT */}
      {/* ======================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="text-xs font-mono uppercase tracking-widest text-amber-400 mb-1">
              GCEK in Uniform
            </div>
            <h2 className="text-2xl sm:text-3xl font-naval font-bold text-white">
              Alumni Serving the Nation
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
              Meet our former cadets who walked the GCEK parade ground and now command naval
              warships, army signal units, and coastal vessels.
            </p>
          </div>
          <button
            onClick={() => onSelectTab('alumni')}
            className="text-xs font-semibold text-amber-300 hover:text-white bg-amber-500/10 hover:bg-amber-500/20 border border-amber-400/30 px-4 py-2 rounded-lg transition-colors flex items-center gap-1.5 self-start md:self-auto cursor-pointer"
          >
            <span>Alumni Directory & Mentorship</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {featuredAlumni.map((alum) => (
            <div
              key={alum.id}
              className="p-6 sm:p-7 rounded-2xl bg-[#001830] border border-amber-500/25 shadow-xl flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono text-amber-400 bg-amber-400/10 px-2.5 py-0.5 rounded border border-amber-400/30">
                    {alum.serviceBranch}
                  </span>
                  <span className="text-xs text-slate-400">{alum.batch}</span>
                </div>
                <h3 className="font-serif text-lg font-bold text-white mb-1">
                  {alum.name}
                </h3>
                <p className="text-xs text-sky-300 font-semibold mb-3">
                  {alum.currentDesignation} · {alum.organization}
                </p>
                <div className="text-xs text-amber-200/90 font-medium mb-3">
                  Held NCC Rank: {alum.nccRankHeld}
                </div>
                <blockquote className="text-xs sm:text-sm text-slate-300 italic border-l-2 border-amber-400/60 pl-3.5 mb-4">
                  &ldquo;{alum.adviceForCadets}&rdquo;
                </blockquote>
              </div>

              <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs">
                <span className="text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Available for Cadet Mentorship
                </span>
                <button
                  onClick={() => onSelectTab('alumni')}
                  className="text-amber-300 hover:underline font-semibold"
                >
                  Request Guidance →
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
