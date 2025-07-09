'use client';

import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    password_confirmation: '',
    username: '',
    nama: '',
    role: 'user',
  });

  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:3000/api/user', {
        user: formData,
      }, { withCredentials: true });

      setMessage('Registrasi berhasil!');
      setError(null);

      setTimeout(() => {
        router.push('/user/login');
      }, 1500);
    } catch (err: any) {
      setError(err?.response?.data?.errors?.join(', ') || 'Registrasi gagal.');
      setMessage(null);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Daftar Akun</h1>
      {error && <p className="text-red-500 mb-2">{error}</p>}
      {message && <p className="text-green-500 mb-2">{message}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="email" type="email" placeholder="Email" onChange={handleChange} required className="w-full p-2 border rounded" />
        <input name="username" placeholder="Username" onChange={handleChange} required className="w-full p-2 border rounded" />
        <input name="nama" placeholder="Nama" onChange={handleChange} required className="w-full p-2 border rounded" />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} required className="w-full p-2 border rounded" />
        <input name="password_confirmation" type="password" placeholder="Konfirmasi Password" onChange={handleChange} required className="w-full p-2 border rounded" />
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded">Daftar</button>
      </form>
    </div>
  );
}
