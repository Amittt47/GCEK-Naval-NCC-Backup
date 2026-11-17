'use client';

import React, { useState, useMemo } from 'react';
import { Achievement } from '../types';
import {
  Calendar,
  Award,
  MapPin,
  FileCheck,
  Image as ImageIcon,
  ExternalLink,
  ChevronRight,
  Sparkles,
  Trophy,
  Filter,
  CheckCircle2,
  X,
  Search,
  LayoutGrid,
  ListOrdered,
  Edit3,
  Trash2,
} from 'lucide-react';

interface AchievementTimelineProps {
  achievements: Achievement[];
  onOpenCertificate: (ach: Achievement) => void;
  onOpenPhoto?: (ach: Achievement) => void;
  onEditAchievement?: (ach: Achievement) => void;
  onDeleteAchievement?: (id: string) => void;
}

export const AchievementTimeline: React.FC<AchievementTimelineProps> = ({
  achievements,
  onOpenCertificate,
  onOpenPhoto,
  onEditAchievement,
  onDeleteAchievement,
}) => {
  const [selectedYear, setSelectedYear] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewStyle, setViewStyle] = useState<'timeline' | 'grid'>('timeline');

  // Extract all unique years dynamically
  const uniqueYears = useMemo(() => {
    const set = new Set<number>();
    achievements.forEach((a) => set.add(a.year));
    return Array.from(set).sort((a, b) => b - a);
  }, [achievements]);

  const categories = [
    { id: 'all', label: 'All Honors' },
    { id: 'AINSC', label: 'AINSC' },
    { id: 'RDC', label: 'RDC' },
    { id: 'NTAC', label: 'NTAC' },
    { id: 'Best Cadet', label: 'Best Cadet' },
    { id: 'Camp Senior', label: 'Camp Senior' },
    { id: 'National', label: 'National' },
  ];

  const filtered = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return achievements.filter((item) => {
      const matchYear = selectedYear === 'all' || item.year.toString() === selectedYear;
      const matchCat = selectedCategory === 'all' || item.category === selectedCategory;
      const matchQuery =
        !q ||
        item.cadetName.toLowerCase().includes(q) ||
        item.campTitle.toLowerCase().includes(q) ||
        item.location.toLowerCase().includes(q) ||
        (item.medal && item.medal.toLowerCase().includes(q)) ||
        item.achievementDescription.toLowerCase().includes(q);
      return matchYear && matchCat && matchQuery;
    });
  }, [achievements, selectedYear, selectedCategory, searchQuery]);

  return (
    <div className="space-y-8">
      {/* Interactive Year & Category Filter Bar */}
      <div className="space-y-3">
        <div className="p-4 sm:p-5 rounded-2xl bg-[#001933] border border-amber-500/25 shadow-xl flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Year Filter Buttons */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
            <span className="text-xs font-mono text-amber-400 uppercase tracking-wider font-semibold mr-1 shrink-0 flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              Year:
            </span>
            <button
              onClick={() => setSelectedYear('all')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                selectedYear === 'all'
                  ? 'bg-amber-500 text-[#001428] font-bold shadow'
                  : 'bg-white/5 hover:bg-white/10 text-slate-300'
              }`}
            >
              All Years ({achievements.length})
            </button>
            {uniqueYears.map((yr) => {
              const count = achievements.filter((a) => a.year === yr).length;
              return (
                <button
                  key={yr}
                  onClick={() => setSelectedYear(yr.toString())}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                    selectedYear === yr.toString()
                      ? 'bg-amber-500 text-[#001428] font-bold shadow'
                      : 'bg-white/5 hover:bg-white/10 text-slate-300'
                  }`}
                >
                  {yr} ({count})
                </button>
              );
            })}
          </div>

          {/* Category Filter */}
          <div className="flex items-center gap-1 bg-black/40 p-1 rounded-xl border border-white/10 overflow-x-auto w-full md:w-auto">
            {categories.map((c) => (
              <button
                key={c.id}
                onClick={() => setSelectedCategory(c.id)}
                className={`px-2.5 py-1 text-xs rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                  selectedCategory === c.id
                    ? 'bg-sky-500 text-white font-semibold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>

        {/* Sub-bar with Live Search & View Switcher */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-1">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search achievements by cadet, camp, or medal..."
              className="w-full pl-9 pr-8 py-2 rounded-xl bg-black/40 border border-white/15 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-amber-400"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 self-end sm:self-auto text-xs text-slate-400">
            <span>Showing {filtered.length} of {achievements.length} records</span>
            <div className="flex items-center gap-1 bg-black/40 p-1 rounded-lg border border-white/10">
              <button
                onClick={() => setViewStyle('timeline')}
                className={`p-1.5 rounded transition-colors cursor-pointer ${
                  viewStyle === 'timeline' ? 'bg-amber-500 text-[#001428]' : 'text-slate-400 hover:text-white'
                }`}
                title="Timeline Stream"
              >
                <ListOrdered className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewStyle('grid')}
                className={`p-1.5 rounded transition-colors cursor-pointer ${
                  viewStyle === 'grid' ? 'bg-amber-500 text-[#001428]' : 'text-slate-400 hover:text-white'
                }`}
                title="Grid Cards"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Dynamic Interactive Timeline */}
      {filtered.length === 0 ? (
        <div className="p-12 text-center text-slate-400 bg-[#001830] rounded-2xl border border-white/10 text-sm">
          No achievements match your filter &quot;{searchQuery || selectedCategory}&quot;. Try adjusting your selection.
        </div>
      ) : viewStyle === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="p-6 rounded-2xl bg-gradient-to-br from-[#001f3f] to-[#001428] border border-amber-500/25 hover:border-amber-400/60 transition-all shadow-xl space-y-4 flex flex-col justify-between group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono font-bold text-amber-400 text-xs bg-amber-400/10 px-2 py-0.5 rounded border border-amber-400/25">
                    {item.year}
                  </span>
                  {item.medal && (
                    <span className="px-2.5 py-0.5 rounded-full bg-amber-400/15 border border-amber-400/30 text-amber-300 font-mono text-xs font-semibold flex items-center gap-1">
                      <Trophy className="w-3 h-3" />
                      <span>{item.medal}</span>
                    </span>
                  )}
                </div>

                <div>
                  <h3 className="font-serif text-lg font-bold text-white group-hover:text-amber-300 transition-colors">
                    {item.cadetName}
                  </h3>
                  <div className="text-xs text-sky-300">{item.rank}</div>
                </div>

                <div className="text-xs text-slate-300">
                  <div className="font-medium text-white">{item.campTitle}</div>
                  <div className="text-slate-400 flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3 h-3 text-amber-400 shrink-0" />
                    <span>{item.location}</span>
                  </div>
                </div>

                <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed">
                  {item.achievementDescription}
                </p>
              </div>

              {/* Photo & Certificate Buttons */}
              <div className="pt-3 border-t border-white/10 flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  {item.photoUrl && onOpenPhoto ? (
                    <button
                      onClick={() => onOpenPhoto(item)}
                      className="text-xs text-sky-300 hover:text-white flex items-center gap-1 cursor-pointer font-medium"
                    >
                      <ImageIcon className="w-3.5 h-3.5" />
                      <span>Photo</span>
                    </button>
                  ) : null}

                  <button
                    onClick={() => onOpenCertificate(item)}
                    className="px-2.5 py-1 rounded-lg bg-amber-400/15 hover:bg-amber-400/25 text-amber-300 text-xs font-medium flex items-center gap-1 cursor-pointer transition-colors border border-amber-400/30"
                  >
                    <FileCheck className="w-3.5 h-3.5" />
                    <span>Cert</span>
                  </button>
                </div>

                <div className="flex items-center gap-1.5">
                  {onEditAchievement && (
                    <button
                      onClick={() => onEditAchievement(item)}
                      className="p-1.5 rounded-lg bg-white/5 hover:bg-white/15 text-amber-300 cursor-pointer border border-amber-400/20"
                      title="Edit Achievement"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                  )}
                  {onDeleteAchievement && (
                    <button
                      onClick={() => onDeleteAchievement(item.id)}
                      className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-300 cursor-pointer border border-red-500/20"
                      title="Delete Achievement"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="relative border-l-2 border-amber-500/40 ml-4 md:ml-32 pl-6 md:pl-10 space-y-10">
          {filtered.map((item, index) => {
            return (
              <div key={item.id} className="relative group animate-in fade-in duration-200">
                {/* Timeline Node Badge with Anchor / Medal */}
                <div className="absolute -left-[31px] md:-left-[47px] top-1.5 w-5 h-5 rounded-full bg-[#001428] border-2 border-amber-400 flex items-center justify-center group-hover:scale-125 transition-transform shadow-[0_0_12px_rgba(212,175,55,0.4)]">
                  <div className="w-2 h-2 rounded-full bg-amber-400" />
                </div>

                {/* Left Year Badge for Desktop */}
                <div className="hidden md:block absolute -left-36 top-0.5 text-right w-24">
                  <span className="font-mono font-bold text-amber-400 text-sm block">
                    {item.year}
                  </span>
                  <span className="text-[10px] uppercase font-mono text-sky-300/80">
                    {item.category}
                  </span>
                </div>

                {/* Main Interactive Card */}
                <div className="p-6 sm:p-7 rounded-2xl bg-gradient-to-br from-[#001f3f] to-[#001428] border border-amber-500/25 group-hover:border-amber-400/60 transition-all shadow-xl space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-3">
                    <div className="flex items-center gap-2">
                      <span className="md:hidden font-mono font-bold text-amber-400 text-xs bg-amber-400/10 px-2 py-0.5 rounded">
                        {item.year}
                      </span>
                      <h3 className="font-serif text-lg sm:text-xl font-bold text-white group-hover:text-amber-300 transition-colors">
                        {item.cadetName}
                      </h3>
                      <span className="text-xs text-sky-300 font-medium">({item.rank})</span>
                    </div>

                    <div className="flex items-center gap-2">
                      {item.medal && (
                        <span className="px-2.5 py-0.5 rounded-full bg-amber-400/15 border border-amber-400/30 text-amber-300 font-mono text-xs font-semibold flex items-center gap-1">
                          <Trophy className="w-3.5 h-3.5" />
                          <span>{item.medal}</span>
                        </span>
                      )}
                      <span className="px-2.5 py-0.5 rounded-full bg-sky-500/15 border border-sky-400/30 text-sky-300 font-mono text-xs">
                        {item.category}
                      </span>
                      {onEditAchievement && (
                        <button
                          onClick={() => onEditAchievement(item)}
                          className="p-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 cursor-pointer border border-amber-400/30"
                          title="Edit Achievement"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                      )}
                      {onDeleteAchievement && (
                        <button
                          onClick={() => onDeleteAchievement(item.id)}
                          className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-300 cursor-pointer border border-red-500/30"
                          title="Delete Achievement"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Camp Title and Location */}
                  <div className="flex flex-wrap items-center gap-3 text-xs text-slate-300">
                    <span className="font-semibold text-white">{item.campTitle}</span>
                    <span aria-hidden="true">·</span>
                    <span className="flex items-center gap-1 text-slate-400">
                      <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      {item.location}
                    </span>
                  </div>

                  {/* Description Prose */}
                  <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                    {item.achievementDescription}
                  </p>

                  {/* Photo & Certificate Placeholders / Previews */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    {/* Photo Box Placeholder / Real Image */}
                    <div className="p-3 rounded-xl bg-black/40 border border-white/10 flex items-center gap-3">
                      <div className="w-14 h-14 rounded-lg bg-navy-900 border border-amber-400/30 flex items-center justify-center shrink-0 overflow-hidden text-amber-400">
                        {item.photoUrl ? (
                          <img
                            src={item.photoUrl}
                            alt={item.cadetName}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <ImageIcon className="w-6 h-6 opacity-60" />
                        )}
                      </div>
                      <div className="min-w-0 flex-1 text-xs">
                        <div className="font-medium text-white truncate">Activity Photo</div>
                        <div className="text-[11px] text-slate-400">
                          {item.photoUrl ? 'Verified Event Photo' : 'Official Photo Archive'}
                        </div>
                        {onOpenPhoto && item.photoUrl && (
                          <button
                            onClick={() => onOpenPhoto(item)}
                            className="text-[11px] text-amber-300 hover:underline font-semibold mt-0.5"
                          >
                            Enlarge View →
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Certificate Box */}
                    <div className="p-3 rounded-xl bg-black/40 border border-white/10 flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <FileCheck className="w-5 h-5 text-emerald-400 shrink-0" />
                        <div className="min-w-0 text-xs">
                          <div className="font-medium text-white truncate">Certificate Record</div>
                          <div className="font-mono text-[11px] text-amber-300 truncate">
                            {item.certificateId}
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => onOpenCertificate(item)}
                        className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 text-xs text-amber-300 font-medium flex items-center gap-1 cursor-pointer shrink-0 transition-colors"
                      >
                        <span>View</span>
                        <ExternalLink className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
