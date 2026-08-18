import React from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import TentangSection from '@/components/TentangSection';
import ProgramUnggulan from '@/components/ProgramUnggulan';
import InstagramFeed from '@/components/InstagramFeed';
import AgendaSection from '@/components/AgendaSection';
import PengumumanSection from '@/components/PengumumanSection';
import PengaduanCTA from '@/components/PengaduanCTA';
import GrabKTBanner from '@/components/GrabKTBanner';
import GaleriSection from '@/components/GaleriSection';
import SocialMediaHub from '@/components/SocialMediaHub';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Karang Taruna Kecamatan Cikancung - Portal Resmi & Grab KT',
  description: 'Website Resmi Karang Taruna Kecamatan Cikancung, Kabupaten Bandung. Berita kegiatan, agenda pemuda, pengaduan masyarakat, serta layanan transportasi Grab KT.',
  openGraph: {
    title: 'Karang Taruna Kecamatan Cikancung',
    description: 'Bersama Pemuda, Bergerak, Berkarya, dan Membangun Cikancung.',
    url: 'https://kartabacip.or.id',
    siteName: 'Karang Taruna Kecamatan Cikancung',
    locale: 'id_ID',
    type: 'website',
  },
};

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 selection:bg-emerald-500 selection:text-white">
      <Navbar />
      
      {/* 1. Hero Section */}
      <Hero />

      {/* 2. Tentang Karang Taruna */}
      <TentangSection />

      {/* 3. Program Unggulan */}
      <ProgramUnggulan />

      {/* 4. Berita & Kegiatan Instagram */}
      <InstagramFeed />

      {/* 5. Agenda Kegiatan */}
      <AgendaSection />

      {/* 6. Pengumuman */}
      <PengumumanSection />

      {/* 7. Pengaduan Masyarakat CTA */}
      <PengaduanCTA />

      {/* 8. Grab KT Transport Highlight Banner */}
      <GrabKTBanner />

      {/* 9. Galeri Foto */}
      <GaleriSection />

      {/* 10. Social Media Hub */}
      <SocialMediaHub />

      <Footer />
    </main>
  );
}
