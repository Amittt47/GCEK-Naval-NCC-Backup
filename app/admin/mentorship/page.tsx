'use client';

import React, { useState, useEffect } from 'react';
import { AdminHeader } from '../../../components/admin/AdminHeader';
import {
  MessageSquare,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  XCircle,
  Mail,
  Phone,
  User,
  GraduationCap,
  Calendar,
  Send,
  Trash2,
  ShieldAlert,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import { ALUMNI_PROFILES } from '../../../src/data/mockData';

interface MentorshipRequestItem {
  id: string;
  cadetName: string;
  cadetEmail: string;
  cadetPhone?: string;
  cadetYearBranch?: string;
  alumniId: string;
  alumniName: string;
  subject: string;
  message: string;
  status: 'pending' | 'reviewed' | 'approved' | 'completed' | 'rejected';
  response?: string;
  createdAt: string;
}

const INITIAL_REQUESTS: MentorshipRequestItem[] = [
  {
    id: 'mr-001',
    cadetName: 'Cadet Ayush Mohanty',
    cadetEmail: 'ayush.mohanty@gcekbpatna.ac.in',
    cadetPhone: '+91 94370 12345',
    cadetYearBranch: '3rd Year B.Tech EE',
    alumniId: 'alum-01',
    alumniName: 'Sub Lieutenant Alok Kumar Patel',
    subject: 'SSB Naval Executive Branch Guidance & Medical Preparation',
    message:
      'Jai Hind Sir! I am preparing for the upcoming Indian Navy SSB through the NCC Special Entry scheme. Could you please advise on how to prepare for the GTO tasks and what specific naval current affairs I should focus on?',
    status: 'pending',
    createdAt: '2026-03-28T10:30:00Z',
  },
  {
    id: 'mr-002',
    cadetName: 'Cadet Subhashree Sahu',
    cadetEmail: 'subhashree.sahu@gcekbpatna.ac.in',
    cadetPhone: '+91 94371 67890',
    cadetYearBranch: '3rd Year B.Tech CSE',
    alumniId: 'alum-02',
    alumniName: 'Lt. Commander Smruti Rekha Jena',
    subject: 'Women in Naval Aviation & Technical Logistics Entry Strategy',
    message:
      'Respected Maam, Jai Hind! I aspire to join the Indian Navy in the ATC or Logistics Cadre. Having participated in RDC, I would appreciate your insights on balancing final year academics with SSB interview preparation.',
    status: 'approved',
    response:
      'Jai Hind Cadet Subhashree! Wonderful to hear about your RDC achievement. I have scheduled a Google Meet consultation for next Sunday. Focus on your discipline and fitness.',
    createdAt: '2026-03-24T14:15:00Z',
  },
  {
    id: 'mr-003',
    cadetName: 'Cadet Soumya Ranjan Panda',
    cadetEmail: 'soumya.panda@gcekbpatna.ac.in',
    cadetPhone: '+91 94372 34567',
    cadetYearBranch: '2nd Year B.Tech Mech',
    alumniId: 'alum-03',
    alumniName: 'Captain Biswajit Mohapatra',
    subject: 'Merchant Navy Deck Officer vs Indian Navy SSC Officer Transition',
    message:
      'Jai Hind Sir! I am looking for guidance on career pathways between Defence and Commercial maritime fleets, especially regarding the seamanship skills learned in GCEK Naval NCC.',
    status: 'reviewed',
    createdAt: '2026-03-20T09:00:00Z',
  },
];

export default function AdminMentorshipPage({
  onToggleSidebar = () => {},
}: {
  onToggleSidebar?: () => void;
}) {
  const [requests, setRequests] = useState<MentorshipRequestItem[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('gcek_naval_mentorship_requests');
        if (saved) return JSON.parse(saved);
      } catch (e) {}
    }
    return INITIAL_REQUESTS;
  });

  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRequest, setSelectedRequest] = useState<MentorshipRequestItem | null>(null);
  const [replyText, setReplyText] = useState('');

  const saveRequests = (updated: MentorshipRequestItem[]) => {
    setRequests(updated);
    try {
      localStorage.setItem('gcek_naval_mentorship_requests', JSON.stringify(updated));
    } catch (e) {}
  };

  const handleStatusChange = (
    id: string,
    newStatus: MentorshipRequestItem['status']
  ) => {
    const updated = requests.map((req) =>
      req.id === id ? { ...req, status: newStatus } : req
    );
    saveRequests(updated);
    if (selectedRequest && selectedRequest.id === id) {
      setSelectedRequest({ ...selectedRequest, status: newStatus });
    }
  };

  const handleSendResponse = (id: string) => {
    if (!replyText.trim()) return;
    const updated = requests.map((req) =>
      req.id === id
        ? {
            ...req,
            response: replyText.trim(),
            status: (req.status === 'pending' ? 'reviewed' : req.status) as MentorshipRequestItem['status'],
          }
        : req
    );
    saveRequests(updated);
    if (selectedRequest && selectedRequest.id === id) {
      setSelectedRequest({
        ...selectedRequest,
        response: replyText.trim(),
        status: (selectedRequest.status === 'pending' ? 'reviewed' : selectedRequest.status) as MentorshipRequestItem['status'],
      });
    }
    setReplyText('');
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Delete this mentorship request record?')) {
      const updated = requests.filter((r) => r.id !== id);
      saveRequests(updated);
      if (selectedRequest?.id === id) {
        setSelectedRequest(null);
      }
    }
  };

  const filteredRequests = requests.filter((req) => {
    const matchesFilter =
      filterStatus === 'all' ? true : req.status === filterStatus;
    const query = searchQuery.toLowerCase();
    const matchesSearch =
      req.cadetName.toLowerCase().includes(query) ||
      req.cadetEmail.toLowerCase().includes(query) ||
      req.alumniName.toLowerCase().includes(query) ||
      req.subject.toLowerCase().includes(query);
    return matchesFilter && matchesSearch;
  });

  const getStatusBadge = (status: MentorshipRequestItem['status']) => {
    switch (status) {
      case 'pending':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <Clock className="w-3 h-3" /> Pending Review
          </span>
        );
      case 'reviewed':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-sky-500/10 text-sky-400 border border-sky-500/20">
            <CheckCircle2 className="w-3 h-3" /> Reviewed
          </span>
        );
      case 'approved':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <CheckCircle2 className="w-3 h-3" /> Approved & Connected
          </span>
        );
      case 'completed':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20">
            <CheckCircle2 className="w-3 h-3" /> Session Completed
          </span>
        );
      case 'rejected':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-red-500/10 text-red-400 border border-red-500/20">
            <XCircle className="w-3 h-3" /> Declined
          </span>
        );
    }
  };

  return (
    <div className="space-y-6">
      <AdminHeader
        title="Cadet Mentorship Dispatch"
        subtitle="Review, route, and approve mentorship inquiries from GCEK Naval NCC cadets to commissioned and veteran alumni."
        onToggleSidebar={onToggleSidebar}
      />

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-[#001428] border border-amber-500/20 p-4 rounded-xl flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-400 font-mono uppercase">Total Inquiries</p>
            <p className="text-2xl font-bold font-serif text-white">{requests.length}</p>
          </div>
          <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
            <MessageSquare className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-[#001428] border border-amber-500/20 p-4 rounded-xl flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-400 font-mono uppercase">Pending Action</p>
            <p className="text-2xl font-bold font-serif text-amber-400">
              {requests.filter((r) => r.status === 'pending').length}
            </p>
          </div>
          <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
            <Clock className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-[#001428] border border-amber-500/20 p-4 rounded-xl flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-400 font-mono uppercase">Connected / Approved</p>
            <p className="text-2xl font-bold font-serif text-emerald-400">
              {requests.filter((r) => r.status === 'approved' || r.status === 'completed').length}
            </p>
          </div>
          <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
            <CheckCircle2 className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-[#001428] border border-amber-500/20 p-4 rounded-xl flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-400 font-mono uppercase">Active Alumni Mentors</p>
            <p className="text-2xl font-bold font-serif text-sky-400">
              {ALUMNI_PROFILES.filter((a) => a.availableForMentorship).length}
            </p>
          </div>
          <div className="w-10 h-10 rounded-lg bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400">
            <GraduationCap className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Main Grid: List + Detail View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Side: Search, Filter, Request List (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-[#001428] border border-amber-500/20 rounded-2xl p-4 space-y-3">
            {/* Search Input */}
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search by cadet, subject, or mentor..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#000d1a] border border-white/10 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400/50"
              />
            </div>

            {/* Filter Tabs */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              {['all', 'pending', 'reviewed', 'approved', 'completed', 'rejected'].map((st) => (
                <button
                  key={st}
                  onClick={() => setFilterStatus(st)}
                  className={`px-2.5 py-1 text-[11px] rounded-lg font-mono uppercase transition-colors cursor-pointer ${
                    filterStatus === st
                      ? 'bg-amber-400 text-slate-950 font-bold'
                      : 'bg-white/5 text-slate-300 hover:bg-white/10'
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>

          {/* List items */}
          <div className="space-y-3">
            {filteredRequests.length === 0 ? (
              <div className="bg-[#001428] border border-amber-500/10 rounded-2xl p-8 text-center text-slate-400 text-sm">
                No mentorship requests match current filters.
              </div>
            ) : (
              filteredRequests.map((req) => {
                const isSelected = selectedRequest?.id === req.id;
                return (
                  <div
                    key={req.id}
                    onClick={() => {
                      setSelectedRequest(req);
                      setReplyText(req.response || '');
                    }}
                    className={`bg-[#001428] border rounded-2xl p-4 transition-all cursor-pointer ${
                      isSelected
                        ? 'border-amber-400 shadow-lg shadow-amber-500/10 bg-[#001a33]'
                        : 'border-white/10 hover:border-amber-500/30'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-white text-sm">
                          {req.cadetName}
                        </span>
                        {req.cadetYearBranch && (
                          <span className="text-[10px] text-amber-300/80 font-mono bg-amber-400/10 px-1.5 py-0.5 rounded">
                            {req.cadetYearBranch}
                          </span>
                        )}
                      </div>
                      {getStatusBadge(req.status)}
                    </div>

                    <p className="text-xs text-amber-300 font-medium mb-1 line-clamp-1">
                      {req.subject}
                    </p>

                    <p className="text-xs text-slate-400 line-clamp-2 mb-3">
                      {req.message}
                    </p>

                    <div className="flex items-center justify-between text-[11px] text-slate-400 border-t border-white/5 pt-2">
                      <span className="flex items-center gap-1 text-slate-300">
                        <GraduationCap className="w-3 h-3 text-sky-400" />
                        {req.alumniName}
                      </span>
                      <span className="font-mono text-[10px] text-slate-400">
                        {new Date(req.createdAt).toLocaleDateString('en-IN', {
                          day: '2-digit',
                          month: 'short',
                        })}
                      </span>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Right Side: Detailed View & Action Panel (7 cols) */}
        <div className="lg:col-span-7">
          {selectedRequest ? (
            <div className="bg-[#001428] border border-amber-500/20 rounded-2xl p-6 space-y-6">
              {/* Detail Header */}
              <div className="flex flex-wrap items-start justify-between gap-4 border-b border-white/10 pb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-xl font-serif font-bold text-white">
                      {selectedRequest.subject}
                    </h3>
                  </div>
                  <div className="flex flex-wrap items-center gap-3 text-xs text-slate-300">
                    <span className="flex items-center gap-1 text-amber-300">
                      <User className="w-3.5 h-3.5" />
                      {selectedRequest.cadetName}
                    </span>
                    {selectedRequest.cadetYearBranch && (
                      <span className="text-slate-400">
                        • {selectedRequest.cadetYearBranch}
                      </span>
                    )}
                    <span className="text-slate-400">
                      • {new Date(selectedRequest.createdAt).toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleDelete(selectedRequest.id)}
                    className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors cursor-pointer"
                    title="Delete Request"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Cadet Contact & Target Alumni Card */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-[#000d1a] border border-white/5 rounded-xl p-3.5 space-y-2 text-xs">
                  <p className="text-[10px] font-mono uppercase text-slate-400 tracking-wider">
                    Cadet Contact Coordinates
                  </p>
                  <p className="text-white flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5 text-sky-400" />
                    <a
                      href={`mailto:${selectedRequest.cadetEmail}`}
                      className="hover:underline text-sky-300"
                    >
                      {selectedRequest.cadetEmail}
                    </a>
                  </p>
                  {selectedRequest.cadetPhone && (
                    <p className="text-white flex items-center gap-2">
                      <Phone className="w-3.5 h-3.5 text-emerald-400" />
                      <a
                        href={`tel:${selectedRequest.cadetPhone}`}
                        className="hover:underline text-emerald-300"
                      >
                        {selectedRequest.cadetPhone}
                      </a>
                    </p>
                  )}
                </div>

                <div className="bg-[#000d1a] border border-white/5 rounded-xl p-3.5 space-y-2 text-xs">
                  <p className="text-[10px] font-mono uppercase text-slate-400 tracking-wider">
                    Targeted Alumni Mentor
                  </p>
                  <p className="text-amber-300 font-semibold flex items-center gap-2">
                    <GraduationCap className="w-3.5 h-3.5 text-amber-400" />
                    {selectedRequest.alumniName}
                  </p>
                  <p className="text-slate-400 text-[11px]">
                    Available for SSB guidance, technical mentorship & fleet career counseling.
                  </p>
                </div>
              </div>

              {/* Inquiry Message */}
              <div className="space-y-2">
                <label className="text-xs font-mono uppercase text-slate-400 tracking-wider">
                  Cadet Message / Query
                </label>
                <div className="bg-[#000d1a] border border-white/10 rounded-xl p-4 text-slate-200 text-sm leading-relaxed whitespace-pre-wrap">
                  {selectedRequest.message}
                </div>
              </div>

              {/* Status Update Actions */}
              <div className="space-y-2">
                <label className="text-xs font-mono uppercase text-slate-400 tracking-wider">
                  Update Request Status
                </label>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => handleStatusChange(selectedRequest.id, 'pending')}
                    className={`px-3 py-1.5 text-xs rounded-lg font-medium transition-colors cursor-pointer ${
                      selectedRequest.status === 'pending'
                        ? 'bg-amber-400 text-slate-950 font-bold'
                        : 'bg-white/5 text-slate-300 hover:bg-white/10'
                    }`}
                  >
                    Pending
                  </button>
                  <button
                    onClick={() => handleStatusChange(selectedRequest.id, 'reviewed')}
                    className={`px-3 py-1.5 text-xs rounded-lg font-medium transition-colors cursor-pointer ${
                      selectedRequest.status === 'reviewed'
                        ? 'bg-sky-400 text-slate-950 font-bold'
                        : 'bg-white/5 text-slate-300 hover:bg-white/10'
                    }`}
                  >
                    Mark Reviewed
                  </button>
                  <button
                    onClick={() => handleStatusChange(selectedRequest.id, 'approved')}
                    className={`px-3 py-1.5 text-xs rounded-lg font-medium transition-colors cursor-pointer ${
                      selectedRequest.status === 'approved'
                        ? 'bg-emerald-400 text-slate-950 font-bold'
                        : 'bg-white/5 text-slate-300 hover:bg-white/10'
                    }`}
                  >
                    Approve & Facilitate Meet
                  </button>
                  <button
                    onClick={() => handleStatusChange(selectedRequest.id, 'completed')}
                    className={`px-3 py-1.5 text-xs rounded-lg font-medium transition-colors cursor-pointer ${
                      selectedRequest.status === 'completed'
                        ? 'bg-blue-400 text-slate-950 font-bold'
                        : 'bg-white/5 text-slate-300 hover:bg-white/10'
                    }`}
                  >
                    Session Completed
                  </button>
                  <button
                    onClick={() => handleStatusChange(selectedRequest.id, 'rejected')}
                    className={`px-3 py-1.5 text-xs rounded-lg font-medium transition-colors cursor-pointer ${
                      selectedRequest.status === 'rejected'
                        ? 'bg-red-400 text-slate-950 font-bold'
                        : 'bg-white/5 text-slate-300 hover:bg-white/10'
                    }`}
                  >
                    Decline Request
                  </button>
                </div>
              </div>

              {/* Officer / Mentor Dispatch Response */}
              <div className="space-y-3 pt-2 border-t border-white/10">
                <label className="text-xs font-mono uppercase text-slate-400 tracking-wider flex items-center justify-between">
                  <span>Officer Response / Routing Dispatch Note</span>
                  {selectedRequest.response && (
                    <span className="text-emerald-400 text-[10px] normal-case">
                      Response recorded
                    </span>
                  )}
                </label>
                <textarea
                  rows={4}
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder="Draft officer remarks, schedule details, Google Meet link, or guidance note for the cadet..."
                  className="w-full bg-[#000d1a] border border-white/10 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400/50"
                />
                <div className="flex justify-end">
                  <button
                    onClick={() => handleSendResponse(selectedRequest.id)}
                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 text-xs font-bold rounded-xl transition-all shadow-md cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    Save & Dispatch Note
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-[#001428] border border-amber-500/10 rounded-2xl p-12 text-center text-slate-400 flex flex-col items-center justify-center min-h-[420px]">
              <div className="w-16 h-16 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-4">
                <MessageSquare className="w-8 h-8" />
              </div>
              <h4 className="text-lg font-serif font-bold text-white mb-2">
                No Request Selected
              </h4>
              <p className="text-xs text-slate-400 max-w-sm">
                Select an incoming mentorship inquiry from the list on the left to inspect cadet coordinates, approve meetings, or dispatch guidance notes.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
