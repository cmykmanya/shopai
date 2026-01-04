const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000/api';

// Ürünleri getir
export const fetchProducts = async (params?: {
  category?: string;
  sort?: string;
  minPrice?: number;
  maxPrice?: number;
  brand?: string;
  size?: string;
  color?: string;
  minRating?: number;
  inStock?: boolean;
}) => {
  const queryParams = new URLSearchParams();
  
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value) queryParams.append(key, String(value));
    });
  }
  
  const response = await fetch(`${API_BASE_URL}/products?${queryParams.toString()}`);
  if (!response.ok) {
    throw new Error('Ürünler getirilirken bir hata oluştu.');
  }
  
  return response.json();
};

// Tek bir ürünün detaylarını getir
export const fetchProductById = async (id: string) => {
  const response = await fetch(`${API_BASE_URL}/products/${id}`);
  if (!response.ok) {
    throw new Error('Ürün detayları getirilirken bir hata oluştu.');
  }
  
  return response.json();
};

// Sipariş oluştur
export const createOrder = async (orderData: {
  userId: string;
  items: any[];
  totalAmount: number;
  shippingAddress: any;
  paymentMethod: string;
}) => {
  const response = await fetch(`${API_BASE_URL}/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(orderData),
  });
  
  if (!response.ok) {
    throw new Error('Sipariş oluşturulurken bir hata oluştu.');
  }
  
  return response.json();
};

// Kullanıcının siparişlerini getir
export const fetchOrders = async (userId: string) => {
  const response = await fetch(`${API_BASE_URL}/orders?userId=${userId}`);
  if (!response.ok) {
    throw new Error('Siparişler getirilirken bir hata oluştu.');
  }
  
  return response.json();
};

// Kupon kodunu doğrula
export const validateCoupon = async (code: string) => {
  const response = await fetch(`${API_BASE_URL}/coupons?code=${code}`);
  if (!response.ok) {
    throw new Error('Kupon kodu doğrulanırken bir hata oluştu.');
  }
  
  return response.json();
};

// Ödeme işlemini gerçekleştir
export const createPaymentIntent = async (amount: number, orderId: string, userId: string) => {
  const response = await fetch(`${API_BASE_URL}/payment`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ amount, orderId, userId }),
  });
  
  if (!response.ok) {
    throw new Error('Ödeme işlemi sırasında bir hata oluştu.');
  }
  
  return response.json();
};

// E-posta gönder
export const sendEmail = async (to: string, subject: string, html: string) => {
  const response = await fetch(`${API_BASE_URL}/send-email`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ to, subject, html }),
  });
  
  if (!response.ok) {
    throw new Error('E-posta gönderilirken bir hata oluştu.');
  }
  
  return response.json();
};