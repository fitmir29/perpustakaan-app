import './globals.css';
import { Inter } from 'next/font/google';
import { ReactNode } from 'react';
import Navbar from 'src/components/navbar';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Perpustakaan App',
  description: 'Aplikasi manajemen perpustakaan berbasis Next.js dan Ruby on Rails API',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="id">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </head>
      <body className={`${inter.className} bg-gray-50 text-gray-800`}>
        <Navbar />
        <main className="container mx-auto px-4 py-6">{children}</main>
      </body>
    </html>
  );
}