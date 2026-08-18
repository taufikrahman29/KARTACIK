'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Shield, 
  MapPin, 
  Mail, 
  Phone, 
  Car, 
  MessageSquareWarning, 
  ArrowUpRight,
  Heart
} from 'lucide-react';
import { InstagramIcon, FacebookIcon, YoutubeIcon } from '@/components/Icons';

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-800 pt-16 pb-12 relative overflow-hidden">
      {/* Glow ambient */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-900/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-900/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800/80">
          
          {/* Col 1: Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-700 p-0.5 shadow-md shadow-emerald-500/20">
                <div className="w-full h-full bg-slate-900 rounded-[10px] flex items-center justify-center">
                  <Shield className="w-6 h-6 text-emerald-400" />
                </div>
              </div>
              <div>
                <h3 className="font-extrabold text-white text-lg tracking-tight">
                  KARANG TARUNA
                </h3>
                <p className="text-xs text-emerald-400 font-semibold tracking-wider uppercase">
                  Kecamatan Cikancung
                </p>
              </div>
            </div>

            <p className="text-xs leading-relaxed text-slate-400 pr-4">
              Wadah pembinaan dan pengembangan generasi muda di 9 Desa se-Kecamatan Cikancung, Kabupaten Bandung. Berkomitmen bergerak bersama untuk kemajuan sosial, olahraga, kebudayaan, dan kemandirian ekonomi daerah.
            </p>

            <div className="flex items-center space-x-3 pt-2">
              <a
                href="https://instagram.com/kartabacip"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram Karang Taruna Cikancung"
                className="w-9 h-9 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-pink-400 hover:border-pink-500/40 hover:bg-slate-800 transition-all"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com/kartabacip"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook Karang Taruna Cikancung"
                className="w-9 h-9 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-blue-400 hover:border-blue-500/40 hover:bg-slate-800 transition-all"
              >
                <FacebookIcon className="w-4 h-4" />
              </a>
              <a
                href="https://youtube.com/@KarangTarunaCikancung"
                target="_blank"
                rel="noreferrer"
                aria-label="YouTube Karang Taruna Cikancung"
                className="w-9 h-9 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-red-400 hover:border-red-500/40 hover:bg-slate-800 transition-all"
              >
                <YoutubeIcon className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white border-b border-emerald-500/30 pb-2 inline-block">
              Navigasi Utama
            </h4>
            <ul className="space-y-2 text-xs">
              {['Beranda', 'Profil', 'Berita', 'Agenda', 'Pengumuman', 'Galeri', 'Struktur Organisasi'].map((item) => {
                const href = item === 'Beranda' ? '/' : item === 'Struktur Organisasi' ? '/organisasi' : `/${item.toLowerCase()}`;
                return (
                  <li key={item}>
                    <Link href={href} className="text-slate-400 hover:text-emerald-400 transition-colors flex items-center space-x-1 group">
                      <span>{item}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Col 3: Layanan Unggulan */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white border-b border-emerald-500/30 pb-2 inline-block">
              Layanan Unggulan
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link href="/grab-kt" className="p-2 rounded-lg bg-emerald-950/40 border border-emerald-800/40 text-emerald-300 hover:bg-emerald-900/60 flex items-center justify-between group">
                  <div className="flex items-center space-x-2">
                    <Car className="w-4 h-4 text-emerald-400" />
                    <span className="font-semibold">Grab KT Transport</span>
                  </div>
                  <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </Link>
              </li>
              <li>
                <Link href="/pengaduan" className="p-2 rounded-lg bg-amber-950/30 border border-amber-800/30 text-amber-300 hover:bg-amber-900/40 flex items-center justify-between group">
                  <div className="flex items-center space-x-2">
                    <MessageSquareWarning className="w-4 h-4 text-amber-400" />
                    <span className="font-semibold">Pengaduan Warga</span>
                  </div>
                  <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </Link>
              </li>
              <li>
                <Link href="/berita" className="text-slate-400 hover:text-emerald-400 transition-colors">
                  Feed Instagram @kartabacip
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact Info */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white border-b border-emerald-500/30 pb-2 inline-block">
              Sekretariat Pusat
            </h4>
            <div className="space-y-2.5 text-xs text-slate-400">
              <div className="flex items-start space-x-2.5">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Jl. Raya Cikancung No. 01, Kantor Kecamatan Cikancung, Kabupaten Bandung, Jawa Barat 40396</span>
              </div>
              <div className="flex items-center space-x-2.5">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>+62 812-3456-7890 (WhatsApp Hotline)</span>
              </div>
              <div className="flex items-center space-x-2.5">
                <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>info@kartabacip.or.id</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500 space-y-4 md:space-y-0">
          <p>© 2026 Karang Taruna Kecamatan Cikancung. All Rights Reserved.</p>
          <div className="flex items-center space-x-4">
            <Link href="/admin/login" className="hover:text-emerald-400 transition-colors">
              Portal Admin CMS
            </Link>
            <span>•</span>
            <span className="flex items-center space-x-1 text-slate-400">
              <span>Dikembangkan dengan</span>
              <Heart className="w-3 h-3 text-red-500 fill-red-500" />
              <span>untuk Pemuda Cikancung</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
