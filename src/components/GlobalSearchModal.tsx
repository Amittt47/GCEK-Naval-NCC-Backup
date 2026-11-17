'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { HubTab } from '../types';
import { useUnitData } from '../context/UnitDataContext';
import {
  CAMPS_DATA,
  DEFENCE_CAREERS,
  CADET_RESOURCES,
  ALUMNI_PROFILES,
  MAGAZINE_ARTICLES,
} from '../data/mockData';
import {
  Search,
  X,
  Compass,
  ChevronRight,
  FileText,
  Award,
  BookOpen,
  Shield,
  Bell,
  Users,
  Calendar as CalendarIcon,
} from 'lucide-react';

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectResult: (tab: HubTab, extraId?: string) => void;
}

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({
  isOpen,
  onClose,
  onSelectResult,
}) => {
  const { notices, events, achievements } = useUnitData();
  const [query, setQuery] = useState('');
  const [sectionFilter, setSectionFilter] = useState<'all' | 'event' | 'notice' | 'achievement' | 'camp' | 'resource'>('all');

  // Keyboard listener for Escape to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if ((e.key === '/' || (e.ctrlKey && e.key === 'k')) && !isOpen) {
        e.preventDefault();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const searchResults = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];

    const results: {
      id: string;
      title: string;
      category: string;
      tab: HubTab;
      detail: string;
      icon: 'camp' | 'notice' | 'achievement' | 'career' | 'resource' | 'alumni' | 'magazine' | 'event';
    }[] = [];

    // 1. Search Events from dynamic store
    events.forEach((evt) => {
      if (
        evt.title.toLowerCase().includes(q) ||
        evt.description.toLowerCase().includes(q) ||
        evt.location.toLowerCase().includes(q) ||
        evt.type.toLowerCase().includes(q)
      ) {
        results.push({
          id: evt.id,
          title: `${evt.title} (${evt.type})`,
          category: `Event · ${evt.date}`,
          tab: 'calendar',
          detail: `${evt.startTime} - ${evt.endTime} @ ${evt.location} - ${evt.description.slice(0, 60)}...`,
          icon: 'event',
        });
      }
    });

    // 2. Search Notices from dynamic store
    notices.forEach((n) => {
      if (
        n.title.toLowerCase().includes(q) ||
        n.content.toLowerCase().includes(q) ||
        n.category.toLowerCase().includes(q)
      ) {
        results.push({
          id: n.id,
          title: n.title,
          category: `Notice · ${n.category}`,
          tab: 'notices',
          detail: `${n.date} · ${n.issuedBy}`,
          icon: 'notice',
        });
      }
    });

    // 3. Search Achievements from dynamic store
    achievements.forEach((a) => {
      if (
        a.cadetName.toLowerCase().includes(q) ||
        a.campTitle.toLowerCase().includes(q) ||
        a.achievementDescription.toLowerCase().includes(q) ||
        a.category.toLowerCase().includes(q)
      ) {
        results.push({
          id: a.id,
          title: `${a.cadetName} (${a.rank})`,
          category: `Achievement · ${a.category} (${a.year})`,
          tab: 'achievements',
          detail: a.achievementDescription,
          icon: 'achievement',
        });
      }
    });

    // 4. Search Camps
    CAMPS_DATA.forEach((c) => {
      if (
        c.name.toLowerCase().includes(q) ||
        c.shortName.toLowerCase().includes(q) ||
        c.overview.toLowerCase().includes(q) ||
        c.tagline.toLowerCase().includes(q)
      ) {
        results.push({
          id: c.slug,
          title: `${c.shortName} - ${c.name}`,
          category: 'Camps Hub',
          tab: 'camps',
          detail: c.tagline,
          icon: 'camp',
        });
      }
    });

    // 5. Search Cadet Resources
    CADET_RESOURCES.forEach((r) => {
      if (
        r.title.toLowerCase().includes(q) ||
        r.summary.toLowerCase().includes(q) ||
        r.contentMarkdown.toLowerCase().includes(q) ||
        r.category.toLowerCase().includes(q)
      ) {
        results.push({
          id: r.id,
          title: r.title,
          category: `Resource · ${r.category}`,
          tab: 'resources',
          detail: r.summary,
          icon: 'resource',
        });
      }
    });

    // 6. Search Defence Careers
    DEFENCE_CAREERS.forEach((dc) => {
      if (
        dc.name.toLowerCase().includes(q) ||
        dc.branch.toLowerCase().includes(q) ||
        dc.nccBenefit.toLowerCase().includes(q)
      ) {
        results.push({
          id: dc.id,
          title: dc.name,
          category: 'Defence Career Hub',
          tab: 'careers',
          detail: `Age: ${dc.ageLimit} · ${dc.nccBenefit.slice(0, 80)}...`,
          icon: 'career',
        });
      }
    });

    // 7. Search Alumni
    ALUMNI_PROFILES.forEach((ap) => {
      if (
        ap.name.toLowerCase().includes(q) ||
        ap.organization.toLowerCase().includes(q) ||
        ap.currentDesignation.toLowerCase().includes(q)
      ) {
        results.push({
          id: ap.id,
          title: `${ap.name} - ${ap.currentDesignation}`,
          category: 'Alumni Network',
          tab: 'alumni',
          detail: `${ap.organization} (${ap.batch})`,
          icon: 'alumni',
        });
      }
    });

    // 8. Search Magazine
    MAGAZINE_ARTICLES.forEach((m) => {
      if (m.title.toLowerCase().includes(q) || m.summary.toLowerCase().includes(q)) {
        results.push({
          id: m.id,
          title: m.title,
          category: `Magazine · ${m.category}`,
          tab: 'magazine',
          detail: `By ${m.author} · ${m.readTime}`,
          icon: 'magazine',
        });
      }
    });

    // Filter by sectionFilter if not 'all'
    const finalResults = sectionFilter === 'all'
      ? results
      : results.filter((r) => r.icon === sectionFilter);

    return finalResults.slice(0, 18);
  }, [query, events, notices, achievements, sectionFilter]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-150">
      <div
        className="w-full max-w-2xl bg-[#001830] border border-amber-500/30 rounded-2xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-white/10 bg-[#001428]">
          <Search className="w-5 h-5 text-amber-400 shrink-0 mr-3" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search across events, notices, achievements, camps, resources..."
            className="w-full bg-transparent text-white placeholder-slate-400 text-sm focus:outline-none"
            autoFocus
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-slate-400 hover:text-white mr-2 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="px-2 py-1 text-xs text-slate-400 hover:text-white bg-white/5 rounded border border-white/10 cursor-pointer"
          >
            ESC
          </button>
        </div>

        {/* Section Filter Pills */}
        <div className="flex items-center gap-1.5 px-4 py-2 border-b border-white/5 bg-[#001222] overflow-x-auto text-xs">
          {[
            { id: 'all', label: 'All Sections' },
            { id: 'event', label: 'Events' },
            { id: 'notice', label: 'Notices' },
            { id: 'achievement', label: 'Achievements' },
            { id: 'camp', label: 'Camps' },
            { id: 'resource', label: 'Resources' },
          ].map((sec) => (
            <button
              key={sec.id}
              onClick={() => setSectionFilter(sec.id as any)}
              className={`px-2.5 py-1 rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                sectionFilter === sec.id
                  ? 'bg-amber-500 text-[#001428] font-bold'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {sec.label}
            </button>
          ))}
        </div>

        {/* Quick Suggestion Tags */}
        {!query && (
          <div className="p-5 space-y-4">
            <div className="text-xs uppercase tracking-wider text-slate-400 font-mono">
              Quick Deep Searches
            </div>
            <div className="flex flex-wrap gap-2">
              {[
                'Republic Day Drill',
                'AINSC Selection Trials',
                'Navy NCC Special Entry',
                'Bowline Knot & Seamanship',
                'Gold Medal in Ship Modeling',
                'Puneet Sagar Abhiyan',
                'OIR Practice Test',
                'Sub Lieutenant Behera',
              ].map((tag) => (
                <button
                  key={tag}
                  onClick={() => setQuery(tag)}
                  className="px-3 py-1.5 rounded-lg bg-navy-900 border border-white/10 hover:border-amber-400/40 text-xs text-slate-300 hover:text-amber-300 transition-colors text-left cursor-pointer"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Results List */}
        {query && (
          <div className="max-h-96 overflow-y-auto divide-y divide-white/5 p-2">
            {searchResults.length === 0 ? (
              <div className="py-12 text-center text-slate-400 text-sm">
                No matching records, events, or notices found for &quot;{query}&quot;.
              </div>
            ) : (
              searchResults.map((item) => (
                <button
                  key={`${item.tab}-${item.id}`}
                  onClick={() => {
                    onSelectResult(item.tab, item.id);
                    onClose();
                  }}
                  className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-white/5 text-left transition-colors group cursor-pointer"
                >
                  <div className="flex items-start gap-3 min-w-0 pr-3">
                    <div className="p-2 rounded-lg bg-white/5 border border-white/10 text-amber-400 shrink-0 mt-0.5">
                      {item.icon === 'event' && <CalendarIcon className="w-4 h-4 text-emerald-400" />}
                      {item.icon === 'camp' && <Compass className="w-4 h-4 text-sky-400" />}
                      {item.icon === 'notice' && <Bell className="w-4 h-4 text-amber-400" />}
                      {item.icon === 'achievement' && <Award className="w-4 h-4 text-yellow-400" />}
                      {item.icon === 'career' && <Shield className="w-4 h-4 text-indigo-400" />}
                      {item.icon === 'resource' && <BookOpen className="w-4 h-4 text-cyan-400" />}
                      {item.icon === 'alumni' && <Users className="w-4 h-4 text-amber-300" />}
                      {item.icon === 'magazine' && <FileText className="w-4 h-4 text-teal-400" />}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-mono text-amber-400/90 font-medium">
                          {item.category}
                        </span>
                      </div>
                      <div className="text-sm font-semibold text-white group-hover:text-amber-300 transition-colors truncate">
                        {item.title}
                      </div>
                      <div className="text-xs text-slate-400 truncate mt-0.5">
                        {item.detail}
                      </div>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-amber-300 shrink-0" />
                </button>
              ))
            )}
          </div>
        )}

        {/* Footer info */}
        <div className="px-4 py-2.5 bg-[#001222] border-t border-white/5 flex items-center justify-between text-[11px] text-slate-400">
          <span>Search across Events, Notices, Camps, Achievements & Resources</span>
          <span>Press ESC to exit</span>
        </div>
      </div>
    </div>
  );
};
