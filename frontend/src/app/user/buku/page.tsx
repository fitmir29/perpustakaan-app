// app/buku/page.tsx
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

// Enhanced book data with additional fields
const sampleBooks = [
  {
    id: 1,
    title: 'Pemrograman Modern dengan TypeScript',
    author: 'John Doe',
    category: 'Teknologi',
    year: 2023,
    cover: '/covers/book1.jpg',
    description: 'Panduan lengkap pengembangan aplikasi modern menggunakan TypeScript',
    pages: 320,
    rating: 4.5
  },
  {
    id: 2,
    title: 'Seni Desain UI/UX',
    author: 'Jane Smith',
    category: 'Desain',
    year: 2022,
    cover: '/covers/book2.jpg',
    description: 'Prinsip-prinsip desain antarmuka pengguna yang efektif',
    pages: 280,
    rating: 4.2
  },
  {
    id: 3,
    title: 'Machine Learning untuk Pemula',
    author: 'Robert Johnson',
    category: 'Kecerdasan Buatan',
    year: 2023,
    cover: '/covers/book3.jpg',
    description: 'Pengenalan praktis ke dunia machine learning',
    pages: 350,
    rating: 4.7
  },
  {
    id: 4,
    title: 'Sejarah Peradaban Dunia',
    author: 'Emily Davis',
    category: 'Sejarah',
    year: 2021,
    cover: '/covers/book4.jpg',
    description: 'Perjalanan sejarah peradaban manusia dari masa ke masa',
    pages: 420,
    rating: 4.3
  },
  {
    id: 5,
    title: 'Algoritma dan Struktur Data',
    author: 'Michael Brown',
    category: 'Teknologi',
    year: 2022,
    cover: '/covers/book5.jpg',
    description: 'Dasar-dasar algoritma untuk pengembangan perangkat lunak',
    pages: 380,
    rating: 4.6
  },
  {
    id: 6,
    title: 'Psikologi Warna dalam Desain',
    author: 'Sarah Wilson',
    category: 'Desain',
    year: 2023,
    cover: '/covers/book6.jpg',
    description: 'Pengaruh psikologis warna dalam desain visual',
    pages: 210,
    rating: 4.1
  },
  {
    id: 7,
    title: 'Blockchain: Dasar dan Implementasi',
    author: 'David Lee',
    category: 'Teknologi',
    year: 2023,
    cover: '/covers/book7.jpg',
    description: 'Memahami teknologi blockchain dari dasar hingga implementasi',
    pages: 290,
    rating: 4.4
  },
  {
    id: 8,
    title: 'Filosofi Seni Modern',
    author: 'Lisa Chen',
    category: 'Seni',
    year: 2021,
    cover: '/covers/book8.jpg',
    description: 'Eksplorasi filosofi di balik seni modern',
    pages: 240,
    rating: 4.0
  }
];

export default function BukuPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 8;

  // Filter books based on search and category
  const filteredBooks = sampleBooks.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         book.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === '' || book.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Pagination logic
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);
  const totalPages = Math.ceil(filteredBooks.length / booksPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <main className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Koleksi Buku Perpustakaan
          </h1>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
            Jelajahi ribuan koleksi buku dari berbagai bidang ilmu pengetahuan
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-8 flex flex-col sm:flex-row gap-4 justify-between items-center">
          <div className="w-full sm:w-1/2">
            <input
              type="text"
              placeholder="Cari judul buku, penulis, atau kategori..."
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>
          <div className="w-full sm:w-auto">
            <select 
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              value={selectedCategory}
              onChange={(e) => {
                setSelectedCategory(e.target.value);
                setCurrentPage(1);
              }}
            >
              <option value="">Semua Kategori</option>
              <option value="Teknologi">Teknologi</option>
              <option value="Desain">Desain</option>
              <option value="Kecerdasan Buatan">Kecerdasan Buatan</option>
              <option value="Sejarah">Sejarah</option>
              <option value="Seni">Seni</option>
            </select>
          </div>
        </div>

        {/* Results count */}
        <div className="mb-4 text-sm text-gray-600">
          Menampilkan {currentBooks.length} dari {filteredBooks.length} buku
        </div>

        {/* Book Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {currentBooks.map((book) => (
            <div 
              key={book.id} 
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col h-full"
            >
              {/* Book Cover with fixed aspect ratio */}
              <div className="relative h-48 w-full bg-gray-200">
                <Image
                  src={book.cover}
                  alt={`Cover ${book.title}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  priority={false}
                />
              </div>
              
              {/* Book Info */}
              <div className="p-4 flex-grow flex flex-col">
                <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">{book.title}</h3>
                <p className="text-sm text-gray-600 mt-1">Oleh: {book.author}</p>
                <p className="text-xs text-gray-500 mt-2 line-clamp-2">{book.description}</p>
                
                <div className="mt-auto pt-3">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs bg-indigo-100 text-indigo-800 px-2 py-1 rounded-full">
                      {book.category}
                    </span>
                    <div className="flex items-center">
                      <span className="text-yellow-500 mr-1">★</span>
                      <span className="text-sm text-gray-700">{book.rating}</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center text-sm text-gray-500 mb-3">
                    <span>{book.pages} halaman</span>
                    <span>{book.year}</span>
                  </div>
                  <Link href={`/buku/${book.id}`}>
  <button className="px-4 py-2 bg-blue-500 text-white rounded">
    Detail Buku
  </button>
  <Link
          href="/user/detailbuku"
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-6 rounded text-center shadow"
        ></Link>
</Link>
                  
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        {filteredBooks.length > booksPerPage && (
          <div className="mt-12 flex justify-center">
            <nav className="flex items-center space-x-2">
              <button 
                onClick={() => paginate(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 rounded-md bg-gray-200 text-gray-700 disabled:opacity-50"
              >
                Previous
              </button>
              
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
                <button
                  key={number}
                  onClick={() => paginate(number)}
                  className={`px-3 py-1 rounded-md ${currentPage === number ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                >
                  {number}
                </button>
              ))}
              
              <button 
                onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="px-3 py-1 rounded-md bg-gray-200 text-gray-700 disabled:opacity-50"
              >
                Next
              </button>
            </nav>
          </div>
        )}
      </div>
    </main>
  );
}