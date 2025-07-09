// frontend/src/components/buku/BookDetail.tsx
import { Book } from '@/types/buku';

interface BookDetailProps {
  book: Book;
}

export function BookDetail({ book }: BookDetailProps) {
  return (
    <div className="grid md:grid-cols-2 gap-8">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <img 
          src={book.cover} 
          alt={book.title}
          className="w-full h-auto rounded"
        />
      </div>
      <div className="space-y-4">
        <h1 className="text-3xl font-bold">{book.title}</h1>
        <p className="text-gray-600">Oleh: {book.author}</p>
        <div className="flex items-center space-x-2">
          <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
            {book.year}
          </span>
          <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm">
            {book.pages} halaman
          </span>
        </div>
        <p className="text-gray-700">{book.description}</p>
      </div>
    </div>
  );
}