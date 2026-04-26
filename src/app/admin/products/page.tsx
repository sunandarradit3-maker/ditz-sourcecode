"use client";

import { useEffect, useState } from 'react';
import { supabase } from '../../../lib/supabaseClient';
import { Product } from '../../../components/ProductCard';
import Image from 'next/image';

interface Category {
  id: number;
  name: string;
}

export default function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [adding, setAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: '',
    description: '',
    price: 0,
    stock: 0,
    category: '',
    imageFile: null as File | null,
    imageUrl: ''
  });

  const fetchAll = async () => {
    setLoading(true);
    const { data: prodData, error: prodError } = await supabase.from('products').select('*').order('created_at', { ascending: false });
    const { data: catData, error: catError } = await supabase.from('categories').select('*');
    if (prodError || catError) {
      setError(prodError?.message || catError?.message || 'Error');
    } else {
      setProducts(prodData as unknown as Product[]);
      setCategories(catData as Category[]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchAll();
  }, []);

  const resetForm = () => {
    setForm({ name: '', description: '', price: 0, stock: 0, category: '', imageFile: null, imageUrl: '' });
    setAdding(false);
    setEditingId(null);
  };

  const handleImageUpload = async (file: File) => {
    // Upload image to Supabase storage bucket 'products'
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}.${fileExt}`;
    const { data, error } = await supabase.storage.from('products').upload(fileName, file);
    if (error) throw error;
    // Get public URL
    const { data: urlData } = supabase.storage.from('products').getPublicUrl(fileName);
    return urlData.publicUrl;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      let imageUrl = form.imageUrl;
      if (form.imageFile) {
        imageUrl = await handleImageUpload(form.imageFile);
      }
      if (editingId) {
        // Update product
        const { error } = await supabase.from('products').update({
          name: form.name,
          description: form.description,
          price: form.price,
          stock: form.stock,
          category: form.category,
          image_url: imageUrl
        }).eq('id', editingId);
        if (error) throw error;
      } else {
        const { error } = await supabase.from('products').insert({
          name: form.name,
          description: form.description,
          price: form.price,
          stock: form.stock,
          category: form.category,
          image_url: imageUrl
        });
        if (error) throw error;
      }
      resetForm();
      fetchAll();
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;
    const { error } = await supabase.from('products').delete().eq('id', id);
    if (error) {
      setError(error.message);
    } else {
      fetchAll();
    }
  };

  const handleEdit = (product: Product) => {
    setEditingId(product.id);
    setForm({
      name: product.name,
      description: product.description,
      price: product.price,
      stock: product.stock,
      category: product.category,
      imageFile: null,
      imageUrl: product.image_url
    });
  };

  if (loading) {
    return <div className="px-4 py-10">Loading...</div>;
  }
  return (
    <div className="px-4 py-10 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-primary mb-6">Manage Products</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {!adding && !editingId && (
        <button
          onClick={() => setAdding(true)}
          className="mb-6 px-4 py-2 bg-primary text-black font-semibold rounded-md"
        >
          Add New Product
        </button>
      )}
      {(adding || editingId) && (
        <form onSubmit={handleSubmit} className="space-y-4 mb-10 bg-surface p-6 rounded-md border border-secondary">
          <div className="flex flex-col">
            <label className="text-sm text-primary mb-1" htmlFor="name">Name</label>
            <input
              id="name"
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
              className="px-4 py-2 bg-secondary rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-sm text-primary mb-1" htmlFor="description">Description</label>
            <textarea
              id="description"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              required
              className="px-4 py-2 bg-secondary rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              rows={3}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label className="text-sm text-primary mb-1" htmlFor="price">Price (IDR)</label>
              <input
                id="price"
                type="number"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
                required
                className="px-4 py-2 bg-secondary rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm text-primary mb-1" htmlFor="stock">Stock</label>
              <input
                id="stock"
                type="number"
                value={form.stock}
                onChange={(e) => setForm({ ...form, stock: Number(e.target.value) })}
                required
                className="px-4 py-2 bg-secondary rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>
          <div className="flex flex-col">
            <label className="text-sm text-primary mb-1" htmlFor="category">Category</label>
            <select
              id="category"
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              required
              className="px-4 py-2 bg-secondary rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="">Select category</option>
              {categories.map((c) => (
                <option key={c.id} value={c.name}>{c.name}</option>
              ))}
            </select>
          </div>
          <div className="flex flex-col">
            <label className="text-sm text-primary mb-1" htmlFor="image">Image</label>
            <input
              id="image"
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0] || null;
                setForm({ ...form, imageFile: file });
              }}
              className="px-4 py-2 bg-secondary rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
            {form.imageUrl && !form.imageFile && (
              <Image src={form.imageUrl} alt="Current" width={120} height={80} className="mt-2 rounded" />
            )}
          </div>
          <div className="flex gap-4">
            <button type="submit" className="px-4 py-2 bg-primary text-black rounded-md font-semibold">{editingId ? 'Update' : 'Create'}</button>
            <button
              type="button"
              onClick={resetForm}
              className="px-4 py-2 bg-secondary text-text-default rounded-md"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead>
            <tr className="border-b border-secondary">
              <th className="py-2 px-2">Image</th>
              <th className="py-2 px-2">Name</th>
              <th className="py-2 px-2">Price</th>
              <th className="py-2 px-2">Stock</th>
              <th className="py-2 px-2">Category</th>
              <th className="py-2 px-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border-b border-secondary hover:bg-secondary/30">
                <td className="py-2 px-2">
                  {product.image_url && (
                    <Image src={product.image_url} alt={product.name} width={60} height={40} className="object-cover rounded" />
                  )}
                </td>
                <td className="py-2 px-2 font-medium">{product.name}</td>
                <td className="py-2 px-2">{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(product.price)}</td>
                <td className="py-2 px-2">{product.stock}</td>
                <td className="py-2 px-2">{product.category}</td>
                <td className="py-2 px-2 space-x-2">
                  <button onClick={() => handleEdit(product)} className="text-blue-500 hover:underline">Edit</button>
                  <button onClick={() => handleDelete(product.id)} className="text-red-500 hover:underline">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
        }
