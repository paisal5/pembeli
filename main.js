  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  getDoc,
  deleteDoc,
  doc,
  query,
  orderBy,
  updateDoc
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBlahoJjeK0jyO-4tZlAiPRjym6Mxn2P6o",
  authDomain: "insan-cemerlang-59727.firebaseapp.com",
  projectId: "insan-cemerlang-59727",
  storageBucket: "insan-cemerlang-59727.appspot.com",
  messagingSenderId: "839220708273",
  appId: "1:839220708273:web:4d1dde85cf74aebd1d7390",
  measurementId: "G-1VP3D59R0T"
};

// Inisialisasi Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export async function ambilDaftarPembeli() {
  const refDokumen = collection(db, "Pembeli");
  const kueri = query(refDokumen, orderBy("nama"));
  const cuplikanKueri = await getDocs(kueri);

  let hasil = [];
  cuplikanKueri.forEach((dok) => {
    hasil.push({
      id: dok.id,
      nama: dok.data().nama,
      alamat: dok.data().alamat,
      noTlpon: dok.data().noTlpon,
    });
  });



  return hasil;
}

export function formatAngka(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

export async function tambahPembeli(nama, alamat, noTlpn) {
  try {
    const dokRef = await addDoc(collection(db, 'Pembeli'), {
      nama: nama,
      alamat: alamat,
      noTlpon: noTlpon
    });
    console.log('berhasil menembah. produk ' + dokRef.id);
  } catch (e) {

    console.log('gagal menambah Penjual ' + e);
  }
}


export async function hapusPembeli(docId) {
  await deleteDoc(doc(db, "Pembeli", docId));
}

export async function ubahPembeli(docId, nama, alamat, noTlpon) {
  await updateDoc(doc(db, "Pembeli", docId), {
    nama: nama,
    alamat: alamat,
    noTlpon: noTlpon
  });
}

export async function ambilPembeli(docId) {
  const docRef = await doc(db, "Pembeli", docId);
  const docSnap = await getDoc(docRef);

  return await docSnap.data();
}