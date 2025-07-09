'use client';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Plus, Trash2, Edit, Search, RefreshCw, ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface Peminjaman {
  id: number;
  user_id: number;
  buku_id: number;
  tanggal_pinjam: string;
  tanggal_kembali: string;
  status: 'dipinjam' | 'dikembalikan';
}

interface User {
  id: number;
  name: string;
}

interface Buku {
  id: number;
  judul: string;
}

export default function AdminPeminjamanPage() {
  const router = useRouter();
  const [data, setData] = useState<Peminjaman[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [books, setBooks] = useState<Buku[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);

  const [form, setForm] = useState({
    user_id: '',
    buku_id: '',
    tanggal_pinjam: '',
    tanggal_kembali: '',
    status: 'dipinjam' as 'dipinjam' | 'dikembalikan',
  });

  const fetchData = async () => {
    try {
      setLoading(true);
      const [peminjamanRes, usersRes, booksRes] = await Promise.all([
        axios.get('/api/v1/peminjaman'),
        axios.get('/api/v1/users'),
        axios.get('/api/v1/buku')
      ]);
      setData(peminjamanRes.data);
      setUsers(usersRes.data);
      setBooks(booksRes.data);
    } catch (err) {
      console.error('Gagal ambil data:', err);
      alert('Gagal memuat data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const resetForm = () => {
    setForm({
      user_id: '',
      buku_id: '',
      tanggal_pinjam: '',
      tanggal_kembali: '',
      status: 'dipinjam',
    });
    setEditId(null);
    setIsAdding(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const selectedUser = users.find(user => 
      `${user.name} (ID: ${user.id})` === form.user_id
    );
    const selectedBook = books.find(book => 
      `${book.judul} (ID: ${book.id})` === form.buku_id
    );

    if (!selectedUser || !selectedBook) {
      alert('Harap pilih pengguna dan buku yang valid');
      return;
    }

    const submitData = {
      ...form,
      user_id: selectedUser.id,
      buku_id: selectedBook.id
    };

    try {
      if (editId) {
        await axios.put(`/api/v1/peminjaman/${editId}`, submitData);
      } else {
        await axios.post('/api/v1/peminjaman', submitData);
      }
      resetForm();
      fetchData();
    } catch (err) {
      console.error(editId ? 'Gagal update data:' : 'Gagal tambah data:', err);
      alert(editId ? 'Gagal mengupdate peminjaman' : 'Gagal menambahkan peminjaman');
    }
  };

  const handleEdit = (peminjaman: Peminjaman) => {
    const user = users.find(u => u.id === peminjaman.user_id);
    const book = books.find(b => b.id === peminjaman.buku_id);
    
    setForm({
      user_id: user ? `${user.name} (ID: ${user.id})` : '',
      buku_id: book ? `${book.judul} (ID: ${book.id})` : '',
      tanggal_pinjam: peminjaman.tanggal_pinjam,
      tanggal_kembali: peminjaman.tanggal_kembali,
      status: peminjaman.status,
    });
    setEditId(peminjaman.id);
    setIsAdding(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Apakah Anda yakin ingin menghapus data peminjaman ini?')) return;
    try {
      await axios.delete(`/api/v1/peminjaman/${id}`);
      fetchData();
    } catch (err) {
      console.error('Gagal hapus data:', err);
      alert('Gagal menghapus peminjaman');
    }
  };

  const filteredData = data.filter(item => {
    const searchLower = searchTerm.toLowerCase();
    const user = users.find(u => u.id === item.user_id);
    const book = books.find(b => b.id === item.buku_id);
    
    return (
      item.id.toString().includes(searchLower) ||
      (user && user.name.toLowerCase().includes(searchLower)) ||
      (book && book.judul.toLowerCase().includes(searchLower)) ||
      item.status.toLowerCase().includes(searchLower)
    );
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID');
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8">
      <div className="max-w-7xl mx-auto">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 mb-6 text-blue-600 hover:text-blue-800 transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
          Kembali
        </button>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Kelola Peminjaman Buku</h1>
            <p className="text-gray-600 mt-2">
              {data.length} peminjaman terdaftar dalam sistem
            </p>
          </div>
          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-800 h-4 w-4" />
              <input
                type="text"
                placeholder="Cari peminjaman..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-black transition-colors w-full"
              />
            </div>
            <button
              onClick={() => fetchData()}
              className="p-2 bg-white border rounded-lg hover:bg-gray-100"
              title="Refresh"
            >
              <RefreshCw className="text-gray-600 h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="mb-6">
          <button
            onClick={() => {
              if (isAdding) resetForm();
              else setIsAdding(true);
            }}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="h-5 w-5" />
            {isAdding ? 'Batalkan' : 'Tambah Peminjaman'}
          </button>
        </div>

        {isAdding && (
          <div className="bg-white p-6 rounded-xl shadow-md mb-8 transition-all duration-300">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              {editId ? 'Edit Peminjaman' : 'Tambah Peminjaman Baru'}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Pengguna*</label>
                  <input
                    list="userList"
                    name="user_id"
                    value={form.user_id}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-black transition-colors"
                    placeholder="Cari atau ketik nama pengguna"
                    required
                  />
                  <datalist id="userList">
                    {users.map(user => (
                      <option key={user.id} value={`${user.name} (ID: ${user.id})`}>
                        {user.name} (ID: {user.id})
                      </option>
                    ))}
                  </datalist>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Buku*</label>
                  <input
                    list="bookList"
                    name="buku_id"
                    value={form.buku_id}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-black transition-colors"
                    placeholder="Cari atau ketik judul buku"
                    required
                  />
                  <datalist id="bookList">
                    {books.map(book => (
                      <option key={book.id} value={`${book.judul} (ID: ${book.id})`}>
                        {book.judul} (ID: {book.id})
                      </option>
                    ))}
                  </datalist>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tanggal Pinjam*</label>
                  <input
                    type="date"
                    name="tanggal_pinjam"
                    value={form.tanggal_pinjam}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-black transition-colors"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tanggal Kembali*</label>
                  <input
                    type="date"
                    name="tanggal_kembali"
                    value={form.tanggal_kembali}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-black transition-colors"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status*</label>
                  <select
                    name="status"
                    value={form.status}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-black transition-colors"
                  >
                    <option value="dipinjam">Dipinjam</option>
                    <option value="dikembalikan">Dikembalikan</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-end mt-6 gap-3">
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  {editId ? 'Update Peminjaman' : 'Simpan Peminjaman'}
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          {loading ? (
            <div className="p-8 text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
              <p className="mt-4 text-gray-600">Memuat data peminjaman...</p>
            </div>
          ) : filteredData.length === 0 ? (
            <div className="p-8 text-center">
              <p className="text-gray-500">
                {searchTerm ? 'Tidak ada peminjaman yang cocok dengan pencarian' : 'Tidak ada data peminjaman.'}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pengguna</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Buku</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tanggal Pinjam</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tanggal Kembali</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredData.map((item) => {
                    const user = users.find(u => u.id === item.user_id);
                    const book = books.find(b => b.id === item.buku_id);
                    
                    return (
                      <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.id}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            {user ? user.name : 'Unknown'} (ID: {item.user_id})
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {book ? book.judul : 'Unknown'} (ID: {item.buku_id})
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {formatDate(item.tanggal_pinjam)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {formatDate(item.tanggal_kembali)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            item.status === 'dipinjam' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
                          }`}>
                            {item.status === 'dipinjam' ? 'Dipinjam' : 'Dikembalikan'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex justify-end gap-2">
                            <button
                              onClick={() => handleDelete(item.id)}
                              className="text-red-600 hover:text-red-900 p-1 rounded hover:bg-red-50"
                              title="Hapus"
                            >
                              <Trash2 className="h-5 w-5" />
                            </button>
                            <button
                              onClick={() => handleEdit(item)}
                              className="text-blue-600 hover:text-blue-900 p-1 rounded hover:bg-blue-50"
                              title="Edit"
                            >
                              <Edit className="h-5 w-5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}