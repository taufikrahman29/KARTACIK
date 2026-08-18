'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { 
  Users, 
  ShieldCheck, 
  MapPin, 
  Phone, 
  Award,
  ChevronDown
} from 'lucide-react';
import { DataStore, OrgMember } from '@/lib/data-store';

export default function OrganisasiPage() {
  const [members, setMembers] = useState<OrgMember[]>([]);

  useEffect(() => {
    setMembers(DataStore.getMembers());
  }, []);

  const ketua = members.find(m => m.order === 1);
  const wakil = members.find(m => m.order === 2);
  const sekretaris = members.find(m => m.order === 3);
  const bendahara = members.find(m => m.order === 4);
  const divisiList = members.filter(m => m.order > 4);

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <Navbar />

      {/* Header Banner */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950 border-b border-slate-800 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
            <Users className="w-4 h-4" />
            <span>BAGAN KEPENGURUSAN</span>
          </div>
          
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Struktur Organisasi Karang Taruna Cikancung
          </h1>

          <p className="text-slate-300 text-xs sm:text-base max-w-2xl mx-auto">
            Jajaran Pengurus Harian & Koordinator Divisi Kerja Karang Taruna Kecamatan Cikancung Periode 2026–2029.
          </p>
        </div>
      </section>

      {/* Organizational Chart Area */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* LEVEL 1: KETUA */}
        {ketua && (
          <div className="flex flex-col items-center">
            <div className="p-6 rounded-3xl bg-gradient-to-b from-emerald-950/80 via-slate-900 to-slate-950 border-2 border-emerald-500/50 shadow-2xl max-w-sm w-full text-center space-y-3 relative group">
              <div className="w-28 h-28 mx-auto rounded-full overflow-hidden border-2 border-emerald-400 shadow-xl bg-slate-950">
                <img src={ketua.photo} alt={ketua.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
              </div>
              <div>
                <span className="px-3 py-1 rounded-full bg-emerald-500 text-slate-950 text-[10px] font-black uppercase tracking-wider shadow-md">
                  TOP KEPIMPINAN
                </span>
                <h3 className="font-extrabold text-lg text-white mt-2">{ketua.name}</h3>
                <p className="text-emerald-400 text-xs font-semibold">{ketua.role}</p>
                <p className="text-slate-400 text-[11px] mt-1 flex items-center justify-center space-x-1">
                  <MapPin className="w-3 h-3 text-emerald-400" />
                  <span>{ketua.village}</span>
                </p>
              </div>
            </div>

            {/* Connecting line down */}
            <div className="w-0.5 h-10 bg-gradient-to-b from-emerald-500 to-slate-700 my-2" />
          </div>
        )}

        {/* LEVEL 2: WAKIL, SEKRETARIS, BENDAHARA */}
        <div className="space-y-4">
          <div className="text-center text-xs font-bold uppercase tracking-wider text-slate-400">
            PENGURUS HARIAN INTI
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[wakil, sekretaris, bendahara].map((m) => {
              if (!m) return null;
              return (
                <div
                  key={m.id}
                  className="p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-emerald-500/40 text-center space-y-3 shadow-xl transition-all hover:-translate-y-1"
                >
                  <div className="w-20 h-20 mx-auto rounded-full overflow-hidden border border-emerald-500/40 bg-slate-950 shadow-md">
                    <img src={m.photo} alt={m.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-white">{m.name}</h4>
                    <p className="text-emerald-400 text-xs font-medium">{m.role}</p>
                    <p className="text-slate-400 text-[11px] mt-1">{m.village}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="w-0.5 h-10 bg-slate-800 mx-auto" />
        </div>

        {/* LEVEL 3: DIVISI-DIVISI */}
        <div className="space-y-6">
          <div className="text-center space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400 bg-amber-950/60 px-3 py-1 rounded-full border border-amber-500/30">
              DIVISI KINERJA STRATEGIS
            </span>
            <p className="text-xs text-slate-400">Koordinator Bidang Pengabdian Masyarakat</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {divisiList.map((div) => (
              <div
                key={div.id}
                className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-amber-500/40 space-y-3 shadow-xl flex items-center space-x-4"
              >
                <div className="w-16 h-16 rounded-2xl overflow-hidden border border-slate-700 shrink-0 bg-slate-950">
                  <img src={div.photo} alt={div.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-white">{div.name}</h4>
                  <p className="text-amber-400 text-xs font-medium">{div.role}</p>
                  <p className="text-slate-400 text-[11px] mt-0.5">{div.village}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </section>

      <Footer />
    </main>
  );
}
