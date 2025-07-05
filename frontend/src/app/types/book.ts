// types/book.ts
export interface Buku {
  id: number;
  judul: string;
  pengarang: string;
  tahun: number;
  stok: number;
  kategori: string;
  cover?: string;
}