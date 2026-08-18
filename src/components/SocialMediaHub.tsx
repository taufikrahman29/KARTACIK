'use client';

import React from 'react';
import { 
  Phone, 
  Share2, 
  ExternalLink 
} from 'lucide-react';
import { InstagramIcon, FacebookIcon, YoutubeIcon } from '@/components/Icons';
import { SEED_SETTINGS } from '@/lib/data-store';

export default function SocialMediaHub() {
  const socials = [
    {
      name: 'Instagram',
      handle: `@${SEED_SETTINGS.instagramUsername}`,
      url: SEED_SETTINGS.instagramUrl,
      icon: InstagramIcon,
      color: 'from-pink-600 to-purple-600 border-pink-500/40 text-pink-400',
      description: 'Update dokumentasi foto & video kegiatan harian.'
    },
    {
      name: 'Facebook Page',
      handle: 'Karang Taruna Kec. Cikancung',
      url: SEED_SETTINGS.facebookUrl,
      icon: FacebookIcon,
      color: 'from-blue-600 to-indigo-600 border-blue-500/40 text-blue-400',
      description: 'Komunitas diskusi & rilis pers resmi publik.'
    },
    {
      name: 'TikTok Official',
      handle: `@${SEED_SETTINGS.instagramUsername}`,
      url: SEED_SETTINGS.tiktokUrl,
      icon: Share2,
      color: 'from-slate-800 to-cyan-700 border-cyan-500/40 text-cyan-400',
      description: 'Video kreatif & konten edukasi kepemudaan.'
    },
    {
      name: 'YouTube Channel',
      handle: 'Karang Taruna Cikancung',
      url: SEED_SETTINGS.youtubeUrl,
      icon: YoutubeIcon,
      color: 'from-red-600 to-rose-700 border-red-500/40 text-red-400',
      description: 'Liputan video dokumenter & siaran acara.'
    },
    {
      name: 'Hotline WhatsApp',
      handle: `+${SEED_SETTINGS.whatsappNumber}`,
      url: `https://wa.me/${SEED_SETTINGS.whatsappNumber}`,
      icon: Phone,
      color: 'from-emerald-600 to-teal-700 border-emerald-500/40 text-emerald-400',
      description: 'Layanan konsultasi & informasi sekretariat.'
    }
  ];

  return (
    <section className="py-20 bg-slate-950 text-slate-100 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
            <Share2 className="w-3.5 h-3.5" />
            <span>KONEKTIVITAS DIGITAL</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Ikuti Aktivitas Kami
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm">
            Terhubung langsung dengan jejaring media sosial resmi Karang Taruna Kecamatan Cikancung untuk mendapatkan rilis informasi terbaru.
          </p>
        </div>

        {/* Social Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {socials.map((s) => {
            const Icon = s.icon;
            return (
              <a
                key={s.name}
                href={s.url}
                target="_blank"
                rel="noreferrer"
                className="group p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 hover:bg-slate-950 transition-all duration-300 hover:-translate-y-1 shadow-lg flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${s.color} border flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-white group-hover:text-emerald-400 transition-colors">
                      {s.name}
                    </h3>
                    <p className="text-[11px] text-emerald-400 font-medium truncate mt-0.5">
                      {s.handle}
                    </p>
                    <p className="text-slate-400 text-[11px] leading-relaxed mt-1.5">
                      {s.description}
                    </p>
                  </div>
                </div>

                <div className="pt-3 mt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-semibold text-slate-400 group-hover:text-white">
                  <span>Kunjungi</span>
                  <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </a>
            );
          })}
        </div>

      </div>
    </section>
  );
}
