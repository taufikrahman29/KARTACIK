'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Users, 
  Building2, 
  Award, 
  ShoppingBag, 
  ArrowRight, 
  Calendar, 
  Car, 
  ShieldCheck, 
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
  Image as ImageIcon,
  Sparkles 
} from 'lucide-react';
import { DataStore, HeroSlide, SEED_HERO_SLIDES } from '@/lib/data-store';

export default function Hero() {
  const [slides, setSlides] = useState<HeroSlide[]>([]);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const [counters, setCounters] = useState({
    villages: 0,
    members: 0,
    programs: 0,
    umkm: 0
  });

  // Load Hero Slides from DataStore
  useEffect(() => {
    const loadedSlides = DataStore.getHeroSlides();
    const activeSlides = loadedSlides.filter(s => s.isActive);
    if (activeSlides.length > 0) {
      setSlides(activeSlides);
    } else {
      setSlides(SEED_HERO_SLIDES);
    }
  }, []);

  // Slide Autoplay Timer
  useEffect(() => {
    if (slides.length <= 1 || isPaused) return;

    const timer = setInterval(() => {
      setCurrentSlideIndex((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [slides, isPaused]);

  // Animated Counter Effect on Load
  useEffect(() => {
    const target = { villages: 9, members: 450, programs: 38, umkm: 25 };
    const duration = 2000;
    const steps = 50;
    const intervalTime = duration / steps;

    let step = 0;
    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      setCounters({
        villages: Math.min(Math.floor(target.villages * progress), target.villages),
        members: Math.min(Math.floor(target.members * progress), target.members),
        programs: Math.min(Math.floor(target.programs * progress), target.programs),
        umkm: Math.min(Math.floor(target.umkm * progress), target.umkm)
      });

      if (step >= steps) {
        clearInterval(timer);
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, []);

  const handlePrevSlide = () => {
    setCurrentSlideIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const handleNextSlide = () => {
    setCurrentSlideIndex((prev) => (prev + 1) % slides.length);
  };

  const currentSlide = slides[currentSlideIndex] || SEED_HERO_SLIDES[0];

  return (
    <section 
      className="relative min-h-screen flex flex-col justify-between pt-28 pb-16 overflow-hidden bg-slate-950 group"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background Image Carousel with Smooth Crossfade */}
      <div className="absolute inset-0 z-0">
        {slides.length > 0 ? (
          slides.map((slide, index) => (
            <div
              key={slide.id}
              className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000 ease-in-out transform scale-105 ${
                index === currentSlideIndex ? 'opacity-35 scale-100' : 'opacity-0 pointer-events-none'
              }`}
              style={{
                backgroundImage: `url('${slide.imageUrl}')`,
                transitionProperty: 'opacity, transform',
                transitionDuration: '1000ms'
              }}
            />
          ))
        ) : (
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30 scale-105"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=1600&auto=format&fit=crop&q=80')`
            }}
          />
        )}
      </div>

      {/* Gradient Overlay Layers */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-slate-900/60 z-[1]" />
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/75 to-emerald-950/30 z-[1]" />

      {/* Decorative Blur Orbs */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none z-[2]" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none z-[2]" />

      {/* Main Content Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 my-auto w-full">
        <div className="max-w-3xl space-y-6">
          
          {/* Top Organization Tag Badge */}
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold backdrop-blur-md shadow-sm">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Website Resmi Karang Taruna Kecamatan Cikancung</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
          </div>

          {/* Dynamic Slide Badge Tag if Available */}
          {currentSlide && currentSlide.badge && (
            <div className="block">
              <span className="inline-flex items-center space-x-2 px-3 py-1 rounded-lg bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-bold backdrop-blur-md animate-fade-in">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>{currentSlide.badge}</span>
              </span>
            </div>
          )}

          {/* Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.15]">
            Bersama Pemuda, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-amber-300">
              Bergerak, Berkarya,
            </span> <br />
            Membangun Cikancung.
          </h1>

          {/* Subheadline or Dynamic Slide Subtitle */}
          <p className="text-sm sm:text-lg text-slate-300 leading-relaxed font-normal max-w-2xl min-h-[56px] transition-all duration-500">
            {currentSlide?.subtitle ? (
              <span className="block italic text-emerald-200/90 font-medium">
                "{currentSlide.title}: {currentSlide.subtitle}"
              </span>
            ) : (
              'Wadah generasi muda Karang Taruna di 9 Desa se-Kecamatan Cikancung untuk berorganisasi, berkarya, mendorong kemandirian ekonomi daerah, serta hadir berkontribusi nyata bagi masyarakat Kabupaten Bandung.'
            )}
          </p>

          {/* Call-to-action Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Link
              href={currentSlide?.ctaLink || "/profil"}
              className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-sm flex items-center space-x-2 shadow-lg shadow-emerald-950/50 hover:shadow-emerald-500/20 hover:scale-[1.02] transition-all border border-emerald-400/30"
            >
              <span>{currentSlide?.ctaText || "Profil Kami"}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/agenda"
              className="px-6 py-3.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-200 hover:text-white font-bold text-sm flex items-center space-x-2 border border-slate-700/80 shadow-md backdrop-blur-md hover:scale-[1.02] transition-all"
            >
              <Calendar className="w-4 h-4 text-emerald-400" />
              <span>Agenda Kegiatan</span>
            </Link>

            <Link
              href="/grab-kt"
              className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-amber-500/20 to-amber-600/20 hover:from-amber-500/30 hover:to-amber-600/30 text-amber-300 font-bold text-sm flex items-center space-x-2 border border-amber-500/40 shadow-md backdrop-blur-md hover:scale-[1.02] transition-all"
            >
              <Car className="w-4 h-4 text-amber-400" />
              <span>Layanan Grab KT</span>
              <span className="text-[10px] bg-amber-400 text-slate-950 font-black px-1.5 py-0.5 rounded uppercase">Baru</span>
            </Link>
          </div>

        </div>
      </div>

      {/* Animated Counter Statistics Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full mt-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 rounded-2xl bg-slate-900/70 border border-slate-800/80 backdrop-blur-xl shadow-2xl shadow-slate-950">
          
          <div className="flex items-center space-x-3.5 p-2">
            <div className="w-12 h-12 rounded-xl bg-emerald-950/80 border border-emerald-700/40 flex items-center justify-center shrink-0">
              <Building2 className="w-6 h-6 text-emerald-400" />
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                {counters.villages} <span className="text-emerald-400 text-lg">Desa</span>
              </div>
              <p className="text-xs text-slate-400 font-medium">Wilayah Binaan</p>
            </div>
          </div>

          <div className="flex items-center space-x-3.5 p-2">
            <div className="w-12 h-12 rounded-xl bg-emerald-950/80 border border-emerald-700/40 flex items-center justify-center shrink-0">
              <Users className="w-6 h-6 text-emerald-400" />
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                {counters.members}+ <span className="text-emerald-400 text-lg">Anggota</span>
              </div>
              <p className="text-xs text-slate-400 font-medium">Pemuda Terdaftar</p>
            </div>
          </div>

          <div className="flex items-center space-x-3.5 p-2">
            <div className="w-12 h-12 rounded-xl bg-amber-950/80 border border-amber-700/40 flex items-center justify-center shrink-0">
              <Award className="w-6 h-6 text-amber-400" />
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                {counters.programs} <span className="text-amber-400 text-lg">Program</span>
              </div>
              <p className="text-xs text-slate-400 font-medium">Kegiatan / Tahun</p>
            </div>
          </div>

          <div className="flex items-center space-x-3.5 p-2">
            <div className="w-12 h-12 rounded-xl bg-teal-950/80 border border-teal-700/40 flex items-center justify-center shrink-0">
              <ShoppingBag className="w-6 h-6 text-teal-400" />
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                {counters.umkm}+ <span className="text-teal-400 text-lg">UMKM</span>
              </div>
              <p className="text-xs text-slate-400 font-medium">Binaan Pemuda</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
