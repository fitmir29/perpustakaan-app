'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

const Navbar = () => {
  const pathname = usePathname();

  const linkClass = (path: string) =>
    `px-4 py-2 hover:text-blue-500 ${pathname === path ? 'text-blue-600 font-semibold' : 'text-gray-700'}`;

  return (
    <nav className="bg-white shadow sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold text-blue-700">
          Perpustakaan
        </Link>
        <div className="space-x-4">
          <Link href="/" className={linkClass('/')}>
            Beranda
          </Link>
          <Link href="/user/buku" className={linkClass('/user/buku')}>
            Buku
          </Link>
          <Link href="/user/dashboard" className={linkClass('/user/dashboard')}>
            Dashboard
          </Link>
          <Link href="/user/login" className={linkClass('/user/login')}>
            Login User
          </Link>
          <Link href="/admin/login" className={linkClass('/admin/login')}>
            Login Admin
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;