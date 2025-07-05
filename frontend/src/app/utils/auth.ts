export function isLoggedIn(): boolean {
if (typeof window === 'undefined') return false;
const token = localStorage.getItem('token');
return !!token;
}

export function getToken(): string | null {
if (typeof window === 'undefined') return null;
return localStorage.getItem('token');
}

export function requireLogin(role: 'user' | 'admin', redirectTo: string = '/login') {
if (typeof window === 'undefined') return;
const token = localStorage.getItem('token');
const userRole = localStorage.getItem('role'); // Simpan saat login

if (!token || userRole !== role) {
window.location.href = redirectTo;
}
}

export function logout() {
localStorage.removeItem('token');
localStorage.removeItem('role');
window.location.href = '/login';
}