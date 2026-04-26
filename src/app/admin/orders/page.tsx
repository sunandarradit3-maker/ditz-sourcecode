"use client";

import { useEffect, useState } from 'react';
import { supabase } from '../../../lib/supabaseClient';

interface Order {
  id: number;
  name: string;
  email: string;
  message: string;
  source: string;
  created_at: string;
}

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchOrders = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('orders').select('*').order('created_at', { ascending: false });
    if (error) {
      setError(error.message);
    } else {
      setOrders(data as Order[]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading) {
    return <div className="px-4 py-10">Loading orders...</div>;
  }

  return (
    <div className="px-4 py-10 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-primary mb-6">Customer Messages / Orders</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {orders.length === 0 ? (
        <p className="text-text-muted">No orders or messages yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="border-b border-secondary">
                <th className="py-2 px-2">Name</th>
                <th className="py-2 px-2">Email</th>
                <th className="py-2 px-2">Message</th>
                <th className="py-2 px-2">Source</th>
                <th className="py-2 px-2">Date</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="border-b border-secondary hover:bg-secondary/30">
                  <td className="py-2 px-2 font-medium">{order.name}</td>
                  <td className="py-2 px-2">{order.email}</td>
                  <td className="py-2 px-2 whitespace-pre-wrap max-w-lg">{order.message}</td>
                  <td className="py-2 px-2 capitalize">{order.source}</td>
                  <td className="py-2 px-2">{new Date(order.created_at).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
