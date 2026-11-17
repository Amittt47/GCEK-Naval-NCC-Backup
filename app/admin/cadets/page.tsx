'use client';

import React, { useState } from 'react';
import { useUnitData } from '../../../src/context/UnitDataContext';
import { AdminHeader } from '../../../components/admin/AdminHeader';
import { CadetInfo } from '../../../src/types';
import {
  Users,
  Plus,
  Trash2,
  Edit3,
  CheckCircle2,
  Shield,
  Award,
  X,
  Upload,
  Image as ImageIcon,
} from 'lucide-react';

export default function AdminCadetsPage({
  onToggleSidebar = () => {},
}: {
  onToggleSidebar?: () => void;
}) {
  const { unitInfo, updateUnitInfo } = useUnitData();
  const cadets = unitInfo.cadetInformation || [];
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCadet, setEditingCadet] = useState<CadetInfo | null>(null);

  // Form State
  const [name, setName] = useState('');
  const [rank, setRank] = useState('Cadet Captain (CC)');
  const [role, setRole] = useState('Senior Cadet In-Charge');
  const [yearBranch, setYearBranch] = useState('4th Year, Mechanical Engg');
  const [regimentalNumber, setRegimentalNumber] = useState('');
  const [achievements, setAchievements] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');

  const rankOptions = [
    'Cadet Captain (CC)',
    'Petty Officer Cadet (POC)',
    'Leading Cadet (LC)',
    'Naval Cadet (NC)',
    'Senior Under Officer (SUO)',
    'Junior Under Officer (JUO)',
  ];

  const handleOpenAdd = () => {
    setEditingCadet(null);
    setName('');
    setRank('Cadet Captain (CC)');
    setRole('Senior Cadet In-Charge');
    setYearBranch('4th Year, Mechanical Engg');
    setRegimentalNumber('');
    setAchievements('');
    setPhotoUrl('');
    setIsModalOpen(true);
  };

  const handleOpenEdit = (cadet: CadetInfo) => {
    setEditingCadet(cadet);
    setName(cadet.name);
    setRank(cadet.rank);
    setRole(cadet.role);
    setYearBranch(cadet.yearBranch);
    setRegimentalNumber(cadet.regimentalNumber || '');
    setAchievements(cadet.achievements);
    setPhotoUrl(cadet.photoUrl || '');
    setIsModalOpen(true);
  };

  const handleDeleteCadet = (id: string) => {
    if (window.confirm('Remove this cadet from the unit roster?')) {
      const updated = cadets.filter((c) => c.id !== id);
      updateUnitInfo({ cadetInformation: updated });
    }
  };

  const handleSaveCadet = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    if (editingCadet) {
      const updated = cadets.map((c) =>
        c.id === editingCadet.id
          ? {
              ...c,
              name: name.trim(),
              rank: rank.trim(),
              role: role.trim(),
              yearBranch: yearBranch.trim(),
              regimentalNumber: regimentalNumber.trim() || undefined,
              achievements: achievements.trim(),
              photoUrl: photoUrl.trim() || undefined,
            }
          : c
      );
      updateUnitInfo({ cadetInformation: updated });
    } else {
      const newCadet: CadetInfo = {
        id: `cad-${Date.now()}`,
        name: name.trim(),
        rank: rank.trim(),
        role: role.trim(),
        yearBranch: yearBranch.trim(),
        regimentalNumber: regimentalNumber.trim() || undefined,
        achievements: achievements.trim() || 'Participated with distinction in sub-unit training.',
        photoUrl: photoUrl.trim() || undefined,
      };
      updateUnitInfo({ cadetInformation: [...cadets, newCadet] });
    }

    setIsModalOpen(false);
  };

  return (
    <div className="flex-1 flex flex-col">
      <AdminHeader
        onToggleSidebar={onToggleSidebar}
        title="Cadet Hierarchy & Information"
        subtitle="Manage cadet appointments, ranks in sequence (CC → POC), and achievements"
      />

      <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto w-full">
        {/* Top Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1">
            <h3 className="font-serif text-lg font-bold text-white flex items-center gap-2">
              <Users className="w-5 h-5 text-amber-400" />
              <span>3. Cadet Information (Hierarchy Sequence)</span>
            </h3>
            <p className="text-xs text-slate-400">
              Ordered in naval seniority: Cadet Captain (CC) → Petty Officer Cadet (POC) → Leading Cadet (LC) → Naval Cadet (NC).
            </p>
          </div>

          <button
            onClick={handleOpenAdd}
            className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-[#001428] font-bold text-xs flex items-center justify-center gap-2 shadow-lg transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Cadet Appointment</span>
          </button>
        </div>

        {/* Cadets Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {cadets.map((cadet, index) => (
            <div
              key={cadet.id}
              className="p-5 rounded-2xl bg-[#001830] border border-amber-500/25 hover:border-amber-400/50 transition-all flex flex-col justify-between space-y-4 shadow-lg"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-[#001020] border border-amber-400/40 flex items-center justify-center overflow-hidden shrink-0 text-amber-300 font-bold text-xs shadow">
                      {cadet.photoUrl ? (
                        <img
                          src={cadet.photoUrl}
                          alt={cadet.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span>{cadet.name.slice(0, 2).toUpperCase()}</span>
                      )}
                    </div>
                    <div>
                      <span className="font-mono text-[10px] text-amber-400 bg-black/40 px-2 py-0.5 rounded border border-white/10 block w-fit mb-0.5">
                        Seniority #{index + 1}
                      </span>
                      <h4 className="font-serif font-bold text-white text-sm">
                        {cadet.name}
                      </h4>
                      <p className="text-xs text-sky-300 font-mono">{cadet.rank}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleOpenEdit(cadet)}
                      className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-amber-300"
                      title="Edit cadet"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDeleteCadet(cadet.id)}
                      className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400"
                      title="Delete cadet"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="text-xs space-y-1 text-slate-300 border-t border-white/5 pt-2">
                  <div>
                    <span className="text-slate-400">Appointment Role:</span>{' '}
                    <span className="font-medium text-white">{cadet.role}</span>
                  </div>
                  <div>
                    <span className="text-slate-400">Branch & Academic Year:</span>{' '}
                    <span>{cadet.yearBranch}</span>
                  </div>
                  {cadet.regimentalNumber && (
                    <div className="font-mono text-[11px] text-amber-300/90">
                      Regt: {cadet.regimentalNumber}
                    </div>
                  )}
                </div>

                {cadet.achievements && (
                  <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-400/20 text-xs text-amber-200/90 leading-relaxed">
                    <span className="font-bold text-amber-300 block text-[11px]">
                      Achievements & Distinctions:
                    </span>
                    &ldquo;{cadet.achievements}&rdquo;
                  </div>
                )}
              </div>
            </div>
          ))}

          {cadets.length === 0 && (
            <div className="col-span-full p-12 text-center text-slate-400 rounded-2xl bg-[#001830] border border-white/10">
              No cadets recorded. Click &ldquo;Add New Cadet Appointment&rdquo; to populate the battalion roster.
            </div>
          )}
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
                {editingCadet ? 'Edit Cadet Record' : 'Add Cadet Appointment'}
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Set naval rank, battalion appointment, and achievements.
              </p>
            </div>

            <form onSubmit={handleSaveCadet} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-slate-300 font-medium">Cadet Full Name</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Cadet Captain Rajesh Tripathy"
                    className="w-full p-2.5 rounded-xl bg-black/40 border border-white/20 text-white font-bold"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-slate-300 font-medium">Naval Rank</label>
                  <select
                    value={rank}
                    onChange={(e) => setRank(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-[#001428] border border-white/20 text-white font-semibold"
                  >
                    {rankOptions.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-slate-300 font-medium">Appointment / Role</label>
                  <input
                    type="text"
                    required
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    placeholder="e.g. Senior Cadet In-Charge & Quarter Master"
                    className="w-full p-2.5 rounded-xl bg-black/40 border border-white/20 text-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-slate-300 font-medium">Academic Year & Branch</label>
                  <input
                    type="text"
                    required
                    value={yearBranch}
                    onChange={(e) => setYearBranch(e.target.value)}
                    placeholder="e.g. 4th Year, Mechanical Engg"
                    className="w-full p-2.5 rounded-xl bg-black/40 border border-white/20 text-white"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-slate-300 font-medium">Regimental Number</label>
                <input
                  type="text"
                  value={regimentalNumber}
                  onChange={(e) => setRegimentalNumber(e.target.value)}
                  placeholder="e.g. OD/22/SD/N/839101"
                  className="w-full p-2.5 rounded-xl bg-black/40 border border-white/20 text-white font-mono"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-300 font-medium text-amber-300 font-bold">
                  Cadet Achievements (Camps, Medals, Distinctions)
                </label>
                <textarea
                  rows={3}
                  value={achievements}
                  onChange={(e) => setAchievements(e.target.value)}
                  placeholder="e.g. Gold Medalist in Ship Modeling (Powered Class) at All India Nau Sainik Camp 2025 INS Shivaji..."
                  className="w-full p-2.5 rounded-xl bg-black/40 border border-white/20 text-white leading-relaxed"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-300 font-medium">Photograph URL</label>
                <input
                  type="text"
                  value={photoUrl}
                  onChange={(e) => setPhotoUrl(e.target.value)}
                  placeholder="https://..."
                  className="w-full p-2.5 rounded-xl bg-black/40 border border-white/20 text-white"
                />
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
                  {editingCadet ? 'Save Cadet Information' : 'Add Cadet'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
