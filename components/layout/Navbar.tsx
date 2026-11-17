'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { CrestLogo } from '../naval/CrestLogo';
import { useUnitData } from '../../src/context/UnitDataContext';
import {
  Search,
  Shield,
  Menu,
  X,
  ChevronDown,
  Compass,
  BookOpen,
  Bell,
  Users,
  Image as ImageIcon,
  Trophy,
  FileText,
  Calendar,
  Edit3,
} from 'lucide-react';

interface NavbarProps {
  onOpenSearch?: () => void;
  onOpenCustomizer?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenSearch,
  onOpenCustomizer,
}) => {
  const pathname = usePathname();
  const { unitInfo, openCustomizer } = useUnitData();
  const handleOpenCustomizer = onOpenCustomizer || (() => openCustomizer('co'));
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [moreDropdownOpen, setMoreDropdownOpen] = useState(false);

  const primaryNavItems: { href: string; label: string }[] = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About Us' },
    { href: '/camps', label: 'Camps Hub' },
    { href: '/achievements', label: 'Achievements' },
    { href: '/ssb-hub', label: 'SSB Prep Hub' },
    { href: '/careers', label: 'Defence Careers' },
  ];

  const secondaryNavItems: { href: string; label: string; icon: React.ReactNode }[] = [
    { href: '/calendar', label: 'Event Calendar', icon: <Calendar className="w-4 h-4 text-emerald-400" /> },
    { href: '/resources', label: 'Cadet Resources', icon: <BookOpen className="w-4 h-4 text-amber-400" /> },
    { href: '/notices', label: 'Notice Board', icon: <Bell className="w-4 h-4 text-sky-400" /> },
    { href: '/alumni', label: 'Alumni Network', icon: <Users className="w-4 h-4 text-emerald-400" /> },
    { href: '/gallery', label: 'Gallery', icon: <ImageIcon className="w-4 h-4 text-indigo-400" /> },
    { href: '/hall-of-fame', label: 'Hall of Fame', icon: <Trophy className="w-4 h-4 text-amber-400" /> },
    { href: '/magazine', label: 'Naval Vanguard', icon: <FileText className="w-4 h-4 text-teal-400" /> },
  ];

  const isCurrentActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  const isSecondaryActive = secondaryNavItems.some((item) => pathname.startsWith(item.href));

  return (
    <header className="sticky top-0 z-50 w-full border-b border-amber-500/20 bg-[#001428]/95 backdrop-blur-md transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-18">
          {/* Zone 1: Single text element Brand mark with Crest */}
          <Link
            href="/"
            className="flex items-center gap-3 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 rounded-lg group"
            aria-label="GCEK Naval NCC Portal Home"
          >
            <CrestLogo size={42} />
            <div className="flex flex-col">
              <span className="font-serif text-lg sm:text-xl font-bold tracking-wider text-white group-hover:text-amber-300 transition-colors uppercase">
                GCEK Naval NCC
              </span>
              <span className="text-[10px] uppercase tracking-widest text-sky-300/80 font-medium hidden sm:inline">
                Leadership · Discipline · Service
              </span>
            </div>
          </Link>

          {/* Zone 2: Clean text navigation links (4-6 links + single More dropdown) */}
          <nav className="hidden lg:flex items-center gap-1.5 xl:gap-3 text-sm font-medium text-slate-300">
            {primaryNavItems.map((item) => {
              const active = isCurrentActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-3 py-1.5 rounded-md transition-all whitespace-nowrap cursor-pointer ${
                    active
                      ? 'text-amber-300 bg-white/10 font-semibold shadow-inner border border-amber-400/30'
                      : 'hover:text-white hover:bg-white/5'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}

            {/* More Menu Dropdown */}
            <div className="relative">
              <button
                onClick={() => setMoreDropdownOpen(!moreDropdownOpen)}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-md transition-all whitespace-nowrap cursor-pointer ${
                  isSecondaryActive
                    ? 'text-amber-300 bg-white/10 font-semibold border border-amber-400/30'
                    : 'hover:text-white hover:bg-white/5 text-slate-300'
                }`}
                aria-expanded={moreDropdownOpen}
              >
                <span>Cadet Hubs</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${moreDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {moreDropdownOpen && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setMoreDropdownOpen(false)}
                  />
                  <div className="absolute right-0 mt-2 w-56 rounded-xl border border-amber-500/25 bg-[#001f3f] shadow-2xl p-1.5 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                    {secondaryNavItems.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setMoreDropdownOpen(false)}
                        className={`w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium rounded-lg text-left transition-colors ${
                          pathname.startsWith(item.href)
                            ? 'bg-amber-400/15 text-amber-300 font-semibold'
                            : 'text-slate-200 hover:bg-white/10 hover:text-white'
                        }`}
                      >
                        {item.icon}
                        <span>{item.label}</span>
                      </Link>
                    ))}
                  </div>
                </>
              )}
            </div>
          </nav>

          {/* Zone 3: 1-2 Primary Actions (Search, Admin Portal, Edit Unit Info, Mobile Toggle) */}
          <div className="flex items-center gap-2">
            {/* Global Search Button */}
            {onOpenSearch && (
              <button
                onClick={onOpenSearch}
                className="flex items-center gap-2 px-2.5 py-1.5 text-xs text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-colors cursor-pointer"
                title="Search Portal (Press / or Ctrl+K)"
                aria-label="Search"
              >
                <Search className="w-4 h-4 text-sky-400" />
                <span className="hidden xl:inline text-slate-400">Search</span>
                <kbd className="hidden xl:inline-block px-1.5 py-0.2 text-[10px] font-mono bg-black/40 border border-white/15 rounded text-slate-400">
                  /
                </kbd>
              </button>
            )}

            {/* Quick Full Access Customizer Button */}
            <button
              onClick={handleOpenCustomizer}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-400/50 transition-all cursor-pointer shadow"
              title="Full Access: Edit CO Lt. M Darshan, ANO/CTO, Cadet Info & Achievements, Camps, Calendar"
            >
              <Edit3 className="w-3.5 h-3.5 text-amber-400" />
              <span>⚡ Edit Portal</span>
            </button>

            {/* Admin Console Quick Link */}
            <Link
              href="/admin"
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all border cursor-pointer whitespace-nowrap ${
                pathname.startsWith('/admin')
                  ? 'bg-amber-500 text-[#001f3f] border-amber-300 shadow-md font-bold'
                  : 'bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border-amber-500/30'
              }`}
            >
              <Shield className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden sm:inline">Command Portal</span>
            </Link>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-amber-500/20 bg-[#001830] px-4 pt-3 pb-6 space-y-1">
          <div className="text-[11px] font-mono uppercase tracking-wider text-amber-400/80 px-2 py-1 flex items-center justify-between">
            <span>Naval Command Navigation</span>
            {handleOpenCustomizer && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleOpenCustomizer();
                }}
                className="text-[11px] text-amber-300 font-bold underline flex items-center gap-1 cursor-pointer"
              >
                <Edit3 className="w-3 h-3" />
                <span>⚡ Edit Portal</span>
              </button>
            )}
          </div>
          {primaryNavItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className={`w-full flex items-center justify-between px-3 py-2 text-sm rounded-lg text-left ${
                isCurrentActive(item.href)
                  ? 'bg-amber-500/20 text-amber-300 font-semibold border-l-4 border-amber-400'
                  : 'text-slate-200 hover:bg-white/5'
              }`}
            >
              <span>{item.label}</span>
              <Compass className="w-4 h-4 text-sky-400 opacity-60" />
            </Link>
          ))}

          <div className="pt-2 text-[11px] font-mono uppercase tracking-wider text-sky-400/80 px-2 py-1 border-t border-white/10">
            Cadet Portals & Knowledge Base
          </div>
          <div className="grid grid-cols-2 gap-1 pt-1">
            {secondaryNavItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-2 px-3 py-2 text-xs rounded-lg text-left ${
                  pathname.startsWith(item.href)
                    ? 'bg-amber-400/20 text-amber-300 font-semibold'
                    : 'text-slate-300 hover:bg-white/5'
                }`}
              >
                {item.icon}
                <span className="truncate">{item.label}</span>
              </Link>
            ))}
          </div>

          <div className="pt-3 border-t border-white/10 flex justify-between items-center px-2">
            <span className="text-xs text-slate-300 font-medium truncate max-w-[200px]">
              {unitInfo?.affiliatedUnit || '4 Odisha Naval Unit NCC'}
            </span>
            <Link
              href="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="text-xs text-amber-300 underline font-medium shrink-0"
            >
              Command Console →
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
