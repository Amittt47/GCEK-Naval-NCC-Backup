'use client';

import React, { useState } from 'react';
import { useUnitData } from '../../../src/context/UnitDataContext';
import { AdminHeader } from '../../../components/admin/AdminHeader';
import { Achievement } from '../../../src/types';
import {
  Award,
  Plus,
  Trash2,
  Edit3,
  Trophy,
  X,
  FileCheck,
  Image as ImageIcon,
} from 'lucide-react';

export default function AdminAchievementsPage({
  onToggleSidebar = () => {},
}: {
  onToggleSidebar?: () => void;
}) {
  const { achievements, addAchievement, updateAchievement, deleteAchievement } = useUnitData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAch, setEditingAch] = useState<Achievement | null>(null);

  // Form State
  const [cadetName, setCadetName] = useState('');
  const [rank, setRank] = useState('Cadet Captain (CC)');
  const [year, setYear] = useState<number>(2025);
  const [category, setCategory] = useState<Achievement['category']>('AINSC');
  const [campTitle, setCampTitle] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [medal, setMedal] = useState<Achievement['medal']>('Gold');
  const [certificateId, setCertificateId] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');
  const [certificateUrl, setCertificateUrl] = useState('');

  const handleOpenAdd = () => {
    setEditingAch(null);
    setCadetName('');
    setRank('Cadet Captain (CC)');
    setYear(2025);
    setCategory('AINSC');
    setCampTitle('');
    setLocation('INS Shivaji, Lonavala');
    setDescription('');
    setMedal('Gold');
    setCertificateId(`AINSC-OD-${Date.now().toString().slice(-4)}`);
    setPhotoUrl('');
    setCertificateUrl('');
    setIsModalOpen(true);
  };

  const handleOpenEdit = (ach: Achievement) => {
    setEditingAch(ach);
    setCadetName(ach.cadetName);
    setRank(ach.rank);
    setYear(ach.year);
    setCategory(ach.category);
    setCampTitle(ach.campTitle);
    setLocation(ach.location);
    setDescription(ach.achievementDescription);
    setMedal(ach.medal || 'Gold');
    setCertificateId(ach.certificateId);
    setPhotoUrl(ach.photoUrl || '');
    setCertificateUrl(ach.certificateUrl || '');
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cadetName.trim() || !campTitle.trim()) return;

    if (editingAch) {
      updateAchievement(editingAch.id, {
        cadetName: cadetName.trim(),
        rank: rank.trim(),
        year: Number(year),
        category,
        campTitle: campTitle.trim(),
        location: location.trim(),
        achievementDescription: description.trim(),
        medal,
        certificateId: certificateId.trim(),
        photoUrl: photoUrl.trim() || undefined,
        certificateUrl: certificateUrl.trim() || undefined,
      });
    } else {
      addAchievement({
        id: `ach-${Date.now()}`,
        cadetName: cadetName.trim(),
        rank: rank.trim(),
        year: Number(year),
        category,
        campTitle: campTitle.trim(),
        location: location.trim(),
        achievementDescription: description.trim(),
        medal,
        certificateId: certificateId.trim() || `CERT-${year}`,
        photoUrl: photoUrl.trim() || undefined,
        certificateUrl: certificateUrl.trim() || undefined,
      });
    }

    setIsModalOpen(false);
  };

  return (
    <div className="flex-1 flex flex-col">
      <AdminHeader
        onToggleSidebar={onToggleSidebar}
        title="Cadet Honors & Achievements"
        subtitle="Record national camp medals, AINSC ship modeling citations, and state awards"
      />

      <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto w-full">
        {/* Top Controls */}
        <div className="flex items-center justify-between gap-4">
          <div>
            <h3 className="font-serif text-lg font-bold text-white flex items-center gap-2">
              <Trophy className="w-5 h-5 text-amber-400" />
              <span>Roll of Honor Management ({achievements.length} Records)</span>
            </h3>
          </div>

          <button
            onClick={handleOpenAdd}
            className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-[#001428] font-bold text-xs flex items-center gap-2 shadow-lg cursor-pointer transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Record New Achievement</span>
          </button>
        </div>

        {/* Achievements Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {achievements.map((ach) => (
            <div
              key={ach.id}
              className="p-5 rounded-2xl bg-[#001830] border border-amber-500/20 hover:border-amber-400/50 transition-all flex flex-col justify-between space-y-4 shadow-lg"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-mono text-[10px] border border-amber-400/30">
                        {ach.category} · {ach.year}
                      </span>
                      {ach.medal && (
                        <span className="text-[10px] text-amber-400 font-bold">
                          🏅 {ach.medal}
                        </span>
                      )}
                    </div>
                    <h4 className="font-serif text-sm font-bold text-white">
                      {ach.cadetName}
                    </h4>
                    <p className="text-xs text-sky-300 font-mono">{ach.rank}</p>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleOpenEdit(ach)}
                      className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-amber-300"
                      title="Edit"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => {
                        if (window.confirm(`Delete record for ${ach.cadetName}?`)) {
                          deleteAchievement(ach.id);
                        }
                      }}
                      className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400"
                      title="Delete"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="text-xs space-y-1 text-slate-300 pt-1 border-t border-white/5">
                  <div className="font-semibold text-white">{ach.campTitle}</div>
                  <div className="text-[11px] text-slate-400">{ach.location}</div>
                  <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed pt-1">
                    {ach.achievementDescription}
                  </p>
                </div>
              </div>

              {ach.certificateId && (
                <div className="pt-2 border-t border-white/5 text-[10px] font-mono text-amber-300/80 flex items-center justify-between">
                  <span>Cert: {ach.certificateId}</span>
                  {ach.photoUrl && <span className="text-sky-300">Has Photo</span>}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-xl bg-gradient-to-b from-[#001c38] to-[#001020] border-2 border-amber-400/60 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-5 text-xs my-8">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-lg bg-white/5"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <h2 className="font-serif text-xl font-bold text-white">
                {editingAch ? 'Edit Cadet Honor Record' : 'Record Cadet Honor'}
              </h2>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-slate-300 font-medium">Cadet Name</label>
                  <input
                    type="text"
                    required
                    value={cadetName}
                    onChange={(e) => setCadetName(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-black/40 border border-white/20 text-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-slate-300 font-medium">Rank</label>
                  <input
                    type="text"
                    required
                    value={rank}
                    onChange={(e) => setRank(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-black/40 border border-white/20 text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="space-y-1">
                  <label className="text-slate-300 font-medium">Year</label>
                  <input
                    type="number"
                    value={year}
                    onChange={(e) => setYear(Number(e.target.value))}
                    className="w-full p-2.5 rounded-xl bg-black/40 border border-white/20 text-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-slate-300 font-medium">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="w-full p-2.5 rounded-xl bg-[#001428] border border-white/20 text-white"
                  >
                    <option value="AINSC">AINSC</option>
                    <option value="RDC">RDC</option>
                    <option value="NTAC">NTAC</option>
                    <option value="CATC">CATC</option>
                    <option value="ATC">ATC</option>
                    <option value="Best Cadet">Best Cadet</option>
                    <option value="National">National</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-slate-300 font-medium">Medal / Award</label>
                  <select
                    value={medal}
                    onChange={(e) => setMedal(e.target.value as any)}
                    className="w-full p-2.5 rounded-xl bg-[#001428] border border-white/20 text-white"
                  >
                    <option value="Gold">Gold</option>
                    <option value="Silver">Silver</option>
                    <option value="Bronze">Bronze</option>
                    <option value="Directorate Trophy">Directorate Trophy</option>
                    <option value="Governor Trophy">Governor Trophy</option>
                    <option value="Honor Roll">Honor Roll</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-slate-300 font-medium">Camp / Event Title</label>
                <input
                  type="text"
                  required
                  value={campTitle}
                  onChange={(e) => setCampTitle(e.target.value)}
                  placeholder="e.g. All India Nau Sainik Camp (AINSC) 2025"
                  className="w-full p-2.5 rounded-xl bg-black/40 border border-white/20 text-white"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-300 font-medium">Location</label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g. INS Shivaji, Lonavala, Maharashtra"
                  className="w-full p-2.5 rounded-xl bg-black/40 border border-white/20 text-white"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-300 font-medium">Achievement Citation</label>
                <textarea
                  rows={3}
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Citation details..."
                  className="w-full p-2.5 rounded-xl bg-black/40 border border-white/20 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-slate-300 font-medium">Photo URL</label>
                  <input
                    type="text"
                    value={photoUrl}
                    onChange={(e) => setPhotoUrl(e.target.value)}
                    placeholder="https://..."
                    className="w-full p-2 rounded-xl bg-black/40 border border-white/20 text-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-slate-300 font-medium">Certificate ID</label>
                  <input
                    type="text"
                    value={certificateId}
                    onChange={(e) => setCertificateId(e.target.value)}
                    className="w-full p-2 rounded-xl bg-black/40 border border-white/20 text-white"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-white/10 text-slate-300 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-[#001428] font-bold shadow-lg"
                >
                  Save Citation Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
