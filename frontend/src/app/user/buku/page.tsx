// src/app/buku/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { isAuthenticated } from 'src/app/lib/auth';
import BukuCard from 'src/components/bukucard';
import ProtectedRoute from 'src/components/protectedroute';

interface Buku {
  id: number;
  judul: string;
  penulis: string;
  pengarang: string;
  kategori: string;
  deskripsi: string;
  stok: number;
  tahunTerbit: number;
  tahun: number;
  cover: string;
}

export default function BukuPage() {
  const [bukuList, setBukuList] = useState<Buku[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push('/user/login');
      return;
    }

    // Simulasi fetch data buku
    setTimeout(() => {
      setBukuList([
        {
          id: 1,
          judul: 'Laskar Pelangi',
          penulis: 'Andrea Hirata',
          pengarang: 'Andrea Hirata',
          kategori: 'Fiksi',
          deskripsi: 'Kisah persahabatan sepuluh anak di Belitung yang penuh dengan perjuangan dan harapan.',
          stok: 5,
          tahunTerbit: 2005,
          tahun: 2005,
          cover: '/covers/laskar-pelangi.jpg',
        },
        {
          id: 2,
          judul: 'Bumi Manusia',
          penulis: 'Pramoedya Ananta Toer',
          pengarang: 'Pramoedya Ananta Toer',
          kategori: 'Sejarah',
          deskripsi: 'Novel pertama dari Tetralogi Buru yang menceritakan kehidupan Minke, seorang pribumi di era kolonial.',
          stok: 3,
          tahunTerbit: 1980,
          tahun: 1980,
          cover: '/covers/bumi-manusia.jpg',
        },
        {
          id: 3,
          judul: 'Perahu Kertas',
          penulis: 'Dee Lestari',
          pengarang: 'Dee Lestari',
          kategori: 'Romansa',
          deskripsi: 'Kisah cinta dan persahabatan yang terjalin antara Kugy dan Keenan melalui seni dan impian.',
          stok: 0,
          tahunTerbit: 2009,
          tahun: 2009,
          cover: '/covers/perahu-kertas.jpg',
        },
        {
          id: 4,
          judul: 'Negeri 5 Menara',
          penulis: 'Ahmad Fuadi',
          pengarang: 'Ahmad Fuadi',
          kategori: 'Inspiratif',
          deskripsi: 'Kisah perjalanan hidup seorang santri yang penuh inspirasi dan motivasi.',
          stok: 7,
          tahunTerbit: 2009,
          tahun: 2009,
          cover: '/covers/negeri-5-menara.jpg',
        },
      ]);
      setIsLoading(false);
    }, 1000);
  }, []);

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-cyan-50 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold text-gray-900">Koleksi Buku</h1>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              Temukan buku-buku terbaik dari berbagai genre dan penulis ternama
            </p>
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
            </div>
          ) : bukuList.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-xl shadow-sm">
              <div className="mx-auto w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Buku tidak ditemukan</h3>
              <p className="text-gray-600">Maaf, tidak ada buku yang tersedia saat ini.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {bukuList.map((buku: Buku) => (
                <BukuCard key={buku.id} buku={buku} />
              ))}
            </div>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
}