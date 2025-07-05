'use client';

import axios from 'axios';
import { useEffect, useState } from 'react';


interface Peminjaman {
id: number;
user_id: number;
buku_id: number;
tanggal_pinjam: string;
tanggal_kembali: string;
status: string;
}

export default function AdminPeminjamanPage() {
const [data, setData] = useState<Peminjaman[]>([]);
const [loading, setLoading] = useState(true);

const [form, setForm] = useState({
user_id: '',
buku_id: '',
tanggal_pinjam: '',
tanggal_kembali: '',
status: 'dipinjam',
});

const fetchPeminjaman = async () => {
try {
const res = await axios.get('/api/v1/peminjaman');
setData(res.data);
} catch (err) {
console.error('Gagal ambil data:', err);
} finally {
setLoading(false);
}
};

useEffect(() => {
fetchPeminjaman();
}, []);

const handleSubmit = async (e: React.FormEvent) => {
e.preventDefault();
try {
await axios.post('/api/v1/peminjaman', form);
setForm({
user_id: '',
buku_id: '',
tanggal_pinjam: '',
tanggal_kembali: '',
status: 'dipinjam',
});
fetchPeminjaman();
} catch (err) {
console.error('Gagal tambah data:', err);
}
};

const handleDelete = async (id: number) => {
if (!confirm('Yakin ingin menghapus peminjaman ini?')) return;
try {
await axios.delete(`/api/v1/peminjaman/${id}`);
fetchPeminjaman();
} catch (err) {
console.error('Gagal hapus data:', err);
}
};

return (
<div className="min-h-screen px-4 py-8 bg-white">
<h1 className="text-3xl font-bold text-blue-800 mb-6 text-center">Kelola Peminjaman</h1>

php-template
Copy
Edit
  {/* Form tambah */}
  <form
    onSubmit={handleSubmit}
    className="bg-gray-100 p-6 rounded-lg mb-10 max-w-2xl mx-auto"
  >
    <h2 className="text-xl font-semibold mb-4">Tambah Peminjaman</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <input
        type="number"
        placeholder="User ID"
        value={form.user_id}
        onChange={(e) => setForm({ ...form, user_id: e.target.value })}
        className="p-2 border rounded"
        required
      />
      <input
        type="number"
        placeholder="Buku ID"
        value={form.buku_id}
        onChange={(e) => setForm({ ...form, buku_id: e.target.value })}
        className="p-2 border rounded"
        required
      />
      <input
        type="date"
        value={form.tanggal_pinjam}
        onChange={(e) => setForm({ ...form, tanggal_pinjam: e.target.value })}
        className="p-2 border rounded"
        required
      />
      <input
        type="date"
        value={form.tanggal_kembali}
        onChange={(e) => setForm({ ...form, tanggal_kembali: e.target.value })}
        className="p-2 border rounded"
        required
      />
      <select
        value={form.status}
        onChange={(e) => setForm({ ...form, status: e.target.value })}
        className="p-2 border rounded"
      >
        <option value="dipinjam">Dipinjam</option>
        <option value="dikembalikan">Dikembalikan</option>
      </select>
    </div>
    <button
      type="submit"
      className="mt-4 px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700"
    >
      Tambah
    </button>
  </form>

  {/* Tabel data */}
  {loading ? (
    <p className="text-center">Memuat data peminjaman...</p>
  ) : (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border">
        <thead className="bg-blue-100">
          <tr>
            <th className="px-4 py-2 border">ID</th>
            <th className="px-4 py-2 border">User ID</th>
            <th className="px-4 py-2 border">Buku ID</th>
            <th className="px-4 py-2 border">Pinjam</th>
            <th className="px-4 py-2 border">Kembali</th>
            <th className="px-4 py-2 border">Status</th>
            <th className="px-4 py-2 border">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id} className="text-center">
              <td className="border px-4 py-2">{item.id}</td>
              <td className="border px-4 py-2">{item.user_id}</td>
              <td className="border px-4 py-2">{item.buku_id}</td>
              <td className="border px-4 py-2">{item.tanggal_pinjam}</td>
              <td className="border px-4 py-2">{item.tanggal_kembali}</td>
              <td className="border px-4 py-2">{item.status}</td>
              <td className="border px-4 py-2">
                <button
                  onClick={() => handleDelete(item.id)}
                  className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                >
                  Hapus
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )}
</div>
);
}