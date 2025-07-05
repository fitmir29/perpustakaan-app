'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';


export default function UserLoginPage() {
const router = useRouter();
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');

const [error, setError] = useState('');
const [loading, setLoading] = useState(false);

const handleLogin = async (e: React.FormEvent) => {
e.preventDefault();
setLoading(true);
setError('');


try {
  const response = await axios.post('/users/sign_in', {
    user: {
      email,
      password,
    },
  });

  // Simpan token atau data user jika API memberikan token
  console.log('Login berhasil:', response.data);

  // Redirect ke dashboard user
  router.push('/user/buku');
} catch (err: any) {
  setError('Login gagal. Periksa email dan password Anda.');
  console.error(err);
} finally {
  setLoading(false);
}
};

return (
<div className="min-h-screen flex items-center justify-center bg-white px-4">
<div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md border">
<h2 className="text-2xl font-bold text-center text-blue-700 mb-6">Login Pengguna</h2>
<form onSubmit={handleLogin} className="space-y-4">
{error && <p className="text-red-600 text-sm">{error}</p>}

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email:
        </label>
        <input
          type="email"
          id="email"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1 block w-full border rounded-md px-3 py-2 shadow-sm focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
          Password:
        </label>
        <input
          type="password"
          id="password"
          value={password}
          required
          onChange={(e) => setPassword(e.target.value)}
          className="mt-1 block w-full border rounded-md px-3 py-2 shadow-sm focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded shadow"
      >
        {loading ? 'Memproses...' : 'Login'}
      </button>
    </form>
  </div>
</div>
);
}