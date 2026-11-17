'use client';

import React, { useState } from 'react';
import { MAGAZINE_ARTICLES } from '../data/mockData';
import { MagazineArticle } from '../types';
import {
  FileText,
  Clock,
  User,
  Plus,
  X,
  CheckCircle2,
  Calendar,
  Share2,
  BookOpen,
} from 'lucide-react';

export const MagazineView: React.FC = () => {
  const [articles, setArticles] = useState<MagazineArticle[]>(MAGAZINE_ARTICLES);
  const [selectedArticle, setSelectedArticle] = useState<MagazineArticle>(MAGAZINE_ARTICLES[0]);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);

  // Submission Form State
  const [subTitle, setSubTitle] = useState('');
  const [subAuthor, setSubAuthor] = useState('');
  const [subRank, setSubRank] = useState('Cadet (NC)');
  const [subCategory, setSubCategory] = useState<MagazineArticle['category']>('Cadet Article');
  const [subContent, setSubContent] = useState('');
  const [subSuccess, setSubSuccess] = useState(false);

  const handleSubmitArticle = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subTitle.trim() || !subContent.trim()) return;

    const newArt: MagazineArticle = {
      id: `mag-${Date.now()}`,
      title: subTitle.trim(),
      author: subAuthor.trim() || 'Cadet',
      authorRank: subRank,
      category: subCategory,
      publishedDate: 'Oct 2026',
      readTime: '4 min read',
      summary: subContent.slice(0, 150) + '...',
      content: [subContent],
    };

    setArticles([newArt, ...articles]);
    setSelectedArticle(newArt);
    setSubSuccess(true);
    setTimeout(() => {
      setSubSuccess(false);
      setIsSubmitModalOpen(false);
      setSubTitle('');
      setSubContent('');
    }, 1500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-8">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 text-xs font-mono uppercase tracking-widest">
            <FileText className="w-3.5 h-3.5" />
            <span>Annual Journal</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-naval font-bold text-white tracking-tight">
            The Naval Vanguard
          </h1>
          <p className="text-xs sm:text-sm text-slate-300">
            Cadet essays, strategic defense analyses, camp journals, and inspirational reflections from GCEK.
          </p>
        </div>

        <button
          onClick={() => setIsSubmitModalOpen(true)}
          className="px-5 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-[#001428] font-bold text-xs flex items-center gap-2 cursor-pointer shadow-lg self-start md:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Submit Cadet Essay</span>
        </button>
      </div>

      {/* Main Layout: Article Reader & Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Magazine Issue Articles */}
        <div className="space-y-4">
          <span className="text-xs font-mono uppercase tracking-wider text-amber-400 block font-bold">
            Current Edition Dispatch
          </span>
          {articles.map((art) => {
            const isSelected = selectedArticle.id === art.id;
            return (
              <div
                key={art.id}
                onClick={() => setSelectedArticle(art)}
                className={`p-5 rounded-2xl cursor-pointer transition-all border ${
                  isSelected
                    ? 'bg-[#002244] border-amber-400 text-white shadow-xl'
                    : 'bg-[#001830] border-white/10 text-slate-300 hover:bg-[#001e3d]'
                }`}
              >
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="font-mono text-amber-400 text-[11px] font-semibold">
                    {art.category}
                  </span>
                  <span className="text-[11px] text-slate-400">{art.readTime}</span>
                </div>
                <h3 className="font-serif text-base font-bold text-white mb-2 leading-snug">
                  {art.title}
                </h3>
                <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                  {art.summary}
                </p>
                <div className="text-[11px] text-sky-300 font-medium pt-3 mt-2 border-t border-white/10">
                  By {art.author} ({art.authorRank})
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Column: Full Reader Mode */}
        <div className="lg:col-span-2 p-8 sm:p-12 rounded-3xl bg-[#001933] border-2 border-amber-500/30 space-y-6">
          <div className="space-y-3 border-b border-white/10 pb-6">
            <div className="flex flex-wrap items-center gap-3 text-xs text-amber-300 font-mono">
              <span className="px-2.5 py-0.5 rounded bg-amber-400/10 border border-amber-400/30 uppercase">
                {selectedArticle.category}
              </span>
              <span>Published {selectedArticle.publishedDate}</span>
              <span>·</span>
              <span>{selectedArticle.readTime}</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-naval font-bold text-white tracking-tight leading-tight">
              {selectedArticle.title}
            </h2>

            <div className="text-xs text-sky-200 font-medium">
              Authored by: <strong className="text-white">{selectedArticle.author}</strong> (
              {selectedArticle.authorRank})
            </div>
          </div>

          {/* Article Prose */}
          <div className="space-y-5 text-xs sm:text-sm text-slate-200 leading-relaxed font-sans">
            {selectedArticle.content.map((paragraph, pIdx) => (
              <p key={pIdx}>{paragraph}</p>
            ))}
          </div>

          <div className="pt-6 border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
            <span>The Naval Vanguard · GCEK Naval NCC Annual Publication</span>
            <span className="font-mono text-amber-400">Verified Peer Reviewed</span>
          </div>
        </div>
      </div>

      {/* Submission Modal */}
      {isSubmitModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="relative w-full max-w-xl bg-[#001933] border-2 border-amber-400/50 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
            <button
              onClick={() => setIsSubmitModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-lg bg-white/5"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <h2 className="font-serif text-xl font-bold text-white">
                Submit Cadet Article / Camp Essay
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Share your naval camp experiences, leadership lessons, or strategic reflections.
              </p>
            </div>

            {subSuccess ? (
              <div className="p-8 text-center text-emerald-400 space-y-2">
                <CheckCircle2 className="w-12 h-12 mx-auto" />
                <div className="font-serif text-lg font-bold">Article Submitted for Review!</div>
              </div>
            ) : (
              <form onSubmit={handleSubmitArticle} className="space-y-4 text-xs">
                <div className="space-y-1">
                  <label className="text-slate-300 font-medium block">Essay Title</label>
                  <input
                    type="text"
                    required
                    value={subTitle}
                    onChange={(e) => setSubTitle(e.target.value)}
                    placeholder="e.g. Navigating the Bay of Bengal: Reflections on Sea Sortie"
                    className="w-full p-2.5 rounded-xl bg-black/40 border border-white/20 text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-slate-300 font-medium block">Author Name</label>
                    <input
                      type="text"
                      required
                      value={subAuthor}
                      onChange={(e) => setSubAuthor(e.target.value)}
                      placeholder="e.g. Cadet Priyabrata"
                      className="w-full p-2.5 rounded-xl bg-black/40 border border-white/20 text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-slate-300 font-medium block">Category</label>
                    <select
                      value={subCategory}
                      onChange={(e) => setSubCategory(e.target.value as any)}
                      className="w-full p-2.5 rounded-xl bg-[#001428] border border-white/20 text-white focus:outline-none focus:border-amber-400"
                    >
                      <option value="Cadet Article">Cadet Article</option>
                      <option value="Camp Experience">Camp Experience</option>
                      <option value="Leadership Lessons">Leadership Lessons</option>
                      <option value="Defence News">Defence News</option>
                      <option value="Motivational Story">Motivational Story</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-slate-300 font-medium block">Article Content</label>
                  <textarea
                    rows={6}
                    required
                    value={subContent}
                    onChange={(e) => setSubContent(e.target.value)}
                    placeholder="Draft your essay here..."
                    className="w-full p-2.5 rounded-xl bg-black/40 border border-white/20 text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-[#001428] font-bold text-xs shadow-lg cursor-pointer transition-colors"
                >
                  Submit for Editorial Review
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
