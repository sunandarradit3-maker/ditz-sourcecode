"use client";

import Link from 'next/link';
import { MailIcon, PhoneIcon, MessageSquareIcon } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="w-full bg-surface border-t border-secondary">
      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-3 gap-8 text-sm">
        <div>
          <h3 className="font-semibold mb-3 text-primary">DiTz Store</h3>
          <p className="text-text-muted mb-2">Luxury &amp; Modern Ecommerce Experience.</p>
          <p className="text-text-muted">© {new Date().getFullYear()} DiTz Store. All rights reserved.</p>
        </div>
        <div>
          <h4 className="font-semibold mb-3">Contact</h4>
          <ul className="space-y-2">
            <li className="flex items-center gap-2">
              <PhoneIcon size={16} />
              <Link
                href="https://wa.me/6287739435496?text=Halo%20saya%20tertarik%20membeli%20produk%20di%20DiTz%20Store"
                target="_blank"
              >
                WhatsApp: 087739435496
              </Link>
            </li>
            <li className="flex items-center gap-2">
              <MailIcon size={16} />
              <Link href="mailto:sunandarradit3@gmail.com">support: sunandarradit3@gmail.com</Link>
            </li>
            <li className="flex items-center gap-2">
              <MessageSquareIcon size={16} />
              <Link href="https://t.me/raditsunandar" target="_blank">@raditsunandar</Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-3">Quick Links</h4>
          <ul className="space-y-2">
            <li><Link href="/shop">Shop</Link></li>
            <li><Link href="/about">About</Link></li>
            <li><Link href="#faq">FAQ</Link></li>
            <li><Link href="/contact">Contact</Link></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}