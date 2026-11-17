'use client';

import React, { useState, useEffect } from 'react';
import { useUnitData } from '../context/UnitDataContext';
import { UnitInfo, CadetInfo, CampDetail, NavalEvent, Achievement } from '../types';
import {
  Shield,
  Users,
  Edit3,
  Save,
  RotateCcw,
  X,
  Plus,
  Trash2,
  CheckCircle2,
  Upload,
  Image as ImageIcon,
  Anchor,
  Compass,
  MapPin,
  Building,
  Phone,
  Mail,
  Award,
  Calendar,
  Flag,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

interface UnitCustomizerModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: 'unit' | 'co' | 'anoCto' | 'cadets' | 'camps' | 'events' | 'achievements';
}

export const UnitCustomizerModal: React.FC<UnitCustomizerModalProps> = ({
  isOpen,
  onClose,
  defaultTab = 'co',
}) => {
  const {
    unitInfo,
    updateUnitInfo,
    camps,
    addCamp,
    updateCamp,
    deleteCamp,
    events,
    addEvent,
    updateEvent,
    deleteEvent,
    achievements,
    addAchievement,
    updateAchievement,
    deleteAchievement,
    resetToDefaults,
  } = useUnitData();

  const [formData, setFormData] = useState<UnitInfo>(unitInfo);
  const [activeTab, setActiveTab] = useState<'unit' | 'co' | 'anoCto' | 'cadets' | 'camps' | 'events' | 'achievements'>(defaultTab);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // New cadet state for Cadet Information list
  const [newCadetName, setNewCadetName] = useState('');
  const [newCadetRank, setNewCadetRank] = useState('Cadet Captain (CC)');
  const [newCadetRole, setNewCadetRole] = useState('Senior Cadet In-Charge');
  const [newCadetYearBranch, setNewCadetYearBranch] = useState('4th Year, B.Tech');
  const [newCadetRegt, setNewCadetRegt] = useState('');
  const [newCadetAchievements, setNewCadetAchievements] = useState('');
  const [newCadetPhotoUrl, setNewCadetPhotoUrl] = useState('');

  // Editing Cadet Modal / State
  const [editingCadetId, setEditingCadetId] = useState<string | null>(null);

  // New Camp state
  const [newCampName, setNewCampName] = useState('');
  const [newCampShort, setNewCampShort] = useState('');
  const [newCampLocation, setNewCampLocation] = useState('');
  const [newCampDuration, setNewCampDuration] = useState('10 - 12 Days');
  const [newCampTagline, setNewCampTagline] = useState('');
  const [newCampOverview, setNewCampOverview] = useState('');
  const [editingCampSlug, setEditingCampSlug] = useState<string | null>(null);

  // Sync state whenever modal opens or unitInfo updates
  useEffect(() => {
    setFormData(unitInfo);
    if (defaultTab) {
      setActiveTab(defaultTab);
    }
  }, [unitInfo, isOpen, defaultTab]);

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateUnitInfo(formData);
    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
      onClose();
    }, 1200);
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

  // Add Cadet to Cadet Information
  const handleAddCadet = () => {
    if (!newCadetName.trim()) return;
    const newCadet: CadetInfo = {
      id: `cadet-${Date.now()}`,
      name: newCadetName.trim(),
      rank: newCadetRank.trim(),
      role: newCadetRole.trim() || 'Cadet Appointment',
      yearBranch: newCadetYearBranch.trim() || 'B.Tech Cadre',
      regimentalNumber: newCadetRegt.trim() || undefined,
      achievements: newCadetAchievements.trim() || 'Participated with distinction in sub-unit training.',
      photoUrl: newCadetPhotoUrl.trim() || undefined,
    };

    setFormData((prev) => ({
      ...prev,
      cadetInformation: [...(prev.cadetInformation || []), newCadet],
    }));

    setNewCadetName('');
    setNewCadetRole('Cadet Appointment');
    setNewCadetYearBranch('3rd Year, B.Tech');
    setNewCadetRegt('');
    setNewCadetAchievements('');
    setNewCadetPhotoUrl('');
  };

  const handleRemoveCadet = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      cadetInformation: (prev.cadetInformation || []).filter((c) => c.id !== id),
    }));
  };

  const handleUpdateCadetField = (id: string, field: keyof CadetInfo, value: string) => {
    setFormData((prev) => ({
      ...prev,
      cadetInformation: (prev.cadetInformation || []).map((c) =>
        c.id === id ? { ...c, [field]: value } : c
      ),
    }));
  };

  const handleMoveCadet = (index: number, direction: 'up' | 'down') => {
    const list = [...(formData.cadetInformation || [])];
    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= list.length) return;
    const temp = list[index];
    list[index] = list[targetIdx];
    list[targetIdx] = temp;
    setFormData((prev) => ({ ...prev, cadetInformation: list }));
  };

  // Add Weekend Classes (Saturday & Sunday)
  const handleAddWeekendClasses = () => {
    const satEvent: NavalEvent = {
      id: `evt-sat-${Date.now()}`,
      title: 'Weekly NCC Class: Naval Seamanship & Service Theory (Saturday Class)',
      type: 'Theory Lecture',
      date: '2026-10-10',
      startTime: '08:00 AM',
      endTime: '11:30 AM',
      location: 'Naval Training Room & Campus Grounds',
      description: 'Weekly mandatory 2-day training class. Focus on Naval bends and hitches, ship nomenclature, compass plotting, and service subjects.',
      dressCode: 'Uniform 1A / Working Whites',
      inCharge: 'ANO / CTO & CC Rajesh Tripathy',
    };
    const sunEvent: NavalEvent = {
      id: `evt-sun-${Date.now() + 1}`,
      title: 'Weekly NCC Class: Parade Drill, PT & Boat Pulling (Sunday Class)',
      type: 'Parade',
      date: '2026-10-11',
      startTime: '06:00 AM',
      endTime: '09:30 AM',
      location: 'College Parade Square & Reservoir Boat Shed',
      description: 'Weekly mandatory 2-day training class. Morning physical conditioning, ceremonial squad foot drill, arms drill, and whaler boat pulling practice.',
      dressCode: 'Uniform 1A (Pristine Whites & Beret)',
      inCharge: 'POC Ayush Mohanty & PI Staff',
    };
    addEvent(satEvent);
    addEvent(sunEvent);
    alert('Added Saturday and Sunday Weekly NCC Classes to Calendar!');
  };

  // Add New Naval Camp
  const handleCreateCamp = () => {
    if (!newCampName.trim() || !newCampShort.trim()) return;
    const slug = newCampShort.toLowerCase().replace(/[^a-z0-9]/g, '-');
    const newCamp: CampDetail = {
      id: `camp-${Date.now()}`,
      slug: slug as any,
      name: newCampName.trim(),
      shortName: newCampShort.trim().toUpperCase(),
      fullName: newCampName.trim(),
      location: newCampLocation.trim() || 'Naval Training Facility',
      duration: newCampDuration.trim() || '12 Days',
      badge: '⚓ Naval Expeditions',
      tagline: newCampTagline.trim() || 'Excellence in Naval Training and Discipline',
      overview: newCampOverview.trim() || 'Comprehensive naval training camp covering boat pulling, service subjects, and leadership.',
      selectionProcedure: [
        { phase: 'Unit Screening', description: 'Screening by ANO/CTO and PI staff.', keyTests: ['Drill', 'Fitness', 'Discipline'] },
      ],
      eligibility: {
        academic: 'Enrolled in 2nd or 3rd year with minimum 75% parade attendance.',
        nccRequirement: 'Basic training completed.',
        physical: ['2.4km run', 'Pushups & Situps'],
        swimming: 'Compulsory 50m swimming.',
      },
      preparationGuide: [
        { title: 'Physical Conditioning', points: ['Daily 5km running and core conditioning.'] },
      ],
      experiences: [
        { cadetName: 'Cadet Captain Rajesh Tripathy', batch: '2025', rank: 'CC', quote: 'A transformative experience.', highlights: 'Naval training' },
      ],
      faqs: [
        { question: 'What is the selection criteria?', answer: 'Merit in drill, swimming, and attendance.' },
      ],
    };
    addCamp(newCamp);
    setNewCampName('');
    setNewCampShort('');
    setNewCampLocation('');
    setNewCampTagline('');
    setNewCampOverview('');
    alert('Naval Camp added successfully!');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-gradient-to-b from-[#001c38] to-[#001020] border-2 border-amber-400/60 rounded-3xl shadow-2xl p-5 sm:p-8 my-6 space-y-6 max-h-[92vh] flex flex-col justify-between">
        {/* Top Header */}
        <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-4 shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-amber-500/15 border border-amber-400/40 text-amber-400">
              <Edit3 className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-serif text-xl sm:text-2xl font-bold text-white">
                  Commander Full Access Portal & Editor
                </h2>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                  Full Access Mode
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-0.5">
                Full authority to edit CO Lt. M Darshan, ANO/CTO, Cadet Information & Achievements, Camps, Calendar, and Unit Info.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-lg bg-white/5 hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selector */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-black/40 border border-white/10 overflow-x-auto text-xs shrink-0 scrollbar-thin">
          <button
            type="button"
            onClick={() => setActiveTab('co')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg font-medium transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'co'
                ? 'bg-amber-500 text-[#001428] font-bold shadow'
                : 'text-slate-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <Shield className="w-3.5 h-3.5" />
            <span>1. CO (LT. M Darshan)</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('anoCto')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg font-medium transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'anoCto'
                ? 'bg-amber-500 text-[#001428] font-bold shadow'
                : 'text-slate-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <Anchor className="w-3.5 h-3.5" />
            <span>2. ANO / CTO</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('cadets')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg font-medium transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'cadets'
                ? 'bg-amber-500 text-[#001428] font-bold shadow'
                : 'text-slate-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>3. Cadet Information (CC, POC..) ({(formData.cadetInformation || []).length})</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('camps')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg font-medium transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'camps'
                ? 'bg-amber-500 text-[#001428] font-bold shadow'
                : 'text-slate-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            <span>4. Naval Camps ({camps.length})</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('events')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg font-medium transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'events'
                ? 'bg-amber-500 text-[#001428] font-bold shadow'
                : 'text-slate-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>5. Calendar & Weekend Classes</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('achievements')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg font-medium transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'achievements'
                ? 'bg-amber-500 text-[#001428] font-bold shadow'
                : 'text-slate-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <Award className="w-3.5 h-3.5" />
            <span>6. Cadet Achievements ({achievements.length})</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('unit')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg font-medium transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'unit'
                ? 'bg-amber-500 text-[#001428] font-bold shadow'
                : 'text-slate-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <Flag className="w-3.5 h-3.5" />
            <span>7. Unit Details</span>
          </button>
        </div>

        {/* Scrollable Form Body */}
        <div className="overflow-y-auto pr-1 flex-1 space-y-6">
          {/* TAB 1: CO LT. M DARSHAN */}
          {activeTab === 'co' && (
            <div className="space-y-5 animate-in fade-in duration-150 text-xs">
              <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-400/30 text-amber-200 flex items-start gap-2.5">
                <Shield className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <strong>Commanding Officer Profile:</strong> Sequence rank #1. Current Commanding Officer is <strong>CO LT. M Darshan</strong>. You can update his name, naval rank, unit, message to cadets, and photo below.
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-slate-200 font-semibold block">CO Full Name & Rank</label>
                  <input
                    type="text"
                    value={formData.co?.name || ''}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        co: { ...(prev.co || {} as any), name: e.target.value },
                      }))
                    }
                    placeholder="e.g. CO LT. M Darshan"
                    className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/20 text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-slate-200 font-semibold block">Official Designation</label>
                  <input
                    type="text"
                    value={formData.co?.designation || ''}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        co: { ...(prev.co || {} as any), designation: e.target.value },
                      }))
                    }
                    placeholder="e.g. Commanding Officer (CO)"
                    className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/20 text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-slate-200 font-semibold block">Commanding Unit</label>
                  <input
                    type="text"
                    value={formData.co?.unit || ''}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        co: { ...(prev.co || {} as any), unit: e.target.value },
                      }))
                    }
                    placeholder="e.g. 4 Odisha Naval Unit NCC, Bhawanipatna"
                    className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/20 text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-slate-200 font-semibold block">Commission / Experience</label>
                  <input
                    type="text"
                    value={formData.co?.experience || ''}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        co: { ...(prev.co || {} as any), experience: e.target.value },
                      }))
                    }
                    placeholder="e.g. Commissioned Naval Officer · 12+ Years Maritime Service"
                    className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/20 text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                {/* Photo Upload or URL */}
                <div className="space-y-1 sm:col-span-2">
                  <label className="text-slate-200 font-semibold block">CO Officer Portrait / Photo</label>
                  <div className="flex flex-col sm:flex-row items-center gap-3">
                    <div className="w-16 h-16 rounded-2xl bg-black/40 border-2 border-amber-400/50 overflow-hidden shrink-0 flex items-center justify-center text-amber-400">
                      {formData.co?.photoUrl ? (
                        <img
                          src={formData.co.photoUrl}
                          alt="CO Preview"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <Shield className="w-7 h-7 text-amber-400/60" />
                      )}
                    </div>
                    <div className="flex-1 w-full space-y-2">
                      <input
                        type="url"
                        value={formData.co?.photoUrl || ''}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            co: { ...(prev.co || {} as any), photoUrl: e.target.value },
                          }))
                        }
                        placeholder="Paste image URL (https://...)"
                        className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/20 text-white focus:outline-none focus:border-amber-400"
                      />
                      <label className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 text-sky-300 border border-sky-400/30 cursor-pointer transition-colors">
                        <Upload className="w-3.5 h-3.5" />
                        <span>Upload Photo File from Device</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) =>
                            handlePhotoUpload(e, (url) =>
                              setFormData((prev) => ({
                                ...prev,
                                co: { ...(prev.co || {} as any), photoUrl: url },
                              }))
                            )
                          }
                          className="hidden"
                        />
                      </label>
                    </div>
                  </div>
                </div>

                {/* Message to Cadets */}
                <div className="space-y-1 sm:col-span-2">
                  <label className="text-slate-200 font-semibold block">Commanding Officer&apos;s Message to Cadets</label>
                  <textarea
                    rows={4}
                    value={formData.co?.message || ''}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        co: { ...(prev.co || {} as any), message: e.target.value },
                      }))
                    }
                    className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/20 text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: ANO / CTO */}
          {activeTab === 'anoCto' && (
            <div className="space-y-5 animate-in fade-in duration-150 text-xs">
              <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-400/30 text-amber-200 flex items-start gap-2.5">
                <Anchor className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <strong>Associate NCC Officer (ANO) / Care Taker Officer (CTO):</strong> Sequence rank #2 under CO. Faculty in-charge at college level.
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-slate-200 font-semibold block">Officer Name</label>
                  <input
                    type="text"
                    value={formData.anoCto?.name || ''}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        anoCto: { ...(prev.anoCto || {} as any), name: e.target.value },
                        cto: { ...(prev.cto || {} as any), name: e.target.value },
                      }))
                    }
                    placeholder="e.g. Lt. (Dr.) Manoranjan Pradhan"
                    className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/20 text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-slate-200 font-semibold block">Appointment Designation</label>
                  <input
                    type="text"
                    value={formData.anoCto?.designation || ''}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        anoCto: { ...(prev.anoCto || {} as any), designation: e.target.value },
                        cto: { ...(prev.cto || {} as any), designation: e.target.value },
                      }))
                    }
                    placeholder="e.g. Associate NCC Officer (ANO) / Care Taker Officer (CTO)"
                    className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/20 text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-slate-200 font-semibold block">Academic Department</label>
                  <input
                    type="text"
                    value={formData.anoCto?.department || ''}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        anoCto: { ...(prev.anoCto || {} as any), department: e.target.value },
                        cto: { ...(prev.cto || {} as any), department: e.target.value },
                      }))
                    }
                    placeholder="e.g. Department of Mechanical Engineering, GCEK"
                    className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/20 text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-slate-200 font-semibold block">Qualifications & PRCN Details</label>
                  <input
                    type="text"
                    value={formData.anoCto?.qualifications || ''}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        anoCto: { ...(prev.anoCto || {} as any), qualifications: e.target.value },
                        cto: { ...(prev.cto || {} as any), qualifications: e.target.value },
                      }))
                    }
                    placeholder="e.g. Ph.D., M.Tech (IIT), Associate NCC Officer (PRCN Certified)"
                    className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/20 text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                {/* Photo Upload or URL */}
                <div className="space-y-1 sm:col-span-2">
                  <label className="text-slate-200 font-semibold block">ANO / CTO Photo</label>
                  <div className="flex flex-col sm:flex-row items-center gap-3">
                    <div className="w-16 h-16 rounded-2xl bg-black/40 border-2 border-amber-400/50 overflow-hidden shrink-0 flex items-center justify-center text-amber-400">
                      {formData.anoCto?.photoUrl ? (
                        <img
                          src={formData.anoCto.photoUrl}
                          alt="ANO/CTO Preview"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <Anchor className="w-7 h-7 text-amber-400/60" />
                      )}
                    </div>
                    <div className="flex-1 w-full space-y-2">
                      <input
                        type="url"
                        value={formData.anoCto?.photoUrl || ''}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            anoCto: { ...(prev.anoCto || {} as any), photoUrl: e.target.value },
                            cto: { ...(prev.cto || {} as any), photoUrl: e.target.value },
                          }))
                        }
                        placeholder="Paste image URL (https://...)"
                        className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/20 text-white focus:outline-none focus:border-amber-400"
                      />
                      <label className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 text-sky-300 border border-sky-400/30 cursor-pointer transition-colors">
                        <Upload className="w-3.5 h-3.5" />
                        <span>Upload Photo File from Device</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) =>
                            handlePhotoUpload(e, (url) =>
                              setFormData((prev) => ({
                                ...prev,
                                anoCto: { ...(prev.anoCto || {} as any), photoUrl: url },
                                cto: { ...(prev.cto || {} as any), photoUrl: url },
                              }))
                            )
                          }
                          className="hidden"
                        />
                      </label>
                    </div>
                  </div>
                </div>

                <div className="space-y-1 sm:col-span-2">
                  <label className="text-slate-200 font-semibold block">ANO / CTO Message</label>
                  <textarea
                    rows={4}
                    value={formData.anoCto?.message || ''}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        anoCto: { ...(prev.anoCto || {} as any), message: e.target.value },
                        cto: { ...(prev.cto || {} as any), message: e.target.value },
                      }))
                    }
                    className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/20 text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: CADET INFORMATION (Sequence: CC then POC .. with achievements) */}
          {activeTab === 'cadets' && (
            <div className="space-y-5 animate-in fade-in duration-150 text-xs">
              <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-400/30 text-amber-200 flex items-start gap-2.5">
                <Users className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <strong>Cadet Information & Achievements:</strong> Sequence is strictly <strong>CC (Cadet Captain)</strong> then <strong>POC (Petty Officer Cadet)</strong>, then Leading Cadet (LC), then Naval Cadet (NC).
                  You can write each cadet&apos;s specific <strong>Achievements</strong>, edit their ranks, regimental number, photos, and reorder them with the arrows.
                </div>
              </div>

              {/* Add New Cadet Card */}
              <div className="p-4 rounded-2xl bg-black/40 border border-amber-400/40 space-y-3">
                <h4 className="font-serif text-sm font-bold text-amber-300 flex items-center gap-1.5">
                  <Plus className="w-4 h-4" />
                  <span>Add New Cadet to Cadet Information</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="space-y-1">
                    <label className="text-slate-300 font-medium">Cadet Name</label>
                    <input
                      type="text"
                      value={newCadetName}
                      onChange={(e) => setNewCadetName(e.target.value)}
                      placeholder="e.g. Cadet Captain Rajesh Tripathy"
                      className="w-full px-3 py-1.5 rounded-lg bg-[#001428] border border-white/20 text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-slate-300 font-medium">Cadet Rank (Sequence Order)</label>
                    <select
                      value={newCadetRank}
                      onChange={(e) => setNewCadetRank(e.target.value)}
                      className="w-full px-3 py-1.5 rounded-lg bg-[#001428] border border-white/20 text-white focus:outline-none focus:border-amber-400"
                    >
                      <option value="Cadet Captain (CC)">1. Cadet Captain (CC)</option>
                      <option value="Petty Officer Cadet (POC)">2. Petty Officer Cadet (POC)</option>
                      <option value="Leading Cadet (LC)">3. Leading Cadet (LC)</option>
                      <option value="Naval Cadet (NC)">4. Naval Cadet (NC)</option>
                      <option value="Senior Under Officer (SUO)">Senior Under Officer (SUO)</option>
                      <option value="Junior Under Officer (JUO)">Junior Under Officer (JUO)</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-slate-300 font-medium">Appointment / Role</label>
                    <input
                      type="text"
                      value={newCadetRole}
                      onChange={(e) => setNewCadetRole(e.target.value)}
                      placeholder="e.g. Senior Cadet / Quarter Master"
                      className="w-full px-3 py-1.5 rounded-lg bg-[#001428] border border-white/20 text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-slate-300 font-medium">Year & Branch</label>
                    <input
                      type="text"
                      value={newCadetYearBranch}
                      onChange={(e) => setNewCadetYearBranch(e.target.value)}
                      placeholder="e.g. 4th Year, Mechanical Engg"
                      className="w-full px-3 py-1.5 rounded-lg bg-[#001428] border border-white/20 text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-slate-300 font-medium">Regimental No. (Optional)</label>
                    <input
                      type="text"
                      value={newCadetRegt}
                      onChange={(e) => setNewCadetRegt(e.target.value)}
                      placeholder="e.g. OD/22/SD/N/839101"
                      className="w-full px-3 py-1.5 rounded-lg bg-[#001428] border border-white/20 text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-slate-300 font-medium">Photo URL or Upload</label>
                    <div className="flex items-center gap-1.5">
                      <input
                        type="url"
                        value={newCadetPhotoUrl}
                        onChange={(e) => setNewCadetPhotoUrl(e.target.value)}
                        placeholder="https://..."
                        className="w-full px-2 py-1.5 rounded-lg bg-[#001428] border border-white/20 text-white focus:outline-none text-[11px]"
                      />
                      <label className="p-1.5 rounded bg-white/10 hover:bg-white/20 text-amber-300 cursor-pointer shrink-0">
                        <Upload className="w-3.5 h-3.5" />
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handlePhotoUpload(e, setNewCadetPhotoUrl)}
                          className="hidden"
                        />
                      </label>
                    </div>
                  </div>
                  <div className="space-y-1 sm:col-span-3">
                    <label className="text-slate-300 font-medium text-amber-300">
                      Cadet Achievements (Camps, Medals, Distinctions)
                    </label>
                    <textarea
                      rows={2}
                      value={newCadetAchievements}
                      onChange={(e) => setNewCadetAchievements(e.target.value)}
                      placeholder="e.g. Gold Medal in Ship Modeling at AINSC 2025; Whaler boat pulling regatta silver medalist; Best Cadet..."
                      className="w-full px-3 py-1.5 rounded-lg bg-[#001428] border border-amber-400/40 text-white focus:outline-none"
                    />
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleAddCadet}
                  className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-[#001428] font-bold flex items-center gap-1.5 cursor-pointer shadow transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Cadet into Sequence</span>
                </button>
              </div>

              {/* Cadet Information List */}
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs text-slate-300">
                  <span className="font-bold text-white uppercase tracking-wider font-mono">
                    Current Cadet Hierarchy (Sequence: CC then POC ..)
                  </span>
                  <span>{(formData.cadetInformation || []).length} Cadets Enrolled</span>
                </div>

                <div className="space-y-3">
                  {(formData.cadetInformation || []).map((cadet, idx) => (
                    <div
                      key={cadet.id}
                      className="p-4 rounded-2xl bg-gradient-to-r from-[#001d3d] to-[#001428] border border-amber-400/30 space-y-3 relative group"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                        <div className="flex items-start gap-3">
                          <div className="w-12 h-12 rounded-xl bg-black/40 border border-amber-400/40 overflow-hidden shrink-0 flex items-center justify-center text-amber-300">
                            {cadet.photoUrl ? (
                              <img
                                src={cadet.photoUrl}
                                alt={cadet.name}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <Users className="w-6 h-6" />
                            )}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-mono text-[10px] px-2 py-0.5 rounded font-bold bg-amber-400/20 text-amber-300 border border-amber-400/30">
                                #{idx + 1} {cadet.rank.includes('CC') ? 'CC' : cadet.rank.includes('POC') ? 'POC' : cadet.rank.includes('LC') ? 'LC' : 'NC'}
                              </span>
                              <h5 className="font-serif text-sm font-bold text-white">
                                {cadet.name}
                              </h5>
                            </div>
                            <div className="text-sky-300 text-[11px] font-medium mt-0.5">
                              {cadet.role} · {cadet.yearBranch}
                            </div>
                            {cadet.regimentalNumber && (
                              <div className="font-mono text-[10px] text-slate-400">
                                Regt: {cadet.regimentalNumber}
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Controls (Move Up/Down & Delete) */}
                        <div className="flex items-center gap-1.5 self-end sm:self-auto">
                          <button
                            type="button"
                            onClick={() => handleMoveCadet(idx, 'up')}
                            disabled={idx === 0}
                            className="p-1 rounded bg-white/5 hover:bg-white/10 text-slate-300 disabled:opacity-30 cursor-pointer"
                            title="Move Up in Sequence"
                          >
                            <ChevronUp className="w-4 h-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleMoveCadet(idx, 'down')}
                            disabled={idx === (formData.cadetInformation || []).length - 1}
                            className="p-1 rounded bg-white/5 hover:bg-white/10 text-slate-300 disabled:opacity-30 cursor-pointer"
                            title="Move Down in Sequence"
                          >
                            <ChevronDown className="w-4 h-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleRemoveCadet(cadet.id)}
                            className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-300 border border-red-500/30 cursor-pointer"
                            title="Delete Cadet"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      {/* Direct Inline Field Editing for this Cadet */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 border-t border-white/10 text-[11px]">
                        <div>
                          <label className="text-slate-400">Edit Name:</label>
                          <input
                            type="text"
                            value={cadet.name}
                            onChange={(e) => handleUpdateCadetField(cadet.id, 'name', e.target.value)}
                            className="w-full px-2 py-1 rounded bg-black/40 border border-white/15 text-white"
                          />
                        </div>
                        <div>
                          <label className="text-slate-400">Edit Rank:</label>
                          <select
                            value={cadet.rank}
                            onChange={(e) => handleUpdateCadetField(cadet.id, 'rank', e.target.value)}
                            className="w-full px-2 py-1 rounded bg-black/40 border border-white/15 text-white"
                          >
                            <option value="Cadet Captain (CC)">Cadet Captain (CC)</option>
                            <option value="Petty Officer Cadet (POC)">Petty Officer Cadet (POC)</option>
                            <option value="Leading Cadet (LC)">Leading Cadet (LC)</option>
                            <option value="Naval Cadet (NC)">Naval Cadet (NC)</option>
                            <option value="Senior Under Officer (SUO)">Senior Under Officer (SUO)</option>
                            <option value="Junior Under Officer (JUO)">Junior Under Officer (JUO)</option>
                          </select>
                        </div>
                        <div className="sm:col-span-2">
                          <label className="text-amber-300 font-semibold">
                            Edit Achievements (Camps attended, medals, awards):
                          </label>
                          <textarea
                            rows={2}
                            value={cadet.achievements || ''}
                            onChange={(e) => handleUpdateCadetField(cadet.id, 'achievements', e.target.value)}
                            className="w-full px-2 py-1 rounded bg-black/40 border border-amber-400/40 text-amber-200"
                            placeholder="Write achievements of this cadet..."
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: NAVAL CAMPS (Add / Change Camp Name and Details) */}
          {activeTab === 'camps' && (
            <div className="space-y-5 animate-in fade-in duration-150 text-xs">
              <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-400/30 text-amber-200 flex items-start gap-2.5">
                <Compass className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <strong>Naval Camps Customizer:</strong> You have full access to change camp names, durations, locations, taglines, and add new custom naval camps.
                </div>
              </div>

              {/* Add New Camp Form */}
              <div className="p-4 rounded-2xl bg-black/40 border border-amber-400/40 space-y-3">
                <h4 className="font-serif text-sm font-bold text-amber-300 flex items-center gap-1.5">
                  <Plus className="w-4 h-4" />
                  <span>Add New Naval Camp</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="space-y-1">
                    <label className="text-slate-300 font-medium">Camp Full Name</label>
                    <input
                      type="text"
                      value={newCampName}
                      onChange={(e) => setNewCampName(e.target.value)}
                      placeholder="e.g. Sea Sortie & Naval Attachment"
                      className="w-full px-3 py-1.5 rounded-lg bg-[#001428] border border-white/20 text-white"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-slate-300 font-medium">Short Code / Badge</label>
                    <input
                      type="text"
                      value={newCampShort}
                      onChange={(e) => setNewCampShort(e.target.value)}
                      placeholder="e.g. NAC"
                      className="w-full px-3 py-1.5 rounded-lg bg-[#001428] border border-white/20 text-white"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-slate-300 font-medium">Location</label>
                    <input
                      type="text"
                      value={newCampLocation}
                      onChange={(e) => setNewCampLocation(e.target.value)}
                      placeholder="e.g. Eastern Naval Command, Vizag"
                      className="w-full px-3 py-1.5 rounded-lg bg-[#001428] border border-white/20 text-white"
                    />
                  </div>
                  <div className="space-y-1 sm:col-span-2">
                    <label className="text-slate-300 font-medium">Tagline / Motto</label>
                    <input
                      type="text"
                      value={newCampTagline}
                      onChange={(e) => setNewCampTagline(e.target.value)}
                      placeholder="e.g. Life onboard Indian Navy Warships"
                      className="w-full px-3 py-1.5 rounded-lg bg-[#001428] border border-white/20 text-white"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-slate-300 font-medium">Duration</label>
                    <input
                      type="text"
                      value={newCampDuration}
                      onChange={(e) => setNewCampDuration(e.target.value)}
                      placeholder="e.g. 12 Days"
                      className="w-full px-3 py-1.5 rounded-lg bg-[#001428] border border-white/20 text-white"
                    />
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleCreateCamp}
                  className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-[#001428] font-bold flex items-center gap-1.5 cursor-pointer shadow transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Create Naval Camp</span>
                </button>
              </div>

              {/* Existing Camps List to Edit */}
              <div className="space-y-3">
                <h4 className="font-mono text-xs font-bold text-white uppercase tracking-wider">
                  Existing Naval Camps ({camps.length}) - Edit in Place:
                </h4>
                <div className="space-y-3">
                  {camps.map((camp) => (
                    <div
                      key={camp.id}
                      className="p-4 rounded-xl bg-[#001b36] border border-white/10 space-y-3"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-amber-400 font-bold px-2 py-0.5 rounded bg-amber-400/10 border border-amber-400/25">
                          {camp.shortName}
                        </span>
                        <button
                          type="button"
                          onClick={() => deleteCamp(camp.id || camp.slug)}
                          className="text-red-400 hover:text-red-300 p-1 cursor-pointer"
                          title="Delete camp"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
                        <div>
                          <label className="text-slate-400">Camp Full Name:</label>
                          <input
                            type="text"
                            value={camp.fullName}
                            onChange={(e) => updateCamp(camp.id || camp.slug, { fullName: e.target.value })}
                            className="w-full px-2 py-1 rounded bg-black/40 border border-white/15 text-white"
                          />
                        </div>
                        <div>
                          <label className="text-slate-400">Location:</label>
                          <input
                            type="text"
                            value={camp.location}
                            onChange={(e) => updateCamp(camp.id || camp.slug, { location: e.target.value })}
                            className="w-full px-2 py-1 rounded bg-black/40 border border-white/15 text-white"
                          />
                        </div>
                        <div className="sm:col-span-2">
                          <label className="text-slate-400">Tagline / Motto:</label>
                          <input
                            type="text"
                            value={camp.tagline}
                            onChange={(e) => updateCamp(camp.id || camp.slug, { tagline: e.target.value })}
                            className="w-full px-2 py-1 rounded bg-black/40 border border-white/15 text-white"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: CALENDAR & WEEKEND CLASSES */}
          {activeTab === 'events' && (
            <div className="space-y-5 animate-in fade-in duration-150 text-xs">
              <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-400/30 text-amber-200 flex items-start gap-2.5">
                <Calendar className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <strong>Calendar & Weekly Classes:</strong> NCC training is regularly scheduled for <strong>2 days in a week (Saturday and Sunday)</strong>. You can click below to automatically generate weekend classes or edit any existing calendar event.
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={handleAddWeekendClasses}
                  className="px-4 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-[#001428] font-bold flex items-center gap-2 cursor-pointer shadow transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Saturday & Sunday NCC Classes</span>
                </button>
              </div>

              <div className="space-y-3">
                <h4 className="font-mono text-xs font-bold text-white uppercase tracking-wider">
                  Scheduled Events ({events.length}) - Edit or Delete:
                </h4>
                <div className="space-y-3">
                  {events.map((evt) => (
                    <div
                      key={evt.id}
                      className="p-3.5 rounded-xl bg-[#001933] border border-white/10 space-y-2.5"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-white/10 text-amber-300 font-bold">
                            {evt.date}
                          </span>
                          <span className="text-white font-semibold text-xs">{evt.title}</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => deleteEvent(evt.id)}
                          className="p-1 text-red-400 hover:text-red-300 cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[11px]">
                        <div>
                          <label className="text-slate-400">Title:</label>
                          <input
                            type="text"
                            value={evt.title}
                            onChange={(e) => updateEvent(evt.id, { title: e.target.value })}
                            className="w-full px-2 py-1 rounded bg-black/40 border border-white/15 text-white"
                          />
                        </div>
                        <div>
                          <label className="text-slate-400">Date (YYYY-MM-DD):</label>
                          <input
                            type="text"
                            value={evt.date}
                            onChange={(e) => updateEvent(evt.id, { date: e.target.value })}
                            className="w-full px-2 py-1 rounded bg-black/40 border border-white/15 text-white"
                          />
                        </div>
                        <div>
                          <label className="text-slate-400">Location:</label>
                          <input
                            type="text"
                            value={evt.location}
                            onChange={(e) => updateEvent(evt.id, { location: e.target.value })}
                            className="w-full px-2 py-1 rounded bg-black/40 border border-white/15 text-white"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: CADET ACHIEVEMENTS */}
          {activeTab === 'achievements' && (
            <div className="space-y-5 animate-in fade-in duration-150 text-xs">
              <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-400/30 text-amber-200 flex items-start gap-2.5">
                <Award className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <strong>Achievements & Citations:</strong> Full access to edit existing achievements, medals, cadet names, camp titles, or delete any record.
                </div>
              </div>

              <div className="space-y-3">
                {achievements.map((ach) => (
                  <div
                    key={ach.id}
                    className="p-4 rounded-2xl bg-gradient-to-r from-[#001d3d] to-[#001428] border border-amber-400/30 space-y-2.5"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-amber-400 font-bold px-2 py-0.5 rounded bg-amber-400/10">
                          {ach.year}
                        </span>
                        <span className="font-serif font-bold text-white text-sm">{ach.cadetName}</span>
                        {ach.medal && (
                          <span className="text-amber-300 font-mono text-[10px] bg-amber-500/20 px-2 py-0.5 rounded border border-amber-400/30">
                            {ach.medal}
                          </span>
                        )}
                      </div>
                      <button
                        type="button"
                        onClick={() => deleteAchievement(ach.id)}
                        className="p-1 text-red-400 hover:text-red-300 cursor-pointer"
                        title="Delete achievement"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
                      <div>
                        <label className="text-slate-400">Cadet Name:</label>
                        <input
                          type="text"
                          value={ach.cadetName}
                          onChange={(e) => updateAchievement(ach.id, { cadetName: e.target.value })}
                          className="w-full px-2 py-1 rounded bg-black/40 border border-white/15 text-white"
                        />
                      </div>
                      <div>
                        <label className="text-slate-400">Camp Title:</label>
                        <input
                          type="text"
                          value={ach.campTitle}
                          onChange={(e) => updateAchievement(ach.id, { campTitle: e.target.value })}
                          className="w-full px-2 py-1 rounded bg-black/40 border border-white/15 text-white"
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <label className="text-slate-400">Achievement Description:</label>
                        <textarea
                          rows={2}
                          value={ach.achievementDescription}
                          onChange={(e) => updateAchievement(ach.id, { achievementDescription: e.target.value })}
                          className="w-full px-2 py-1 rounded bg-black/40 border border-white/15 text-white"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 7: UNIT DETAILS */}
          {activeTab === 'unit' && (
            <div className="space-y-5 animate-in fade-in duration-150 text-xs">
              <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-400/30 text-amber-200 flex items-start gap-2.5">
                <Flag className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <strong>Unit Affiliation & Contact Details:</strong> Update the exact military unit designation (e.g. 4 Odisha Naval Unit NCC), college, and headquarters.
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1 sm:col-span-2">
                  <label className="text-slate-200 font-semibold block">Affiliated NCC Naval Unit</label>
                  <input
                    type="text"
                    value={formData.affiliatedUnit}
                    onChange={(e) => setFormData((prev) => ({ ...prev, affiliatedUnit: e.target.value }))}
                    className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/20 text-white"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-slate-200 font-semibold block">Group Headquarters</label>
                  <input
                    type="text"
                    value={formData.groupHQ}
                    onChange={(e) => setFormData((prev) => ({ ...prev, groupHQ: e.target.value }))}
                    className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/20 text-white"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-slate-200 font-semibold block">State Directorate</label>
                  <input
                    type="text"
                    value={formData.directorate}
                    onChange={(e) => setFormData((prev) => ({ ...prev, directorate: e.target.value }))}
                    className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/20 text-white"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-slate-200 font-semibold block">Institution / College</label>
                  <input
                    type="text"
                    value={formData.college}
                    onChange={(e) => setFormData((prev) => ({ ...prev, college: e.target.value }))}
                    className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/20 text-white"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-slate-200 font-semibold block">Location / City</label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData((prev) => ({ ...prev, location: e.target.value }))}
                    className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/20 text-white"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-slate-200 font-semibold block">Contact Email</label>
                  <input
                    type="email"
                    value={formData.contactEmail || ''}
                    onChange={(e) => setFormData((prev) => ({ ...prev, contactEmail: e.target.value }))}
                    className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/20 text-white"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-slate-200 font-semibold block">Contact Phone</label>
                  <input
                    type="text"
                    value={formData.contactPhone || ''}
                    onChange={(e) => setFormData((prev) => ({ ...prev, contactPhone: e.target.value }))}
                    className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/20 text-white"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 shrink-0">
          <button
            type="button"
            onClick={() => {
              if (window.confirm('Reset all portal customizations to official defaults?')) {
                resetToDefaults();
                onClose();
              }
            }}
            className="px-3.5 py-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-300 border border-red-500/30 text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset to Defaults</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-slate-300 text-xs font-semibold transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-[#001428] text-xs font-bold flex items-center gap-2 shadow-lg transition-all cursor-pointer"
            >
              {saveSuccess ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-[#001428]" />
                  <span>Changes Saved!</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>Save All Changes</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
