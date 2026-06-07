import type { Metadata, Viewport } from 'next';
import { Cormorant_Garamond, Montserrat } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const cormorantGaramond = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-serif',
  display: 'swap',
});

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700'],
  variable: '--font-sans',
  display: 'swap',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  title: 'Aura Abode Karjat | Luxury Studio Apartment with Private Jacuzzi',
  description: 'Book your luxury getaway at Aura Abode Karjat, Maharashtra. Experience a premium studio apartment featuring a private garden, heated jacuzzi, and high-end modern amenities. Best rates guaranteed.',
  keywords: 'Aura Abode Karjat, Karjat resort, private jacuzzi Karjat, luxury stay Karjat, weekend getaway Mumbai, private garden villa, direct booking Karjat',
  authors: [{ name: 'Aura Abode' }],
  robots: 'index, follow',
  openGraph: {
    title: 'Aura Abode Karjat | Luxury Studio Apartment with Private Jacuzzi',
    description: 'Book your luxury getaway at Aura Abode Karjat. Experience private garden, heated jacuzzi, and high-end modern amenities.',
    type: 'website',
    url: 'https://auraabodekarjat.com',
    siteName: 'Aura Abode Karjat',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${montserrat.variable} ${cormorantGaramond.variable} bg-background text-foreground min-h-screen flex flex-col font-sans antialiased`}>
        <Navbar />
        {/* Main Content wrapper with padding-top to clear the fixed navbar */}
        <main className="flex-grow pt-16">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
