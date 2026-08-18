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

export interface OrgMember {
  id: string;
  name: string;
  role: string;
  division?: string;
  photo: string;
  phone?: string;
  village: string;
  order: number;
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
  memberId: string; // ID Anggota KT Cikancung
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
    instagramUrl: 'https://instagram.com/p/CikancungYouthCleanUp2026',
    thumbnail: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&auto=format&fit=crop&q=80',
    caption: 'Aksi Bersih Lingkungan & Penanaman 1.000 Pohon oleh Karang Taruna Kecamatan Cikancung bersama 9 Desa binaan! Pemuda bergerak, bumi lestari 🌱💚 #KarangTarunaCikancung #PemudaCikancung #KabupatenBandung',
    date: '15 Agustus 2026',
    likes: 428,
    comments: 34,
    category: 'Lingkungan'
  },
  {
    id: 'ig-2',
    instagramUrl: 'https://instagram.com/p/TurnamenFutsalPemudaCikancung',
    thumbnail: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&auto=format&fit=crop&q=80',
    caption: 'Pembukaan Turnamen Futsal Karang Taruna Cup 2026 se-Kecamatan Cikancung! Junjung tinggi sportifitas dan pererat silaturahmi pemuda! ⚽🏆',
    date: '10 Agustus 2026',
    likes: 612,
    comments: 56,
    category: 'Olahraga'
  },
  {
    id: 'ig-3',
    instagramUrl: 'https://instagram.com/p/PelatihanDigitalUMKMCikancung',
    thumbnail: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&auto=format&fit=crop&q=80',
    caption: 'Workshop Digital Marketing & Onboarding Ecommerce gratis untuk pelaku UMKM muda Cikancung. Dorong kemandirian ekonomi desa! 🚀💼',
    date: '02 Agustus 2026',
    likes: 389,
    comments: 19,
    category: 'UMKM'
  },
  {
    id: 'ig-4',
    instagramUrl: 'https://instagram.com/p/BaktiSosialKesehatanCikancung',
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
    instagramLink: 'https://instagram.com/p/CikancungYouthCleanUp2026',
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
  {
    id: 'm-1',
    name: 'Ahmad Fauzi, S.Pd.',
    role: 'Ketua Karang Taruna Kecamatan Cikancung',
    photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
    phone: '0812-3456-7890',
    village: 'Desa Cikancung',
    order: 1
  },
  {
    id: 'm-2',
    name: 'Rian Hidayat, S.ST.',
    role: 'Wakil Ketua I (Bidang Organisasi & Kaderisasi)',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80',
    phone: '0813-9876-5432',
    village: 'Desa Cihanyir',
    order: 2
  },
  {
    id: 'm-3',
    name: 'Siti Nurhaliza, S.Kom.',
    role: 'Sekretaris Umum',
    photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80',
    phone: '0857-1122-3344',
    village: 'Desa Ciluluk',
    order: 3
  },
  {
    id: 'm-4',
    name: 'Dewi Lestari, S.E.',
    role: 'Bendahara Umum',
    photo: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&auto=format&fit=crop&q=80',
    phone: '0821-4455-6677',
    village: 'Desa Mandalasari',
    order: 4
  },
  {
    id: 'm-5',
    name: 'Dadan Ramdani',
    role: 'Koordinator Divisi Usaha Kesejahteraan Sosial (UKS)',
    division: 'Kesejahteraan Sosial',
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80',
    village: 'Desa Hegarmanah',
    order: 5
  },
  {
    id: 'm-6',
    name: 'Budi Santoso',
    role: 'Koordinator Divisi Pemuda, Olahraga & Seni Budaya',
    division: 'Olahraga & Seni',
    photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&auto=format&fit=crop&q=80',
    village: 'Desa Mekarlaksana',
    order: 6
  },
  {
    id: 'm-7',
    name: 'Agus Setiawan',
    role: 'Koordinator Divisi Pengembangan Ekonomi & Grab KT',
    division: 'Ekonomi & Grab KT',
    photo: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&auto=format&fit=crop&q=80',
    village: 'Desa Srirahayu',
    order: 7
  }
];

export const SEED_DRIVERS: GrabDriver[] = [
  {
    id: 'drv-1',
    driverCode: 'KT-DRV-001',
    name: 'Asep Ridwan',
    memberId: 'KT-CKC-2024-089',
    whatsapp: '0812-9988-7711',
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
  },
  {
    id: 'drv-2',
    driverCode: 'KT-DRV-002',
    name: 'Cecep Kurnia',
    memberId: 'KT-CKC-2025-112',
    whatsapp: '0857-4433-2211',
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80',
    vehicleType: 'Motor (Bebek/Sport)',
    vehicleBrand: 'Yamaha NMAX 155',
    plateNumber: 'D 3190 ZCA',
    vehicleColor: 'Matte Grey',
    rating: 4.8,
    totalTrips: 98,
    isOnline: true,
    isAvailable: true,
    village: 'Desa Cihanyir',
    currentLat: -7.0250,
    currentLng: 107.8220
  },
  {
    id: 'drv-3',
    driverCode: 'KT-DRV-003',
    name: 'Yudi Gunawan',
    memberId: 'KT-CKC-2024-045',
    whatsapp: '0813-5566-7788',
    photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&auto=format&fit=crop&q=80',
    vehicleType: 'Mobil (MPV/Sedan)',
    vehicleBrand: 'Daihatsu Sigra',
    plateNumber: 'D 1842 ZCB',
    vehicleColor: 'Putih Silver',
    rating: 5.0,
    totalTrips: 64,
    isOnline: false,
    isAvailable: true,
    village: 'Desa Ciluluk',
    currentLat: -7.0120,
    currentLng: 107.8050
  }
];

export const SEED_DRIVER_APPLICATIONS: GrabDriverApplication[] = [
  {
    id: 'app-101',
    applicantName: 'Taufik Hidayat',
    memberId: 'KT-CKC-2026-204',
    whatsapp: '0896-1234-5678',
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
    customerPhone: '0812-7766-5544',
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
    driverPhone: '0812-9988-7711',
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
  instagramUsername: 'kartabacip',
  instagramUrl: 'https://instagram.com/kartabacip',
  facebookUrl: 'https://facebook.com/kartabacip',
  tiktokUrl: 'https://tiktok.com/@kartabacip',
  youtubeUrl: 'https://youtube.com/@KarangTarunaCikancung',
  whatsappNumber: '6281234567890',
  email: 'info@kartabacip.or.id',
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
  private static STORAGE_PREFIX = 'kartabacip_db_v1_';

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

  // News
  static getNews(): NewsArticle[] {
    return this.getItem('news', SEED_NEWS);
  }
  static saveNews(news: NewsArticle[]) {
    this.setItem('news', news);
  }

  // Agendas
  static getAgendas(): AgendaItem[] {
    return this.getItem('agendas', SEED_AGENDAS);
  }
  static saveAgendas(agendas: AgendaItem[]) {
    this.setItem('agendas', agendas);
  }

  // Announcements
  static getAnnouncements(): AnnouncementItem[] {
    return this.getItem('announcements', SEED_ANNOUNCEMENTS);
  }
  static saveAnnouncements(list: AnnouncementItem[]) {
    this.setItem('announcements', list);
  }

  // Gallery
  static getGallery(): GalleryItem[] {
    return this.getItem('gallery', SEED_GALLERY);
  }
  static saveGallery(items: GalleryItem[]) {
    this.setItem('gallery', items);
  }

  // Org Members
  static getMembers(): OrgMember[] {
    return this.getItem('members', SEED_MEMBERS);
  }
  static saveMembers(members: OrgMember[]) {
    this.setItem('members', members);
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
      // Create active driver
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
