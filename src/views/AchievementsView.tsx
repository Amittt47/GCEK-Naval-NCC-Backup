'use client';

import React, { useState } from 'react';
import { useUnitData } from '../context/UnitDataContext';
import { AchievementTimeline } from '../components/AchievementTimeline';
import { Achievement } from '../types';
import {
  Trophy,
  Award,
  Calendar,
  Sparkles,
  Shield,
  FileCheck,
  X,
  ExternalLink,
  Image as ImageIcon,
  Edit3,
} from 'lucide-react';

interface AchievementsViewProps {
  onOpenCustomizer?: (tab?: 'unit' | 'co' | 'anoCto' | 'cadets' | 'camps' | 'events' | 'achievements' | unknown) => void;
}

export const AchievementsView: React.FC<AchievementsViewProps> = ({
  onOpenCustomizer: propOnOpenCustomizer,
}) => {
  const { achievements, openCustomizer } = useUnitData();
  const [activeCertificate, setActiveCertificate] = useState<Achievement | null>(null);
  const [activePhotoModal, setActivePhotoModal] = useState<Achievement | null>(null);

  // Restore onOpenCustomizer: prop with fallback to UnitDataContext openCustomizer
  const onOpenCustomizer = (
    tabOrEvent?: 'unit' | 'co' | 'anoCto' | 'cadets' | 'camps' | 'events' | 'achievements' | unknown
  ) => {
    const validTabs = ['unit', 'co', 'anoCto', 'cadets', 'camps', 'events', 'achievements'];
    const tab =
      typeof tabOrEvent === 'string' && validTabs.includes(tabOrEvent)
        ? (tabOrEvent as 'unit' | 'co' | 'anoCto' | 'cadets' | 'camps' | 'events' | 'achievements')
        : 'achievements';
    if (propOnOpenCustomizer) {
      propOnOpenCustomizer(tab);
    } else {
      openCustomizer(tab);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-8">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 text-xs font-mono uppercase tracking-widest">
            <Trophy className="w-3.5 h-3.5" />
            <span>Cadet Honors & Citations</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-naval font-bold text-white tracking-tight">
            Achievements & Roll of Honor
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">
            Interactive milestone timeline of GCEK Naval NCC cadets in national camps, firing trials,
            whaler pulling regattas, and state awards.
          </p>
        </div>
        {onOpenCustomizer && (
          <button
            onClick={() => onOpenCustomizer('achievements')}
            className="shrink-0 px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-400/40 transition-all flex items-center gap-2 cursor-pointer shadow self-start md:self-auto"
          >
            <Edit3 className="w-4 h-4 text-amber-400" />
            <span>Add / Edit Achievements</span>
          </button>
        )}
      </div>

      {/* Interactive Timeline Component with Year Filter */}
      <AchievementTimeline
        achievements={achievements}
        onOpenCertificate={(ach) => setActiveCertificate(ach)}
        onOpenPhoto={(ach) => setActivePhotoModal(ach)}
      />

      {/* Certificate / Citation Modal */}
      {activeCertificate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-2xl bg-gradient-to-b from-[#001b38] to-[#001020] border-2 border-amber-400/60 rounded-3xl p-8 sm:p-10 shadow-2xl text-center space-y-6">
            <button
              onClick={() => setActiveCertificate(null)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-lg bg-white/5 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-20 h-20 rounded-full bg-amber-400/10 border-2 border-amber-400/40 flex items-center justify-center mx-auto text-amber-400 shadow-[0_0_30px_rgba(212,175,55,0.3)]">
              <Award className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <span className="font-mono text-xs text-amber-300 uppercase tracking-widest">
                Official NCC Directorate Citation
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white">
                Certificate of Merit & Performance
              </h2>
              <div className="text-xs font-mono text-slate-400">
                Verification ID: {activeCertificate.certificateId || `CERT-${activeCertificate.year}-GCEK`}
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-black/40 border border-white/10 text-xs sm:text-sm text-slate-200 leading-relaxed text-left space-y-3 font-serif">
              <p>
                This certifies that <strong className="text-white underline">{activeCertificate.cadetName}</strong>,
                bearing appointment/rank of <strong className="text-amber-300">{activeCertificate.rank}</strong> in
                4 Odisha Naval Unit NCC, GCEK Bhawanipatna, represented the unit at{' '}
                <strong className="text-sky-300">{activeCertificate.campTitle}</strong> in {activeCertificate.year}.
              </p>
              <p className="italic text-slate-300 border-l-2 border-amber-400 pl-3">
                &ldquo;{activeCertificate.achievementDescription}&rdquo;
              </p>
            </div>

            {activeCertificate.certificateUrl ? (
              <div className="rounded-xl overflow-hidden border border-amber-400/30 max-h-60 bg-black/50">
                <img
                  src={activeCertificate.certificateUrl}
                  alt="Official Certificate"
                  className="w-full h-full object-contain"
                />
              </div>
            ) : null}

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400 border-t border-white/10 font-mono">
              <span>Location: {activeCertificate.location || 'Headquarters'}</span>
              <span>Medal: {activeCertificate.medal || 'Citation / Badge'}</span>
            </div>
          </div>
        </div>
      )}

      {/* Activity Photo Modal */}
      {activePhotoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-2xl bg-[#001933] border border-amber-400/40 rounded-3xl overflow-hidden shadow-2xl space-y-4">
            <button
              onClick={() => setActivePhotoModal(null)}
              className="absolute top-4 right-4 z-10 p-2 text-white bg-black/60 rounded-full hover:bg-black/80 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-full h-72 sm:h-96 bg-black flex items-center justify-center overflow-hidden">
              {activePhotoModal.photoUrl ? (
                <img
                  src={activePhotoModal.photoUrl}
                  alt={activePhotoModal.cadetName}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="text-slate-400 text-center p-8">
                  <ImageIcon className="w-16 h-16 mx-auto mb-2 opacity-50" />
                  <span>Activity Photo Archive</span>
                </div>
              )}
            </div>

            <div className="p-6 pt-0 space-y-1">
              <h3 className="font-serif text-xl font-bold text-white">
                {activePhotoModal.cadetName} ({activePhotoModal.rank})
              </h3>
              <p className="text-xs text-sky-300 font-mono">
                {activePhotoModal.campTitle} · {activePhotoModal.year}
              </p>
              <p className="text-xs text-slate-300 pt-2 leading-relaxed">
                {activePhotoModal.achievementDescription}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
