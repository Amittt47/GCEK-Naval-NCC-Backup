'use client';

import React, { useState, useEffect } from 'react';
import { useUnitData } from '../../../src/context/UnitDataContext';
import { AdminHeader } from '../../../components/admin/AdminHeader';
import { UnitInfo } from '../../../src/types';
import {
  Shield,
  Save,
  CheckCircle2,
  AlertCircle,
  Building2,
  Mail,
  Phone,
  Compass,
  FileText,
} from 'lucide-react';

export default function AdminUnitPage({
  onToggleSidebar = () => {},
}: {
  onToggleSidebar?: () => void;
}) {
  const { unitInfo, updateUnitInfo } = useUnitData();
  const [formData, setFormData] = useState<UnitInfo>(unitInfo);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState<'unit' | 'co' | 'ano'>('co');

  useEffect(() => {
    setFormData(unitInfo);
  }, [unitInfo]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateUnitInfo(formData);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  return (
    <div className="flex-1 flex flex-col">
      <AdminHeader
        onToggleSidebar={onToggleSidebar}
        title="Unit & Command Authority"
        subtitle="Manage official unit credentials, CO Lt. M Darshan, and ANO/CTO profiles"
      />

      <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-5xl mx-auto w-full">
        {/* Save confirmation */}
        {saveSuccess && (
          <div className="p-4 rounded-2xl bg-emerald-500/15 border-2 border-emerald-400 text-emerald-300 text-xs flex items-center gap-3 shadow-lg">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            <div>
              <span className="font-bold block">Command Record Saved Successfully!</span>
              <span className="text-[11px] text-emerald-300/80">Changes have been committed to local and cloud unit storage.</span>
            </div>
          </div>
        )}

        {/* Tab Selector */}
        <div className="flex items-center gap-2 border-b border-white/10 pb-3">
          <button
            onClick={() => setActiveTab('co')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'co'
                ? 'bg-amber-500 text-[#001428] shadow'
                : 'bg-white/5 hover:bg-white/10 text-slate-300'
            }`}
          >
            <Shield className="w-4 h-4" />
            <span>1. Commanding Officer (CO)</span>
          </button>
          <button
            onClick={() => setActiveTab('ano')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'ano'
                ? 'bg-amber-500 text-[#001428] shadow'
                : 'bg-white/5 hover:bg-white/10 text-slate-300'
            }`}
          >
            <Compass className="w-4 h-4" />
            <span>2. Associate NCC Officer (ANO / CTO)</span>
          </button>
          <button
            onClick={() => setActiveTab('unit')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'unit'
                ? 'bg-amber-500 text-[#001428] shadow'
                : 'bg-white/5 hover:bg-white/10 text-slate-300'
            }`}
          >
            <Building2 className="w-4 h-4" />
            <span>College & Battalion Details</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* TAB 1: CO */}
          {activeTab === 'co' && (
            <div className="p-6 sm:p-8 rounded-3xl bg-[#001830] border-2 border-amber-500/30 space-y-6 shadow-xl">
              <div>
                <h3 className="font-serif text-lg font-bold text-white flex items-center gap-2">
                  <Shield className="w-5 h-5 text-amber-400" />
                  <span>Rank #1: Commanding Officer (CO)</span>
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Primary military authority heading 4 Odisha Naval Unit NCC Bhawanipatna.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="space-y-1">
                  <label className="text-slate-300 font-medium">Commanding Officer Name</label>
                  <input
                    type="text"
                    required
                    value={formData.co?.name || ''}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        co: { ...formData.co, name: e.target.value },
                      })
                    }
                    placeholder="e.g. CO LT. M Darshan"
                    className="w-full p-2.5 rounded-xl bg-black/40 border border-white/20 text-white font-serif font-bold"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-slate-300 font-medium">Commissioned Rank</label>
                  <input
                    type="text"
                    required
                    value={formData.co?.rank || ''}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        co: { ...formData.co, rank: e.target.value },
                      })
                    }
                    placeholder="e.g. Lieutenant (Indian Navy)"
                    className="w-full p-2.5 rounded-xl bg-black/40 border border-white/20 text-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-slate-300 font-medium">Designation</label>
                  <input
                    type="text"
                    required
                    value={formData.co?.designation || ''}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        co: { ...formData.co, designation: e.target.value },
                      })
                    }
                    placeholder="e.g. Commanding Officer (CO)"
                    className="w-full p-2.5 rounded-xl bg-black/40 border border-white/20 text-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-slate-300 font-medium">Commanding Unit</label>
                  <input
                    type="text"
                    required
                    value={formData.co?.unit || ''}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        co: { ...formData.co, unit: e.target.value },
                      })
                    }
                    placeholder="e.g. 4 Odisha Naval Unit NCC, Bhawanipatna"
                    className="w-full p-2.5 rounded-xl bg-black/40 border border-white/20 text-white"
                  />
                </div>

                <div className="space-y-1 sm:col-span-2">
                  <label className="text-slate-300 font-medium">Service Credentials & Maritime Experience</label>
                  <input
                    type="text"
                    value={formData.co?.experience || ''}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        co: { ...formData.co, experience: e.target.value },
                      })
                    }
                    placeholder="e.g. Commissioned Naval Officer · 12+ Years Maritime Service"
                    className="w-full p-2.5 rounded-xl bg-black/40 border border-white/20 text-white"
                  />
                </div>

                <div className="space-y-1 sm:col-span-2">
                  <label className="text-slate-300 font-medium">Command Address / Message to Cadets</label>
                  <textarea
                    rows={4}
                    value={formData.co?.message || ''}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        co: { ...formData.co, message: e.target.value },
                      })
                    }
                    className="w-full p-2.5 rounded-xl bg-black/40 border border-white/20 text-white leading-relaxed"
                  />
                </div>

                <div className="space-y-1 sm:col-span-2">
                  <label className="text-slate-300 font-medium">CO Official Photograph URL</label>
                  <input
                    type="text"
                    value={formData.co?.photoUrl || ''}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        co: { ...formData.co, photoUrl: e.target.value },
                      })
                    }
                    placeholder="https://..."
                    className="w-full p-2.5 rounded-xl bg-black/40 border border-white/20 text-white"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: ANO/CTO */}
          {activeTab === 'ano' && (
            <div className="p-6 sm:p-8 rounded-3xl bg-[#001830] border-2 border-amber-500/30 space-y-6 shadow-xl">
              <div>
                <h3 className="font-serif text-lg font-bold text-white flex items-center gap-2">
                  <Compass className="w-5 h-5 text-sky-400" />
                  <span>Rank #2: Associate NCC Officer / Care Taker Officer</span>
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Institutional military supervisor for GCEK Naval NCC Sub-Unit.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="space-y-1">
                  <label className="text-slate-300 font-medium">Officer Name</label>
                  <input
                    type="text"
                    required
                    value={formData.anoCto?.name || ''}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        anoCto: { ...formData.anoCto, name: e.target.value },
                      })
                    }
                    placeholder="e.g. Lt. (Dr.) Manoranjan Pradhan"
                    className="w-full p-2.5 rounded-xl bg-black/40 border border-white/20 text-white font-serif font-bold"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-slate-300 font-medium">Official Designation</label>
                  <input
                    type="text"
                    required
                    value={formData.anoCto?.designation || ''}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        anoCto: { ...formData.anoCto, designation: e.target.value },
                      })
                    }
                    placeholder="e.g. Associate NCC Officer (ANO) / Care Taker Officer (CTO)"
                    className="w-full p-2.5 rounded-xl bg-black/40 border border-white/20 text-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-slate-300 font-medium">Academic Department</label>
                  <input
                    type="text"
                    value={formData.anoCto?.department || ''}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        anoCto: { ...formData.anoCto, department: e.target.value },
                      })
                    }
                    placeholder="e.g. Department of Mechanical Engineering, GCEK"
                    className="w-full p-2.5 rounded-xl bg-black/40 border border-white/20 text-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-slate-300 font-medium">Qualifications & Certifications</label>
                  <input
                    type="text"
                    value={formData.anoCto?.qualifications || ''}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        anoCto: { ...formData.anoCto, qualifications: e.target.value },
                      })
                    }
                    placeholder="e.g. Ph.D., M.Tech (IIT), PRCN Certified"
                    className="w-full p-2.5 rounded-xl bg-black/40 border border-white/20 text-white"
                  />
                </div>

                <div className="space-y-1 sm:col-span-2">
                  <label className="text-slate-300 font-medium">Officer Address / Mentorship Welcome</label>
                  <textarea
                    rows={4}
                    value={formData.anoCto?.message || ''}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        anoCto: { ...formData.anoCto, message: e.target.value },
                      })
                    }
                    className="w-full p-2.5 rounded-xl bg-black/40 border border-white/20 text-white leading-relaxed"
                  />
                </div>

                <div className="space-y-1 sm:col-span-2">
                  <label className="text-slate-300 font-medium">Photograph URL</label>
                  <input
                    type="text"
                    value={formData.anoCto?.photoUrl || ''}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        anoCto: { ...formData.anoCto, photoUrl: e.target.value },
                      })
                    }
                    placeholder="https://..."
                    className="w-full p-2.5 rounded-xl bg-black/40 border border-white/20 text-white"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: Unit Info */}
          {activeTab === 'unit' && (
            <div className="p-6 sm:p-8 rounded-3xl bg-[#001830] border-2 border-amber-500/30 space-y-6 shadow-xl">
              <div>
                <h3 className="font-serif text-lg font-bold text-white flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-amber-400" />
                  <span>College, Unit & Battalion Parameters</span>
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="space-y-1">
                  <label className="text-slate-300 font-medium">Portal / Sub-Unit Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-black/40 border border-white/20 text-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-slate-300 font-medium">Institution / College Name</label>
                  <input
                    type="text"
                    required
                    value={formData.college}
                    onChange={(e) => setFormData({ ...formData, college: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-black/40 border border-white/20 text-white"
                  />
                </div>

                <div className="space-y-1 sm:col-span-2">
                  <label className="text-slate-300 font-medium">College Location / Postal Address</label>
                  <input
                    type="text"
                    required
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-black/40 border border-white/20 text-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-slate-300 font-medium">Affiliated Naval Unit NCC</label>
                  <input
                    type="text"
                    required
                    value={formData.affiliatedUnit}
                    onChange={(e) => setFormData({ ...formData, affiliatedUnit: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-black/40 border border-white/20 text-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-slate-300 font-medium">Group Headquarters</label>
                  <input
                    type="text"
                    required
                    value={formData.groupHQ}
                    onChange={(e) => setFormData({ ...formData, groupHQ: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-black/40 border border-white/20 text-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-slate-300 font-medium">NCC Directorate</label>
                  <input
                    type="text"
                    required
                    value={formData.directorate}
                    onChange={(e) => setFormData({ ...formData, directorate: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-black/40 border border-white/20 text-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-slate-300 font-medium">Cadet Strength Allocation</label>
                  <input
                    type="number"
                    value={formData.cadetStrength}
                    onChange={(e) =>
                      setFormData({ ...formData, cadetStrength: Number(e.target.value) })
                    }
                    className="w-full p-2.5 rounded-xl bg-black/40 border border-white/20 text-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-slate-300 font-medium">Contact Email</label>
                  <input
                    type="email"
                    value={formData.contactEmail || ''}
                    onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-black/40 border border-white/20 text-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-slate-300 font-medium">Contact Phone</label>
                  <input
                    type="text"
                    value={formData.contactPhone || ''}
                    onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-black/40 border border-white/20 text-white"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Submit Button */}
          <div className="flex justify-end pt-4">
            <button
              type="submit"
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-[#001428] font-bold text-xs shadow-xl flex items-center gap-2 cursor-pointer transition-all"
            >
              <Save className="w-4 h-4" />
              <span>Save & Commit Command Information</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
