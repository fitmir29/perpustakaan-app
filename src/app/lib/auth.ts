export interface User {
  id: number;
  email: string;
  role: 'user' | 'admin';
  username?: string;
  nama?: string;
}

const API_BASE_URL = 'http://localhost:3001';

export const login = async (
  email: string,
  password: string,
  role: 'user' | 'admin'
): Promise<User> => {
  const endpoint = role === 'admin' ? '/api/admin/sign_in' : '/api/user/sign_in';

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({ email, password }),
  });

  // 👉 Ambil response mentah sebagai teks
  const rawText = await response.text();

  let data: any;

  try {
    data = JSON.parse(rawText);
  } catch (e) {
    console.error('❌ Gagal parse JSON. Mungkin server mengembalikan HTML:', rawText.slice(0, 200));
    throw new Error('Server tidak mengembalikan data yang valid. Cek koneksi ke backend atau URL endpoint.');
  }

  if (!response.ok) {
    const errorMessage = data?.errors?.join(', ') || data?.message || 'Login gagal';
    throw new Error(errorMessage);
  }

  const userData = data?.data || data;

  const user: User = {
    id: userData.id,
    email: userData.email,
    username: userData.username,
    nama: userData.nama,
    role,
  };

  localStorage.setItem('user', JSON.stringify(user));
  return user;
};

export const logout = async (role: 'user' | 'admin') => {
  const endpoint = role === 'admin' ? '/api/admin/sign_out' : '/api/user/sign_out';

  await fetch(`${API_BASE_URL}${endpoint}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });

  localStorage.removeItem('user');
};

export const getCurrentUser = (): User | null => {
  const userData = localStorage.getItem('user');
  return userData ? JSON.parse(userData) : null;
};

export const isAuthenticated = (): boolean => {
  return !!getCurrentUser();
};

export const isAdmin = (): boolean => {
  const user = getCurrentUser();
  return user?.role === 'admin';
};
export const isUser = (): boolean => {
  const user = getCurrentUser();
  return user?.role === 'user';
};