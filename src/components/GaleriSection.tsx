'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Camera, 
  Eye, 
  X, 
  ArrowRight, 
  Calendar 
} from 'lucide-react';
import { DataStore, GalleryItem } from '@/lib/data-store';

export default function GaleriSection() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('SEMUA');
  const [activeLightbox, setActiveLightbox] = useState<GalleryItem | null>(null);

  useEffect(() => {
    setItems(DataStore.getGallery());
  }, []);

  const categories = ['SEMUA', 'Kegiatan Sosial', 'Olahraga', 'Kepemudaan', 'PHBN', 'UMKM', 'Kegiatan Kecamatan'];

  const filteredItems = activeCategory === 'SEMUA'
    ? items
    : items.filter(i => i.category === activeCategory);

  return (
    <section className="py-20 bg-slate-900 text-slate-100 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title & Filter Tabs */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
              <Camera className="w-3.5 h-3.5" />
              <span>DOKUMENTASI KARYA</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              Galeri Kegiatan Pemuda
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm">
              Rekam jejak aksi sosial, kebudayaan, keolahragaan, dan pemberdayaan masyarakat di wilayah Cikancung.
            </p>
          </div>

          <Link
            href="/galeri"
            className="shrink-0 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold flex items-center space-x-1.5 border border-slate-700 transition-colors"
          >
            <span>Semua Foto</span>
            <ArrowRight className="w-3.5 h-3.5 text-emerald-400" />
          </Link>
        </div>

        {/* Category Buttons */}
        <div className="flex flex-wrap items-center gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeCategory === cat
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-950/40'
                  : 'bg-slate-950 text-slate-400 border border-slate-800 hover:text-white hover:bg-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid Masonry */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setActiveLightbox(item)}
              className="group relative rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 hover:border-emerald-500/50 cursor-pointer shadow-xl transition-all duration-300 hover:-translate-y-1 aspect-[4/3]"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />

              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

              {/* Category Pill */}
              <div className="absolute top-3 left-3">
                <span className="px-2.5 py-1 rounded-md bg-slate-950/80 backdrop-blur-md text-emerald-400 text-[10px] font-extrabold border border-emerald-500/30">
                  {item.category}
                </span>
              </div>

              {/* Hover Eye Icon */}
              <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-emerald-600/80 text-white opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center shadow-md">
                <Eye className="w-4 h-4" />
              </div>

              {/* Bottom Caption */}
              <div className="absolute bottom-4 left-4 right-4 space-y-1">
                <div className="flex items-center space-x-1.5 text-[11px] text-slate-400">
                  <Calendar className="w-3 h-3 text-emerald-400" />
                  <span>{item.date}</span>
                </div>
                <h3 className="font-bold text-sm text-white group-hover:text-emerald-300 transition-colors line-clamp-1">
                  {item.title}
                </h3>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Lightbox Modal */}
      {activeLightbox && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative max-w-4xl w-full bg-slate-900 border border-slate-700 rounded-3xl overflow-hidden shadow-2xl space-y-4">
            
            <button
              onClick={() => setActiveLightbox(null)}
              className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-slate-950/80 text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="relative aspect-video bg-slate-950">
              <img
                src={activeLightbox.image}
                alt={activeLightbox.title}
                className="w-full h-full object-contain"
              />
            </div>

            <div className="p-6 space-y-2">
              <div className="flex items-center space-x-2">
                <span className="px-2.5 py-1 rounded bg-emerald-950 border border-emerald-700/40 text-emerald-300 text-xs font-bold">
                  {activeLightbox.category}
                </span>
                <span className="text-xs text-slate-400">• {activeLightbox.date}</span>
              </div>
              <h3 className="font-extrabold text-xl text-white">
                {activeLightbox.title}
              </h3>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                {activeLightbox.description}
              </p>
            </div>

          </div>
        </div>
      )}
    </section>
  );
}
