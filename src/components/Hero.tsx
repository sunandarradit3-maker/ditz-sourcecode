"use client";

import Link from 'next/link';

export default function Hero() {
  return (
    <section className="relative flex flex-col items-center justify-center py-28 text-center bg-[url('/hero-bg.jpg')] bg-cover bg-center">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
      <div className="relative z-10 max-w-3xl mx-auto px-4">
        <h1 className="text-4xl md:text-6xl font-bold text-primary mb-6">
          Discover Luxury
        </h1>
        <p className="text-text-default text-lg md:text-xl mb-8">
          Premium, modern and exclusive products curated just for you.
        </p>
        <Link
          href="/shop"
          className="inline-block px-8 py-3 text-lg font-semibold bg-primary text-black rounded-md hover:bg-primary-dark transition shadow-lg"
        >
          Shop Now
        </Link>
      </div>
    </section>
  );
}