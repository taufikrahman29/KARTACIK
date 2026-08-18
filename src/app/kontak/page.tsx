'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Send,
  MessageSquare,
  ShieldCheck,
  Building,
  ExternalLink
} from 'lucide-react';
import { InstagramIcon } from '@/components/Icons';

export default function KontakPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 selection:bg-emerald-500 selection:text-slate-950 font-sans">
      <Navbar />

      <main className="flex-1 pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full space-y-12">
        
        {/* HERO SECTION */}
        <section className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-700/50 text-emerald-400 text-xs font-extrabold uppercase tracking-widest">
            <Phone className="w-3.5 h-3.5" />
            <span>Kontak & Sekretariat Official</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Hubungi Karang Taruna Kecamatan Cikancung
          </h1>

          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Silakan hubungi sekretariat kami, layanan hotline WhatsApp, DM Instagram, atau sampaikan aspirasi dan kolaborasi Anda.
          </p>
        </section>

        {/* CONTACT CARDS GRID */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* INSTAGRAM OFFICIAL */}
          <a
            href="https://www.instagram.com/karta.kec.cikancung/"
            target="_blank"
            rel="noreferrer"
            className="p-6 rounded-3xl bg-slate-900 border border-slate-800 hover:border-pink-500 space-y-3 shadow-xl transition-all hover:scale-[1.02] group"
          >
            <div className="w-12 h-12 rounded-2xl bg-pink-950 text-pink-400 flex items-center justify-center font-bold">
              <InstagramIcon className="w-6 h-6 fill-current" />
            </div>
            <span className="text-[10px] font-bold text-pink-400 uppercase tracking-wider block">Instagram Official & DM</span>
            <h3 className="font-extrabold text-white text-lg group-hover:text-pink-400 truncate">@karta.kec.cikancung</h3>
            <p className="text-slate-400 text-xs">Langsung terhubung dengan pesan DM pengaduan warga & informasi kegiatan.</p>
          </a>

          {/* WHATSAPP HOTLINE */}
          <a
            href="https://wa.me/62895632180100"
            target="_blank"
            rel="noreferrer"
            className="p-6 rounded-3xl bg-slate-900 border border-slate-800 hover:border-emerald-500 space-y-3 shadow-xl transition-all hover:scale-[1.02] group"
          >
            <div className="w-12 h-12 rounded-2xl bg-emerald-950 text-emerald-400 flex items-center justify-center font-bold">
              <Phone className="w-6 h-6" />
            </div>
            <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider block">Hotline WhatsApp</span>
            <h3 className="font-extrabold text-white text-lg group-hover:text-emerald-400">0895-6321-80100</h3>
            <p className="text-slate-400 text-xs">Layanan pesan instan dan informasi seputar program Karang Taruna & Grab KT.</p>
          </a>

          {/* EMAIL OFFICIAL */}
          <a
            href="mailto:pktkeccikancung@gmail.com"
            className="p-6 rounded-3xl bg-slate-900 border border-slate-800 hover:border-cyan-500 space-y-3 shadow-xl transition-all hover:scale-[1.02] group"
          >
            <div className="w-12 h-12 rounded-2xl bg-cyan-950 text-cyan-400 flex items-center justify-center font-bold">
              <Mail className="w-6 h-6" />
            </div>
            <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider block">Email Official</span>
            <h3 className="font-extrabold text-white text-base group-hover:text-cyan-400 truncate">pktkeccikancung@gmail.com</h3>
            <p className="text-slate-400 text-xs">Untuk surat resmi, kerjasama kemitraan, sponsor, dan koordinasi instansi.</p>
          </a>

        </section>

        {/* SECRETARIAT LOCATION */}
        <section className="p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-6 shadow-xl">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-xs font-bold text-emerald-400 uppercase">LOKASI ALAMAT</span>
              <h2 className="text-2xl font-black text-white">Sekretariat Karang Taruna Kecamatan Cikancung</h2>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 text-xs text-slate-300">
            <div className="flex items-start space-x-3">
              <MapPin className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-white text-sm block">Alamat Sekretariat Utama:</strong>
                <p className="leading-relaxed mt-0.5">
                  Jl. Raya Cikancung No. 01, Kompleks Kantor Kecamatan Cikancung, Kabupaten Bandung, Jawa Barat 40396.
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3 pt-2 border-t border-slate-900">
              <Clock className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Jam Operasional Sekretariat: Senin - Jumat (08:00 - 16:00 WIB)</span>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
