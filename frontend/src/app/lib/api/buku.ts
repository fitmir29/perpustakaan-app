// frontend/src/lib/api/buku.ts

// Pertama, definisikan tipe Book (atau impor dari file types)
interface Book {
  id: string;
  title: string;
  author: string;
  year: number;
  pages: number;
  cover: string;
  rating: number;
  stock: number;
  isbn?: string;
  publisher?: string;
  description?: string;
}

export async function fetchBookById(id: string): Promise<Book | null> {
  try {
    // Tambahkan base URL jika diperlukan
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || '';
    const response = await fetch(`${apiUrl}/api/buku/${id}`, {
      headers: {
        'Content-Type': 'application/json',
      },
      // Tambahkan credentials jika diperlukan
      credentials: 'include',
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Gagal mengambil data buku');
    }
    
    const data = await response.json();
    
    // Validasi data response
    if (!data.id || !data.title) {
      throw new Error('Format data buku tidak valid');
    }
    
    return data as Book;
  } catch (error) {
    console.error('Error fetching book:', error);
    // Untuk debugging, tampilkan error ke user
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error('Terjadi kesalahan saat mengambil data buku');
  }
}