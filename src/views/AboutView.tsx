'use client';

import React from 'react';
import { useUnitData } from '../context/UnitDataContext';
import { CrestLogo } from '../components/CrestLogo';
import {
  Anchor,
  Shield,
  Compass,
  Award,
  Users,
  CheckCircle2,
  ChevronRight,
  BookOpen,
  Target,
  Eye,
  Flag,
  Calendar,
  Edit3,
} from 'lucide-react';

interface AboutViewProps {
  onOpenCustomizer?: (tab?: 'unit' | 'co' | 'anoCto' | 'cadets' | 'camps' | 'events' | 'achievements' | unknown) => void;
}

export const AboutView: React.FC<AboutViewProps> = ({
  onOpenCustomizer: propOnOpenCustomizer,
}) => {
  const { unitInfo, openCustomizer } = useUnitData();

  // Restore onOpenCustomizer: prop with fallback to UnitDataContext openCustomizer
  const onOpenCustomizer = (
    tabOrEvent?: 'unit' | 'co' | 'anoCto' | 'cadets' | 'camps' | 'events' | 'achievements' | unknown
  ) => {
    const validTabs = ['unit', 'co', 'anoCto', 'cadets', 'camps', 'events', 'achievements'];
    const tab =
      typeof tabOrEvent === 'string' && validTabs.includes(tabOrEvent)
        ? (tabOrEvent as 'unit' | 'co' | 'anoCto' | 'cadets' | 'camps' | 'events' | 'achievements')
        : 'co';
    if (propOnOpenCustomizer) {
      propOnOpenCustomizer(tab);
    } else {
      openCustomizer(tab);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 text-xs font-mono uppercase tracking-widest">
          <Anchor className="w-3.5 h-3.5" />
          <span>About {unitInfo.name}</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-naval font-bold text-white tracking-tight">
          Traditions of Honor, Nautical Rigor & Service
        </h1>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
          Nurturing engineers with naval discipline, maritime operational knowledge, and unwavering
          devotion to the sovereignty of India.
        </p>
      </div>

      {/* Grid: What is NCC vs What is Naval NCC */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Card 1: What is NCC */}
        <div className="p-8 rounded-2xl bg-gradient-to-br from-[#001c38] to-[#001326] border border-amber-500/25 shadow-xl space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-400/30 text-amber-400">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <h2 className="font-serif text-xl font-bold text-white">What is NCC?</h2>
              <p className="text-xs text-amber-300 font-mono">National Cadet Corps (India)</p>
            </div>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            The National Cadet Corps (NCC) was established in 1948 under the National Cadet Corps Act
            XXXI of 1948. It is the premier youth wing of the Indian Armed Forces, dedicated to
            developing character, comradeship, discipline, a secular outlook, the spirit of
            adventure, and ideals of selfless service amongst young citizens.
          </p>
          <div className="pt-2 border-t border-white/10 space-y-2 text-xs text-slate-300">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span><strong>Motto:</strong> {unitInfo.motto}</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span><strong>Scope:</strong> Tri-Service organization (Army, Navy, and Air Wings)</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span><strong>Certificates:</strong> &apos;A&apos;, &apos;B&apos;, and coveted &apos;C&apos; Certificates</span>
            </div>
          </div>
        </div>

        {/* Card 2: What is Naval NCC */}
        <div className="p-8 rounded-2xl bg-gradient-to-br from-[#002244] to-[#00152b] border border-sky-400/30 shadow-xl space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-sky-500/10 border border-sky-400/30 text-sky-400">
              <Anchor className="w-6 h-6" />
            </div>
            <div>
              <h2 className="font-serif text-xl font-bold text-white">What is Naval NCC?</h2>
              <p className="text-xs text-sky-300 font-mono">Maritime & Blue-Water Wing</p>
            </div>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            The Naval Wing of the NCC exposes cadets to naval life, nautical traditions, and maritime
            defence operations. Cadets master blue-water disciplines including boat pulling,
            whaler sailing, seamanship bends and hitches, semaphore flag signalling, navigation
            charts, ship modeling, and coastal radar surveillance.
          </p>
          <div className="pt-2 border-t border-white/10 space-y-2 text-xs text-slate-300">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
              <span><strong>Naval Motto:</strong> {unitInfo.navalMotto}</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
              <span><strong>Sea Exposure:</strong> Warship sorties aboard Eastern Naval Command frigates</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
              <span><strong>Career Edge:</strong> Direct SSB call letters for &apos;C&apos; Certificate holders</span>
            </div>
          </div>
        </div>
      </div>

      {/* History of GCEK Naval NCC */}
      <div className="p-8 sm:p-10 rounded-3xl bg-[#00172e] border border-amber-500/30 space-y-6">
        <div className="flex items-center gap-3">
          <CrestLogo size={52} />
          <div>
            <h2 className="font-serif text-2xl font-bold text-white">
              History of {unitInfo.name}
            </h2>
            <p className="text-xs text-amber-300 font-mono">
              Unit Established {unitInfo.establishedYear} · {unitInfo.location}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 text-xs sm:text-sm text-slate-300 leading-relaxed">
          <div className="space-y-3">
            <h3 className="font-serif text-base font-bold text-amber-300 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              The Genesis ({unitInfo.establishedYear})
            </h3>
            <p>
              Recognizing that technical engineering students possess high aptitude for modern
              naval combat and propulsion systems, {unitInfo.college} sanctioned the establishment
              of the Naval NCC Sub-Unit under the patronage of {unitInfo.affiliatedUnit}.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="font-serif text-base font-bold text-sky-300 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-sky-400" />
              Growth & Expansion
            </h3>
            <p>
              Starting from a modest squad, the sub-unit has expanded into a formidable strength of{' '}
              {unitInfo.cadetStrength} Senior Division (SD) and Senior Wing (SW) naval cadets. The
              unit constructed its dedicated Seamanship Rigging Lab and Ship Modeling workshop on campus.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="font-serif text-base font-bold text-emerald-300 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              National Podium Presence
            </h3>
            <p>
              Over the years, our cadets have consistently represented {unitInfo.directorate} at
              AINSC INS Shivaji, secured Governor&apos;s Trophies for Best Cadet, and marched down
              Kartavya Path during Republic Day Parades in New Delhi.
            </p>
          </div>
        </div>
      </div>

      {/* Mission, Vision & Core Values */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl bg-[#001f3f] border border-amber-500/20 space-y-3">
          <div className="p-2 w-fit rounded-lg bg-amber-400/10 text-amber-400">
            <Target className="w-5 h-5" />
          </div>
          <h3 className="font-serif text-lg font-bold text-white">Our Mission</h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            To provide comprehensive naval training, cultivate Officer-Like Qualities (OLQ), and
            empower technical engineering graduates to become ethical leaders in the armed forces,
            maritime industries, and nation building.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-[#001f3f] border border-sky-500/20 space-y-3">
          <div className="p-2 w-fit rounded-lg bg-sky-400/10 text-sky-400">
            <Eye className="w-5 h-5" />
          </div>
          <h3 className="font-serif text-lg font-bold text-white">Our Vision</h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            To be recognized as India&apos;s premier collegiate Naval NCC sub-unit, renowned for
            unmatched parade precision, seamanship excellence, gold medals in national camps, and a
            prolific pipeline of commissioned defence officers.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-[#001f3f] border border-emerald-500/20 space-y-3">
          <div className="p-2 w-fit rounded-lg bg-emerald-400/10 text-emerald-400">
            <Flag className="w-5 h-5" />
          </div>
          <h3 className="font-serif text-lg font-bold text-white">Core Values</h3>
          <ul className="text-xs text-slate-300 space-y-1.5">
            <li>• <strong>Honor (सम्मान):</strong> Absolute integrity and pride in the uniform</li>
            <li>• <strong>Courage (साहस):</strong> Moral and physical fearlessness</li>
            <li>• <strong>Discipline (अनुशासन):</strong> Punctuality and flawless execution</li>
            <li>• <strong>Comradeship (सहानुभूति):</strong> Brotherhood that leaves no cadet behind</li>
          </ul>
        </div>
      </div>

      {/* ======================================================== */}
      {/* 1. COMMANDING OFFICER (CO LT. M DARSHAN) PROFILE */}
      {/* ======================================================== */}
      <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-[#002247] via-[#001c38] to-[#001224] border-2 border-amber-400/60 shadow-2xl space-y-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-b border-white/10 pb-6">
          <div className="flex items-center gap-5">
            <div className="w-22 h-22 rounded-2xl bg-[#001428] border-2 border-amber-400 overflow-hidden flex items-center justify-center text-amber-400 shrink-0 shadow-xl">
              {unitInfo.co?.photoUrl ? (
                <img
                  src={unitInfo.co.photoUrl}
                  alt={unitInfo.co.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <Shield className="w-12 h-12" />
              )}
            </div>
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-amber-300 font-bold bg-amber-400/20 px-2.5 py-0.5 rounded border border-amber-400/40">
                Rank #1 · Commanding Officer (CO)
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white mt-1">
                {unitInfo.co?.name || 'CO LT. M Darshan'}
              </h2>
              <p className="text-xs text-sky-200 font-medium">
                {unitInfo.co?.designation || 'Commanding Officer'} · {unitInfo.co?.unit || unitInfo.affiliatedUnit}
              </p>
            </div>
          </div>
          <div className="flex flex-col md:items-end gap-2 text-xs font-mono text-amber-300/90">
            <div>{unitInfo.co?.experience || 'Indian Navy Commissioned Officer'}</div>
            <button
              onClick={() => openCustomizer('co')}
              className="mt-2 px-3 py-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-400/40 text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer shadow"
            >
              <Edit3 className="w-3.5 h-3.5 text-amber-400" />
              <span>Edit CO Profile</span>
            </button>
          </div>
        </div>

        <div className="space-y-4 text-xs sm:text-sm text-slate-200 leading-relaxed">
          <blockquote className="border-l-4 border-amber-400 pl-4 py-2 italic text-slate-100 font-serif bg-black/20 rounded-r-xl">
            &ldquo;{unitInfo.co?.message || 'Carry out your training with supreme dedication. May the Lord of the Oceans be auspicious unto us! Sham No Varunah.'}&rdquo;
          </blockquote>
        </div>
      </div>

      {/* ======================================================== */}
      {/* 2. ASSOCIATE NCC OFFICER (ANO / CTO) PROFILE */}
      {/* ======================================================== */}
      <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-[#001e3d] via-[#002b55] to-[#001a33] border-2 border-sky-400/40 shadow-2xl space-y-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-b border-white/10 pb-6">
          <div className="flex items-center gap-5">
            <div className="w-20 h-20 rounded-2xl bg-[#001428] border-2 border-sky-400 overflow-hidden flex items-center justify-center text-sky-300 shrink-0 shadow-lg">
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
              <span className="text-xs font-mono uppercase tracking-widest text-sky-300 font-bold bg-sky-400/20 px-2.5 py-0.5 rounded border border-sky-400/40">
                Rank #2 · Associate NCC Officer / CTO
              </span>
              <h2 className="font-serif text-2xl font-bold text-white mt-1">
                {unitInfo.anoCto?.name || unitInfo.cto?.name || 'Lt. (Dr.) Manoranjan Pradhan'}
              </h2>
              <p className="text-xs text-sky-200 font-medium">
                {unitInfo.anoCto?.designation || unitInfo.cto?.designation} · {unitInfo.anoCto?.department || unitInfo.cto?.department}
              </p>
            </div>
          </div>
          <div className="flex flex-col md:items-end gap-2 text-xs font-mono text-sky-300/80">
            <div>{unitInfo.affiliatedUnit}</div>
            <div>{unitInfo.anoCto?.experience || unitInfo.cto?.experience}</div>
            <button
              onClick={() => openCustomizer('anoCto')}
              className="mt-2 px-3 py-1.5 rounded-lg bg-sky-500/20 hover:bg-sky-500/30 text-sky-300 border border-sky-400/40 text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer shadow"
            >
              <Edit3 className="w-3.5 h-3.5 text-sky-300" />
              <span>Edit ANO/CTO Details</span>
            </button>
          </div>
        </div>

        <div className="space-y-4 text-xs sm:text-sm text-slate-200 leading-relaxed">
          <blockquote className="border-l-4 border-sky-400 pl-4 py-2 italic text-slate-100 font-serif bg-black/20 rounded-r-xl">
            &ldquo;{unitInfo.anoCto?.message || unitInfo.cto?.message}&rdquo;
          </blockquote>
        </div>
      </div>

      {/* ======================================================== */}
      {/* 3. CADET INFORMATION & APPOINTMENTS (CC THEN POC..) */}
      {/* ======================================================== */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="text-xs font-mono uppercase tracking-widest text-amber-400 mb-1">
              Hierarchy of Command
            </div>
            <h2 className="text-2xl font-naval font-bold text-white">
              Cadet Information (Sequence: CC then POC ..)
            </h2>
          </div>
        </div>

        {/* 4 Levels of Military Command Hierarchy */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-xl bg-[#001933] border-2 border-amber-400/50 text-center space-y-2">
            <div className="text-amber-400 font-mono text-xs uppercase font-bold">Level 1: CO</div>
            <div className="font-serif text-base font-bold text-white">{unitInfo.co?.name || 'CO LT. M Darshan'}</div>
            <p className="text-[11px] text-slate-400">Commanding Officer · 4 Odisha Naval Unit NCC</p>
          </div>

          <div className="p-5 rounded-xl bg-[#001933] border border-sky-400/40 text-center space-y-2">
            <div className="text-sky-300 font-mono text-xs uppercase font-bold">Level 2: ANO / CTO</div>
            <div className="font-serif text-base font-bold text-white">{unitInfo.anoCto?.name || unitInfo.cto?.name}</div>
            <p className="text-[11px] text-slate-400">Care Taker Officer · Sub-Unit Administration</p>
          </div>

          <div className="p-5 rounded-xl bg-[#001933] border border-amber-400/40 text-center space-y-2">
            <div className="text-amber-300 font-mono text-xs uppercase font-bold">Level 3: CC (Cadet Captain)</div>
            <div className="font-serif text-base font-bold text-white">
              {(unitInfo.cadetInformation || unitInfo.leadershipCadets || []).find((c) => c.rank.includes('CC'))?.name || 'Cadet Captain'}
            </div>
            <p className="text-[11px] text-slate-400">Senior Cadet In-Charge & Quarter Master</p>
          </div>

          <div className="p-5 rounded-xl bg-[#001933] border border-teal-400/40 text-center space-y-2">
            <div className="text-teal-300 font-mono text-xs uppercase font-bold">Level 4: POC (Petty Officer)</div>
            <div className="font-serif text-base font-bold text-white">
              {(unitInfo.cadetInformation || unitInfo.leadershipCadets || []).find((c) => c.rank.includes('POC'))?.name || 'Petty Officer Cadets'}
            </div>
            <p className="text-[11px] text-slate-400">Parade Marshals & Drill Commanders</p>
          </div>
        </div>

        {/* Detailed Cadet Information Grid with Achievements */}
        <div className="p-6 rounded-2xl bg-black/40 border border-white/10 space-y-5">
          <div className="font-serif text-base font-bold text-amber-300 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <span>Enrolled Cadet Cadre & Individual Achievements:</span>
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs text-slate-400">
                {(unitInfo.cadetInformation || unitInfo.leadershipCadets || []).length} Cadets Listed
              </span>
              <button
                onClick={() => openCustomizer('cadets')}
                className="px-3 py-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-400/40 text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer shadow"
              >
                <Edit3 className="w-3.5 h-3.5 text-amber-400" />
                <span>Edit Cadet Information</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {(unitInfo.cadetInformation && unitInfo.cadetInformation.length > 0
              ? unitInfo.cadetInformation
              : (unitInfo.leadershipCadets || [])
            ).map((cadet, idx) => (
              <div
                key={cadet.id}
                className="p-4 rounded-xl bg-gradient-to-br from-[#001b36] to-[#001020] border border-amber-400/25 hover:border-amber-400/50 transition-all shadow-md space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-[#001428] border border-amber-400/40 flex items-center justify-center overflow-hidden shrink-0 text-amber-300 font-bold text-xs shadow">
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
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-amber-400/20 text-amber-300 border border-amber-400/30">
                          #{idx + 1} {cadet.rank.includes('CC') ? 'CC' : cadet.rank.includes('POC') ? 'POC' : cadet.rank.includes('LC') ? 'LC' : 'NC'}
                        </span>
                      </div>
                      <div className="font-serif font-bold text-white text-sm truncate mt-0.5">
                        {cadet.name}
                      </div>
                      <div className="text-[11px] text-amber-300 font-medium truncate">
                        {cadet.rank}
                      </div>
                    </div>
                  </div>

                  <div className="text-[11px] text-slate-300 space-y-0.5 bg-black/25 p-2 rounded-lg border border-white/5">
                    <div className="font-medium text-sky-200">{cadet.role}</div>
                    <div className="text-slate-400">{cadet.yearBranch}</div>
                    {cadet.regimentalNumber && (
                      <div className="font-mono text-[10px] text-amber-400/90">
                        Regt: {cadet.regimentalNumber}
                      </div>
                    )}
                  </div>

                  {cadet.achievements && (
                    <div className="text-[11px] text-amber-200/90 bg-amber-500/10 p-2.5 rounded-lg border border-amber-400/20 italic leading-relaxed">
                      <span className="font-semibold text-amber-300 not-italic block text-[10px] font-mono uppercase">
                        Achievement:
                      </span>
                      &ldquo;{cadet.achievements}&rdquo;
                    </div>
                  )}
                </div>

                <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-400">
                  <span className="font-mono text-[10px] text-slate-400">4 Odisha Naval Unit</span>
                  <button
                    onClick={() => openCustomizer('cadets')}
                    className="text-[10px] text-amber-400 hover:text-amber-300 font-medium flex items-center gap-1 cursor-pointer transition-colors"
                  >
                    <Edit3 className="w-2.5 h-2.5" />
                    <span>Edit</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
