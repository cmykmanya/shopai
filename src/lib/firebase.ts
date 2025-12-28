// Firebase Configuration - v10 Modular SDK

import { initializeApp, getApps } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut as firebaseSignOut, User as FirebaseUser } from 'firebase/auth';
import { getFirestore, collection, addDoc, getDoc, getDocs, updateDoc, deleteDoc, doc, query, where, orderBy, limit, onSnapshot, Timestamp } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';

// Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || 'your-api-key',
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || 'your-project.firebaseapp.com',
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'your-project-id',
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || 'your-project.appspot.com',
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || 'your-sender-id',
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || 'your-app-id',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

// Google Auth Provider
const googleProvider = new GoogleAuthProvider();

// Authentication functions
export const authFunctions = {
  // Sign in with Google
  signInWithGoogle: async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      return { success: true, user };
    } catch (error: any) {
      console.error('Google sign-in error:', error);
      return { success: false, error: error.message };
    }
  },

  // Sign out
  signOut: async () => {
    try {
      await firebaseSignOut(auth);
      return { success: true };
    } catch (error: any) {
      console.error('Sign out error:', error);
      return { success: false, error: error.message };
    }
  },

  // Get current user
  getCurrentUser: () => {
    return auth.currentUser;
  },

  // Auth state listener
  onAuthStateChanged: (callback: (user: FirebaseUser | null) => void) => {
    return auth.onAuthStateChanged(callback);
  },
};

// Firestore Database functions
export const dbFunctions = {
  // Products
  products: {
    collection: collection(db, 'products'),

    getAll: async () => {
      const snapshot = await getDocs(collection(db, 'products'));
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    },

    getById: async (id: string) => {
      const docRef = doc(db, 'products', id);
      const docSnap = await getDoc(docRef);
      return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } : null;
    },

    add: async (product: any) => {
      const docRef = await addDoc(collection(db, 'products'), {
        ...product,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
      });
      return { id: docRef.id, ...product };
    },

    update: async (id: string, product: any) => {
      const docRef = doc(db, 'products', id);
      await updateDoc(docRef, {
        ...product,
        updatedAt: Timestamp.now(),
      });
    },

    delete: async (id: string) => {
      const docRef = doc(db, 'products', id);
      await deleteDoc(docRef);
    },

    search: async (searchQuery: string) => {
      const productsRef = collection(db, 'products');
      const q = query(
        productsRef,
        where('title', '>=', searchQuery),
        where('title', '<=', searchQuery + '\uf8ff'),
        limit(10)
      );
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    },

    getByCategory: async (category: string) => {
      const productsRef = collection(db, 'products');
      const q = query(productsRef, where('category', '==', category));
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    },
  },

  // Orders
  orders: {
    collection: collection(db, 'orders'),

    getAll: async (userId?: string) => {
      let q;
      if (userId) {
        q = query(collection(db, 'orders'), where('userId', '==', userId), orderBy('createdAt', 'desc'));
      } else {
        q = query(collection(db, 'orders'), orderBy('createdAt', 'desc'));
      }
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    },

    getById: async (id: string) => {
      const docRef = doc(db, 'orders', id);
      const docSnap = await getDoc(docRef);
      return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } : null;
    },

    create: async (order: any) => {
      const docRef = await addDoc(collection(db, 'orders'), {
        ...order,
        status: 'Processing',
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
      });
      return { id: docRef.id, ...order };
    },

    updateStatus: async (id: string, status: string) => {
      const docRef = doc(db, 'orders', id);
      await updateDoc(docRef, {
        status,
        updatedAt: Timestamp.now(),
      });
    },

    getByStatus: async (status: string) => {
      const ordersRef = collection(db, 'orders');
      const q = query(ordersRef, where('status', '==', status), orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    },
  },

  // Users
  users: {
    collection: collection(db, 'users'),

    getById: async (id: string) => {
      const docRef = doc(db, 'users', id);
      const docSnap = await getDoc(docRef);
      return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } : null;
    },

    create: async (user: any) => {
      const docRef = await addDoc(collection(db, 'users'), {
        ...user,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
      });
      return { id: docRef.id, ...user };
    },

    update: async (id: string, userData: any) => {
      const docRef = doc(db, 'users', id);
      await updateDoc(docRef, {
        ...userData,
        updatedAt: Timestamp.now(),
      });
    },

    addAddress: async (userId: string, address: any) => {
      const userRef = doc(db, 'users', userId);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        const addresses = userSnap.data().addresses || [];
        const updatedAddresses = [...addresses, { ...address, id: `addr-${Date.now()}`, isDefault: false }];
        await updateDoc(userRef, { addresses: updatedAddresses, updatedAt: Timestamp.now() });
      }
    },

    updateProfile: async (userId: string, profileData: any) => {
      const userRef = doc(db, 'users', userId);
      await updateDoc(userRef, {
        ...profileData,
        updatedAt: Timestamp.now(),
      });
    },
  },

  // Realtime listeners
  realtime: {
    onProductsChange: (callback: (products: any[]) => void) => {
      const productsRef = collection(db, 'products');
      return onSnapshot(productsRef, (snapshot) => {
        const products = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        callback(products);
      });
    },

    onOrdersChange: (callback: (orders: any[]) => void, userId?: string) => {
      let q;
      if (userId) {
        q = query(collection(db, 'orders'), where('userId', '==', userId), orderBy('createdAt', 'desc'));
      } else {
        q = query(collection(db, 'orders'), orderBy('createdAt', 'desc'));
      }

      return onSnapshot(q, (snapshot) => {
        const orders = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        callback(orders);
      });
    },

    onUserChange: (callback: (user: FirebaseUser | null) => void) => {
      return auth.onAuthStateChanged(callback);
    },
  },
};

// Firebase Storage functions for images
export const storageFunctions = {
  uploadProductImage: async (file: File, productId: string) => {
    try {
      const storageRef = ref(storage, `products/${productId}/${Date.now()}_${file.name}`);
      await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);
      return { success: true, url: downloadURL };
    } catch (error: any) {
      console.error('Upload error:', error);
      return { success: false, error: error.message };
    }
  },

  deleteProductImage: async (imageUrl: string) => {
    try {
      const storageRef = ref(storage, imageUrl);
      await deleteObject(storageRef);
      return { success: true };
    } catch (error: any) {
      console.error('Delete error:', error);
      return { success: false, error: error.message };
    }
  },
};

// Export Firebase instances and functions
export { app, auth, db, storage };
export { authFunctions, dbFunctions, realtime, storageFunctions };
