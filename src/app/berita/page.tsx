'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { 
  Search, 
  ExternalLink, 
  Heart, 
  MessageCircle, 
  Newspaper, 
  X,
  Eye
} from 'lucide-react';
import { InstagramIcon } from '@/components/Icons';
import { DataStore, InstagramPost, NewsArticle, SEED_SETTINGS } from '@/lib/data-store';

export default function BeritaPage() {
  const [activeTab, setActiveTab] = useState<'INSTAGRAM' | 'ARTIKEL'>('INSTAGRAM');
  const [igPosts, setIgPosts] = useState<InstagramPost[]>([]);
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedNews, setSelectedNews] = useState<NewsArticle | null>(null);

  useEffect(() => {
    setIgPosts(DataStore.getInstagramPosts());
    setNews(DataStore.getNews());
  }, []);

  const filteredIg = igPosts.filter(p => 
    p.caption.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredNews = news.filter(n =>
    n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    n.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <Navbar />

      {/* Header Banner */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950 border-b border-slate-800 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-pink-500/10 border border-pink-500/30 text-pink-400 text-xs font-semibold">
            <InstagramIcon className="w-4 h-4" />
            <span>PORTAL BERITA & INSTAGRAM FEED</span>
          </div>
          
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Berita & Kegiatan Karang Taruna
          </h1>

          <p className="text-slate-300 text-xs sm:text-base max-w-2xl mx-auto">
            Pantau rilis warta terkini dan feed aktivitas Instagram resmi Karang Taruna Kecamatan Cikancung (<span className="text-pink-400 font-bold">@{SEED_SETTINGS.instagramUsername}</span>).
          </p>

          {/* Follow Instagram Button */}
          <div className="pt-2">
            <a
              href={SEED_SETTINGS.instagramUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center space-x-2 px-6 py-3 rounded-xl bg-gradient-to-r from-pink-600 via-purple-600 to-amber-500 text-white font-extrabold text-xs sm:text-sm shadow-xl hover:opacity-90 transition-all hover:scale-105"
            >
              <InstagramIcon className="w-4 h-4" />
              <span>Follow Instagram Kami (@{SEED_SETTINGS.instagramUsername})</span>
            </a>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Controls: Filter & Search Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          
          {/* Tab Switcher */}
          <div className="flex items-center p-1.5 rounded-xl bg-slate-900 border border-slate-800">
            <button
              onClick={() => setActiveTab('INSTAGRAM')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center space-x-2 ${
                activeTab === 'INSTAGRAM'
                  ? 'bg-pink-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <InstagramIcon className="w-4 h-4" />
              <span>Feed Instagram ({igPosts.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('ARTIKEL')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center space-x-2 ${
                activeTab === 'ARTIKEL'
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Newspaper className="w-4 h-4" />
              <span>Artikel Berita ({news.length})</span>
            </button>
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Cari kata kunci berita..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
            />
          </div>

        </div>

        {/* INSTAGRAM TAB GRID */}
        {activeTab === 'INSTAGRAM' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredIg.map((post) => (
              <div
                key={post.id}
                className="group rounded-2xl bg-slate-900 border border-slate-800 hover:border-pink-500/50 overflow-hidden flex flex-col justify-between shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="relative aspect-square overflow-hidden bg-slate-950">
                  <img
                    src={post.thumbnail}
                    alt={post.caption}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />

                  <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-slate-950/80 backdrop-blur-md border border-slate-700/80 flex items-center justify-center text-pink-400 shadow-md">
                    <InstagramIcon className="w-4 h-4" />
                  </div>

                  <div className="absolute bottom-3 left-3">
                    <span className="px-2.5 py-1 rounded-md bg-slate-950/90 text-emerald-400 text-[10px] font-extrabold border border-emerald-500/30 uppercase tracking-wider">
                      {post.category}
                    </span>
                  </div>
                </div>

                <div className="p-5 space-y-3">
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span>{post.date}</span>
                    <div className="flex items-center space-x-3 text-slate-400">
                      <span className="flex items-center space-x-1">
                        <Heart className="w-3.5 h-3.5 text-pink-500 fill-pink-500" />
                        <span>{post.likes}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <MessageCircle className="w-3.5 h-3.5 text-cyan-400" />
                        <span>{post.comments}</span>
                      </span>
                    </div>
                  </div>

                  <p className="text-slate-200 text-xs line-clamp-3 leading-relaxed">
                    {post.caption}
                  </p>

                  <div className="pt-3 border-t border-slate-800 flex items-center justify-end">
                    <a
                      href={post.instagramUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="px-4 py-2 rounded-xl bg-pink-950/50 border border-pink-700/40 text-pink-300 hover:bg-pink-900/70 text-xs font-bold flex items-center space-x-1.5 transition-all"
                    >
                      <span>Lihat Postingan</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ARTICLES TAB GRID */}
        {activeTab === 'ARTIKEL' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredNews.map((art) => (
              <div
                key={art.id}
                className="group rounded-2xl bg-slate-900 border border-slate-800 hover:border-emerald-500/50 overflow-hidden flex flex-col justify-between shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="relative aspect-video overflow-hidden bg-slate-950">
                  <img
                    src={art.thumbnail}
                    alt={art.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 rounded-md bg-emerald-950/90 text-emerald-300 text-[10px] font-extrabold border border-emerald-700/40 uppercase">
                      {art.category}
                    </span>
                  </div>
                </div>

                <div className="p-5 space-y-3">
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span>{art.date}</span>
                    <span className="flex items-center space-x-1 text-slate-500">
                      <Eye className="w-3 h-3" />
                      <span>{art.views} views</span>
                    </span>
                  </div>

                  <h3 className="font-bold text-base text-white group-hover:text-emerald-400 transition-colors line-clamp-2">
                    {art.title}
                  </h3>

                  <p className="text-slate-300 text-xs line-clamp-3 leading-relaxed">
                    {art.summary}
                  </p>

                  <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                    <span className="text-[11px] text-slate-400">Oleh {art.author}</span>
                    <button
                      onClick={() => setSelectedNews(art)}
                      className="px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-emerald-600 text-slate-200 hover:text-white text-xs font-bold transition-all"
                    >
                      Baca Artikel
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </section>

      {/* Article Detail Modal */}
      {selectedNews && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-2xl w-full p-6 space-y-4 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedNews(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-800 text-slate-300 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="aspect-video rounded-2xl overflow-hidden bg-slate-950">
              <img src={selectedNews.thumbnail} alt={selectedNews.title} className="w-full h-full object-cover" />
            </div>

            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-xs text-slate-400">
                <span className="text-emerald-400 font-bold uppercase">{selectedNews.category}</span>
                <span>• {selectedNews.date}</span>
                <span>• {selectedNews.author}</span>
              </div>
              <h2 className="text-xl font-extrabold text-white">{selectedNews.title}</h2>
            </div>

            <div className="text-slate-300 text-xs sm:text-sm leading-relaxed space-y-3">
              <p className="font-semibold text-white">{selectedNews.summary}</p>
              <p>{selectedNews.content}</p>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </main>
  );
}
