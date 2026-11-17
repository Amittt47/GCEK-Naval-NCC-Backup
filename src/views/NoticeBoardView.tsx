'use client';

import React, { useState, useMemo } from 'react';
import { Notice } from '../types';
import { INITIAL_NOTICES } from '../data/mockData';
import {
  Bell,
  Search,
  Pin,
  FileText,
  Download,
  Calendar,
  Plus,
  X,
  CheckCircle2,
  Filter,
} from 'lucide-react';

interface NoticeBoardViewProps {
  onAdminOpen?: () => void;
}

export const NoticeBoardView: React.FC<NoticeBoardViewProps> = () => {
  const [notices, setNotices] = useState<Notice[]>(INITIAL_NOTICES);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeNoticeModal, setActiveNoticeModal] = useState<Notice | null>(null);

  const categories = [
    { id: 'all', label: 'All Orders' },
    { id: 'Parade Order', label: 'Parade Orders' },
    { id: 'Camp Notification', label: 'Camp Notifications' },
    { id: 'Selection List', label: 'Selection Lists' },
    { id: 'Class Timing', label: 'Class Timings' },
    { id: 'Circular', label: 'Circulars' },
  ];

  const filteredNotices = useMemo(() => {
    return notices.filter((n) => {
      const matchCat = selectedCategory === 'all' || n.category === selectedCategory;
      const matchQuery =
        n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        n.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        n.issuedBy.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchQuery;
    });
  }, [notices, selectedCategory, searchQuery]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-8">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 text-xs font-mono uppercase tracking-widest">
            <Bell className="w-3.5 h-3.5" />
            <span>Official Unit Gazettes</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-naval font-bold text-white tracking-tight">
            Parade Orders & Notice Board
          </h1>
          <p className="text-xs sm:text-sm text-slate-300">
            Authoritative daily muster orders, camp selection lists, and training circulars for GCEK Naval Cadets.
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 sm:p-5 rounded-2xl bg-[#001933] border border-amber-500/25 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Category tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-amber-500 text-[#001428] font-bold shadow'
                  : 'bg-white/5 hover:bg-white/10 text-slate-300'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Search input */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search orders, circulars..."
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-black/40 border border-white/10 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-amber-400"
          />
        </div>
      </div>

      {/* Notices List */}
      <div className="space-y-4">
        {filteredNotices.length === 0 ? (
          <div className="p-12 text-center text-slate-400 rounded-2xl bg-[#001830] border border-white/10 text-sm">
            No notices found matching your criteria.
          </div>
        ) : (
          filteredNotices.map((notice) => (
            <div
              key={notice.id}
              className={`p-6 rounded-2xl border transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-6 ${
                notice.isPinned
                  ? 'bg-gradient-to-r from-[#001f3f] to-[#00172e] border-amber-400/50 shadow-lg'
                  : 'bg-[#001830] border-white/10 hover:border-amber-400/30'
              }`}
            >
              <div className="space-y-2 max-w-3xl">
                <div className="flex flex-wrap items-center gap-2.5 text-xs">
                  {notice.isPinned && (
                    <span className="flex items-center gap-1 text-[11px] font-mono text-amber-300 bg-amber-400/15 px-2 py-0.5 rounded border border-amber-400/30 font-bold">
                      <Pin className="w-3 h-3 rotate-45" />
                      PINNED
                    </span>
                  )}
                  <span className="px-2.5 py-0.5 rounded bg-sky-500/10 text-sky-300 font-mono text-[11px] border border-sky-400/20">
                    {notice.category}
                  </span>
                  <span className="text-slate-400 font-mono text-[11px] flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-slate-500" />
                    {notice.date}
                  </span>
                </div>

                <h3 className="font-serif text-lg font-bold text-white hover:text-amber-300 transition-colors">
                  {notice.title}
                </h3>

                <p className="text-xs text-slate-300 leading-relaxed line-clamp-2">
                  {notice.content}
                </p>

                <div className="text-[11px] text-slate-400 pt-1">
                  Issued By: <span className="text-amber-300/80">{notice.issuedBy}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0 self-stretch md:self-auto justify-end">
                <button
                  onClick={() => setActiveNoticeModal(notice)}
                  className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/15 text-xs font-semibold text-white flex items-center gap-1.5 cursor-pointer"
                >
                  <FileText className="w-3.5 h-3.5 text-sky-400" />
                  <span>Read Order</span>
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Notice Reader Modal */}
      {activeNoticeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="relative w-full max-w-2xl bg-[#001933] border-2 border-amber-500/50 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
            <button
              onClick={() => setActiveNoticeModal(null)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-lg bg-white/5"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-2 border-b border-white/10 pb-4 pr-10">
              <div className="flex items-center gap-2 text-xs font-mono text-amber-300">
                <span>{activeNoticeModal.category}</span>
                <span>·</span>
                <span>{activeNoticeModal.date}</span>
              </div>
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-white">
                {activeNoticeModal.title}
              </h2>
              <div className="text-xs text-slate-400">
                Issued By: {activeNoticeModal.issuedBy}
              </div>
            </div>

            <div className="text-xs sm:text-sm text-slate-200 leading-relaxed whitespace-pre-line bg-black/30 p-5 rounded-2xl border border-white/10">
              {activeNoticeModal.content}
            </div>

            {activeNoticeModal.attachmentName && (
              <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2.5">
                  <FileText className="w-4 h-4 text-amber-400" />
                  <div>
                    <div className="font-medium text-white">{activeNoticeModal.attachmentName}</div>
                    <div className="text-[11px] text-slate-400">{activeNoticeModal.attachmentSize}</div>
                  </div>
                </div>
                <button
                  onClick={() => alert(`Downloaded file: ${activeNoticeModal.attachmentName}`)}
                  className="px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-[#001428] font-bold text-xs flex items-center gap-1 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
