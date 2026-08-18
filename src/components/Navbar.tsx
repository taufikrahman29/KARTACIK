'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Shield, 
  Menu, 
  X, 
  Car, 
  MessageSquareWarning, 
  UserCheck, 
  ChevronRight,
  Sparkles
} from 'lucide-react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
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
    { name: 'Grab KT', href: '/grab-kt', highlight: true, icon: Car },
    { name: 'Pengaduan', href: '/pengaduan', highlight: true, icon: MessageSquareWarning },
    { name: 'Kontak', href: '/kontak' },
  ];

  const isActive = (path: string) => {
    if (path === '/' && pathname === '/') return true;
    if (path !== '/' && pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-slate-900/90 backdrop-blur-md shadow-lg shadow-emerald-950/20 py-3 border-b border-emerald-900/30' 
        : 'bg-gradient-to-b from-slate-950/80 via-slate-950/40 to-transparent py-4'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo & Title */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-700 p-0.5 shadow-md shadow-emerald-500/20 group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-slate-900 rounded-[10px] flex items-center justify-center">
                <Shield className="w-6 h-6 text-emerald-400" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-base sm:text-lg tracking-tight text-white group-hover:text-emerald-400 transition-colors">
                KARANG TARUNA
              </span>
              <span className="text-[10px] sm:text-xs tracking-widest text-emerald-400 font-semibold uppercase">
                Kecamatan Cikancung
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              const Icon = link.icon;

              if (link.highlight) {
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center space-x-1.5 transition-all shadow-sm ${
                      link.name === 'Grab KT'
                        ? 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white border border-emerald-400/30 shadow-emerald-900/30 hover:scale-105'
                        : 'bg-amber-500/10 text-amber-300 hover:bg-amber-500/20 border border-amber-500/30 hover:scale-105'
                    }`}
                  >
                    {Icon && <Icon className="w-3.5 h-3.5" />}
                    <span>{link.name}</span>
                    {link.name === 'Grab KT' && (
                      <span className="bg-amber-400 text-slate-950 text-[9px] font-black px-1 rounded uppercase">New</span>
                    )}
                  </Link>
                );
              }

              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    active
                      ? 'text-emerald-400 bg-emerald-950/50 font-semibold border border-emerald-500/30 shadow-sm'
                      : 'text-slate-200 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Button: Login Admin */}
          <div className="hidden lg:flex items-center space-x-3">
            <Link
              href="/admin/login"
              className="px-3.5 py-1.5 rounded-lg text-xs font-semibold text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-800 border border-slate-700/60 transition-all flex items-center space-x-1.5 shadow-sm"
            >
              <UserCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Login Admin</span>
            </Link>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex lg:hidden items-center space-x-2">
            <Link
              href="/grab-kt"
              className="px-2.5 py-1 rounded-md text-[11px] font-bold bg-emerald-600 text-white flex items-center space-x-1"
            >
              <Car className="w-3 h-3" />
              <span>Grab KT</span>
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-slate-800/80 border border-slate-700 text-slate-200 hover:text-white focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-emerald-400" /> : <Menu className="w-6 h-6 text-white" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-900/95 backdrop-blur-xl border-b border-emerald-900/40 px-4 pt-3 pb-6 space-y-2 mt-2 animate-in slide-in-from-top-4 duration-200">
          <div className="grid grid-cols-2 gap-2 pb-2 border-b border-slate-800">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              const Icon = link.icon;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-3 py-2 rounded-lg text-xs font-medium flex items-center justify-between transition-colors ${
                    active
                      ? 'bg-emerald-900/50 text-emerald-300 font-bold border border-emerald-500/30'
                      : link.highlight
                      ? 'bg-slate-800 text-amber-300 font-semibold border border-amber-500/20'
                      : 'text-slate-200 hover:bg-slate-800'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    {Icon && <Icon className="w-3.5 h-3.5 text-emerald-400" />}
                    <span>{link.name}</span>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 opacity-50" />
                </Link>
              );
            })}
          </div>

          <div className="pt-2">
            <Link
              href="/admin/login"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-2.5 rounded-lg bg-gradient-to-r from-slate-800 to-slate-700 text-slate-200 text-xs font-bold flex items-center justify-center space-x-2 border border-slate-700"
            >
              <UserCheck className="w-4 h-4 text-emerald-400" />
              <span>Portal Login Admin CMS</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
