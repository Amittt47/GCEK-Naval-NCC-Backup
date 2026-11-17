'use client';

import React, { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { CrestLogo } from '../../../components/naval/CrestLogo';
import { WarshipSilhouette } from '../../../components/naval/WarshipSilhouette';
import { createClient } from '../../../lib/supabase/client';
import {
  Shield,
  Lock,
  Mail,
  ArrowRight,
  AlertCircle,
  CheckCircle2,
  Anchor,
  Compass,
} from 'lucide-react';

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectPath = searchParams?.get('redirect') || '/admin';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(null);

    try {
      const supabase = createClient();
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password: password.trim(),
      });

      if (error) {
        // If Supabase credentials are placeholder or invalid, explain and offer demo access
        if (
          error.message.includes('placeholder') ||
          error.message.includes('Failed to fetch') ||
          error.message.includes('Invalid login credentials')
        ) {
          setErrorMessage(
            'Invalid credentials or Supabase not yet connected. Click "Quick Command Access" below for immediate review.'
          );
        } else {
          setErrorMessage(error.message);
        }
        setLoading(false);
        return;
      }

      if (data.session) {
        setSuccessMessage('Authentication verified. Redirecting to Command Console...');
        setTimeout(() => {
          router.push(redirectPath);
          router.refresh();
        }, 800);
      }
    } catch (err) {
      setErrorMessage(
        'Connection error. You can use the Quick Command Access button below.'
      );
      setLoading(false);
    }
  };

  const handleDemoLogin = () => {
    setLoading(true);
    // Set demo cookie for middleware and client access
    document.cookie = 'gcek_admin_demo_session=active; path=/; max-age=86400; SameSite=Lax';
    setSuccessMessage('Authorized Officer Session initiated. Welcome, Commander.');
    setTimeout(() => {
      router.push(redirectPath);
      router.refresh();
    }, 600);
  };

  return (
    <div className="relative rounded-3xl bg-gradient-to-b from-[#001f3f]/90 via-[#00152b]/95 to-[#001020] border-2 border-amber-500/40 p-8 shadow-[0_0_50px_-10px_rgba(212,175,55,0.25)] backdrop-blur-xl space-y-6">
      {/* Crest and Title */}
      <div className="text-center space-y-3">
        <div className="flex justify-center">
          <CrestLogo size={64} />
        </div>
        <div>
          <h1 className="font-serif text-2xl font-bold text-white tracking-wide uppercase">
            Command Console Login
          </h1>
          <p className="text-xs text-amber-300/80 font-mono mt-1">
            4 Odisha Naval Unit NCC · GCEK Sub-Unit
          </p>
          <p className="text-[11px] text-slate-400 mt-1">
            For Commanding Officer (CO), ANO/CTO & Authorized Unit Administrators
          </p>
        </div>
      </div>

      {/* Error & Success Alerts */}
      {errorMessage && (
        <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs flex items-start gap-2.5">
          <AlertCircle className="w-4 h-4 shrink-0 text-red-400 mt-0.5" />
          <span>{errorMessage}</span>
        </div>
      )}

      {successMessage && (
        <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-start gap-2.5">
          <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400 mt-0.5" />
          <span>{successMessage}</span>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleLogin} className="space-y-4 text-xs">
        <div className="space-y-1">
          <label className="text-slate-300 font-medium block flex items-center gap-1.5">
            <Mail className="w-3.5 h-3.5 text-sky-400" />
            <span>Officer / Admin Email</span>
          </label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="e.g. nccnaval@gcekbpatna.ac.in"
            className="w-full p-3 rounded-xl bg-black/40 border border-white/15 text-white placeholder:text-slate-500 focus:outline-none focus:border-amber-400 transition-colors"
          />
        </div>

        <div className="space-y-1">
          <label className="text-slate-300 font-medium block flex items-center gap-1.5">
            <Lock className="w-3.5 h-3.5 text-amber-400" />
            <span>Security Password</span>
          </label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••••••"
            className="w-full p-3 rounded-xl bg-black/40 border border-white/15 text-white placeholder:text-slate-500 focus:outline-none focus:border-amber-400 transition-colors"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-[#001428] font-bold text-xs shadow-lg cursor-pointer transition-all flex items-center justify-center gap-2 uppercase tracking-wider"
        >
          <span>{loading ? 'Authenticating...' : 'Authenticate Credentials'}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </form>

      {/* Quick Demo Access Divider */}
      <div className="relative pt-2">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-white/10" />
        </div>
        <div className="relative flex justify-center text-[10px] uppercase font-mono">
          <span className="bg-[#001830] px-3 text-slate-400">Authorized Officer Evaluation</span>
        </div>
      </div>

      <button
        onClick={handleDemoLogin}
        disabled={loading}
        className="w-full py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-amber-500/30 text-amber-300 hover:text-white font-semibold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
      >
        <Compass className="w-4 h-4 text-amber-400" />
        <span>⚡ Quick Command Access (Officer Mode)</span>
      </button>

      <div className="text-center text-[11px] text-slate-400 pt-2 border-t border-white/5">
        <span>National Cadet Corps · Government of India & Odisha Directorate</span>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-[#001020] text-slate-100 flex flex-col justify-between relative overflow-hidden">
      {/* Background Warship Silhouette */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none opacity-20">
        <WarshipSilhouette />
      </div>

      {/* Decorative top ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gradient-to-b from-[#005f9e]/20 via-[#d4af37]/10 to-transparent blur-3xl pointer-events-none" />

      {/* Header bar */}
      <div className="p-6 max-w-7xl mx-auto w-full flex items-center justify-between z-10">
        <Link href="/" className="flex items-center gap-2 group text-xs text-slate-400 hover:text-white transition-colors">
          <Anchor className="w-4 h-4 text-amber-400" />
          <span>Return to Public Portal</span>
        </Link>
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 font-mono text-[11px]">
          <Shield className="w-3 h-3" />
          <span>Restricted Officer Portal</span>
        </div>
      </div>

      {/* Main Login Card with Suspense */}
      <div className="flex-1 flex items-center justify-center p-4 z-10">
        <div className="w-full max-w-md">
          <Suspense fallback={
            <div className="p-8 rounded-3xl bg-[#001428] border border-amber-500/30 text-center text-amber-400 font-mono text-xs">
              Loading Officer Security Terminal...
            </div>
          }>
            <LoginForm />
          </Suspense>
        </div>
      </div>

      {/* Footer copyright */}
      <div className="p-4 text-center text-xs text-slate-500 z-10">
        &copy; {new Date().getFullYear()} GCEK Naval NCC Portal · Military Discipline & Integrity
      </div>
    </div>
  );
}
