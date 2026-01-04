/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  
  // URL Yeniden Yazma (Rewrites) - Türkçe URL'ler için
  async rewrites() {
    return [
      {
        source: '/urunler',
        destination: '/products',
      },
      {
        source: '/urunler/:slug',
        destination: '/products/:slug',
      },
      {
        source: '/stil-testi',
        destination: '/style-quiz',
      },
      {
        source: '/hakkimizda',
        destination: '/about',
      },
      {
        source: '/iletisim',
        destination: '/contact',
      },
      {
        source: '/sepet',
        destination: '/cart',
      },
      {
        source: '/odeme',
        destination: '/checkout',
      },
      {
        source: '/hesabim',
        destination: '/account',
      },
    ];
  },
  
  // Uluslararasılaştırma (i18n) - Türkçe varsayılan dil
  i18n: {
    locales: ['tr'],
    defaultLocale: 'tr',
  },
};

module.exports = nextConfig;