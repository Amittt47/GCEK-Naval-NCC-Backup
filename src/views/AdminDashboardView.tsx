'use client';

import React, { useState } from 'react';
import { useUnitData } from '../context/UnitDataContext';
import { UnitInfo, Achievement, GalleryItem } from '../types';
import {
  Shield,
  Users,
  Bell,
  Award,
  Compass,
  FileText,
  CheckCircle2,
  AlertCircle,
  Plus,
  Trash2,
  Edit3,
  TrendingUp,
  Image as ImageIcon,
  Save,
  RotateCcw,
  Calendar as CalendarIcon,
  X,
} from 'lucide-react';

interface AdminDashboardViewProps {
  onOpenCustomizer?: () => void;
}

export const AdminDashboardView: React.FC<AdminDashboardViewProps> = ({ onOpenCustomizer: propOnOpenCustomizer }) => {
  const {
    unitInfo,
    updateUnitInfo,
    achievements,
    addAchievement,
    deleteAchievement,
    events,
    galleryItems,
    addGalleryItem,
    deleteGalleryItem,
    resetToDefaults,
    openCustomizer,
  } = useUnitData();

  const onOpenCustomizer = propOnOpenCustomizer || (() => openCustomizer('co'));

  const [activeTab, setActiveTab] = useState<'unit-info' | 'achievements' | 'gallery' | 'analytics'>('unit-info');

  // Unit Info Form Local State
  const [formData, setFormData] = useState<UnitInfo>(unitInfo);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // New Achievement Form State
  const [achName, setAchName] = useState('');
  const [achRank, setAchRank] = useState('Leading Cadet (LC)');
  const [achYear, setAchYear] = useState<number>(2026);
  const [achCategory, setAchCategory] = useState<Achievement['category']>('AINSC');
  const [achCampTitle, setAchCampTitle] = useState('');
  const [achLocation, setAchLocation] = useState('');
  const [achDesc, setAchDesc] = useState('');
  const [achMedal, setAchMedal] = useState<Achievement['medal']>('Gold');
  const [achPhotoUrl, setAchPhotoUrl] = useState('');
  const [achCertId, setAchCertId] = useState('');
  const [achSuccess, setAchSuccess] = useState(false);

  // New Gallery Photo State
  const [galTitle, setGalTitle] = useState('');
  const [galCategory, setGalCategory] = useState('Parade');
  const [galYear, setGalYear] = useState<number>(2026);
  const [galCaption, setGalCaption] = useState('');
  const [galPhotoUrl, setGalPhotoUrl] = useState('');
  const [galSuccess, setGalSuccess] = useState(false);

  // Sync formData with unitInfo when unitInfo changes
  React.useEffect(() => {
    setFormData(unitInfo);
  }, [unitInfo]);

  const handleSaveUnitInfo = (e: React.FormEvent) => {
    e.preventDefault();
    updateUnitInfo(formData);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>, setter: (val: string) => void) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setter(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddAchievement = (e: React.FormEvent) => {
    e.preventDefault();
    if (!achName.trim() || !achCampTitle.trim()) return;

    addAchievement({
      id: `ach-${Date.now()}`,
      cadetName: achName.trim(),
      rank: achRank.trim(),
      year: Number(achYear),
      category: achCategory,
      campTitle: achCampTitle.trim(),
      location: achLocation.trim() || 'Unit Headquarters',
      achievementDescription: achDesc.trim() || 'Exemplary performance awarded in official camp order.',
      medal: achMedal,
      certificateId: achCertId.trim() || `CERT-${achYear}-${Math.floor(100 + Math.random() * 900)}`,
      photoUrl: achPhotoUrl.trim() || undefined,
    });

    setAchSuccess(true);
    setTimeout(() => {
      setAchSuccess(false);
      setAchName('');
      setAchCampTitle('');
      setAchDesc('');
      setAchPhotoUrl('');
      setAchCertId('');
    }, 1500);
  };

  const handleAddGalleryPhoto = (e: React.FormEvent) => {
    e.preventDefault();
    if (!galTitle.trim()) return;

    addGalleryItem({
      id: `gal-${Date.now()}`,
      title: galTitle.trim(),
      category: galCategory,
      year: Number(galYear),
      caption: galCaption.trim() || 'Naval training activity at GCEK.',
      type: 'image',
      imageUrl: galPhotoUrl.trim() || undefined,
    });

    setGalSuccess(true);
    setTimeout(() => {
      setGalSuccess(false);
      setGalTitle('');
      setGalCaption('');
      setGalPhotoUrl('');
    }, 1500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {/* Top Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#001f3f] via-[#002b55] to-[#00152b] border-2 border-amber-500/30 shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-amber-300 mb-1">
            <Shield className="w-4 h-4 text-amber-400" />
            <span>Unit Customization & Command Console</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-naval font-bold text-white">
            Command Center & Information Editor
          </h1>
          <p className="text-xs text-slate-300 mt-1">
            Easily update unit affiliation, officer names, senior cadets, photos, and achievements.
            All edits save directly to your browser session!
          </p>
        </div>

        <div className="flex items-center gap-3">
          {onOpenCustomizer && (
            <button
              onClick={onOpenCustomizer}
              className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-[#001428] font-bold text-xs flex items-center gap-2 cursor-pointer shadow-lg transition-colors"
            >
              <Edit3 className="w-4 h-4" />
              <span>Full Unit & Cadet Editor</span>
            </button>
          )}

          <button
            onClick={() => {
              if (confirm('Are you sure you want to reset all data back to the default sample records?')) {
                resetToDefaults();
                alert('Unit data reset to defaults.');
              }
            }}
            className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs text-slate-300 hover:text-white flex items-center gap-1.5 border border-white/10 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset to Defaults</span>
          </button>
        </div>
      </div>

      {saveSuccess && (
        <div className="p-4 rounded-2xl bg-emerald-500/20 border border-emerald-400 text-emerald-300 text-xs font-semibold flex items-center justify-between">
          <span className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            All Unit Information, Affiliation & Officer details updated successfully across the portal!
          </span>
          <X className="w-4 h-4 cursor-pointer" onClick={() => setSaveSuccess(false)} />
        </div>
      )}

      {/* Admin Tabs */}
      <div className="flex items-center gap-2 border-b border-amber-500/20 pb-2 overflow-x-auto">
        <button
          onClick={() => setActiveTab('unit-info')}
          className={`px-4 py-2.5 rounded-xl text-xs font-semibold cursor-pointer whitespace-nowrap transition-all ${
            activeTab === 'unit-info'
              ? 'bg-amber-500 text-[#001428] font-bold shadow'
              : 'bg-[#001830] text-slate-300 hover:bg-white/10'
          }`}
        >
          Edit Unit Information & Officers
        </button>
        <button
          onClick={() => setActiveTab('achievements')}
          className={`px-4 py-2.5 rounded-xl text-xs font-semibold cursor-pointer whitespace-nowrap transition-all ${
            activeTab === 'achievements'
              ? 'bg-amber-500 text-[#001428] font-bold shadow'
              : 'bg-[#001830] text-slate-300 hover:bg-white/10'
          }`}
        >
          Manage Achievements & Photos ({achievements.length})
        </button>
        <button
          onClick={() => setActiveTab('gallery')}
          className={`px-4 py-2.5 rounded-xl text-xs font-semibold cursor-pointer whitespace-nowrap transition-all ${
            activeTab === 'gallery'
              ? 'bg-amber-500 text-[#001428] font-bold shadow'
              : 'bg-[#001830] text-slate-300 hover:bg-white/10'
          }`}
        >
          Upload Activity Photos ({galleryItems.length})
        </button>
        <button
          onClick={() => setActiveTab('analytics')}
          className={`px-4 py-2.5 rounded-xl text-xs font-semibold cursor-pointer whitespace-nowrap transition-all ${
            activeTab === 'analytics'
              ? 'bg-amber-500 text-[#001428] font-bold shadow'
              : 'bg-[#001830] text-slate-300 hover:bg-white/10'
          }`}
        >
          Cadet Readiness & Stats
        </button>
      </div>

      {/* ======================================================== */}
      {/* TAB 1: EDIT UNIT INFORMATION & NAMES */}
      {/* ======================================================== */}
      {activeTab === 'unit-info' && (
        <form onSubmit={handleSaveUnitInfo} className="space-y-8 animate-in fade-in duration-150">
          <div className="p-8 rounded-3xl bg-[#001933] border border-amber-500/25 shadow-xl space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <h3 className="font-serif text-xl font-bold text-white">
                  General Unit Affiliation & Location
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Change the unit name, parent battalion/naval unit, and college details.
                </p>
              </div>
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-[#001428] font-bold text-xs flex items-center gap-2 cursor-pointer shadow-lg"
              >
                <Save className="w-4 h-4" />
                <span>Save Changes</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
              <div className="space-y-1.5">
                <label className="text-slate-300 font-semibold block">Portal / Unit Display Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-black/40 border border-white/20 text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-slate-300 font-semibold block">College / Institution Name</label>
                <input
                  type="text"
                  value={formData.college}
                  onChange={(e) => setFormData({ ...formData, college: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-black/40 border border-white/20 text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-slate-300 font-semibold block">
                  Affiliated Parent Naval Unit (Battalion / Unit Name)
                </label>
                <input
                  type="text"
                  value={formData.affiliatedUnit}
                  onChange={(e) => setFormData({ ...formData, affiliatedUnit: e.target.value })}
                  placeholder="e.g. 4 Odisha Naval Unit NCC, Bhawanipatna"
                  className="w-full p-2.5 rounded-xl bg-black/40 border border-white/20 text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-slate-300 font-semibold block">Group Headquarters</label>
                <input
                  type="text"
                  value={formData.groupHQ}
                  onChange={(e) => setFormData({ ...formData, groupHQ: e.target.value })}
                  placeholder="e.g. Sambalpur Group HQ / Berhampur"
                  className="w-full p-2.5 rounded-xl bg-black/40 border border-white/20 text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-slate-300 font-semibold block">State Directorate</label>
                <input
                  type="text"
                  value={formData.directorate}
                  onChange={(e) => setFormData({ ...formData, directorate: e.target.value })}
                  placeholder="e.g. Odisha Directorate (NCC Dte Odisha)"
                  className="w-full p-2.5 rounded-xl bg-black/40 border border-white/20 text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-slate-300 font-semibold block">College Campus Location / Address</label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="e.g. Bhawanipatna, Kalahandi, Odisha - 766002"
                  className="w-full p-2.5 rounded-xl bg-black/40 border border-white/20 text-white focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>
          </div>

          {/* CTO / ANO Information */}
          <div className="p-8 rounded-3xl bg-[#001933] border border-amber-500/25 shadow-xl space-y-6">
            <h3 className="font-serif text-xl font-bold text-white border-b border-white/10 pb-4">
              Care Taker Officer (CTO) / Associate NCC Officer (ANO) Profile
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
              <div className="space-y-1.5">
                <label className="text-slate-300 font-semibold block">CTO Officer Name</label>
                <input
                  type="text"
                  value={formData.cto.name}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      cto: { ...formData.cto, name: e.target.value },
                    })
                  }
                  className="w-full p-2.5 rounded-xl bg-black/40 border border-white/20 text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-slate-300 font-semibold block">Official Designation & Department</label>
                <input
                  type="text"
                  value={formData.cto.designation}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      cto: { ...formData.cto, designation: e.target.value },
                    })
                  }
                  className="w-full p-2.5 rounded-xl bg-black/40 border border-white/20 text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="space-y-1.5 md:col-span-2">
                <label className="text-slate-300 font-semibold block">CTO Welcome Message to Cadets</label>
                <textarea
                  rows={3}
                  value={formData.cto.message}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      cto: { ...formData.cto, message: e.target.value },
                    })
                  }
                  className="w-full p-2.5 rounded-xl bg-black/40 border border-white/20 text-white focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>
          </div>

          {/* Senior Cadet Captain Leadership Profile */}
          <div className="p-8 rounded-3xl bg-[#001933] border border-sky-400/25 shadow-xl space-y-6">
            <h3 className="font-serif text-xl font-bold text-white border-b border-white/10 pb-4">
              Senior Cadet Captain / Cadet Leadership
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
              <div className="space-y-1.5">
                <label className="text-slate-300 font-semibold block">Senior Cadet Name</label>
                <input
                  type="text"
                  value={formData.seniorCadetCaptain.name}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      seniorCadetCaptain: { ...formData.seniorCadetCaptain, name: e.target.value },
                    })
                  }
                  className="w-full p-2.5 rounded-xl bg-black/40 border border-white/20 text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-slate-300 font-semibold block">Rank & Academic Year</label>
                <input
                  type="text"
                  value={formData.seniorCadetCaptain.rank}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      seniorCadetCaptain: { ...formData.seniorCadetCaptain, rank: e.target.value },
                    })
                  }
                  className="w-full p-2.5 rounded-xl bg-black/40 border border-white/20 text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="space-y-1.5 md:col-span-2">
                <label className="text-slate-300 font-semibold block">Senior Cadet Message to Juniors</label>
                <textarea
                  rows={3}
                  value={formData.seniorCadetCaptain.message}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      seniorCadetCaptain: { ...formData.seniorCadetCaptain, message: e.target.value },
                    })
                  }
                  className="w-full p-2.5 rounded-xl bg-black/40 border border-white/20 text-white focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="submit"
                className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-[#001428] font-bold text-xs flex items-center gap-2 cursor-pointer shadow-lg"
              >
                <Save className="w-4 h-4" />
                <span>Save All Unit Information</span>
              </button>
            </div>
          </div>
        </form>
      )}

      {/* ======================================================== */}
      {/* TAB 2: MANAGE ACHIEVEMENTS & UPLOAD PHOTOS */}
      {/* ======================================================== */}
      {activeTab === 'achievements' && (
        <div className="space-y-8 animate-in fade-in duration-150">
          {/* Add New Achievement Form */}
          <div className="p-8 rounded-3xl bg-[#001933] border border-amber-500/25 shadow-xl space-y-6">
            <h3 className="font-serif text-xl font-bold text-white border-b border-white/10 pb-4 flex items-center gap-2">
              <Plus className="w-5 h-5 text-amber-400" />
              <span>Record Cadet Achievement with Photo & Certificate</span>
            </h3>

            {achSuccess ? (
              <div className="p-6 text-center text-emerald-400 space-y-1">
                <CheckCircle2 className="w-8 h-8 mx-auto" />
                <div className="font-bold text-sm">Achievement Added & Published!</div>
              </div>
            ) : (
              <form onSubmit={handleAddAchievement} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <label className="text-slate-300 font-medium block">Cadet Full Name</label>
                    <input
                      type="text"
                      required
                      value={achName}
                      onChange={(e) => setAchName(e.target.value)}
                      placeholder="e.g. Cadet Ayush Mohanty"
                      className="w-full p-2.5 rounded-xl bg-black/40 border border-white/20 text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-slate-300 font-medium block">Rank Held</label>
                    <input
                      type="text"
                      required
                      value={achRank}
                      onChange={(e) => setAchRank(e.target.value)}
                      placeholder="e.g. Senior Under Officer (SUO)"
                      className="w-full p-2.5 rounded-xl bg-black/40 border border-white/20 text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-slate-300 font-medium block">Year</label>
                    <input
                      type="number"
                      required
                      value={achYear}
                      onChange={(e) => setAchYear(Number(e.target.value))}
                      className="w-full p-2.5 rounded-xl bg-black/40 border border-white/20 text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <label className="text-slate-300 font-medium block">Honor / Category</label>
                    <select
                      value={achCategory}
                      onChange={(e) => setAchCategory(e.target.value as any)}
                      className="w-full p-2.5 rounded-xl bg-[#001428] border border-white/20 text-white focus:outline-none focus:border-amber-400"
                    >
                      <option value="AINSC">AINSC</option>
                      <option value="RDC">RDC</option>
                      <option value="NTAC">NTAC</option>
                      <option value="Best Cadet">Best Cadet</option>
                      <option value="Camp Senior">Camp Senior</option>
                      <option value="National">National</option>
                      <option value="State">State</option>
                      <option value="CATC">CATC</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-slate-300 font-medium block">Medal / Award</label>
                    <select
                      value={achMedal}
                      onChange={(e) => setAchMedal(e.target.value as any)}
                      className="w-full p-2.5 rounded-xl bg-[#001428] border border-white/20 text-white focus:outline-none focus:border-amber-400"
                    >
                      <option value="Gold">Gold Medal</option>
                      <option value="Silver">Silver Medal</option>
                      <option value="Bronze">Bronze Medal</option>
                      <option value="Governor Trophy">Governor Trophy</option>
                      <option value="Directorate Trophy">Directorate Trophy</option>
                      <option value="Honor Roll">Honor Roll</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-slate-300 font-medium block">Certificate Ref ID</label>
                    <input
                      type="text"
                      value={achCertId}
                      onChange={(e) => setAchCertId(e.target.value)}
                      placeholder="e.g. AINSC-OD-2026-09"
                      className="w-full p-2.5 rounded-xl bg-black/40 border border-white/20 text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-slate-300 font-medium block">Camp Title</label>
                    <input
                      type="text"
                      required
                      value={achCampTitle}
                      onChange={(e) => setAchCampTitle(e.target.value)}
                      placeholder="e.g. All India Nau Sainik Camp 2026"
                      className="w-full p-2.5 rounded-xl bg-black/40 border border-white/20 text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-slate-300 font-medium block">Location</label>
                    <input
                      type="text"
                      value={achLocation}
                      onChange={(e) => setAchLocation(e.target.value)}
                      placeholder="e.g. INS Shivaji, Lonavala"
                      className="w-full p-2.5 rounded-xl bg-black/40 border border-white/20 text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-slate-300 font-medium block">Performance Details & Citation</label>
                  <textarea
                    rows={2}
                    value={achDesc}
                    onChange={(e) => setAchDesc(e.target.value)}
                    placeholder="Provide details about the win, firing score, or appointment..."
                    className="w-full p-2.5 rounded-xl bg-black/40 border border-white/20 text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                {/* Photo Upload */}
                <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2">
                  <label className="text-slate-300 font-medium block flex items-center gap-1.5">
                    <ImageIcon className="w-4 h-4 text-amber-400" />
                    <span>Upload Cadet Photo / Activity Photo</span>
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handlePhotoUpload(e, setAchPhotoUrl)}
                    className="w-full text-slate-400 text-[11px] file:mr-2 file:py-1 file:px-2 file:rounded file:border-0 file:text-[11px] file:bg-amber-500 file:text-[#001428] file:font-semibold cursor-pointer"
                  />
                  <input
                    type="text"
                    value={achPhotoUrl}
                    onChange={(e) => setAchPhotoUrl(e.target.value)}
                    placeholder="Or enter image URL"
                    className="w-full p-1.5 rounded-lg bg-black/40 border border-white/15 text-white text-[11px]"
                  />
                </div>

                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-[#001428] font-bold text-xs cursor-pointer shadow-lg"
                >
                  Commit Achievement
                </button>
              </form>
            )}
          </div>

          {/* List of Existing Achievements with Delete */}
          <div className="p-8 rounded-3xl bg-[#001933] border border-white/10 space-y-4">
            <h3 className="font-serif text-lg font-bold text-white">
              Current Achievements Timeline ({achievements.length})
            </h3>
            <div className="divide-y divide-white/10">
              {achievements.map((ach) => (
                <div key={ach.id} className="py-3.5 flex items-center justify-between text-xs gap-4">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white text-sm">{ach.cadetName}</span>
                      <span className="text-amber-400 font-mono">({ach.rank})</span>
                      <span className="text-slate-400 font-mono">· {ach.year}</span>
                    </div>
                    <div className="text-slate-300 truncate mt-0.5">
                      {ach.campTitle} - {ach.achievementDescription}
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      if (confirm(`Delete achievement for ${ach.cadetName}?`)) {
                        deleteAchievement(ach.id);
                      }
                    }}
                    className="p-1.5 rounded-lg text-red-400 hover:bg-red-500/10 cursor-pointer shrink-0"
                    title="Delete Record"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 3: UPLOAD ACTIVITY PHOTOS TO GALLERY */}
      {/* ======================================================== */}
      {activeTab === 'gallery' && (
        <div className="space-y-8 animate-in fade-in duration-150">
          <div className="p-8 rounded-3xl bg-[#001933] border border-amber-500/25 shadow-xl space-y-6">
            <h3 className="font-serif text-xl font-bold text-white border-b border-white/10 pb-4 flex items-center gap-2">
              <ImageIcon className="w-5 h-5 text-amber-400" />
              <span>Add New Activity Photo to Gallery</span>
            </h3>

            {galSuccess ? (
              <div className="p-6 text-center text-emerald-400 space-y-1">
                <CheckCircle2 className="w-8 h-8 mx-auto" />
                <div className="font-bold text-sm">Photo Added to Unit Gallery!</div>
              </div>
            ) : (
              <form onSubmit={handleAddGalleryPhoto} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <label className="text-slate-300 font-medium block">Photo Title</label>
                    <input
                      type="text"
                      required
                      value={galTitle}
                      onChange={(e) => setGalTitle(e.target.value)}
                      placeholder="e.g. Whaler Pulling Trials on River"
                      className="w-full p-2.5 rounded-xl bg-black/40 border border-white/20 text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-slate-300 font-medium block">Category</label>
                    <select
                      value={galCategory}
                      onChange={(e) => setGalCategory(e.target.value)}
                      className="w-full p-2.5 rounded-xl bg-[#001428] border border-white/20 text-white focus:outline-none focus:border-amber-400"
                    >
                      <option value="Parade">Parade</option>
                      <option value="Camps">Camps</option>
                      <option value="Social Activities">Social Activities</option>
                      <option value="Independence Day">Independence Day</option>
                      <option value="Republic Day">Republic Day</option>
                      <option value="Seamanship Training">Seamanship Training</option>
                      <option value="Competitions">Competitions</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-slate-300 font-medium block">Year</label>
                    <input
                      type="number"
                      required
                      value={galYear}
                      onChange={(e) => setGalYear(Number(e.target.value))}
                      className="w-full p-2.5 rounded-xl bg-black/40 border border-white/20 text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-slate-300 font-medium block">Activity Caption</label>
                  <input
                    type="text"
                    value={galCaption}
                    onChange={(e) => setGalCaption(e.target.value)}
                    placeholder="Brief description of the event or cadets involved..."
                    className="w-full p-2.5 rounded-xl bg-black/40 border border-white/20 text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                {/* Image Upload / URL */}
                <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2">
                  <label className="text-slate-300 font-medium block">Upload Photo File or Enter URL</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handlePhotoUpload(e, setGalPhotoUrl)}
                    className="w-full text-slate-400 text-[11px] file:mr-2 file:py-1 file:px-2 file:rounded file:border-0 file:text-[11px] file:bg-amber-500 file:text-[#001428] file:font-semibold cursor-pointer"
                  />
                  <input
                    type="text"
                    value={galPhotoUrl}
                    onChange={(e) => setGalPhotoUrl(e.target.value)}
                    placeholder="Or enter image URL"
                    className="w-full p-1.5 rounded-lg bg-black/40 border border-white/15 text-white text-[11px]"
                  />
                  {galPhotoUrl && (
                    <div className="w-16 h-16 rounded border border-amber-400 overflow-hidden mt-2">
                      <img src={galPhotoUrl} alt="Preview" className="w-full h-full object-cover" />
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-[#001428] font-bold text-xs cursor-pointer shadow-lg"
                >
                  Upload & Publish Photo
                </button>
              </form>
            )}
          </div>

          {/* Existing Gallery Photos List */}
          <div className="p-8 rounded-3xl bg-[#001933] border border-white/10 space-y-4">
            <h3 className="font-serif text-lg font-bold text-white">
              Activity Photos Archive ({galleryItems.length})
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {galleryItems.map((item) => (
                <div
                  key={item.id}
                  className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between gap-3 text-xs"
                >
                  <div className="min-w-0">
                    <div className="font-bold text-white truncate">{item.title}</div>
                    <div className="text-[11px] text-amber-300 font-mono">
                      {item.category} · {item.year}
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      if (confirm(`Remove photo "${item.title}"?`)) {
                        deleteGalleryItem(item.id);
                      }
                    }}
                    className="p-1 rounded text-red-400 hover:bg-red-500/10 cursor-pointer shrink-0"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 4: READINESS & KPI ANALYTICS */}
      {/* ======================================================== */}
      {activeTab === 'analytics' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-in fade-in duration-150">
          <div className="p-6 sm:p-8 rounded-3xl bg-[#001933] border border-amber-500/25 space-y-6">
            <h3 className="font-serif text-lg font-bold text-white flex items-center gap-2">
              <Users className="w-5 h-5 text-sky-400" />
              <span>Cadet Strength & Certificate Readiness</span>
            </h3>
            <div className="space-y-4 text-xs">
              <div>
                <div className="flex justify-between text-slate-300 mb-1">
                  <span>Enrolled Cadets</span>
                  <span className="font-mono text-amber-300">{unitInfo.cadetStrength} Cadets</span>
                </div>
                <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-amber-400 rounded-full" style={{ width: '85%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-slate-300 mb-1">
                  <span>Scheduled Operational Events</span>
                  <span className="font-mono text-sky-300">{events.length} Events on Calendar</span>
                </div>
                <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-sky-400 rounded-full" style={{ width: '70%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-slate-300 mb-1">
                  <span>Documented Honors & Medals</span>
                  <span className="font-mono text-emerald-300">{achievements.length} Medals</span>
                </div>
                <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-400 rounded-full" style={{ width: '90%' }} />
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 sm:p-8 rounded-3xl bg-[#001933] border border-amber-500/25 space-y-4">
            <h3 className="font-serif text-lg font-bold text-white">Current Affiliated Configuration</h3>
            <div className="space-y-2 text-xs text-slate-300">
              <div>
                <strong>Unit:</strong> {unitInfo.affiliatedUnit}
              </div>
              <div>
                <strong>Institution:</strong> {unitInfo.college}
              </div>
              <div>
                <strong>Group HQ:</strong> {unitInfo.groupHQ}
              </div>
              <div>
                <strong>Directorate:</strong> {unitInfo.directorate}
              </div>
              <div>
                <strong>CTO In-Charge:</strong> {unitInfo.cto.name}
              </div>
              <div>
                <strong>Senior Cadet:</strong> {unitInfo.seniorCadetCaptain.name}
              </div>
            </div>
            <div className="pt-2 text-[11px] text-amber-300">
              To change any of these values, switch to the &quot;Edit Unit Information & Officers&quot; tab above.
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
