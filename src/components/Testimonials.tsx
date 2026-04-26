"use client";

interface Testimonial {
  name: string;
  message: string;
  avatar?: string;
}

const testimonials: Testimonial[] = [
  {
    name: 'Ari',
    message: 'Produk sangat bagus! Kualitas premium dan pengiriman cepat.'
  },
  {
    name: 'Budi',
    message: 'Saya suka tampilan website-nya. Belanja jadi nyaman dan mudah.'
  },
  {
    name: 'Citra',
    message: 'Pelayanan customer service ramah dan responsif. Recomended!'
  }
];

export default function Testimonials() {
  return (
    <section className="py-16 bg-surface border-t border-secondary">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-2xl font-bold mb-8 text-primary text-center">Testimonials</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, idx) => (
            <div key={idx} className="p-6 bg-background rounded-md border border-secondary shadow-sm">
              <p className="italic text-text-muted mb-4">"{t.message}"</p>
              <p className="font-semibold text-primary">- {t.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}