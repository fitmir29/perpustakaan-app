'use client';
import Link from 'next/link';

export default function AdminDashboardPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold text-center text-blue-800 mb-6">Dashboard Admin</h1>
        
        <p className="text-gray-600 text-center mb-8">
          Selamat datang, Admin. Gunakan menu berikut untuk mengelola data perpustakaan.
        </p>

        <div className="grid grid-cols-2 gap-4">
          {/* Kelola Buku - Blue */}
          <Link
            href="/admin/buku"
            className="p-4 text-center font-medium text-white rounded-md transition-all hover:shadow-md bg-blue-500 hover:bg-blue-600"
          >
            <div className="flex items-center justify-center gap-2">
              <span className="text-xl">📚</span>
              <span>Kelola Buku</span>
            </div>
          </Link>
          
          {/* Kelola Peminjaman - Green */}
          <Link
            href="/admin/peminjaman"
            className="p-4 text-center font-medium text-white rounded-md transition-all hover:shadow-md bg-green-500 hover:bg-green-600"
          >
            <div className="flex items-center justify-center gap-2">
              <span className="text-xl">📖</span>
              <span>Kelola Peminjaman</span>
            </div>
          </Link>
          
          {/* Kelola Pengembalian - Yellow */}
          <Link
            href="/admin/pengembalian"
            className="p-4 text-center font-medium text-white rounded-md transition-all hover:shadow-md bg-yellow-500 hover:bg-yellow-600"
          >
            <div className="flex items-center justify-center gap-2">
              <span className="text-xl">📦</span>
              <span>Kelola Pengembalian</span>
            </div>
          </Link>
          
          {/* Kembali ke Beranda - Gray */}
          <Link
            href="/"
            className="p-4 text-center font-medium text-white rounded-md transition-all hover:shadow-md bg-gray-500 hover:bg-gray-600"
          >
            <div className="flex items-center justify-center gap-2">
              <span className="text-xl">⬅️</span>
              <span>Kembali ke Beranda</span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}