'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { 
  ShieldCheck, 
  Target, 
  Compass, 
  Award, 
  Users, 
  MapPin, 
  Quote 
} from 'lucide-react';
import { SEED_SETTINGS, SEED_MEMBERS } from '@/lib/data-store';

export default function ProfilPage() {
  const ketua = SEED_MEMBERS.find(m => m.order === 1);

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <Navbar />

      {/* Header Banner */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950 border-b border-slate-800 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4 relative z-10">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
            <ShieldCheck className="w-4 h-4" />
            <span>PROFIL ORGANISASI</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Profil Karang Taruna Kecamatan Cikancung
          </h1>
          <p className="text-slate-300 text-xs sm:text-base max-w-3xl mx-auto leading-relaxed">
            Mengenal lebih dekat visi, misi, sejarah, serta kepengurusan Karang Taruna Kecamatan Cikancung, Kabupaten Bandung.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Sambutan Ketua */}
        {ketua && (
          <div className="p-8 rounded-3xl bg-slate-900/90 border border-emerald-500/30 shadow-2xl grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-4 shrink-0 text-center space-y-3">
              <div className="w-44 h-44 mx-auto rounded-2xl overflow-hidden border-2 border-emerald-500/40 shadow-xl bg-slate-950">
                <img src={ketua.photo} alt={ketua.name} className="w-full h-full object-cover" />
              </div>
              <div>
                <h3 className="font-extrabold text-white text-base">{ketua.name}</h3>
                <p className="text-emerald-400 text-xs font-semibold">{ketua.role}</p>
                <p className="text-slate-400 text-[11px] mt-0.5">{ketua.village}</p>
              </div>
            </div>

            <div className="md:col-span-8 space-y-4">
              <div className="flex items-center space-x-2 text-amber-400">
                <Quote className="w-8 h-8 opacity-60" />
                <span className="text-xs font-bold uppercase tracking-wider">Sambutan Ketua Karang Taruna</span>
              </div>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed italic">
                "Assalamu'alaikum Warahmatullahi Wabarakatuh. Pemuda bukan hanya penerus masa depan, melainkan penentu masa kini. Karang Taruna Kecamatan Cikancung bertekad menjadi rumah kolaborasi bagi seluruh pemuda desa untuk menyalurkan energi positif, berwirausaha mandiri melaui inovasi seperti Grab KT, serta mengabdi secara tulus demi kemajuan Kabupaten Bandung."
              </p>
              <div className="pt-2 text-right text-xs font-bold text-white">
                — {ketua.name}
              </div>
            </div>
          </div>
        )}

        {/* Sejarah & Latar Belakang */}
        <div className="space-y-4 max-w-4xl mx-auto text-slate-300 text-xs sm:text-sm leading-relaxed">
          <h2 className="text-2xl font-extrabold text-white border-b border-emerald-500/30 pb-2 inline-block">
            Sejarah & Latar Belakang
          </h2>
          <p>
            Karang Taruna Kecamatan Cikancung dibentuk sebagai wadah kemasyarakatan yang berorientasi pada pembangunan kesejahteraan sosial pemuda di tingkat kecamatan. Berada di wilayah Bandung Timur yang berkembang pesat, Cikancung memiliki 9 Desa binaan: Desa Cikancung, Cihanyir, Ciluluk, Hegarmanah, Mandalasari, Mekarlaksana, Srirahayu, Tanjungsari, dan Sragi.
          </p>
          <p>
            Dengan semangat "Aditya Karya Mahatva Yodha", organisasi ini senantiasa aktif memelopori gerakan kebersihan lingkungan, turnamen olahraga antar-desa, pelatihan UMKM digital, serta aksi tanggap bencana sosial.
          </p>
        </div>

        {/* Visi & Misi */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-6 rounded-2xl bg-slate-900 border border-emerald-500/30 space-y-3">
            <div className="flex items-center space-x-2 text-emerald-400 font-bold text-sm">
              <Target className="w-5 h-5" />
              <span>VISI ORGANISASI</span>
            </div>
            <p className="text-white text-xs sm:text-sm font-semibold leading-relaxed">
              "{SEED_SETTINGS.visi}"
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900 border border-amber-500/30 space-y-3">
            <div className="flex items-center space-x-2 text-amber-400 font-bold text-sm">
              <Compass className="w-5 h-5" />
              <span>MISI STRATEGIS</span>
            </div>
            <ul className="space-y-2 text-xs text-slate-300">
              {SEED_SETTINGS.misi.map((m, idx) => (
                <li key={idx} className="flex items-start space-x-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span>{m}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

      </section>

      <Footer />
    </main>
  );
}
