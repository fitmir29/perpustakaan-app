'use client';

import React from 'react';
import { Buku } from '../app/types';


interface BukuCardProps {
  buku: Buku;
  onPinjam?: (id: number) => void;
}

const BukuCard: React.FC<BukuCardProps> = ({ buku, onPinjam }) => {
  return (
    <div className="border rounded-xl shadow-md p-4 bg-white flex flex-col justify-between hover:shadow-lg transition-shadow duration-300">
      <div>
        <h2 className="text-xl font-bold text-blue-700 mb-2">{buku.judul}</h2>
        <p className="text-sm text-gray-600">Pengarang: {buku.pengarang}</p>
        <p className="text-sm text-gray-600">Tahun: {String(buku.tahun)}</p> {/* ✅ konversi ke string */}
        <p className="text-sm text-gray-600">Kategori: {buku.kategori}</p>
        <p className="text-sm text-gray-600">Stok: {buku.stok}</p>
      </div>

      {onPinjam && (
        <button
          onClick={() => onPinjam(buku.id)}
          className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded"
        >
          Pinjam Buku
        </button>
      )}
    </div>
  );
};

export default BukuCard;