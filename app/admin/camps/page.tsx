'use client';

import React, { useState } from 'react';
import { useUnitData } from '../../../src/context/UnitDataContext';
import { AdminHeader } from '../../../components/admin/AdminHeader';
import { CampDetail } from '../../../src/types';
import {
  Compass,
  Plus,
  Trash2,
  Edit3,
  X,
  MapPin,
  Clock,
  Shield,
  Award,
  CheckCircle2,
  Tag,
} from 'lucide-react';

export default function AdminCampsPage({
  onToggleSidebar = () => {},
}: {
  onToggleSidebar?: () => void;
}) {
  const { camps, addCamp, updateCamp, deleteCamp } = useUnitData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCamp, setEditingCamp] = useState<CampDetail | null>(null);

  // Form State
  const [shortName, setShortName] = useState('AINSC');
  const [name, setName] = useState('AINSC');
  const [fullName, setFullName] = useState('All India Nau Sainik Camp');
  const [slug, setSlug] = useState<CampDetail['slug']>('ainsc');
  const [badge, setBadge] = useState('National Apex Camp');
  const [location, setLocation] = useState('INS Shivaji, Lonavala / Karwar');
  const [duration, setDuration] = useState('12 Days (Annual October Muster)');
  const [tagline, setTagline] = useState('The Pinnacle of Maritime Cadet Excellence in India');
  const [overview, setOverview] = useState('');

  const slugOptions: CampDetail['slug'][] = [
    'ainsc',
    'rdc',
    'ntac',
    'catc',
    'atc',
    'leadership',
    'naval-training',
  ];

  const handleOpenAdd = () => {
    setEditingCamp(null);
    setShortName('');
    setName('');
    setFullName('');
    setSlug('catc');
    setBadge('Naval Unit Camp');
    setLocation('Bhubaneswar / Kalahandi');
    setDuration('10 - 12 Days');
    setTagline('');
    setOverview('');
    setIsModalOpen(true);
  };

  const handleOpenEdit = (camp: CampDetail) => {
    setEditingCamp(camp);
    setShortName(camp.shortName);
    setName(camp.name);
    setFullName(camp.fullName);
    setSlug(camp.slug);
    setBadge(camp.badge);
    setLocation(camp.location);
    setDuration(camp.duration);
    setTagline(camp.tagline);
    setOverview(camp.overview);
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!shortName.trim() || !fullName.trim()) return;

    if (editingCamp) {
      updateCamp(editingCamp.id || editingCamp.slug, {
        shortName: shortName.trim(),
        name: name.trim() || shortName.trim(),
        fullName: fullName.trim(),
        slug,
        badge: badge.trim() || 'Naval Training Camp',
        location: location.trim() || 'Odisha',
        duration: duration.trim() || '10 Days',
        tagline: tagline.trim() || 'Leadership, Discipline and Service',
        overview: overview.trim() || 'Operational training syllabus and field exposure.',
      });
    } else {
      const newCamp: CampDetail = {
        id: `camp-${Date.now()}`,
        slug,
        shortName: shortName.trim(),
        name: name.trim() || shortName.trim(),
        fullName: fullName.trim(),
        badge: badge.trim() || 'Naval Training Camp',
        location: location.trim() || 'Odisha',
        duration: duration.trim() || '10 Days',
        tagline: tagline.trim() || 'Leadership, Discipline and Service',
        overview: overview.trim() || 'Operational training syllabus and field exposure.',
        selectionProcedure: [
          {
            phase: 'Unit Pre-Selection',
            description: 'Screening at college unit level based on attendance, drill, and discipline.',
            keyTests: ['Attendance', 'Physical Fitness', 'Uniform Inspection'],
          },
        ],
        eligibility: {
          academic: 'Good academic standing with no disciplinary flags.',
          nccRequirement: 'Minimum 75% parade muster attendance.',
          physical: ['1.6 km Run', 'Push-ups & Sit-ups'],
          swimming: 'Basic 50m survival stroke recommended.',
        },
        preparationGuide: [
          {
            title: 'Core Prerequisites',
            points: ['Rigorous physical conditioning', 'Knowledge of seamanship and naval history'],
          },
        ],
        experiences: [],
        faqs: [],
      };
      addCamp(newCamp);
    }

    setIsModalOpen(false);
  };

  const handleDelete = (idOrSlug: string, campName: string) => {
    if (confirm(`Are you sure you want to remove "${campName}" from camps?`)) {
      deleteCamp(idOrSlug);
    }
  };

  return (
    <div className="flex-1 flex flex-col">
      <AdminHeader
        onToggleSidebar={onToggleSidebar}
        title="Naval Camps Hub Management"
        subtitle="Manage national apex expeditions, CATC/ATC schedules, and camp curriculum"
      />

      <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto w-full">
        {/* Top Controls */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold font-serif text-white">Active Naval Camps ({camps.length})</h2>
            <p className="text-xs text-slate-400">
              Camps configured here appear dynamically in the public Camps & Maritime Hub.
            </p>
          </div>
          <button
            onClick={handleOpenAdd}
            className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-[#001428] font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-lg transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Camp</span>
          </button>
        </div>

        {/* Camp Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {camps.map((camp) => (
            <div
              key={camp.id || camp.slug}
              className="p-6 rounded-2xl bg-[#001830] border border-white/10 hover:border-amber-400/40 transition-all shadow-xl flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <span className="px-2.5 py-0.5 rounded-full font-mono text-[11px] font-bold bg-amber-400/20 text-amber-300 border border-amber-400/40">
                    {camp.badge}
                  </span>
                  <span className="font-mono text-xs text-sky-300 font-semibold uppercase">
                    Slug: {camp.slug}
                  </span>
                </div>

                <div>
                  <h3 className="font-serif text-lg font-bold text-white">{camp.fullName}</h3>
                  <div className="text-xs font-mono text-amber-400 font-semibold">{camp.shortName}</div>
                </div>

                <p className="text-xs text-amber-200/90 font-serif italic">
                  &ldquo;{camp.tagline}&rdquo;
                </p>

                <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed">
                  {camp.overview}
                </p>

                <div className="space-y-1 pt-2 border-t border-white/10 text-xs text-slate-400">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>{camp.location}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                    <span>{camp.duration}</span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                <span className="text-[11px] font-mono text-slate-500">
                  {camp.selectionProcedure?.length || 0} Selection Phases
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleOpenEdit(camp)}
                    className="p-1.5 rounded-lg bg-sky-500/20 hover:bg-sky-500/30 text-sky-300 border border-sky-400/30 transition-colors cursor-pointer"
                    title="Edit Camp"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(camp.id || camp.slug, camp.shortName)}
                    className="p-1.5 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-300 border border-red-400/30 transition-colors cursor-pointer"
                    title="Delete Camp"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Edit/Add Camp Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-2xl bg-gradient-to-b from-[#001f3f] to-[#001020] border-2 border-amber-400/60 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-2.5">
                <Compass className="w-5 h-5 text-amber-400" />
                <h3 className="font-serif text-lg font-bold text-white">
                  {editingCamp ? `Edit Camp: ${editingCamp.shortName}` : 'Add New Naval Camp'}
                </h3>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white bg-white/5 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">
                    Short Name (e.g. AINSC, RDC, CATC) *
                  </label>
                  <input
                    type="text"
                    required
                    value={shortName}
                    onChange={(e) => setShortName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#001428] border border-white/15 text-white text-xs focus:border-amber-400 focus:outline-none"
                    placeholder="AINSC"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">
                    Category Identifier (Slug)
                  </label>
                  <select
                    value={slug}
                    onChange={(e) => setSlug(e.target.value as CampDetail['slug'])}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#001428] border border-white/15 text-white text-xs focus:border-amber-400 focus:outline-none"
                  >
                    {slugOptions.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt.toUpperCase()}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1">
                  Full Official Camp Name *
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#001428] border border-white/15 text-white text-xs focus:border-amber-400 focus:outline-none"
                  placeholder="All India Nau Sainik Camp"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">
                    Badge / Tag (e.g. National Apex Camp)
                  </label>
                  <input
                    type="text"
                    value={badge}
                    onChange={(e) => setBadge(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#001428] border border-white/15 text-white text-xs focus:border-amber-400 focus:outline-none"
                    placeholder="National Apex Camp"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">
                    Duration & Cadence
                  </label>
                  <input
                    type="text"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#001428] border border-white/15 text-white text-xs focus:border-amber-400 focus:outline-none"
                    placeholder="12 Days (Annual October Muster)"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1">
                  Camp Location / Venue
                </label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#001428] border border-white/15 text-white text-xs focus:border-amber-400 focus:outline-none"
                  placeholder="INS Shivaji, Lonavala / Karwar"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1">
                  Camp Tagline / Motto
                </label>
                <input
                  type="text"
                  value={tagline}
                  onChange={(e) => setTagline(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#001428] border border-white/15 text-white text-xs focus:border-amber-400 focus:outline-none"
                  placeholder="The Pinnacle of Maritime Cadet Excellence in India"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1">
                  Detailed Camp Overview
                </label>
                <textarea
                  rows={4}
                  value={overview}
                  onChange={(e) => setOverview(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#001428] border border-white/15 text-white text-xs focus:border-amber-400 focus:outline-none resize-none leading-relaxed"
                  placeholder="Describe the camp scope, firing, boat pulling, semaphore, seamanship, and selection stages..."
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-medium cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-[#001428] text-xs font-bold shadow-lg cursor-pointer"
                >
                  {editingCamp ? 'Save Changes' : 'Create Camp'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
