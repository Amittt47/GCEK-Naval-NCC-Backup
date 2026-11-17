'use client';

import React, { useState } from 'react';
import { useUnitData } from '../../../src/context/UnitDataContext';
import { AdminHeader } from '../../../components/admin/AdminHeader';
import { GalleryItem } from '../../../src/types';
import {
  Image as ImageIcon,
  Plus,
  Trash2,
  Edit3,
  X,
  Upload,
} from 'lucide-react';

export default function AdminGalleryPage({
  onToggleSidebar = () => {},
}: {
  onToggleSidebar?: () => void;
}) {
  const { galleryItems, addGalleryItem, updateGalleryItem, deleteGalleryItem } = useUnitData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<GalleryItem | null>(null);

  // Form State
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Parade');
  const [year, setYear] = useState<number>(2026);
  const [caption, setCaption] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const categories = [
    'Parade',
    'Camps',
    'Social Activities',
    'Independence Day',
    'Republic Day',
    'Seamanship Training',
    'Competitions',
  ];

  const handleOpenAdd = () => {
    setEditingItem(null);
    setTitle('');
    setCategory('Parade');
    setYear(2026);
    setCaption('');
    setImageUrl('');
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item: GalleryItem) => {
    setEditingItem(item);
    setTitle(item.title);
    setCategory(item.category);
    setYear(item.year);
    setCaption(item.caption);
    setImageUrl(item.imageUrl || '');
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    if (editingItem) {
      updateGalleryItem(editingItem.id, {
        title: title.trim(),
        category,
        year: Number(year),
        caption: caption.trim(),
        imageUrl: imageUrl.trim() || undefined,
      });
    } else {
      addGalleryItem({
        id: `gal-${Date.now()}`,
        title: title.trim(),
        category,
        year: Number(year),
        caption: caption.trim() || 'Naval training activity at GCEK.',
        type: 'image',
        imageUrl: imageUrl.trim() || undefined,
      });
    }

    setIsModalOpen(false);
  };

  return (
    <div className="flex-1 flex flex-col">
      <AdminHeader
        onToggleSidebar={onToggleSidebar}
        title="Activity Gallery Management"
        subtitle="Upload and manage drill, camp, whaler pulling, and ceremonial photos"
      />

      <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto w-full">
        {/* Top Controls */}
        <div className="flex items-center justify-between gap-4">
          <div>
            <h3 className="font-serif text-lg font-bold text-white flex items-center gap-2">
              <ImageIcon className="w-5 h-5 text-amber-400" />
              <span>Activity Archives ({galleryItems.length} Photographs)</span>
            </h3>
          </div>

          <button
            onClick={handleOpenAdd}
            className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-[#001428] font-bold text-xs flex items-center gap-2 shadow-lg cursor-pointer transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Upload New Photo</span>
          </button>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {galleryItems.map((item) => (
            <div
              key={item.id}
              className="rounded-2xl overflow-hidden bg-[#001830] border border-amber-500/20 hover:border-amber-400/50 transition-all flex flex-col justify-between shadow-lg"
            >
              <div className="aspect-4/3 bg-black overflow-hidden relative">
                {item.imageUrl ? (
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-500">
                    <ImageIcon className="w-8 h-8" />
                  </div>
                )}
                <span className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-sm text-[10px] font-mono text-amber-300 border border-white/10">
                  {item.category} · {item.year}
                </span>
              </div>

              <div className="p-4 space-y-2">
                <h4 className="font-serif text-xs font-bold text-white line-clamp-1">
                  {item.title}
                </h4>
                <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                  {item.caption}
                </p>

                <div className="pt-2 border-t border-white/10 flex items-center justify-end gap-2">
                  <button
                    onClick={() => handleOpenEdit(item)}
                    className="p-1 text-slate-400 hover:text-amber-300"
                    title="Edit"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => {
                      if (window.confirm(`Delete photo "${item.title}"?`)) {
                        deleteGalleryItem(item.id);
                      }
                    }}
                    className="p-1 text-slate-400 hover:text-red-400"
                    title="Delete"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
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
                {editingItem ? 'Edit Activity Photograph' : 'Upload Activity Photograph'}
              </h2>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div className="space-y-1">
                <label className="text-slate-300 font-medium">Activity Title</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Whaler Pulling Regatta at Chilika"
                  className="w-full p-2.5 rounded-xl bg-black/40 border border-white/20 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-slate-300 font-medium">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-[#001428] border border-white/20 text-white"
                  >
                    {categories.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-slate-300 font-medium">Year</label>
                  <input
                    type="number"
                    value={year}
                    onChange={(e) => setYear(Number(e.target.value))}
                    className="w-full p-2.5 rounded-xl bg-black/40 border border-white/20 text-white"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-slate-300 font-medium">Caption & Details</label>
                <textarea
                  rows={2}
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  placeholder="Location, cadets present..."
                  className="w-full p-2.5 rounded-xl bg-black/40 border border-white/20 text-white"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-300 font-medium">Image URL</label>
                <input
                  type="text"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="https://images.unsplash.com/... or storage link"
                  className="w-full p-2.5 rounded-xl bg-black/40 border border-white/20 text-white"
                />
                {imageUrl && (
                  <div className="w-16 h-16 rounded border border-amber-400 overflow-hidden mt-2">
                    <img src={imageUrl} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                )}
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
                  Save Photo
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
