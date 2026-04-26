"use client";

import Image from 'next/image';
import Link from 'next/link';
import { HeartIcon, ShoppingCartIcon, MessageCircleIcon } from 'lucide-react';
import { useState } from 'react';

export interface Product {
  id: string;
  name: string;
  description: string;
  image_url: string;
  price: number;
  stock: number;
  category: string;
}

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  const [wishlisted, setWishlisted] = useState(false);
  const handleWishlist = () => {
    setWishlisted((prev) => !prev);
    // You can save wishlist state to localStorage or supabase later
  };

  // Format currency (Indonesian Rupiah)
  const formattedPrice = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR'
  }).format(product.price);

  const whatsappLink = `https://wa.me/6287739435496?text=Halo%20saya%20tertarik%20membeli%20produk%20${encodeURIComponent(product.name)}%20di%20DiTz%20Store`;
  const telegramLink = `https://t.me/raditsunandar?text=Halo%20saya%20tertarik%20membeli%20produk%20${encodeURIComponent(product.name)}%20di%20DiTz%20Store`;

  return (
    <div className="relative bg-surface border border-secondary rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all">
      <div className="relative w-full h-56">
        <Image
          src={product.image_url || '/placeholder_light_gray_block.png'}
          alt={product.name}
          fill
          className="object-cover"
        />
        <button
          onClick={handleWishlist}
          className="absolute top-2 right-2 p-1 rounded-full bg-black/50 text-white hover:bg-black/70"
          aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <HeartIcon size={18} className={wishlisted ? 'fill-primary text-primary' : 'text-white'} />
        </button>
      </div>
      <div className="p-4 flex flex-col gap-2">
        <Link href={`/product/${product.id}`}
          className="font-semibold text-lg hover:text-primary transition-colors line-clamp-1"
        >
          {product.name}
        </Link>
        <p className="text-sm text-text-muted line-clamp-2 h-10">
          {product.description}
        </p>
        <div className="flex items-center justify-between mt-auto">
          <span className="font-bold text-primary">{formattedPrice}</span>
          <span className="text-xs px-2 py-1 rounded bg-secondary text-text-muted">
            {product.stock > 0 ? 'Ready' : 'Sold out'}
          </span>
        </div>
        <div className="flex items-center gap-2 pt-3">
          <Link
            href={whatsappLink}
            target="_blank"
            className="flex-1 flex items-center justify-center gap-1 px-3 py-2 text-xs rounded-md bg-green-500 text-white hover:bg-green-600"
          >
            <MessageCircleIcon size={14} /> WhatsApp
          </Link>
          <Link
            href={telegramLink}
            target="_blank"
            className="flex-1 flex items-center justify-center gap-1 px-3 py-2 text-xs rounded-md bg-blue-500 text-white hover:bg-blue-600"
          >
            <MessageCircleIcon size={14} /> Telegram
          </Link>
        </div>
      </div>
    </div>
  );
}