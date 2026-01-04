/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://shopai.com.tr',
  generateRobotsTxt: true, // robots.txt oluşturur
  changefreq: 'daily',
  priority: 0.7,
  sitemapSize: 5000, // Büyük siteler için bölme
  exclude: ['/sepet', '/odeme', '/hesabim', '/admin/*'], // Hariç tutulacak sayfalar
  
  // Dinamik URL'ler için transform fonksiyonu
  transform: async (config, path) => {
    // Özel sayfalar için öncelik ayarlama
    if (path === '/') {
      return {
        loc: path,
        changefreq: 'daily',
        priority: 1.0,
        lastmod: new Date().toISOString(),
      };
    }
    
    if (path === '/urunler') {
      return {
        loc: path,
        changefreq: 'daily',
        priority: 0.9,
        lastmod: new Date().toISOString(),
      };
    }
    
    if (path.startsWith('/urunler/')) {
      return {
        loc: path,
        changefreq: 'weekly',
        priority: 0.8,
        lastmod: new Date().toISOString(),
      };
    }
    
    // Diğer sayfalar için varsayılan ayarlar
    return {
      loc: path,
      changefreq: config.changefreq,
      priority: config.priority,
      lastmod: new Date().toISOString(),
    };
  },
  
  // Dinamik URL'ler için ekstra ayarlar
  additionalPaths: async (config) => {
    // Burada veritabanından ürün URL'lerini çekip ekleyebilirsiniz
    const products = []; // Örnek: Veritabanından ürünleri çekin
    
    return products.map((product) => ({
      loc: `/urunler/${product.slug}`,
      changefreq: 'weekly',
      priority: 0.8,
      lastmod: new Date().toISOString(),
    }));
  },
};