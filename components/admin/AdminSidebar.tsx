'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { CrestLogo } from '../naval/CrestLogo';
import { createClient } from '../../lib/supabase/client';
import {
  Shield,
  LayoutDashboard,
  Building2,
  Bell,
  Users,
  Award,
  Image as ImageIcon,
  GraduationCap,
  MessageSquare,
  LogOut,
  ExternalLink,
  ChevronRight,
  Calendar,
  Compass,
} from 'lucide-react';

interface AdminSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AdminSidebar({ isOpen, onClose }: AdminSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  const navItems = [
    { href: '/admin', label: 'Command Overview', icon: <LayoutDashboard className="w-4 h-4" /> },
    { href: '/admin/unit', label: 'Unit & Command Info', icon: <Building2 className="w-4 h-4" /> },
    { href: '/admin/notices', label: 'Notice Board Orders', icon: <Bell className="w-4 h-4" /> },
    { href: '/admin/events', label: 'Event Schedule & Drill', icon: <Calendar className="w-4 h-4" /> },
    { href: '/admin/camps', label: 'Naval Camps Hub', icon: <Compass className="w-4 h-4" /> },
    { href: '/admin/cadets', label: 'Cadet Hierarchy', icon: <Users className="w-4 h-4" /> },
    { href: '/admin/achievements', label: 'Cadet Achievements', icon: <Award className="w-4 h-4" /> },
    { href: '/admin/gallery', label: 'Activity Gallery', icon: <ImageIcon className="w-4 h-4" /> },
    { href: '/admin/alumni', label: 'Alumni Directory', icon: <GraduationCap className="w-4 h-4" /> },
    { href: '/admin/mentorship', label: 'Mentorship Requests', icon: <MessageSquare className="w-4 h-4" /> },
  ];

  const handleLogout = async () => {
    try {
      const supabase = createClient();
      await supabase.auth.signOut();
    } catch (e) {
      // Ignore
    }
    // Clear demo cookie
    document.cookie = 'gcek_admin_demo_session=; path=/; max-age=0';
    router.push('/login');
    router.refresh();
  };

  const isActive = (href: string) => {
    if (href === '/admin') return pathname === '/admin';
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/80 backdrop-blur-sm lg:hidden"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-[#001020] border-r border-amber-500/25 flex flex-col justify-between transition-transform duration-200 lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div>
          {/* Header */}
          <div className="p-5 border-b border-white/10 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3 group">
              <CrestLogo size={36} />
              <div>
                <span className="font-serif font-bold text-white text-sm tracking-wider uppercase block group-hover:text-amber-300 transition-colors">
                  Command Console
                </span>
                <span className="text-[10px] text-amber-400 font-mono">GCEK Naval NCC</span>
              </div>
            </Link>
          </div>

          {/* Navigation Items */}
          <nav className="p-3 space-y-1">
            <div className="px-3 py-1.5 text-[10px] font-mono uppercase tracking-wider text-slate-400">
              Operations & Command
            </div>
            {navItems.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    active
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-400/40 shadow-sm'
                      : 'text-slate-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={active ? 'text-amber-400' : 'text-slate-400'}>
                      {item.icon}
                    </span>
                    <span>{item.label}</span>
                  </div>
                  {active && <ChevronRight className="w-3.5 h-3.5 text-amber-400" />}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Footer controls */}
        <div className="p-4 border-t border-white/10 space-y-2">
          <Link
            href="/"
            className="flex items-center justify-between p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs text-slate-300 hover:text-white transition-colors"
          >
            <div className="flex items-center gap-2">
              <ExternalLink className="w-3.5 h-3.5 text-sky-400" />
              <span>Public Portal</span>
            </div>
            <span className="text-[10px] font-mono text-amber-300">Live</span>
          </Link>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-3 py-2 text-xs text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-xl transition-colors cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Terminate Officer Session</span>
          </button>
        </div>
      </aside>
    </>
  );
}
