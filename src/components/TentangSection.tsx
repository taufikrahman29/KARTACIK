'use client';

import React from 'react';
import Link from 'next/link';
import { 
  CheckCircle2, 
  Target, 
  Compass, 
  HeartHandshake, 
  ShieldCheck, 
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { SEED_SETTINGS } from '@/lib/data-store';

export default function TentangSection() {
  return (
    <section className="py-20 bg-slate-900 text-slate-100 relative overflow-hidden">
      {/* Glow Effects */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>TENTANG ORGANISASI</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Tentang Karang Taruna Kecamatan Cikancung
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
            Wadah resmi pembinaan pemuda yang berakar pada nilai-nilai kesetiakawanan sosial, kemandirian wirausaha, serta pengabdian bagi warga Kecamatan Cikancung.
          </p>
        </div>

        {/* 2-Column Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Image Stack & Badge */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Main Photo */}
              <div className="rounded-3xl overflow-hidden shadow-2xl border border-slate-800 bg-slate-950 aspect-[4/3] relative group">
                <img 
                  src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&auto=format&fit=crop&q=80" 
                  alt="Kegiatan Karang Taruna Cikancung" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 bg-amber-950/80 px-2.5 py-1 rounded-full border border-amber-500/30">
                    Kebersamaan Pemuda Desa
                  </span>
                  <p className="text-white text-xs font-semibold mt-1">Konsolidasi Karang Taruna 9 Desa se-Cikancung</p>
                </div>
              </div>

              {/* Floating Glassmorphism Badge */}
              <div className="absolute -bottom-6 -right-4 sm:-right-6 bg-slate-950/90 border border-emerald-500/30 backdrop-blur-xl p-4 rounded-2xl shadow-xl max-w-xs space-y-1">
                <div className="flex items-center space-x-2 text-emerald-400 font-bold text-xs">
                  <Sparkles className="w-4 h-4" />
                  <span>Semboyan Organisasi</span>
                </div>
                <p className="text-white font-extrabold text-xs italic">
                  "Aditya Karya Mahatva Yodha"
                </p>
                <p className="text-[10px] text-slate-400">
                  Pejuang pemuda yang cerdas, berkarya, dan berintegritas tinggi.
                </p>
              </div>

            </div>
          </div>

          {/* Right Column: Content, Visi, Misi & Values */}
          <div className="lg:col-span-7 space-y-6">
            
            <p className="text-slate-300 text-sm leading-relaxed font-normal">
              {SEED_SETTINGS.aboutText}
            </p>

            {/* Visi Card */}
            <div className="p-5 rounded-2xl bg-gradient-to-br from-slate-950 to-slate-900 border border-emerald-900/50 space-y-2 relative overflow-hidden">
              <div className="flex items-center space-x-2 text-emerald-400 font-bold text-xs uppercase tracking-wider">
                <Target className="w-4 h-4 text-emerald-400" />
                <span>Visi Utama</span>
              </div>
              <p className="text-white text-xs sm:text-sm font-semibold leading-relaxed">
                "{SEED_SETTINGS.visi}"
              </p>
            </div>

            {/* Misi List */}
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-amber-400 font-bold text-xs uppercase tracking-wider mb-3">
                <Compass className="w-4 h-4 text-amber-400" />
                <span>Misi Strategis</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {SEED_SETTINGS.misi.map((item, idx) => (
                  <div key={idx} className="flex items-start space-x-2.5 p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-xs text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span className="leading-snug">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Nilai Organisasi */}
            <div className="pt-2 flex flex-wrap items-center gap-2">
              {['Kemandirian', 'Kesetiakawanan Sosial', 'Kreativitas Pemuda', 'Gotong Royong', 'Akuntabel'].map((val) => (
                <span key={val} className="px-3 py-1 rounded-lg bg-emerald-950/60 border border-emerald-800/40 text-emerald-300 text-xs font-semibold">
                  • {val}
                </span>
              ))}
            </div>

            {/* Link to detail profile */}
            <div className="pt-3">
              <Link 
                href="/profil" 
                className="inline-flex items-center space-x-2 text-xs font-bold text-emerald-400 hover:text-emerald-300 group"
              >
                <span>Baca Selengkapnya Profil & Sejarah Karang Taruna Cikancung</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
