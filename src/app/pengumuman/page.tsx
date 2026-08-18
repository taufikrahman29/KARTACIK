'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PengumumanSection from '@/components/PengumumanSection';

export default function PengumumanPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <Navbar />
      <div className="pt-24">
        <PengumumanSection />
      </div>
      <Footer />
    </main>
  );
}
