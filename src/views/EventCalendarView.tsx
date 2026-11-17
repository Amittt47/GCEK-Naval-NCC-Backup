'use client';

import React, { useState, useMemo } from 'react';
import { NavalEvent } from '../types';
import { useUnitData } from '../context/UnitDataContext';
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Clock,
  MapPin,
  Shield,
  X,
  Compass,
  Edit3,
} from 'lucide-react';

interface EventCalendarViewProps {
  onOpenCustomizer?: (tab?: 'unit' | 'co' | 'anoCto' | 'cadets' | 'camps' | 'events' | 'achievements' | unknown) => void;
}

export const EventCalendarView: React.FC<EventCalendarViewProps> = ({
  onOpenCustomizer: propOnOpenCustomizer,
}) => {
  const { events, openCustomizer } = useUnitData();

  // Restore onOpenCustomizer: prop with fallback to UnitDataContext openCustomizer
  const onOpenCustomizer = (
    tabOrEvent?: 'unit' | 'co' | 'anoCto' | 'cadets' | 'camps' | 'events' | 'achievements' | unknown
  ) => {
    const validTabs = ['unit', 'co', 'anoCto', 'cadets', 'camps', 'events', 'achievements'];
    const tab =
      typeof tabOrEvent === 'string' && validTabs.includes(tabOrEvent)
        ? (tabOrEvent as 'unit' | 'co' | 'anoCto' | 'cadets' | 'camps' | 'events' | 'achievements')
        : 'events';
    if (propOnOpenCustomizer) {
      propOnOpenCustomizer(tab);
    } else {
      openCustomizer(tab);
    }
  };

  // Calendar month/year navigation state
  const [currentDate, setCurrentDate] = useState<Date>(() => new Date(2026, 9, 1)); // Default Oct 2026
  const [selectedEventType, setSelectedEventType] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'month' | 'list'>('month');
  const [selectedEventModal, setSelectedEventModal] = useState<NavalEvent | null>(null);

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();

  // Navigate Months
  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth + 1, 1));
  };

  const handleYearChange = (year: number) => {
    setCurrentDate(new Date(year, currentMonth, 1));
  };

  const handleMonthChange = (monthIdx: number) => {
    setCurrentDate(new Date(currentYear, monthIdx, 1));
  };

  // Days in current month
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfWeek = new Date(currentYear, currentMonth, 1).getDay(); // 0 is Sunday

  // Filter events
  const filteredEvents = useMemo(() => {
    return events.filter((e) => {
      const matchType = selectedEventType === 'all' || e.type === selectedEventType;
      return matchType;
    });
  }, [events, selectedEventType]);

  // Events in current active month
  const eventsInCurrentMonth = useMemo(() => {
    const monthStr = (currentMonth + 1).toString().padStart(2, '0');
    const yearStr = currentYear.toString();
    const prefix = `${yearStr}-${monthStr}`;
    return filteredEvents.filter((e) => e.date.startsWith(prefix));
  }, [filteredEvents, currentYear, currentMonth]);

  const eventTypes: { id: string; label: string; color: string }[] = [
    { id: 'all', label: 'All Operations', color: 'bg-white/10' },
    { id: 'Parade', label: 'Drill / Parade', color: 'bg-amber-500' },
    { id: 'Camp Selection', label: 'Camp Selection', color: 'bg-sky-500' },
    { id: 'Theory Lecture', label: 'Theory Lecture', color: 'bg-indigo-500' },
    { id: 'Social Activity', label: 'Social Activity', color: 'bg-emerald-500' },
    { id: 'Examination', label: 'Examination', color: 'bg-red-500' },
    { id: 'Ceremony', label: 'Ceremony', color: 'bg-teal-500' },
  ];

  const getBadgeColor = (type: NavalEvent['type']) => {
    switch (type) {
      case 'Parade': return 'bg-amber-400/20 text-amber-300 border-amber-400/40';
      case 'Camp Selection': return 'bg-sky-400/20 text-sky-300 border-sky-400/40';
      case 'Theory Lecture': return 'bg-indigo-400/20 text-indigo-300 border-indigo-400/40';
      case 'Social Activity': return 'bg-emerald-400/20 text-emerald-300 border-emerald-400/40';
      case 'Examination': return 'bg-red-400/20 text-red-300 border-red-400/40';
      case 'Ceremony': return 'bg-teal-400/20 text-teal-300 border-teal-400/40';
      default: return 'bg-white/10 text-white';
    }
  };


  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-8">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 text-xs font-mono uppercase tracking-widest">
            <CalendarIcon className="w-3.5 h-3.5" />
            <span>Operational Schedule</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-naval font-bold text-white tracking-tight">
            Dynamic Event Calendar
          </h1>
          <p className="text-xs sm:text-sm text-slate-300">
            Parade drills, camp selection schedules, certificate examinations, and ceremonial muster
            timings for GCEK Naval NCC.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center bg-[#001830] p-1 rounded-xl border border-white/10">
            <button
              onClick={() => setViewMode('month')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                viewMode === 'month' ? 'bg-amber-500 text-[#001428]' : 'text-slate-400 hover:text-white'
              }`}
            >
              Month Grid
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                viewMode === 'list' ? 'bg-amber-500 text-[#001428]' : 'text-slate-400 hover:text-white'
              }`}
            >
              Upcoming List ({filteredEvents.length})
            </button>
          </div>
          {onOpenCustomizer && (
            <button
              onClick={() => onOpenCustomizer('events')}
              className="px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-400/40 transition-all flex items-center gap-1.5 cursor-pointer shadow"
            >
              <Edit3 className="w-3.5 h-3.5 text-amber-400" />
              <span>Schedule / Edit Events</span>
            </button>
          )}
        </div>
      </div>

      {/* Weekly Mandatory Training Banner (Saturday & Sunday Classes) */}
      <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-[#002244] via-[#001b38] to-[#001428] border-2 border-amber-400/40 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="p-2.5 rounded-xl bg-amber-400/20 text-amber-300 border border-amber-400/30 shrink-0">
            <Compass className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-[10px] uppercase font-bold text-amber-300 bg-amber-400/10 px-2 py-0.5 rounded border border-amber-400/20">
                Official Weekly Schedule
              </span>
              <span className="text-emerald-400 text-xs font-semibold">2 Days / Week</span>
            </div>
            <h3 className="font-serif text-base font-bold text-white mt-0.5">
              Mandatory NCC Classes & Drill on Saturdays & Sundays
            </h3>
            <p className="text-xs text-slate-300 mt-0.5">
              Regular naval parade, seamanship theory, whaler boat pulling, and physical training are held every Saturday (08:00 AM) and Sunday (06:00 AM).
            </p>
          </div>
        </div>

        <div className="px-3.5 py-1.5 rounded-xl bg-sky-500/10 text-sky-300 text-xs font-semibold border border-sky-400/20 flex items-center gap-2 shrink-0 self-start sm:self-auto">
          <Clock className="w-3.5 h-3.5 text-amber-400" />
          <span>Routine Cadence</span>
        </div>
      </div>

      {/* Month & Year Navigation Toolbar */}
      <div className="p-4 sm:p-5 rounded-2xl bg-[#001933] border border-amber-500/25 shadow-xl flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Previous / Next Month Navigation */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-start">
          <button
            onClick={handlePrevMonth}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 cursor-pointer"
            aria-label="Previous Month"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2">
            <select
              value={currentMonth}
              onChange={(e) => handleMonthChange(Number(e.target.value))}
              className="bg-[#001428] text-white font-serif text-base font-bold px-3 py-1.5 rounded-lg border border-amber-400/30 focus:outline-none"
            >
              {monthNames.map((name, idx) => (
                <option key={idx} value={idx}>
                  {name}
                </option>
              ))}
            </select>

            <select
              value={currentYear}
              onChange={(e) => handleYearChange(Number(e.target.value))}
              className="bg-[#001428] text-amber-300 font-mono text-sm font-bold px-3 py-1.5 rounded-lg border border-amber-400/30 focus:outline-none"
            >
              {[2024, 2025, 2026, 2027, 2028].map((yr) => (
                <option key={yr} value={yr}>
                  {yr}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={handleNextMonth}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 cursor-pointer"
            aria-label="Next Month"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Event Type Filter */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
          {eventTypes.map((t) => (
            <button
              key={t.id}
              onClick={() => setSelectedEventType(t.id)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                selectedEventType === t.id
                  ? 'bg-amber-500 text-[#001428] font-bold shadow'
                  : 'bg-white/5 hover:bg-white/10 text-slate-300'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* View 1: Month Grid View */}
      {viewMode === 'month' && (
        <div className="p-6 sm:p-8 rounded-3xl bg-[#001933] border border-amber-500/25 shadow-2xl space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-400 pb-2">
            <span className="font-mono text-amber-400 font-bold">
              {monthNames[currentMonth]} {currentYear}
            </span>
            <span>{eventsInCurrentMonth.length} Events Scheduled</span>
          </div>

          {/* Weekday Names Header */}
          <div className="grid grid-cols-7 gap-2 text-center text-xs font-mono uppercase tracking-wider text-slate-400 py-2 border-b border-white/10">
            <div>Sun</div>
            <div>Mon</div>
            <div>Tue</div>
            <div>Wed</div>
            <div>Thu</div>
            <div>Fri</div>
            <div>Sat</div>
          </div>

          {/* Day Cells Grid */}
          <div className="grid grid-cols-7 gap-2">
            {/* Empty offset days */}
            {Array.from({ length: firstDayOfWeek }).map((_, idx) => (
              <div
                key={`empty-${idx}`}
                className="min-h-24 sm:min-h-28 rounded-xl bg-black/20 border border-transparent opacity-30"
              />
            ))}

            {/* Days in Month */}
            {Array.from({ length: daysInMonth }).map((_, idx) => {
              const dayNum = idx + 1;
              const dateStr = `${currentYear}-${(currentMonth + 1).toString().padStart(2, '0')}-${dayNum.toString().padStart(2, '0')}`;
              const dayEvents = eventsInCurrentMonth.filter((e) => e.date === dateStr);
              const isToday =
                new Date().toISOString().slice(0, 10) === dateStr;

              return (
                <div
                  key={`day-${dayNum}`}
                  className={`min-h-24 sm:min-h-28 p-2 rounded-xl border flex flex-col justify-between transition-all ${
                    dayEvents.length > 0
                      ? 'bg-[#002244] border-amber-400/40 hover:border-amber-300 shadow-md'
                      : 'bg-white/5 border-white/5 hover:border-white/15'
                  } ${isToday ? 'ring-2 ring-sky-400' : ''}`}
                >
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span
                      className={`w-6 h-6 rounded-full flex items-center justify-center font-bold ${
                        dayEvents.length > 0
                          ? 'bg-amber-400 text-[#001428]'
                          : 'text-slate-300'
                      }`}
                    >
                      {dayNum}
                    </span>
                    {dayEvents.length > 0 && (
                      <span className="text-[10px] text-amber-300 font-bold hidden sm:inline">
                        {dayEvents.length} {dayEvents.length === 1 ? 'evt' : 'evts'}
                      </span>
                    )}
                  </div>

                  <div className="space-y-1 mt-1 overflow-hidden">
                    {dayEvents.map((evt) => (
                      <button
                        key={evt.id}
                        onClick={() => setSelectedEventModal(evt)}
                        className={`w-full text-left p-1 rounded text-[11px] truncate block font-medium cursor-pointer transition-colors ${getBadgeColor(
                          evt.type
                        )}`}
                        title={evt.title}
                      >
                        {evt.title}
                      </button>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* View 2: List View */}
      {viewMode === 'list' && (
        <div className="space-y-4">
          {filteredEvents.length === 0 ? (
            <div className="p-12 text-center text-slate-400 bg-[#001830] rounded-2xl border border-white/10">
              No events found for this filter.
            </div>
          ) : (
            filteredEvents.map((evt) => (
              <div
                key={evt.id}
                onClick={() => setSelectedEventModal(evt)}
                className="p-6 rounded-2xl bg-[#001830] border border-amber-500/20 hover:border-amber-400/50 transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-6 cursor-pointer shadow-lg"
              >
                <div className="space-y-2 max-w-3xl">
                  <div className="flex flex-wrap items-center gap-2.5 text-xs">
                    <span
                      className={`px-2.5 py-0.5 rounded-full font-mono text-[11px] border ${getBadgeColor(
                        evt.type
                      )}`}
                    >
                      {evt.type}
                    </span>
                    <span className="font-mono text-amber-300 font-bold flex items-center gap-1">
                      <CalendarIcon className="w-3.5 h-3.5" />
                      {evt.date}
                    </span>
                    <span className="text-slate-400 flex items-center gap-1 font-mono">
                      <Clock className="w-3.5 h-3.5 text-sky-400" />
                      {evt.startTime} - {evt.endTime}
                    </span>
                  </div>

                  <h3 className="font-serif text-lg font-bold text-white hover:text-amber-300 transition-colors">
                    {evt.title}
                  </h3>

                  <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                    {evt.description}
                  </p>

                  <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 pt-1">
                    <span className="flex items-center gap-1 text-slate-300">
                      <MapPin className="w-3.5 h-3.5 text-amber-400" />
                      {evt.location}
                    </span>
                    {evt.dressCode && (
                      <span className="text-sky-300">
                        Dress: <strong>{evt.dressCode}</strong>
                      </span>
                    )}
                  </div>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedEventModal(evt);
                  }}
                  className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/15 text-xs font-semibold text-white cursor-pointer shrink-0"
                >
                  View Details
                </button>
              </div>
            ))
          )}
        </div>
      )}

      {/* Event Details Modal */}
      {selectedEventModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="relative w-full max-w-lg bg-[#001933] border-2 border-amber-500/50 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
            <button
              onClick={() => setSelectedEventModal(null)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-lg bg-white/5"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-2 border-b border-white/10 pb-4 pr-8">
              <span
                className={`px-2.5 py-0.5 rounded-full font-mono text-[11px] border inline-block ${getBadgeColor(
                  selectedEventModal.type
                )}`}
              >
                {selectedEventModal.type}
              </span>
              <h2 className="font-serif text-2xl font-bold text-white">
                {selectedEventModal.title}
              </h2>
            </div>

            <div className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 rounded-xl bg-white/5 border border-white/10 space-y-1">
                  <span className="text-slate-400 block font-mono text-[11px]">Date</span>
                  <div className="font-bold text-amber-300 text-sm">{selectedEventModal.date}</div>
                </div>
                <div className="p-3 rounded-xl bg-white/5 border border-white/10 space-y-1">
                  <span className="text-slate-400 block font-mono text-[11px]">Timings</span>
                  <div className="font-bold text-sky-300">
                    {selectedEventModal.startTime} - {selectedEventModal.endTime}
                  </div>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-white/5 border border-white/10 space-y-1">
                <span className="text-slate-400 block font-mono text-[11px]">Muster Location</span>
                <div className="text-white font-medium flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-amber-400" />
                  <span>{selectedEventModal.location}</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-black/40 border border-white/10 space-y-1">
                <span className="text-slate-400 block font-mono text-[11px]">Instructions</span>
                <p className="text-slate-200 leading-relaxed text-xs sm:text-sm">
                  {selectedEventModal.description}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 text-slate-300">
                {selectedEventModal.dressCode && (
                  <div>
                    <span className="text-slate-400 block text-[11px]">Order of Dress:</span>
                    <span className="text-amber-300 font-semibold">{selectedEventModal.dressCode}</span>
                  </div>
                )}
                {selectedEventModal.inCharge && (
                  <div>
                    <span className="text-slate-400 block text-[11px]">Officer In-Charge:</span>
                    <span className="text-white font-semibold">{selectedEventModal.inCharge}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 flex justify-end">
              <button
                onClick={() => setSelectedEventModal(null)}
                className="px-5 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-xs text-white font-semibold cursor-pointer"
              >
                Close Briefing
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

