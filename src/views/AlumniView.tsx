'use client';

import React, { useState } from 'react';
import { ALUMNI_PROFILES } from '../data/mockData';
import { AlumniProfile } from '../types';
import {
  Users,
  Shield,
  Search,
  CheckCircle2,
  Send,
  MessageSquare,
  Award,
  X,
  ExternalLink,
} from 'lucide-react';

export const AlumniView: React.FC = () => {
  const [alumniList, setAlumniList] = useState<AlumniProfile[]>(ALUMNI_PROFILES);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBranch, setSelectedBranch] = useState<string>('all');
  const [mentorshipModalAlum, setMentorshipModalAlum] = useState<AlumniProfile | null>(null);

  // Mentorship request form state
  const [cadetName, setCadetName] = useState('');
  const [cadetYear, setCadetYear] = useState('2nd Year B.Tech');
  const [targetEntry, setTargetEntry] = useState('Navy NCC Special Entry');
  const [cadetMessage, setCadetMessage] = useState('');
  const [requestSent, setRequestSent] = useState(false);

  const branches = ['all', 'Indian Navy', 'Indian Army', 'Coast Guard', 'PSU / Corporate', 'Merchant Navy'];

  const filteredAlumni = alumniList.filter((alum) => {
    const matchBranch = selectedBranch === 'all' || alum.serviceBranch === selectedBranch;
    const matchSearch =
      alum.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      alum.currentDesignation.toLowerCase().includes(searchQuery.toLowerCase()) ||
      alum.organization.toLowerCase().includes(searchQuery.toLowerCase());
    return matchBranch && matchSearch;
  });

  const handleSendMentorship = (e: React.FormEvent) => {
    e.preventDefault();
    setRequestSent(true);
    setTimeout(() => {
      setRequestSent(false);
      setMentorshipModalAlum(null);
      setCadetName('');
      setCadetMessage('');
    }, 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 text-xs font-mono uppercase tracking-widest">
          <Users className="w-3.5 h-3.5" />
          <span>Vanguard of GCEK</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-naval font-bold text-white tracking-tight">
          Alumni Network & Officers
        </h1>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
          Connecting current cadets with commissioned officers, defense scientists, and maritime
          commanders who began their journey on the GCEK parade ground.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 sm:p-5 rounded-2xl bg-[#001933] border border-amber-500/25 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Branch buttons */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
          {branches.map((b) => (
            <button
              key={b}
              onClick={() => setSelectedBranch(b)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                selectedBranch === b
                  ? 'bg-amber-500 text-[#001428] font-bold shadow'
                  : 'bg-white/5 hover:bg-white/10 text-slate-300'
              }`}
            >
              {b === 'all' ? 'All Branches' : b}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search alumni by name, rank..."
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-black/40 border border-white/10 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-amber-400"
          />
        </div>
      </div>

      {/* Alumni Directory Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredAlumni.map((alum) => (
          <div
            key={alum.id}
            className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#001f3f] to-[#001428] border border-amber-500/25 hover:border-amber-400/50 shadow-xl transition-all flex flex-col justify-between space-y-6"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs">
                <span className="font-mono text-amber-400 bg-amber-400/10 px-2.5 py-0.5 rounded border border-amber-400/30">
                  {alum.serviceBranch}
                </span>
                <span className="text-slate-400 font-mono">{alum.batch}</span>
              </div>

              <div>
                <h3 className="font-serif text-xl font-bold text-white mb-1">
                  {alum.name}
                </h3>
                <div className="text-xs text-sky-300 font-semibold">
                  {alum.currentDesignation} · {alum.organization}
                </div>
                <div className="text-xs text-slate-400 mt-0.5">
                  Degree: {alum.degreeBranch} | NCC Rank: {alum.nccRankHeld}
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 text-xs text-amber-200/90 font-medium">
                Milestone: {alum.notableAchievement}
              </div>

              <blockquote className="text-xs text-slate-300 leading-relaxed italic border-l-2 border-amber-400/70 pl-3">
                &ldquo;{alum.adviceForCadets}&rdquo;
              </blockquote>
            </div>

            <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs">
              {alum.availableForMentorship ? (
                <span className="text-emerald-400 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Available for 1-on-1 Mentorship</span>
                </span>
              ) : (
                <span className="text-slate-500">Currently deployed on duty</span>
              )}

              <button
                onClick={() => setMentorshipModalAlum(alum)}
                className="px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-[#001428] font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow transition-colors"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Request Mentorship</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Mentorship Request Modal */}
      {mentorshipModalAlum && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="relative w-full max-w-lg bg-[#001830] border-2 border-amber-400/50 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
            <button
              onClick={() => setMentorshipModalAlum(null)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-lg bg-white/5"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <span className="text-xs font-mono text-amber-300 uppercase tracking-widest">
                Direct Cadet Mentorship
              </span>
              <h2 className="font-serif text-xl font-bold text-white mt-0.5">
                Request Guidance from {mentorshipModalAlum.name}
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                {mentorshipModalAlum.currentDesignation}, {mentorshipModalAlum.organization}
              </p>
            </div>

            {requestSent ? (
              <div className="p-8 text-center text-emerald-400 space-y-2">
                <CheckCircle2 className="w-12 h-12 mx-auto" />
                <div className="font-serif text-lg font-bold">Mentorship Request Dispatched!</div>
                <p className="text-xs text-slate-300">
                  Your request has been forwarded to the alumni portal with CTO verification.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSendMentorship} className="space-y-4 text-xs">
                <div className="space-y-1">
                  <label className="text-slate-300 font-medium block">Cadet Full Name & Roll No</label>
                  <input
                    type="text"
                    required
                    value={cadetName}
                    onChange={(e) => setCadetName(e.target.value)}
                    placeholder="e.g. Leading Cadet Debasish (220110...)"
                    className="w-full p-2.5 rounded-xl bg-black/40 border border-white/20 text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-slate-300 font-medium block">Current Year</label>
                    <select
                      value={cadetYear}
                      onChange={(e) => setCadetYear(e.target.value)}
                      className="w-full p-2.5 rounded-xl bg-[#001428] border border-white/20 text-white focus:outline-none focus:border-amber-400"
                    >
                      <option>1st Year B.Tech (NC)</option>
                      <option>2nd Year B.Tech (LC)</option>
                      <option>3rd Year B.Tech (POC/JUO)</option>
                      <option>4th Year B.Tech (SCC)</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-slate-300 font-medium block">Target Defence Entry</label>
                    <select
                      value={targetEntry}
                      onChange={(e) => setTargetEntry(e.target.value)}
                      className="w-full p-2.5 rounded-xl bg-[#001428] border border-white/20 text-white focus:outline-none focus:border-amber-400"
                    >
                      <option>Navy NCC Special Entry</option>
                      <option>CDS (IMA / INA / AFA)</option>
                      <option>AFCAT Entry</option>
                      <option>SSC Tech Indian Army</option>
                      <option>Coast Guard Assistant Commandant</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-slate-300 font-medium block">Specific Guidance or Questions</label>
                  <textarea
                    rows={3}
                    required
                    value={cadetMessage}
                    onChange={(e) => setCadetMessage(e.target.value)}
                    placeholder="Describe your current preparation stage, SSB obstacles, or technical branch questions..."
                    className="w-full p-2.5 rounded-xl bg-black/40 border border-white/20 text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-[#001428] font-bold text-xs shadow-lg cursor-pointer transition-colors"
                >
                  Submit Mentorship Request
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
