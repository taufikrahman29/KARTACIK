import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://kartabacip.or.id';

  return [
    { url: baseUrl, lastModified: new Date() },
    { url: `${baseUrl}/profil`, lastModified: new Date() },
    { url: `${baseUrl}/berita`, lastModified: new Date() },
    { url: `${baseUrl}/agenda`, lastModified: new Date() },
    { url: `${baseUrl}/pengumuman`, lastModified: new Date() },
    { url: `${baseUrl}/galeri`, lastModified: new Date() },
    { url: `${baseUrl}/organisasi`, lastModified: new Date() },
    { url: `${baseUrl}/pengaduan`, lastModified: new Date() },
    { url: `${baseUrl}/grab-kt`, lastModified: new Date() },
    { url: `${baseUrl}/kontak`, lastModified: new Date() },
  ];
}
