import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const igUrl = searchParams.get('url');

  if (!igUrl) {
    return NextResponse.json({ error: 'URL Instagram wajib disertakan' }, { status: 400 });
  }

  // Extract shortcode
  const match = igUrl.match(/instagram\.com\/(?:p|reel|tv)\/([^/?#&]+)/i);
  const shortcode = match ? match[1] : null;

  if (!shortcode) {
    return NextResponse.json({ error: 'Format link Instagram tidak valid' }, { status: 400 });
  }

  // 1. Direct high-res Instagram media URL endpoint
  const directMediaUrl = `https://www.instagram.com/p/${shortcode}/media/?size=l`;

  try {
    // 2. Fetch oEmbed metadata from noembed / Instagram oEmbed API
    const response = await fetch(`https://noembed.com/embed?url=${encodeURIComponent(igUrl)}`, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      },
      next: { revalidate: 3600 }
    });

    if (response.ok) {
      const data = await response.json();
      
      const title = data.title || '';
      const author = data.author_name || 'karta.kec.cikancung';
      const thumbnail = data.thumbnail_url || directMediaUrl;

      // Extract date if available or format nicely
      const dateStr = new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });

      // Detect category tag from title
      let category = 'Kepemudaan';
      const lower = title.toLowerCase();
      if (lower.includes('bersih') || lower.includes('pohon') || lower.includes('alam') || lower.includes('lingkungan')) {
        category = 'Lingkungan';
      } else if (lower.includes('futsal') || lower.includes('bola') || lower.includes('sport') || lower.includes('turnamen')) {
        category = 'Olahraga';
      } else if (lower.includes('umkm') || lower.includes('usaha') || lower.includes('kopi') || lower.includes('bisnis')) {
        category = 'UMKM';
      } else if (lower.includes('sosial') || lower.includes('donor') || lower.includes('lansia') || lower.includes('bantuan')) {
        category = 'Sosial';
      } else if (lower.includes('hut') || lower.includes('pancasila') || lower.includes('phbn') || lower.includes('kemerdekaan')) {
        category = 'PHBN';
      }

      return NextResponse.json({
        success: true,
        shortcode,
        thumbnail: thumbnail,
        caption: title || `Postingan resmi @${author} di Instagram`,
        author: author,
        category,
        date: dateStr
      });
    }
  } catch (err) {
    console.error('Error fetching IG metadata:', err);
  }

  // Fallback to direct Instagram media endpoint
  return NextResponse.json({
    success: true,
    shortcode,
    thumbnail: directMediaUrl,
    caption: `Postingan resmi Karang Taruna Kecamatan Cikancung [ID: ${shortcode}]`,
    category: 'Kepemudaan',
    date: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })
  });
}
