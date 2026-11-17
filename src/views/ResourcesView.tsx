'use client';

import React, { useState } from 'react';
import { CADET_RESOURCES } from '../data/mockData';
import { CadetResource } from '../types';
import {
  BookOpen,
  Download,
  FileText,
  Clock,
  Anchor,
  Compass,
  CheckCircle2,
  ExternalLink,
  ChevronRight,
} from 'lucide-react';

export const ResourcesView: React.FC = () => {
  const [selectedResource, setSelectedResource] = useState<CadetResource>(CADET_RESOURCES[0]);
  const [activeTab, setActiveTab] = useState<'notes' | 'semaphore' | 'knots'>('notes');
  const [downloadSuccessMessage, setDownloadSuccessMessage] = useState<string | null>(null);

  const phoneticAlphabet = [
    { letter: 'A', code: 'Alpha', morse: '• —' },
    { letter: 'B', code: 'Bravo', morse: '— • • •' },
    { letter: 'C', code: 'Charlie', morse: '— • — •' },
    { letter: 'D', code: 'Delta', morse: '— • •' },
    { letter: 'E', code: 'Echo', morse: '•' },
    { letter: 'F', code: 'Foxtrot', morse: '• • — •' },
    { letter: 'G', code: 'Golf', morse: '— — •' },
    { letter: 'H', code: 'Hotel', morse: '• • • •' },
    { letter: 'I', code: 'India', morse: '• •' },
    { letter: 'J', code: 'Juliet', morse: '• — — —' },
    { letter: 'K', code: 'Kilo', morse: '— • —' },
    { letter: 'L', code: 'Lima', morse: '• — • •' },
    { letter: 'M', code: 'Mike', morse: '— —' },
    { letter: 'N', code: 'November', morse: '— •' },
    { letter: 'O', code: 'Oscar', morse: '— — —' },
    { letter: 'P', code: 'Papa', morse: '• — — •' },
    { letter: 'Q', code: 'Quebec', morse: '— — • —' },
    { letter: 'R', code: 'Romeo', morse: '• — •' },
    { letter: 'S', code: 'Sierra', morse: '• • •' },
    { letter: 'T', code: 'Tango', morse: '—' },
    { letter: 'U', code: 'Uniform', morse: '• • —' },
    { letter: 'V', code: 'Victor', morse: '• • • —' },
    { letter: 'W', code: 'Whiskey', morse: '• — —' },
    { letter: 'X', code: 'X-ray', morse: '— • • —' },
    { letter: 'Y', code: 'Yankee', morse: '— • — —' },
    { letter: 'Z', code: 'Zulu', morse: '— — • •' },
  ];

  const knotsGuide = [
    {
      name: 'Bowline ("King of Knots")',
      use: 'Forms a secure fixed loop at the end of a rope. Does not slip or jam under tension; used in rescue slings and mooring.',
      howTo: 'Form a small loop ("rabbit hole"), bring the free end ("rabbit") up through the loop, around the standing part ("tree"), and back down through the loop.',
    },
    {
      name: 'Reef Knot (Square Knot)',
      use: 'Joining two ropes of strictly EQUAL diameter. Used for reefing sails and securing canvas. Not for heavy loads.',
      howTo: 'Right over Left and under; then Left over Right and under. Ensure both ends lie parallel.',
    },
    {
      name: 'Clove Hitch',
      use: 'Fastening a line temporarily to a post, bollard, or spar. Quick to cast on and release.',
      howTo: 'Pass rope around spar, cross over the first turn, make a second turn around spar, and tuck free end under the crossover.',
    },
    {
      name: 'Sheet Bend (Becket Bend)',
      use: 'Joining two ropes of UNEQUAL thickness. The thicker rope forms the bight, the thinner weaves through.',
      howTo: 'Make a bight in thick rope, pass thin rope up through bight, around both parts of thick rope, and tuck under itself.',
    },
    {
      name: 'Rolling Hitch',
      use: 'Securing a rope to another line or spar where pull is parallel along the spar without slipping.',
      howTo: 'Two turns around the spar in the direction of strain, followed by a half hitch on the other side.',
    },
  ];

  const handleDownload = (docName: string) => {
    setDownloadSuccessMessage(`Document "${docName}" verified and downloaded successfully.`);
    setTimeout(() => setDownloadSuccessMessage(null), 4000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 text-xs font-mono uppercase tracking-widest">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Naval Training Library</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-naval font-bold text-white tracking-tight">
          Cadet Resource Center
        </h1>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
          Comprehensive study notes, drill commands, seamanship knotting manuals, naval
          terminology, and uniform guidelines for B & C Certificate examinations.
        </p>
      </div>

      {downloadSuccessMessage && (
        <div className="p-4 rounded-xl bg-emerald-500/20 border border-emerald-400 text-emerald-300 text-xs flex items-center justify-between">
          <span>{downloadSuccessMessage}</span>
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
        </div>
      )}

      {/* Sub-Tabs: Notes vs Semaphore Chart vs Knots Guide */}
      <div className="flex items-center gap-2 border-b border-amber-500/20 pb-2">
        <button
          onClick={() => setActiveTab('notes')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold cursor-pointer ${
            activeTab === 'notes'
              ? 'bg-amber-500 text-[#001428]'
              : 'bg-white/5 hover:bg-white/10 text-slate-300'
          }`}
        >
          Specialized Study Modules
        </button>
        <button
          onClick={() => setActiveTab('knots')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold cursor-pointer ${
            activeTab === 'knots'
              ? 'bg-amber-500 text-[#001428]'
              : 'bg-white/5 hover:bg-white/10 text-slate-300'
          }`}
        >
          Seamanship Knots Masterclass
        </button>
        <button
          onClick={() => setActiveTab('semaphore')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold cursor-pointer ${
            activeTab === 'semaphore'
              ? 'bg-amber-500 text-[#001428]'
              : 'bg-white/5 hover:bg-white/10 text-slate-300'
          }`}
        >
          Naval Phonetic Alphabet & Morse
        </button>
      </div>

      {/* Mode 1: Specialized Notes Reader */}
      {activeTab === 'notes' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Resource List */}
          <div className="space-y-3">
            <span className="text-xs font-mono uppercase tracking-wider text-amber-400 block font-bold">
              Available Handbooks & Notes
            </span>
            {CADET_RESOURCES.map((res) => {
              const isSelected = selectedResource.id === res.id;
              return (
                <button
                  key={res.id}
                  onClick={() => setSelectedResource(res)}
                  className={`w-full p-4 rounded-xl text-left transition-all border cursor-pointer ${
                    isSelected
                      ? 'bg-[#002244] border-amber-400 text-white shadow-lg'
                      : 'bg-[#001830] border-white/10 text-slate-300 hover:bg-[#00203f]'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs text-amber-300 mb-1">
                    <span className="font-mono">{res.category}</span>
                    <span className="text-[11px] text-slate-400">{res.readTime}</span>
                  </div>
                  <h4 className="font-serif text-sm font-bold text-white mb-1.5">
                    {res.title}
                  </h4>
                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                    {res.summary}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Right Column: Active Document Reader */}
          <div className="lg:col-span-2 p-8 sm:p-10 rounded-3xl bg-[#001933] border border-amber-500/30 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
              <div>
                <span className="text-xs font-mono text-amber-300 uppercase tracking-wider font-bold">
                  {selectedResource.category} Manual
                </span>
                <h3 className="font-serif text-2xl font-bold text-white mt-1">
                  {selectedResource.title}
                </h3>
              </div>
              <button
                onClick={() => handleDownload(selectedResource.pdfDownloadName)}
                className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-[#001428] font-bold text-xs flex items-center gap-2 cursor-pointer shrink-0 shadow"
              >
                <Download className="w-4 h-4" />
                <span>Download PDF ({selectedResource.pdfDownloadSize})</span>
              </button>
            </div>

            {/* Markdown content container */}
            <div className="text-xs sm:text-sm text-slate-200 leading-relaxed space-y-4 whitespace-pre-line font-sans">
              {selectedResource.contentMarkdown}
            </div>
          </div>
        </div>
      )}

      {/* Mode 2: Knots Masterclass */}
      {activeTab === 'knots' && (
        <div className="space-y-6 animate-in fade-in duration-150">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {knotsGuide.map((knot, kIdx) => (
              <div
                key={kIdx}
                className="p-6 rounded-2xl bg-[#001a35] border border-amber-500/25 space-y-3 shadow-xl"
              >
                <div className="flex items-center gap-2 text-amber-400">
                  <Anchor className="w-5 h-5" />
                  <h4 className="font-serif text-base font-bold text-white">{knot.name}</h4>
                </div>
                <div className="text-xs text-slate-300 leading-relaxed">
                  <strong className="text-sky-300 block mb-1">Operational Use:</strong>
                  {knot.use}
                </div>
                <div className="text-xs text-slate-400 leading-relaxed pt-2 border-t border-white/10">
                  <strong className="text-amber-300 block mb-1">How to Tie:</strong>
                  {knot.howTo}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Mode 3: Phonetic Alphabet & Morse */}
      {activeTab === 'semaphore' && (
        <div className="p-8 rounded-3xl bg-[#001933] border border-sky-400/30 space-y-6 animate-in fade-in duration-150">
          <div>
            <h3 className="font-serif text-xl font-bold text-white">
              International Maritime Phonetic Alphabet & Morse Code
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Used in VHF Radio transmission, optical flashing light (Aldis Lamp), and flag signalling.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {phoneticAlphabet.map((item) => (
              <div
                key={item.letter}
                className="p-3.5 rounded-xl bg-white/5 border border-white/10 text-center space-y-1"
              >
                <div className="text-xl font-naval font-bold text-amber-400">{item.letter}</div>
                <div className="text-xs font-semibold text-white">{item.code}</div>
                <div className="text-[11px] font-mono text-sky-300">{item.morse}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
