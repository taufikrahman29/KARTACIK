'use client';

import React from 'react';
import Link from 'next/link';
import { MessageSquareWarning, ArrowRight } from 'lucide-react';
import { InstagramIcon } from '@/components/Icons';
import { SEED_SETTINGS } from '@/lib/data-store';

export default function PengaduanCTA() {
  return (
    <section className="py-16 bg-gradient-to-r from-emerald-950 via-slate-900 to-slate-950 border-y border-emerald-900/40 relative overflow-hidden">
      {/* Decorative Orbs */}
      <div className="absolute -top-12 -right-12 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 p-8 sm:p-10 rounded-3xl bg-slate-900/80 border border-emerald-500/30 backdrop-blur-xl shadow-2xl">
          
          <div className="space-y-3 text-center lg:text-left max-w-2xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold">
              <MessageSquareWarning className="w-4 h-4" />
              <span>ASPIRASI & KELUHAN WARGA</span>
            </div>
            
            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              Punya Aspirasi atau Pengaduan?
            </h2>

            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              Jangan ragu untuk menyampaikan masukan, laporan sosial, atau pengaduan lingkungan Anda. Bersama Karang Taruna, mari kita bangun Kecamatan Cikancung yang lebih baik dan tanggap.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
            <Link
              href="/pengaduan"
              className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold text-xs sm:text-sm flex items-center space-x-2 shadow-lg shadow-emerald-950/50 hover:scale-105 transition-all border border-emerald-400/30"
            >
              <span>Sampaikan Pengaduan</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <a
              href={SEED_SETTINGS.instagramUrl}
              target="_blank"
              rel="noreferrer"
              className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-pink-600 to-purple-600 hover:opacity-90 text-white font-extrabold text-xs sm:text-sm flex items-center space-x-2 shadow-lg shadow-pink-950/50 hover:scale-105 transition-all"
            >
              <InstagramIcon className="w-4 h-4" />
              <span>DM Instagram →</span>
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}
