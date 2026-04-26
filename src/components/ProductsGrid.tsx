"use client";

import { useEffect, useState } from 'react';
import ProductCard, { Product } from './ProductCard';
import { supabase } from '../lib/supabaseClient';

interface Props {
  search?: string;
  category?: string;
}

export default function ProductsGrid({ search = '', category = '' }: Props) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  // Fetch products from Supabase
  const fetchProducts = async () => {
    setLoading(true);
    let query = supabase.from('products').select('*').order('created_at', { ascending: false });
    if (search) {
      query = query.ilike('name', `%${search}%`);
    }
    if (category) {
      query = query.eq('category', category);
    }
    const { data, error } = await query;
    if (error) {
      setError(error.message);
    } else {
      setProducts(data as unknown as Product[]);
    }
    setLoading(false);
  };

  // Subscribe to realtime updates on products
  useEffect(() => {
    const channel = supabase.channel('public:products');
    channel
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'products' },
        (_payload) => {
          // When product is inserted/updated/deleted, refetch current list
          fetchProducts();
        }
      )
      .subscribe();
    return () => {
      channel.unsubscribe();
    };
  }, [search, category]);

  useEffect(() => {
    fetchProducts();
  }, [search, category]);

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, idx) => (
          <div key={idx} className="h-80 bg-secondary animate-pulse rounded-lg" />
        ))}
      </div>
    );
  }

  if (error) {
    return <p className="text-red-500">Error: {error}</p>;
  }

  if (products.length === 0) {
    return <p className="text-text-muted">No products found.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}