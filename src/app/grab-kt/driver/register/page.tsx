'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { 
  UserCheck, 
  ShieldCheck, 
  Upload, 
  Send, 
  CheckCircle2, 
  ArrowLeft,
  FileText
} from 'lucide-react';
import { DataStore, SEED_VILLAGES } from '@/lib/data-store';

export default function DriverRegisterPage() {
  const [form, setForm] = useState({
    applicantName: '',
    memberId: '',
    whatsapp: '',
    address: '',
    village: SEED_VILLAGES[0].villageName,
    ktpNumber: '',
    simNumber: '',
    vehicleType: 'Motor (Scooter)' as const,
    vehicleBrand: '',
    vehicleColor: '',
    vehicleYear: '2024',
    plateNumber: '',
    ktpPhoto: '',
    simPhoto: '',
    vehiclePhoto: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.applicantName || !form.memberId || !form.whatsapp || !form.ktpNumber || !form.simNumber || !form.plateNumber) {
      alert('Mohon isi seluruh field wajib.');
      return;
    }

    DataStore.addDriverApplication({
      ...form,
      ktpPhoto: form.ktpPhoto || 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&auto=format&fit=crop&q=80',
      simPhoto: form.simPhoto || 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&auto=format&fit=crop&q=80',
      vehiclePhoto: form.vehiclePhoto || 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=600&auto=format&fit=crop&q=80'
    });

    setSubmitted(true);
  };

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <Navbar />

      {/* Header Banner */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-amber-950/40 via-slate-950 to-slate-950 border-b border-slate-800 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold">
            <UserCheck className="w-4 h-4" />
            <span>PENDAFTARAN DRIVER GRAB KT</span>
          </div>
          
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Gabung Sebagai Driver Karang Taruna
          </h1>

          <p className="text-slate-300 text-xs sm:text-base max-w-2xl mx-auto">
            Khusus Anggota Karang Taruna Kecamatan Cikancung. Buka peluang pendapatan mandiri dengan kendaraan pribadi Anda.
          </p>
        </div>
      </section>

      <section className="py-16 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {!submitted ? (
          <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl space-y-6">
            
            <div className="border-b border-slate-800 pb-4 space-y-1">
              <h2 className="text-xl font-bold text-white">Formulir Permohonan Driver</h2>
              <p className="text-xs text-amber-400 font-semibold">
                * Data identitas dan dokumen akan diverifikasi manual oleh Admin sebelum akun diaktifkan.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="font-bold text-slate-200">Nama Lengkap Anggota *</label>
                  <input
                    type="text"
                    required
                    placeholder="Nama sesuai KTP"
                    value={form.applicantName}
                    onChange={(e) => setForm({ ...form, applicantName: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-slate-200">Nomor Anggota Karang Taruna *</label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: KT-CKC-2026-089"
                    value={form.memberId}
                    onChange={(e) => setForm({ ...form, memberId: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="font-bold text-slate-200">Nomor WhatsApp Aktif *</label>
                  <input
                    type="text"
                    required
                    placeholder="081234567890"
                    value={form.whatsapp}
                    onChange={(e) => setForm({ ...form, whatsapp: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-slate-200">Asal Desa *</label>
                  <select
                    value={form.village}
                    onChange={(e) => setForm({ ...form, village: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white"
                  >
                    {SEED_VILLAGES.map((v) => (
                      <option key={v.id} value={v.villageName}>{v.villageName}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="font-bold text-slate-200">NIK (KTP) *</label>
                  <input
                    type="text"
                    required
                    placeholder="16 digit NIK"
                    value={form.ktpNumber}
                    onChange={(e) => setForm({ ...form, ktpNumber: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-slate-200">Nomor SIM C / SIM A *</label>
                  <input
                    type="text"
                    required
                    placeholder="Nomor SIM aktif"
                    value={form.simNumber}
                    onChange={(e) => setForm({ ...form, simNumber: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white"
                  />
                </div>
              </div>

              {/* Vehicle info */}
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                <span className="font-extrabold text-amber-400">Data Kendaraan</span>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="font-semibold text-slate-300">Jenis Kendaraan</label>
                    <select
                      value={form.vehicleType}
                      onChange={(e) => setForm({ ...form, vehicleType: e.target.value as any })}
                      className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-white mt-1"
                    >
                      <option value="Motor (Scooter)">Motor (Scooter)</option>
                      <option value="Motor (Bebek/Sport)">Motor (Bebek/Sport)</option>
                      <option value="Mobil (MPV/Sedan)">Mobil (MPV/Sedan)</option>
                    </select>
                  </div>

                  <div>
                    <label className="font-semibold text-slate-300">Merk & Tipe</label>
                    <input
                      type="text"
                      placeholder="Contoh: Honda Vario 160"
                      value={form.vehicleBrand}
                      onChange={(e) => setForm({ ...form, vehicleBrand: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-white mt-1"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="font-semibold text-slate-300">Warna Kendaraan</label>
                    <input
                      type="text"
                      placeholder="Contoh: Hitam Metallic"
                      value={form.vehicleColor}
                      onChange={(e) => setForm({ ...form, vehicleColor: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-white mt-1"
                    />
                  </div>

                  <div>
                    <label className="font-semibold text-slate-300">Nomor Polisi (Plat Nomor) *</label>
                    <input
                      type="text"
                      required
                      placeholder="Contoh: D 4582 ZCJ"
                      value={form.plateNumber}
                      onChange={(e) => setForm({ ...form, plateNumber: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-white mt-1"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white font-extrabold text-sm flex items-center justify-center space-x-2 shadow-xl shadow-amber-950/50 hover:scale-[1.01] transition-all"
                >
                  <Send className="w-4 h-4" />
                  <span>Kirim Permohonan Pendaftaran</span>
                </button>
              </div>

            </form>
          </div>
        ) : (
          <div className="p-8 rounded-3xl bg-slate-900 border border-amber-500/40 text-center space-y-5 shadow-2xl animate-in zoom-in-95">
            <div className="w-16 h-16 rounded-full bg-amber-950 border border-amber-500 text-amber-400 flex items-center justify-center mx-auto shadow-md">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <span className="px-3 py-1 rounded-full bg-amber-950 text-amber-300 text-xs font-extrabold border border-amber-700">
                STATUS: WAITING_VERIFICATION
              </span>
              <h2 className="text-2xl font-black text-white">Permohonan Driver Terkirim!</h2>
              <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed">
                Terima kasih, data Anda telah dicatat. Tim Admin Karang Taruna Kecamatan Cikancung akan memverifikasi KTP, SIM, dan data keanggotaan Anda.
              </p>
            </div>

            <div className="pt-4 flex items-center justify-center space-x-4">
              <Link
                href="/grab-kt"
                className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold"
              >
                Kembali ke Grab KT
              </Link>
            </div>
          </div>
        )}

      </section>

      <Footer />
    </main>
  );
}
