'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useUnitData } from '../../src/context/UnitDataContext';
import { AdminHeader } from '../../components/admin/AdminHeader';
import {
  Users,
  Award,
  Bell,
  Image as ImageIcon,
  Shield,
  ArrowRight,
  Plus,
  Compass,
  CheckCircle2,
  Calendar,
  Building2,
  GraduationCap,
  MessageSquare,
  TrendingUp,
} from 'lucide-react';

export default function AdminOverviewPage({
  onToggleSidebar = () => {},
}: {
  onToggleSidebar?: () => void;
}) {
  const { unitInfo, cadets, achievements, notices, galleryItems, events } = useUnitData() as any;

  // Real database metrics calculation
  const totalCadets = (unitInfo?.cadetInformation?.length || 0);
  const totalAchievements = achievements?.length || 0;
  const totalNotices = notices?.length || 0;
  const totalPhotos = galleryItems?.length || 0;
  const totalEvents = events?.length || 0;

  const statCards = [
    {
      title: 'Active Cadets',
      value: totalCadets,
      subtitle: 'Ranked in sequence (CC → POC → LC → NC)',
      icon: <Users className="w-5 h-5 text-amber-400" />,
      href: '/admin/cadets',
      color: 'border-amber-400/40 bg-amber-500/10',
    },
    {
      title: 'Cadet Honors & Citations',
      value: totalAchievements,
      subtitle: 'National camps, AINSC & state medals',
      icon: <Award className="w-5 h-5 text-emerald-400" />,
      href: '/admin/achievements',
      color: 'border-emerald-400/40 bg-emerald-500/10',
    },
    {
      title: 'Official Orders & Circulars',
      value: totalNotices,
      subtitle: 'Parade orders & camp notifications',
      icon: <Bell className="w-5 h-5 text-sky-400" />,
      href: '/admin/notices',
      color: 'border-sky-400/40 bg-sky-500/10',
    },
    {
      title: 'Visual Archives',
      value: totalPhotos,
      subtitle: 'Training, whaler pulling & drill photos',
      icon: <ImageIcon className="w-5 h-5 text-indigo-400" />,
      href: '/admin/gallery',
      color: 'border-indigo-400/40 bg-indigo-500/10',
    },
  ];

  return (
    <div className="flex-1 flex flex-col">
      <AdminHeader
        onToggleSidebar={onToggleSidebar}
        title="Naval Command Console"
        subtitle="Official administrative management for 4(O) Naval Unit NCC Sub-Unit"
      />

      <div className="p-4 sm:p-6 lg:p-8 space-y-8 max-w-7xl mx-auto w-full">
        {/* Command Banner */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#001f3f] via-[#002b5b] to-[#001428] border-2 border-amber-500/30 shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 text-xs font-mono uppercase tracking-widest">
              <Shield className="w-3.5 h-3.5" />
              <span>Institutional Command Authority</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Welcome, Officer In-Charge
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Managing <strong className="text-white">{unitInfo?.affiliatedUnit || '4 Odisha Naval Unit NCC'}</strong> at{' '}
              <strong className="text-white">{unitInfo?.college || 'GCEK Bhawanipatna'}</strong>. Full operational authority over official command credentials, cadet appointments, parade notices, and roll of honor.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/admin/unit"
              className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-[#001428] font-bold text-xs flex items-center gap-2 shadow-lg transition-colors cursor-pointer"
            >
              <Building2 className="w-4 h-4" />
              <span>Edit Command Info</span>
            </Link>
            <Link
              href="/admin/cadets"
              className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-semibold text-xs flex items-center gap-2 transition-colors cursor-pointer"
            >
              <Users className="w-4 h-4" />
              <span>Manage Cadets</span>
            </Link>
          </div>
        </div>

        {/* Real Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {statCards.map((stat) => (
            <Link
              key={stat.title}
              href={stat.href}
              className={`p-5 rounded-2xl border ${stat.color} hover:border-amber-400/80 transition-all flex flex-col justify-between group shadow-lg`}
            >
              <div className="flex items-center justify-between">
                <span className="p-2.5 rounded-xl bg-black/40 border border-white/10">
                  {stat.icon}
                </span>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-amber-400 group-hover:translate-x-1 transition-all" />
              </div>
              <div className="mt-4 space-y-1">
                <div className="font-serif text-3xl font-bold text-white">
                  {stat.value}
                </div>
                <div className="font-semibold text-xs text-slate-200">
                  {stat.title}
                </div>
                <p className="text-[11px] text-slate-400 leading-tight">
                  {stat.subtitle}
                </p>
              </div>
            </Link>
          ))}
        </div>

        {/* Operational Quick Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Section 1: Command Leadership Profile */}
          <div className="p-6 rounded-2xl bg-[#001830] border border-amber-500/20 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <h3 className="font-serif text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Shield className="w-4 h-4 text-amber-400" />
                <span>1. Commanding Officer</span>
              </h3>
              <Link href="/admin/unit" className="text-xs text-amber-300 hover:underline">
                Edit
              </Link>
            </div>
            <div className="space-y-2">
              <div className="font-serif text-base font-bold text-white">
                {unitInfo?.co?.name || 'CO LT. M Darshan'}
              </div>
              <div className="text-xs text-amber-300 font-mono">
                {unitInfo?.co?.rank || 'Lieutenant (Indian Navy)'}
              </div>
              <div className="text-xs text-slate-300">
                {unitInfo?.co?.designation || 'Commanding Officer (CO)'} · {unitInfo?.co?.unit || '4 Odisha Naval Unit NCC'}
              </div>
              <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed pt-1">
                &ldquo;{unitInfo?.co?.message || 'The pristine white ensign represents unwavering integrity and dedication to the motherland...'}&rdquo;
              </p>
            </div>
          </div>

          {/* Section 2: Associate NCC Officer */}
          <div className="p-6 rounded-2xl bg-[#001830] border border-amber-500/20 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <h3 className="font-serif text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Compass className="w-4 h-4 text-sky-400" />
                <span>2. Associate NCC Officer</span>
              </h3>
              <Link href="/admin/unit" className="text-xs text-amber-300 hover:underline">
                Edit
              </Link>
            </div>
            <div className="space-y-2">
              <div className="font-serif text-base font-bold text-white">
                {unitInfo?.anoCto?.name || 'Lt. (Dr.) Manoranjan Pradhan'}
              </div>
              <div className="text-xs text-sky-300 font-mono">
                {unitInfo?.anoCto?.designation || 'Associate NCC Officer (ANO) / Care Taker Officer (CTO)'}
              </div>
              <div className="text-xs text-slate-300">
                {unitInfo?.anoCto?.department || 'Department of Mechanical Engineering, GCEK'}
              </div>
              <div className="text-[11px] text-slate-400 font-mono">
                {unitInfo?.anoCto?.qualifications || 'Ph.D., M.Tech (IIT), PRCN Certified'}
              </div>
            </div>
          </div>

          {/* Section 3: Direct Management Actions */}
          <div className="p-6 rounded-2xl bg-[#001830] border border-amber-500/20 space-y-3">
            <h3 className="font-serif text-sm font-bold text-white uppercase tracking-wider pb-3 border-b border-white/10 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Operations Jump-List</span>
            </h3>
            <div className="space-y-2 text-xs">
              <Link
                href="/admin/notices"
                className="flex items-center justify-between p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-200 transition-colors"
              >
                <span>Publish New Parade Order</span>
                <Plus className="w-3.5 h-3.5 text-amber-400" />
              </Link>
              <Link
                href="/admin/cadets"
                className="flex items-center justify-between p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-200 transition-colors"
              >
                <span>Add Cadet / Appointment</span>
                <Plus className="w-3.5 h-3.5 text-amber-400" />
              </Link>
              <Link
                href="/admin/achievements"
                className="flex items-center justify-between p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-200 transition-colors"
              >
                <span>Record Camp Citation / Medal</span>
                <Plus className="w-3.5 h-3.5 text-amber-400" />
              </Link>
              <Link
                href="/admin/gallery"
                className="flex items-center justify-between p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-200 transition-colors"
              >
                <span>Upload Activity Photograph</span>
                <Plus className="w-3.5 h-3.5 text-amber-400" />
              </Link>
              <Link
                href="/admin/mentorship"
                className="flex items-center justify-between p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-200 transition-colors"
              >
                <span>Review Cadet Mentorship Inquiries</span>
                <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
