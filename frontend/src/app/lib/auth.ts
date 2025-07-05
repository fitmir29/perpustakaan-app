// src/app/lib/auth.ts


export interface User {
  id: number;
  username: string;
  nama: string;
  role: 'user' | 'admin';
}

export const login = async (username: string, password: string): Promise<User> => {
  // Simulasi API call
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (username === 'user' && password === 'password') {
        const user: User = {
          id: 1,
          username: 'rohman',
          nama: 'ROHMAN',
          role: 'user'
        };
        localStorage.setItem('user', JSON.stringify(user));
        resolve(user);
      } else if (username === 'admin' && password === 'admin123') {
        const user: User = {
          id: 1,
          username: 'admin',
          nama: 'Admin Perpustakaan',
          role: 'admin'
        };
        localStorage.setItem('user', JSON.stringify(user));
        resolve(user);
      } else {
        reject(new Error('Username atau password salah'));
      }
    }, 1000);
  });
};

export const logout = () => {
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