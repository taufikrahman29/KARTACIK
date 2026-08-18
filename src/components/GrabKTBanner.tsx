'use client';

import React from 'react';
import Link from 'next/link';
import { Car, UserCheck, ShieldCheck, ArrowRight, Sparkles } from 'lucide-react';

export default function GrabKTBanner() {
  return (
    <section className="py-20 bg-slate-950 text-slate-100 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-emerald-950 via-slate-900 to-amber-950/40 border border-emerald-500/40 p-8 sm:p-12 shadow-2xl">
          
          {/* Background Grid Pattern */}
          <div className="absolute inset-0 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-8 space-y-4 text-center lg:text-left">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold">
                <Car className="w-4 h-4 text-emerald-400" />
                <span>PROGRAM UNGGULAN TRANSPORTASI KOMUNITAS</span>
              </div>

              <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
                GRAB KT – Bergerak Bersama, Memberdayakan Pemuda
              </h2>

              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-2xl">
                Layanan transportasi lokal berbasis aplikasi/website yang dikelola oleh Karang Taruna Kecamatan Cikancung. Driver berasal dari anggota Karang Taruna terverifikasi admin. Pesan transportasi sekaligus dukung kemandirian ekonomi pemuda desa.
              </p>

              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs text-slate-300 pt-2">
                <div className="flex items-center space-x-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Driver Terverifikasi Admin</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>Tarif Transparan & Terjangkau</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col items-center justify-center gap-3 shrink-0">
              <Link
                href="/grab-kt"
                className="w-full sm:w-auto lg:w-full px-6 py-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold text-sm flex items-center justify-center space-x-2 shadow-lg shadow-emerald-950/50 hover:scale-105 transition-all border border-emerald-400/30"
              >
                <Car className="w-4 h-4" />
                <span>Pesan Sekarang</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/grab-kt/driver/register"
                className="w-full sm:w-auto lg:w-full px-6 py-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-amber-300 font-extrabold text-sm flex items-center justify-center space-x-2 border border-amber-500/40 hover:scale-105 transition-all shadow-md"
              >
                <UserCheck className="w-4 h-4 text-amber-400" />
                <span>Daftar Jadi Driver</span>
              </Link>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
