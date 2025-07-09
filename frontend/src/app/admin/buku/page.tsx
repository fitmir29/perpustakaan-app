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

  // Form state
  const [formData, setFormData] = useState({
    judul: '',
    pengarang: '',
    tahun: '',
    kategori: '',
    stok: 1
  });

  const fetchBuku = async () => {
    try {
      setLoading(true);
      const res = await axios.get('http://127.0.0.1:3001/api/v1/buku');;
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'stok' ? parseInt(value) || 0 : value
    }));
  };

  const handleTambah = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('http://127.0.0.1:3001/api/v1/buku', formData);

      setFormData({
        judul: '',
        pengarang: '',
        tahun: '',
        kategori: '',
        stok: 1
      });
      setIsAdding(false);
      fetchBuku();
    } catch (err) {
      console.error('Gagal tambah buku:', err);
    }
  };

  const handleHapus = async (id: number) => {
    if (!confirm('Apakah Anda yakin ingin menghapus buku ini?')) return;
    try {
      await axios.delete(`/api/v1/buku/${id}`);
      fetchBuku();
    } catch (err) {
      console.error('Gagal hapus buku:', err);
    }
  };

  const filteredBooks = bukuList.filter(book =>
    book.judul.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.pengarang.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.kategori.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8">
      <div className="max-w-7xl mx-auto">
        {/* Tombol Kembali */}
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 mb-6 text-blue-600 hover:text-blue-800 transition-colors"
        >
          <FiArrowLeft className="h-5 w-5" />
          Kembali
        </button>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Kelola Koleksi Buku</h1>
            <p className="text-gray-600 mt-2">
              {bukuList.length} buku terdaftar dalam sistem
            </p>
          </div>
          <div className="flex items-center space-x-3 mt-4 md:mt-0">
            <div className="relative">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Cari buku..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
              />
            </div>
            <button
              onClick={() => fetchBuku()}
              className="p-2 bg-white border rounded-lg hover:bg-gray-100"
              title="Refresh"
            >
              <FiRefreshCw className="text-gray-600" />
            </button>
          </div>
        </div>

        {/* Add Book Button */}
        <div className="mb-6">
          <button
            onClick={() => setIsAdding(!isAdding)}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <FiPlus className="mr-2" />
            {isAdding ? 'Batalkan' : 'Tambah Buku'}
          </button>
        </div>

        {/* Add Book Form */}
        {isAdding && (
          <div className="bg-white p-6 rounded-xl shadow-md mb-8 transition-all duration-300">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Tambah Buku Baru</h2>
            <form onSubmit={handleTambah}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Judul */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Judul</label>
                  <input
                    type="text"
                    name="judul"
                    value={formData.judul}
                    onChange={handleInputChange}
                    required
                    className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                  />
                </div>
                
                {/* Pengarang */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Pengarang</label>
                  <input
                    type="text"
                    name="pengarang"
                    value={formData.pengarang}
                    onChange={handleInputChange}
                    required
                    className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                  />
                </div>
                
                {/* Tahun */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tahun</label>
                  <input
                    type="text"
                    name="tahun"
                    value={formData.tahun}
                    onChange={handleInputChange}
                    required
                    className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                  />
                </div>
                
                {/* Kategori */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Kategori</label>
                  <input
                    type="text"
                    name="kategori"
                    value={formData.kategori}
                    onChange={handleInputChange}
                    required
                    className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                  />
                </div>
                
                {/* Stok */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Stok</label>
                  <input
                    type="number"
                    name="stok"
                    value={formData.stok}
                    onChange={handleInputChange}
                    min={1}
                    required
                    className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                  />
                </div>
              </div>
              <div className="flex justify-end mt-6 space-x-3">
                <button
                  type="button"
                  onClick={() => setIsAdding(false)}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Simpan Buku
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Book List */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          {loading ? (
            <div className="p-8 text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
              <p className="mt-4 text-gray-600">Memuat data buku...</p>
            </div>
          ) : filteredBooks.length === 0 ? (
            <div className="p-8 text-center">
              <p className="text-gray-500">
                {searchTerm ? 'Tidak ada buku yang cocok dengan pencarian' : 'Tidak ada buku tersedia.'}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Judul</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pengarang</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tahun</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kategori</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stok</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredBooks.map((buku) => (
                    <tr key={buku.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-gray-900">
                        <div className="font-medium">{buku.judul}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-900">{buku.pengarang}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-900">{buku.tahun}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-900">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                          {buku.kategori}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-900">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${buku.stok > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                          {buku.stok} tersedia
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => handleHapus(buku.id)}
                          className="text-red-600 hover:text-red-900 mr-3"
                          title="Hapus"
                        >
                          <FiTrash2 />
                        </button>
                        <button
                          className="text-blue-600 hover:text-blue-900"
                          title="Edit"
                        >
                          <FiEdit />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 