'use client';

import React from 'react';
import Link from 'next/link';
import { useUnitData } from '../../src/context/UnitDataContext';
import { CrestLogo } from '../naval/CrestLogo';
import { Anchor, Shield, MapPin, Mail, Phone, ExternalLink } from 'lucide-react';

export const Footer: React.FC = () => {
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
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#001f3f] border border-amber-500/30 text-amber-300 text-xs font-serif font-semibold">
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
                <Link
                  href="/calendar"
                  className="hover:text-amber-300 transition-colors cursor-pointer text-left font-semibold text-emerald-400 block"
                >
                  Dynamic Event Calendar & Schedule
                </Link>
              </li>
              <li>
                <Link
                  href="/camps"
                  className="hover:text-amber-300 transition-colors cursor-pointer text-left block"
                >
                  Camps Hub (AINSC, RDC, NTAC)
                </Link>
              </li>
              <li>
                <Link
                  href="/achievements"
                  className="hover:text-amber-300 transition-colors cursor-pointer text-left block"
                >
                  Cadet Achievements & Roll of Honor
                </Link>
              </li>
              <li>
                <Link
                  href="/ssb-hub"
                  className="hover:text-amber-300 transition-colors cursor-pointer text-left block"
                >
                  SSB Preparation Portal & OIR Engine
                </Link>
              </li>
              <li>
                <Link
                  href="/careers"
                  className="hover:text-amber-300 transition-colors cursor-pointer text-left block"
                >
                  Defence Careers & Commissioning Routes
                </Link>
              </li>
              <li>
                <Link
                  href="/resources"
                  className="hover:text-amber-300 transition-colors cursor-pointer text-left block"
                >
                  Cadet Resources & Seamanship Manuals
                </Link>
              </li>
              <li>
                <Link
                  href="/gallery"
                  className="hover:text-amber-300 transition-colors cursor-pointer text-left block"
                >
                  Visual Archives & Activity Photos
                </Link>
              </li>
              <li>
                <Link
                  href="/alumni"
                  className="hover:text-amber-300 transition-colors cursor-pointer text-left block"
                >
                  Alumni Mentorship Network
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact & Headquarters */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
              Unit Headquarters
            </h4>
            <div className="flex items-start gap-2.5 text-xs text-slate-300">
              <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <span>
                {unitInfo.location}
              </span>
            </div>
            <div className="flex items-center gap-2.5 text-xs text-slate-300">
              <Phone className="w-4 h-4 text-sky-400 shrink-0" />
              <span>{unitInfo.contactPhone}</span>
            </div>
            <div className="flex items-center gap-2.5 text-xs text-slate-300">
              <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{unitInfo.contactEmail}</span>
            </div>
            <div className="pt-2 text-[11px] font-mono text-slate-400 border-t border-white/10 space-y-1">
              <div>Group HQ: <span className="text-amber-300">{unitInfo.groupHQ}</span></div>
              <div>Dte: <span className="text-amber-300">{unitInfo.directorate}</span></div>
              <div>Sub-Unit Code: <span className="text-sky-300">{unitInfo.subUnitCode}</span></div>
            </div>
          </div>

          {/* Column 4: Official Affiliations & Quick Links */}
          <div className="space-y-4">
            <h4 className="font-serif text-sm font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              Official Nodes
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a
                  href="https://indiannavy.nic.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-200 transition-colors group"
                >
                  <span>Join Indian Navy (Nausena)</span>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-amber-400 transition-colors" />
                </a>
              </li>
              <li>
                <a
                  href="https://indiancc.nic.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-200 transition-colors group"
                >
                  <span>DG NCC Official Portal</span>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-amber-400 transition-colors" />
                </a>
              </li>
              <li>
                <a
                  href="https://gcekbpatna.ac.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-200 transition-colors group"
                >
                  <span>GCEK Kalahandi Institutional Site</span>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-amber-400 transition-colors" />
                </a>
              </li>
            </ul>

            <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-[11px] text-amber-200 flex items-center justify-between">
              <div>
                <span className="font-semibold block text-amber-300">Command Console</span>
                <span className="text-[10px] text-slate-400">Restricted officer access</span>
              </div>
              <Link
                href="/admin"
                className="px-2.5 py-1 rounded bg-amber-500 hover:bg-amber-400 text-[#001428] font-bold text-[10px] transition-colors"
              >
                Enter
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Strip */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-amber-400" />
            <span>
              &copy; {new Date().getFullYear()} {unitInfo.name} · {unitInfo.college}. All rights reserved.
            </span>
          </div>
          <div className="flex items-center gap-4 text-[11px] font-mono">
            <span>Motto: {unitInfo.motto}</span>
            <span>·</span>
            <span className="text-amber-300">Proudly Naval Wing</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
