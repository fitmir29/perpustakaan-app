'use client';

import React from 'react';
import { Buku } from '../app/types';

interface BukuCardProps {
  buku: Buku;
  onPinjam?: (id: number) => void;
}

const BukuCard: React.FC<BukuCardProps> = ({ buku, onPinjam }) => {
  const isAvailable = buku.stok > 0;
  
  return (
    <div className="border rounded-xl shadow-md p-4 bg-white flex flex-col justify-between hover:shadow-lg transition-shadow duration-300">
      <div>
        {buku.cover && (
          <img 
            src={buku.cover} 
            alt={`Cover buku ${buku.judul}`} 
            className="w-full h-48 object-cover mb-4 rounded"
            onError={(e) => {
              e.currentTarget.src = '/default-cover.jpg';
              e.currentTarget.onerror = null;
            }}
          />
        )}
        
        <div className="flex justify-between items-start mb-2">
          <h2 className="text-xl font-bold text-blue-700">{buku.judul}</h2>
          <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
            {buku.kategori}
          </span>
        </div>
        
        <p className="text-sm text-gray-600 mb-1">Pengarang: {buku.pengarang}</p>
        <p className="text-sm text-gray-600 mb-1">Tahun: {String(buku.tahun)}</p>
        <p className={`text-sm ${isAvailable ? 'text-gray-600' : 'text-red-500'}`}>
          Stok: {buku.stok} {!isAvailable && '(Habis)'}
        </p>
      </div>

      {onPinjam && (
        <button
          onClick={() => isAvailable && onPinjam(buku.id)}
          className={`mt-4 px-4 py-2 font-semibold rounded ${
            isAvailable 
              ? 'bg-blue-600 hover:bg-blue-700 text-white' 
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
          disabled={!isAvailable}
        >
          {isAvailable ? 'Pinjam Buku' : 'Stok Habis'}
        </button>
      )}
    </div>
  );
};

export default BukuCard;