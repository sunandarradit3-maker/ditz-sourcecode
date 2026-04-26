"use client";

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { supabase } from '../../../lib/supabaseClient';
import { Product } from '../../../components/ProductCard';
import { HeartIcon } from 'lucide-react';

export const metadata = {
  title: 'Product Details – DiTz Store'
};

export default function ProductDetailPage() {
  const params = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [wishlisted, setWishlisted] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!params.id) return;
      const { data, error } = await supabase.from('products').select('*').eq('id', params.id).single();
      if (error) {
        setError(error.message);
      } else {
        setProduct(data as unknown as Product);
      }
      setLoading(false);
    };
    fetchProduct();
  }, [params.id]);

  if (loading) {
    return <div className="max-w-7xl mx-auto px-4 py-10">Loading...</div>;
  }
  if (error || !product) {
    return <div className="max-w-7xl mx-auto px-4 py-10 text-red-500">{error || 'Product not found'}</div>;
  }

  const formattedPrice = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR'
  }).format(product.price);
  const whatsappLink = `https://wa.me/6287739435496?text=Halo%20saya%20tertarik%20membeli%20produk%20${encodeURIComponent(product.name)}%20di%20DiTz%20Store`;
  const telegramLink = `https://t.me/raditsunandar?text=Halo%20saya%20tertarik%20membeli%20produk%20${encodeURIComponent(product.name)}%20di%20DiTz%20Store`;

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="relative w-full h-80 md:h-[32rem]">
        <Image
          src={product.image_url || '/placeholder_light_gray_block.png'}
          alt={product.name}
          fill
          className="object-cover rounded-lg"
        />
      </div>
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold text-primary">{product.name}</h1>
        <p className="text-text-muted">Category: {product.category}</p>
        <p className="text-2xl font-semibold text-primary">{formattedPrice}</p>
        <p className="text-text-muted">Stock: {product.stock > 0 ? `${product.stock} pcs` : 'Sold out'}</p>
        <p className="text-text-default leading-relaxed whitespace-pre-wrap">{product.description}</p>
        <div className="flex items-center gap-2 mt-4">
          <button
            onClick={() => setWishlisted((prev) => !prev)}
            className="p-2 rounded-full bg-secondary hover:bg-secondary/80 text-primary"
            aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          >
            <HeartIcon size={20} className={wishlisted ? 'fill-primary' : ''} />
          </button>
          <Link
            href={whatsappLink}
            target="_blank"
            className="flex items-center gap-2 px-4 py-2 rounded-md bg-green-500 text-white hover:bg-green-600"
          >
            Beli via WhatsApp
          </Link>
          <Link
            href={telegramLink}
            target="_blank"
            className="flex items-center gap-2 px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600"
          >
            Order via Telegram
          </Link>
        </div>
      </div>
    </div>
  );
}
