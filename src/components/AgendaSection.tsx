'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Calendar as CalendarIcon, 
  MapPin, 
  Clock, 
  UserCheck, 
  ArrowRight,
  Filter
} from 'lucide-react';
import { DataStore, AgendaItem } from '@/lib/data-store';

export default function AgendaSection() {
  const [agendas, setAgendas] = useState<AgendaItem[]>([]);
  const [activeFilter, setActiveFilter] = useState<'ALL' | 'AKAN DATANG' | 'BERLANGSUNG' | 'SELESAI'>('ALL');

  useEffect(() => {
    setAgendas(DataStore.getAgendas());
  }, []);

  const filteredAgendas = activeFilter === 'ALL'
    ? agendas
    : agendas.filter(a => a.status === activeFilter);

  return (
    <section className="py-20 bg-slate-950 text-slate-100 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title & Filter Tabs */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
              <CalendarIcon className="w-3.5 h-3.5" />
              <span>KALENDER & TIMELINE KEGIATAN</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              Agenda Kegiatan Karang Taruna
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm">
              Jadwal pelaksanaan program kerja, rapat koordinasi, serta turnamen pemuda mendatang di wilayah Kecamatan Cikancung.
            </p>
          </div>

          {/* Filter Status Buttons */}
          <div className="flex flex-wrap items-center gap-1.5 p-1.5 rounded-xl bg-slate-900 border border-slate-800 shrink-0">
            {(['ALL', 'AKAN DATANG', 'BERLANGSUNG', 'SELESAI'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveFilter(tab)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  activeFilter === tab
                    ? 'bg-emerald-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                {tab === 'ALL' ? 'Semua Status' : tab}
              </button>
            ))}
          </div>
        </div>

        {/* Timeline View */}
        <div className="space-y-4">
          {filteredAgendas.map((item) => {
            const isUpcoming = item.status === 'AKAN DATANG';
            const isOngoing = item.status === 'BERLANGSUNG';

            return (
              <div
                key={item.id}
                className="group p-6 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-emerald-500/40 transition-all duration-300 hover:-translate-y-0.5 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6"
              >
                {/* Left Date Box & Content */}
                <div className="flex items-start space-x-5">
                  
                  {/* Date Badge Box */}
                  <div className="w-16 h-16 rounded-2xl bg-slate-950 border border-slate-700 flex flex-col items-center justify-center shrink-0 shadow-inner group-hover:border-emerald-500/50 transition-colors">
                    <span className="text-emerald-400 text-xs font-bold uppercase">
                      {new Date(item.date).toLocaleDateString('id-ID', { month: 'short' })}
                    </span>
                    <span className="text-white text-xl font-extrabold leading-none">
                      {new Date(item.date).getDate()}
                    </span>
                  </div>

                  {/* Info Details */}
                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${
                        isOngoing
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 animate-pulse'
                          : isUpcoming
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                          : 'bg-slate-800 text-slate-400 border border-slate-700'
                      }`}>
                        {item.status}
                      </span>
                      <span className="text-xs text-slate-400">• {item.organizer}</span>
                    </div>

                    <h3 className="font-bold text-base sm:text-lg text-white group-hover:text-emerald-400 transition-colors">
                      {item.title}
                    </h3>

                    <p className="text-slate-400 text-xs leading-relaxed max-w-3xl">
                      {item.description}
                    </p>

                    <div className="flex flex-wrap items-center gap-4 text-xs text-slate-300 pt-1">
                      <div className="flex items-center space-x-1.5 text-emerald-400">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{item.time}</span>
                      </div>
                      <div className="flex items-center space-x-1.5 text-amber-400">
                        <MapPin className="w-3.5 h-3.5" />
                        <span>{item.location}</span>
                      </div>
                    </div>
                  </div>

                </div>

                {/* Right Action CTA */}
                <div className="shrink-0 pt-4 md:pt-0 border-t md:border-t-0 border-slate-800 flex items-center justify-end">
                  <Link
                    href="/agenda"
                    className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-emerald-600 text-slate-200 hover:text-white text-xs font-bold transition-all flex items-center space-x-1.5"
                  >
                    <span>Detail Agenda</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* View All Button */}
        <div className="text-center mt-10">
          <Link
            href="/agenda"
            className="inline-flex items-center space-x-2 px-6 py-3 rounded-xl bg-slate-900 border border-slate-800 hover:border-emerald-500/40 text-slate-200 hover:text-white text-xs font-bold transition-all"
          >
            <span>Lihat Semua Agenda Kegiatan</span>
            <ArrowRight className="w-4 h-4 text-emerald-400" />
          </Link>
        </div>

      </div>
    </section>
  );
}
