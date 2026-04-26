"use client";

interface FAQItem {
  question: string;
  answer: string;
}

const faq: FAQItem[] = [
  {
    question: 'Bagaimana cara memesan produk?',
    answer: 'Pilih produk yang Anda inginkan, lalu klik tombol WhatsApp atau Telegram untuk melakukan pemesanan.'
  },
  {
    question: 'Apakah produknya original?',
    answer: 'Ya, semua produk kami 100% original dan bergaransi.'
  },
  {
    question: 'Berapa lama proses pengiriman?',
    answer: 'Pengiriman dilakukan 1–3 hari kerja setelah pembayaran dikonfirmasi.'
  }
];

export default function FAQ() {
  return (
    <section id="faq" className="py-16 bg-background border-t border-secondary">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-2xl font-bold mb-8 text-primary text-center">FAQ</h2>
        <div className="space-y-4">
          {faq.map((item, idx) => (
            <div key={idx} className="p-4 rounded-md border border-secondary bg-surface">
              <h3 className="font-semibold text-primary mb-2">{item.question}</h3>
              <p className="text-text-muted">{item.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
