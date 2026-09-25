// ==== KONFIGURASI FIREBASE ====
// Ganti semua nilai di bawah ini dengan konfigurasi dari Firebase Console kamu:
// Project Settings > General > Your apps > SDK setup and configuration > pilih "Config"
// Lihat PANDUAN-SETUP-FIREBASE.md untuk langkah lengkapnya.

const firebaseConfig = {
  apiKey: "AIzaSyCbpxeLofKfFpz7GAOgn8iwsDy61PRowos",
  authDomain: "aether-store-1.firebaseapp.com",
  projectId: "aether-store-1",
  storageBucket: "aether-store-1.firebasestorage.app",
  messagingSenderId: "716353523642",
  appId: "1:716353523642:web:d7a7dd246131c64eeb1783"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const auth = firebase.auth();
