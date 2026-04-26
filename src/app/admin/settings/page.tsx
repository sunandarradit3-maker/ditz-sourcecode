"use client";

import { useEffect, useState } from 'react';
import { supabase } from '../../../lib/supabaseClient';

interface Category {
  id: number;
  name: string;
}

export default function AdminSettingsPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [newCategory, setNewCategory] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingName, setEditingName] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCategories = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('categories').select('*').order('name');
    if (error) {
      setError(error.message);
    } else {
      setCategories(data as Category[]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleAddCategory = async () => {
    if (!newCategory.trim()) return;
    const { error } = await supabase.from('categories').insert({ name: newCategory.trim() });
    if (error) {
      setError(error.message);
    } else {
      setNewCategory('');
      fetchCategories();
    }
  };

  const handleUpdateCategory = async (id: number) => {
    if (!editingName.trim()) return;
    const { error } = await supabase.from('categories').update({ name: editingName.trim() }).eq('id', id);
    if (error) {
      setError(error.message);
    } else {
      setEditingId(null);
      setEditingName('');
      fetchCategories();
    }
  };

  const handleDeleteCategory = async (id: number) => {
    if (!confirm('Are you sure you want to delete this category?')) return;
    const { error } = await supabase.from('categories').delete().eq('id', id);
    if (error) {
      setError(error.message);
    } else {
      fetchCategories();
    }
  };

  if (loading) {
    return <div className="px-4 py-10">Loading settings...</div>;
  }

  return (
    <div className="px-4 py-10 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-primary mb-6">Admin Settings</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {/* Category management */}
      <div className="mb-10">
        <h2 className="text-xl font-semibold text-primary mb-4">Manage Categories</h2>
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            placeholder="New category name"
            className="px-4 py-2 bg-secondary rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <button
            onClick={handleAddCategory}
            className="px-4 py-2 bg-primary text-black rounded-md font-semibold"
          >
            Add
          </button>
        </div>
        {categories.length === 0 ? (
          <p className="text-text-muted">No categories yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="border-b border-secondary">
                  <th className="py-2 px-2">Name</th>
                  <th className="py-2 px-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((cat) => (
                  <tr key={cat.id} className="border-b border-secondary hover:bg-secondary/30">
                    <td className="py-2 px-2">
                      {editingId === cat.id ? (
                        <input
                          type="text"
                          value={editingName}
                          onChange={(e) => setEditingName(e.target.value)}
                          className="px-2 py-1 bg-background rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                      ) : (
                        <span>{cat.name}</span>
                      )}
                    </td>
                    <td className="py-2 px-2 space-x-2">
                      {editingId === cat.id ? (
                        <>
                          <button
                            onClick={() => handleUpdateCategory(cat.id)}
                            className="text-green-500 hover:underline"
                          >
                            Save
                          </button>
                          <button
                            onClick={() => {
                              setEditingId(null);
                              setEditingName('');
                            }}
                            className="text-text-muted hover:underline"
                          >
                            Cancel
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() => {
                              setEditingId(cat.id);
                              setEditingName(cat.name);
                            }}
                            className="text-blue-500 hover:underline"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteCategory(cat.id)}
                            className="text-red-500 hover:underline"
                          >
                            Delete
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
