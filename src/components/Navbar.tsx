"use client";

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useTheme } from '../providers/theme-provider';
import { useSupabase } from '../providers/supabase-provider';
import { MoonIcon, SunIcon, ShoppingCartIcon, LogOutIcon, LogInIcon } from 'lucide-react';

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const { user, signOut } = useSupabase();
  const router = useRouter();

  const handleLogout = async () => {
    await signOut();
    router.push('/');
  };

  return (
    <header className="w-full sticky top-0 z-50 bg-surface/80 backdrop-blur border-b border-secondary">
      <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="text-2xl font-bold text-primary">
            DiTz <span className="font-light text-text-muted">Store</span>
          </Link>
          <nav className="hidden md:flex gap-6 text-sm">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <Link href="/shop" className="hover:text-primary transition-colors">Shop</Link>
            <Link href="/about" className="hover:text-primary transition-colors">About</Link>
            <Link href="/contact" className="hover:text-primary transition-colors">Contact</Link>
            {user && <Link href="/admin/products" className="hover:text-primary transition-colors">Admin</Link>}
          </nav>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-primary"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <SunIcon size={18} /> : <MoonIcon size={18} />}
          </button>
          {user ? (
            <button
              onClick={handleLogout}
              className="hidden md:inline-flex gap-2 items-center px-4 py-2 text-sm font-medium rounded-md bg-primary text-black hover:bg-primary-dark transition"
            >
              <LogOutIcon size={16} /> Logout
            </button>
          ) : (
            <Link href="/admin" className="hidden md:inline-flex gap-2 items-center px-4 py-2 text-sm font-medium rounded-md bg-primary text-black hover:bg-primary-dark transition">
              <LogInIcon size={16} /> Admin Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}