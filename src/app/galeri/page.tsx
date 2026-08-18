'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import GaleriSection from '@/components/GaleriSection';

export default function GaleriPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <Navbar />
      <div className="pt-24">
        <GaleriSection />
      </div>
      <Footer />
    </main>
  );
}
