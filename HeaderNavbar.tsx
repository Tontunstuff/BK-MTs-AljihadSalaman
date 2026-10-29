import React from 'react';
import { useApp } from '../context/AppContext';
import {
  GraduationCap,
  ShieldCheck,
  UserCheck,
  Smartphone,
  Monitor,
  Database,
  RotateCcw,
  Sparkles,
} from 'lucide-react';
import { PWAInstallButton } from './pwa/PWAInstallButton';

export const HeaderNavbar: React.FC = () => {
  const {
    role,
    setRole,
    activeStudent,
    setActiveStudent,
    students,
    counselor,
    isMobileFrame,
    setIsMobileFrame,
    setShowDocModal,
    resetAllData,
  } = useApp();

  return (
    <header className="sticky top-0 z-30 bg-emerald-800 text-white shadow-md border-b border-emerald-900/40">
      <div className="max-w-6xl mx-auto px-4 py-2.5 flex flex-wrap items-center justify-between gap-3">
        {/* Brand / Logo */}
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-400 to-emerald-400 p-0.5 shadow-md flex items-center justify-center">
            <div className="w-full h-full bg-emerald-900 rounded-[14px] flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-amber-300" />
            </div>
          </div>
          <div>
            <div className="flex items-center space-x-1.5">
              <span className="font-extrabold text-sm tracking-wide text-white">BK MTs Al Jihad Salaman</span>
              <span className="text-[10px] bg-amber-400/20 text-amber-300 font-semibold px-2 py-0.5 rounded-full border border-amber-400/30">
                Online
              </span>
            </div>
            <p className="text-[11px] text-emerald-200">
              Guru BK: <span className="text-white font-medium">{counselor.name}</span>
            </p>
          </div>
        </div>

        {/* Action Controls & Role Switcher */}
        <div className="flex flex-wrap items-center gap-2">
          {/* PWA Install Button */}
          <PWAInstallButton compact={true} />

          {/* Blueprint button */}
          <button
            onClick={() => setShowDocModal(true)}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-emerald-100 text-xs font-semibold border border-white/15 transition-all shadow-sm"
            title="Lihat Rancangan Arsitektur, Skema Database & User Flow"
          >
            <Database className="w-3.5 h-3.5 text-amber-300" />
            <span className="hidden sm:inline">Rancangan Database & Arsitektur</span>
            <span className="sm:hidden">Arsitektur</span>
          </button>

          {/* Toggle Device Frame */}
          <button
            onClick={() => setIsMobileFrame(!isMobileFrame)}
            className="flex items-center space-x-1.5 px-2.5 py-1.5 rounded-xl bg-emerald-900/80 hover:bg-emerald-950 text-emerald-200 text-xs font-medium border border-emerald-700/50 transition-all"
            title={isMobileFrame ? 'Beralih ke Layar Lebar' : 'Simulasi Tampilan HP'}
          >
            {isMobileFrame ? (
              <>
                <Monitor className="w-3.5 h-3.5 text-teal-300" />
                <span className="hidden md:inline">Mode Layar Penuh</span>
              </>
            ) : (
              <>
                <Smartphone className="w-3.5 h-3.5 text-teal-300" />
                <span className="hidden md:inline">Mode Layar HP</span>
              </>
            )}
          </button>

          {/* Role Switcher Pill */}
          <div className="flex items-center bg-emerald-950/70 p-1 rounded-2xl border border-emerald-700/50 text-xs">
            <button
              onClick={() => setRole('siswa')}
              className={`flex items-center space-x-1.5 px-3 py-1 rounded-xl font-semibold transition-all ${
                role === 'siswa'
                  ? 'bg-emerald-500 text-white shadow-sm'
                  : 'text-emerald-300 hover:text-white'
              }`}
            >
              <UserCheck className="w-3.5 h-3.5" />
              <span>Siswa</span>
            </button>
            <button
              onClick={() => setRole('guru_bk')}
              className={`flex items-center space-x-1.5 px-3 py-1 rounded-xl font-semibold transition-all ${
                role === 'guru_bk'
                  ? 'bg-amber-500 text-slate-950 shadow-sm font-bold'
                  : 'text-emerald-300 hover:text-white'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Guru BK (Ibu Istiarini)</span>
            </button>
          </div>

          {/* If role is Siswa, quick switcher for which student */}
          {role === 'siswa' && (
            <div className="hidden lg:flex items-center space-x-1 text-xs bg-emerald-900/60 px-2 py-1 rounded-xl border border-emerald-700/40">
              <span className="text-emerald-300 text-[11px]">Siswa:</span>
              <select
                value={activeStudent.id}
                onChange={(e) => {
                  const s = students.find((item) => item.id === e.target.value);
                  if (s) setActiveStudent(s);
                }}
                className="bg-transparent text-white font-medium focus:outline-none cursor-pointer"
              >
                {students.map((s) => (
                  <option key={s.id} value={s.id} className="bg-emerald-900 text-white">
                    {s.name} ({s.classGroup})
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Reset Demo Button */}
          <button
            onClick={() => {
              if (confirm('Kembalikan data demo ke setelan awal?')) {
                resetAllData();
              }
            }}
            className="p-1.5 rounded-xl text-emerald-300 hover:text-white hover:bg-emerald-700/50 transition"
            title="Reset Data Demo"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </header>
  );
};
