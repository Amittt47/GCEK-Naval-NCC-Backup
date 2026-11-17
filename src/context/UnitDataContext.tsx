'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { UnitInfo, Achievement, Notice, NavalEvent, GalleryItem, CampDetail } from '../types';
import { UNIT_INFO, ACHIEVEMENTS_DATA, INITIAL_NOTICES, INITIAL_EVENTS, GALLERY_ITEMS, CAMPS_DATA } from '../data/mockData';

interface UnitDataContextType {
  unitInfo: UnitInfo;
  achievements: Achievement[];
  notices: Notice[];
  events: NavalEvent[];
  galleryItems: GalleryItem[];
  camps: CampDetail[];
  updateUnitInfo: (info: Partial<UnitInfo>) => void;
  addAchievement: (ach: Achievement) => void;
  updateAchievement: (id: string, ach: Partial<Achievement>) => void;
  deleteAchievement: (id: string) => void;
  addEvent: (evt: NavalEvent) => void;
  updateEvent: (id: string, evt: Partial<NavalEvent>) => void;
  deleteEvent: (id: string) => void;
  addNotice: (notice: Notice) => void;
  deleteNotice: (id: string) => void;
  addGalleryItem: (item: GalleryItem) => void;
  updateGalleryItem: (id: string, item: Partial<GalleryItem>) => void;
  deleteGalleryItem: (id: string) => void;
  addCamp: (camp: CampDetail) => void;
  updateCamp: (idOrSlug: string, camp: Partial<CampDetail>) => void;
  deleteCamp: (idOrSlug: string) => void;
  resetToDefaults: () => void;
  isCustomizerOpen: boolean;
  customizerTab: 'unit' | 'co' | 'anoCto' | 'cadets' | 'camps' | 'events' | 'achievements';
  openCustomizer: (tab?: 'unit' | 'co' | 'anoCto' | 'cadets' | 'camps' | 'events' | 'achievements' | unknown) => void;
  closeCustomizer: () => void;
}

const UnitDataContext = createContext<UnitDataContextType | undefined>(undefined);

export const UnitDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [unitInfo, setUnitInfo] = useState<UnitInfo>(UNIT_INFO);
  const [achievements, setAchievements] = useState<Achievement[]>(ACHIEVEMENTS_DATA);
  const [notices, setNotices] = useState<Notice[]>(INITIAL_NOTICES);
  const [events, setEvents] = useState<NavalEvent[]>(INITIAL_EVENTS);
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>(GALLERY_ITEMS as GalleryItem[]);
  const [camps, setCamps] = useState<CampDetail[]>(CAMPS_DATA);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isCustomizerOpen, setIsCustomizerOpen] = useState(false);
  const [customizerTab, setCustomizerTab] = useState<'unit' | 'co' | 'anoCto' | 'cadets' | 'camps' | 'events' | 'achievements'>('co');

  const openCustomizer = (
    tab?: 'unit' | 'co' | 'anoCto' | 'cadets' | 'camps' | 'events' | 'achievements' | unknown
  ) => {
    const validTabs = ['unit', 'co', 'anoCto', 'cadets', 'camps', 'events', 'achievements'];
    const selectedTab =
      typeof tab === 'string' && validTabs.includes(tab)
        ? (tab as 'unit' | 'co' | 'anoCto' | 'cadets' | 'camps' | 'events' | 'achievements')
        : 'co';
    setCustomizerTab(selectedTab);
    setIsCustomizerOpen(true);
  };

  const closeCustomizer = () => {
    setIsCustomizerOpen(false);
  };

  // Load state from localStorage on client mount
  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      const savedUnit = localStorage.getItem('gcek_naval_unit_info');
      if (savedUnit) {
        const parsed = JSON.parse(savedUnit);
        setUnitInfo((prev) => ({
          ...prev,
          ...parsed,
          co: parsed.co || prev.co,
          anoCto: parsed.anoCto || prev.anoCto,
          cadetInformation:
            parsed.cadetInformation && parsed.cadetInformation.length > 0
              ? parsed.cadetInformation
              : prev.cadetInformation,
        }));
      }

      const savedAch = localStorage.getItem('gcek_naval_achievements');
      if (savedAch) setAchievements(JSON.parse(savedAch));

      const savedNotices = localStorage.getItem('gcek_naval_notices');
      if (savedNotices) setNotices(JSON.parse(savedNotices));

      const savedEvents = localStorage.getItem('gcek_naval_events');
      if (savedEvents) setEvents(JSON.parse(savedEvents));

      const savedGallery = localStorage.getItem('gcek_naval_gallery');
      if (savedGallery) setGalleryItems(JSON.parse(savedGallery));

      const savedCamps = localStorage.getItem('gcek_naval_camps');
      if (savedCamps) setCamps(JSON.parse(savedCamps));
    } catch (e) {
      console.warn('Error loading unit data from localStorage:', e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Save to localStorage on changes (only after initial load to avoid overwriting)
  useEffect(() => {
    if (!isLoaded || typeof window === 'undefined') return;
    try {
      localStorage.setItem('gcek_naval_unit_info', JSON.stringify(unitInfo));
    } catch (e) {}
  }, [unitInfo, isLoaded]);

  useEffect(() => {
    if (!isLoaded || typeof window === 'undefined') return;
    try {
      localStorage.setItem('gcek_naval_achievements', JSON.stringify(achievements));
    } catch (e) {}
  }, [achievements, isLoaded]);

  useEffect(() => {
    if (!isLoaded || typeof window === 'undefined') return;
    try {
      localStorage.setItem('gcek_naval_notices', JSON.stringify(notices));
    } catch (e) {}
  }, [notices, isLoaded]);

  useEffect(() => {
    if (!isLoaded || typeof window === 'undefined') return;
    try {
      localStorage.setItem('gcek_naval_events', JSON.stringify(events));
    } catch (e) {}
  }, [events, isLoaded]);

  useEffect(() => {
    if (!isLoaded || typeof window === 'undefined') return;
    try {
      localStorage.setItem('gcek_naval_gallery', JSON.stringify(galleryItems));
    } catch (e) {}
  }, [galleryItems, isLoaded]);

  useEffect(() => {
    if (!isLoaded || typeof window === 'undefined') return;
    try {
      localStorage.setItem('gcek_naval_camps', JSON.stringify(camps));
    } catch (e) {}
  }, [camps, isLoaded]);

  const updateUnitInfo = (updatedFields: Partial<UnitInfo>) => {
    setUnitInfo((prev) => {
      const co = { ...prev.co, ...(updatedFields.co || {}) };
      const anoCto = { ...prev.anoCto, ...(updatedFields.anoCto || {}) };
      const cto = { ...prev.cto, ...(updatedFields.cto || {}) };
      const seniorCadetCaptain = { ...prev.seniorCadetCaptain, ...(updatedFields.seniorCadetCaptain || {}) };
      return {
        ...prev,
        ...updatedFields,
        co,
        anoCto,
        cto,
        seniorCadetCaptain,
        cadetInformation:
          updatedFields.cadetInformation !== undefined
            ? updatedFields.cadetInformation
            : prev.cadetInformation,
        leadershipCadets:
          updatedFields.leadershipCadets !== undefined
            ? updatedFields.leadershipCadets
            : prev.leadershipCadets,
      };
    });
  };

  const addAchievement = (ach: Achievement) => {
    setAchievements((prev) => [ach, ...prev]);
  };

  const updateAchievement = (id: string, updated: Partial<Achievement>) => {
    setAchievements((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updated } : item))
    );
  };

  const deleteAchievement = (id: string) => {
    setAchievements((prev) => prev.filter((item) => item.id !== id));
  };

  const addEvent = (evt: NavalEvent) => {
    setEvents((prev) => [...prev, evt].sort((a, b) => a.date.localeCompare(b.date)));
  };

  const updateEvent = (id: string, updated: Partial<NavalEvent>) => {
    setEvents((prev) =>
      prev
        .map((item) => (item.id === id ? { ...item, ...updated } : item))
        .sort((a, b) => a.date.localeCompare(b.date))
    );
  };

  const deleteEvent = (id: string) => {
    setEvents((prev) => prev.filter((item) => item.id !== id));
  };

  const addNotice = (notice: Notice) => {
    setNotices((prev) => [notice, ...prev]);
  };

  const deleteNotice = (id: string) => {
    setNotices((prev) => prev.filter((item) => item.id !== id));
  };

  const addGalleryItem = (item: GalleryItem) => {
    setGalleryItems((prev) => [item, ...prev]);
  };

  const updateGalleryItem = (id: string, updated: Partial<GalleryItem>) => {
    setGalleryItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updated } : item))
    );
  };

  const deleteGalleryItem = (id: string) => {
    setGalleryItems((prev) => prev.filter((item) => item.id !== id));
  };

  const addCamp = (camp: CampDetail) => {
    setCamps((prev) => [camp, ...prev]);
  };

  const updateCamp = (idOrSlug: string, updated: Partial<CampDetail>) => {
    setCamps((prev) =>
      prev.map((c) => (c.id === idOrSlug || c.slug === idOrSlug ? { ...c, ...updated } : c))
    );
  };

  const deleteCamp = (idOrSlug: string) => {
    setCamps((prev) => prev.filter((c) => c.id !== idOrSlug && c.slug !== idOrSlug));
  };

  const resetToDefaults = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('gcek_naval_unit_info');
      localStorage.removeItem('gcek_naval_achievements');
      localStorage.removeItem('gcek_naval_notices');
      localStorage.removeItem('gcek_naval_events');
      localStorage.removeItem('gcek_naval_gallery');
      localStorage.removeItem('gcek_naval_camps');
    }
    setUnitInfo(UNIT_INFO);
    setAchievements(ACHIEVEMENTS_DATA);
    setNotices(INITIAL_NOTICES);
    setEvents(INITIAL_EVENTS);
    setGalleryItems(GALLERY_ITEMS as GalleryItem[]);
    setCamps(CAMPS_DATA);
  };

  return (
    <UnitDataContext.Provider
      value={{
        unitInfo,
        achievements,
        notices,
        events,
        galleryItems,
        camps,
        updateUnitInfo,
        addAchievement,
        updateAchievement,
        deleteAchievement,
        addEvent,
        updateEvent,
        deleteEvent,
        addNotice,
        deleteNotice,
        addGalleryItem,
        updateGalleryItem,
        deleteGalleryItem,
        addCamp,
        updateCamp,
        deleteCamp,
        resetToDefaults,
        isCustomizerOpen,
        customizerTab,
        openCustomizer,
        closeCustomizer,
      }}
    >
      {children}
    </UnitDataContext.Provider>
  );
};

export const useUnitData = () => {
  const context = useContext(UnitDataContext);
  if (!context) {
    throw new Error('useUnitData must be used within a UnitDataProvider');
  }
  return context;
};
