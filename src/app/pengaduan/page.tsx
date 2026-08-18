'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { 
  MessageSquareWarning, 
  Send, 
  CheckCircle2, 
  Upload, 
  FileText, 
  X, 
  ArrowLeft,
  Copy,
  ExternalLink
} from 'lucide-react';
import { InstagramIcon } from '@/components/Icons';
import { DataStore, SEED_SETTINGS } from '@/lib/data-store';

export default function PengaduanPage() {
  const [formData, setFormData] = useState({
    name: '',
    whatsapp: '',
    category: 'Sosial',
    location: '',
    content: '',
    attachmentName: '',
    agreed: false
  });

  const [submittedTicket, setSubmittedTicket] = useState<{
    ticketNumber: string;
    formattedSummary: string;
  } | null>(null);

  const [copied, setCopied] = useState(false);

  const categories = [
    'Kegiatan Karang Taruna',
    'Sosial',
    'Lingkungan',
    'Kepemudaan',
    'Olahraga',
    'UMKM',
    'Pelayanan',
    'Lainnya'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.whatsapp || !formData.content || !formData.agreed) {
      alert('Mohon lengkapi seluruh field wajib dan setujui ketentuan penggunaan data.');
      return;
    }

    // Save record to local storage DB
    const newRecord = DataStore.addComplaint({
      name: formData.name,
      whatsapp: formData.whatsapp,
      category: formData.category,
      location: formData.location || 'Kecamatan Cikancung',
      content: formData.content,
      attachmentName: formData.attachmentName || undefined
    });

    // Format text for Instagram DM / WA transfer
    const summaryText = `Halo Karang Taruna Kecamatan Cikancung,\nSaya ingin menyampaikan aspirasi/pengaduan berikut:\n\n📌 *Tiket*: ${newRecord.ticketNumber}\n👤 *Nama*: ${formData.name}\n📱 *WA*: ${formData.whatsapp}\n🏷️ *Kategori*: ${formData.category}\n📍 *Lokasi*: ${formData.location}\n📝 *Isi Pengaduan*: ${formData.content}`;

    setSubmittedTicket({
      ticketNumber: newRecord.ticketNumber,
      formattedSummary: summaryText
    });
  };

  const copyToClipboard = () => {
    if (!submittedTicket) return;
    navigator.clipboard.writeText(submittedTicket.formattedSummary);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <Navbar />

      {/* Header Banner */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950 border-b border-slate-800 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold">
            <MessageSquareWarning className="w-4 h-4" />
            <span>PORTAL ASPIRASI MASYARAKAT</span>
          </div>
          
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Sampaikan Pengaduan & Aspirasi Anda
          </h1>

          <p className="text-slate-300 text-xs sm:text-base max-w-2xl mx-auto">
            Suara masyarakat adalah bagian penting dalam membangun lingkungan Kecamatan Cikancung yang lebih baik.
          </p>
        </div>
      </section>

      {/* Main Section */}
      <section className="py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {!submittedTicket ? (
          /* FORM STATE */
          <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl space-y-6">
            
            <div className="border-b border-slate-800 pb-4 space-y-1">
              <h2 className="text-xl font-bold text-white">Formulir Pengaduan Digital</h2>
              <p className="text-xs text-slate-400">Silakan isi formulir di bawah ini dengan data yang valid.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5 text-xs">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="font-bold text-slate-200">Nama Lengkap *</label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Budi Santoso"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-slate-200">Nomor WhatsApp *</label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: 081234567890"
                    value={formData.whatsapp}
                    onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="font-bold text-slate-200">Kategori Pengaduan *</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-emerald-500"
                  >
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-slate-200">Lokasi Kejadian / Desa</label>
                  <input
                    type="text"
                    placeholder="Contoh: Desa Cihanyir RT 03/RW 02"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="font-bold text-slate-200">Isi Pengaduan / Aspirasi *</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Jelaskan secara rinci pengaduan atau masukan Anda..."
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                />
              </div>

              {/* Upload Simulation */}
              <div className="space-y-1.5">
                <label className="font-bold text-slate-200">Lampiran Foto / Dokumen Pendukung (Opsional)</label>
                <div className="p-4 rounded-xl bg-slate-950 border border-dashed border-slate-800 text-center space-y-2">
                  <Upload className="w-6 h-6 text-slate-500 mx-auto" />
                  <p className="text-slate-400 text-[11px]">Format: JPG, PNG, PDF (Maks. 5MB)</p>
                  <input
                    type="file"
                    className="hidden"
                    id="attachment-file"
                    onChange={(e) => {
                      if (e.target.files?.[0]) {
                        setFormData({ ...formData, attachmentName: e.target.files[0].name });
                      }
                    }}
                  />
                  <label
                    htmlFor="attachment-file"
                    className="inline-block px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 cursor-pointer font-semibold"
                  >
                    {formData.attachmentName ? `File Terpilih: ${formData.attachmentName}` : 'Pilih Berkas'}
                  </label>
                </div>
              </div>

              {/* Agreement Checkbox */}
              <div className="flex items-start space-x-2 pt-2">
                <input
                  type="checkbox"
                  id="agreed-check"
                  checked={formData.agreed}
                  onChange={(e) => setFormData({ ...formData, agreed: e.target.checked })}
                  className="mt-0.5 w-4 h-4 text-emerald-600 rounded bg-slate-950 border-slate-800 focus:ring-emerald-500"
                />
                <label htmlFor="agreed-check" className="text-slate-300 text-[11px] leading-tight cursor-pointer">
                  Saya menyetujui data pengaduan saya digunakan untuk keperluan verifikasi dan tindak lanjut oleh Karang Taruna Kecamatan Cikancung.
                </label>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold text-sm flex items-center justify-center space-x-2 shadow-lg shadow-emerald-950/50 hover:scale-[1.01] transition-all"
                >
                  <Send className="w-4 h-4" />
                  <span>Kirim Pengaduan</span>
                </button>
              </div>

            </form>
          </div>
        ) : (
          /* SUCCESS & REDIRECT STATE (Section 20 requirement) */
          <div className="p-8 rounded-3xl bg-slate-900 border border-emerald-500/40 shadow-2xl space-y-6 text-center animate-in zoom-in-95 duration-200">
            
            <div className="w-16 h-16 rounded-full bg-emerald-950 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto shadow-lg">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <span className="px-3 py-1 rounded-full bg-emerald-950 text-emerald-400 text-xs font-bold uppercase border border-emerald-700">
                PENGADUAN BERHASIL DICATAT
              </span>
              <h2 className="text-2xl font-black text-white">Nomor Tiket: {submittedTicket.ticketNumber}</h2>
              <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed">
                Untuk mempercepat proses tindak lanjut, silakan kirimkan ringkasan pengaduan ini secara langsung melalui **DM Instagram Resmi** Karang Taruna Kecamatan Cikancung.
              </p>
            </div>

            {/* Formatted Text Box */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-left text-xs font-mono text-emerald-300 whitespace-pre-line relative">
              {submittedTicket.formattedSummary}
              <button
                onClick={copyToClipboard}
                className="absolute top-3 right-3 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-[10px] font-sans font-bold flex items-center space-x-1"
              >
                <Copy className="w-3 h-3" />
                <span>{copied ? 'Tersalin!' : 'Salin Teks'}</span>
              </button>
            </div>

            {/* Direct Instagram Link Button */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href={SEED_SETTINGS.instagramUrl}
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-gradient-to-r from-pink-600 via-purple-600 to-amber-500 text-white font-extrabold text-xs sm:text-sm flex items-center justify-center space-x-2 shadow-xl hover:opacity-95 transition-all"
              >
                <InstagramIcon className="w-4 h-4" />
                <span>Lanjutkan ke DM Instagram (@{SEED_SETTINGS.instagramUsername})</span>
                <ExternalLink className="w-4 h-4" />
              </a>

              <button
                onClick={() => setSubmittedTicket(null)}
                className="w-full sm:w-auto px-5 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold flex items-center justify-center space-x-1"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Kembali ke Formulir</span>
              </button>
            </div>

          </div>
        )}

      </section>

      <Footer />
    </main>
  );
}
