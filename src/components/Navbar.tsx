'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Shield, 
  Menu, 
  X, 
  Car, 
  ChevronRight,
  Sun,
  Moon
} from 'lucide-react';
import { DataStore, SiteSettings } from '@/lib/data-store';
import { useTheme } from '@/lib/theme-context';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [settings, setSettings] = useState<SiteSettings>(DataStore.getSettings());
  const { theme, toggleTheme } = useTheme();
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Beranda', href: '/' },
    { name: 'Profil', href: '/profil' },
    { name: 'Berita', href: '/berita' },
    { name: 'Agenda', href: '/agenda' },
    { name: 'Pengumuman', href: '/pengumuman' },
    { name: 'Galeri', href: '/galeri' },
    { name: 'Struktur', href: '/organisasi' },
    { name: 'Pengaduan', href: '/pengaduan' },
    { name: 'Kontak', href: '/kontak' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? theme === 'light'
            ? 'bg-white/90 backdrop-blur-md border-b border-slate-200 shadow-lg py-3'
            : 'bg-slate-950/90 backdrop-blur-md border-b border-slate-800 shadow-xl py-3'
          : theme === 'light'
            ? 'bg-gradient-to-b from-white/90 to-transparent py-4'
            : 'bg-gradient-to-b from-slate-950/90 to-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* LOGO & BRAND TITLE */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-700 p-0.5 shadow-lg group-hover:scale-105 transition-transform flex items-center justify-center overflow-hidden shrink-0">
              {settings.logoUrl ? (
                <img src={settings.logoUrl} alt="Logo Karang Taruna" className="w-full h-full object-cover rounded-lg" />
              ) : (
                <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                  <Shield className="w-6 h-6 text-emerald-400 fill-emerald-400/20" />
                </div>
              )}
            </div>

            <div className="flex flex-col">
              <span className="font-extrabold text-sm sm:text-base text-white tracking-tight leading-none group-hover:text-emerald-400 transition-colors">
                KARANG TARUNA
              </span>
              <span className="text-[10px] sm:text-xs font-bold text-emerald-400 uppercase tracking-wider">
                Kecamatan Cikancung
              </span>
            </div>
          </Link>

          {/* DESKTOP NAVIGATION */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-2 rounded-xl text-xs font-semibold transition-all duration-200 ${
                    isActive
                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-bold'
                      : 'text-slate-300 hover:text-white hover:bg-slate-900/60'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* RIGHT ACTION BUTTONS */}
          <div className="hidden lg:flex items-center space-x-2.5">
            
            {/* THEME TOGGLE BUTTON (DAY/LIGHT & NIGHT/DARK MODE) */}
            <button
              onClick={toggleTheme}
              className={`p-2.5 rounded-xl border flex items-center space-x-2 text-xs font-bold transition-all shadow-md ${
                theme === 'light'
                  ? 'bg-amber-100/80 border-amber-300 text-amber-800 hover:bg-amber-200/80'
                  : 'bg-slate-900 border-slate-700 text-amber-300 hover:bg-slate-800'
              }`}
              title={theme === 'dark' ? 'Beralih ke Mode Siang (Light)' : 'Beralih ke Mode Malam (Dark)'}
            >
              {theme === 'dark' ? (
                <>
                  <Sun className="w-4 h-4 text-amber-400 animate-spin-slow" />
                  <span>Siang</span>
                </>
              ) : (
                <>
                  <Moon className="w-4 h-4 text-indigo-600" />
                  <span>Malam</span>
                </>
              )}
            </button>

            {/* Grab KT Badge Link */}
            <Link
              href="/grab-kt"
              className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-amber-500/20 to-emerald-500/20 border border-amber-500/40 text-amber-300 hover:text-amber-200 text-xs font-bold flex items-center space-x-1.5 hover:scale-105 transition-all shadow-md"
            >
              <Car className="w-4 h-4 text-amber-400 animate-pulse" />
              <span>Grab KT</span>
            </Link>

            {/* Login Admin Button */}
            <Link
              href="/admin/login"
              className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 text-xs font-bold transition-all"
            >
              Login Admin
            </Link>
          </div>

          {/* MOBILE HAMBURGER & THEME TOGGLE BUTTON */}
          <div className="lg:hidden flex items-center space-x-2">
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-xl border text-xs font-bold transition-all ${
                theme === 'light'
                  ? 'bg-amber-100 border-amber-300 text-amber-800'
                  : 'bg-slate-900 border-slate-800 text-amber-300'
              }`}
              title={theme === 'dark' ? 'Mode Siang' : 'Mode Malam'}
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-600" />}
            </button>

            <Link
              href="/grab-kt"
              className="px-2.5 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-[11px] font-bold flex items-center space-x-1"
            >
              <Car className="w-3.5 h-3.5" />
              <span>Grab KT</span>
            </Link>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white"
              aria-label="Toggle Menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* MOBILE DRAWER */}
      {isOpen && (
        <div className="lg:hidden bg-slate-950/95 backdrop-blur-xl border-b border-slate-800 px-4 pt-3 pb-6 space-y-3 animate-in slide-in-from-top duration-200">
          <div className="grid grid-cols-2 gap-2 text-xs">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`p-2.5 rounded-xl font-bold flex items-center justify-between ${
                    isActive
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-900 text-slate-300 border border-slate-800'
                  }`}
                >
                  <span>{link.name}</span>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                </Link>
              );
            })}
          </div>

          <div className="pt-2 border-t border-slate-800 flex items-center space-x-2">
            <button
              onClick={() => {
                toggleTheme();
              }}
              className="flex-1 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-center text-xs font-bold text-amber-300 flex items-center justify-center space-x-2"
            >
              {theme === 'dark' ? (
                <>
                  <Sun className="w-4 h-4 text-amber-400" />
                  <span>Beralih ke Mode Siang (Light)</span>
                </>
              ) : (
                <>
                  <Moon className="w-4 h-4 text-indigo-400" />
                  <span>Beralih ke Mode Malam (Dark)</span>
                </>
              )}
            </button>

            <Link
              href="/admin/login"
              onClick={() => setIsOpen(false)}
              className="flex-1 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-center text-xs font-bold text-slate-200"
            >
              Login Admin
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
