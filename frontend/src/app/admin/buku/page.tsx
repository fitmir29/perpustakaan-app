'use client';

import axios from 'axios';
import { useEffect, useState } from 'react';
import { Buku } from 'src/app/types';


export default function AdminBukuPage() {
const [bukuList, setBukuList] = useState<Buku[]>([]);
const [loading, setLoading] = useState(true);

// Form state
const [judul, setJudul] = useState('');
const [pengarang, setPengarang] = useState('');
const [tahun, setTahun] = useState('');
const [kategori, setKategori] = useState('');
const [stok, setStok] = useState<number>(1);

const fetchBuku = async () => {
try {
const res = await axios.get('/api/v1/buku');
setBukuList(res.data);
} catch (err) {
console.error('Gagal ambil data buku:', err);
} finally {
setLoading(false);
}
};

useEffect(() => {
fetchBuku();
}, []);

const handleTambah = async (e: React.FormEvent) => {
e.preventDefault();
try {
await axios.post('/api/v1/buku', {
judul,
pengarang,
tahun,
kategori,
stok,
});
setJudul('');
setPengarang('');
setTahun('');
setKategori('');
setStok(1);
fetchBuku();
} catch (err) {
console.error('Gagal tambah buku:', err);
}
};

const handleHapus = async (id: number) => {
if (!confirm('Hapus buku ini?')) return;
try {
await axios.delete(`/api/v1/buku/${id}`);
fetchBuku();
} catch (err) {
console.error('Gagal hapus buku:', err);
}
};

return (
<div className="min-h-screen px-4 py-8 bg-white">
<h1 className="text-3xl font-bold text-blue-800 mb-6 text-center">Kelola Buku</h1>

php-template
Copy
Edit
  {/* Form Tambah Buku */}
  <form
    onSubmit={handleTambah}
    className="bg-gray-100 p-6 rounded-lg mb-10 max-w-2xl mx-auto"
  >
    <h2 className="text-xl font-semibold mb-4">Tambah Buku Baru</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <input
        type="text"
        placeholder="Judul"
        value={judul}
        onChange={(e) => setJudul(e.target.value)}
        required
        className="p-2 border rounded"
      />
      <input
        type="text"
        placeholder="Pengarang"
        value={pengarang}
        onChange={(e) => setPengarang(e.target.value)}
        required
        className="p-2 border rounded"
      />
      <input
        type="text"
        placeholder="Tahun"
        value={tahun}
        onChange={(e) => setTahun(e.target.value)}
        required
        className="p-2 border rounded"
      />
      <input
        type="text"
        placeholder="Kategori"
        value={kategori}
        onChange={(e) => setKategori(e.target.value)}
        required
        className="p-2 border rounded"
      />
      <input
        type="number"
        placeholder="Stok"
        value={stok}
        onChange={(e) => setStok(Number(e.target.value))}
        min={1}
        required
        className="p-2 border rounded"
      />
    </div>
    <button
      type="submit"
      className="mt-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
    >
      Tambah Buku
    </button>
  </form>

  {/* Daftar Buku */}
  <div className="overflow-x-auto">
    {loading ? (
      <p className="text-center text-gray-500">Memuat data buku...</p>
    ) : bukuList.length === 0 ? (
      <p className="text-center text-gray-500">Tidak ada buku tersedia.</p>
    ) : (
      <table className="min-w-full bg-white border">
        <thead className="bg-blue-100">
          <tr>
            <th className="px-4 py-2 border">Judul</th>
            <th className="px-4 py-2 border">Pengarang</th>
            <th className="px-4 py-2 border">Tahun</th>
            <th className="px-4 py-2 border">Kategori</th>
            <th className="px-4 py-2 border">Stok</th>
            <th className="px-4 py-2 border">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {bukuList.map((buku) => (
            <tr key={buku.id} className="text-center">
              <td className="border px-4 py-2">{buku.judul}</td>
              <td className="border px-4 py-2">{buku.pengarang}</td>
              <td className="border px-4 py-2">{buku.tahun}</td>
              <td className="border px-4 py-2">{buku.kategori}</td>
              <td className="border px-4 py-2">{buku.stok}</td>
              <td className="border px-4 py-2">
                <button
                  onClick={() => handleHapus(buku.id)}
                  className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                >
                  Hapus
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    )}
  </div>
</div>
);
}