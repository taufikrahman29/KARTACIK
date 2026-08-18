'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { DataStore, ComplaintRecord } from '@/lib/data-store';
import { 
  MessageSquare, 
  Send, 
  CheckCircle2, 
  AlertCircle, 
  FileText, 
  Paperclip, 
  ShieldAlert, 
  ExternalLink,
  Phone,
  Lock,
  Copy,
  Check
} from 'lucide-react';
import { InstagramIcon } from '@/components/Icons';

export default function PengaduanWargaPage() {
  const [formData, setFormData] = useState({
    name: '',
    whatsapp: '',
    category: 'Layanan Publik & Fasilitas',
    location: 'Kecamatan Cikancung',
    content: '',
    attachmentName: ''
  });

  const [submittedTicket, setSubmittedTicket] = useState<ComplaintRecord | null>(null);
  const [copied, setCopied] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.whatsapp || !formData.content) {
      alert('Mohon lengkapi Nama, Nomor WhatsApp, dan Isi Pengaduan.');
      return;
    }

    const record = DataStore.addComplaint(formData);
    setSubmittedTicket(record);

    // Auto redirect / copy text format for IG DM
    const textMsg = `Halo Karang Taruna Kecamatan Cikancung (@karta.kec.cikancung),\n\nSaya ingin menyampaikan Pengaduan Warga:\n- Tiket: ${record.ticketNumber}\n- Nama: ${record.name}\n- WA: ${record.whatsapp}\n- Kategori: ${record.category}\n- Lokasi: ${record.location}\n- Isi Pengaduan: "${record.content}"`;

    navigator.clipboard.writeText(textMsg).catch(() => {});

    // Open Instagram DM directly in new tab after brief delay
    setTimeout(() => {
      window.open('https://www.instagram.com/karta.kec.cikancung/', '_blank');
    }, 1500);
  };

  const formattedIgText = submittedTicket 
    ? `Halo Karang Taruna Kecamatan Cikancung (@karta.kec.cikancung),\n\nSaya ingin menyampaikan Pengaduan Warga:\n- Tiket: ${submittedTicket.ticketNumber}\n- Nama: ${submittedTicket.name}\n- WA: ${submittedTicket.whatsapp}\n- Kategori: ${submittedTicket.category}\n- Lokasi: ${submittedTicket.location}\n- Pesan Pengaduan: "${submittedTicket.content}"`
    : '';

  const handleCopyText = () => {
    navigator.clipboard.writeText(formattedIgText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 selection:bg-emerald-500 selection:text-slate-950 font-sans">
      <Navbar />

      <main className="flex-1 pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full space-y-12">
        
        {/* HERO BANNER */}
        <section className="text-center space-y-4">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-pink-950/60 border border-pink-700/50 text-pink-300 text-xs font-extrabold uppercase tracking-widest shadow-md">
            <InstagramIcon className="w-4 h-4" />
            <span>Layanan Aspirasi & DM Instagram Official</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Layanan Pengaduan & Aspirasi Warga
          </h1>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Sampaikan laporan, saran, atau aspirasi Anda. Pengaduan secara otomatis tersimpan di sistem Admin CMS dan **langsung terhubung ke DM Instagram Resmi Karang Taruna Kecamatan Cikancung** (<strong className="text-pink-400">@karta.kec.cikancung</strong>).
          </p>
        </section>

        {submittedTicket ? (
          /* SUCCESS TICKET STATE & IG DIRECT REDIRECT */
          <section className="p-8 sm:p-10 rounded-3xl bg-slate-900 border border-emerald-500/50 space-y-6 shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="flex items-center space-x-4">
              <div className="w-14 h-14 rounded-2xl bg-emerald-950 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div>
                <span className="text-xs font-extrabold text-emerald-400 uppercase tracking-widest">PENGADUAN BERHASIL TERCATAT</span>
                <h2 className="text-2xl font-black text-white">Nomor Tiket: {submittedTicket.ticketNumber}</h2>
              </div>
            </div>

            <p className="text-slate-300 text-sm leading-relaxed">
              Terima kasih <strong className="text-white">{submittedTicket.name}</strong>! Laporan pengaduan Anda telah resmi tercatat di database Admin Karang Taruna Cikancung. 
              Teks pengaduan di bawah ini telah **otomatis tersalin (copied)**. Silakan kirimkan langsung via DM ke akun Instagram resmi:
            </p>

            {/* PRE-FORMATTED TEXT FOR IG */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-400">Format Teks Pengaduan (Siap Kirim DM IG):</span>
                <button
                  onClick={handleCopyText}
                  className="px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-bold text-emerald-400 flex items-center space-x-1"
                >
                  {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Tersalin!' : 'Salin Teks'}</span>
                </button>
              </div>
              <pre className="text-xs text-slate-200 font-mono whitespace-pre-wrap leading-relaxed bg-slate-900 p-3 rounded-xl border border-slate-800">
                {formattedIgText}
              </pre>
            </div>

            {/* DIRECT CTA BUTTONS */}
            <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
              <a
                href="https://www.instagram.com/karta.kec.cikancung/"
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto flex-1 py-4 px-6 rounded-2xl bg-gradient-to-r from-pink-600 via-rose-600 to-purple-600 hover:from-pink-500 text-white font-extrabold text-sm flex items-center justify-center space-x-2 shadow-xl hover:scale-[1.02] transition-all"
              >
                <InstagramIcon className="w-5 h-5 fill-white" />
                <span>Kirimkan ke DM Instagram @karta.kec.cikancung ↗</span>
              </a>

              <a
                href={`https://wa.me/62895632180100?text=${encodeURIComponent(formattedIgText)}`}
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto py-4 px-6 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-sm flex items-center justify-center space-x-2 shadow-xl hover:scale-[1.02] transition-all"
              >
                <Phone className="w-5 h-5" />
                <span>Kirim via WA Hotline (0895632180100) ↗</span>
              </a>
            </div>

            <div className="pt-4 border-t border-slate-800 text-center">
              <button
                onClick={() => setSubmittedTicket(null)}
                className="text-xs text-slate-400 hover:text-white font-bold underline"
              >
                Buat Pengaduan Lainnya
              </button>
            </div>
          </section>
        ) : (
          /* FORM SECTION */
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            <div className="lg:col-span-2 p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-6 shadow-xl">
              <div className="space-y-1 border-b border-slate-800 pb-4">
                <h2 className="text-xl font-extrabold text-white">Formulir Pengaduan Online Warga</h2>
                <p className="text-xs text-slate-400">Isi data secara benar. Identitas Anda dijaga kerahasiaannya oleh organisasi.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="font-bold text-slate-200">Nama Lengkap Pelapor *</label>
                    <input
                      type="text"
                      required
                      placeholder="Masukkan nama lengkap Anda"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-white focus:border-pink-500 focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-bold text-slate-200">Nomor WhatsApp Aktif *</label>
                    <input
                      type="tel"
                      required
                      placeholder="Contoh: 0895632180100"
                      value={formData.whatsapp}
                      onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                      className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-white focus:border-pink-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="font-bold text-slate-200">Kategori Pengaduan</label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-white focus:border-pink-500 focus:outline-none"
                    >
                      <option value="Layanan Publik & Fasilitas">Layanan Publik & Fasilitas</option>
                      <option value="Kepemudaan & Olahraga">Kepemudaan & Olahraga</option>
                      <option value="Kebersihan & Lingkungan">Kebersihan & Lingkungan</option>
                      <option value="UMKM & Ekonomi Desa">UMKM & Ekonomi Desa</option>
                      <option value="Transportasi / Grab KT">Transportasi / Grab KT</option>
                      <option value="Lainnya">Lainnya</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-bold text-slate-200">Lokasi Kejadian / Desa</label>
                    <select
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-white focus:border-pink-500 focus:outline-none"
                    >
                      <option value="Kecamatan Cikancung">Kecamatan Cikancung (Umum)</option>
                      <option value="Desa Cikancung">Desa Cikancung</option>
                      <option value="Desa Cihanyir">Desa Cihanyir</option>
                      <option value="Desa Ciluluk">Desa Ciluluk</option>
                      <option value="Desa Hegarmanah">Desa Hegarmanah</option>
                      <option value="Desa Mandalasari">Desa Mandalasari</option>
                      <option value="Desa Mekarlaksana">Desa Mekarlaksana</option>
                      <option value="Desa Srirahayu">Desa Srirahayu</option>
                      <option value="Desa Tanjungwangi">Desa Tanjungwangi</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-slate-200">Isi Pesan Pengaduan / Aspirasi *</label>
                  <textarea
                    rows={5}
                    required
                    placeholder="Jelaskan pengaduan atau aspirasi Anda secara jelas..."
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:border-pink-500 focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-2xl bg-gradient-to-r from-pink-600 via-rose-600 to-purple-600 hover:from-pink-500 text-white font-black text-sm flex items-center justify-center space-x-2 shadow-xl hover:scale-[1.01] transition-all"
                >
                  <Send className="w-4 h-4" />
                  <span>Kirimkan Pengaduan & Buka DM Instagram ↗</span>
                </button>
              </form>
            </div>

            {/* CONTACT INFO CARD */}
            <div className="space-y-4">
              <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4 text-xs">
                <h3 className="font-extrabold text-sm text-white flex items-center space-x-2">
                  <InstagramIcon className="w-4 h-4 fill-pink-400" />
                  <span>Kontak Resmi Pengaduan</span>
                </h3>

                <div className="space-y-3">
                  <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                    <span className="text-[10px] font-bold text-slate-400 uppercase">Instagram Direct Message</span>
                    <a
                      href="https://www.instagram.com/karta.kec.cikancung/"
                      target="_blank"
                      rel="noreferrer"
                      className="font-extrabold text-pink-400 hover:underline block text-sm truncate"
                    >
                      @karta.kec.cikancung
                    </a>
                  </div>

                  <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                    <span className="text-[10px] font-bold text-slate-400 uppercase">WhatsApp Hotline</span>
                    <a
                      href="https://wa.me/62895632180100"
                      target="_blank"
                      rel="noreferrer"
                      className="font-extrabold text-emerald-400 hover:underline block text-sm"
                    >
                      0895-6321-80100
                    </a>
                  </div>

                  <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                    <span className="text-[10px] font-bold text-slate-400 uppercase">Email Official</span>
                    <a
                      href="mailto:pktkeccikancung@gmail.com"
                      className="font-extrabold text-cyan-400 hover:underline block text-sm"
                    >
                      pktkeccikancung@gmail.com
                    </a>
                  </div>
                </div>

                <div className="pt-2 text-[11px] text-slate-400 flex items-start space-x-2">
                  <Lock className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <p>Seluruh laporan pengaduan terlindungi dan langsung diteruskan ke Pengurus Harian Karang Taruna Kecamatan Cikancung.</p>
                </div>
              </div>
            </div>

          </div>
        )}

      </main>

      <Footer />
    </div>
  );
}
