'use client';

import React from 'react';
import { 
  Users, 
  HeartHandshake, 
  Trophy, 
  Store, 
  GraduationCap, 
  Trees, 
  Smartphone, 
  Sparkles,
  ArrowRight
} from 'lucide-react';

export interface ProgramItem {
  id: string;
  title: string;
  category: string;
  description: string;
  icon: React.ElementType;
  color: string;
  badge: string;
}

export const PROGRAMS_DATA: ProgramItem[] = [
  {
    id: 'p-1',
    title: 'Pembinaan Kepemudaan',
    category: 'Kepemudaan',
    description: 'Pelatihan kepemimpinan, pendidikan karakter, dan konsolidasi pengurus Karang Taruna di 9 Desa Cikancung.',
    icon: Users,
    color: 'from-emerald-500/20 to-teal-500/20 text-emerald-400 border-emerald-500/30',
    badge: 'Kaderisasi'
  },
  {
    id: 'p-2',
    title: 'Bakti & Akses Sosial Warga',
    category: 'Sosial',
    description: 'Tanggap bencana alam, pembagian paket donasi sembako, dan pendampingan kesejahteraan keluarga prasejahtera.',
    icon: HeartHandshake,
    color: 'from-rose-500/20 to-pink-500/20 text-rose-400 border-rose-500/30',
    badge: 'UKS'
  },
  {
    id: 'p-3',
    title: 'Olahraga & Turnamen Pemuda',
    category: 'Olahraga',
    description: 'Penyelenggaraan Karang Taruna Cup (Futsal, Voli, Badminton) serta gaya hidup sehat olahraga bermasyarakat.',
    icon: Trophy,
    color: 'from-amber-500/20 to-orange-500/20 text-amber-400 border-amber-500/30',
    badge: 'Sport'
  },
  {
    id: 'p-4',
    title: 'Kemandirian Ekonomi & UMKM',
    category: 'UMKM',
    description: 'Pendampingan usaha kreatif pemuda, pemasaran produk lokal desa, serta bantuan promosi pameran.',
    icon: Store,
    color: 'from-cyan-500/20 to-blue-500/20 text-cyan-400 border-cyan-500/30',
    badge: 'Ekonomi'
  },
  {
    id: 'p-5',
    title: 'Pendidikan & Beasiswa Belajar',
    category: 'Pendidikan',
    description: 'Bimbingan belajar gratis anak desa, taman bacaan pemuda, dan pelatihan sertifikasi keterampilan kerja.',
    icon: GraduationCap,
    color: 'from-purple-500/20 to-indigo-500/20 text-purple-400 border-purple-500/30',
    badge: 'Edukasi'
  },
  {
    id: 'p-6',
    title: 'Lingkungan & Penghijauan',
    category: 'Lingkungan',
    description: 'Gerakan penanaman 1.000 pohon, pembersihan aliran sungai/parit desa, dan bank sampah pemuda.',
    icon: Trees,
    color: 'from-green-500/20 to-emerald-500/20 text-green-400 border-green-500/30',
    badge: 'Ekologi'
  },
  {
    id: 'p-7',
    title: 'Inovasi Teknologi & Grab KT',
    category: 'Teknologi Digital',
    description: 'Pengembangan platform ride-hailing Grab KT dan digitalisasi sistem informasi desa berbasis pemuda.',
    icon: Smartphone,
    color: 'from-blue-500/20 to-cyan-500/20 text-blue-400 border-blue-500/30',
    badge: 'Digital'
  },
  {
    id: 'p-8',
    title: 'Kegiatan Kemasyarakatan & PHBN',
    category: 'Kegiatan Masyarakat',
    description: 'Penyelenggaraan peringatan hari besar nasional (HUT RI), pentas seni budaya sunda, dan tradisi lokal.',
    icon: Sparkles,
    color: 'from-yellow-500/20 to-amber-500/20 text-yellow-400 border-yellow-500/30',
    badge: 'Budaya'
  }
];

export default function ProgramUnggulan() {
  return (
    <section className="py-20 bg-slate-950 text-slate-100 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>FOKUS PENGABDIAN</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Program Unggulan Karang Taruna
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
            Delapan pilar bidang kerja strategis untuk mengoptimalkan potensi pemuda dan melayani kebutuhan masyarakat Kecamatan Cikancung.
          </p>
        </div>

        {/* 8 Card Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {PROGRAMS_DATA.map((prog) => {
            const Icon = prog.icon;
            return (
              <div
                key={prog.id}
                className="group relative p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-emerald-500/50 hover:bg-slate-900 transition-all duration-300 hover:-translate-y-1.5 shadow-xl hover:shadow-2xl hover:shadow-emerald-950/40 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  
                  {/* Top Bar: Icon & Badge */}
                  <div className="flex items-center justify-between">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${prog.color} border flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                      {prog.badge}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <div>
                    <h3 className="font-bold text-base text-white group-hover:text-emerald-400 transition-colors">
                      {prog.title}
                    </h3>
                    <p className="text-slate-400 text-xs leading-relaxed mt-2">
                      {prog.description}
                    </p>
                  </div>

                </div>

                {/* Bottom link indicator */}
                <div className="pt-4 mt-4 border-t border-slate-800/80 flex items-center justify-between text-xs font-semibold text-slate-500 group-hover:text-emerald-400 transition-colors">
                  <span>Lihat Aktivitas</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
