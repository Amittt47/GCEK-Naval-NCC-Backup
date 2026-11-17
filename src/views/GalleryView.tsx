'use client';

import React, { useState } from 'react';
import { useUnitData } from '../context/UnitDataContext';
import { GalleryItem } from '../types';
import {
  Image as ImageIcon,
  X,
  Anchor,
  Download,
} from 'lucide-react';

export const GalleryView: React.FC = () => {
  const { galleryItems } = useUnitData();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedYear, setSelectedYear] = useState<string>('all');
  const [activeMedia, setActiveMedia] = useState<GalleryItem | null>(null);

  const categories = [
    'all',
    'Parade',
    'Camps',
    'Social Activities',
    'Independence Day',
    'Republic Day',
    'Seamanship Training',
    'Competitions',
  ];

  const years = ['all', '2026', '2025', '2024', '2023'];

  const filteredItems = galleryItems.filter((item) => {
    const matchCat = selectedCategory === 'all' || item.category === selectedCategory;
    const matchYear = selectedYear === 'all' || item.year.toString() === selectedYear;
    return matchCat && matchYear;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-8">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 text-xs font-mono uppercase tracking-widest">
            <ImageIcon className="w-3.5 h-3.5" />
            <span>Naval Archives</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-naval font-bold text-white tracking-tight">
            Visual Gallery & Activity Photos
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">
            Moments of pride, rigors of boat pulling, ceremonial drill precision, and community
            service through the lens of GCEK Naval NCC cadets.
          </p>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="p-4 sm:p-5 rounded-2xl bg-[#001933] border border-amber-500/25 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Category pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setSelectedCategory(c)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                selectedCategory === c
                  ? 'bg-amber-500 text-[#001428] font-bold shadow'
                  : 'bg-white/5 hover:bg-white/10 text-slate-300'
              }`}
            >
              {c === 'all' ? 'All Visuals' : c}
            </button>
          ))}
        </div>

        {/* Year filter */}
        <div className="flex items-center gap-1 bg-black/30 p-1 rounded-lg border border-white/10 self-end md:self-auto">
          {years.map((y) => (
            <button
              key={y}
              onClick={() => setSelectedYear(y)}
              className={`px-3 py-1 text-xs rounded-md transition-colors cursor-pointer capitalize ${
                selectedYear === y
                  ? 'bg-sky-500 text-white font-semibold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {y}
            </button>
          ))}
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            onClick={() => setActiveMedia(item)}
            className="group rounded-2xl overflow-hidden bg-[#001830] border border-amber-500/20 hover:border-amber-400/50 transition-all cursor-pointer shadow-lg flex flex-col justify-between"
          >
            {/* Visual Canvas Representation */}
            <div className="relative aspect-4/3 bg-gradient-to-br from-[#002244] via-[#00152b] to-[#001020] flex flex-col justify-between overflow-hidden">
              {item.imageUrl ? (
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              ) : (
                <div className="p-6 h-full flex flex-col justify-between">
                  <div className="flex items-center justify-between z-10 text-xs">
                    <span className="font-mono text-[11px] text-amber-300 bg-black/50 px-2 py-0.5 rounded border border-white/10 backdrop-blur-sm">
                      {item.year}
                    </span>
                    <span className="p-1 rounded bg-black/50 text-white">
                      <ImageIcon className="w-3.5 h-3.5 text-sky-400" />
                    </span>
                  </div>

                  <div className="flex items-center justify-center my-auto opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all">
                    <Anchor className="w-12 h-12 text-amber-400/60" />
                  </div>

                  <div className="z-10 text-left">
                    <span className="text-[10px] uppercase font-mono tracking-widest text-sky-300 block">
                      {item.category}
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Description footer */}
            <div className="p-4 space-y-1 relative">
              <span className="text-[10px] uppercase font-mono tracking-wider text-amber-300 block">
                {item.category} · {item.year}
              </span>
              <h4 className="font-serif text-sm font-bold text-white group-hover:text-amber-300 transition-colors line-clamp-1">
                {item.title}
              </h4>
              <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                {item.caption}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {activeMedia && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
          <div className="relative w-full max-w-3xl bg-[#001830] border-2 border-amber-500/50 rounded-3xl overflow-hidden shadow-2xl space-y-4">
            <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
              {activeMedia.imageUrl && (
                <a
                  href={activeMedia.imageUrl}
                  target="_blank"
                  rel="noreferrer"
                  download
                  className="p-2 text-slate-300 hover:text-white rounded-lg bg-black/60 hover:bg-black/80 cursor-pointer flex items-center gap-1 text-xs"
                  title="Open / Download image"
                >
                  <Download className="w-4 h-4" />
                </a>
              )}
              <button
                onClick={() => setActiveMedia(null)}
                className="p-2 text-slate-300 hover:text-white rounded-lg bg-black/60 hover:bg-black/80 cursor-pointer"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Preview Frame */}
            <div className="aspect-16/9 bg-gradient-to-b from-[#002244] to-[#001020] flex flex-col items-center justify-center overflow-hidden relative">
              {activeMedia.imageUrl ? (
                <img
                  src={activeMedia.imageUrl}
                  alt={activeMedia.title}
                  className="w-full h-full object-contain"
                />
              ) : (
                <div className="text-center p-8">
                  <Anchor className="w-20 h-20 text-amber-400/50 animate-pulse mx-auto" />
                  <div className="mt-4 font-serif text-xl font-bold text-white max-w-lg">
                    {activeMedia.title}
                  </div>
                  <div className="text-xs font-mono text-amber-300 mt-1">
                    {activeMedia.category} · {activeMedia.year}
                  </div>
                </div>
              )}
            </div>

            {/* Details */}
            <div className="p-6 pt-2 space-y-2">
              <div className="font-serif text-lg font-bold text-white">{activeMedia.title}</div>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                {activeMedia.caption}
              </p>
              <div className="text-[11px] text-slate-400 pt-2 border-t border-white/10 flex justify-between">
                <span>GCEK Naval NCC Activity Archives</span>
                <span className="font-mono text-amber-300">Category: {activeMedia.category} ({activeMedia.year})</span>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

