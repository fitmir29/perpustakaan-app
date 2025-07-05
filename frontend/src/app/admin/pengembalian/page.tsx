'use client';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { api } from 'src/app/lib/api';



interface Pengembalian {
id: number;
user_id: number;
buku_id: number;
tanggal_kembali: string;
denda: number;
}

export default function AdminPengembalianPage() {
const [data, setData] = useState<Pengembalian[]>([]);
const [loading, setLoading] = useState(true);

const [form, setForm] = useState({
user_id: '',
buku_id: '',
tanggal_kembali: '',
denda: 0,
});

const fetchData = async () => {
try {
const res = await axios.get('/api/v1/pengembalian');
setData(res.data);
} catch (err) {
console.error('Gagal ambil data:', err);
} finally {
setLoading(false);
}
};

useEffect(() => {
fetchData();
}, []);

const handleSubmit = async (e: React.FormEvent) => {
e.preventDefault();
try {
await axios.post('/api/v1/pengembalian', form);
setForm({
user_id: '',
buku_id: '',
tanggal_kembali: '',
denda: 0,
});
fetchData();
} catch (err) {
console.error('Gagal tambah data:', err);
}
};

const handleDelete = async (id: number) => {
if (!confirm('Yakin ingin menghapus data pengembalian ini?')) return;
try {
await api.delete(`/pengembalian/${id}`);
fetchData();
} catch (err) {
console.error('Gagal hapus data:', err);
}
};

return (
<div className="min-h-screen px-4 py-8 bg-white">
<h1 className="text-3xl font-bold text-blue-800 mb-6 text-center">Kelola Pengembalian</h1>

php-template
Copy
Edit
  {/* Form tambah */}
  <form
    onSubmit={handleSubmit}
    className="bg-gray-100 p-6 rounded-lg mb-10 max-w-2xl mx-auto"
  >
    <h2 className="text-xl font-semibold mb-4">Tambah Data Pengembalian</h2>
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
        value={form.tanggal_kembali}
        onChange={(e) => setForm({ ...form, tanggal_kembali: e.target.value })}
        className="p-2 border rounded"
        required
      />
      <input
        type="number"
        placeholder="Denda"
        value={form.denda}
        onChange={(e) => setForm({ ...form, denda: Number(e.target.value) })}
        className="p-2 border rounded"
        required
      />
    </div>
    <button
      type="submit"
      className="mt-4 px-6 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700"
    >
      Tambah
    </button>
  </form>

  {/* Tabel data */}
  {loading ? (
    <p className="text-center">Memuat data pengembalian...</p>
  ) : (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border">
        <thead className="bg-yellow-100">
          <tr>
            <th className="px-4 py-2 border">ID</th>
            <th className="px-4 py-2 border">User ID</th>
            <th className="px-4 py-2 border">Buku ID</th>
            <th className="px-4 py-2 border">Tanggal Kembali</th>
            <th className="px-4 py-2 border">Denda</th>
            <th className="px-4 py-2 border">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id} className="text-center">
              <td className="border px-4 py-2">{item.id}</td>
              <td className="border px-4 py-2">{item.user_id}</td>
              <td className="border px-4 py-2">{item.buku_id}</td>
              <td className="border px-4 py-2">{item.tanggal_kembali}</td>
              <td className="border px-4 py-2">{item.denda}</td>
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

