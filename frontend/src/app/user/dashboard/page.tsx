'use client';

import Link from 'next/link';

export default function UserDashboardPage() {
return (
<div className="min-h-screen bg-gray-50 px-4 py-10">
<div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-8">
<h1 className="text-3xl font-bold text-blue-800 mb-4 text-center">Dashboard Pengguna</h1>
<p className="text-gray-700 text-center mb-6">
Selamat datang di sistem perpustakaan. Di sini Anda dapat melihat buku yang tersedia dan memantau status peminjaman Anda.
</p>

php-template
Copy
Edit
    <div className="flex flex-col md:flex-row justify-center gap-4 mt-6">
      <Link
        href="/user/buku"
        className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white text-center rounded shadow font-semibold"
      >
        Lihat Daftar Buku
      </Link>
      <Link
        href="/user/peminjaman"
        className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white text-center rounded shadow font-semibold"
      >
        Cek Peminjaman Saya
      </Link>
    </div>
  </div>
</div>
);
}