import axios from "axios";

const baseURL =
process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000/api/v1';

export const api = axios.create({
baseURL,
headers: {
'Content-Type': 'application/json',
Accept: 'application/json',
},
});

// Contoh penggunaan:
// await api.get('/buku')
// await api.post('/peminjaman', { buku_id, user_id })