'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  Shield, 
  LayoutDashboard, 
  Newspaper, 
  Calendar, 
  Bell, 
  Camera, 
  Users, 
  UserCheck,
  MessageSquare, 
  Car, 
  Settings, 
  LogOut, 
  Plus, 
  Trash2, 
  Edit, 
  CheckCircle2, 
  XCircle, 
  Star, 
  Search, 
  DollarSign,
  TrendingUp,
  FileText
} from 'lucide-react';
import { InstagramIcon } from '@/components/Icons';
import { 
  DataStore, 
  NewsArticle, 
  AgendaItem, 
  AnnouncementItem, 
  GalleryItem, 
  OrgMember, 
  ComplaintRecord, 
  GrabDriverApplication, 
  GrabDriver, 
  GrabOrder, 
  GrabTariff, 
  SiteSettings 
} from '@/lib/data-store';

export default function AdminDashboardPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<
    'DASHBOARD' | 'BERITA' | 'AGENDA' | 'PENGUMUMAN' | 'GALERI' | 'PROFIL' | 'ORGANISASI' | 'PESAN' | 'GRAB_KT' | 'PENGATURAN'
  >('DASHBOARD');

  // CMS Data States
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [agendas, setAgendas] = useState<AgendaItem[]>([]);
  const [announcements, setAnnouncements] = useState<AnnouncementItem[]>([]);
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [members, setMembers] = useState<OrgMember[]>([]);
  const [complaints, setComplaints] = useState<ComplaintRecord[]>([]);
  const [driverApps, setDriverApps] = useState<GrabDriverApplication[]>([]);
  const [drivers, setDrivers] = useState<GrabDriver[]>([]);
  const [orders, setOrders] = useState<GrabOrder[]>([]);
  const [tariff, setTariff] = useState<GrabTariff>(DataStore.getTariff());
  const [settings, setSettings] = useState<SiteSettings>(DataStore.getSettings());

  // Form modal states
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedAppReview, setSelectedAppReview] = useState<GrabDriverApplication | null>(null);

  useEffect(() => {
    refreshData();
  }, []);

  const refreshData = () => {
    setNews(DataStore.getNews());
    setAgendas(DataStore.getAgendas());
    setAnnouncements(DataStore.getAnnouncements());
    setGallery(DataStore.getGallery());
    setMembers(DataStore.getMembers());
    setComplaints(DataStore.getComplaints());
    setDriverApps(DataStore.getDriverApplications());
    setDrivers(DataStore.getDrivers());
    setOrders(DataStore.getOrders());
    setTariff(DataStore.getTariff());
    setSettings(DataStore.getSettings());
  };

  const handleLogout = () => {
    DataStore.setAdminSession(false);
    router.push('/admin/login');
  };

  // Driver Verification Handler
  const handleVerifyDriver = (appId: string, approve: boolean) => {
    const reason = approve ? undefined : prompt('Masukkan alasan penolakan application driver:');
    if (!approve && reason === null) return;
    
    DataStore.verifyDriverApplication(appId, approve, reason || undefined);
    refreshData();
    setSelectedAppReview(null);
    alert(approve ? 'Driver Berhasil Disetujui dan Diaktifkan!' : 'Permohonan driver ditolak.');
  };

  // Generic Confirmation Delete
  const confirmDelete = (itemTitle: string, onDelete: () => void) => {
    if (window.confirm(`Apakah Anda yakin ingin menghapus data "${itemTitle}"?`)) {
      onDelete();
      refreshData();
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 flex flex-col md:flex-row">
      
      {/* SIDEBAR NAVIGATION */}
      <aside className="w-full md:w-64 bg-slate-900 border-r border-slate-800 p-4 shrink-0 space-y-6">
        
        {/* Brand */}
        <div className="flex items-center space-x-3 px-2">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center text-slate-950 shadow-md">
            <Shield className="w-5 h-5 fill-slate-950" />
          </div>
          <div>
            <h2 className="font-extrabold text-sm text-white leading-tight">CMS KARANG TARUNA</h2>
            <p className="text-[10px] text-emerald-400 font-semibold tracking-wider uppercase">Kec. Cikancung</p>
          </div>
        </div>

        {/* Menu Links */}
        <nav className="space-y-1 text-xs">
          {[
            { id: 'DASHBOARD', name: 'Dashboard CMS', icon: LayoutDashboard },
            { id: 'BERITA', name: 'Berita & Instagram', icon: Newspaper, count: news.length },
            { id: 'AGENDA', name: 'Agenda Kegiatan', icon: Calendar, count: agendas.length },
            { id: 'PENGUMUMAN', name: 'Pengumuman', icon: Bell, count: announcements.length },
            { id: 'GALERI', name: 'Galeri Foto', icon: Camera, count: gallery.length },
            { id: 'PROFIL', name: 'Profil & Sejarah', icon: FileText },
            { id: 'ORGANISASI', name: 'Struktur Pengurus', icon: Users, count: members.length },
            { id: 'PESAN', name: 'Pengaduan Warga', icon: MessageSquare, count: complaints.length },
            { id: 'GRAB_KT', name: 'Grab KT (Driver & Order)', icon: Car, count: driverApps.filter(a => a.status === 'WAITING_VERIFICATION').length, highlight: true },
            { id: 'PENGATURAN', name: 'Pengaturan Medsos', icon: Settings }
          ].map((item) => {
            const Icon = item.icon;
            const active = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id as any)}
                className={`w-full px-3 py-2.5 rounded-xl font-bold flex items-center justify-between transition-all ${
                  active
                    ? 'bg-emerald-600 text-white shadow-md'
                    : item.highlight
                    ? 'bg-amber-950/40 text-amber-300 border border-amber-500/30 hover:bg-amber-900/60'
                    : 'text-slate-300 hover:bg-slate-800'
                }`}
              >
                <div className="flex items-center space-x-2.5">
                  <Icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </div>
                {item.count !== undefined && item.count > 0 && (
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-black ${
                    active ? 'bg-slate-950 text-emerald-400' : 'bg-slate-800 text-slate-300'
                  }`}>
                    {item.count}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="pt-4 border-t border-slate-800">
          <button
            onClick={handleLogout}
            className="w-full px-3 py-2.5 rounded-xl bg-slate-950 hover:bg-red-950/50 border border-slate-800 hover:border-red-800 text-red-400 text-xs font-bold flex items-center space-x-2 transition-all"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout Admin</span>
          </button>
        </div>

      </aside>

      {/* MAIN CONTENT AREA */}
      <section className="flex-1 p-6 sm:p-8 space-y-8 overflow-y-auto">
        
        {/* TOP BAR */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider">ADMIN CONTROL PANEL</span>
            <h1 className="text-2xl font-black text-white">{activeTab.replace(/_/g, ' ')}</h1>
          </div>

          <div className="flex items-center space-x-3">
            <Link
              href="/"
              target="_blank"
              className="px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold flex items-center space-x-1"
            >
              <span>Lihat Website Publik ↗</span>
            </Link>
          </div>
        </div>

        {/* TAB 1: DASHBOARD OVERVIEW */}
        {activeTab === 'DASHBOARD' && (
          <div className="space-y-8">
            
            {/* Metric Summary Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
                <span className="text-xs text-slate-400">Total Berita</span>
                <p className="font-black text-2xl text-white">{news.length}</p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
                <span className="text-xs text-slate-400">Agenda Kegiatan</span>
                <p className="font-black text-2xl text-emerald-400">{agendas.length}</p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
                <span className="text-xs text-slate-400">Pengaduan Warga</span>
                <p className="font-black text-2xl text-amber-400">{complaints.length}</p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
                <span className="text-xs text-slate-400">Driver Grab KT Aktif</span>
                <p className="font-black text-2xl text-cyan-400">{drivers.length}</p>
              </div>
            </div>

            {/* Grab KT Pending Applications Review Notice */}
            {driverApps.filter(a => a.status === 'WAITING_VERIFICATION').length > 0 && (
              <div className="p-5 rounded-2xl bg-amber-950/40 border border-amber-500/40 flex items-center justify-between">
                <div className="space-y-1">
                  <span className="text-xs font-bold text-amber-400 uppercase">PERHATIAN ADMIN GRAB KT</span>
                  <p className="text-white text-xs font-semibold">
                    Ada {driverApps.filter(a => a.status === 'WAITING_VERIFICATION').length} calon driver anggota Karang Taruna yang menunggu verifikasi KTP/SIM.
                  </p>
                </div>
                <button
                  onClick={() => setActiveTab('GRAB_KT')}
                  className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs shrink-0"
                >
                  Periksa Sekarang →
                </button>
              </div>
            )}

            {/* Activity Overview */}
            <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
              <h3 className="font-bold text-sm text-white">Statistik Kunjungan & Aktivitas Portal 2026</h3>
              <div className="h-40 rounded-2xl bg-slate-950 border border-slate-800 p-4 flex items-end justify-between space-x-2 text-xs">
                {['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu'].map((m, i) => (
                  <div key={m} className="flex-1 flex flex-col items-center gap-2">
                    <div 
                      className="w-full bg-gradient-to-t from-emerald-600 to-teal-400 rounded-t-md transition-all hover:opacity-80" 
                      style={{ height: `${(i + 3) * 10}%` }}
                    />
                    <span className="text-slate-400 font-semibold">{m}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* TAB 2: BERITA */}
        {activeTab === 'BERITA' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="font-bold text-base text-white">Daftar Berita & Instagram Posts</h2>
              <button
                onClick={() => {
                  const title = prompt('Judul Berita Baru:');
                  if (title) {
                    const newArticle: NewsArticle = {
                      id: 'n-' + Date.now(),
                      title,
                      slug: title.toLowerCase().replace(/\s+/g, '-'),
                      category: 'Kepemudaan',
                      thumbnail: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&auto=format&fit=crop&q=80',
                      date: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }),
                      author: 'Admin CMS',
                      summary: 'Ringkasan berita publik Karang Taruna...',
                      content: 'Isi artikel berita lengkap...',
                      isPublished: true,
                      views: 1
                    };
                    const updated = [newArticle, ...news];
                    DataStore.saveNews(updated);
                    setNews(updated);
                  }
                }}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center space-x-1"
              >
                <Plus className="w-4 h-4" />
                <span>Tambah Berita Baru</span>
              </button>
            </div>

            <div className="space-y-3 text-xs">
              {news.map((item) => (
                <div key={item.id} className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between gap-4">
                  <div className="flex items-center space-x-3">
                    <img src={item.thumbnail} alt={item.title} className="w-12 h-12 rounded-xl object-cover" />
                    <div>
                      <h4 className="font-bold text-white text-sm">{item.title}</h4>
                      <p className="text-slate-400">{item.category} • {item.date} • {item.views} views</p>
                    </div>
                  </div>
                  <button
                    onClick={() => confirmDelete(item.title, () => {
                      const updated = news.filter(n => n.id !== item.id);
                      DataStore.saveNews(updated);
                    })}
                    className="p-2 rounded-lg bg-red-950 border border-red-800 text-red-400 hover:bg-red-900"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: AGENDA */}
        {activeTab === 'AGENDA' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="font-bold text-base text-white">Kelola Agenda Kegiatan</h2>
              <button
                onClick={() => {
                  const title = prompt('Nama Agenda Kegiatan:');
                  if (title) {
                    const newAgenda: AgendaItem = {
                      id: 'ag-' + Date.now(),
                      title,
                      date: new Date().toISOString().slice(0, 10),
                      time: '09:00 - 12:00 WIB',
                      location: 'Kecamatan Cikancung',
                      status: 'AKAN DATANG',
                      description: 'Deskripsi kegiatan baru...',
                      organizer: 'Karang Taruna'
                    };
                    const updated = [newAgenda, ...agendas];
                    DataStore.saveAgendas(updated);
                    setAgendas(updated);
                  }
                }}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center space-x-1"
              >
                <Plus className="w-4 h-4" />
                <span>Tambah Agenda</span>
              </button>
            </div>

            <div className="space-y-3 text-xs">
              {agendas.map((item) => (
                <div key={item.id} className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                  <div>
                    <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 font-bold text-[10px] uppercase">
                      {item.status}
                    </span>
                    <h4 className="font-bold text-white text-sm mt-1">{item.title}</h4>
                    <p className="text-slate-400">{item.date} • {item.time} • {item.location}</p>
                  </div>
                  <button
                    onClick={() => confirmDelete(item.title, () => {
                      const updated = agendas.filter(a => a.id !== item.id);
                      DataStore.saveAgendas(updated);
                    })}
                    className="p-2 rounded-lg bg-red-950 border border-red-800 text-red-400 hover:bg-red-900"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB: GRAB KT VERIFICATION & MANAGEMENT */}
        {activeTab === 'GRAB_KT' && (
          <div className="space-y-8">
            
            {/* Sub Section 1: Calon Driver Pending Verification */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="font-extrabold text-base text-amber-400 flex items-center space-x-2">
                  <UserCheck className="w-5 h-5" />
                  <span>Permohonan Driver Menunggu Verifikasi ({driverApps.filter(a => a.status === 'WAITING_VERIFICATION').length})</span>
                </h2>
              </div>

              {driverApps.filter(a => a.status === 'WAITING_VERIFICATION').length === 0 ? (
                <p className="text-xs text-slate-400 italic p-4 rounded-xl bg-slate-900 border border-slate-800">
                  Tidak ada permohonan driver baru yang menunggu verifikasi saat ini.
                </p>
              ) : (
                <div className="space-y-3 text-xs">
                  {driverApps.filter(a => a.status === 'WAITING_VERIFICATION').map((app) => (
                    <div key={app.id} className="p-5 rounded-2xl bg-slate-900 border border-amber-500/40 space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-extrabold text-white text-sm">{app.applicantName}</h4>
                          <p className="text-slate-400">ID Member: <strong className="text-emerald-400">{app.memberId}</strong> • {app.village}</p>
                        </div>
                        <span className="px-2.5 py-1 rounded bg-amber-950 text-amber-300 font-bold text-[10px]">
                          WAITING_VERIFICATION
                        </span>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] text-slate-300 p-3 rounded-xl bg-slate-950">
                        <div>NIK KTP: {app.ktpNumber}</div>
                        <div>SIM: {app.simNumber}</div>
                        <div>Jenis: {app.vehicleType}</div>
                        <div>Plat: <strong className="text-amber-400">{app.plateNumber}</strong></div>
                      </div>

                      <div className="flex items-center justify-end space-x-3 pt-2">
                        <button
                          onClick={() => handleVerifyDriver(app.id, false)}
                          className="px-4 py-2 rounded-xl bg-red-950 border border-red-800 text-red-400 hover:bg-red-900 font-bold text-xs flex items-center space-x-1"
                        >
                          <XCircle className="w-4 h-4" />
                          <span>Tolak Driver</span>
                        </button>

                        <button
                          onClick={() => handleVerifyDriver(app.id, true)}
                          className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs flex items-center space-x-1 shadow-lg"
                        >
                          <CheckCircle2 className="w-4 h-4" />
                          <span>Setujui & Aktifkan Driver</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Sub Section 2: Active Drivers List */}
            <div className="space-y-4">
              <h2 className="font-bold text-base text-white">Daftar Driver Aktif ({drivers.length})</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
                {drivers.map((drv) => (
                  <div key={drv.id} className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-white">{drv.name}</h4>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        drv.isOnline ? 'bg-emerald-950 text-emerald-400' : 'bg-slate-800 text-slate-400'
                      }`}>
                        {drv.isOnline ? 'ONLINE' : 'OFFLINE'}
                      </span>
                    </div>
                    <p className="text-slate-400">{drv.vehicleBrand} • Plat: <strong className="text-amber-400">{drv.plateNumber}</strong></p>
                    <div className="flex items-center justify-between text-[11px] pt-1">
                      <span>Rating: ⭐ {drv.rating}</span>
                      <span>Total: {drv.totalTrips} Trip</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Sub Section 3: Tariff Config Form */}
            <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
              <h3 className="font-bold text-sm text-white">Pengaturan Tarif Grab KT</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                <div>
                  <label className="text-slate-300 font-semibold">Tarif Dasar (Rp)</label>
                  <input
                    type="number"
                    value={tariff.baseFare}
                    onChange={(e) => setTariff({ ...tariff, baseFare: Number(e.target.value) })}
                    className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white mt-1"
                  />
                </div>

                <div>
                  <label className="text-slate-300 font-semibold">Tarif Per KM (Rp)</label>
                  <input
                    type="number"
                    value={tariff.pricePerKm}
                    onChange={(e) => setTariff({ ...tariff, pricePerKm: Number(e.target.value) })}
                    className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white mt-1"
                  />
                </div>

                <div>
                  <label className="text-slate-300 font-semibold">Biaya Layanan Pemuda (Rp)</label>
                  <input
                    type="number"
                    value={tariff.serviceFee}
                    onChange={(e) => setTariff({ ...tariff, serviceFee: Number(e.target.value) })}
                    className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white mt-1"
                  />
                </div>
              </div>

              <button
                onClick={() => {
                  DataStore.saveTariff(tariff);
                  alert('Tarif Grab KT Berhasil Diperbarui!');
                }}
                className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs shadow-md"
              >
                Simpan Konfigurasi Tarif
              </button>
            </div>

          </div>
        )}

        {/* TAB 8: PESAN / COMPLAINTS */}
        {activeTab === 'PESAN' && (
          <div className="space-y-4">
            <h2 className="font-bold text-base text-white">Daftar Pengaduan Masuk Dari Warga ({complaints.length})</h2>
            <div className="space-y-3 text-xs">
              {complaints.map((c) => (
                <div key={c.id} className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-emerald-400">{c.ticketNumber}</span>
                    <span className="text-slate-500">{c.createdAt}</span>
                  </div>
                  <p className="text-white font-bold">{c.name} ({c.whatsapp}) • Kategori: {c.category}</p>
                  <p className="text-slate-300 bg-slate-950 p-3 rounded-xl border border-slate-800">{c.content}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 9: PENGATURAN MEDSOS */}
        {activeTab === 'PENGATURAN' && (
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4 max-w-2xl text-xs">
            <h3 className="font-bold text-sm text-white">Pengaturan Medsos & Integrasi Instagram</h3>
            <div className="space-y-3">
              <div>
                <label className="font-semibold text-slate-300">Username Instagram</label>
                <input
                  type="text"
                  value={settings.instagramUsername}
                  onChange={(e) => setSettings({ ...settings, instagramUsername: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white mt-1"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-300">Instagram Profile URL</label>
                <input
                  type="text"
                  value={settings.instagramUrl}
                  onChange={(e) => setSettings({ ...settings, instagramUrl: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white mt-1"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-300">WhatsApp Hotline Number</label>
                <input
                  type="text"
                  value={settings.whatsappNumber}
                  onChange={(e) => setSettings({ ...settings, whatsappNumber: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white mt-1"
                />
              </div>

              <button
                onClick={() => {
                  DataStore.saveSettings(settings);
                  alert('Pengaturan Sosial Media Berhasil Disimpan!');
                }}
                className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs shadow-md"
              >
                Simpan Pengaturan
              </button>
            </div>
          </div>
        )}

      </section>
    </main>
  );
}
