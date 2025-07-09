'use client';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Buku } from 'src/app/types';
import { FiPlus, FiTrash2, FiEdit, FiSearch, FiRefreshCw, FiArrowLeft } from 'react-icons/fi';
import { useRouter } from 'next/navigation';

export default function AdminBukuPage() {
  const router = useRouter();
  const [bukuList, setBukuList] = useState<Buku[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editData, setEditData] = useState({ judul: '', pengarang: '', tahun: '', kategori: '', stok: 1 });
  const [formData, setFormData] = useState({ judul: '', pengarang: '', tahun: '', kategori: '', stok: 1 });

  const fetchBuku = async () => {
    try {
      setLoading(true);
      const res = await axios.get('http://127.0.0.1:3001/api/v1/buku');
      setBukuList(res.data);
    } catch (err) {
      console.error('Gagal ambil data buku:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchBuku(); }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: name === 'stok' ? parseInt(value) || 0 : value }));
  };

  const handleTambah = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('http://127.0.0.1:3001/api/v1/buku', formData);
      setFormData({ judul: '', pengarang: '', tahun: '', kategori: '', stok: 1 });
      setIsAdding(false);
      fetchBuku();
    } catch (err) {
      console.error('Gagal tambah buku:', err);
    }
  };

  const handleHapus = async (id: number) => {
    if (!confirm('Apakah Anda yakin ingin menghapus buku ini?')) return;
    try {
      await axios.delete(`http://127.0.0.1:3001/api/v1/buku/${id}`);
      fetchBuku();
    } catch (err) {
      console.error('Gagal hapus buku:', err);
    }
  };

  const handleEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.put(`http://127.0.0.1:3001/api/v1/buku/${editingId}`, editData);
      setEditingId(null);
      fetchBuku();
    } catch (err) {
      console.error('Gagal update buku:', err);
    }
  };

  const filteredBooks = bukuList.filter(book =>
    (book.judul || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (book.pengarang || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (book.kategori || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8">
      <div className="max-w-7xl mx-auto">
        <button onClick={() => router.back()} className="flex items-center gap-2 mb-6 text-blue-600 hover:text-blue-800">
          <FiArrowLeft className="h-5 w-5" /> Kembali
        </button>

        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Kelola Koleksi Buku</h1>
            <p className="text-gray-600">{bukuList.length} buku terdaftar</p>
          </div>
          <div className="flex space-x-3">
            <div className="relative">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input type="text" placeholder="Cari buku..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border rounded-lg text-gray-900" />
            </div>
            <button onClick={() => fetchBuku()} className="p-2 bg-white border rounded-lg hover:bg-gray-100">
              <FiRefreshCw className="text-gray-600" />
            </button>
          </div>
        </div>

        <div className="mb-6">
          <button onClick={() => setIsAdding(!isAdding)} className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg">
            <FiPlus className="mr-2" /> {isAdding ? 'Batalkan' : 'Tambah Buku'}
          </button>
        </div>

        {isAdding && (
          <div className="bg-white p-6 rounded-xl shadow mb-6">
            <h2 className="text-xl font-semibold mb-4">Tambah Buku Baru</h2>
            <form onSubmit={handleTambah} className="grid gap-4 grid-cols-1 md:grid-cols-2">
              {['judul', 'pengarang', 'tahun', 'kategori'].map((field) => (
                <div key={field}>
                  <label className="block text-sm font-medium text-gray-700">{field[0].toUpperCase() + field.slice(1)}</label>
                  <input name={field} value={formData[field as keyof typeof formData]} onChange={handleInputChange} required
                    className="w-full p-2 border rounded-lg text-gray-900" />
                </div>
              ))}
              <div>
                <label className="block text-sm font-medium text-gray-700">Stok</label>
                <input name="stok" type="number" min={1} value={formData.stok} onChange={handleInputChange}
                  className="w-full p-2 border rounded-lg text-gray-900" required />
              </div>
              <div className="col-span-2 flex justify-end space-x-3">
                <button type="button" onClick={() => setIsAdding(false)} className="px-4 py-2 bg-red-600 text-white rounded-lg">Batal</button>
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg">Simpan Buku</button>
              </div>
            </form>
          </div>
        )}

        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          {loading ? <div className="p-8 text-center">Memuat data...</div> : (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  {['Judul', 'Pengarang', 'Tahun', 'Kategori', 'Stok', 'Aksi'].map((h) => (
                    <th key={h} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredBooks.map((buku) => (
                  <tr key={buku.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-gray-900 font-medium">{buku.judul}</td>
                    <td className="px-6 py-4 text-gray-900">{buku.pengarang}</td>
                    <td className="px-6 py-4 text-gray-900">{buku.tahun}</td>
                    <td className="px-6 py-4 text-gray-900">{buku.kategori}</td>
                    <td className="px-6 py-4 text-gray-900">{buku.stok}</td>
                    <td className="px-6 py-4 text-right">
                      <button onClick={() => handleHapus(buku.id)} className="text-red-600 hover:text-red-900 mr-3" title="Hapus">
                        <FiTrash2 />
                      </button>
                      <button onClick={() => {
                        setEditingId(buku.id);
                        setEditData({
                          judul: buku.judul,
                          pengarang: buku.pengarang,
                          tahun: String(buku.tahun),
                          kategori: buku.kategori,
                          stok: buku.stok
                        });
                      }} className="text-blue-600 hover:text-blue-900" title="Edit">
                        <FiEdit />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {editingId && (
          <div className="bg-yellow-50 p-6 mt-6 rounded-xl shadow-md">
            <h2 className="text-lg font-bold mb-4">Edit Buku</h2>
            <form onSubmit={handleEdit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {['judul', 'pengarang', 'tahun', 'kategori'].map((field) => (
                <div key={field}>
                  <label className="block text-sm font-medium text-gray-700">{field[0].toUpperCase() + field.slice(1)}</label>
                  <input name={field} value={editData[field as keyof typeof editData]}
                    onChange={(e) => setEditData(prev => ({ ...prev, [field]: e.target.value }))}
                    className="w-full p-2 border rounded-lg text-gray-900" required />
                </div>
              ))}
              <div>
                <label className="block text-sm font-medium text-gray-700">Stok</label>
                <input name="stok" type="number" min={1} value={editData.stok}
                  onChange={(e) => setEditData(prev => ({ ...prev, stok: parseInt(e.target.value) }))}
                  className="w-full p-2 border rounded-lg text-gray-900" required />
              </div>
              <div className="col-span-2 flex justify-end gap-3">
                <button type="button" onClick={() => setEditingId(null)} className="px-4 py-2 bg-gray-500 text-white rounded-lg">Batal</button>
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Simpan</button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
