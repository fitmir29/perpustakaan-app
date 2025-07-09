// app/user/buku/detailbulk.tsx
import Link from 'next/link';

interface Book {
  id: string;
  title: string;
  author: string;
  description: string;
  coverImage: string;
  year: number;
  isAvailable: boolean;
}

export default function DetailBukuPage({ params }: { params: { id: string } }) {
  // Ini contoh data dummy, nanti bisa diganti dengan data dari API
  const book: Book = {
    id: params.id,
    title: "Judul Buku Contoh",
    author: "Penulis Contoh",
    description: "Ini adalah deskripsi buku contoh yang menjelaskan tentang isi buku secara singkat dan menarik.",
    coverImage: "/images/book-cover.jpg",
    year: 2023,
    isAvailable: true
  };

  const handlePinjam = () => {
    // Logika untuk meminjam buku
    alert(`Buku "${book.title}" berhasil dipinjam!`);
    // Di sini bisa ditambahkan kode untuk mengirim request ke API
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/3 p-4">
            <img 
              src={book.coverImage} 
              alt={book.title}
              className="w-full h-auto rounded-lg"
            />
          </div>
          <div className="md:w-2/3 p-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">{book.title}</h1>
            <p className="text-gray-600 mb-4">Oleh: {book.author}</p>
            <p className="text-gray-600 mb-4">Tahun Terbit: {book.year}</p>
            
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">Deskripsi</h2>
              <p className="text-gray-700">{book.description}</p>
            </div>

            <div className="flex space-x-4">
              <button
                onClick={handlePinjam}
                disabled={!book.isAvailable}
                className={`px-6 py-2 rounded-md font-medium ${
                  book.isAvailable 
                    ? 'bg-blue-600 text-white hover:bg-blue-700' 
                    : 'bg-gray-400 text-gray-700 cursor-not-allowed'
                }`}
              >
                {book.isAvailable ? 'Pinjam Buku' : 'Tidak Tersedia'}
              </button>

              <Link 
                href="/user/buku" 
                className="px-6 py-2 border border-gray-300 rounded-md font-medium text-gray-700 hover:bg-gray-100"
              >
                Kembali
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}