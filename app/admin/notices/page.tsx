'use client';

import React, { useState } from 'react';
import { useUnitData } from '../../../src/context/UnitDataContext';
import { AdminHeader } from '../../../components/admin/AdminHeader';
import { Notice } from '../../../src/types';
import {
  Bell,
  Plus,
  Trash2,
  Edit3,
  CheckCircle2,
  FileText,
  Pin,
  Search,
  X,
  Upload,
  Calendar,
} from 'lucide-react';

export default function AdminNoticesPage({
  onToggleSidebar = () => {},
}: {
  onToggleSidebar?: () => void;
}) {
  const { notices, addNotice, deleteNotice } = useUnitData();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingNotice, setEditingNotice] = useState<Notice | null>(null);

  // Form State
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<Notice['category']>('Parade Order');
  const [content, setContent] = useState('');
  const [isPinned, setIsPinned] = useState(false);
  const [issuedBy, setIssuedBy] = useState('Office of the CTO, GCEK Naval NCC');
  const [attachmentName, setAttachmentName] = useState('');
  const [attachmentSize, setAttachmentSize] = useState('450 KB');

  const filteredNotices = notices.filter((n) => {
    const matchQuery =
      n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      n.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchCat = selectedCategory === 'all' || n.category === selectedCategory;
    return matchQuery && matchCat;
  });

  const handleOpenAdd = () => {
    setEditingNotice(null);
    setTitle('');
    setCategory('Parade Order');
    setContent('');
    setIsPinned(false);
    setAttachmentName('');
    setIsModalOpen(true);
  };

  const handleOpenEdit = (n: Notice) => {
    setEditingNotice(n);
    setTitle(n.title);
    setCategory(n.category);
    setContent(n.content);
    setIsPinned(n.isPinned);
    setIssuedBy(n.issuedBy);
    setAttachmentName(n.attachmentName || '');
    setIsModalOpen(true);
  };

  const handleSaveNotice = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    if (editingNotice) {
      deleteNotice(editingNotice.id);
    }

    addNotice({
      id: editingNotice ? editingNotice.id : `not-${Date.now()}`,
      title: title.trim(),
      category,
      content: content.trim(),
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
      isPinned,
      issuedBy: issuedBy.trim(),
      attachmentName: attachmentName.trim() || undefined,
      attachmentSize: attachmentName.trim() ? attachmentSize : undefined,
    });

    setIsModalOpen(false);
  };

  return (
    <div className="flex-1 flex flex-col">
      <AdminHeader
        onToggleSidebar={onToggleSidebar}
        title="Notice Board Management"
        subtitle="Issue official parade orders, AINSC selection circulars, and PDF orders"
      />

      <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto w-full">
        {/* Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-72">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search orders..."
                className="w-full pl-9 pr-4 py-2 rounded-xl bg-black/40 border border-white/15 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-amber-400"
              />
            </div>

            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="p-2 rounded-xl bg-[#001933] border border-white/15 text-xs text-white"
            >
              <option value="all">All Categories</option>
              <option value="Parade Order">Parade Order</option>
              <option value="Camp Notification">Camp Notification</option>
              <option value="Selection List">Selection List</option>
              <option value="Class Timing">Class Timing</option>
              <option value="Circular">Circular</option>
            </select>
          </div>

          <button
            onClick={handleOpenAdd}
            className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-[#001428] font-bold text-xs flex items-center justify-center gap-2 shadow-lg transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Publish New Notice</span>
          </button>
        </div>

        {/* Notices Table / Grid */}
        <div className="grid grid-cols-1 gap-4">
          {filteredNotices.map((n) => (
            <div
              key={n.id}
              className={`p-5 rounded-2xl bg-[#001830] border transition-all ${
                n.isPinned ? 'border-amber-400/50 shadow-md' : 'border-white/10'
              } flex flex-col md:flex-row items-start md:items-center justify-between gap-4`}
            >
              <div className="space-y-1.5 max-w-3xl">
                <div className="flex items-center gap-2">
                  {n.isPinned && (
                    <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/40 text-[10px] font-mono flex items-center gap-1">
                      <Pin className="w-3 h-3" />
                      <span>Priority Order</span>
                    </span>
                  )}
                  <span className="px-2 py-0.5 rounded-full bg-sky-500/20 text-sky-300 border border-sky-400/30 text-[10px] font-mono">
                    {n.category}
                  </span>
                  <span className="text-[11px] text-slate-400 font-mono">{n.date}</span>
                </div>

                <h4 className="font-serif text-sm font-bold text-white">{n.title}</h4>
                <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">{n.content}</p>

                {n.attachmentName && (
                  <div className="pt-1 flex items-center gap-2 text-[11px] text-amber-300 font-mono">
                    <FileText className="w-3.5 h-3.5 text-amber-400" />
                    <span>{n.attachmentName} ({n.attachmentSize || 'PDF'})</span>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2 shrink-0 self-end md:self-center">
                <button
                  onClick={() => handleOpenEdit(n)}
                  className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-amber-300 transition-colors"
                  title="Edit notice"
                >
                  <Edit3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => {
                    if (window.confirm(`Delete notice "${n.title}"?`)) {
                      deleteNotice(n.id);
                    }
                  }}
                  className="p-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 transition-colors"
                  title="Delete notice"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}

          {filteredNotices.length === 0 && (
            <div className="p-12 text-center text-slate-400 rounded-2xl bg-[#001830] border border-white/10">
              No orders or notices match your search criteria.
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
                {editingNotice ? 'Edit Official Notice' : 'Publish Official Order / Circular'}
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Post instructions to the cadet battalion notice board.
              </p>
            </div>

            <form onSubmit={handleSaveNotice} className="space-y-4">
              <div className="space-y-1">
                <label className="text-slate-300 font-medium">Notice Title</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Parade Order: Republic Day Drill"
                  className="w-full p-2.5 rounded-xl bg-black/40 border border-white/20 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-slate-300 font-medium">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="w-full p-2.5 rounded-xl bg-[#001428] border border-white/20 text-white"
                  >
                    <option value="Parade Order">Parade Order</option>
                    <option value="Camp Notification">Camp Notification</option>
                    <option value="Selection List">Selection List</option>
                    <option value="Class Timing">Class Timing</option>
                    <option value="Circular">Circular</option>
                    <option value="Event Notice">Event Notice</option>
                  </select>
                </div>

                <div className="space-y-1 flex flex-col justify-end">
                  <label className="flex items-center gap-2 p-2.5 rounded-xl bg-black/40 border border-white/20 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isPinned}
                      onChange={(e) => setIsPinned(e.target.checked)}
                      className="accent-amber-400 w-4 h-4"
                    />
                    <span className="text-amber-300 font-semibold">Priority / Pinned Order</span>
                  </label>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-slate-300 font-medium">Notice Description / Instructions</label>
                <textarea
                  rows={4}
                  required
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Order instructions, uniform mandate, reporting time..."
                  className="w-full p-2.5 rounded-xl bg-black/40 border border-white/20 text-white leading-relaxed"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-300 font-medium">Issuing Authority</label>
                <input
                  type="text"
                  value={issuedBy}
                  onChange={(e) => setIssuedBy(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-black/40 border border-white/20 text-white"
                />
              </div>

              <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-2">
                <label className="text-slate-300 font-medium block">PDF Attachment Name (Optional)</label>
                <input
                  type="text"
                  value={attachmentName}
                  onChange={(e) => setAttachmentName(e.target.value)}
                  placeholder="e.g. Joining_Instructions_CATC_2026.pdf"
                  className="w-full p-2 rounded-lg bg-black/40 border border-white/20 text-white"
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
                  {editingNotice ? 'Update Notice' : 'Publish Order'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
