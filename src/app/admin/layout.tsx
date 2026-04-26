"use client";

import { useSupabase } from '../../providers/supabase-provider';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Link from 'next/link';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user } = useSupabase();
  const router = useRouter();
  useEffect(() => {
    if (!user) {
      router.replace('/admin');
    }
  }, [user, router]);
  if (!user) {
    return null;
  }
  return (
    <div className="min-h-screen flex flex-col">
      {/* Admin navigation bar */}
      <nav className="w-full bg-surface border-b border-secondary px-4 py-3 flex gap-4 text-sm">
        <Link href="/admin/products" className="hover:text-primary">Products</Link>
        <Link href="/admin/orders" className="hover:text-primary">Orders</Link>
        <Link href="/admin/settings" className="hover:text-primary">Settings</Link>
      </nav>
      <div className="flex-1">{children}</div>
    </div>
  );
}
