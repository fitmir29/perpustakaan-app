// frontend/src/types/book.ts

/**
 * Interface untuk merepresentasikan data buku dalam sistem perpustakaan
 */
export interface Buku {
  /** ID unik buku (auto-increment) */
  id: number;
  
  /** Judul buku (wajib) */
  judul: string;
  
  /** Nama pengarang/penulis (wajib) */
  pengarang: string;
  
  /** Tahun terbit (wajib) */
  tahun: number;
  
  /** Jumlah stok yang tersedia (wajib) */
  stok: number;
  
  /** Kategori buku (wajib) */
  kategori: string;
  
  /** URL gambar cover buku (opsional) */
  cover?: string;
  
  /** ISBN buku (opsional) */
  isbn?: string;
  
  /** Penerbit buku (opsional) */
  penerbit?: string;
  
  /** Jumlah halaman (opsional) */
  jumlah_halaman?: number;
  
  /** Deskripsi/sinopsis buku (opsional) */
  deskripsi?: string;
  
  /** Rating buku 1-5 (opsional) */
  rating?: number;
  
  /** Tanggal ditambahkan ke sistem (auto-generated) */
  tanggal_ditambahkan?: Date;
  
  /** Status ketersediaan (auto-calculated) */
  tersedia?: boolean;
}

/**
 * Interface untuk payload saat menambah/mengupdate buku
 */
export interface BukuPayload {
  judul: string;
  pengarang: string;
  tahun: number;
  stok: number;
  kategori: string;
  cover?: string;
  isbn?: string;
  penerbit?: string;
  jumlah_halaman?: number;
  deskripsi?: string;
}

/**
 * Enum untuk kategori buku
 */
export enum KategoriBuku {
  FIKSI = 'Fiksi',
  NON_FIKSI = 'Non-Fiksi',
  SAINS = 'Sains',
  TEKNOLOGI = 'Teknologi',
  SEJARAH = 'Sejarah',
  BISNIS = 'Bisnis',
  PSIKOLOGI = 'Psikologi',
  SENI = 'Seni',
}

/**
 * Type untuk filter buku
 */
export type FilterBuku = {
  kategori?: string;
  tahun_min?: number;
  tahun_max?: number;
  search?: string;
  sort_by?: 'judul' | 'tahun' | 'rating';
  sort_order?: 'asc' | 'desc';
};