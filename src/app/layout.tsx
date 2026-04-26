import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '../providers/theme-provider';
import SupabaseProvider from '../providers/supabase-provider';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export const metadata: Metadata = {
  title: 'DiTz Store',
  description: 'DiTz Store – a premium dark-themed ecommerce experience',
  icons: {
    icon: '/favicon.ico'
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen flex flex-col bg-background text-text-default">
        <SupabaseProvider>
          <ThemeProvider>
            <Navbar />
            <main className="flex-1 flex flex-col">
              {children}
            </main>
            <Footer />
          </ThemeProvider>
        </SupabaseProvider>
      </body>
    </html>
  );
}
