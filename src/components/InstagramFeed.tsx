'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Heart, 
  MessageCircle, 
  ExternalLink, 
  Sparkles,
  ArrowRight,
  X
} from 'lucide-react';
import { InstagramIcon } from '@/components/Icons';
import { DataStore, InstagramPost, SEED_SETTINGS } from '@/lib/data-store';

export default function InstagramFeed() {
  const [posts, setPosts] = useState<InstagramPost[]>([]);
  const [selectedPost, setSelectedPost] = useState<InstagramPost | null>(null);

  useEffect(() => {
    setPosts(DataStore.getInstagramPosts());
  }, []);

  return (
    <section className="py-20 bg-slate-900 text-slate-100 relative overflow-hidden">
      {/* Background Decorator */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-pink-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/30 text-pink-400 text-xs font-semibold">
              <InstagramIcon className="w-3.5 h-3.5" />
              <span>INTEGRASI INSTAGRAM OFFICIAL</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              Berita & Kegiatan Terbaru Instagram
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm">
              Update postingan terkini langsung dari feed Instagram resmi Karang Taruna Kecamatan Cikancung (<span className="text-pink-400 font-bold">@{SEED_SETTINGS.instagramUsername}</span>).
            </p>
          </div>

          <div className="shrink-0 flex items-center space-x-3">
            <a
              href={SEED_SETTINGS.instagramUrl}
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-pink-600 via-purple-600 to-amber-500 text-white text-xs font-extrabold flex items-center space-x-2 shadow-md hover:opacity-90 transition-all hover:scale-105"
            >
              <InstagramIcon className="w-4 h-4" />
              <span>Follow Instagram Kami</span>
            </a>
            
            <Link
              href="/berita"
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold flex items-center space-x-1.5 border border-slate-700 transition-colors"
            >
              <span>Semua Feed</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* 4 Card Desktop Grid / 2 Tablet / 1 Mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {posts.map((post) => (
            <div
              key={post.id}
              className="group rounded-2xl bg-slate-950 border border-slate-800 hover:border-pink-500/40 overflow-hidden flex flex-col justify-between shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              {/* Card Image Container */}
              <div className="relative aspect-square overflow-hidden bg-slate-900">
                <img
                  src={post.thumbnail}
                  alt={post.caption}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                
                {/* Instagram Icon Badge Overlay */}
                <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-slate-950/80 backdrop-blur-md border border-slate-700/80 flex items-center justify-center text-pink-400 shadow-md">
                  <InstagramIcon className="w-4 h-4" />
                </div>

                {/* Category Badge */}
                <div className="absolute bottom-3 left-3">
                  <span className="px-2.5 py-1 rounded-md bg-slate-950/90 text-emerald-400 text-[10px] font-extrabold border border-emerald-500/30 uppercase tracking-wider">
                    {post.category}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-[11px] text-slate-400">
                    <span>{post.date}</span>
                    <div className="flex items-center space-x-3 text-slate-400">
                      <span className="flex items-center space-x-1">
                        <Heart className="w-3 h-3 text-pink-500 fill-pink-500" />
                        <span>{post.likes}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <MessageCircle className="w-3 h-3 text-cyan-400" />
                        <span>{post.comments}</span>
                      </span>
                    </div>
                  </div>

                  <p className="text-slate-200 text-xs line-clamp-3 leading-relaxed">
                    {post.caption}
                  </p>
                </div>

                {/* Card Action Buttons */}
                <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between gap-2">
                  <button
                    onClick={() => setSelectedPost(post)}
                    className="text-xs font-semibold text-slate-300 hover:text-white transition-colors"
                  >
                    Baca Ringkasan
                  </button>

                  <a
                    href={post.instagramUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-1.5 rounded-lg bg-pink-950/40 border border-pink-700/40 text-pink-300 hover:bg-pink-900/60 text-xs font-bold flex items-center space-x-1 transition-all"
                  >
                    <span>Lihat di Instagram</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Detail Preview Modal */}
      {selectedPost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl space-y-4">
            
            <div className="relative aspect-video bg-slate-950">
              <img src={selectedPost.thumbnail} alt="Preview" className="w-full h-full object-cover" />
              <button
                onClick={() => setSelectedPost(null)}
                className="absolute top-3 right-3 p-2 rounded-full bg-slate-950/80 text-white hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span className="text-pink-400 font-bold">@{SEED_SETTINGS.instagramUsername}</span>
                <span>{selectedPost.date}</span>
              </div>

              <p className="text-slate-200 text-sm leading-relaxed whitespace-pre-line">
                {selectedPost.caption}
              </p>

              <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                <div className="flex items-center space-x-4 text-xs text-slate-300">
                  <span className="flex items-center space-x-1">
                    <Heart className="w-4 h-4 text-pink-500 fill-pink-500" />
                    <span>{selectedPost.likes} Menyukai</span>
                  </span>
                </div>

                <a
                  href={selectedPost.instagramUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 rounded-xl bg-pink-600 hover:bg-pink-500 text-white text-xs font-bold flex items-center space-x-1.5 shadow-md"
                >
                  <span>Buka Postingan Instagram</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

          </div>
        </div>
      )}
    </section>
  );
}
