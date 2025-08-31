'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
  const pathname = usePathname();

  const navLinks = [
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/reports', label: 'Reports' },
  ];

  // Don't show the header on the root login page
  if (pathname === '/') {
    return null;
  }

  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-10">
      <nav className="container mx-auto px-6 py-3">
        <div className="flex justify-between items-center">
          <Link href="/dashboard">
            <span className="text-xl font-bold text-gray-900 dark:text-gray-100 cursor-pointer">
              Finance Dashboard
            </span>
          </Link>
          <ul className="flex items-center space-x-2 md:space-x-4">
            {navLinks.map(link => (
              <li key={link.href}>
                <Link href={link.href}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    pathname === link.href
                      ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-white'
                      : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  );
}
