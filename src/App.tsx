import React, { useState, useEffect } from 'react';
import { HubTab } from './types';
import { UnitDataProvider } from './context/UnitDataContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { GlobalSearchModal } from './components/GlobalSearchModal';
import { UnitCustomizerModal } from './components/UnitCustomizerModal';

import { HomeView } from './views/HomeView';
import { AboutView } from './views/AboutView';
import { AchievementsView } from './views/AchievementsView';
import { CampsView } from './views/CampsView';
import { SsbHubView } from './views/SsbHubView';
import { CareersView } from './views/CareersView';
import { ResourcesView } from './views/ResourcesView';
import { NoticeBoardView } from './views/NoticeBoardView';
import { EventCalendarView } from './views/EventCalendarView';
import { AlumniView } from './views/AlumniView';
import { GalleryView } from './views/GalleryView';
import { HallOfFameView } from './views/HallOfFameView';
import { MagazineView } from './views/MagazineView';
import { AdminDashboardView } from './views/AdminDashboardView';
import { ArrowUp, Bell, Compass, Edit3 } from 'lucide-react';

export default function App() {
  const [currentTab, setCurrentTab] = useState<HubTab>('home');
  const [isDark, setIsDark] = useState(true);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [customizerModalOpen, setCustomizerModalOpen] = useState(false);
  const [selectedCampSlug, setSelectedCampSlug] = useState<string | undefined>(undefined);
  const [showBackToTop, setShowBackToTop] = useState(false);

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
        // Only trigger if user is not currently typing in an input
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

  const handleSelectTab = (tab: HubTab, extraId?: string) => {
    setCurrentTab(tab);
    if (tab === 'camps' && extraId) {
      setSelectedCampSlug(extraId);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <UnitDataProvider>
      <div className={`min-h-screen flex flex-col font-sans transition-colors duration-200 ${
        isDark ? 'bg-[#001428] text-slate-100' : 'bg-slate-900 text-slate-100'
      }`}>
        {/* Top Navigation Bar with strict 3-zone contract */}
        <Navbar
          currentTab={currentTab}
          onSelectTab={handleSelectTab}
          onOpenSearch={() => setSearchModalOpen(true)}
          onOpenCustomizer={() => setCustomizerModalOpen(true)}
          isDark={isDark}
          onToggleTheme={() => setIsDark(!isDark)}
        />

        {/* Main Content Area */}
        <main className="flex-1 w-full">
          {currentTab === 'home' && (
            <HomeView
              onSelectTab={handleSelectTab}
              onOpenCustomizer={() => setCustomizerModalOpen(true)}
            />
          )}
          {currentTab === 'about' && (
            <AboutView onOpenCustomizer={() => setCustomizerModalOpen(true)} />
          )}
          {currentTab === 'achievements' && (
            <AchievementsView onOpenCustomizer={() => setCustomizerModalOpen(true)} />
          )}
          {currentTab === 'camps' && (
            <CampsView
              initialCampSlug={selectedCampSlug}
              onOpenCustomizer={() => setCustomizerModalOpen(true)}
            />
          )}
          {currentTab === 'ssb-hub' && <SsbHubView />}
          {currentTab === 'careers' && <CareersView />}
          {currentTab === 'resources' && <ResourcesView />}
          {currentTab === 'notices' && <NoticeBoardView onAdminOpen={() => handleSelectTab('admin')} />}
          {currentTab === 'calendar' && (
            <EventCalendarView onOpenCustomizer={() => setCustomizerModalOpen(true)} />
          )}
          {currentTab === 'alumni' && <AlumniView />}
          {currentTab === 'gallery' && <GalleryView />}
          {currentTab === 'hall-of-fame' && <HallOfFameView />}
          {currentTab === 'magazine' && <MagazineView />}
          {currentTab === 'admin' && (
            <AdminDashboardView onOpenCustomizer={() => setCustomizerModalOpen(true)} />
          )}
        </main>

        {/* Naval Footer */}
        <Footer onSelectTab={handleSelectTab} />

        {/* Global Live Search Dialog */}
        <GlobalSearchModal
          isOpen={searchModalOpen}
          onClose={() => setSearchModalOpen(false)}
          onSelectResult={(tab, extraId) => handleSelectTab(tab, extraId)}
        />

        {/* Unit Info & Cadets Customizer Modal */}
        <UnitCustomizerModal
          isOpen={customizerModalOpen}
          onClose={() => setCustomizerModalOpen(false)}
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
      </div>
    </UnitDataProvider>
  );
}
