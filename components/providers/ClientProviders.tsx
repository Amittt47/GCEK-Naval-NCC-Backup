'use client';

import React, { useState, useEffect } from 'react';
import { UnitDataProvider, useUnitData } from '../../src/context/UnitDataContext';
import { UnitCustomizerModal } from '../../src/components/UnitCustomizerModal';
import { GlobalSearchModal } from '../ui/GlobalSearchModal';
import { ArrowUp, Edit3 } from 'lucide-react';
import { useRouter } from 'next/navigation';

function CustomizerMount() {
  const { isCustomizerOpen, customizerTab, closeCustomizer, openCustomizer } = useUnitData();
  return (
    <>
      <UnitCustomizerModal
        isOpen={isCustomizerOpen}
        onClose={closeCustomizer}
        defaultTab={customizerTab}
      />
      {/* Floating Quick Edit Trigger for easy access on any page */}
      <button
        onClick={() => openCustomizer('co')}
        className="fixed bottom-6 left-6 z-40 px-3.5 py-2 rounded-full bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-[#001428] font-bold text-xs shadow-[0_4px_20px_rgba(212,175,55,0.4)] transition-all duration-200 cursor-pointer border border-amber-300 flex items-center gap-1.5"
        title="Full Access: Edit CO Lt. M Darshan, ANO/CTO, Cadet Info & Achievements, Camps, Calendar"
      >
        <Edit3 className="w-3.5 h-3.5" />
        <span>⚡ Edit Portal</span>
      </button>
    </>
  );
}

export function ClientProviders({ children }: { children: React.ReactNode }) {
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const router = useRouter();

  // Scroll listener for back to top button
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Global keyboard shortcut to open search with '/' or 'Cmd+K'
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.key === '/' || ((e.ctrlKey || e.metaKey) && e.key === 'k')) && !searchModalOpen) {
        const tag = (e.target as HTMLElement).tagName.toLowerCase();
        if (tag !== 'input' && tag !== 'textarea') {
          e.preventDefault();
          setSearchModalOpen(true);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [searchModalOpen]);

  const handleSelectResult = (tab: string, extraId?: string) => {
    setSearchModalOpen(false);
    if (tab === 'home') router.push('/');
    else if (tab === 'camps' && extraId) router.push(`/camps#${extraId}`);
    else router.push(`/${tab}`);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <UnitDataProvider>
      {children}
      <CustomizerMount />

      {/* Global Live Search Dialog */}
      <GlobalSearchModal
        isOpen={searchModalOpen}
        onClose={() => setSearchModalOpen(false)}
        onSelectResult={handleSelectResult}
      />

      {/* Back to Top floating button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-40 p-3 rounded-full bg-amber-500 hover:bg-amber-400 text-[#001428] shadow-2xl transition-all duration-200 cursor-pointer border border-amber-300"
          aria-label="Scroll to Top"
        >
          <ArrowUp className="w-5 h-5 font-bold" />
        </button>
      )}
    </UnitDataProvider>
  );
}
