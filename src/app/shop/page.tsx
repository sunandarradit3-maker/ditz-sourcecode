"use client";

import { useEffect, useState } from 'react';
import SearchFilter from '../../components/SearchFilter';
import ProductsGrid from '../../components/ProductsGrid';
import { supabase } from '../../lib/supabaseClient';

export const metadata = {
  title: 'Shop – DiTz Store'
};

export default function ShopPage() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const { data, error } = await supabase.from('categories').select('name');
      if (!error && data) {
        setCategories(data.map((c) => c.name));
      }
    };
    fetchCategories();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6 text-primary">Shop</h1>
      <SearchFilter
        categories={categories}
        onChange={({ search, category }) => {
          setSearch(search);
          setCategory(category);
        }}
      />
      <ProductsGrid search={search} category={category} />
    </div>
  );
}
