'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Book, User, LayoutDashboard, LogIn } from 'lucide-react';

const Navbar = () => {
  const pathname = usePathname();

  const links = [
    {
      href: '/',
      label: 'Beranda',
      icon: null,
    },
    {
      href: '/user/buku',
      label: 'Buku',
      icon: <Book className="w-4 h-4" />,
    },
    {
      href: '/user/dashboard',
      label: 'Dashboard',
      icon: <LayoutDashboard className="w-4 h-4" />,
    },
    {
      href: '/user/login',
      label: 'Login User',
      icon: <User className="w-4 h-4" />,
    },
    {
      href: '/admin/login',
      label: 'Login Admin',
      icon: <LogIn className="w-4 h-4" />,
    },
  ];

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link 
            href="/" 
            className="flex items-center text-xl font-bold text-blue-700 hover:text-blue-600 transition-colors"
          >
            <Book className="mr-2 h-6 w-6" />
            Perpustakaan Digital
          </Link>
          
          <div className="hidden md:flex items-center space-x-6">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors ${
                  isActive(link.href)
                    ? 'border-blue-500 text-blue-700'
                    : 'border-transparent text-gray-600 hover:text-gray-800 hover:border-gray-300'
                }`}
              >
                {link.icon && <span className="mr-2">{link.icon}</span>}
                {link.label}
              </Link>
            ))}
          </div>

          {/* Mobile menu button (simplified) */}
          <div className="md:hidden flex items-center">
            <button className="text-gray-600 hover:text-gray-800">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinecap="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;