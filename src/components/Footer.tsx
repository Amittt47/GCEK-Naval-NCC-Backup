import React from 'react';
import { HubTab } from '../types';
import { useUnitData } from '../context/UnitDataContext';
import { CrestLogo } from './CrestLogo';
import { Anchor, Shield, MapPin, Mail, Phone, ExternalLink, Award } from 'lucide-react';

interface FooterProps {
  onSelectTab: (tab: HubTab) => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectTab }) => {
  const { unitInfo } = useUnitData();

  return (
    <footer className="w-full bg-[#001020] border-t border-amber-500/25 text-slate-300 pt-14 pb-8 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-white/10">
          {/* Column 1: Unit & Identity */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <CrestLogo size={48} />
              <div>
                <h3 className="font-serif text-lg font-bold text-white uppercase tracking-wider">
                  {unitInfo.name}
                </h3>
                <p className="text-xs text-amber-400 font-medium">{unitInfo.affiliatedUnit}</p>
              </div>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Empowering future engineers with nautical discipline, blue-water maritime training, and unshakeable patriotic duty at {unitInfo.college}.
            </p>
            <div className="pt-2">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-navy-900 border border-amber-500/30 text-amber-300 text-xs font-serif font-semibold">
                <Anchor className="w-3.5 h-3.5" />
                <span>{unitInfo.navalMotto}</span>
              </div>
            </div>
          </div>

          {/* Column 2: Core Hubs Navigation */}
          <div>
            <h4 className="font-serif text-sm font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
              Cadet Portals
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button
                  onClick={() => onSelectTab('calendar')}
                  className="hover:text-amber-300 transition-colors cursor-pointer text-left font-semibold text-emerald-400"
                >
                  Dynamic Event Calendar
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('camps')}
                  className="hover:text-amber-300 transition-colors cursor-pointer text-left"
                >
                  Camps Hub (AINSC, RDC, NTAC)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('achievements')}
                  className="hover:text-amber-300 transition-colors cursor-pointer text-left"
                >
                  Cadet Achievements & Roll of Honor
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('ssb-hub')}
                  className="hover:text-amber-300 transition-colors cursor-pointer text-left"
                >
                  SSB Preparation Portal & OIR Engine
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('careers')}
                  className="hover:text-amber-300 transition-colors cursor-pointer text-left"
                >
                  Defence Career Hub & NCC Special Entry
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('resources')}
                  className="hover:text-amber-300 transition-colors cursor-pointer text-left"
                >
                  Seamanship & Drill Knowledge Base
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Higher Command Hierarchy */}
          <div>
            <h4 className="font-serif text-sm font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
              Command Affiliation
            </h4>
            <div className="space-y-3 text-xs text-slate-400">
              <div className="border-l-2 border-amber-400/40 pl-3">
                <span className="text-white font-medium block">Parent Unit</span>
                <span>{unitInfo.affiliatedUnit}</span>
              </div>
              <div className="border-l-2 border-sky-400/40 pl-3">
                <span className="text-white font-medium block">Group Headquarters</span>
                <span>{unitInfo.groupHQ}</span>
              </div>
              <div className="border-l-2 border-teal-400/40 pl-3">
                <span className="text-white font-medium block">State Directorate</span>
                <span>{unitInfo.directorate}</span>
              </div>
              <div className="border-l-2 border-indigo-400/40 pl-3">
                <span className="text-white font-medium block">Apex Command</span>
                <span>Directorate General NCC (DGNCC), New Delhi</span>
              </div>
            </div>
          </div>

          {/* Column 4: College & Unit Location */}
          <div>
            <h4 className="font-serif text-sm font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
              Contact & Location
            </h4>
            <ul className="space-y-3 text-xs text-slate-400">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>
                  {unitInfo.college}, {unitInfo.location}
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-sky-400 shrink-0" />
                <span className="font-mono text-slate-300">navalncc@gcekbpatna.ac.in</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>CTO Office: {unitInfo.cto.name}</span>
              </li>
              <li className="pt-2">
                <div className="text-[11px] text-slate-500">
                  Parade Schedule: Saturdays 0600 - 0830 hrs & 1530 - 1730 hrs
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Sub-footer copyright & credentials */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} GCEK Naval NCC Sub-Unit · All Rights Reserved.</p>
          <div className="flex items-center gap-4">
            <button
              onClick={() => onSelectTab('about')}
              className="hover:text-amber-300 transition-colors"
            >
              Unit History
            </button>
            <span>·</span>
            <button
              onClick={() => onSelectTab('alumni')}
              className="hover:text-amber-300 transition-colors"
            >
              Alumni Mentorship
            </button>
            <span>·</span>
            <button
              onClick={() => onSelectTab('admin')}
              className="hover:text-amber-300 transition-colors text-amber-400/90 font-medium"
            >
              Admin Portal
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
