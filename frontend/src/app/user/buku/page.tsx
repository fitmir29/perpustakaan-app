'use client';

import { useEffect, useState } from 'react';
import { api } from 'src/app/lib/api';
import { Buku } from 'src/app/types';
import BukuCard from 'src/components/bukucard';


export default function UserBukuPage() {
const [bukuList, setBukuList] = useState<Buku[]>([]);
const [loading, setLoading] = useState(true);

useEffect(() => {
const fetchBuku = async () => {
try {
const response = await api.get('/buku');
// Jika Rails mengembalikan: { data: [...] } → response.data.data
// Jika langsung array: response.data
const data = Array.isArray(response.data) ? response.data : response.data.data;
setBukuList(data);
} catch (error) {
console.error('Gagal mengambil data buku:', error);
} finally {
setLoading(false);
}
};


fetchBuku();
}, []);

return (
<div className="min-h-screen bg-white px-4 py-8">
<h1 className="text-3xl font-bold text-blue-700 mb-6 text-center">Daftar Buku</h1>

php-template
Copy
Edit
  {loading ? (
    <p className="text-center text-gray-600">Memuat data buku...</p>
  ) : bukuList.length === 0 ? (
    <p className="text-center text-gray-600">Tidak ada data buku.</p>
  ) : (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {bukuList.map((buku) => (
        <BukuCard key={buku.id} buku={buku} />
      ))}
    </div>
  )}
</div>
);
}