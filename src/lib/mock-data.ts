// Mock Data for AI-Powered E-Commerce Platform

export interface Product {
  id: string;
  title: string;
  slug: string;
  description: string;
  aiEnhancedDescription?: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  category: string;
  subcategory: string;
  brand: string;
  images: string[];
  rating: number;
  reviewCount: number;
  inStock: boolean;
  stockCount: number;
  sizes: string[];
  colors: Array<{ name: string; hex: string }>;
  tags: string[];
  isNew: boolean;
  isSale: boolean;
  isTrending: boolean;
  features?: string[];
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  image: string;
  subcategories: string[];
  productCount: number;
}

export interface Review {
  id: string;
  productId: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  title: string;
  comment: string;
  date: string;
  helpful: number;
  verified: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  phone?: string;
  dateOfBirth?: string;
  addresses: Address[];
  createdAt: string;
}

export interface Address {
  id: string;
  fullName: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  phone: string;
  isDefault: boolean;
}

export interface Order {
  id: string;
  userId: string;
  status: 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
  items: OrderItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  tax: number;
  total: number;
  shippingAddress: Address;
  paymentMethod: string;
  orderDate: string;
  estimatedDelivery?: string;
  trackingNumber?: string;
}

export interface OrderItem {
  productId: string;
  productTitle: string;
  image: string;
  variant: {
    size: string;
    color: string;
  };
  quantity: number;
  price: number;
}

// Categories
export const categories: Category[] = [
  {
    id: 'cat-1',
    name: 'Men',
    slug: 'men',
    image: '/api/placeholder/400/300',
    subcategories: ['T-Shirts', 'Shirts', 'Pants', 'Jackets', 'Accessories'],
    productCount: 156
  },
  {
    id: 'cat-2',
    name: 'Women',
    slug: 'women',
    image: '/api/placeholder/400/300',
    subcategories: ['Tops', 'Dresses', 'Pants', 'Skirts', 'Jackets', 'Accessories'],
    productCount: 234
  },
  {
    id: 'cat-3',
    name: 'Kids',
    slug: 'kids',
    image: '/api/placeholder/400/300',
    subcategories: ['Boys', 'Girls', 'Toddlers', 'Accessories'],
    productCount: 89
  },
  {
    id: 'cat-4',
    name: 'Accessories',
    slug: 'accessories',
    image: '/api/placeholder/400/300',
    subcategories: ['Bags', 'Belts', 'Jewelry', 'Watches', 'Scarves'],
    productCount: 167
  },
  {
    id: 'cat-5',
    name: 'Shoes',
    slug: 'shoes',
    image: '/api/placeholder/400/300',
    subcategories: ['Sneakers', 'Boots', 'Sandals', 'Formal', 'Sports'],
    productCount: 203
  },
  {
    id: 'cat-6',
    name: 'Sale',
    slug: 'sale',
    image: '/api/placeholder/400/300',
    subcategories: ['All Sale', 'Under $50', 'Under $100'],
    productCount: 78
  }
];

// Products
export const products: Product[] = [
  {
    id: 'prod-1',
    title: 'Classic Cotton T-Shirt',
    slug: 'classic-cotton-tshirt',
    description: 'A premium quality cotton t-shirt perfect for everyday wear. Features a comfortable fit and durable fabric that lasts.',
    aiEnhancedDescription: 'Experience the perfect blend of comfort and style with this AI-optimized classic cotton t-shirt. Our smart design ensures optimal breathability and versatility for any occasion, from casual outings to smart-casual events.',
    price: 29.99,
    category: 'Men',
    subcategory: 'T-Shirts',
    brand: 'Essential',
    images: ['/api/placeholder/600/800', '/api/placeholder/600/800', '/api/placeholder/600/800', '/api/placeholder/600/800'],
    rating: 4.5,
    reviewCount: 234,
    inStock: true,
    stockCount: 45,
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'White', hex: '#FFFFFF' },
      { name: 'Black', hex: '#000000' },
      { name: 'Gray', hex: '#808080' },
      { name: 'Navy', hex: '#000080' }
    ],
    tags: ['casual', 'basic', 'comfortable', 'everyday'],
    isNew: false,
    isSale: false,
    isTrending: true,
    features: ['100% Cotton', 'Pre-shrunk', 'Machine washable', 'Breathable fabric']
  },
  {
    id: 'prod-2',
    title: 'Premium Denim Jacket',
    slug: 'premium-denim-jacket',
    description: 'Timeless denim jacket with modern styling. Features premium quality denim, comfortable lining, and multiple pockets.',
    aiEnhancedDescription: 'Elevate your wardrobe with this AI-curated premium denim jacket. Our algorithm selected the perfect weight and wash to ensure year-round comfort and timeless style that transcends seasonal trends.',
    price: 89.99,
    originalPrice: 119.99,
    discount: 25,
    category: 'Men',
    subcategory: 'Jackets',
    brand: 'Urban Style',
    images: ['/api/placeholder/600/800', '/api/placeholder/600/800', '/api/placeholder/600/800', '/api/placeholder/600/800'],
    rating: 4.8,
    reviewCount: 189,
    inStock: true,
    stockCount: 23,
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Light Wash', hex: '#87CEEB' },
      { name: 'Dark Wash', hex: '#191970' },
      { name: 'Black', hex: '#000000' }
    ],
    tags: ['denim', 'jacket', 'outerwear', 'premium'],
    isNew: true,
    isSale: true,
    isTrending: true,
    features: ['Premium denim', 'Comfortable lining', 'Multiple pockets', 'Durable construction']
  },
  {
    id: 'prod-3',
    title: 'Floral Print Summer Dress',
    slug: 'floral-print-summer-dress',
    description: 'Beautiful floral print dress perfect for summer. Lightweight fabric with flattering A-line silhouette.',
    aiEnhancedDescription: 'Step into summer elegance with this AI-designed floral masterpiece. Our pattern algorithms created a unique floral arrangement that complements your natural beauty while the A-line silhouette flatters every body type.',
    price: 54.99,
    category: 'Women',
    subcategory: 'Dresses',
    brand: 'Bloom',
    images: ['/api/placeholder/600/800', '/api/placeholder/600/800', '/api/placeholder/600/800', '/api/placeholder/600/800'],
    rating: 4.7,
    reviewCount: 156,
    inStock: true,
    stockCount: 34,
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Multi Floral', hex: '#FFB6C1' },
      { name: 'White Floral', hex: '#FFF0F5' }
    ],
    tags: ['dress', 'summer', 'floral', 'casual', 'elegant'],
    isNew: true,
    isSale: false,
    isTrending: true,
    features: ['Lightweight fabric', 'A-line silhouette', 'Breathable', 'Machine washable']
  },
  {
    id: 'prod-4',
    title: 'Leather Oxford Shoes',
    slug: 'leather-oxford-shoes',
    description: 'Classic leather oxford shoes with modern comfort technology. Perfect for formal occasions or smart casual wear.',
    aiEnhancedDescription: 'Experience the perfect fusion of classic elegance and modern comfort. Our AI-optimized sole technology provides all-day support while the premium leather ensures a sophisticated look that commands respect.',
    price: 129.99,
    category: 'Shoes',
    subcategory: 'Formal',
    brand: 'Classic Steps',
    images: ['/api/placeholder/600/800', '/api/placeholder/600/800', '/api/placeholder/600/800', '/api/placeholder/600/800'],
    rating: 4.9,
    reviewCount: 287,
    inStock: true,
    stockCount: 56,
    sizes: ['7', '8', '9', '10', '11', '12'],
    colors: [
      { name: 'Black', hex: '#000000' },
      { name: 'Brown', hex: '#8B4513' },
      { name: 'Tan', hex: '#D2B48C' }
    ],
    tags: ['formal', 'leather', 'oxford', 'classic', 'elegant'],
    isNew: false,
    isSale: false,
    isTrending: false,
    features: ['Premium leather', 'Comfort insole', 'Durable sole', 'Handcrafted']
  },
  {
    id: 'prod-5',
    title: 'Running Sneakers Pro',
    slug: 'running-sneakers-pro',
    description: 'High-performance running sneakers with advanced cushioning technology. Designed for serious runners.',
    aiEnhancedDescription: 'Unlock your full running potential with these AI-engineered sneakers. Our biomechanical analysis informed every design decision, from the responsive midsole to the breathable upper, ensuring optimal performance mile after mile.',
    price: 149.99,
    category: 'Shoes',
    subcategory: 'Sneakers',
    brand: 'Athletic Pro',
    images: ['/api/placeholder/600/800', '/api/placeholder/600/800', '/api/placeholder/600/800', '/api/placeholder/600/800'],
    rating: 4.6,
    reviewCount: 423,
    inStock: true,
    stockCount: 78,
    sizes: ['6', '7', '8', '9', '10', '11', '12'],
    colors: [
      { name: 'Black/Red', hex: '#FF0000' },
      { name: 'White/Blue', hex: '#0000FF' },
      { name: 'Gray/Orange', hex: '#FFA500' }
    ],
    tags: ['running', 'athletic', 'sneakers', 'performance', 'sports'],
    isNew: true,
    isSale: false,
    isTrending: true,
    features: ['Advanced cushioning', 'Breathable mesh', 'Lightweight', 'Responsive sole']
  },
  {
    id: 'prod-6',
    title: 'Wool Blend Overcoat',
    slug: 'wool-blend-overcoat',
    description: 'Elegant wool blend overcoat for sophisticated winter style. Classic design with modern tailoring.',
    aiEnhancedDescription: 'Command attention with this AI-perfected wool blend overcoat. Our thermal optimization algorithms selected the perfect fabric blend for warmth without bulk, while the timeless silhouette ensures you look sharp in any setting.',
    price: 199.99,
    category: 'Men',
    subcategory: 'Jackets',
    brand: 'Gentleman',
    images: ['/api/placeholder/600/800', '/api/placeholder/600/800', '/api/placeholder/600/800', '/api/placeholder/600/800'],
    rating: 4.8,
    reviewCount: 145,
    inStock: true,
    stockCount: 18,
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'Black', hex: '#000000' },
      { name: 'Navy', hex: '#000080' },
      { name: 'Camel', hex: '#C19A6B' }
    ],
    tags: ['coat', 'overcoat', 'wool', 'winter', 'elegant', 'formal'],
    isNew: false,
    isSale: false,
    isTrending: false,
    features: ['Wool blend', 'Modern tailoring', 'Warm lining', 'Multiple pockets']
  },
  {
    id: 'prod-7',
    title: 'Pleated Midi Skirt',
    slug: 'pleated-midi-skirt',
    description: 'Elegant pleated midi skirt that adds movement and grace. Versatile piece for various occasions.',
    aiEnhancedDescription: 'Discover effortless elegance with this AI-designed pleated masterpiece. Our motion analysis algorithms created the perfect pleat depth and spacing for graceful movement, while the midi length offers versatile styling from office to evening.',
    price: 69.99,
    category: 'Women',
    subcategory: 'Skirts',
    brand: 'Elegance',
    images: ['/api/placeholder/600/800', '/api/placeholder/600/800', '/api/placeholder/600/800', '/api/placeholder/600/800'],
    rating: 4.4,
    reviewCount: 98,
    inStock: true,
    stockCount: 42,
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Black', hex: '#000000' },
      { name: 'Burgundy', hex: '#800020' },
      { name: 'Emerald', hex: '#50C878' }
    ],
    tags: ['skirt', 'midi', 'pleated', 'elegant', 'versatile'],
    isNew: false,
    isSale: true,
    isTrending: false,
    originalPrice: 89.99,
    discount: 22,
    features: ['Pleated design', 'Midi length', 'Comfortable fit', 'Easy care']
  },
  {
    id: 'prod-8',
    title: 'Canvas Backpack',
    slug: 'canvas-backpack',
    description: 'Durable canvas backpack with multiple compartments. Perfect for work, school, or travel.',
    aiEnhancedDescription: 'Carry everything in style with this AI-optimized canvas backpack. Our storage analysis created the perfect compartment layout for optimal organization, while the reinforced canvas ensures durability for all your adventures.',
    price: 49.99,
    category: 'Accessories',
    subcategory: 'Bags',
    brand: 'Travel Mate',
    images: ['/api/placeholder/600/800', '/api/placeholder/600/800', '/api/placeholder/600/800', '/api/placeholder/600/800'],
    rating: 4.5,
    reviewCount: 234,
    inStock: true,
    stockCount: 67,
    sizes: ['One Size'],
    colors: [
      { name: 'Khaki', hex: '#C2B280' },
      { name: 'Black', hex: '#000000' },
      { name: 'Navy', hex: '#000080' }
    ],
    tags: ['backpack', 'canvas', 'durable', 'travel', 'everyday'],
    isNew: false,
    isSale: false,
    isTrending: false,
    features: ['Multiple compartments', 'Laptop sleeve', 'Durable canvas', 'Padded straps']
  },
  {
    id: 'prod-9',
    title: 'Smart Watch Series 5',
    slug: 'smart-watch-series-5',
    description: 'Advanced smartwatch with health tracking, GPS, and long battery life. Your perfect fitness companion.',
    aiEnhancedDescription: 'Transform your health journey with this AI-powered smartwatch. Our adaptive learning algorithms personalize fitness recommendations, while comprehensive health sensors provide insights to help you achieve your wellness goals.',
    price: 299.99,
    category: 'Accessories',
    subcategory: 'Watches',
    brand: 'TechWear',
    images: ['/api/placeholder/600/800', '/api/placeholder/600/800', '/api/placeholder/600/800', '/api/placeholder/600/800'],
    rating: 4.7,
    reviewCount: 567,
    inStock: true,
    stockCount: 89,
    sizes: ['One Size'],
    colors: [
      { name: 'Silver', hex: '#C0C0C0' },
      { name: 'Space Gray', hex: '#708090' },
      { name: 'Rose Gold', hex: '#B76E79' }
    ],
    tags: ['smartwatch', 'fitness', 'tech', 'health', 'GPS'],
    isNew: true,
    isSale: false,
    isTrending: true,
    features: ['Health tracking', 'GPS', '7-day battery', 'Water resistant', 'Notifications']
  },
  {
    id: 'prod-10',
    title: 'Kids Colorful Hoodie',
    slug: 'kids-colorful-hoodie',
    description: 'Fun and comfortable hoodie for kids. Made with soft, durable fabric perfect for active play.',
    aiEnhancedDescription: 'Let kids express themselves with this AI-designed colorful hoodie. Our child-friendly color algorithms created vibrant, eye-catching patterns that kids love, while parents appreciate the durable construction that stands up to endless play.',
    price: 34.99,
    category: 'Kids',
    subcategory: 'Boys',
    brand: 'Little Star',
    images: ['/api/placeholder/600/800', '/api/placeholder/600/800', '/api/placeholder/600/800', '/api/placeholder/600/800'],
    rating: 4.6,
    reviewCount: 89,
    inStock: true,
    stockCount: 56,
    sizes: ['4T', '5T', '6', '7', '8', '10', '12'],
    colors: [
      { name: 'Rainbow', hex: '#FF6B6B' },
      { name: 'Space', hex: '#4A69BD' },
      { name: 'Nature', hex: '#6AB04C' }
    ],
    tags: ['kids', 'hoodie', 'comfortable', 'colorful', 'playful'],
    isNew: false,
    isSale: true,
    isTrending: false,
    originalPrice: 44.99,
    discount: 22,
    features: ['Soft fabric', 'Durable', 'Kangaroo pocket', 'Easy wash']
  },
  {
    id: 'prod-11',
    title: 'Silk Scarf Collection',
    slug: 'silk-scarf-collection',
    description: 'Luxurious silk scarf with elegant patterns. Perfect accessory to elevate any outfit.',
    aiEnhancedDescription: 'Add a touch of luxury with this AI-curated silk scarf. Our pattern recognition algorithms selected timeless designs that complement various styles, while premium silk ensures you feel as sophisticated as you look.',
    price: 79.99,
    category: 'Accessories',
    subcategory: 'Scarves',
    brand: 'Luxuria',
    images: ['/api/placeholder/600/800', '/api/placeholder/600/800', '/api/placeholder/600/800', '/api/placeholder/600/800'],
    rating: 4.8,
    reviewCount: 123,
    inStock: true,
    stockCount: 34,
    sizes: ['One Size'],
    colors: [
      { name: 'Floral', hex: '#FFB6C1' },
      { name: 'Geometric', hex: '#4A90E2' },
      { name: 'Paisley', hex: '#9B59B6' }
    ],
    tags: ['scarf', 'silk', 'luxury', 'elegant', 'accessory'],
    isNew: true,
    isSale: false,
    isTrending: false,
    features: ['100% Silk', 'Hand-rolled edges', 'Elegant patterns', 'Lightweight']
  },
  {
    id: 'prod-12',
    title: 'High-Waist Yoga Pants',
    slug: 'high-waist-yoga-pants',
    description: 'Comfortable high-waist yoga pants with four-way stretch. Perfect for yoga, gym, or lounging.',
    aiEnhancedDescription: 'Achieve your fitness goals in comfort with these AI-optimized yoga pants. Our motion capture analysis informed the perfect stretch and support ratios, ensuring unrestricted movement during workouts while providing all-day comfort.',
    price: 59.99,
    category: 'Women',
    subcategory: 'Pants',
    brand: 'Active Wear',
    images: ['/api/placeholder/600/800', '/api/placeholder/600/800', '/api/placeholder/600/800', '/api/placeholder/600/800'],
    rating: 4.5,
    reviewCount: 345,
    inStock: true,
    stockCount: 78,
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'Black', hex: '#000000' },
      { name: 'Navy', hex: '#000080' },
      { name: 'Gray', hex: '#808080' },
      { name: 'Maroon', hex: '#800000' }
    ],
    tags: ['yoga', 'athletic', 'pants', 'workout', 'comfortable'],
    isNew: false,
    isSale: false,
    isTrending: true,
    features: ['High waist', 'Four-way stretch', 'Moisture-wicking', 'Buttery soft']
  },
  {
    id: 'prod-13',
    title: 'Classic Button-Down Shirt',
    slug: 'classic-button-down-shirt',
    description: 'Wardrobe essential button-down shirt. Versatile piece suitable for work or casual settings.',
    aiEnhancedDescription: 'Upgrade your wardrobe with this AI-perfected classic shirt. Our fabric analysis selected the optimal cotton blend for comfort and wrinkle resistance, while the timeless cut ensures you look polished in any situation.',
    price: 49.99,
    category: 'Men',
    subcategory: 'Shirts',
    brand: 'Essential',
    images: ['/api/placeholder/600/800', '/api/placeholder/600/800', '/api/placeholder/600/800', '/api/placeholder/600/800'],
    rating: 4.4,
    reviewCount: 289,
    inStock: true,
    stockCount: 123,
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'White', hex: '#FFFFFF' },
      { name: 'Light Blue', hex: '#ADD8E6' },
      { name: 'Pink', hex: '#FFC0CB' },
      { name: 'Striped', hex: '#F5F5F5' }
    ],
    tags: ['shirt', 'button-down', 'classic', 'versatile', 'work'],
    isNew: false,
    isSale: false,
    isTrending: false,
    features: ['Cotton blend', 'Classic fit', 'Easy iron', 'Versatile']
  },
  {
    id: 'prod-14',
    title: 'Leather Crossbody Bag',
    slug: 'leather-crossbody-bag',
    description: 'Elegant leather crossbody bag with adjustable strap. Perfect everyday accessory.',
    aiEnhancedDescription: 'Carry your essentials in style with this AI-designed leather crossbody. Our usage pattern analysis created the optimal interior layout for daily essentials, while premium leather ensures lasting beauty that improves with age.',
    price: 89.99,
    category: 'Accessories',
    subcategory: 'Bags',
    brand: 'Chic Carry',
    images: ['/api/placeholder/600/800', '/api/placeholder/600/800', '/api/placeholder/600/800', '/api/placeholder/600/800'],
    rating: 4.7,
    reviewCount: 167,
    inStock: true,
    stockCount: 45,
    sizes: ['One Size'],
    colors: [
      { name: 'Black', hex: '#000000' },
      { name: 'Tan', hex: '#D2B48C' },
      { name: 'Red', hex: '#DC143C' }
    ],
    tags: ['bag', 'crossbody', 'leather', 'everyday', 'elegant'],
    isNew: false,
    isSale: true,
    isTrending: false,
    originalPrice: 119.99,
    discount: 25,
    features: ['Genuine leather', 'Adjustable strap', 'Multiple pockets', 'Magnetic closure']
  },
  {
    id: 'prod-15',
    title: 'Cozy Knit Sweater',
    slug: 'cozy-knit-sweater',
    description: 'Ultra-soft knit sweater for chilly days. Perfect layering piece with timeless design.',
    aiEnhancedDescription: 'Wrap yourself in comfort with this AI-engineered knit masterpiece. Our thermal modeling selected the perfect knit structure for warmth without weight, while the timeless design ensures season-after-season style.',
    price: 69.99,
    category: 'Women',
    subcategory: 'Tops',
    brand: 'Cozy Comfort',
    images: ['/api/placeholder/600/800', '/api/placeholder/600/800', '/api/placeholder/600/800', '/api/placeholder/600/800'],
    rating: 4.6,
    reviewCount: 198,
    inStock: true,
    stockCount: 56,
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Cream', hex: '#FFFDD0' },
      { name: 'Oatmeal', hex: '#D2B48C' },
      { name: 'Sage', hex: '#9CAF88' },
      { name: 'Rust', hex: '#B7410E' }
    ],
    tags: ['sweater', 'knit', 'cozy', 'layering', 'fall'],
    isNew: true,
    isSale: false,
    isTrending: true,
    features: ['Ultra-soft knit', 'Relaxed fit', 'Versatile', 'Easy care']
  },
  {
    id: 'prod-16',
    title: 'Kids Playful Sneakers',
    slug: 'kids-playful-sneakers',
    description: 'Fun and colorful sneakers designed for active kids. Comfortable and durable for all-day play.',
    aiEnhancedDescription: 'Let kids run free in these AI-designed playful sneakers. Our child ergonomics analysis ensured perfect support for growing feet, while vibrant colors and fun details make them exciting to wear.',
    price: 44.99,
    category: 'Kids',
    subcategory: 'Girls',
    brand: 'Little Steps',
    images: ['/api/placeholder/600/800', '/api/placeholder/600/800', '/api/placeholder/600/800', '/api/placeholder/600/800'],
    rating: 4.5,
    reviewCount: 134,
    inStock: true,
    stockCount: 67,
    sizes: ['10', '11', '12', '13', '1', '2', '3'],
    colors: [
      { name: 'Pink Sparkle', hex: '#FF69B4' },
      { name: 'Purple Galaxy', hex: '#8A2BE2' },
      { name: 'Rainbow', hex: '#FFD700' }
    ],
    tags: ['kids', 'sneakers', 'colorful', 'playful', 'active'],
    isNew: false,
    isSale: false,
    isTrending: true,
    features: ['Lightweight', 'Flexible sole', 'Easy on/off', 'Durable']
  },
  {
    id: 'prod-17',
    title: 'Minimalist Watch',
    slug: 'minimalist-watch',
    description: 'Clean and minimalist watch design for modern sophistication. Perfect for everyday wear.',
    aiEnhancedDescription: 'Embrace minimalist elegance with this AI-refined timepiece. Our design algorithms stripped away the unnecessary, leaving only what matters: clean lines, premium materials, and precise timekeeping that speaks volumes without saying a word.',
    price: 159.99,
    category: 'Accessories',
    subcategory: 'Watches',
    brand: 'Minimal',
    images: ['/api/placeholder/600/800', '/api/placeholder/600/800', '/api/placeholder/600/800', '/api/placeholder/600/800'],
    rating: 4.8,
    reviewCount: 278,
    inStock: true,
    stockCount: 45,
    sizes: ['One Size'],
    colors: [
      { name: 'Silver/White', hex: '#C0C0C0' },
      { name: 'Black/Black', hex: '#000000' },
      { name: 'Rose Gold/White', hex: '#B76E79' }
    ],
    tags: ['watch', 'minimalist', 'elegant', 'everyday', 'modern'],
    isNew: false,
    isSale: false,
    isTrending: false,
    features: ['Minimalist design', 'Japanese movement', 'Sapphire glass', 'Water resistant']
  },
  {
    id: 'prod-18',
    title: 'Athletic Shorts',
    slug: 'athletic-shorts',
    description: 'Performance athletic shorts with moisture-wicking technology. Perfect for workouts and sports.',
    aiEnhancedDescription: 'Push your limits with these AI-optimized athletic shorts. Our sweat analysis technology informed the moisture-wicking fabric design, while strategic ventilation keeps you cool during your most intense workouts.',
    price: 39.99,
    category: 'Men',
    subcategory: 'Pants',
    brand: 'Performance Pro',
    images: ['/api/placeholder/600/800', '/api/placeholder/600/800', '/api/placeholder/600/800', '/api/placeholder/600/800'],
    rating: 4.4,
    reviewCount: 189,
    inStock: true,
    stockCount: 89,
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'Black', hex: '#000000' },
      { name: 'Navy', hex: '#000080' },
      { name: 'Gray', hex: '#808080' },
      { name: 'Red', hex: '#FF0000' }
    ],
    tags: ['athletic', 'shorts', 'workout', 'performance', 'sports'],
    isNew: false,
    isSale: true,
    isTrending: false,
    originalPrice: 54.99,
    discount: 27,
    features: ['Moisture-wicking', 'Lightweight', 'Four-way stretch', 'Quick dry']
  },
  {
    id: 'prod-19',
    title: 'Vintage Denim Jeans',
    slug: 'vintage-denim-jeans',
    description: 'Classic vintage-style jeans with perfect fit. Timeless design for everyday wear.',
    aiEnhancedDescription: 'Discover your perfect fit with these AI-tailored vintage jeans. Our body measurement analysis created a fit that flatters various body types, while authentic vintage wash details give you that lived-in look from day one.',
    price: 79.99,
    category: 'Men',
    subcategory: 'Pants',
    brand: 'Retro Fit',
    images: ['/api/placeholder/600/800', '/api/placeholder/600/800', '/api/placeholder/600/800', '/api/placeholder/600/800'],
    rating: 4.6,
    reviewCount: 312,
    inStock: true,
    stockCount: 67,
    sizes: ['28', '30', '32', '34', '36', '38'],
    colors: [
      { name: 'Light Vintage', hex: '#87CEEB' },
      { name: 'Medium Wash', hex: '#5F9EA0' },
      { name: 'Dark Wash', hex: '#191970' }
    ],
    tags: ['jeans', 'denim', 'vintage', 'classic', 'everyday'],
    isNew: false,
    isSale: false,
    isTrending: true,
    features: ['Vintage wash', 'Comfort stretch', 'Classic fit', 'Durable']
  },
  {
    id: 'prod-20',
    title: 'Elegant Evening Clutch',
    slug: 'elegant-evening-clutch',
    description: 'Sophisticated evening clutch for special occasions. Features elegant details and compact design.',
    aiEnhancedDescription: 'Make a statement at your next event with this AI-designed evening clutch. Our occasion analysis created the perfect size and layout for evening essentials, while elegant details ensure you turn heads.',
    price: 129.99,
    category: 'Accessories',
    subcategory: 'Bags',
    brand: 'Evening Elegance',
    images: ['/api/placeholder/600/800', '/api/placeholder/600/800', '/api/placeholder/600/800', '/api/placeholder/600/800'],
    rating: 4.9,
    reviewCount: 89,
    inStock: true,
    stockCount: 23,
    sizes: ['One Size'],
    colors: [
      { name: 'Black', hex: '#000000' },
      { name: 'Gold', hex: '#FFD700' },
      { name: 'Silver', hex: '#C0C0C0' }
    ],
    tags: ['clutch', 'evening', 'elegant', 'special occasion', 'party'],
    isNew: true,
    isSale: false,
    isTrending: false,
    features: ['Elegant design', 'Compact', 'Detachable chain', 'Multiple compartments']
  }
];

// Reviews
export const reviews: Review[] = [
  {
    id: 'rev-1',
    productId: 'prod-1',
    userId: 'user-1',
    userName: 'John D.',
    rating: 5,
    title: 'Best t-shirt ever!',
    comment: 'The quality is amazing. Very comfortable and fits perfectly. Will definitely buy more colors!',
    date: '2024-01-15',
    helpful: 23,
    verified: true
  },
  {
    id: 'rev-2',
    productId: 'prod-1',
    userId: 'user-2',
    userName: 'Sarah M.',
    rating: 4,
    title: 'Great quality',
    comment: 'Love the fabric quality and fit. Only giving 4 stars because shipping took a bit longer than expected.',
    date: '2024-01-10',
    helpful: 12,
    verified: true
  },
  {
    id: 'rev-3',
    productId: 'prod-2',
    userId: 'user-3',
    userName: 'Mike R.',
    rating: 5,
    title: 'Perfect denim jacket',
    comment: 'Exactly what I was looking for. Great fit and quality. The discount made it even better!',
    date: '2024-01-08',
    helpful: 18,
    verified: true
  },
  {
    id: 'rev-4',
    productId: 'prod-3',
    userId: 'user-4',
    userName: 'Emily K.',
    rating: 5,
    title: 'Beautiful summer dress',
    comment: 'The floral pattern is gorgeous and it fits perfectly. Received so many compliments!',
    date: '2024-01-05',
    helpful: 15,
    verified: true
  },
  {
    id: 'rev-5',
    productId: 'prod-4',
    userId: 'user-5',
    userName: 'David L.',
    rating: 5,
    title: 'Excellent quality shoes',
    comment: 'Very comfortable right out of the box. The leather quality is outstanding.',
    date: '2024-01-03',
    helpful: 28,
    verified: true
  },
  {
    id: 'rev-6',
    productId: 'prod-5',
    userId: 'user-6',
    userName: 'Alex T.',
    rating: 4,
    title: 'Great for running',
    comment: 'Comfortable and supportive. The cushioning is excellent for long runs.',
    date: '2024-01-01',
    helpful: 22,
    verified: true
  },
  {
    id: 'rev-7',
    productId: 'prod-6',
    userId: 'user-7',
    userName: 'Robert W.',
    rating: 5,
    title: 'Premium quality coat',
    comment: 'Worth every penny. The wool blend is warm but not too heavy. Very stylish.',
    date: '2023-12-28',
    helpful: 14,
    verified: true
  },
  {
    id: 'rev-8',
    productId: 'prod-7',
    userId: 'user-8',
    userName: 'Lisa P.',
    rating: 4,
    title: 'Elegant skirt',
    comment: 'Beautiful pleats and great movement. The fabric quality is excellent.',
    date: '2023-12-25',
    helpful: 11,
    verified: true
  },
  {
    id: 'rev-9',
    productId: 'prod-9',
    userId: 'user-9',
    userName: 'James H.',
    rating: 5,
    title: 'Best smartwatch',
    comment: 'The health tracking is accurate and battery life is amazing. Love the sleek design.',
    date: '2023-12-20',
    helpful: 35,
    verified: true
  },
  {
    id: 'rev-10',
    productId: 'prod-12',
    userId: 'user-10',
    userName: 'Maria S.',
    rating: 5,
    title: 'Perfect yoga pants',
    comment: 'So comfortable and the high waist stays in place during workouts. Love them!',
    date: '2023-12-18',
    helpful: 19,
    verified: true
  }
];

// Users
export const users: User[] = [
  {
    id: 'user-1',
    name: 'John Doe',
    email: 'john@example.com',
    avatar: '/api/placeholder/100/100',
    phone: '+1 555-0101',
    addresses: [
      {
        id: 'addr-1',
        fullName: 'John Doe',
        street: '123 Main Street',
        city: 'New York',
        state: 'NY',
        zipCode: '10001',
        country: 'United States',
        phone: '+1 555-0101',
        isDefault: true
      }
    ],
    createdAt: '2023-06-15'
  },
  {
    id: 'user-2',
    name: 'Sarah Johnson',
    email: 'sarah@example.com',
    phone: '+1 555-0102',
    addresses: [
      {
        id: 'addr-2',
        fullName: 'Sarah Johnson',
        street: '456 Oak Avenue',
        city: 'Los Angeles',
        state: 'CA',
        zipCode: '90001',
        country: 'United States',
        phone: '+1 555-0102',
        isDefault: true
      }
    ],
    createdAt: '2023-07-20'
  }
];

// Orders
export const orders: Order[] = [
  {
    id: 'ORD-2024-001',
    userId: 'user-1',
    status: 'Delivered',
    items: [
      {
        productId: 'prod-1',
        productTitle: 'Classic Cotton T-Shirt',
        image: '/api/placeholder/100/100',
        variant: { size: 'L', color: 'White' },
        quantity: 2,
        price: 29.99
      },
      {
        productId: 'prod-2',
        productTitle: 'Premium Denim Jacket',
        image: '/api/placeholder/100/100',
        variant: { size: 'M', color: 'Dark Wash' },
        quantity: 1,
        price: 89.99
      }
    ],
    subtotal: 149.97,
    discount: 22.50,
    shipping: 0,
    tax: 12.80,
    total: 140.27,
    shippingAddress: {
      id: 'addr-1',
      fullName: 'John Doe',
      street: '123 Main Street',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      country: 'United States',
      phone: '+1 555-0101',
      isDefault: true
    },
    paymentMethod: 'Visa ending in 4242',
    orderDate: '2024-01-15',
    trackingNumber: '1Z999AA10123456784'
  },
  {
    id: 'ORD-2024-002',
    userId: 'user-1',
    status: 'Shipped',
    items: [
      {
        productId: 'prod-4',
        productTitle: 'Leather Oxford Shoes',
        image: '/api/placeholder/100/100',
        variant: { size: '10', color: 'Brown' },
        quantity: 1,
        price: 129.99
      }
    ],
    subtotal: 129.99,
    discount: 0,
    shipping: 0,
    tax: 10.50,
    total: 140.49,
    shippingAddress: {
      id: 'addr-1',
      fullName: 'John Doe',
      street: '123 Main Street',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      country: 'United States',
      phone: '+1 555-0101',
      isDefault: true
    },
    paymentMethod: 'Mastercard ending in 5555',
    orderDate: '2024-01-20',
    estimatedDelivery: '2024-01-25',
    trackingNumber: '1Z999AA10123456785'
  },
  {
    id: 'ORD-2024-003',
    userId: 'user-1',
    status: 'Processing',
    items: [
      {
        productId: 'prod-9',
        productTitle: 'Smart Watch Series 5',
        image: '/api/placeholder/100/100',
        variant: { size: 'One Size', color: 'Silver' },
        quantity: 1,
        price: 299.99
      },
      {
        productId: 'prod-11',
        productTitle: 'Silk Scarf Collection',
        image: '/api/placeholder/100/100',
        variant: { size: 'One Size', color: 'Floral' },
        quantity: 1,
        price: 79.99
      }
    ],
    subtotal: 379.98,
    discount: 0,
    shipping: 0,
    tax: 30.40,
    total: 410.38,
    shippingAddress: {
      id: 'addr-1',
      fullName: 'John Doe',
      street: '123 Main Street',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      country: 'United States',
      phone: '+1 555-0101',
      isDefault: true
    },
    paymentMethod: 'PayPal',
    orderDate: '2024-01-22'
  }
];

// Helper functions for simulated API delays
export const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Simulated API calls
export const api = {
  getProducts: async () => {
    await delay(500);
    return products;
  },

  getProductById: async (id: string) => {
    await delay(300);
    return products.find(p => p.id === id);
  },

  getProductsByCategory: async (category: string) => {
    await delay(400);
    return products.filter(p => p.category === category);
  },

  getTrendingProducts: async () => {
    await delay(400);
    return products.filter(p => p.isTrending);
  },

  getNewProducts: async () => {
    await delay(400);
    return products.filter(p => p.isNew);
  },

  getSaleProducts: async () => {
    await delay(400);
    return products.filter(p => p.isSale);
  },

  searchProducts: async (query: string) => {
    await delay(500);
    const lowerQuery = query.toLowerCase();
    return products.filter(p =>
      p.title.toLowerCase().includes(lowerQuery) ||
      p.description.toLowerCase().includes(lowerQuery) ||
      p.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
    );
  },

  getReviews: async (productId: string) => {
    await delay(300);
    return reviews.filter(r => r.productId === productId);
  },

  getUserOrders: async (userId: string) => {
    await delay(400);
    return orders.filter(o => o.userId === userId);
  }
};
