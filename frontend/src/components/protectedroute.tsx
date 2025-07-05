import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const router = useRouter();

  useEffect(() => {
    // Cek status autentikasi (contoh: token di localStorage)
    const token = localStorage.getItem('auth-token');
    
    if (!token) {
      // Redirect ke halaman login jika tidak terautentikasi
      router.push('/login');
    }
  }, [router]);

  // Jika terautentikasi, render children
  return <>{children}</>;
};

export default ProtectedRoute;