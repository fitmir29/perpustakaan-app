import Image from "next/image";
import Link from "next/link";
import { BookOpen, CalendarDays, ShieldCheck, Star, ArrowRight } from "lucide-react";

export default function Home() {
  const features = [
    {
      icon: <BookOpen className="h-10 w-10 text-indigo-600" />,
      title: "Koleksi Lengkap",
      description: "Akses ribuan buku digital, jurnal ilmiah, dan majalah terbaru dari berbagai penerbit ternama."
    },
    {
      icon: <CalendarDays className="h-10 w-10 text-indigo-600" />,
      title: "Peminjaman Online",
      description: "Pinjam buku secara online dan atur jadwal pengambilan dengan mudah melalui aplikasi."
    },
    {
      icon: <ShieldCheck className="h-10 w-10 text-indigo-600" />,
      title: "Keamanan Data",
      description: "Data pribadi dan transaksi Anda dilindungi dengan sistem keamanan tingkat tinggi."
    }
  ];

  const popularBooks = [
    {
      title: "Laskar Pelangi",
      author: "Andrea Hirata",
      category: "Fiksi",
      rating: 4.8
    },
    {
      title: "Bumi Manusia",
      author: "Pramoedya Ananta Toer",
      category: "Sejarah",
      rating: 4.9
    },
    {
      title: "Filosofi Teras",
      author: "Henry Manampiring",
      category: "Filsafat",
      rating: 4.7
    },
    {
      title: "Atomic Habits",
      author: "James Clear",
      category: "Pengembangan Diri",
      rating: 4.8
    }
  ];

  const testimonials = [
    {
      name: "Dina Putri",
      role: "Mahasiswa",
      comment: "Aplikasi ini sangat membantu tugas kuliah saya. Koleksi bukunya lengkap dan proses peminjaman mudah."
    },
    {
      name: "Rizky Pratama",
      role: "Dosen",
      comment: "Saya sangat terbantu dengan akses jurnal internasional melalui perpustakaan digital ini."
    },
    {
      name: "Siti Aisyah",
      role: "Peneliti",
      comment: "Platform yang bagus untuk penelitian. Saya bisa mengakses berbagai referensi penting kapan saja."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-cyan-50">
      {/* Hero Section */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-64 h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
          <div className="absolute top-10 right-20 w-72 h-72 bg-yellow-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-20 left-1/2 w-60 h-60 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 py-24 sm:py-32 lg:px-8 lg:py-40 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            <span className="block">Selamat Datang di</span>
            <span className="block bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600">
              Perpustakaan Digital
            </span>
          </h1>
          <p className="mt-6 text-xl text-gray-600 max-w-3xl mx-auto">
            Jelajahi ribuan koleksi buku, majalah, dan jurnal terbaru dari berbagai bidang ilmu pengetahuan
          </p>
          
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              href="/user/buku"
              className="px-8 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-medium rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 hover:from-purple-700 hover:to-indigo-700"
            >
              Jelajahi Koleksi
            </Link>
            <Link
              href="/user/login"
              className="px-8 py-3 bg-white text-indigo-600 font-medium rounded-full shadow-lg hover:shadow-xl border-2 border-indigo-100 transform hover:-translate-y-1 transition-all duration-300 hover:bg-gray-50"
            >
              Masuk Akun
            </Link>
          </div>
        </div>
      </header>

      {/* Stats Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-indigo-50 rounded-xl p-6 text-center">
              <div className="text-4xl font-bold text-indigo-600">15K+</div>
              <div className="text-gray-600 mt-2">Judul Buku</div>
            </div>
            <div className="bg-indigo-50 rounded-xl p-6 text-center">
              <div className="text-4xl font-bold text-indigo-600">500+</div>
              <div className="text-gray-600 mt-2">Jurnal Akademik</div>
            </div>
            <div className="bg-indigo-50 rounded-xl p-6 text-center">
              <div className="text-4xl font-bold text-indigo-600">10K+</div>
              <div className="text-gray-600 mt-2">Anggota Aktif</div>
            </div>
            <div className="bg-indigo-50 rounded-xl p-6 text-center">
              <div className="text-4xl font-bold text-indigo-600">24/7</div>
              <div className="text-gray-600 mt-2">Akses Digital</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">Fitur Unggulan Kami</h2>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              Nikmati pengalaman membaca yang lebih baik dengan fitur-fitur modern kami
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <div className="w-16 h-16 bg-indigo-100 rounded-xl flex items-center justify-center mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Books */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">Buku Terpopuler</h2>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              Koleksi buku paling banyak dipinjam minggu ini
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {popularBooks.map((book, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <div className="h-48 bg-gradient-to-r from-blue-400 to-indigo-600 flex items-center justify-center">
                  <div className="bg-gray-200 border-2 border-dashed rounded-xl w-32 h-40" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{book.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">Oleh {book.author}</p>
                  <div className="flex justify-between items-center">
                    <span className="bg-indigo-100 text-indigo-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                      {book.category}
                    </span>
                    <div className="flex items-center">
                      <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                      <span className="ml-1 text-gray-600">{book.rating}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>



          <div className="mt-12 text-center">
            <Link
              href="/user/buku"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 transition-all duration-300"
            >
              Lihat Semua Buku
              <ArrowRight className="ml-2 -mr-1 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-gradient-to-r from-indigo-600 to-purple-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold">Apa Kata Pengguna Kami</h2>
            <p className="mt-4 text-xl opacity-90 max-w-3xl mx-auto">
              Pengalaman nyata dari anggota perpustakaan kami
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-8 hover:bg-opacity-20 transition-all duration-300">
                <div className="flex items-center mb-6">
                  <div className="bg-gray-200 border-2 border-dashed rounded-full w-16 h-16" />
                  <div className="ml-4">
                    <h4 className="text-lg font-bold">{testimonial.name}</h4>
                    <p className="text-indigo-200">{testimonial.role}</p>
                  </div>
                </div>
                <p className="italic">"{testimonial.comment}"</p>
                <div className="flex mt-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-300 fill-yellow-300" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}