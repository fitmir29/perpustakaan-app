'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
// Update the import path below if your auth file is located elsewhere, e.g. '../../lib/auth'
import { login } from '../../lib/auth'; // pastikan path ini sesuai struktur kamu

export default function UserLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      await login(email, password, 'user');
      router.push('/user/buku'); // redirect jika login sukses
    } catch (err: any) {
      setError(err.message || 'Terjadi kesalahan saat login, silakan coba lagi.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-indigo-100 to-cyan-100 px-4">
      <section className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-indigo-700 mb-2">Login Anggota</h1>
          <p className="text-gray-600 text-sm">
            Masukkan email dan password akun Anda untuk mengakses layanan perpustakaan
          </p>
        </div>

        {error && (
          <div className="bg-red-100 text-red-700 px-4 py-2 rounded-lg text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              placeholder="email@contoh.com"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              placeholder="••••••••"
            />
          </div>

          <div className="flex justify-between items-center">
            <label className="flex items-center text-sm text-gray-700">
              <input
                type="checkbox"
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded mr-2"
              />
              Ingat saya
            </label>
            <a href="#" className="text-sm text-indigo-600 hover:text-indigo-500">
              Lupa password?
            </a>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full flex justify-center items-center py-3 px-4 rounded-lg text-white font-semibold shadow
              ${isLoading ? 'bg-indigo-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'}
            `}
          >
            {isLoading ? (
              <>
                <svg className="animate-spin h-5 w-5 mr-2 text-white" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5 0 0 5 0 12h4zm2 5A8 8 0 014 12H0c0 3 1 6 3 8l3-2z" />
                </svg>
                Memproses...
              </>
            ) : 'Masuk'}
          </button>
        </form>

        <div className="text-center text-sm text-gray-600 mt-4">
          Belum punya akun?{' '}
          <a href="/user/register" className="text-indigo-600 hover:text-indigo-500 font-medium">
            Daftar sekarang
          </a>
        </div>
      </section>
    </main>
  );
}
