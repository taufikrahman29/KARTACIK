'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Send, 
  MessageSquare,
  CheckCircle2
} from 'lucide-react';
import { InstagramIcon, FacebookIcon } from '@/components/Icons';
import { SEED_SETTINGS } from '@/lib/data-store';

export default function KontakPage() {
  const [form, setForm] = useState({ name: '', email: '', whatsapp: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.whatsapp || !form.message) {
      alert('Mohon isi field bertanda bintang.');
      return;
    }
    setSent(true);
  };

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <Navbar />

      {/* Header Banner */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950 border-b border-slate-800 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
            <Mail className="w-4 h-4" />
            <span>SEKRETARIAT PUSAT</span>
          </div>
          
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Hubungi Karang Taruna Cikancung
          </h1>

          <p className="text-slate-300 text-xs sm:text-base max-w-2xl mx-auto">
            Sampaikan pertanyaan, usulan program, atau permohonan kemitraan melalui layanan kontak resmi kami.
          </p>
        </div>
      </section>

      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column: Contact Cards & Embedded Map Placeholder */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-5">
              <h3 className="font-extrabold text-lg text-white border-b border-slate-800 pb-3">
                Informasi Sekretariat
              </h3>

              <div className="space-y-4 text-xs text-slate-300">
                <div className="flex items-start space-x-3">
                  <div className="w-9 h-9 rounded-xl bg-emerald-950 border border-emerald-700/40 text-emerald-400 flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white">Alamat Lengkap</h4>
                    <p className="text-slate-400 mt-0.5 leading-relaxed">{SEED_SETTINGS.address}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-9 h-9 rounded-xl bg-emerald-950 border border-emerald-700/40 text-emerald-400 flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white">Hotline WhatsApp</h4>
                    <p className="text-slate-400 mt-0.5">+{SEED_SETTINGS.whatsappNumber}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-9 h-9 rounded-xl bg-emerald-950 border border-emerald-700/40 text-emerald-400 flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white">Email Resmi</h4>
                    <p className="text-slate-400 mt-0.5">{SEED_SETTINGS.email}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Interactive Map Visual Placeholder */}
            <div className="p-4 rounded-3xl bg-slate-900 border border-slate-800 space-y-2">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                Lokasi Kantor Kecamatan Cikancung
              </span>
              <div className="w-full h-56 rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 relative flex items-center justify-center">
                <iframe
                  title="Google Maps Cikancung"
                  src="https://maps.google.com/maps?q=-7.0195,107.8105&z=15&output=embed"
                  className="w-full h-full border-0 opacity-80 hover:opacity-100 transition-opacity"
                  loading="lazy"
                />
              </div>
            </div>

          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl space-y-6">
              
              <div className="border-b border-slate-800 pb-3">
                <h3 className="font-extrabold text-xl text-white">Kirim Pesan Langsung</h3>
                <p className="text-xs text-slate-400">Tim pengurus kami akan merespons pesan Anda dalam 1x24 jam.</p>
              </div>

              {!sent ? (
                <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                  
                  <div className="space-y-1.5">
                    <label className="font-bold text-slate-200">Nama Lengkap *</label>
                    <input
                      type="text"
                      required
                      placeholder="Masukkan nama Anda"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="font-bold text-slate-200">Email</label>
                      <input
                        type="email"
                        placeholder="email@domain.com"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="font-bold text-slate-200">Nomor WhatsApp *</label>
                      <input
                        type="text"
                        required
                        placeholder="081234567890"
                        value={form.whatsapp}
                        onChange={(e) => setForm({ ...form, whatsapp: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-bold text-slate-200">Isi Pesan / Pertanyaan *</label>
                    <textarea
                      rows={5}
                      required
                      placeholder="Tuliskan pesan Anda di sini..."
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold text-xs sm:text-sm flex items-center justify-center space-x-2 shadow-lg hover:scale-[1.01] transition-all"
                  >
                    <Send className="w-4 h-4" />
                    <span>Kirim Pesan</span>
                  </button>

                </form>
              ) : (
                <div className="p-8 rounded-2xl bg-slate-950 border border-emerald-500/40 text-center space-y-4 animate-in zoom-in-95">
                  <div className="w-14 h-14 rounded-full bg-emerald-950 text-emerald-400 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="font-bold text-lg text-white">Pesan Anda Berhasil Terkirim!</h4>
                  <p className="text-xs text-slate-300">
                    Terima kasih telah menghubungi Karang Taruna Kecamatan Cikancung. Pesan Anda telah diteruskan ke Sekretariat.
                  </p>
                  <button
                    onClick={() => setSent(false)}
                    className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold"
                  >
                    Kirim Pesan Lainnya
                  </button>
                </div>
              )}

            </div>
          </div>

        </div>
      </section>

      <Footer />
    </main>
  );
}
