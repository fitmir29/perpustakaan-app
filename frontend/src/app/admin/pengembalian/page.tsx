'use client';
import axios from 'axios';
import { useEffect, useState, useRef } from 'react';
import { api } from 'src/app/lib/api';
import { FiTrash2, FiPlus, FiLoader, FiEdit, FiSearch, FiRefreshCw, FiArrowLeft } from 'react-icons/fi';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import { useRouter } from 'next/navigation';

interface Pengembalian {
  id: number;
  user_id: number;
  buku_id: number;
  tanggal_kembali: string;
  denda: number;
  user?: {
    name: string;
  };
  buku?: {
    judul: string;
  };
}

interface User {
  id: number;
  name: string;
}

interface Buku {
  id: number;
  judul: string;
}

export default function AdminPengembalianPage() {
  const router = useRouter();
  const [data, setData] = useState<Pengembalian[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [books, setBooks] = useState<Buku[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);

  // State untuk pencarian pengguna dan buku
  const [userSearch, setUserSearch] = useState('');
  const [bookSearch, setBookSearch] = useState('');
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [filteredBooks, setFilteredBooks] = useState<Buku[]>([]);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [showBookDropdown, setShowBookDropdown] = useState(false);

  const userDropdownRef = useRef<HTMLDivElement>(null);
  const bookDropdownRef = useRef<HTMLDivElement>(null);

  const [form, setForm] = useState({
    user_id: '',
    buku_id: '',
    tanggal_kembali: format(new Date(), 'yyyy-MM-dd'),
    denda: 0,
  });

  const fetchData = async () => {
    try {
      setLoading(true);
      const [pengembalianRes, usersRes, booksRes] = await Promise.all([
        axios.get('/api/v1/pengembalian', {
          params: { include: 'user,buku' }
        }),
        axios.get('/api/v1/users'),
        axios.get('/api/v1/buku')
      ]);
      setData(pengembalianRes.data);
      setUsers(usersRes.data);
      setBooks(booksRes.data);
    } catch (err) {
      console.error('Gagal ambil data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Filter pengguna dan buku berdasarkan pencarian
  useEffect(() => {
    if (userSearch) {
      setFilteredUsers(
        users.filter(user =>
          user.name.toLowerCase().includes(userSearch.toLowerCase()) ||
          user.id.toString().includes(userSearch)
        )
      );
    } else {
      setFilteredUsers(users.slice(0, 5));
    }
  }, [userSearch, users]);

  useEffect(() => {
    if (bookSearch) {
      setFilteredBooks(
        books.filter(book =>
          book.judul.toLowerCase().includes(bookSearch.toLowerCase()) ||
          book.id.toString().includes(bookSearch)
        )
      );
    } else {
      setFilteredBooks(books.slice(0, 5));
    }
  }, [bookSearch, books]);

  // Handle klik di luar dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userDropdownRef.current && !userDropdownRef.current.contains(event.target as Node)) {
        setShowUserDropdown(false);
      }
      if (bookDropdownRef.current && !bookDropdownRef.current.contains(event.target as Node)) {
        setShowBookDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: name === 'denda' ? Number(value) : value
    }));
  };

  const resetForm = () => {
    setForm({
      user_id: '',
      buku_id: '',
      tanggal_kembali: format(new Date(), 'yyyy-MM-dd'),
      denda: 0,
    });
    setUserSearch('');
    setBookSearch('');
    setEditId(null);
    setIsAdding(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      if (editId) {
        await axios.put(`/api/v1/pengembalian/${editId}`, form);
      } else {
        await axios.post('/api/v1/pengembalian', form);
      }
      resetForm();
      fetchData();
    } catch (err) {
      console.error(editId ? 'Gagal update data:' : 'Gagal tambah data:', err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (pengembalian: Pengembalian) => {
    const user = users.find(u => u.id === pengembalian.user_id);
    const book = books.find(b => b.id === pengembalian.buku_id);
    
    setForm({
      user_id: pengembalian.user_id.toString(),
      buku_id: pengembalian.buku_id.toString(),
      tanggal_kembali: pengembalian.tanggal_kembali,
      denda: pengembalian.denda,
    });
    
    setUserSearch(user ? `${user.name} (ID: ${user.id})` : '');
    setBookSearch(book ? `${book.judul} (ID: ${book.id})` : '');
    
    setEditId(pengembalian.id);
    setIsAdding(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Apakah Anda yakin ingin menghapus data pengembalian ini?')) return;
    try {
      await api.delete(`/pengembalian/${id}`);
      fetchData();
    } catch (err) {
      console.error('Gagal hapus data:', err);
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
      item.denda.toString().includes(searchLower)
    );
  });

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

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Kelola Pengembalian Buku</h1>
            <p className="text-gray-600 mt-2">
              {data.length} pengembalian terdaftar dalam sistem
            </p>
          </div>
          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
              <input
                type="text"
                placeholder="Cari pengembalian..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 w-full"
              />
            </div>
            <button
              onClick={() => fetchData()}
              className="p-2 bg-white border rounded-lg hover:bg-gray-100"
              title="Refresh"
            >
              <FiRefreshCw className="text-gray-600 h-5 w-5" />
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
            <FiPlus className="h-5 w-5" />
            {isAdding ? 'Batalkan' : 'Tambah Pengembalian'}
          </button>
        </div>

        {isAdding && (
          <div className="bg-white p-6 rounded-xl shadow-md mb-8 transition-all duration-300">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              {editId ? 'Edit Pengembalian' : 'Tambah Pengembalian Baru'}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                {/* Input Pengguna */}
                <div className="relative" ref={userDropdownRef}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Pengguna*</label>
                  <input
                    type="text"
                    placeholder="Cari pengguna..."
                    value={userSearch}
                    onChange={(e) => {
                      setUserSearch(e.target.value);
                      setShowUserDropdown(true);
                    }}
                    onFocus={() => setShowUserDropdown(true)}
                    className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                    required
                  />
                  {showUserDropdown && (
                    <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto">
                      {filteredUsers.length > 0 ? (
                        filteredUsers.map(user => (
                          <div
                            key={user.id}
                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                            onClick={() => {
                              setForm({ ...form, user_id: user.id.toString() });
                              setUserSearch(`${user.name} (ID: ${user.id})`);
                              setShowUserDropdown(false);
                            }}
                          >
                            {user.name} (ID: {user.id})
                          </div>
                        ))
                      ) : (
                        <div className="px-4 py-2 text-gray-500">Tidak ditemukan</div>
                      )}
                    </div>
                  )}
                </div>

                {/* Input Buku */}
                <div className="relative" ref={bookDropdownRef}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Buku*</label>
                  <input
                    type="text"
                    placeholder="Cari buku..."
                    value={bookSearch}
                    onChange={(e) => {
                      setBookSearch(e.target.value);
                      setShowBookDropdown(true);
                    }}
                    onFocus={() => setShowBookDropdown(true)}
                    className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                    required
                  />
                  {showBookDropdown && (
                    <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto">
                      {filteredBooks.length > 0 ? (
                        filteredBooks.map(book => (
                          <div
                            key={book.id}
                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                            onClick={() => {
                              setForm({ ...form, buku_id: book.id.toString() });
                              setBookSearch(`${book.judul} (ID: ${book.id})`);
                              setShowBookDropdown(false);
                            }}
                          >
                            {book.judul} (ID: {book.id})
                          </div>
                        ))
                      ) : (
                        <div className="px-4 py-2 text-gray-500">Tidak ditemukan</div>
                      )}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tanggal Kembali*</label>
                  <input
                    type="date"
                    name="tanggal_kembali"
                    value={form.tanggal_kembali}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Denda (Rp)*</label>
                  <input
                    type="number"
                    name="denda"
                    placeholder="Jumlah denda"
                    value={form.denda}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                    required
                    min="0"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-4 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-900 flex items-center justify-center disabled:opacity-50"
                >
                  {submitting ? (
                    <>
                      <FiLoader className="animate-spin mr-2" />
                      {editId ? 'Mengupdate...' : 'Menyimpan...'}
                    </>
                  ) : (
                    editId ? 'Update Pengembalian' : 'Simpan Pengembalian'
                  )}
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          {loading ? (
            <div className="p-8 text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">Memuat data pengembalian...</p>
            </div>
          ) : filteredData.length === 0 ? (
            <div className="p-8 text-center">
              <p className="text-gray-500">
                {searchTerm ? 'Tidak ada pengembalian yang cocok dengan pencarian' : 'Tidak ada data pengembalian.'}
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
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tanggal Kembali</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Denda</th>
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
                          {format(new Date(item.tanggal_kembali), 'dd MMMM yyyy', { locale: id })}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(item.denda)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex justify-end gap-2">
                            <button
                              onClick={() => handleDelete(item.id)}
                              className="text-red-600 hover:text-red-900 p-1 rounded hover:bg-red-50"
                              title="Hapus"
                            >
                              <FiTrash2 className="h-5 w-5" />
                            </button>
                            <button
                              onClick={() => handleEdit(item)}
                              className="text-blue-600 hover:text-blue-900 p-1 rounded hover:bg-blue-50"
                              title="Edit"
                            >
                              <FiEdit className="h-5 w-5" />
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