"use client";

import { useState } from 'react';
import { supabase } from '../../lib/supabaseClient';

export const metadata = {
  title: 'Contact – DiTz Store'
};

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Save contact message into orders table for admin review
    try {
      const { error } = await supabase.from('orders').insert({
        name: form.name,
        email: form.email,
        message: form.message,
        source: 'contact-form'
      });
      if (error) throw error;
      setSubmitted(true);
      setForm({ name: '', email: '', message: '' });
    } catch (err: any) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-primary mb-6">Contact Us</h1>
      {submitted && <p className="mb-4 text-green-500">Thank you for contacting us! We'll get back to you soon.</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col">
          <label htmlFor="name" className="mb-1 text-sm font-medium text-primary">Name</label>
          <input
            id="name"
            name="name"
            type="text"
            value={form.name}
            onChange={handleChange}
            required
            className="px-4 py-2 rounded-md bg-secondary text-text-default focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="email" className="mb-1 text-sm font-medium text-primary">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            required
            className="px-4 py-2 rounded-md bg-secondary text-text-default focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="message" className="mb-1 text-sm font-medium text-primary">Message</label>
          <textarea
            id="message"
            name="message"
            rows={5}
            value={form.message}
            onChange={handleChange}
            required
            className="px-4 py-2 rounded-md bg-secondary text-text-default focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <button
          type="submit"
          className="px-6 py-2 bg-primary text-black font-semibold rounded-md hover:bg-primary-dark transition"
        >
          Send Message
        </button>
      </form>
      <div className="mt-10 space-y-4">
        <p>Feel free to reach us via:</p>
        <p>
          WhatsApp:{' '}
          <a
            href="https://wa.me/6287739435496?text=Halo%20saya%20tertarik%20membeli%20produk%20di%20DiTz%20Store"
            target="_blank"
            className="text-primary hover:underline"
          >
            087739435496
          </a>
        </p>
        <p>
          Email:{' '}
          <a href="mailto:sunandarradit3@gmail.com" className="text-primary hover:underline">
            sunandarradit3@gmail.com
          </a>
        </p>
        <p>
          Telegram:{' '}
          <a
            href="https://t.me/raditsunandar"
            target="_blank"
            className="text-primary hover:underline"
          >
            @raditsunandar
          </a>
        </p>
      </div>
    </div>
  );
}
