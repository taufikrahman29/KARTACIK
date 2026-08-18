'use client';

import React from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { 
  Car, 
  ShieldCheck, 
  UserCheck, 
  ArrowRight, 
  DollarSign, 
  MapPin, 
  Star,
  Smartphone,
  CheckCircle2
} from 'lucide-react';
import { SEED_TARIFF } from '@/lib/data-store';

export default function GrabKTLandingPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 selection:bg-emerald-500 selection:text-white">
      <Navbar />

      {/* Hero Grab KT */}
      <section className="pt-32 pb-20 bg-gradient-to-b from-emerald-950/70 via-slate-950 to-slate-950 border-b border-emerald-900/40 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 relative z-10">
          
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-black tracking-wider uppercase shadow-md">
            <Car className="w-4 h-4 text-emerald-400" />
            <span>PLATFORM TRANSPORTASI PEMUDA CIKANCUNG</span>
          </div>

          <h1 className="text-3xl sm:text-6xl font-black text-white tracking-tight leading-tight max-w-4xl mx-auto">
            Grab KT – Bergerak Bersama, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-amber-300">
              Memberdayakan Pemuda
            </span>
          </h1>

          <p className="text-slate-300 text-xs sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Layanan transportasi lokal berbasis komunitas dengan driver yang berasal dari <strong className="text-emerald-400">Anggota Karang Taruna terverifikasi Admin</strong> di 9 Desa se-Kecamatan Cikancung.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <Link
              href="/grab-kt/customer/dashboard"
              className="px-8 py-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black text-sm flex items-center space-x-2 shadow-2xl shadow-emerald-950/80 hover:scale-105 transition-all border border-emerald-400/30"
            >
              <Car className="w-5 h-5" />
              <span>Pesan Sekarang (Customer)</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/grab-kt/driver/register"
              className="px-8 py-4 rounded-2xl bg-slate-900 hover:bg-slate-800 text-amber-300 font-black text-sm flex items-center space-x-2 border border-amber-500/40 hover:scale-105 transition-all shadow-xl"
            >
              <UserCheck className="w-5 h-5 text-amber-400" />
              <span>Daftar Jadi Driver</span>
            </Link>
          </div>

        </div>
      </section>

      {/* Keunggulan Grab KT */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
            Mengapa Menggunakan Grab KT?
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm">
            Inovasi teknologi transportasi lokal yang menghubungkan mobilitas warga Cikancung dengan pemuda desa.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-3 shadow-xl">
            <div className="w-12 h-12 rounded-2xl bg-emerald-950 border border-emerald-700/40 text-emerald-400 flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-extrabold text-lg text-white">Driver Terverifikasi Admin</h3>
            <p className="text-slate-400 text-xs leading-relaxed">
              Driver bukan sembarang orang, melainkan Anggota Karang Taruna yang telah diperiksa KTP, SIM, serta kelayakan kendaraannya secara manual oleh Admin.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-3 shadow-xl">
            <div className="w-12 h-12 rounded-2xl bg-amber-950 border border-amber-700/40 text-amber-400 flex items-center justify-center">
              <DollarSign className="w-6 h-6" />
            </div>
            <h3 className="font-extrabold text-lg text-white">Tarif Hemat Transparan</h3>
            <p className="text-slate-400 text-xs leading-relaxed">
              Tarif dasar Rp {SEED_TARIFF.baseFare.toLocaleString('id-ID')} + Rp {SEED_TARIFF.pricePerKm.toLocaleString('id-ID')}/KM dihitung otomatis tanpa biaya tersembunyi.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-3 shadow-xl">
            <div className="w-12 h-12 rounded-2xl bg-teal-950 border border-teal-700/40 text-teal-400 flex items-center justify-center">
              <UserCheck className="w-6 h-6" />
            </div>
            <h3 className="font-extrabold text-lg text-white">Pemberdayaan Ekonomi Pemuda</h3>
            <p className="text-slate-400 text-xs leading-relaxed">
              Setiap rupiah biaya perjalanan langsung membantu pendapatan mandiri pemuda desa di wilayah Cikancung.
            </p>
          </div>

        </div>

        {/* Quick Portal Switch */}
        <div className="p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-emerald-950/40 to-slate-900 border border-emerald-500/30 text-center space-y-4">
          <h3 className="font-extrabold text-xl text-white">Pilih Portal Grab KT</h3>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/grab-kt/customer/dashboard"
              className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center space-x-2"
            >
              <Car className="w-4 h-4" />
              <span>Portal Customer (Pesan Ojek/Mobil)</span>
            </Link>

            <Link
              href="/grab-kt/driver/dashboard"
              className="px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 font-bold text-xs flex items-center space-x-2 border border-amber-500/30"
            >
              <Smartphone className="w-4 h-4" />
              <span>Portal Driver Aktif (Kelola Order)</span>
            </Link>

            <Link
              href="/admin/grab-kt"
              className="px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs flex items-center space-x-2"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Portal Admin CMS (Verifikasi Driver)</span>
            </Link>
          </div>
        </div>

      </section>

      <Footer />
    </main>
  );
}
