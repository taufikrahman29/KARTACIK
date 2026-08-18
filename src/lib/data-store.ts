// Data Store & LocalStorage Persistence for Karang Taruna Kecamatan Cikancung & Grab KT

export interface InstagramPost {
  id: string;
  instagramUrl: string;
  thumbnail: string;
  caption: string;
  date: string;
  likes: number;
  comments: number;
  category: string;
}

export interface NewsArticle {
  id: string;
  title: string;
  slug: string;
  category: string;
  thumbnail: string;
  date: string;
  author: string;
  summary: string;
  content: string;
  isPublished: boolean;
  instagramLink?: string;
  views: number;
}

export interface AgendaItem {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  status: 'AKAN DATANG' | 'BERLANGSUNG' | 'SELESAI';
  description: string;
  organizer: string;
}

export interface AnnouncementItem {
  id: string;
  title: string;
  date: string;
  category: string;
  isImportant: boolean;
  content: string;
  attachmentName?: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'Kegiatan Sosial' | 'Olahraga' | 'Kepemudaan' | 'PHBN' | 'UMKM' | 'Kegiatan Kecamatan';
  image: string;
  date: string;
  description: string;
}

export type OrgCategory = 'PEMBINA_PENASIHAT' | 'MPKT' | 'PENGURUS_HARIAN' | 'BIDANG';

export interface OrgMember {
  id: string;
  name: string;
  role: string;
  category: OrgCategory;
  division?: string;
  isLeader?: boolean;
  photo?: string;
  showPhoto?: boolean;
  bio?: string;
  whatsapp?: string;
  instagram?: string;
  sortOrder: number;
  status: 'ACTIVE' | 'INACTIVE';
  createdAt?: string;
}

export interface ComplaintRecord {
  id: string;
  ticketNumber: string;
  name: string;
  whatsapp: string;
  category: string;
  location: string;
  content: string;
  attachmentName?: string;
  status: 'PENDING' | 'DIPROSES' | 'SELESAI';
  createdAt: string;
}

export interface VillageLandmark {
  id: string;
  name: string;
  villageName: string;
  lat: number;
  lng: number;
}

export interface GrabDriverApplication {
  id: string;
  applicantName: string;
  memberId: string;
  whatsapp: string;
  address: string;
  village: string;
  ktpNumber: string;
  simNumber: string;
  vehicleType: 'Motor (Scooter)' | 'Motor (Bebek/Sport)' | 'Mobil (MPV/Sedan)';
  vehicleBrand: string;
  vehicleColor: string;
  vehicleYear: string;
  plateNumber: string;
  ktpPhoto: string;
  simPhoto: string;
  vehiclePhoto: string;
  status: 'WAITING_VERIFICATION' | 'UNDER_REVIEW' | 'APPROVED' | 'REJECTED';
  rejectionReason?: string;
  createdAt: string;
}

export interface GrabDriver {
  id: string;
  driverCode: string;
  name: string;
  memberId: string;
  whatsapp: string;
  photo: string;
  vehicleType: string;
  vehicleBrand: string;
  plateNumber: string;
  vehicleColor: string;
  rating: number;
  totalTrips: number;
  isOnline: boolean;
  isAvailable: boolean;
  village: string;
  currentLat: number;
  currentLng: number;
}

export interface GrabOrder {
  id: string;
  orderCode: string;
  customerName: string;
  customerPhone: string;
  pickupName: string;
  pickupLat: number;
  pickupLng: number;
  destinationName: string;
  destinationLat: number;
  destinationLng: number;
  distanceKm: number;
  baseFare: number;
  distanceFare: number;
  serviceFee: number;
  totalFare: number;
  paymentMethod: 'CASH' | 'QRIS';
  paymentStatus: 'PENDING' | 'PAID';
  orderStatus: 'SEARCHING_DRIVER' | 'DRIVER_ASSIGNED' | 'DRIVER_ON_THE_WAY' | 'DRIVER_ARRIVED' | 'TRIP_STARTED' | 'TRIP_COMPLETED' | 'CANCELLED';
  driverId?: string;
  driverName?: string;
  driverPhone?: string;
  driverPlate?: string;
  driverVehicle?: string;
  createdAt: string;
  rating?: number;
  review?: string;
}

export interface GrabTariff {
  baseFare: number;
  pricePerKm: number;
  serviceFee: number;
  minFare: number;
}

export interface SiteSettings {
  logoUrl?: string;
  instagramUsername: string;
  instagramUrl: string;
  facebookUrl: string;
  tiktokUrl: string;
  youtubeUrl: string;
  whatsappNumber: string;
  email: string;
  address: string;
  heroHeadline: string;
  heroSubheadline: string;
  aboutText: string;
  visi: string;
  misi: string[];
}

// ---------------- DEMO SEED DATA ----------------

export const SEED_VILLAGES: VillageLandmark[] = [
  { id: 'v1', name: 'Alun-Alun Kecamatan Cikancung', villageName: 'Desa Cikancung', lat: -7.0195, lng: 107.8105 },
  { id: 'v2', name: 'Kantor Desa Cihanyir', villageName: 'Desa Cihanyir', lat: -7.0250, lng: 107.8220 },
  { id: 'v3', name: 'Pasar Tradisional Ciluluk', villageName: 'Desa Ciluluk', lat: -7.0120, lng: 107.8050 },
  { id: 'v4', name: 'Kawasan Wisata Hegarmanah', villageName: 'Desa Hegarmanah', lat: -7.0310, lng: 107.8340 },
  { id: 'v5', name: 'Sentra UMKM Mandalasari', villageName: 'Desa Mandalasari', lat: -7.0080, lng: 107.7980 },
  { id: 'v6', name: 'GOR Desa Mekarlaksana', villageName: 'Desa Mekarlaksana', lat: -7.0290, lng: 107.8150 },
  { id: 'v7', name: 'Posko Pemuda Srirahayu', villageName: 'Desa Srirahayu', lat: -7.0350, lng: 107.8090 },
  { id: 'v8', name: 'Stasiun Kereta Cicalengka (Akses Cikancung)', villageName: 'Cicalengka/Cikancung', lat: -7.0010, lng: 107.8350 },
  { id: 'v9', name: 'Puskesmas Cikancung', villageName: 'Desa Cikancung', lat: -7.0180, lng: 107.8120 },
];

export const SEED_INSTAGRAM: InstagramPost[] = [
  {
    id: 'ig-1',
    instagramUrl: 'https://www.instagram.com/karta.kec.cikancung/',
    thumbnail: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&auto=format&fit=crop&q=80',
    caption: 'Aksi Bersih Lingkungan & Penanaman 1.000 Pohon oleh Karang Taruna Kecamatan Cikancung bersama 9 Desa binaan! Pemuda bergerak, bumi lestari 🌱💚 #KarangTarunaCikancung #PemudaCikancung #KabupatenBandung',
    date: '15 Agustus 2026',
    likes: 428,
    comments: 34,
    category: 'Lingkungan'
  },
  {
    id: 'ig-2',
    instagramUrl: 'https://www.instagram.com/karta.kec.cikancung/',
    thumbnail: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&auto=format&fit=crop&q=80',
    caption: 'Pembukaan Turnamen Futsal Karang Taruna Cup 2026 se-Kecamatan Cikancung! Junjung tinggi sportifitas dan pererat silaturahmi pemuda! ⚽🏆',
    date: '10 Agustus 2026',
    likes: 612,
    comments: 56,
    category: 'Olahraga'
  },
  {
    id: 'ig-3',
    instagramUrl: 'https://www.instagram.com/karta.kec.cikancung/',
    thumbnail: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&auto=format&fit=crop&q=80',
    caption: 'Workshop Digital Marketing & Onboarding Ecommerce gratis untuk pelaku UMKM muda Cikancung. Dorong kemandirian ekonomi desa! 🚀💼',
    date: '02 Agustus 2026',
    likes: 389,
    comments: 19,
    category: 'UMKM'
  },
  {
    id: 'ig-4',
    instagramUrl: 'https://www.instagram.com/karta.kec.cikancung/',
    thumbnail: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&auto=format&fit=crop&q=80',
    caption: 'Bakti Sosial & Donor Darah Karang Taruna Cikancung bekerjasama dengan PMI Kab. Bandung. Terima kasih kepada seluruh relawan! ❤️🩸',
    date: '24 Juli 2026',
    likes: 512,
    comments: 42,
    category: 'Sosial'
  }
];

export const SEED_NEWS: NewsArticle[] = [
  {
    id: 'n-1',
    title: 'Karang Taruna Kecamatan Cikancung Resmikan Layanan Transportasi Digital "Grab KT"',
    slug: 'peresmian-grab-kt-cikancung',
    category: 'Teknologi Digital',
    thumbnail: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=800&auto=format&fit=crop&q=80',
    date: '16 Agustus 2026',
    author: 'Humas Karang Taruna',
    summary: 'Inovasi pemberdayaan ekonomi pemuda terwujud melalui platform transportasi digital Grab KT berbasis anggota terverifikasi.',
    content: 'Karang Taruna Kecamatan Cikancung meluncurkan program inovatif Grab KT untuk membantu mobilitas warga sekaligus menggerakkan potensi ekonomi pemuda di 9 Desa Kecamatan Cikancung...',
    isPublished: true,
    instagramLink: 'https://www.instagram.com/karta.kec.cikancung/',
    views: 1240
  },
  {
    id: 'n-2',
    title: 'Kesiapan Pemuda Cikancung Menyambut Peringatan HUT RI ke-81 di Kecamatan Cikancung',
    slug: 'kesiapan-pemuda-hut-ri-81',
    category: 'PHBN',
    thumbnail: 'https://images.unsplash.com/photo-1532375810709-75b1da00537c?w=800&auto=format&fit=crop&q=80',
    date: '12 Agustus 2026',
    author: 'Divisi Kepemudaan',
    summary: 'Rangkaian lomba kebudayaan, pawai obor, dan panggung seni siap digelar di Alun-Alun Cikancung.',
    content: 'Panitia PHBN Karang Taruna Cikancung menggelar konsolidasi antar desa untuk mensukseskan HUT RI...',
    isPublished: true,
    views: 890
  }
];

export const SEED_AGENDAS: AgendaItem[] = [
  {
    id: 'ag-1',
    title: 'Peringatan Hari Kemerdekaan & Malam Puncak Panggung Seni Pemuda',
    date: '2026-08-25',
    time: '19:00 - 23:00 WIB',
    location: 'Alun-Alun Kecamatan Cikancung',
    status: 'AKAN DATANG',
    description: 'Menampilkan kreasi seni tradisional, musik pemuda desa, dan penganugerahan pemuda berprestasi Cikancung.',
    organizer: 'Panitia PHBN Karang Taruna'
  },
  {
    id: 'ag-2',
    title: 'Pelatihan Sertifikasi Barista & Wirausaha Kopi Cikancung',
    date: '2026-08-18',
    time: '09:00 - 15:00 WIB',
    location: 'Aula Sentra Kreatif Desa Cihanyir',
    status: 'BERLANGSUNG',
    description: 'Pelatihan gratis pengolahan biji kopi lokal Bandung Timur hingga teknik pengemasan dan penyajian.',
    organizer: 'Divisi Economic & UMKM'
  },
  {
    id: 'ag-3',
    title: 'Rapat Kerja Tahunan (Raker) Pengurus Karang Taruna Kecamatan',
    date: '2026-07-30',
    time: '08:00 - 16:00 WIB',
    location: 'Aula Kantor Kecamatan Cikancung',
    status: 'SELESAI',
    description: 'Penetapan arah kebijakan program kerja 2026-2027 dan koordinasi 9 Ketua Karang Taruna Desa.',
    organizer: 'Pengurus Harian'
  }
];

export const SEED_ANNOUNCEMENTS: AnnouncementItem[] = [
  {
    id: 'anc-1',
    title: 'Perekrutan Calon Driver Layanan Grab KT Gelombang II Tahun 2026',
    date: '17 Agustus 2026',
    category: 'Grab KT',
    isImportant: true,
    content: 'Dibuka kesempatan bagi Anggota Karang Taruna di 9 Desa se-Kecamatan Cikancung yang memiliki SIM C/A aktif dan kendaraan pribadi untuk bergabung menjadi Driver Terverifikasi Grab KT. Pendaftaran dilakukan langsung melalui Portal Grab KT di website ini.',
    attachmentName: 'Syarat_Pendaftaran_GrabKT_2026.pdf'
  },
  {
    id: 'anc-2',
    title: 'Himbauan Partisipasi Gerakan Bersih Parit & Drainase Menghadapi Musim Hujan',
    date: '05 Agustus 2026',
    category: 'Lingkungan',
    isImportant: false,
    content: 'Dihimbau kepada seluruh Karang Taruna Desa untuk menggerakkan gotong royong pemuda di wilayah RW masing-masing.',
  }
];

export const SEED_GALLERY: GalleryItem[] = [
  {
    id: 'gal-1',
    title: 'Penanaman Pohon & Aksi Penghijauan Desa Hegarmanah',
    category: 'Kegiatan Sosial',
    image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&auto=format&fit=crop&q=80',
    date: '15 Agustus 2026',
    description: 'Relawan Karang Taruna bersama warga menanam bibit pohon mahoni dan buah-buahan.'
  },
  {
    id: 'gal-2',
    title: 'Final Turnamen Futsal Karang Taruna Cup 2026',
    category: 'Olahraga',
    image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&auto=format&fit=crop&q=80',
    date: '10 Agustus 2026',
    description: 'Pertandingan sengit antara Tim Pemuda Ciluluk vs Tim Pemuda Cihanyir.'
  },
  {
    id: 'gal-3',
    title: 'Workshop Digital Marketing Produk UMKM Desa',
    category: 'UMKM',
    image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&auto=format&fit=crop&q=80',
    date: '02 Agustus 2026',
    description: 'Praktek pembuatan katalog produk digital dan foto studio mandiri.'
  },
  {
    id: 'gal-4',
    title: 'Bakti Sosial & Cek Kesehatan Gratis untuk Lansia',
    category: 'Kegiatan Sosial',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&auto=format&fit=crop&q=80',
    date: '24 Juli 2026',
    description: 'Pemeriksaan tensi, gula darah, dan pembagian paket sembako.'
  },
  {
    id: 'gal-5',
    title: 'Apel Pemuda & Upacara Kesaktian Pancasila',
    category: 'PHBN',
    image: 'https://images.unsplash.com/photo-1532375810709-75b1da00537c?w=800&auto=format&fit=crop&q=80',
    date: '01 Juni 2026',
    description: 'Pengurus Karang Taruna Kecamatan & Desa bersama jajaran Forkopimcam Cikancung.'
  },
  {
    id: 'gal-6',
    title: 'Sosialisasi Bahaya Narkoba & Kenakalan Remaja',
    category: 'Kepemudaan',
    image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&auto=format&fit=crop&q=80',
    date: '15 Mei 2026',
    description: 'Edukasi interaktif di SMA/SMK se-Kecamatan Cikancung bersama Polsek Cikancung.'
  }
];

export const SEED_MEMBERS: OrgMember[] = [
  // 1. PEMBINA & PENASIHAT
  { id: 'm-pb-1', name: 'Camat Cikancung', role: 'Pembina Umum', category: 'PEMBINA_PENASIHAT', sortOrder: 1, status: 'ACTIVE', showPhoto: true, bio: 'Pembina Umum Karang Taruna Kecamatan Cikancung' },
  { id: 'm-pb-2', name: 'Kasi Sosial dan Budaya', role: 'Pembina Fungsional', category: 'PEMBINA_PENASIHAT', sortOrder: 2, status: 'ACTIVE', showPhoto: true, bio: 'Pembina Fungsional Bidang Sosial & Budaya Kecamatan' },
  { id: 'm-pb-3', name: 'Para Kasi Kecamatan Cikancung', role: 'Pembina Teknis', category: 'PEMBINA_PENASIHAT', sortOrder: 3, status: 'ACTIVE', showPhoto: true, bio: 'Pembina Teknis Sektoral Kecamatan' },
  { id: 'm-pb-4', name: 'Sekretaris Kecamatan Cikancung', role: 'Penasihat', category: 'PEMBINA_PENASIHAT', sortOrder: 4, status: 'ACTIVE', showPhoto: true, bio: 'Penasihat Karang Taruna Kecamatan' },
  
  // 2. MPKT
  { id: 'm-mpkt-1', name: 'Agus Sofwan', role: 'Ketua MPKT', category: 'MPKT', isLeader: true, sortOrder: 5, status: 'ACTIVE', showPhoto: true, photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80', bio: 'Ketua Majelis Pertimbangan Karang Taruna Cikancung Masa Bakti 2025–2030' },
  { id: 'm-mpkt-2', name: 'Indra', role: 'Wakil Ketua MPKT', category: 'MPKT', sortOrder: 6, status: 'ACTIVE', showPhoto: true, photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80' },
  { id: 'm-mpkt-3', name: 'A. Gustiara', role: 'Sekretaris MPKT', category: 'MPKT', sortOrder: 7, status: 'ACTIVE', showPhoto: true, photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&auto=format&fit=crop&q=80' },
  { id: 'm-mpkt-4', name: 'Asep Rohman', role: 'Anggota MPKT', category: 'MPKT', sortOrder: 8, status: 'ACTIVE', showPhoto: true },
  { id: 'm-mpkt-5', name: 'Yanti Daniati', role: 'Anggota MPKT', category: 'MPKT', sortOrder: 9, status: 'ACTIVE', showPhoto: true },
  { id: 'm-mpkt-6', name: 'Wiman Saepulloh', role: 'Anggota MPKT', category: 'MPKT', sortOrder: 10, status: 'ACTIVE', showPhoto: true },
  { id: 'm-mpkt-7', name: 'Kiki Kusma Hendra', role: 'Anggota MPKT', category: 'MPKT', sortOrder: 11, status: 'ACTIVE', showPhoto: true },
  
  // 3. PENGURUS HARIAN
  { id: 'm-ph-1', name: 'Ridwan Nur Rohman', role: 'Ketua Karang Taruna Kecamatan Cikancung', category: 'PENGURUS_HARIAN', isLeader: true, sortOrder: 12, status: 'ACTIVE', showPhoto: true, photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80', bio: 'Ketua Karang Taruna Kecamatan Cikancung Masa Bakti 2025–2030. Berkomitmen mewujudkan pemuda mandiri, berkarakter, dan inovatif.', whatsapp: '62895632180100', instagram: 'karta.kec.cikancung' },
  { id: 'm-ph-2', name: 'Muhamad Yakub', role: 'Wakil Ketua I', category: 'PENGURUS_HARIAN', sortOrder: 13, status: 'ACTIVE', showPhoto: true, photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80' },
  { id: 'm-ph-3', name: 'Muhamad Ridwan', role: 'Wakil Ketua II', category: 'PENGURUS_HARIAN', sortOrder: 14, status: 'ACTIVE', showPhoto: true, photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80' },
  { id: 'm-ph-4', name: 'Rilvan Fadilah', role: 'Wakil Ketua III', category: 'PENGURUS_HARIAN', sortOrder: 15, status: 'ACTIVE', showPhoto: true, photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&auto=format&fit=crop&q=80' },
  { id: 'm-ph-5', name: 'Muhammad Zamzam Taufik', role: 'Wakil Ketua IV', category: 'PENGURUS_HARIAN', sortOrder: 16, status: 'ACTIVE', showPhoto: true, photo: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&auto=format&fit=crop&q=80' },
  { id: 'm-ph-6', name: 'Felipe Armando Siboro', role: 'Sekretaris', category: 'PENGURUS_HARIAN', sortOrder: 17, status: 'ACTIVE', showPhoto: true, photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80' },
  { id: 'm-ph-7', name: 'Rani Susanti', role: 'Wakil Sekretaris', category: 'PENGURUS_HARIAN', sortOrder: 18, status: 'ACTIVE', showPhoto: true, photo: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&auto=format&fit=crop&q=80' },
  { id: 'm-ph-8', name: 'Agil Mulyana', role: 'Bendahara', category: 'PENGURUS_HARIAN', sortOrder: 19, status: 'ACTIVE', showPhoto: true, photo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&auto=format&fit=crop&q=80' },
  { id: 'm-ph-9', name: 'Lusi Lusilawati', role: 'Wakil Bendahara', category: 'PENGURUS_HARIAN', sortOrder: 20, status: 'ACTIVE', showPhoto: true, photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop&q=80' },
  
  // 4. OFFICIAL 10 BIDANG KHUSUS ORGANISASI MASA BAKTI 2025–2030

  // BIDANG 1: BIDANG ORGANISASI DAN KELEMBAGAAN
  { id: 'm-b1-1', name: 'JAJANG NURJAMAN', role: 'Ketua Bidang Organisasi & Kelembagaan', category: 'BIDANG', division: 'BIDANG ORGANISASI DAN KELEMBAGAAN', isLeader: true, sortOrder: 21, status: 'ACTIVE', showPhoto: true, photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80' },
  { id: 'm-b1-2', name: 'ALFI NURIZKYA', role: 'Anggota Bidang Organisasi', category: 'BIDANG', division: 'BIDANG ORGANISASI DAN KELEMBAGAAN', sortOrder: 22, status: 'ACTIVE', showPhoto: true, photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80' },
  { id: 'm-b1-3', name: 'SANTI SOPIAH', role: 'Anggota Bidang Organisasi', category: 'BIDANG', division: 'BIDANG ORGANISASI DAN KELEMBAGAAN', sortOrder: 23, status: 'ACTIVE', showPhoto: true, photo: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&auto=format&fit=crop&q=80' },
  { id: 'm-b1-4', name: 'ARI INDRA', role: 'Anggota Bidang Organisasi', category: 'BIDANG', division: 'BIDANG ORGANISASI DAN KELEMBAGAAN', sortOrder: 24, status: 'ACTIVE', showPhoto: true, photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80' },

  // BIDANG 2: BIDANG PENDIDIKAN, PENELITIAN DAN PENGEMBANGAN
  { id: 'm-b2-1', name: 'BUDI MULYADI', role: 'Ketua Bidang Pendidikan & Litbang', category: 'BIDANG', division: 'BIDANG PENDIDIKAN, PENELITIAN DAN PENGEMBANGAN', isLeader: true, sortOrder: 25, status: 'ACTIVE', showPhoto: true, photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&auto=format&fit=crop&q=80' },
  { id: 'm-b2-2', name: 'CICI FITRIANI', role: 'Anggota Bidang Pendidikan & Litbang', category: 'BIDANG', division: 'BIDANG PENDIDIKAN, PENELITIAN DAN PENGEMBANGAN', sortOrder: 26, status: 'ACTIVE', showPhoto: true, photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80' },
  { id: 'm-b2-3', name: 'RAFLI ARIESTA', role: 'Anggota Bidang Pendidikan & Litbang', category: 'BIDANG', division: 'BIDANG PENDIDIKAN, PENELITIAN DAN PENGEMBANGAN', sortOrder: 27, status: 'ACTIVE', showPhoto: true, photo: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&auto=format&fit=crop&q=80' },

  // BIDANG 3: BIDANG OLAHRAGA DAN KESENIAN
  { id: 'm-b3-1', name: 'DADAN DANDY', role: 'Ketua Bidang Olahraga & Kesenian', category: 'BIDANG', division: 'BIDANG OLAHRAGA DAN KESENIAN', isLeader: true, sortOrder: 28, status: 'ACTIVE', showPhoto: true, photo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&auto=format&fit=crop&q=80' },
  { id: 'm-b3-2', name: 'MUHAMAD JAMIL', role: 'Anggota Bidang Olahraga & Kesenian', category: 'BIDANG', division: 'BIDANG OLAHRAGA DAN KESENIAN', sortOrder: 29, status: 'ACTIVE', showPhoto: true, photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80' },
  { id: 'm-b3-3', name: 'YARI ARDIANSYAH', role: 'Anggota Bidang Olahraga & Kesenian', category: 'BIDANG', division: 'BIDANG OLAHRAGA DAN KESENIAN', sortOrder: 30, status: 'ACTIVE', showPhoto: true, photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&auto=format&fit=crop&q=80' },

  // BIDANG 4: BIDANG HUMAS, PUBLIKASI DAN MEDIA INFORMASI (SITI NUROHMAH SWAPPED HERE)
  { id: 'm-b4-1', name: 'TAUFIK RAHMAN', role: 'Ketua Bidang Humas, Publikasi & Media', category: 'BIDANG', division: 'BIDANG HUMAS, PUBLIKASI DAN MEDIA INFORMASI', isLeader: true, sortOrder: 31, status: 'ACTIVE', showPhoto: true, photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80' },
  { id: 'm-b4-2', name: 'AHMAD ROSIDIN', role: 'Anggota Bidang Humas & Media', category: 'BIDANG', division: 'BIDANG HUMAS, PUBLIKASI DAN MEDIA INFORMASI', sortOrder: 32, status: 'ACTIVE', showPhoto: true, photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80' },
  { id: 'm-b4-3', name: 'WILHAM RIFQI RIFALDY', role: 'Anggota Bidang Humas & Media', category: 'BIDANG', division: 'BIDANG HUMAS, PUBLIKASI DAN MEDIA INFORMASI', sortOrder: 33, status: 'ACTIVE', showPhoto: true, photo: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&auto=format&fit=crop&q=80' },
  { id: 'm-b4-4', name: 'SITI NUROHMAH', role: 'Anggota Bidang Humas & Media', category: 'BIDANG', division: 'BIDANG HUMAS, PUBLIKASI DAN MEDIA INFORMASI', sortOrder: 34, status: 'ACTIVE', showPhoto: true, photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80' },

  // BIDANG 5: BIDANG PENGEMBANGAN PEMBERDAYAAN SUMBER DAYA DAN KESEJAHTERAAN SOSIAL
  { id: 'm-b5-1', name: 'HERI SAEPUDIN', role: 'Ketua Bidang Pemberdayaan SDM & Kesra', category: 'BIDANG', division: 'BIDANG PENGEMBANGAN PEMBERDAYAAN SUMBER DAYA DAN KESEJAHTERAAN SOSIAL', isLeader: true, sortOrder: 35, status: 'ACTIVE', showPhoto: true, photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80' },
  { id: 'm-b5-2', name: "SANI NUR'AISYIYYAH", role: 'Anggota Bidang Pemberdayaan SDM & Kesra', category: 'BIDANG', division: 'BIDANG PENGEMBANGAN PEMBERDAYAAN SUMBER DAYA DAN KESEJAHTERAAN SOSIAL', sortOrder: 36, status: 'ACTIVE', showPhoto: true, photo: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&auto=format&fit=crop&q=80' },
  { id: 'm-b5-3', name: 'ASEP MUHIDIN', role: 'Anggota Bidang Pemberdayaan SDM & Kesra', category: 'BIDANG', division: 'BIDANG PENGEMBANGAN PEMBERDAYAAN SUMBER DAYA DAN KESEJAHTERAAN SOSIAL', sortOrder: 37, status: 'ACTIVE', showPhoto: true, photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&auto=format&fit=crop&q=80' },

  // BIDANG 6: BIDANG USAHA EKONOMI PRODUKTIF
  { id: 'm-b6-1', name: 'LUKMAN HAKIM', role: 'Ketua Bidang Usaha Ekonomi Produktif', category: 'BIDANG', division: 'BIDANG USAHA EKONOMI PRODUKTIF', isLeader: true, sortOrder: 38, status: 'ACTIVE', showPhoto: true, photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80' },
  { id: 'm-b6-2', name: 'CEP DIK DIK P. T', role: 'Anggota Bidang UEP', category: 'BIDANG', division: 'BIDANG USAHA EKONOMI PRODUKTIF', sortOrder: 39, status: 'ACTIVE', showPhoto: true, photo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&auto=format&fit=crop&q=80' },
  { id: 'm-b6-3', name: 'AYI SAEPUDIN', role: 'Anggota Bidang UEP', category: 'BIDANG', division: 'BIDANG USAHA EKONOMI PRODUKTIF', sortOrder: 40, status: 'ACTIVE', showPhoto: true, photo: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&auto=format&fit=crop&q=80' },

  // BIDANG 7: BIDANG LINGKUNGAN HIDUP DAN KEPARIWISATAAN (LISTA AMALIA SWAPPED HERE)
  { id: 'm-b7-1', name: 'BUDI BURHANUDIN', role: 'Ketua Bidang Lingkungan Hidup & Pariwisata', category: 'BIDANG', division: 'BIDANG LINGKUNGAN HIDUP DAN KEPARIWISATAAN', isLeader: true, sortOrder: 41, status: 'ACTIVE', showPhoto: true, photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&auto=format&fit=crop&q=80' },
  { id: 'm-b7-2', name: 'D.J. YUSUP', role: 'Anggota Bidang Lingkungan Hidup & Pariwisata', category: 'BIDANG', division: 'BIDANG LINGKUNGAN HIDUP DAN KEPARIWISATAAN', sortOrder: 42, status: 'ACTIVE', showPhoto: true, photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80' },
  { id: 'm-b7-3', name: 'YUDA MAULANA', role: 'Anggota Bidang Lingkungan Hidup & Pariwisata', category: 'BIDANG', division: 'BIDANG LINGKUNGAN HIDUP DAN KEPARIWISATAAN', sortOrder: 43, status: 'ACTIVE', showPhoto: true, photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80' },
  { id: 'm-b7-4', name: 'LISTA AMALIA', role: 'Anggota Bidang Lingkungan Hidup & Pariwisata', category: 'BIDANG', division: 'BIDANG LINGKUNGAN HIDUP DAN KEPARIWISATAAN', sortOrder: 44, status: 'ACTIVE', showPhoto: true, photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop&q=80' },

  // BIDANG 8: BIDANG KERJASAMA KEMITRAAN DENGAN PEMERINTAHAN PSKS DAN BADAN USAHA
  { id: 'm-b8-1', name: 'IWAN SETIAWAN', role: 'Ketua Bidang Kerjasama Kemitraan', category: 'BIDANG', division: 'BIDANG KERJASAMA KEMITRAAN DENGAN PEMERINTAHAN PSKS DAN BADAN USAHA', isLeader: true, sortOrder: 45, status: 'ACTIVE', showPhoto: true, photo: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&auto=format&fit=crop&q=80' },
  { id: 'm-b8-2', name: 'NURIL AKBAR H', role: 'Anggota Bidang Kerjasama Kemitraan', category: 'BIDANG', division: 'BIDANG KERJASAMA KEMITRAAN DENGAN PEMERINTAHAN PSKS DAN BADAN USAHA', sortOrder: 46, status: 'ACTIVE', showPhoto: true, photo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&auto=format&fit=crop&q=80' },
  { id: 'm-b8-3', name: 'UJANG SAEPULOH', role: 'Anggota Bidang Kerjasama Kemitraan', category: 'BIDANG', division: 'BIDANG KERJASAMA KEMITRAAN DENGAN PEMERINTAHAN PSKS DAN BADAN USAHA', sortOrder: 47, status: 'ACTIVE', showPhoto: true, photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&auto=format&fit=crop&q=80' },
  { id: 'm-b8-4', name: 'AGUNG RIKARDO', role: 'Anggota Bidang Kerjasama Kemitraan', category: 'BIDANG', division: 'BIDANG KERJASAMA KEMITRAAN DENGAN PEMERINTAHAN PSKS DAN BADAN USAHA', sortOrder: 48, status: 'ACTIVE', showPhoto: true, photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80' },

  // BIDANG 9: BIDANG ADVOKASI, HUKUM DAN HAK ASASI MANUSIA
  { id: 'm-b9-1', name: 'IRWANDI HADIANSYAH', role: 'Ketua Bidang Advokasi, Hukum & HAM', category: 'BIDANG', division: 'BIDANG ADVOKASI, HUKUM DAN HAK ASASI MANUSIA', isLeader: true, sortOrder: 49, status: 'ACTIVE', showPhoto: true, photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80' },
  { id: 'm-b9-2', name: 'GIAN PERMANA PUTRA', role: 'Anggota Bidang Advokasi & Hukum', category: 'BIDANG', division: 'BIDANG ADVOKASI, HUKUM DAN HAK ASASI MANUSIA', sortOrder: 50, status: 'ACTIVE', showPhoto: true, photo: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&auto=format&fit=crop&q=80' },
  { id: 'm-b9-3', name: 'POPO SAPRUDIN', role: 'Anggota Bidang Advokasi & Hukum', category: 'BIDANG', division: 'BIDANG ADVOKASI, HUKUM DAN HAK ASASI MANUSIA', sortOrder: 51, status: 'ACTIVE', showPhoto: true, photo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&auto=format&fit=crop&q=80' },

  // BIDANG 10: BIDANG KEROHANIAN DAN PEMBINAAN MENTAL
  { id: 'm-b10-1', name: 'OBI SALAM', role: 'Ketua Bidang Kerohanian & Pembinaan Mental', category: 'BIDANG', division: 'BIDANG KEROHANIAN DAN PEMBINAAN MENTAL', isLeader: true, sortOrder: 52, status: 'ACTIVE', showPhoto: true, photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&auto=format&fit=crop&q=80' },
  { id: 'm-b10-2', name: 'MISBAHUL MUNIR', role: 'Anggota Bidang Kerohanian & Pembinaan Mental', category: 'BIDANG', division: 'BIDANG KEROHANIAN DAN PEMBINAAN MENTAL', sortOrder: 53, status: 'ACTIVE', showPhoto: true, photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80' }
];

export const SEED_DRIVERS: GrabDriver[] = [
  {
    id: 'drv-1',
    driverCode: 'KT-DRV-001',
    name: 'Asep Ridwan',
    memberId: 'KT-CKC-2024-089',
    whatsapp: '0895632180100',
    photo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&auto=format&fit=crop&q=80',
    vehicleType: 'Motor (Scooter)',
    vehicleBrand: 'Honda Vario 160',
    plateNumber: 'D 4582 ZCJ',
    vehicleColor: 'Hitam Metallic',
    rating: 4.9,
    totalTrips: 142,
    isOnline: true,
    isAvailable: true,
    village: 'Desa Cikancung',
    currentLat: -7.0195,
    currentLng: 107.8105
  }
];

export const SEED_DRIVER_APPLICATIONS: GrabDriverApplication[] = [
  {
    id: 'app-101',
    applicantName: 'Taufik Hidayat',
    memberId: 'KT-CKC-2026-204',
    whatsapp: '0895632180100',
    address: 'Jl. Raya Cihanyir No. 42 RT 02/05',
    village: 'Desa Cihanyir',
    ktpNumber: '3204151204980003',
    simNumber: '981204150042',
    vehicleType: 'Motor (Scooter)',
    vehicleBrand: 'Honda Beat Street 2024',
    vehicleColor: 'Hitam Dof',
    vehicleYear: '2024',
    plateNumber: 'D 5912 ZCK',
    ktpPhoto: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&auto=format&fit=crop&q=80',
    simPhoto: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&auto=format&fit=crop&q=80',
    vehiclePhoto: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=600&auto=format&fit=crop&q=80',
    status: 'WAITING_VERIFICATION',
    createdAt: '18 Agustus 2026'
  }
];

export const SEED_ORDERS: GrabOrder[] = [
  {
    id: 'ord-1',
    orderCode: 'GKT-20260818-001',
    customerName: 'Ibu Ratna',
    customerPhone: '0895632180100',
    pickupName: 'Pasar Tradisional Ciluluk',
    pickupLat: -7.0120,
    pickupLng: 107.8050,
    destinationName: 'Alun-Alun Kecamatan Cikancung',
    destinationLat: -7.0195,
    destinationLng: 107.8105,
    distanceKm: 2.4,
    baseFare: 5000,
    distanceFare: 7200,
    serviceFee: 2000,
    totalFare: 14200,
    paymentMethod: 'CASH',
    paymentStatus: 'PAID',
    orderStatus: 'TRIP_COMPLETED',
    driverId: 'drv-1',
    driverName: 'Asep Ridwan',
    driverPhone: '0895632180100',
    driverPlate: 'D 4582 ZCJ',
    driverVehicle: 'Honda Vario 160',
    createdAt: '18 Agustus 2026 14:20 WIB',
    rating: 5,
    review: 'Driver sangat ramah, motor bersih dan membawa helm cadangan yang wangi.'
  }
];

export const SEED_TARIFF: GrabTariff = {
  baseFare: 5000,
  pricePerKm: 3000,
  serviceFee: 2000,
  minFare: 8000
};

export const SEED_SETTINGS: SiteSettings = {
  logoUrl: '',
  instagramUsername: 'karta.kec.cikancung',
  instagramUrl: 'https://www.instagram.com/karta.kec.cikancung/',
  facebookUrl: 'https://facebook.com/karta.kec.cikancung',
  tiktokUrl: 'https://tiktok.com/@karta.kec.cikancung',
  youtubeUrl: 'https://youtube.com/@KarangTarunaCikancung',
  whatsappNumber: '62895632180100',
  email: 'pktkeccikancung@gmail.com',
  address: 'Jl. Raya Cikancung No. 01, Kantor Kecamatan Cikancung, Kabupaten Bandung, Jawa Barat 40396',
  heroHeadline: 'Karang Taruna Kecamatan Cikancung',
  heroSubheadline: 'Bersama Pemuda, Bergerak, Berkarya, dan Membangun Cikancung.',
  aboutText: 'Karang Taruna Kecamatan Cikancung merupakan wadah generasi muda untuk berorganisasi, berkarya, berkontribusi kepada masyarakat, serta ikut mendukung pembangunan sosial dan ekonomi di wilayah Kecamatan Cikancung, Kabupaten Bandung.',
  visi: 'Terwujudnya Generasi Muda Kecamatan Cikancung yang Mandiri, Berkarakter, Inovatif, Social-Oriented, dan Berdaya Saing Tinggi demi Terciptanya Masyarakat Sejahtera.',
  misi: [
    'Menyelenggarakan kegiatan pembinaan dan pengembangan potensi kepemudaan di 9 Desa se-Kecamatan Cikancung.',
    'Mendorong kemandirian ekonomi pemuda melalui program UMKM Binaan dan inovasi digital Grab KT.',
    'Mempererat nilai gotong royong, kepedulian sosial, dan tanggap bencana di tengah masyarakat.',
    'Menjalin kolaborasi strategis dengan Pemerintah Kecamatan Cikancung, Tokoh Masyarakat, serta Sektor Swasta.'
  ]
};

// ------------ DATA STORE CLASS WITH LOCALSTORAGE INTEGRATION ------------

export class DataStore {
  private static STORAGE_PREFIX = 'kartabacip_db_v10_';

  private static getItem<T>(key: string, fallback: T): T {
    if (typeof window === 'undefined') return fallback;
    try {
      const item = localStorage.getItem(this.STORAGE_PREFIX + key);
      return item ? JSON.parse(item) : fallback;
    } catch {
      return fallback;
    }
  }

  private static setItem<T>(key: string, value: T): void {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(this.STORAGE_PREFIX + key, JSON.stringify(value));
    } catch (e) {
      console.error('Error writing to local storage', e);
    }
  }

  // Instagram Posts
  static getInstagramPosts(): InstagramPost[] {
    return this.getItem('instagram', SEED_INSTAGRAM);
  }
  static saveInstagramPosts(posts: InstagramPost[]) {
    this.setItem('instagram', posts);
  }
  static addInstagramPost(post: Omit<InstagramPost, 'id'>): InstagramPost {
    const list = this.getInstagramPosts();
    const newPost: InstagramPost = {
      ...post,
      id: 'ig-' + Date.now()
    };
    list.unshift(newPost);
    this.saveInstagramPosts(list);
    return newPost;
  }
  static updateInstagramPost(id: string, updated: Partial<InstagramPost>) {
    const list = this.getInstagramPosts().map(p => p.id === id ? { ...p, ...updated } : p);
    this.saveInstagramPosts(list);
  }
  static deleteInstagramPost(id: string) {
    const list = this.getInstagramPosts().filter(p => p.id !== id);
    this.saveInstagramPosts(list);
  }

  // News
  static getNews(): NewsArticle[] {
    return this.getItem('news', SEED_NEWS);
  }
  static saveNews(news: NewsArticle[]) {
    this.setItem('news', news);
  }
  static addNews(article: Omit<NewsArticle, 'id' | 'views'>): NewsArticle {
    const list = this.getNews();
    const newArticle: NewsArticle = {
      ...article,
      id: 'n-' + Date.now(),
      views: 1
    };
    list.unshift(newArticle);
    this.saveNews(list);
    return newArticle;
  }
  static updateNews(id: string, updated: Partial<NewsArticle>) {
    const list = this.getNews().map(n => n.id === id ? { ...n, ...updated } : n);
    this.saveNews(list);
  }
  static deleteNews(id: string) {
    const list = this.getNews().filter(n => n.id !== id);
    this.saveNews(list);
  }

  // Agendas
  static getAgendas(): AgendaItem[] {
    return this.getItem('agendas', SEED_AGENDAS);
  }
  static saveAgendas(agendas: AgendaItem[]) {
    this.setItem('agendas', agendas);
  }
  static addAgenda(item: Omit<AgendaItem, 'id'>): AgendaItem {
    const list = this.getAgendas();
    const newItem: AgendaItem = {
      ...item,
      id: 'ag-' + Date.now()
    };
    list.unshift(newItem);
    this.saveAgendas(list);
    return newItem;
  }
  static updateAgenda(id: string, updated: Partial<AgendaItem>) {
    const list = this.getAgendas().map(a => a.id === id ? { ...a, ...updated } : a);
    this.saveAgendas(list);
  }
  static deleteAgenda(id: string) {
    const list = this.getAgendas().filter(a => a.id !== id);
    this.saveAgendas(list);
  }

  // Announcements
  static getAnnouncements(): AnnouncementItem[] {
    return this.getItem('announcements', SEED_ANNOUNCEMENTS);
  }
  static saveAnnouncements(list: AnnouncementItem[]) {
    this.setItem('announcements', list);
  }
  static addAnnouncement(item: Omit<AnnouncementItem, 'id'>): AnnouncementItem {
    const list = this.getAnnouncements();
    const newItem: AnnouncementItem = {
      ...item,
      id: 'anc-' + Date.now()
    };
    list.unshift(newItem);
    this.saveAnnouncements(list);
    return newItem;
  }
  static updateAnnouncement(id: string, updated: Partial<AnnouncementItem>) {
    const list = this.getAnnouncements().map(a => a.id === id ? { ...a, ...updated } : a);
    this.saveAnnouncements(list);
  }
  static deleteAnnouncement(id: string) {
    const list = this.getAnnouncements().filter(a => a.id !== id);
    this.saveAnnouncements(list);
  }

  // Gallery
  static getGallery(): GalleryItem[] {
    return this.getItem('gallery', SEED_GALLERY);
  }
  static saveGallery(items: GalleryItem[]) {
    this.setItem('gallery', items);
  }
  static addGallery(item: Omit<GalleryItem, 'id'>): GalleryItem {
    const list = this.getGallery();
    const newItem: GalleryItem = {
      ...item,
      id: 'gal-' + Date.now()
    };
    list.unshift(newItem);
    this.saveGallery(list);
    return newItem;
  }
  static updateGallery(id: string, updated: Partial<GalleryItem>) {
    const list = this.getGallery().map(g => g.id === id ? { ...g, ...updated } : g);
    this.saveGallery(list);
  }
  static deleteGallery(id: string) {
    const list = this.getGallery().filter(g => g.id !== id);
    this.saveGallery(list);
  }

  // Org Members
  static getMembers(): OrgMember[] {
    return this.getItem('members', SEED_MEMBERS);
  }
  static saveMembers(members: OrgMember[]) {
    this.setItem('members', members);
  }
  static addMember(member: Omit<OrgMember, 'id' | 'createdAt'>): OrgMember {
    const members = this.getMembers();
    const newMember: OrgMember = {
      ...member,
      id: 'm-' + Date.now(),
      createdAt: new Date().toISOString()
    };
    members.push(newMember);
    this.saveMembers(members);
    return newMember;
  }
  static updateMember(id: string, updated: Partial<OrgMember>) {
    const members = this.getMembers().map(m => m.id === id ? { ...m, ...updated } : m);
    this.saveMembers(members);
  }
  static deleteMember(id: string) {
    const members = this.getMembers().filter(m => m.id !== id);
    this.saveMembers(members);
  }

  // Complaints
  static getComplaints(): ComplaintRecord[] {
    return this.getItem('complaints', []);
  }
  static addComplaint(complaint: Omit<ComplaintRecord, 'id' | 'ticketNumber' | 'createdAt' | 'status'>): ComplaintRecord {
    const list = this.getComplaints();
    const newRecord: ComplaintRecord = {
      ...complaint,
      id: 'cmp-' + Date.now(),
      ticketNumber: 'PGD-CKC-' + Math.floor(100000 + Math.random() * 900000),
      status: 'PENDING',
      createdAt: new Date().toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' })
    };
    list.unshift(newRecord);
    this.setItem('complaints', list);
    return newRecord;
  }
  static updateComplaintStatus(id: string, status: ComplaintRecord['status']) {
    const list = this.getComplaints().map(c => c.id === id ? { ...c, status } : c);
    this.setItem('complaints', list);
  }
  static deleteComplaint(id: string) {
    const list = this.getComplaints().filter(c => c.id !== id);
    this.setItem('complaints', list);
  }

  // Grab KT Tariff
  static getTariff(): GrabTariff {
    return this.getItem('tariff', SEED_TARIFF);
  }
  static saveTariff(tariff: GrabTariff) {
    this.setItem('tariff', tariff);
  }

  // Grab Drivers & Driver Applications
  static getDrivers(): GrabDriver[] {
    return this.getItem('drivers', SEED_DRIVERS);
  }
  static saveDrivers(drivers: GrabDriver[]) {
    this.setItem('drivers', drivers);
  }

  static getDriverApplications(): GrabDriverApplication[] {
    return this.getItem('driver_applications', SEED_DRIVER_APPLICATIONS);
  }
  static addDriverApplication(app: Omit<GrabDriverApplication, 'id' | 'status' | 'createdAt'>): GrabDriverApplication {
    const list = this.getDriverApplications();
    const newApp: GrabDriverApplication = {
      ...app,
      id: 'app-' + Date.now(),
      status: 'WAITING_VERIFICATION',
      createdAt: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })
    };
    list.unshift(newApp);
    this.setItem('driver_applications', list);
    return newApp;
  }
  static verifyDriverApplication(appId: string, approved: boolean, rejectionReason?: string) {
    const apps = this.getDriverApplications();
    const appIndex = apps.findIndex(a => a.id === appId);
    if (appIndex === -1) return;

    if (approved) {
      apps[appIndex].status = 'APPROVED';
      const targetApp = apps[appIndex];
      const drivers = this.getDrivers();
      const newDriver: GrabDriver = {
        id: 'drv-' + Date.now(),
        driverCode: 'KT-DRV-' + String(drivers.length + 1).padStart(3, '0'),
        name: targetApp.applicantName,
        memberId: targetApp.memberId,
        whatsapp: targetApp.whatsapp,
        photo: targetApp.ktpPhoto || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
        vehicleType: targetApp.vehicleType,
        vehicleBrand: targetApp.vehicleBrand,
        plateNumber: targetApp.plateNumber,
        vehicleColor: targetApp.vehicleColor,
        rating: 5.0,
        totalTrips: 0,
        isOnline: true,
        isAvailable: true,
        village: targetApp.village,
        currentLat: -7.0195,
        currentLng: 107.8105
      };
      drivers.unshift(newDriver);
      this.saveDrivers(drivers);
    } else {
      apps[appIndex].status = 'REJECTED';
      apps[appIndex].rejectionReason = rejectionReason || 'Dokumen belum memenuhi kualifikasi persyaratan.';
    }
    this.setItem('driver_applications', apps);
  }

  // Grab Orders
  static getOrders(): GrabOrder[] {
    return this.getItem('orders', SEED_ORDERS);
  }
  static saveOrders(orders: GrabOrder[]) {
    this.setItem('orders', orders);
  }
  static createOrder(orderData: Omit<GrabOrder, 'id' | 'orderCode' | 'orderStatus' | 'paymentStatus' | 'createdAt'>): GrabOrder {
    const list = this.getOrders();
    const newOrder: GrabOrder = {
      ...orderData,
      id: 'ord-' + Date.now(),
      orderCode: 'GKT-' + new Date().toISOString().slice(0, 10).replace(/-/g, '') + '-' + String(Math.floor(100 + Math.random() * 900)),
      orderStatus: 'SEARCHING_DRIVER',
      paymentStatus: 'PENDING',
      createdAt: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) + ' ' + new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
    };
    list.unshift(newOrder);
    this.saveOrders(list);
    return newOrder;
  }

  // Settings
  static getSettings(): SiteSettings {
    return this.getItem('settings', SEED_SETTINGS);
  }
  static saveSettings(settings: SiteSettings) {
    this.setItem('settings', settings);
  }

  // Admin Session
  static getAdminSession(): boolean {
    return this.getItem('admin_logged_in', false);
  }
  static setAdminSession(status: boolean) {
    this.setItem('admin_logged_in', status);
  }
}
