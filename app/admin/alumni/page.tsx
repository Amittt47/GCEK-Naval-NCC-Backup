'use client';

import React, { useState } from 'react';
import { useUnitData } from '../../../src/context/UnitDataContext';
import { AdminHeader } from '../../../components/admin/AdminHeader';
import { ALUMNI_PROFILES } from '../../../src/data/mockData';
import { AlumniProfile } from '../../../src/types';
import {
  GraduationCap,
  Plus,
  Trash2,
  Edit3,
  CheckCircle2,
  Shield,
  X,
  Mail,
} from 'lucide-react';

export default function AdminAlumniPage({
  onToggleSidebar = () => {},
}: {
  onToggleSidebar?: () => void;
}) {
  const [alumniList, setAlumniList] = useState<AlumniProfile[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('gcek_naval_alumni');
        if (saved) return JSON.parse(saved);
      } catch (e) {}
    }
    return ALUMNI_PROFILES;
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAlum, setEditingAlum] = useState<AlumniProfile | null>(null);

  // Form State
  const [name, setName] = useState('');
  const [batch, setBatch] = useState('Class of 2022');
  const [degreeBranch, setDegreeBranch] = useState('B.Tech Mechanical');
  const [currentDesignation, setCurrentDesignation] = useState('');
  const [organization, setOrganization] = useState('');
  const [serviceBranch, setServiceBranch] = useState<AlumniProfile['serviceBranch']>('Indian Navy');
  const [nccRankHeld, setNccRankHeld] = useState('Senior Under Officer (SUO)');
  const [notableAchievement, setNotableAchievement] = useState('');
  const [adviceForCadets, setAdviceForCadets] = useState('');
  const [availableForMentorship, setAvailableForMentorship] = useState(true);

  const saveAlumniToStorage = (updated: AlumniProfile[]) => {
    setAlumniList(updated);
    try {
      localStorage.setItem('gcek_naval_alumni', JSON.stringify(updated));
    } catch (e) {}
  };

  const handleOpenAdd = () => {
    setEditingAlum(null);
    setName('');
    setBatch('Class of 2022');
    setDegreeBranch('B.Tech Mechanical');
    setCurrentDesignation('Sub Lieutenant');
    setOrganization('Indian Navy');
    setServiceBranch('Indian Navy');
    setNccRankHeld('Cadet Captain (CC)');
    setNotableAchievement('');
    setAdviceForCadets('');
    setAvailableForMentorship(true);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (alum: AlumniProfile) => {
    setEditingAlum(alum);
    setName(alum.name);
    setBatch(alum.batch);
    setDegreeBranch(alum.degreeBranch);
    setCurrentDesignation(alum.currentDesignation);
    setOrganization(alum.organization);
    setServiceBranch(alum.serviceBranch);
    setNccRankHeld(alum.nccRankHeld);
    setNotableAchievement(alum.notableAchievement);
    setAdviceForCadets(alum.adviceForCadets);
    setAvailableForMentorship(alum.availableForMentorship);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Delete this alumni record?')) {
      const updated = alumniList.filter((a) => a.id !== id);
      saveAlumniToStorage(updated);
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    if (editingAlum) {
      const updated = alumniList.map((a) =>
        a.id === editingAlum.id
          ? {
              ...a,
              name: name.trim(),
              batch: batch.trim(),
              degreeBranch: degreeBranch.trim(),
              currentDesignation: currentDesignation.trim(),
              organization: organization.trim(),
              serviceBranch,
              nccRankHeld: nccRankHeld.trim(),
              notableAchievement: notableAchievement.trim(),
              adviceForCadets: adviceForCadets.trim(),
              availableForMentorship,
            }
          : a
      );
      saveAlumniToStorage(updated);
    } else {
      const newAlum: AlumniProfile = {
        id: `alum-${Date.now()}`,
        name: name.trim(),
        batch: batch.trim(),
        degreeBranch: degreeBranch.trim(),
        currentDesignation: currentDesignation.trim(),
        organization: organization.trim(),
        serviceBranch,
        nccRankHeld: nccRankHeld.trim(),
        notableAchievement: notableAchievement.trim(),
        adviceForCadets: adviceForCadets.trim(),
        availableForMentorship,
      };
      saveAlumniToStorage([...alumniList, newAlum]);
    }

    setIsModalOpen(false);
  };

  return (
    <div className="flex-1 flex flex-col">
      <AdminHeader
        onToggleSidebar={onToggleSidebar}
        title="Alumni Directory Management"
        subtitle="Maintain verified profiles of commissioned officers and mentors"
      />

      <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto w-full">
        {/* Controls */}
        <div className="flex items-center justify-between gap-4">
          <div>
            <h3 className="font-serif text-lg font-bold text-white flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-amber-400" />
              <span>Verified Alumni Directory ({alumniList.length} Officers)</span>
            </h3>
          </div>

          <button
            onClick={handleOpenAdd}
            className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-[#001428] font-bold text-xs flex items-center gap-2 shadow-lg cursor-pointer transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Add Alumni Officer</span>
          </button>
        </div>

        {/* Alumni Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {alumniList.map((alum) => (
            <div
              key={alum.id}
              className="p-5 rounded-2xl bg-[#001830] border border-amber-500/20 hover:border-amber-400/50 transition-all flex flex-col justify-between space-y-4 shadow-lg"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-mono text-[10px] border border-emerald-400/30">
                      {alum.serviceBranch || 'Armed Forces'}
                    </span>
                    <h4 className="font-serif text-sm font-bold text-white mt-1">
                      {alum.name}
                    </h4>
                    <p className="text-xs text-amber-300 font-medium">
                      {alum.currentDesignation}
                    </p>
                    <p className="text-[11px] text-slate-400 font-mono">{alum.organization}</p>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleOpenEdit(alum)}
                      className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-amber-300"
                      title="Edit"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDelete(alum.id)}
                      className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400"
                      title="Delete"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="text-xs space-y-1 text-slate-300 pt-1 border-t border-white/5">
                  <div>Batch: <span className="text-white">{alum.batch}</span> ({alum.degreeBranch})</div>
                  <div>Rank held in NCC: <span className="text-sky-300 font-mono">{alum.nccRankHeld}</span></div>
                  {alum.notableAchievement && (
                    <div className="text-[11px] text-slate-400 leading-relaxed pt-1">
                      &ldquo;{alum.notableAchievement}&rdquo;
                    </div>
                  )}
                </div>
              </div>

              <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[11px]">
                <span className={alum.availableForMentorship ? 'text-emerald-400 font-semibold' : 'text-slate-500'}>
                  {alum.availableForMentorship ? '● Mentorship Active' : '○ Unavailable'}
                </span>
              </div>
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
                {editingAlum ? 'Edit Alumni Officer' : 'Add Alumni Officer Record'}
              </h2>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-slate-300 font-medium">Full Name</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-black/40 border border-white/20 text-white font-bold"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-slate-300 font-medium">Service Branch</label>
                  <select
                    value={serviceBranch}
                    onChange={(e) => setServiceBranch(e.target.value as any)}
                    className="w-full p-2.5 rounded-xl bg-[#001428] border border-white/20 text-white"
                  >
                    <option value="Indian Navy">Indian Navy</option>
                    <option value="Indian Army">Indian Army</option>
                    <option value="Indian Air Force">Indian Air Force</option>
                    <option value="Coast Guard">Coast Guard</option>
                    <option value="Merchant Navy">Merchant Navy</option>
                    <option value="PSU / Corporate">PSU / Corporate</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-slate-300 font-medium">Current Designation</label>
                  <input
                    type="text"
                    required
                    value={currentDesignation}
                    onChange={(e) => setCurrentDesignation(e.target.value)}
                    placeholder="e.g. Lieutenant, Indian Navy"
                    className="w-full p-2.5 rounded-xl bg-black/40 border border-white/20 text-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-slate-300 font-medium">Unit / Ship / Organization</label>
                  <input
                    type="text"
                    required
                    value={organization}
                    onChange={(e) => setOrganization(e.target.value)}
                    placeholder="e.g. INS Vikrant"
                    className="w-full p-2.5 rounded-xl bg-black/40 border border-white/20 text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-slate-300 font-medium">College Batch</label>
                  <input
                    type="text"
                    required
                    value={batch}
                    onChange={(e) => setBatch(e.target.value)}
                    placeholder="e.g. Class of 2020 (Mechanical Engg)"
                    className="w-full p-2.5 rounded-xl bg-black/40 border border-white/20 text-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-slate-300 font-medium">Rank Held in NCC</label>
                  <input
                    type="text"
                    required
                    value={nccRankHeld}
                    onChange={(e) => setNccRankHeld(e.target.value)}
                    placeholder="e.g. Senior Under Officer (SUO)"
                    className="w-full p-2.5 rounded-xl bg-black/40 border border-white/20 text-white"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-slate-300 font-medium">Notable Military / Career Milestone</label>
                <textarea
                  rows={2}
                  value={notableAchievement}
                  onChange={(e) => setNotableAchievement(e.target.value)}
                  placeholder="e.g. Commissioned through Direct NCC Special Entry..."
                  className="w-full p-2.5 rounded-xl bg-black/40 border border-white/20 text-white"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-300 font-medium">Advice for GCEK Cadets</label>
                <textarea
                  rows={2}
                  value={adviceForCadets}
                  onChange={(e) => setAdviceForCadets(e.target.value)}
                  placeholder="Words of guidance..."
                  className="w-full p-2.5 rounded-xl bg-black/40 border border-white/20 text-white"
                />
              </div>

              <div className="p-2.5 rounded-xl bg-black/40 border border-white/10">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={availableForMentorship}
                    onChange={(e) => setAvailableForMentorship(e.target.checked)}
                    className="accent-amber-400 w-4 h-4"
                  />
                  <span className="text-amber-300 font-semibold">Available for Cadet SSB Mentorship</span>
                </label>
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
                  Save Alumni Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
