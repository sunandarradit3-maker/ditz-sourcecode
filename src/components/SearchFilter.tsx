"use client";

import { useEffect, useState } from 'react';

interface Props {
  onChange: (values: { search: string; category: string }) => void;
  categories: string[];
}

export default function SearchFilter({ onChange, categories }: Props) {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');

  useEffect(() => {
    const delay = setTimeout(() => {
      onChange({ search, category });
    }, 300);
    return () => clearTimeout(delay);
  }, [search, category, onChange]);

  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6">
      <input
        type="text"
        placeholder="Search products..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="flex-1 px-4 py-2 rounded-md bg-secondary text-text-default placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary"
      />
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="w-full sm:w-48 px-4 py-2 rounded-md bg-secondary text-text-default focus:outline-none focus:ring-2 focus:ring-primary"
      >
        <option value="">All Categories</option>
        {categories.map((cat) => (
          <option key={cat} value={cat}>{cat}</option>
        ))}
      </select>
    </div>
  );
}