'use client';

import React from 'react';
import { 
  Users, 
  HeartHandshake, 
  Trophy, 
  Store, 
  GraduationCap, 
  TreePine, 
  Smartphone, 
  Flag 
} from 'lucide-react';

const programs = [
  {
    id: 1,
    title: 'Kepemudaan & Keorganisasian',
    desc: 'Pembinaan karakter dan kepemimpinan generasi muda desa.',
    icon: Users,
    color: 'from-emerald-500/20 to-teal-500/20',
    borderColor: 'border-emerald-500/40',
    iconColor: 'text-emerald-400',
  },
  {
    id: 2,
    title: 'Sosial & Tanggap Bencana',
    desc: 'Aksi peduli kemanusiaan, bakti sosial, dan relawan bencana.',
    icon: HeartHandshake,
    color: 'from-red-500/20 to-pink-500/20',
    borderColor: 'border-red-500/40',
    iconColor: 'text-red-400',
  },
  {
    id: 3,
    title: 'Olahraga & Seni Budaya',
    desc: 'Turnamen Futsal Cup & pelestarian kesenian lokal Cikancung.',
    icon: Trophy,
    color: 'from-amber-500/20 to-yellow-500/20',
    borderColor: 'border-amber-500/40',
    iconColor: 'text-amber-400',
  },
  {
    id: 4,
    title: 'UMKM & Ekonomi Pemuda',
    desc: 'Pemberdayaan usaha mikro desa dan inovasi Grab KT.',
    icon: Store,
    color: 'from-cyan-500/20 to-blue-500/20',
    borderColor: 'border-cyan-500/40',
    iconColor: 'text-cyan-400',
  },
  {
    id: 5,
    title: 'Pendidikan & Litbang',
    desc: 'Beasiswa pelatihan digital dan riset kemajuan wilayah.',
    icon: GraduationCap,
    color: 'from-indigo-500/20 to-purple-500/20',
    borderColor: 'border-indigo-500/40',
    iconColor: 'text-indigo-400',
  },
  {
    id: 6,
    title: 'Lingkungan & Pariwisata',
    desc: 'Penanaman 1.000 pohon & pemetaan potensi wisata desa.',
    icon: TreePine,
    color: 'from-green-500/20 to-emerald-500/20',
    borderColor: 'border-green-500/40',
    iconColor: 'text-green-400',
  },
  {
    id: 7,
    title: 'Teknologi & Media Digital',
    desc: 'Pengelolaan portal berita, Instagram feed & publikasi.',
    icon: Smartphone,
    color: 'from-sky-500/20 to-blue-500/20',
    borderColor: 'border-sky-500/40',
    iconColor: 'text-sky-400',
  },
  {
    id: 8,
    title: 'PHBN & Kebangsaan',
    desc: 'Peringatan Hari Besar Nasional & nasionalisme pemuda.',
    icon: Flag,
    color: 'from-rose-500/20 to-orange-500/20',
    borderColor: 'border-rose-500/40',
    iconColor: 'text-rose-400',
  },
];

export default function ProgramUnggulan() {
  return (
    <section className="py-16 sm:py-24 bg-slate-950 relative overflow-hidden">
      
      {/* Background Decorative Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-600/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 relative z-10">
        
        {/* Section Header */}
        <div className="text-center space-y-3">
          <span className="px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-extrabold uppercase tracking-widest">
            PILAR PENGABDIAN
          </span>

          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            Program Kerja & Pilar Unggulan
          </h2>

          <p className="text-slate-300 text-xs sm:text-base max-w-2xl mx-auto">
            Fokus bidang kerja Karang Taruna Kecamatan Cikancung dalam mewujudkan kepemudaan yang aktif dan berdaya saing.
          </p>
        </div>

        {/* COMPACT RESPONSIVE 2-COLUMN / 3-COLUMN MOBILE COMPACT 6-GRID */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
          {programs.map((prog) => {
            const Icon = prog.icon;
            return (
              <div
                key={prog.id}
                className={`p-3.5 sm:p-6 rounded-2xl sm:rounded-3xl bg-slate-900/90 border ${prog.borderColor} hover:border-emerald-400/80 transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between space-y-2 sm:space-y-4 shadow-xl group`}
              >
                <div className="space-y-2 sm:space-y-3">
                  <div className={`w-9 h-9 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-gradient-to-br ${prog.color} flex items-center justify-center ${prog.iconColor} group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>

                  <h3 className="font-extrabold text-xs sm:text-base text-white group-hover:text-emerald-300 transition-colors leading-tight line-clamp-2">
                    {prog.title}
                  </h3>

                  <p className="text-[10px] sm:text-xs text-slate-400 leading-normal line-clamp-2 sm:line-clamp-3">
                    {prog.desc}
                  </p>
                </div>

                <div className="pt-1 text-[10px] font-bold text-emerald-400 flex items-center space-x-1 opacity-80 group-hover:opacity-100">
                  <span>Selengkapnya</span>
                  <span>→</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
