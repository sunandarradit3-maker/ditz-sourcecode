"use client";

import { useEffect, useState } from 'react';
import Hero from '../components/Hero';
import SearchFilter from '../components/SearchFilter';
import ProductsGrid from '../components/ProductsGrid';
import Testimonials from '../components/Testimonials';
import FAQ from '../components/FAQ';
import { supabase } from '../lib/supabaseClient';

export default function Home() {
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
    <>
      <Hero />
      <div className="max-w-7xl mx-auto px-4 py-10">
        <SearchFilter
          categories={categories}
          onChange={({ search, category }) => {
            setSearch(search);
            setCategory(category);
          }}
        />
        <ProductsGrid search={search} category={category} />
      </div>
      <Testimonials />
      <FAQ />
    </>
  );
}
