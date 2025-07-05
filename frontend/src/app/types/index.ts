src/app/types/index.ts
export interface Buku {
id: number;
judul: string;
pengarang: string;
tahun: number;
kategori: string;
stok: number;
}

// User
export interface User {
id: number;
nama: string;
email: string;
// Tambahan jika diperlukan
// role?: 'admin' | 'user';
created_at?: string;
updated_at?: string;
}

// Peminjaman
export interface Peminjaman {
id: number;
user_id: number;
buku_id: number;
tanggal_pinjam: string;
tanggal_kembali: string;
status: 'dipinjam' | 'dikembalikan';
user?: User; // Relasi optional
buku?: Buku;
}

// Pengembalian
export interface Pengembalian {
id: number;
peminjaman_id: number;
tanggal_pengembalian: string;
denda?: number;
peminjaman?: Peminjaman; // Relasi optional
}