'use client';

import React, { useState } from 'react';
import { useUnitData } from '../../../src/context/UnitDataContext';
import { AdminHeader } from '../../../components/admin/AdminHeader';
import { NavalEvent } from '../../../src/types';
import {
  Calendar as CalendarIcon,
  Plus,
  Trash2,
  Edit3,
  X,
  Clock,
  MapPin,
  Compass,
  CheckCircle2,
} from 'lucide-react';

export default function AdminEventsPage({
  onToggleSidebar = () => {},
}: {
  onToggleSidebar?: () => void;
}) {
  const { events, addEvent, updateEvent, deleteEvent } = useUnitData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<NavalEvent | null>(null);

  // Form State
  const [title, setTitle] = useState('');
  const [type, setType] = useState<NavalEvent['type']>('Parade');
  const [date, setDate] = useState('2026-10-15');
  const [startTime, setStartTime] = useState('06:00 AM');
  const [endTime, setEndTime] = useState('08:30 AM');
  const [location, setLocation] = useState('College Parade Ground');
  const [description, setDescription] = useState('');
  const [dressCode, setDressCode] = useState('Uniform 1A');
  const [inCharge, setInCharge] = useState('ANO/CTO & CC Rajesh Tripathy');

  const handleOpenAdd = () => {
    setEditingEvent(null);
    setTitle('');
    setType('Parade');
    setDate(new Date().toISOString().slice(0, 10));
    setStartTime('06:00 AM');
    setEndTime('08:30 AM');
    setLocation('College Parade Ground');
    setDescription('');
    setDressCode('Uniform 1A');
    setInCharge('ANO/CTO & CC Rajesh Tripathy');
    setIsModalOpen(true);
  };

  const handleOpenEdit = (evt: NavalEvent) => {
    setEditingEvent(evt);
    setTitle(evt.title);
    setType(evt.type);
    setDate(evt.date);
    setStartTime(evt.startTime);
    setEndTime(evt.endTime);
    setLocation(evt.location);
    setDescription(evt.description);
    setDressCode(evt.dressCode || '');
    setInCharge(evt.inCharge || '');
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !date) return;

    if (editingEvent) {
      updateEvent(editingEvent.id, {
        title: title.trim(),
        type,
        date,
        startTime,
        endTime,
        location: location.trim() || 'College Parade Ground',
        description: description.trim() || 'Mandatory muster for naval cadets.',
        dressCode: dressCode.trim() || undefined,
        inCharge: inCharge.trim() || undefined,
      });
    } else {
      addEvent({
        id: `evt-${Date.now()}`,
        title: title.trim(),
        type,
        date,
        startTime,
        endTime,
        location: location.trim() || 'College Parade Ground',
        description: description.trim() || 'Mandatory muster for naval cadets.',
        dressCode: dressCode.trim() || undefined,
        inCharge: inCharge.trim() || undefined,
      });
    }

    setIsModalOpen(false);
  };

  const handleAddWeekendClasses = () => {
    const satEvent: NavalEvent = {
      id: `evt-sat-${Date.now()}`,
      title: 'Weekly NCC Class: Naval Seamanship & Service Theory (Saturday Class)',
      type: 'Theory Lecture',
      date: '2026-10-10',
      startTime: '08:00 AM',
      endTime: '11:30 AM',
      location: 'Naval Training Room & Campus Grounds',
      description: 'Weekly mandatory 2-day training class. Focus on Naval bends and hitches, ship nomenclature, compass plotting, and service subjects.',
      dressCode: 'Uniform 1A / Working Whites',
      inCharge: 'ANO / CTO & CC Rajesh Tripathy',
    };
    const sunEvent: NavalEvent = {
      id: `evt-sun-${Date.now() + 1}`,
      title: 'Weekly NCC Class: Parade Drill, PT & Boat Pulling (Sunday Class)',
      type: 'Parade',
      date: '2026-10-11',
      startTime: '06:00 AM',
      endTime: '09:30 AM',
      location: 'College Parade Square & Reservoir Boat Shed',
      description: 'Weekly mandatory 2-day training class. Morning physical conditioning, ceremonial squad foot drill, arms drill, and whaler boat pulling practice.',
      dressCode: 'Uniform 1A (Pristine Whites & Beret)',
      inCharge: 'POC Ayush Mohanty & PI Staff',
    };
    addEvent(satEvent);
    addEvent(sunEvent);
  };

  return (
    <div className="flex-1 flex flex-col">
      <AdminHeader
        onToggleSidebar={onToggleSidebar}
        title="Event Schedule & Drill Orders"
        subtitle="Manage routine parades, camp selection timings, and certificate examinations"
      />

      <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto w-full">
        {/* Top Controls */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold font-serif text-white">Scheduled Operations ({events.length})</h2>
            <p className="text-xs text-slate-400">Events published here appear immediately in the public Dynamic Event Calendar.</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleAddWeekendClasses}
              className="px-4 py-2 rounded-xl bg-sky-500/20 hover:bg-sky-500/30 text-sky-300 font-semibold text-xs border border-sky-400/40 flex items-center gap-1.5 cursor-pointer transition-colors"
            >
              <Compass className="w-3.5 h-3.5" />
              <span>Quick Add Weekend Classes</span>
            </button>
            <button
              onClick={handleOpenAdd}
              className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-[#001428] font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-lg transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Schedule New Event</span>
            </button>
          </div>
        </div>

        {/* Events Table / Cards */}
        <div className="space-y-3">
          {events.length === 0 ? (
            <div className="p-12 text-center text-slate-400 bg-[#001830] rounded-2xl border border-white/10">
              No events scheduled. Click &quot;Schedule New Event&quot; to add one.
            </div>
          ) : (
            events.map((evt) => (
              <div
                key={evt.id}
                className="p-5 rounded-2xl bg-[#001830] border border-white/10 hover:border-amber-400/40 transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
              >
                <div className="space-y-1.5 max-w-3xl">
                  <div className="flex flex-wrap items-center gap-2 text-xs">
                    <span className="px-2.5 py-0.5 rounded-full font-mono text-[11px] bg-amber-400/10 text-amber-300 border border-amber-400/30">
                      {evt.type}
                    </span>
                    <span className="font-mono text-white font-semibold flex items-center gap-1">
                      <CalendarIcon className="w-3.5 h-3.5 text-amber-400" />
                      {evt.date}
                    </span>
                    <span className="text-slate-400 flex items-center gap-1 font-mono text-xs">
                      <Clock className="w-3.5 h-3.5 text-sky-400" />
                      {evt.startTime} - {evt.endTime}
                    </span>
                  </div>
                  <h3 className="font-serif text-base font-bold text-white">{evt.title}</h3>
                  <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">{evt.description}</p>
                  <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 pt-0.5">
                    <span className="flex items-center gap-1 text-slate-300">
                      <MapPin className="w-3.5 h-3.5 text-amber-400" />
                      {evt.location}
                    </span>
                    {evt.dressCode && <span>Dress: <strong className="text-slate-200">{evt.dressCode}</strong></span>}
                    {evt.inCharge && <span>In-Charge: <strong className="text-slate-200">{evt.inCharge}</strong></span>}
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end md:self-center shrink-0">
                  <button
                    onClick={() => handleOpenEdit(evt)}
                    className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-amber-300 hover:text-amber-200 border border-white/10 cursor-pointer"
                    title="Edit Event"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => {
                      if (window.confirm(`Delete event "${evt.title}"?`)) {
                        deleteEvent(evt.id);
                      }
                    }}
                    className="p-2 rounded-xl bg-white/5 hover:bg-red-500/20 text-slate-400 hover:text-red-300 border border-white/10 cursor-pointer"
                    title="Delete Event"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Add / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-xl bg-[#001933] border-2 border-amber-400/50 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 my-8 text-xs">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-lg bg-white/5"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <h2 className="font-serif text-xl font-bold text-white">
                {editingEvent ? 'Edit Scheduled Event' : 'Schedule New Unit Event'}
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Configure parade muster, lecture topics, examination timings, and officer in charge.
              </p>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div className="space-y-1">
                <label className="text-slate-300 font-medium block">Event Title</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. B-Certificate Weapons Stripping & Assembly Mock"
                  className="w-full p-2.5 rounded-xl bg-black/40 border border-white/20 text-white focus:outline-none focus:border-amber-400 text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-slate-300 font-medium block">Category</label>
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value as NavalEvent['type'])}
                    className="w-full p-2.5 rounded-xl bg-[#001428] border border-white/20 text-white focus:outline-none focus:border-amber-400 text-xs"
                  >
                    <option value="Parade">Parade / Drill</option>
                    <option value="Camp Selection">Camp Selection</option>
                    <option value="Theory Lecture">Theory Lecture</option>
                    <option value="Social Activity">Social Activity</option>
                    <option value="Examination">Examination</option>
                    <option value="Ceremony">Ceremony</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-slate-300 font-medium block">Date (YYYY-MM-DD)</label>
                  <input
                    type="date"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-black/40 border border-white/20 text-white focus:outline-none focus:border-amber-400 text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-slate-300 font-medium block">Start Time</label>
                  <input
                    type="text"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    placeholder="06:00 AM"
                    className="w-full p-2.5 rounded-xl bg-black/40 border border-white/20 text-white focus:outline-none focus:border-amber-400 text-xs"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-slate-300 font-medium block">End Time</label>
                  <input
                    type="text"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    placeholder="08:30 AM"
                    className="w-full p-2.5 rounded-xl bg-black/40 border border-white/20 text-white focus:outline-none focus:border-amber-400 text-xs"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-slate-300 font-medium block">Muster Location</label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="College Football Ground & Parade Square"
                  className="w-full p-2.5 rounded-xl bg-black/40 border border-white/20 text-white focus:outline-none focus:border-amber-400 text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-slate-300 font-medium block">Dress Code</label>
                  <input
                    type="text"
                    value={dressCode}
                    onChange={(e) => setDressCode(e.target.value)}
                    placeholder="Uniform 1A / Working Whites"
                    className="w-full p-2.5 rounded-xl bg-black/40 border border-white/20 text-white focus:outline-none focus:border-amber-400 text-xs"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-slate-300 font-medium block">Officer In-Charge</label>
                  <input
                    type="text"
                    value={inCharge}
                    onChange={(e) => setInCharge(e.target.value)}
                    placeholder="ANO/CTO & CC Rajesh Tripathy"
                    className="w-full p-2.5 rounded-xl bg-black/40 border border-white/20 text-white focus:outline-none focus:border-amber-400 text-xs"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-slate-300 font-medium block">Description & Orders</label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Provide muster instructions, kit checklist, or syllabus..."
                  className="w-full p-2.5 rounded-xl bg-black/40 border border-white/20 text-white focus:outline-none focus:border-amber-400 text-xs"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-slate-300 font-medium cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-[#001428] font-bold shadow-lg cursor-pointer"
                >
                  {editingEvent ? 'Save Changes' : 'Schedule Event'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
