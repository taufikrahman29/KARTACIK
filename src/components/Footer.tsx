'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Shield, 
  MapPin, 
  Phone, 
  Mail, 
  ExternalLink,
  ChevronRight,
  Send
} from 'lucide-react';
import { InstagramIcon } from '@/components/Icons';

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-900 pt-16 pb-12 font-sans text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* BRAND COLUMN */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center text-slate-950 shadow-lg shadow-emerald-950/50">
                <Shield className="w-6 h-6 fill-slate-950" />
              </div>
              <div>
                <h3 className="font-extrabold text-white text-base leading-tight">KARANG TARUNA</h3>
                <p className="text-[10px] text-emerald-400 font-bold tracking-widest uppercase">KECAMATAN CIKANCUNG</p>
              </div>
            </div>

            <p className="text-slate-400 text-xs leading-relaxed">
              Wadah resmi generasi muda di 9 Desa se-Kecamatan Cikancung, Kabupaten Bandung. Bergerak bersama mewujudkan pemuda mandiri, berkarakter, dan inovatif.
            </p>

            <div className="flex items-center space-x-3 pt-2">
              <a
                href="https://www.instagram.com/karta.kec.cikancung/"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram Official"
                className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 hover:border-pink-500 text-slate-300 hover:text-pink-400 flex items-center justify-center transition-all hover:scale-110"
              >
                <InstagramIcon className="w-4 h-4 fill-current" />
              </a>
              <a
                href="https://wa.me/62895632180100"
                target="_blank"
                rel="noreferrer"
                aria-label="WhatsApp Official"
                className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 hover:border-emerald-500 text-slate-300 hover:text-emerald-400 flex items-center justify-center transition-all hover:scale-110"
              >
                <Phone className="w-4 h-4" />
              </a>
              <a
                href="mailto:pktkeccikancung@gmail.com"
                aria-label="Email Official"
                className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 hover:border-cyan-500 text-slate-300 hover:text-cyan-400 flex items-center justify-center transition-all hover:scale-110"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* QUICK LINKS */}
          <div className="space-y-3">
            <h4 className="font-extrabold text-white text-sm tracking-wider uppercase">NAVIGASI UTAMA</h4>
            <ul className="space-y-2">
              {[
                { name: 'Beranda', href: '/' },
                { name: 'Profil & Visi Misi', href: '/profil' },
                { name: 'Struktur Organisasi', href: '/organisasi' },
                { name: 'Berita & Instagram', href: '/berita' },
                { name: 'Agenda Kegiatan', href: '/agenda' },
                { name: 'Pengumuman Resmi', href: '/pengumuman' },
                { name: 'Galeri Foto', href: '/galeri' },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-emerald-400 transition-colors flex items-center space-x-1.5">
                    <ChevronRight className="w-3 h-3 text-emerald-500" />
                    <span>{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* DIGITIZATION & GRAB KT */}
          <div className="space-y-3">
            <h4 className="font-extrabold text-white text-sm tracking-wider uppercase">LAYANAN DIGITAL & INOVASI</h4>
            <ul className="space-y-2">
              {[
                { name: 'Portal Grab KT (Transportasi)', href: '/grab-kt' },
                { name: 'Pendaftaran Driver Grab KT', href: '/grab-kt/driver/register' },
                { name: 'Pengaduan Warga Online', href: '/pengaduan' },
                { name: 'Hotline WhatsApp Warga', href: 'https://wa.me/62895632180100' },
                { name: 'Direct Message Instagram', href: 'https://www.instagram.com/karta.kec.cikancung/' },
                { name: 'Admin Dashboard CMS', href: '/admin/login' },
              ].map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="hover:text-emerald-400 transition-colors flex items-center space-x-1.5">
                    <ChevronRight className="w-3 h-3 text-emerald-500" />
                    <span>{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* CONTACT & OFFICE */}
          <div className="space-y-3">
            <h4 className="font-extrabold text-white text-sm tracking-wider uppercase">KONTAK KANTOR SECRETARIAT</h4>
            
            <div className="space-y-2 text-slate-300">
              <div className="flex items-start space-x-2.5">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <p>Jl. Raya Cikancung No. 01, Kompleks Kantor Kecamatan Cikancung, Kabupaten Bandung, Jawa Barat 40396.</p>
              </div>

              <div className="flex items-center space-x-2.5">
                <InstagramIcon className="w-4 h-4 fill-pink-400 shrink-0" />
                <a href="https://www.instagram.com/karta.kec.cikancung/" target="_blank" rel="noreferrer" className="hover:text-pink-400 transition-colors font-bold">
                  @karta.kec.cikancung
                </a>
              </div>

              <div className="flex items-center space-x-2.5">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <a href="https://wa.me/62895632180100" target="_blank" rel="noreferrer" className="hover:text-emerald-400 transition-colors font-bold">
                  0895-6321-80100
                </a>
              </div>

              <div className="flex items-center space-x-2.5">
                <Mail className="w-4 h-4 text-cyan-400 shrink-0" />
                <a href="mailto:pktkeccikancung@gmail.com" className="hover:text-cyan-400 transition-colors font-bold">
                  pktkeccikancung@gmail.com
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* BOTTOM COPYRIGHT */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left text-slate-400">
          <p>© 2026 Karang Taruna Kecamatan Cikancung, Kabupaten Bandung. Hak Cipta Dilindungi Undang-Undang.</p>
          
          <div className="flex items-center space-x-4">
            <span className="text-emerald-400 font-bold">Kecamatan Cikancung Maju & Mandiri</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
