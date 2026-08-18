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
  FileText,
  Upload,
  User,
  ArrowUp,
  ArrowDown,
  Eye,
  X,
  Phone,
  Link as LinkIcon,
  ExternalLink,
  Check,
  Filter,
  Sparkles,
  Layers,
  Clock,
  MapPin,
  Tag,
  Wand2,
  Loader2
} from 'lucide-react';
import { InstagramIcon } from '@/components/Icons';
import { 
  DataStore, 
  NewsArticle, 
  AgendaItem, 
  AnnouncementItem, 
  GalleryItem, 
  OrgMember, 
  OrgCategory,
  ComplaintRecord, 
  GrabDriverApplication, 
  GrabDriver, 
  GrabOrder, 
  GrabTariff, 
  SiteSettings,
  InstagramPost
} from '@/lib/data-store';

export default function AdminDashboardPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<
    'DASHBOARD' | 'BERITA' | 'AGENDA' | 'PENGUMUMAN' | 'GALERI' | 'ORGANISASI' | 'PROFIL' | 'PESAN' | 'GRAB_KT' | 'PENGATURAN'
  >('DASHBOARD');

  // CMS Data States
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [igPosts, setIgPosts] = useState<InstagramPost[]>([]);
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

  // Sub-tabs
  const [beritaSubTab, setBeritaSubTab] = useState<'INSTAGRAM' | 'BERITA'>('INSTAGRAM');
  const [orgSubTab, setOrgSubTab] = useState<'TABEL' | 'PREVIEW'>('TABEL');
  const [complaintFilter, setComplaintFilter] = useState<'SEMUA' | 'PENDING' | 'DIPROSES' | 'SELESAI'>('SEMUA');

  // ---------------- TOAST & LOADING STATE ----------------
  const [toast, setToast] = useState<{
    show: boolean;
    type: 'loading' | 'success' | 'error';
    title: string;
    message?: string;
  }>({
    show: false,
    type: 'success',
    title: '',
    message: ''
  });

  const triggerToast = (title: string, message?: string, onComplete?: () => void) => {
    setToast({
      show: true,
      type: 'loading',
      title: 'Memproses Pembaharuan...',
      message: 'Sedang menyimpan data ke database...'
    });

    setTimeout(() => {
      setToast({
        show: true,
        type: 'success',
        title,
        message
      });
      if (onComplete) onComplete();

      setTimeout(() => {
        setToast(prev => ({ ...prev, show: false }));
      }, 2500);
    }, 600);
  };

  // ---------------- MODAL STATES ----------------
  // 1. Instagram Modal State
  const [showIgModal, setShowIgModal] = useState(false);
  const [editingIg, setEditingIg] = useState<InstagramPost | null>(null);
  const [isIgFetching, setIsIgFetching] = useState(false);
  const [igForm, setIgForm] = useState({
    instagramUrl: '',
    thumbnail: '',
    caption: '',
    date: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }),
    likes: 340,
    comments: 28,
    category: 'Kepemudaan'
  });

  // 2. Berita Modal State
  const [showNewsModal, setShowNewsModal] = useState(false);
  const [editingNews, setEditingNews] = useState<NewsArticle | null>(null);
  const [newsForm, setNewsForm] = useState({
    title: '',
    category: 'Kepemudaan',
    thumbnail: '',
    summary: '',
    content: '',
    instagramLink: '',
    isPublished: true
  });

  // 3. Agenda Modal State
  const [showAgendaModal, setShowAgendaModal] = useState(false);
  const [editingAgenda, setEditingAgenda] = useState<AgendaItem | null>(null);
  const [agendaForm, setAgendaForm] = useState<{
    title: string;
    date: string;
    time: string;
    location: string;
    status: 'AKAN DATANG' | 'BERLANGSUNG' | 'SELESAI';
    description: string;
    organizer: string;
  }>({
    title: '',
    date: new Date().toISOString().slice(0, 10),
    time: '09:00 - 12:00 WIB',
    location: 'Kecamatan Cikancung',
    status: 'AKAN DATANG',
    description: '',
    organizer: 'Karang Taruna Kecamatan'
  });

  // 4. Announcement Modal State
  const [showAncModal, setShowAncModal] = useState(false);
  const [editingAnc, setEditingAnc] = useState<AnnouncementItem | null>(null);
  const [ancForm, setAncForm] = useState({
    title: '',
    category: 'Edaran Resmi',
    isImportant: false,
    content: '',
    attachmentName: ''
  });

  // 5. Gallery Modal State
  const [showGalModal, setShowGalModal] = useState(false);
  const [editingGal, setEditingGal] = useState<GalleryItem | null>(null);
  const [galForm, setGalForm] = useState<{
    title: string;
    category: 'Kegiatan Sosial' | 'Olahraga' | 'Kepemudaan' | 'PHBN' | 'UMKM' | 'Kegiatan Kecamatan';
    image: string;
    date: string;
    description: string;
  }>({
    title: '',
    category: 'Kepemudaan',
    image: '',
    date: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }),
    description: ''
  });

  // 6. Member Modal State
  const [showMemberModal, setShowMemberModal] = useState(false);
  const [editingMember, setEditingMember] = useState<OrgMember | null>(null);
  const [memberForm, setMemberForm] = useState<{
    name: string;
    role: string;
    category: OrgCategory;
    division: string;
    isLeader: boolean;
    photo: string;
    showPhoto: boolean;
    bio: string;
    whatsapp: string;
    instagram: string;
    sortOrder: number;
    status: 'ACTIVE' | 'INACTIVE';
  }>({
    name: '',
    role: '',
    category: 'PENGURUS_HARIAN',
    division: '',
    isLeader: false,
    photo: '',
    showPhoto: true,
    bio: '',
    whatsapp: '',
    instagram: '',
    sortOrder: 10,
    status: 'ACTIVE'
  });

  useEffect(() => {
    refreshData();
  }, []);

  const refreshData = () => {
    setNews(DataStore.getNews());
    setIgPosts(DataStore.getInstagramPosts());
    setAgendas(DataStore.getAgendas());
    setAnnouncements(DataStore.getAnnouncements());
    setGallery(DataStore.getGallery());
    
    const mList = DataStore.getMembers();
    mList.sort((a, b) => a.sortOrder - b.sortOrder);
    setMembers(mList);

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

  const confirmDelete = (itemTitle: string, onDelete: () => void) => {
    if (window.confirm(`Apakah Anda yakin ingin menghapus data "${itemTitle}"?`)) {
      onDelete();
      refreshData();
    }
  };

  // ------------ FETCH EXACT INSTAGRAM THUMBNAIL & CAPTION FROM PASTED LINK ------------
  const autoFetchInstagramPostData = async (url: string) => {
    if (!url || !url.includes('instagram.com')) return;

    setIsIgFetching(true);
    try {
      const res = await fetch(`/api/instagram-oembed?url=${encodeURIComponent(url)}`);
      if (res.ok) {
        const data = await res.json();
        if (data.success) {
          setIgForm(prev => ({
            ...prev,
            instagramUrl: url,
            thumbnail: data.thumbnail, // EXACT THUMBNAIL FROM PASTED INSTAGRAM LINK
            caption: data.caption || prev.caption,
            category: data.category || prev.category,
            date: data.date || prev.date,
            likes: Math.floor(250 + Math.random() * 300),
            comments: Math.floor(18 + Math.random() * 40)
          }));
        }
      }
    } catch (e) {
      console.error('Failed to fetch Instagram oEmbed:', e);
    } finally {
      setIsIgFetching(false);
    }
  };

  const openAddIgModal = () => {
    setEditingIg(null);
    setIgForm({
      instagramUrl: '',
      thumbnail: '',
      caption: '',
      date: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }),
      likes: Math.floor(150 + Math.random() * 300),
      comments: Math.floor(10 + Math.random() * 40),
      category: 'Kepemudaan'
    });
    setShowIgModal(true);
  };

  const openEditIgModal = (item: InstagramPost) => {
    setEditingIg(item);
    setIgForm({
      instagramUrl: item.instagramUrl,
      thumbnail: item.thumbnail,
      caption: item.caption,
      date: item.date,
      likes: item.likes,
      comments: item.comments,
      category: item.category
    });
    setShowIgModal(true);
  };

  const handleSaveIg = (e: React.FormEvent) => {
    e.preventDefault();
    if (!igForm.instagramUrl) {
      alert('Link Instagram Post wajib diisi.');
      return;
    }

    const finalForm = {
      ...igForm,
      thumbnail: igForm.thumbnail || 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&auto=format&fit=crop&q=80',
      caption: igForm.caption || 'Dokumentasi kegiatan resmi Karang Taruna Kecamatan Cikancung. #KarangTarunaCikancung'
    };

    if (editingIg) {
      DataStore.updateInstagramPost(editingIg.id, finalForm);
    } else {
      DataStore.addInstagramPost(finalForm);
    }
    refreshData();
    setShowIgModal(false);
  };

  // ------------ HANDLERS FOR NEWS ------------
  const openAddNewsModal = () => {
    setEditingNews(null);
    setNewsForm({
      title: '',
      category: 'Kepemudaan',
      thumbnail: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=800&auto=format&fit=crop&q=80',
      summary: '',
      content: '',
      instagramLink: '',
      isPublished: true
    });
    setShowNewsModal(true);
  };

  const openEditNewsModal = (n: NewsArticle) => {
    setEditingNews(n);
    setNewsForm({
      title: n.title,
      category: n.category,
      thumbnail: n.thumbnail,
      summary: n.summary,
      content: n.content,
      instagramLink: n.instagramLink || '',
      isPublished: n.isPublished
    });
    setShowNewsModal(true);
  };

  const handleSaveNews = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsForm.title || !newsForm.summary) {
      alert('Judul dan Ringkasan Berita wajib diisi.');
      return;
    }
    const slug = newsForm.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    const payload = {
      ...newsForm,
      slug,
      date: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }),
      author: 'Admin CMS'
    };
    if (editingNews) {
      DataStore.updateNews(editingNews.id, payload);
    } else {
      DataStore.addNews(payload);
    }
    refreshData();
    setShowNewsModal(false);
  };

  // ------------ HANDLERS FOR AGENDAS ------------
  const openAddAgendaModal = () => {
    setEditingAgenda(null);
    setAgendaForm({
      title: '',
      date: new Date().toISOString().slice(0, 10),
      time: '09:00 - 12:00 WIB',
      location: 'Kecamatan Cikancung',
      status: 'AKAN DATANG',
      description: '',
      organizer: 'Karang Taruna Kecamatan'
    });
    setShowAgendaModal(true);
  };

  const openEditAgendaModal = (a: AgendaItem) => {
    setEditingAgenda(a);
    setAgendaForm({
      title: a.title,
      date: a.date,
      time: a.time,
      location: a.location,
      status: a.status,
      description: a.description,
      organizer: a.organizer
    });
    setShowAgendaModal(true);
  };

  const handleSaveAgenda = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agendaForm.title || !agendaForm.date) {
      alert('Nama Agenda dan Tanggal wajib diisi.');
      return;
    }
    if (editingAgenda) {
      DataStore.updateAgenda(editingAgenda.id, agendaForm);
    } else {
      DataStore.addAgenda(agendaForm);
    }
    refreshData();
    setShowAgendaModal(false);
  };

  // ------------ HANDLERS FOR ANNOUNCEMENTS ------------
  const openAddAncModal = () => {
    setEditingAnc(null);
    setAncForm({
      title: '',
      category: 'Edaran Resmi',
      isImportant: false,
      content: '',
      attachmentName: ''
    });
    setShowAncModal(true);
  };

  const openEditAncModal = (a: AnnouncementItem) => {
    setEditingAnc(a);
    setAncForm({
      title: a.title,
      category: a.category,
      isImportant: a.isImportant,
      content: a.content,
      attachmentName: a.attachmentName || ''
    });
    setShowAncModal(true);
  };

  const handleSaveAnc = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ancForm.title || !ancForm.content) {
      alert('Judul dan Isi Pengumuman wajib diisi.');
      return;
    }
    const payload = {
      ...ancForm,
      date: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })
    };
    if (editingAnc) {
      DataStore.updateAnnouncement(editingAnc.id, payload);
    } else {
      DataStore.addAnnouncement(payload);
    }
    refreshData();
    setShowAncModal(false);
  };

  // ------------ HANDLERS FOR GALLERY ------------
  const openAddGalModal = () => {
    setEditingGal(null);
    setGalForm({
      title: '',
      category: 'Kepemudaan',
      image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&auto=format&fit=crop&q=80',
      date: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }),
      description: ''
    });
    setShowGalModal(true);
  };

  const openEditGalModal = (g: GalleryItem) => {
    setEditingGal(g);
    setGalForm({
      title: g.title,
      category: g.category,
      image: g.image,
      date: g.date,
      description: g.description
    });
    setShowGalModal(true);
  };

  const handleSaveGal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!galForm.title || !galForm.image) {
      alert('Judul Foto dan Gambar wajib diisi.');
      return;
    }
    if (editingGal) {
      DataStore.updateGallery(editingGal.id, galForm);
    } else {
      DataStore.addGallery(galForm);
    }
    refreshData();
    setShowGalModal(false);
  };

  // ------------ HANDLERS FOR MEMBERS ------------
  const openAddMemberModal = () => {
    setEditingMember(null);
    setMemberForm({
      name: '',
      role: '',
      category: 'PENGURUS_HARIAN',
      division: '',
      isLeader: false,
      photo: '',
      showPhoto: true,
      bio: '',
      whatsapp: '',
      instagram: '',
      sortOrder: members.length + 1,
      status: 'ACTIVE'
    });
    setShowMemberModal(true);
  };

  const openEditMemberModal = (m: OrgMember) => {
    setEditingMember(m);
    setMemberForm({
      name: m.name,
      role: m.role,
      category: m.category,
      division: m.division || '',
      isLeader: !!m.isLeader,
      photo: m.photo || '',
      showPhoto: m.showPhoto !== false,
      bio: m.bio || '',
      whatsapp: m.whatsapp || '',
      instagram: m.instagram || '',
      sortOrder: m.sortOrder,
      status: m.status
    });
    setShowMemberModal(true);
  };

  const handleSaveMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!memberForm.name || !memberForm.role) {
      alert('Nama dan Jabatan wajib diisi.');
      return;
    }
    if (editingMember) {
      DataStore.updateMember(editingMember.id, memberForm);
    } else {
      DataStore.addMember(memberForm);
    }
    refreshData();
    setShowMemberModal(false);
  };

  const handleMemberImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('Ukuran berkas maksimal 5 MB.');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setMemberForm({ ...memberForm, photo: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('Ukuran logo maksimal 5 MB.');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setSettings({ ...settings, logoUrl: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGenericFileUpload = (e: React.ChangeEvent<HTMLInputElement>, onResult: (res: string) => void) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('Ukuran berkas maksimal 5 MB.');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        onResult(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleMoveOrder = (m: OrgMember, direction: 'UP' | 'DOWN') => {
    const currentIdx = members.findIndex(item => item.id === m.id);
    if (currentIdx === -1) return;
    const targetIdx = direction === 'UP' ? currentIdx - 1 : currentIdx + 1;
    if (targetIdx < 0 || targetIdx >= members.length) return;

    const newMembers = [...members];
    const tempOrder = newMembers[currentIdx].sortOrder;
    newMembers[currentIdx].sortOrder = newMembers[targetIdx].sortOrder;
    newMembers[targetIdx].sortOrder = tempOrder;

    DataStore.saveMembers(newMembers);
    refreshData();
  };

  const handleVerifyDriver = (appId: string, approve: boolean) => {
    const reason = approve ? undefined : prompt('Masukkan alasan penolakan application driver:');
    if (!approve && reason === null) return;
    
    DataStore.verifyDriverApplication(appId, approve, reason || undefined);
    refreshData();
    alert(approve ? 'Driver Berhasil Disetujui dan Diaktifkan!' : 'Permohonan driver ditolak.');
  };

  const filteredComplaints = complaints.filter(c => complaintFilter === 'SEMUA' || c.status === complaintFilter);

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 flex flex-col md:flex-row">
      
      {/* SIDEBAR NAVIGATION */}
      <aside className="w-full md:w-64 bg-slate-900 border-r border-slate-800 p-4 shrink-0 space-y-6">
        
        <div className="flex items-center space-x-3 px-2">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center text-slate-950 shadow-md overflow-hidden shrink-0">
            {settings.logoUrl ? (
              <img src={settings.logoUrl} alt="Logo" className="w-full h-full object-cover" />
            ) : (
              <Shield className="w-5 h-5 fill-slate-950" />
            )}
          </div>
          <div>
            <h2 className="font-extrabold text-sm text-white leading-tight">CMS KARANG TARUNA</h2>
            <p className="text-[10px] text-emerald-400 font-semibold tracking-wider uppercase">Kec. Cikancung</p>
          </div>
        </div>

        <nav className="space-y-1 text-xs">
          {[
            { id: 'DASHBOARD', name: 'Dashboard CMS', icon: LayoutDashboard },
            { id: 'BERITA', name: 'Berita & Instagram', icon: Newspaper, count: news.length + igPosts.length, highlight: true },
            { id: 'AGENDA', name: 'Agenda Kegiatan', icon: Calendar, count: agendas.length },
            { id: 'PENGUMUMAN', name: 'Pengumuman', icon: Bell, count: announcements.length },
            { id: 'GALERI', name: 'Galeri Foto', icon: Camera, count: gallery.length },
            { id: 'ORGANISASI', name: 'Struktur Pengurus', icon: Users, count: members.length },
            { id: 'PROFIL', name: 'Profil & Visi Misi', icon: FileText },
            { id: 'PESAN', name: 'Pengaduan Warga', icon: MessageSquare, count: complaints.length },
            { id: 'GRAB_KT', name: 'Grab KT (Driver & Order)', icon: Car, count: driverApps.filter(a => a.status === 'WAITING_VERIFICATION').length },
            { id: 'PENGATURAN', name: 'Pengaturan Medsos & Logo', icon: Settings }
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
                    ? 'bg-emerald-950/40 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-900/60'
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

        {/* 1. TAB DASHBOARD OVERVIEW */}
        {activeTab === 'DASHBOARD' && (
          <div className="space-y-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
                <span className="text-xs text-slate-400">Total Pengurus</span>
                <p className="font-black text-2xl text-emerald-400">{members.length}</p>
              </div>
              <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
                <span className="text-xs text-slate-400">Total Berita & IG</span>
                <p className="font-black text-2xl text-white">{news.length + igPosts.length}</p>
              </div>
              <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
                <span className="text-xs text-slate-400">Agenda Kegiatan</span>
                <p className="font-black text-2xl text-amber-400">{agendas.length}</p>
              </div>
              <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
                <span className="text-xs text-slate-400">Driver Grab KT</span>
                <p className="font-black text-2xl text-cyan-400">{drivers.length}</p>
              </div>
            </div>

            {/* Quick Action Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <button
                onClick={() => setActiveTab('BERITA')}
                className="p-5 rounded-2xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-left space-y-2 group"
              >
                <div className="w-9 h-9 rounded-xl bg-pink-950 text-pink-400 flex items-center justify-center font-bold">
                  <InstagramIcon className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-white text-sm group-hover:text-pink-400">Paste Link Instagram & Auto-Fetch Foto</h4>
                <p className="text-slate-400">Paste URL postingan Instagram & foto persis dari postingan tersebut otomatis terpasang.</p>
              </button>

              <button
                onClick={() => setActiveTab('ORGANISASI')}
                className="p-5 rounded-2xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-left space-y-2 group"
              >
                <div className="w-9 h-9 rounded-xl bg-emerald-950 text-emerald-400 flex items-center justify-center font-bold">
                  <Users className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-white text-sm group-hover:text-emerald-400">Kelola Struktur Pengurus</h4>
                <p className="text-slate-400">Tambah pengurus, upload foto, ubah jabatan & atur urutan bagan.</p>
              </button>

              <button
                onClick={() => setActiveTab('GRAB_KT')}
                className="p-5 rounded-2xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-left space-y-2 group"
              >
                <div className="w-9 h-9 rounded-xl bg-cyan-950 text-cyan-400 flex items-center justify-center font-bold">
                  <Car className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-white text-sm group-hover:text-cyan-400">Verifikasi Driver Grab KT</h4>
                <p className="text-slate-400">Setujui/Tolak pendaftaran calon driver anggota Karang Taruna.</p>
              </button>
            </div>
          </div>
        )}

        {/* 2. TAB BERITA & INSTAGRAM */}
        {activeTab === 'BERITA' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-slate-900 border border-slate-800">
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setBeritaSubTab('INSTAGRAM')}
                  className={`px-4 py-2 rounded-xl text-xs font-extrabold flex items-center space-x-1.5 transition-all ${
                    beritaSubTab === 'INSTAGRAM'
                      ? 'bg-pink-600 text-white shadow-md'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <InstagramIcon className="w-4 h-4" />
                  <span>Feed Instagram ({igPosts.length})</span>
                </button>

                <button
                  onClick={() => setBeritaSubTab('BERITA')}
                  className={`px-4 py-2 rounded-xl text-xs font-extrabold flex items-center space-x-1.5 transition-all ${
                    beritaSubTab === 'BERITA'
                      ? 'bg-emerald-600 text-white shadow-md'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Newspaper className="w-4 h-4" />
                  <span>Artikel Berita Publik ({news.length})</span>
                </button>
              </div>

              <button
                onClick={beritaSubTab === 'INSTAGRAM' ? openAddIgModal : openAddNewsModal}
                className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 text-white font-extrabold text-xs flex items-center space-x-1.5 shadow-lg"
              >
                <Plus className="w-4 h-4" />
                <span>{beritaSubTab === 'INSTAGRAM' ? '+ Paste Link Instagram' : '+ Tambah Artikel Berita'}</span>
              </button>
            </div>

            {beritaSubTab === 'INSTAGRAM' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                {igPosts.map((post) => (
                  <div key={post.id} className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-3 flex flex-col justify-between">
                    <div className="flex items-start space-x-3">
                      <img src={post.thumbnail} alt="IG" className="w-16 h-16 rounded-xl object-cover shrink-0" />
                      <div className="space-y-1 overflow-hidden">
                        <div className="flex items-center space-x-2">
                          <span className="px-2 py-0.5 rounded bg-pink-950 border border-pink-700 text-pink-300 font-bold text-[10px]">
                            {post.category}
                          </span>
                          <span className="text-[10px] text-slate-400">{post.date}</span>
                        </div>
                        <p className="text-white text-xs line-clamp-2 italic">"{post.caption}"</p>
                        <a href={post.instagramUrl} target="_blank" rel="noreferrer" className="text-pink-400 font-bold text-[11px] truncate flex items-center space-x-1">
                          <InstagramIcon className="w-3 h-3" />
                          <span className="truncate">{post.instagramUrl}</span>
                        </a>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-slate-800/80">
                      <span className="text-slate-400 text-[10px]">❤️ {post.likes} Likes • 💬 {post.comments} Komen</span>
                      <div className="flex items-center space-x-2">
                        <button onClick={() => openEditIgModal(post)} className="p-1.5 rounded-lg bg-slate-800 text-slate-200"><Edit className="w-3.5 h-3.5" /></button>
                        <button onClick={() => confirmDelete('Post Instagram', () => DataStore.deleteInstagramPost(post.id))} className="p-1.5 rounded-lg bg-red-950 text-red-400"><Trash2 className="w-3.5 h-3.5" /></button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-3 text-xs">
                {news.map((item) => (
                  <div key={item.id} className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between gap-4">
                    <div className="flex items-center space-x-3">
                      <img src={item.thumbnail} alt={item.title} className="w-14 h-14 rounded-xl object-cover shrink-0" />
                      <div>
                        <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 font-bold text-[10px] uppercase">{item.category}</span>
                        <h4 className="font-bold text-white text-sm mt-0.5">{item.title}</h4>
                        <p className="text-slate-400 text-[11px]">{item.date} • {item.views} views {item.instagramLink && '• 🔗 Ada Link IG'}</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2 shrink-0">
                      <button onClick={() => openEditNewsModal(item)} className="p-2 rounded-lg bg-slate-800 text-slate-200"><Edit className="w-4 h-4" /></button>
                      <button onClick={() => confirmDelete(item.title, () => DataStore.deleteNews(item.id))} className="p-2 rounded-lg bg-red-950 text-red-400"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* 3. TAB AGENDA KEGIATAN */}
        {activeTab === 'AGENDA' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-900 border border-slate-800">
              <h2 className="font-bold text-base text-white">Kelola Agenda Kegiatan ({agendas.length})</h2>
              <button
                onClick={openAddAgendaModal}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center space-x-1"
              >
                <Plus className="w-4 h-4" />
                <span>+ Tambah Agenda Baru</span>
              </button>
            </div>

            <div className="space-y-3 text-xs">
              {agendas.map((item) => (
                <div key={item.id} className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between gap-4">
                  <div className="space-y-1">
                    <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 font-bold text-[10px] uppercase">
                      {item.status}
                    </span>
                    <h4 className="font-bold text-white text-sm">{item.title}</h4>
                    <p className="text-slate-400">{item.date} • {item.time} • 📍 {item.location}</p>
                  </div>
                  <div className="flex items-center space-x-2 shrink-0">
                    <button onClick={() => openEditAgendaModal(item)} className="p-2 rounded-lg bg-slate-800 text-slate-200"><Edit className="w-4 h-4" /></button>
                    <button onClick={() => confirmDelete(item.title, () => DataStore.deleteAgenda(item.id))} className="p-2 rounded-lg bg-red-950 text-red-400"><Trash2 className="w-4 h-4" /></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 4. TAB PENGUMUMAN */}
        {activeTab === 'PENGUMUMAN' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-900 border border-slate-800">
              <h2 className="font-bold text-base text-white">Kelola Pengumuman Board ({announcements.length})</h2>
              <button
                onClick={openAddAncModal}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center space-x-1"
              >
                <Plus className="w-4 h-4" />
                <span>+ Tambah Pengumuman Baru</span>
              </button>
            </div>

            <div className="space-y-3 text-xs">
              {announcements.map((item) => (
                <div key={item.id} className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      {item.isImportant && <span className="px-2 py-0.5 rounded bg-red-950 text-red-400 font-bold text-[10px] uppercase animate-pulse">PENTING</span>}
                      <span className="text-slate-400 text-[10px]">{item.date} • {item.category}</span>
                    </div>
                    <h4 className="font-bold text-white text-sm">{item.title}</h4>
                    <p className="text-slate-300 line-clamp-1">{item.content}</p>
                  </div>
                  <div className="flex items-center space-x-2 shrink-0">
                    <button onClick={() => openEditAncModal(item)} className="p-2 rounded-lg bg-slate-800 text-slate-200"><Edit className="w-4 h-4" /></button>
                    <button onClick={() => confirmDelete(item.title, () => DataStore.deleteAnnouncement(item.id))} className="p-2 rounded-lg bg-red-950 text-red-400"><Trash2 className="w-4 h-4" /></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 5. TAB GALERI FOTO */}
        {activeTab === 'GALERI' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-900 border border-slate-800">
              <h2 className="font-bold text-base text-white">Kelola Galeri Foto ({gallery.length})</h2>
              <button
                onClick={openAddGalModal}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center space-x-1"
              >
                <Plus className="w-4 h-4" />
                <span>+ Tambah Foto Galeri Baru</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-xs">
              {gallery.map((g) => (
                <div key={g.id} className="p-3 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                  <img src={g.image} alt={g.title} className="w-full h-36 rounded-xl object-cover" />
                  <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 font-bold text-[10px]">{g.category}</span>
                  <h4 className="font-bold text-white line-clamp-1">{g.title}</h4>
                  <div className="flex items-center justify-between pt-1 border-t border-slate-800">
                    <span className="text-[10px] text-slate-500">{g.date}</span>
                    <div className="flex items-center space-x-1">
                      <button onClick={() => openEditGalModal(g)} className="p-1.5 rounded-lg bg-slate-800 text-slate-200"><Edit className="w-3.5 h-3.5" /></button>
                      <button onClick={() => confirmDelete(g.title, () => DataStore.deleteGallery(g.id))} className="p-1.5 rounded-lg bg-red-950 text-red-400"><Trash2 className="w-3.5 h-3.5" /></button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 6. TAB STRUKTUR PENGURUS */}
        {activeTab === 'ORGANISASI' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-slate-900 border border-slate-800">
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setOrgSubTab('TABEL')}
                  className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all ${
                    orgSubTab === 'TABEL'
                      ? 'bg-emerald-600 text-white shadow-md'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Daftar Tabel Pengurus ({members.length})
                </button>

                <button
                  onClick={() => setOrgSubTab('PREVIEW')}
                  className={`px-4 py-2 rounded-xl text-xs font-extrabold flex items-center space-x-1.5 transition-all ${
                    orgSubTab === 'PREVIEW'
                      ? 'bg-amber-500 text-slate-950 shadow-md'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Preview Struktur Organisasi</span>
                </button>
              </div>

              <button
                onClick={openAddMemberModal}
                className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 text-white font-extrabold text-xs flex items-center space-x-1.5 shadow-lg"
              >
                <Plus className="w-4 h-4" />
                <span>+ Tambah Pengurus Baru</span>
              </button>
            </div>

            {orgSubTab === 'TABEL' ? (
              <div className="space-y-3">
                <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900">
                  <table className="w-full text-left text-xs text-slate-300">
                    <thead className="bg-slate-950 text-slate-400 font-bold uppercase text-[10px] tracking-wider border-b border-slate-800">
                      <tr>
                        <th className="py-3 px-4">Urutan</th>
                        <th className="py-3 px-4">Foto</th>
                        <th className="py-3 px-4">Nama Lengkap</th>
                        <th className="py-3 px-4">Jabatan</th>
                        <th className="py-3 px-4">Kategori / Bidang</th>
                        <th className="py-3 px-4">Status</th>
                        <th className="py-3 px-4 text-right">Aksi</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60">
                      {members.map((m) => (
                        <tr key={m.id} className="hover:bg-slate-950/50 transition-colors">
                          <td className="py-3 px-4 font-mono font-bold text-emerald-400">
                            <div className="flex items-center space-x-1">
                              <span>#{m.sortOrder}</span>
                              <div className="flex flex-col">
                                <button onClick={() => handleMoveOrder(m, 'UP')} className="hover:text-white"><ArrowUp className="w-3 h-3" /></button>
                                <button onClick={() => handleMoveOrder(m, 'DOWN')} className="hover:text-white"><ArrowDown className="w-3 h-3" /></button>
                              </div>
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <div className="w-9 h-9 rounded-full overflow-hidden bg-slate-950 border border-slate-800 flex items-center justify-center">
                              {m.photo && m.showPhoto !== false ? (
                                <img src={m.photo} alt={m.name} className="w-full h-full object-cover" />
                              ) : (
                                <User className="w-4 h-4 text-slate-500" />
                              )}
                            </div>
                          </td>
                          <td className="py-3 px-4 font-bold text-white">
                            {m.name}
                            {m.isLeader && <span className="ml-1.5 px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 text-[9px] font-black uppercase">Ketua</span>}
                          </td>
                          <td className="py-3 px-4 text-emerald-300 font-semibold">{m.role}</td>
                          <td className="py-3 px-4">
                            <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-bold text-[10px]">
                              {m.category.replace(/_/g, ' ')}
                            </span>
                            {m.division && <p className="text-[10px] text-slate-400 mt-0.5">{m.division}</p>}
                          </td>
                          <td className="py-3 px-4">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-black ${
                              m.status === 'ACTIVE' ? 'bg-emerald-950 text-emerald-400 border border-emerald-700' : 'bg-slate-800 text-slate-500'
                            }`}>
                              {m.status}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-right">
                            <div className="flex items-center justify-end space-x-2">
                              <button onClick={() => openEditMemberModal(m)} className="p-1.5 rounded-lg bg-slate-800 text-slate-200"><Edit className="w-3.5 h-3.5" /></button>
                              <button onClick={() => confirmDelete(m.name, () => DataStore.deleteMember(m.id))} className="p-1.5 rounded-lg bg-red-950 text-red-400"><Trash2 className="w-3.5 h-3.5" /></button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <div className="p-6 rounded-3xl bg-slate-950 border border-amber-500/30 space-y-6">
                <div className="text-center space-y-1">
                  <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">LIVE PREVIEW MODUL PUBLIK</span>
                  <h3 className="text-xl font-black text-white">Bagan Struktur Organisasi Karang Taruna Cikancung</h3>
                </div>

                <div className="space-y-8">
                  {['PEMBINA_PENASIHAT', 'MPKT', 'PENGURUS_HARIAN', 'BIDANG'].map((cat) => {
                    const catMembers = members.filter(m => m.category === cat && m.status === 'ACTIVE');
                    if (catMembers.length === 0) return null;
                    return (
                      <div key={cat} className="space-y-3 p-4 rounded-2xl bg-slate-900 border border-slate-800">
                        <h4 className="font-extrabold text-sm text-emerald-400 border-b border-slate-800 pb-2">
                          {cat.replace(/_/g, ' ')} ({catMembers.length})
                        </h4>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                          {catMembers.map((m) => (
                            <div key={m.id} className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center space-x-2.5">
                              <div className="w-8 h-8 rounded-full overflow-hidden bg-slate-900 shrink-0">
                                {m.photo && m.showPhoto !== false ? (
                                  <img src={m.photo} alt={m.name} className="w-full h-full object-cover" />
                                ) : <User className="w-4 h-4 text-slate-500 mx-auto mt-2" />}
                              </div>
                              <div className="overflow-hidden">
                                <h5 className="font-bold text-white truncate">{m.name}</h5>
                                <p className="text-[10px] text-emerald-400 truncate">{m.role}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}

        {/* 7. TAB PROFIL & VISI MISI */}
        {activeTab === 'PROFIL' && (
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-5 max-w-3xl text-xs">
            <div className="space-y-1 border-b border-slate-800 pb-3">
              <span className="text-emerald-400 font-bold uppercase text-[10px]">EDITOR KONTEN PROFIL ORGANISASI</span>
              <h3 className="font-extrabold text-lg text-white">Kelola Visi, Misi & Tentang Karang Taruna</h3>
            </div>

            <div className="space-y-4">
              <div>
                <label className="font-bold text-slate-200 block mb-1">Headline Utama Hero Website</label>
                <input
                  type="text"
                  value={settings.heroHeadline}
                  onChange={(e) => setSettings({ ...settings, heroHeadline: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white"
                />
              </div>

              <div>
                <label className="font-bold text-slate-200 block mb-1">Teks Latar Belakang / Tentang Karang Taruna</label>
                <textarea
                  rows={4}
                  value={settings.aboutText}
                  onChange={(e) => setSettings({ ...settings, aboutText: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white"
                />
              </div>

              <div>
                <label className="font-bold text-slate-200 block mb-1">Visi Organisasi</label>
                <textarea
                  rows={2}
                  value={settings.visi}
                  onChange={(e) => setSettings({ ...settings, visi: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white"
                />
              </div>

              <div>
                <label className="font-bold text-slate-200 block mb-1">Poin-Poin Misi Strategis</label>
                <div className="space-y-2">
                  {settings.misi.map((m, idx) => (
                    <div key={idx} className="flex items-center space-x-2">
                      <input
                        type="text"
                        value={m}
                        onChange={(e) => {
                          const newMisi = [...settings.misi];
                          newMisi[idx] = e.target.value;
                          setSettings({ ...settings, misi: newMisi });
                        }}
                        className="flex-1 p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const newMisi = settings.misi.filter((_, i) => i !== idx);
                          setSettings({ ...settings, misi: newMisi });
                        }}
                        className="p-2.5 rounded-xl bg-red-950 text-red-400"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => setSettings({ ...settings, misi: [...settings.misi, 'Poin misi baru...'] })}
                    className="px-3 py-1.5 rounded-xl bg-slate-800 text-emerald-400 font-bold"
                  >
                    + Tambah Poin Misi
                  </button>
                </div>
              </div>

              <button
                onClick={() => {
                  DataStore.saveSettings(settings);
                  triggerToast('Konten Profil Berhasil Disimpan!', 'Perubahan profil, visi, dan poin misi telah diperbarui.', refreshData);
                }}
                className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs shadow-lg"
              >
                Simpan Perubahan Profil
              </button>
            </div>
          </div>
        )}

        {/* 8. TAB PENGADUAN WARGA */}
        {activeTab === 'PESAN' && (
          <div className="space-y-4 text-xs">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-slate-900 border border-slate-800">
              <h2 className="font-bold text-base text-white">Kelola Pengaduan Masuk Dari Warga ({complaints.length})</h2>
              
              <div className="flex items-center space-x-2">
                {['SEMUA', 'PENDING', 'DIPROSES', 'SELESAI'].map((st) => (
                  <button
                    key={st}
                    onClick={() => setComplaintFilter(st as any)}
                    className={`px-3 py-1.5 rounded-xl font-bold text-[10px] ${
                      complaintFilter === st ? 'bg-emerald-600 text-white' : 'bg-slate-950 text-slate-400'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            {filteredComplaints.length === 0 ? (
              <p className="text-slate-400 italic p-4 rounded-xl bg-slate-900 border border-slate-800">Tidak ada data pengaduan warga untuk kategori status ini.</p>
            ) : (
              <div className="space-y-3">
                {filteredComplaints.map((c) => (
                  <div key={c.id} className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="font-black text-emerald-400 font-mono text-sm">{c.ticketNumber}</span>
                        <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-bold text-[10px]">{c.category}</span>
                      </div>
                      <span className="text-slate-500 text-[10px]">{c.createdAt}</span>
                    </div>

                    <div className="space-y-1">
                      <h4 className="font-bold text-white text-sm">{c.name} (WA: {c.whatsapp})</h4>
                      <p className="text-slate-400">📍 Lokasi Kejadian: {c.location}</p>
                    </div>

                    <p className="text-slate-300 bg-slate-950 p-3 rounded-xl border border-slate-800 leading-relaxed italic">
                      "{c.content}"
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 border-t border-slate-800">
                      <div className="flex items-center space-x-2">
                        <span className="text-slate-400 font-semibold">Ubah Status Pengaduan:</span>
                        {(['PENDING', 'DIPROSES', 'SELESAI'] as const).map((st) => (
                          <button
                            key={st}
                            onClick={() => {
                              DataStore.updateComplaintStatus(c.id, st);
                              refreshData();
                            }}
                            className={`px-2.5 py-1 rounded text-[10px] font-bold ${
                              c.status === st ? 'bg-emerald-600 text-white' : 'bg-slate-950 text-slate-400 border border-slate-800'
                            }`}
                          >
                            {st}
                          </button>
                        ))}
                      </div>

                      <div className="flex items-center space-x-2">
                        <a href={`https://wa.me/${c.whatsapp}`} target="_blank" rel="noreferrer" className="px-3 py-1.5 rounded-lg bg-emerald-600 text-white font-bold flex items-center space-x-1">
                          <Phone className="w-3.5 h-3.5" />
                          <span>Hubungi WA</span>
                        </a>
                        <button onClick={() => confirmDelete(c.ticketNumber, () => DataStore.deleteComplaint(c.id))} className="p-1.5 rounded-lg bg-red-950 text-red-400">
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* 9. TAB GRAB KT MANAGEMENT */}
        {activeTab === 'GRAB_KT' && (
          <div className="space-y-8 text-xs">
            <div className="space-y-4">
              <h2 className="font-extrabold text-base text-amber-400 flex items-center space-x-2">
                <UserCheck className="w-5 h-5" />
                <span>Permohonan Driver Menunggu Verifikasi ({driverApps.filter(a => a.status === 'WAITING_VERIFICATION').length})</span>
              </h2>

              {driverApps.filter(a => a.status === 'WAITING_VERIFICATION').length === 0 ? (
                <p className="text-slate-400 italic p-4 rounded-xl bg-slate-900 border border-slate-800">
                  Tidak ada permohonan driver baru yang menunggu verifikasi saat ini.
                </p>
              ) : (
                <div className="space-y-3">
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
                          className="px-4 py-2 rounded-xl bg-red-950 border border-red-800 text-red-400 font-bold flex items-center space-x-1"
                        >
                          <XCircle className="w-4 h-4" />
                          <span>Tolak Driver</span>
                        </button>

                        <button
                          onClick={() => handleVerifyDriver(app.id, true)}
                          className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold flex items-center space-x-1 shadow-lg"
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

            <div className="space-y-4">
              <h2 className="font-bold text-base text-white">Daftar Driver Aktif Terverifikasi ({drivers.length})</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
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

            <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
              <h3 className="font-bold text-sm text-white">Pengaturan Konfigurasi Tarif Grab KT</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
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
                  triggerToast('Konfigurasi Tarif Berhasil Disimpan!', 'Tarif dasar, per KM, dan biaya layanan Grab KT diperbarui.', refreshData);
                }}
                className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs shadow-md"
              >
                Simpan Konfigurasi Tarif
              </button>
            </div>
          </div>
        )}

        {/* 10. TAB PENGATURAN MEDSOS & LOGO */}
        {activeTab === 'PENGATURAN' && (
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-6 max-w-2xl text-xs">
            <div className="space-y-1 border-b border-slate-800 pb-3">
              <span className="text-emerald-400 font-bold uppercase text-[10px]">PENGATURAN IDENTITAS ORGANISASI</span>
              <h3 className="font-extrabold text-lg text-white">Logo Website & Integrasi Medsos</h3>
            </div>

            {/* DYNAMIC LOGO UPLOADER */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              <label className="font-extrabold text-white block">Logo Resmi Karang Taruna</label>
              
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 rounded-2xl bg-slate-900 border border-emerald-500/50 p-1 flex items-center justify-center shrink-0 overflow-hidden shadow-lg">
                  {settings.logoUrl ? (
                    <img src={settings.logoUrl} alt="Logo" className="w-full h-full object-cover rounded-xl" />
                  ) : (
                    <Shield className="w-8 h-8 text-emerald-400" />
                  )}
                </div>

                <div className="space-y-1">
                  <input
                    type="file"
                    accept="image/*"
                    id="site-logo-upload"
                    className="hidden"
                    onChange={handleLogoUpload}
                  />
                  <div className="flex items-center space-x-2">
                    <label
                      htmlFor="site-logo-upload"
                      className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold cursor-pointer flex items-center space-x-1.5"
                    >
                      <Upload className="w-3.5 h-3.5" />
                      <span>Unggah Logo Baru</span>
                    </label>

                    {settings.logoUrl && (
                      <button
                        type="button"
                        onClick={() => setSettings({ ...settings, logoUrl: '' })}
                        className="px-3 py-1.5 rounded-xl bg-red-950 border border-red-800 text-red-400 font-bold"
                      >
                        Reset ke Default
                      </button>
                    )}
                  </div>
                  <p className="text-[10px] text-slate-400">PNG, JPG, WEBP, SVG Maksimal 5 MB.</p>
                </div>
              </div>

              <div className="pt-2">
                <label className="text-slate-300 font-semibold block mb-1">Atau Gunakan URL Gambar Logo External:</label>
                <input
                  type="text"
                  placeholder="https://domain.com/logo.png"
                  value={settings.logoUrl || ''}
                  onChange={(e) => setSettings({ ...settings, logoUrl: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-slate-500"
                />
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <label className="font-semibold text-slate-300">Username Instagram Official</label>
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
                <label className="font-semibold text-slate-300">WhatsApp Hotline Number (Format 628xxx)</label>
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
                  triggerToast('Pengaturan Logo & Medsos Berhasil Disimpan!', 'Perubahan logo dan akun media sosial telah diperbarui.', refreshData);
                }}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 text-white font-extrabold text-xs shadow-lg"
              >
                Simpan Pengaturan
              </button>
            </div>
          </div>
        )}

      </section>

      {/* ---------------- MODALS LAYER ---------------- */}

      {/* 1. INSTAGRAM MODAL WITH REAL OEMBED/MEDIA FETCH FOR PASTED LINK */}
      {showIgModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-lg w-full p-6 space-y-4 shadow-2xl relative text-xs">
            <button onClick={() => setShowIgModal(false)} className="absolute top-4 right-4 p-2 rounded-full bg-slate-800 text-slate-300 hover:text-white"><X className="w-5 h-5" /></button>

            <div className="space-y-1 border-b border-slate-800 pb-3">
              <div className="flex items-center space-x-2 text-pink-400 font-bold text-[10px] uppercase">
                <InstagramIcon className="w-3.5 h-3.5" />
                <span>INTEGRASI INSTAGRAM FEED</span>
              </div>
              <h2 className="text-lg font-extrabold text-white">{editingIg ? 'Edit Link Instagram' : 'Tambah Post Instagram Baru'}</h2>
            </div>

            <form onSubmit={handleSaveIg} className="space-y-4">
              
              {/* INSTAGRAM LINK INPUT & AUTO FETCH BUTTON */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="font-bold text-slate-200">Paste Link Instagram Post (URL) *</label>
                  <button
                    type="button"
                    disabled={isIgFetching}
                    onClick={() => autoFetchInstagramPostData(igForm.instagramUrl)}
                    className="text-[10px] font-extrabold text-pink-300 hover:text-white flex items-center space-x-1.5 bg-gradient-to-r from-pink-700 to-purple-700 px-2.5 py-1 rounded-lg border border-pink-500/50 shadow-md hover:scale-105 transition-all disabled:opacity-50"
                  >
                    {isIgFetching ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        <span>Mengambil Data IG...</span>
                      </>
                    ) : (
                      <>
                        <Wand2 className="w-3.5 h-3.5" />
                        <span>✨ Ambil Foto & Caption dari Link</span>
                      </>
                    )}
                  </button>
                </div>
                
                <input
                  type="url"
                  required
                  placeholder="https://www.instagram.com/p/CODE..."
                  value={igForm.instagramUrl}
                  onChange={(e) => {
                    const url = e.target.value;
                    autoFetchInstagramPostData(url);
                  }}
                  className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:border-pink-500 focus:outline-none"
                />
              </div>

              {/* THUMBNAIL PREVIEW (EXACTLY MATCHING THE PASTED INSTAGRAM LINK) */}
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <label className="font-bold text-slate-200">Thumbnail Preview (Foto dari Postingan Instagram)</label>
                  <span className="text-[10px] text-pink-400 font-semibold italic">(Mengikuti postingan yang dipaste di atas)</span>
                </div>

                {igForm.thumbnail ? (
                  <div className="relative w-full h-44 rounded-2xl overflow-hidden bg-slate-950 border border-emerald-500/40 mb-2 group">
                    <img 
                      src={igForm.thumbnail} 
                      alt="Preview IG" 
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        // Fallback to direct media proxy if CORS blocked
                        const match = igForm.instagramUrl.match(/instagram\.com\/(?:p|reel|tv)\/([^/?#&]+)/i);
                        if (match && match[1]) {
                          (e.target as HTMLImageElement).src = `https://images.weserv.nl/?url=https://www.instagram.com/p/${match[1]}/media/?size=l`;
                        }
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent flex items-end p-3">
                      <span className="px-2.5 py-1 rounded-lg bg-emerald-950/90 backdrop-blur-md text-[10px] font-black text-emerald-400 border border-emerald-500/50 flex items-center space-x-1">
                        <Check className="w-3 h-3" />
                        <span>Foto Persis Postingan Instagram</span>
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="w-full h-24 rounded-2xl bg-slate-950 border border-dashed border-slate-800 flex items-center justify-center text-slate-500 text-[11px] italic">
                    Paste link Instagram di atas untuk mengambil foto postingan otomatis...
                  </div>
                )}

                <div className="flex items-center space-x-2 pt-1">
                  <input
                    type="text"
                    placeholder="URL Foto..."
                    value={igForm.thumbnail}
                    onChange={(e) => setIgForm({ ...igForm, thumbnail: e.target.value })}
                    className="flex-1 p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white"
                  />
                  <input
                    type="file"
                    accept="image/*"
                    id="ig-thumb-upload"
                    className="hidden"
                    onChange={(e) => handleGenericFileUpload(e, (res) => setIgForm({ ...igForm, thumbnail: res }))}
                  />
                  <label htmlFor="ig-thumb-upload" className="px-3.5 py-2.5 rounded-xl bg-slate-800 text-slate-200 font-bold cursor-pointer hover:bg-slate-700">
                    Upload
                  </label>
                </div>
              </div>

              {/* CAPTION POST */}
              <div className="space-y-1">
                <label className="font-bold text-slate-200">Caption Post *</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Tuliskan caption postingan Instagram..."
                  value={igForm.caption}
                  onChange={(e) => setIgForm({ ...igForm, caption: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                
                {/* KATEGORI */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <label className="font-bold text-slate-200">Kategori</label>
                    <span className="text-[9px] text-pink-400 font-semibold">(Generate Otomatis)</span>
                  </div>
                  <select
                    value={igForm.category}
                    onChange={(e) => setIgForm({ ...igForm, category: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white font-bold text-emerald-400"
                  >
                    <option value="Kepemudaan">Kepemudaan</option>
                    <option value="Lingkungan">Lingkungan</option>
                    <option value="Olahraga">Olahraga</option>
                    <option value="UMKM">UMKM</option>
                    <option value="Sosial">Sosial</option>
                    <option value="PHBN">PHBN</option>
                  </select>
                </div>

                {/* TANGGAL POST */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <label className="font-bold text-slate-200">Tanggal Post</label>
                    <span className="text-[9px] text-pink-400 font-semibold">(Otomatis dari Instagram)</span>
                  </div>
                  <input
                    type="text"
                    value={igForm.date}
                    onChange={(e) => setIgForm({ ...igForm, date: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white font-bold"
                  />
                </div>
              </div>

              <div className="pt-3 flex items-center justify-end space-x-3">
                <button type="button" onClick={() => setShowIgModal(false)} className="px-4 py-2.5 rounded-xl bg-slate-800 text-slate-300 font-bold">Batal</button>
                <button type="submit" className="px-6 py-2.5 rounded-xl bg-pink-600 hover:bg-pink-500 text-white font-extrabold shadow-lg">{editingIg ? 'Simpan Edit' : 'Tambah IG Post'}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 2. BERITA MODAL */}
      {showNewsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-xl w-full p-6 space-y-4 shadow-2xl relative text-xs max-h-[90vh] overflow-y-auto">
            <button onClick={() => setShowNewsModal(false)} className="absolute top-4 right-4 p-2 rounded-full bg-slate-800 text-slate-300"><X className="w-5 h-5" /></button>

            <div className="space-y-1 border-b border-slate-800 pb-3">
              <span className="text-emerald-400 font-bold text-[10px] uppercase">MANAJEMEN ARTIKEL BERITA</span>
              <h2 className="text-lg font-extrabold text-white">{editingNews ? 'Edit Artikel Berita' : 'Tambah Artikel Berita Baru'}</h2>
            </div>

            <form onSubmit={handleSaveNews} className="space-y-4">
              <div className="space-y-1">
                <label className="font-bold text-slate-200">Judul Berita *</label>
                <input
                  type="text"
                  required
                  placeholder="Masukkan judul berita"
                  value={newsForm.title}
                  onChange={(e) => setNewsForm({ ...newsForm, title: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-slate-200">Kategori Berita</label>
                  <input
                    type="text"
                    value={newsForm.category}
                    onChange={(e) => setNewsForm({ ...newsForm, category: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-200">Link Instagram Terkait (Opsional)</label>
                  <input
                    type="url"
                    placeholder="https://instagram.com/p/..."
                    value={newsForm.instagramLink}
                    onChange={(e) => setNewsForm({ ...newsForm, instagramLink: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-200">Thumbnail Berita (URL atau Upload)</label>
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={newsForm.thumbnail}
                    onChange={(e) => setNewsForm({ ...newsForm, thumbnail: e.target.value })}
                    className="flex-1 p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white"
                  />
                  <input
                    type="file"
                    accept="image/*"
                    id="news-thumb-upload"
                    className="hidden"
                    onChange={(e) => handleGenericFileUpload(e, (res) => setNewsForm({ ...newsForm, thumbnail: res }))}
                  />
                  <label htmlFor="news-thumb-upload" className="px-3 py-2 rounded-xl bg-slate-800 text-slate-200 font-bold cursor-pointer">
                    Upload
                  </label>
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-200">Ringkasan Berita *</label>
                <textarea
                  rows={2}
                  required
                  placeholder="Ringkasan singkat untuk tampilan depan..."
                  value={newsForm.summary}
                  onChange={(e) => setNewsForm({ ...newsForm, summary: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-200">Isi Berita Lengkap</label>
                <textarea
                  rows={5}
                  placeholder="Tuliskan isi artikel berita..."
                  value={newsForm.content}
                  onChange={(e) => setNewsForm({ ...newsForm, content: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white"
                />
              </div>

              <div className="pt-3 flex items-center justify-end space-x-3">
                <button type="button" onClick={() => setShowNewsModal(false)} className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 font-bold">Batal</button>
                <button type="submit" className="px-6 py-2 rounded-xl bg-emerald-600 text-white font-bold">{editingNews ? 'Simpan Berita' : 'Terbitkan Berita'}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 3. AGENDA MODAL */}
      {showAgendaModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl relative text-xs">
            <button onClick={() => setShowAgendaModal(false)} className="absolute top-4 right-4 p-2 rounded-full bg-slate-800 text-slate-300"><X className="w-5 h-5" /></button>

            <div className="space-y-1 border-b border-slate-800 pb-3">
              <span className="text-amber-400 font-bold text-[10px] uppercase">MANAJEMEN AGENDA KEGIATAN</span>
              <h2 className="text-lg font-extrabold text-white">{editingAgenda ? 'Edit Agenda' : 'Tambah Agenda Baru'}</h2>
            </div>

            <form onSubmit={handleSaveAgenda} className="space-y-4">
              <div className="space-y-1">
                <label className="font-bold text-slate-200">Nama Agenda *</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Turnamen Futsal Pemuda"
                  value={agendaForm.title}
                  onChange={(e) => setAgendaForm({ ...agendaForm, title: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-slate-200">Tanggal Agenda *</label>
                  <input
                    type="date"
                    required
                    value={agendaForm.date}
                    onChange={(e) => setAgendaForm({ ...agendaForm, date: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-200">Waktu Pelaksanaan</label>
                  <input
                    type="text"
                    placeholder="09:00 - 15:00 WIB"
                    value={agendaForm.time}
                    onChange={(e) => setAgendaForm({ ...agendaForm, time: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-slate-200">Lokasi</label>
                  <input
                    type="text"
                    placeholder="Lokasi kegiatan"
                    value={agendaForm.location}
                    onChange={(e) => setAgendaForm({ ...agendaForm, location: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-200">Status Agenda</label>
                  <select
                    value={agendaForm.status}
                    onChange={(e) => setAgendaForm({ ...agendaForm, status: e.target.value as any })}
                    className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white"
                  >
                    <option value="AKAN DATANG">AKAN DATANG</option>
                    <option value="BERLANGSUNG">BERLANGSUNG</option>
                    <option value="SELESAI">SELESAI</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-200">Deskripsi Agenda</label>
                <textarea
                  rows={3}
                  placeholder="Detail penjelasan kegiatan..."
                  value={agendaForm.description}
                  onChange={(e) => setAgendaForm({ ...agendaForm, description: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white"
                />
              </div>

              <div className="pt-3 flex items-center justify-end space-x-3">
                <button type="button" onClick={() => setShowAgendaModal(false)} className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 font-bold">Batal</button>
                <button type="submit" className="px-6 py-2 rounded-xl bg-emerald-600 text-white font-bold">{editingAgenda ? 'Simpan' : 'Tambah Agenda'}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 4. ANNOUNCEMENT MODAL */}
      {showAncModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl relative text-xs">
            <button onClick={() => setShowAncModal(false)} className="absolute top-4 right-4 p-2 rounded-full bg-slate-800 text-slate-300"><X className="w-5 h-5" /></button>

            <div className="space-y-1 border-b border-slate-800 pb-3">
              <span className="text-cyan-400 font-bold text-[10px] uppercase">MANAJEMEN PENGUMUMAN BOARD</span>
              <h2 className="text-lg font-extrabold text-white">{editingAnc ? 'Edit Pengumuman' : 'Tambah Pengumuman Baru'}</h2>
            </div>

            <form onSubmit={handleSaveAnc} className="space-y-4">
              <div className="space-y-1">
                <label className="font-bold text-slate-200">Judul Pengumuman *</label>
                <input
                  type="text"
                  required
                  placeholder="Judul edaran / pengumuman"
                  value={ancForm.title}
                  onChange={(e) => setAncForm({ ...ancForm, title: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white"
                />
              </div>

              <div className="flex items-center space-x-2 p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                <input
                  type="checkbox"
                  id="anc-important-chk"
                  checked={ancForm.isImportant}
                  onChange={(e) => setAncForm({ ...ancForm, isImportant: e.target.checked })}
                  className="w-4 h-4 text-red-600 rounded bg-slate-900 border-slate-800"
                />
                <label htmlFor="anc-important-chk" className="text-slate-300 text-xs font-bold cursor-pointer">
                  Tandai Sebagai Pengumuman PENTING (High Priority)
                </label>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-200">Isi Pengumuman Lengkap *</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Detail isi pengumuman..."
                  value={ancForm.content}
                  onChange={(e) => setAncForm({ ...ancForm, content: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white"
                />
              </div>

              <div className="pt-3 flex items-center justify-end space-x-3">
                <button type="button" onClick={() => setShowAncModal(false)} className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 font-bold">Batal</button>
                <button type="submit" className="px-6 py-2 rounded-xl bg-emerald-600 text-white font-bold">{editingAnc ? 'Simpan Edit' : 'Terbitkan Pengumuman'}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 5. GALLERY MODAL */}
      {showGalModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl relative text-xs">
            <button onClick={() => setShowGalModal(false)} className="absolute top-4 right-4 p-2 rounded-full bg-slate-800 text-slate-300"><X className="w-5 h-5" /></button>

            <div className="space-y-1 border-b border-slate-800 pb-3">
              <span className="text-purple-400 font-bold text-[10px] uppercase">MANAJEMEN GALERI FOTO</span>
              <h2 className="text-lg font-extrabold text-white">{editingGal ? 'Edit Foto Galeri' : 'Tambah Foto Galeri Baru'}</h2>
            </div>

            <form onSubmit={handleSaveGal} className="space-y-4">
              <div className="space-y-1">
                <label className="font-bold text-slate-200">Judul Foto Dokumentasi *</label>
                <input
                  type="text"
                  required
                  placeholder="Judul foto kegiatan"
                  value={galForm.title}
                  onChange={(e) => setGalForm({ ...galForm, title: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-200">File Foto (URL atau Upload Berkas)</label>
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={galForm.image}
                    onChange={(e) => setGalForm({ ...galForm, image: e.target.value })}
                    className="flex-1 p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white"
                  />
                  <input
                    type="file"
                    accept="image/*"
                    id="gal-img-upload"
                    className="hidden"
                    onChange={(e) => handleGenericFileUpload(e, (res) => setGalForm({ ...galForm, image: res }))}
                  />
                  <label htmlFor="gal-img-upload" className="px-3 py-2 rounded-xl bg-slate-800 text-slate-200 font-bold cursor-pointer">
                    Upload
                  </label>
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-200">Kategori Galeri</label>
                <select
                  value={galForm.category}
                  onChange={(e) => setGalForm({ ...galForm, category: e.target.value as any })}
                  className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white"
                >
                  <option value="Kegiatan Sosial">Kegiatan Sosial</option>
                  <option value="Olahraga">Olahraga</option>
                  <option value="Kepemudaan">Kepemudaan</option>
                  <option value="PHBN">PHBN</option>
                  <option value="UMKM">UMKM</option>
                  <option value="Kegiatan Kecamatan">Kegiatan Kecamatan</option>
                </select>
              </div>

              <div className="pt-3 flex items-center justify-end space-x-3">
                <button type="button" onClick={() => setShowGalModal(false)} className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 font-bold">Batal</button>
                <button type="submit" className="px-6 py-2 rounded-xl bg-emerald-600 text-white font-bold">{editingGal ? 'Simpan' : 'Tambah Foto'}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 6. MEMBER MODAL */}
      {showMemberModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-xl w-full p-6 space-y-4 shadow-2xl relative max-h-[90vh] overflow-y-auto text-xs">
            <button onClick={() => setShowMemberModal(false)} className="absolute top-4 right-4 p-2 rounded-full bg-slate-800 text-slate-300"><X className="w-5 h-5" /></button>

            <div className="space-y-1 border-b border-slate-800 pb-3">
              <span className="text-emerald-400 font-bold text-[10px] uppercase">MANAJEMEN STRUKTUR KEPENGURUSAN</span>
              <h2 className="text-lg font-extrabold text-white">{editingMember ? 'Edit Data Pengurus' : 'Tambah Pengurus Baru'}</h2>
            </div>

            <form onSubmit={handleSaveMember} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-slate-200">Nama Lengkap *</label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Ridwan Nur Rohman"
                    value={memberForm.name}
                    onChange={(e) => setMemberForm({ ...memberForm, name: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-200">Jabatan *</label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Ketua Karang Taruna"
                    value={memberForm.role}
                    onChange={(e) => setMemberForm({ ...memberForm, role: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-slate-200">Kategori Struktur *</label>
                  <select
                    value={memberForm.category}
                    onChange={(e) => setMemberForm({ ...memberForm, category: e.target.value as OrgCategory })}
                    className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white"
                  >
                    <option value="PEMBINA_PENASIHAT">PEMBINA & PENASIHAT</option>
                    <option value="MPKT">MPKT</option>
                    <option value="PENGURUS_HARIAN">PENGURUS HARIAN</option>
                    <option value="BIDANG">BIDANG KHUSUS</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-200">Bidang / Divisi</label>
                  <input
                    type="text"
                    placeholder="Contoh: Bidang Organisasi"
                    value={memberForm.division}
                    onChange={(e) => setMemberForm({ ...memberForm, division: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white"
                  />
                </div>
              </div>

              <div className="space-y-2 p-3 rounded-2xl bg-slate-950 border border-slate-800">
                <label className="font-bold text-slate-200 block">Foto Pengurus (1:1 Ratio)</label>
                <div className="flex items-center space-x-4">
                  <div className="w-14 h-14 rounded-full overflow-hidden bg-slate-900 border border-slate-700 flex items-center justify-center shrink-0">
                    {memberForm.photo ? (
                      <img src={memberForm.photo} alt="Preview" className="w-full h-full object-cover" />
                    ) : (
                      <User className="w-6 h-6 text-slate-500" />
                    )}
                  </div>

                  <div className="space-y-1">
                    <input
                      type="file"
                      accept="image/*"
                      id="member-photo-upload"
                      className="hidden"
                      onChange={handleMemberImageUpload}
                    />
                    <div className="flex items-center space-x-2">
                      <label htmlFor="member-photo-upload" className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-200 cursor-pointer font-bold flex items-center space-x-1">
                        <Upload className="w-3.5 h-3.5" />
                        <span>Unggah Foto</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-3 flex items-center justify-end space-x-3">
                <button type="button" onClick={() => setShowMemberModal(false)} className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 font-bold">Batal</button>
                <button type="submit" className="px-6 py-2 rounded-xl bg-emerald-600 text-white font-bold">{editingMember ? 'Simpan' : 'Tambah'}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ---------------- FLOATING TOAST & LOADING NOTIFICATION ---------------- */}
      {toast.show && (
        <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-5 fade-in duration-300">
          <div className={`p-4 rounded-2xl border shadow-2xl backdrop-blur-xl flex items-center space-x-3.5 max-w-sm ${
            toast.type === 'loading'
              ? 'bg-slate-900/95 border-emerald-500/50 text-white'
              : toast.type === 'success'
              ? 'bg-emerald-950/95 border-emerald-400 text-white'
              : 'bg-red-950/95 border-red-500 text-white'
          }`}>
            <div className="shrink-0">
              {toast.type === 'loading' && <Loader2 className="w-6 h-6 text-emerald-400 animate-spin" />}
              {toast.type === 'success' && <CheckCircle2 className="w-6 h-6 text-emerald-400" />}
              {toast.type === 'error' && <XCircle className="w-6 h-6 text-red-400" />}
            </div>
            <div>
              <h4 className="font-extrabold text-sm text-white">{toast.title}</h4>
              {toast.message && <p className="text-xs text-slate-300 mt-0.5">{toast.message}</p>}
            </div>
          </div>
        </div>
      )}

    </main>
  );
}
