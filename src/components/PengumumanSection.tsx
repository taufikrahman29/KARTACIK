'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Bell, 
  AlertTriangle, 
  FileText, 
  ArrowRight, 
  X, 
  Download 
} from 'lucide-react';
import { DataStore, AnnouncementItem } from '@/lib/data-store';

export default function PengumumanSection() {
  const [announcements, setAnnouncements] = useState<AnnouncementItem[]>([]);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState<AnnouncementItem | null>(null);

  useEffect(() => {
    setAnnouncements(DataStore.getAnnouncements());
  }, []);

  return (
    <section className="py-20 bg-slate-900 text-slate-100 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold">
              <Bell className="w-3.5 h-3.5" />
              <span>PAPAPAN INFORMASI & EDARAN</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              Pengumuman Resmi
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm">
              Informasi edaran penting, rilis pembukaan program, serta himbauan dari Pengurus Karang Taruna Kecamatan Cikancung.
            </p>
          </div>

          <Link
            href="/pengumuman"
            className="shrink-0 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold flex items-center space-x-1.5 border border-slate-700 transition-colors"
          >
            <span>Semua Pengumuman</span>
            <ArrowRight className="w-3.5 h-3.5 text-emerald-400" />
          </Link>
        </div>

        {/* Announcements List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {announcements.map((item) => (
            <div
              key={item.id}
              className={`p-6 rounded-2xl border transition-all duration-300 flex flex-col justify-between space-y-4 ${
                item.isImportant
                  ? 'bg-gradient-to-br from-slate-950 via-slate-900 to-red-950/20 border-red-500/40 shadow-xl shadow-red-950/20'
                  : 'bg-slate-950 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    {item.isImportant && (
                      <span className="badge-penting px-2.5 py-0.5 rounded-full text-[10px] font-black tracking-wider uppercase flex items-center space-x-1">
                        <AlertTriangle className="w-3 h-3" />
                        <span>PENTING</span>
                      </span>
                    )}
                    <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider">
                      {item.category}
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-400 font-medium">{item.date}</span>
                </div>

                <h3 className="font-bold text-base text-white hover:text-emerald-300 transition-colors">
                  {item.title}
                </h3>

                <p className="text-slate-300 text-xs line-clamp-3 leading-relaxed">
                  {item.content}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
                {item.attachmentName ? (
                  <span className="text-[11px] text-amber-400 font-semibold flex items-center space-x-1">
                    <FileText className="w-3.5 h-3.5" />
                    <span>{item.attachmentName}</span>
                  </span>
                ) : <div />}

                <button
                  onClick={() => setSelectedAnnouncement(item)}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-colors flex items-center space-x-1"
                >
                  <span>Detail Edaran</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Detail Modal */}
      {selectedAnnouncement && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-lg w-full p-6 space-y-4 shadow-2xl relative">
            <button
              onClick={() => setSelectedAnnouncement(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-800 text-slate-300 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-2 pr-8">
              <div className="flex items-center space-x-2">
                {selectedAnnouncement.isImportant && (
                  <span className="badge-penting px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase">
                    PENTING
                  </span>
                )}
                <span className="text-xs font-bold text-emerald-400 uppercase">{selectedAnnouncement.category}</span>
                <span className="text-xs text-slate-400">• {selectedAnnouncement.date}</span>
              </div>
              <h3 className="font-extrabold text-lg text-white">
                {selectedAnnouncement.title}
              </h3>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 leading-relaxed whitespace-pre-line">
              {selectedAnnouncement.content}
            </div>

            {selectedAnnouncement.attachmentName && (
              <div className="p-3 rounded-xl bg-emerald-950/30 border border-emerald-800/40 flex items-center justify-between text-xs">
                <div className="flex items-center space-x-2 text-emerald-300">
                  <FileText className="w-4 h-4" />
                  <span className="font-semibold">{selectedAnnouncement.attachmentName}</span>
                </div>
                <button 
                  onClick={() => alert(`Mengunduh berkas ${selectedAnnouncement.attachmentName}`)}
                  className="px-2.5 py-1 rounded bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[11px] flex items-center space-x-1"
                >
                  <Download className="w-3 h-3" />
                  <span>Unduh</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
