'use client';

import Link from 'next/link';

export default function AdminDashboardPage() {
return (
<div className="min-h-screen bg-gray-50 px-4 py-10">
<div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-8">
<h1 className="text-3xl font-bold text-blue-800 mb-6 text-center">
Dashboard Admin
</h1>


    <p className="text-gray-700 text-center mb-6">
      Selamat datang, Admin. Gunakan menu berikut untuk mengelola data perpustakaan.
    </p>

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      <Link
        href="/admin/buku"
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-6 rounded text-center shadow"
      >
        📚 Kelola Buku
      </Link>

      <Link
        href="/admin/peminjaman"
        className="bg-green-600 hover:bg-green-700 text-white font-semibold py-4 px-6 rounded text-center shadow"
      >
        📖 Kelola Peminjaman
      </Link>

      <Link
        href="/admin/pengembalian"
        className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-4 px-6 rounded text-center shadow"
      >
        📦 Kelola Pengembalian
      </Link>

      <Link
        href="/"
        className="bg-gray-700 hover:bg-gray-800 text-white font-semibold py-4 px-6 rounded text-center shadow"
      >
        ⬅️ Kembali ke Beranda
      </Link>
    </div>
  </div>
</div>
);
}