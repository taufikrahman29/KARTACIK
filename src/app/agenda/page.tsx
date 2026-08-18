'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AgendaSection from '@/components/AgendaSection';
import { Calendar } from 'lucide-react';

export default function AgendaPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <Navbar />
      <div className="pt-24">
        <AgendaSection />
      </div>
      <Footer />
    </main>
  );
}
