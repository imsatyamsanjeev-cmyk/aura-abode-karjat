'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Calendar, MessageCircle } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'The Abode', path: '/property' },
    { name: 'Check Availability', path: '/booking' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path: string) => pathname === path;

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-zinc-950/75 backdrop-blur-xl border-b border-gold-400/20 shadow-[0_4px_30px_rgba(0,0,0,0.9)] py-2'
            : 'bg-gradient-to-b from-black/90 via-black/40 to-transparent py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <Link href="/" className="flex flex-col group relative select-none">
              <span className="font-serif text-2xl md:text-3xl tracking-[0.25em] font-medium text-white group-hover:text-gold-300 transition-colors duration-500">
                AURA ABODE
              </span>
              <div className="flex items-center gap-1.5 -mt-0.5">
                <span className="h-[1px] w-3 bg-gold-400/60 group-hover:w-6 transition-all duration-500" />
                <span className="text-[8px] uppercase tracking-[0.45em] text-gold-400 font-semibold font-sans">
                  Karjat • Private Jacuzzi
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-10">
              {navLinks.map((link) => {
                const active = isActive(link.path);
                return (
                  <Link
                    key={link.path}
                    href={link.path}
                    className={`text-[10px] uppercase tracking-[0.25em] font-semibold transition-all duration-300 relative py-2 ${
                      active
                        ? 'text-gold-400 font-bold'
                        : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    <span className="relative z-10">{link.name}</span>
                    {active && (
                      <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-gold-400 rounded-full shadow-[0_0_10px_#c5a880]" />
                    )}
                  </Link>
                );
              })}
            </div>

            {/* CTAs */}
            <div className="hidden md:flex items-center space-x-6">
              {/* WhatsApp Contact */}
              <a
                href="https://wa.me/919867778833?text=Hi!%20I'm%20interested%20in%20booking%20Aura%20Abode%20Karjat."
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-400 hover:text-gold-400 transition-all duration-300 p-2 flex items-center justify-center hover:scale-110"
                title="Chat on WhatsApp"
              >
                <MessageCircle className="w-5 h-5 text-green-500 fill-green-500/10" />
              </a>
              {/* Book Now Button */}
              <Link
                href="/booking"
                className="relative inline-flex items-center justify-center px-6 py-3 overflow-hidden text-[10px] uppercase tracking-[0.2em] font-bold transition-all duration-500 bg-gold-400 hover:bg-gold-500 text-black rounded-none shadow-[0_4px_20px_rgba(197,168,128,0.15)] group transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <Calendar className="w-4 h-4 mr-2" />
                Book Stay
              </Link>
            </div>

            {/* Hamburger Menu (Mobile) */}
            <div className="md:hidden flex items-center space-x-3">
              <a
                href="https://wa.me/919867778833?text=Hi!%20I'm%20interested%20in%20booking%20Aura%20Abode%20Karjat."
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-400 hover:text-gold-400 transition-colors p-2"
              >
                <MessageCircle className="w-5 h-5 text-green-500" />
              </a>
              <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex items-center justify-center p-2 text-zinc-400 hover:text-white hover:bg-zinc-900/50 border border-zinc-900 transition-all"
              >
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer menu (rendered outside nav to avoid inheriting parent gradients/blur filters) */}
      <div
        style={{ backgroundColor: '#0b0b0b', opacity: 1, zIndex: 100 }}
        className={`md:hidden fixed inset-y-0 right-0 w-72 bg-[#0b0b0b] border-l border-gold-400/10 transform transition-transform duration-500 ease-in-out ${
          isOpen ? 'translate-x-0 pointer-events-auto' : 'translate-x-full pointer-events-none'
        }`}
      >
        <div className="flex justify-between items-center p-6 border-b border-zinc-900">
          <span className="font-serif text-lg tracking-widest text-white">MENU</span>
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="text-zinc-400 hover:text-white p-1 border border-zinc-900 hover:border-zinc-800"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="px-6 py-8 flex flex-col space-y-6">
          {navLinks.map((link) => {
            const active = isActive(link.path);
            return (
              <Link
                key={link.path}
                href={link.path}
                onClick={() => setIsOpen(false)}
                className={`text-xs uppercase tracking-[0.2em] font-medium block transition-all duration-300 py-2 ${
                  active
                    ? 'text-gold-400 border-l-2 border-gold-400 pl-4 font-bold'
                    : 'text-zinc-400 hover:text-white pl-4 border-l border-zinc-900'
                }`}
              >
                {link.name}
              </Link>
            );
          })}
          <div className="pt-8 border-t border-zinc-900">
            <Link
              href="/booking"
              onClick={() => setIsOpen(false)}
              className="w-full flex items-center justify-center px-6 py-4 bg-gold-400 hover:bg-gold-500 text-black text-[10px] uppercase tracking-widest font-bold shadow-md transition-colors"
            >
              <Calendar className="w-4 h-4 mr-2" />
              Book Stay
            </Link>
          </div>
        </div>
      </div>

      {/* Background overlay for mobile drawer */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          style={{ zIndex: 90 }}
          className="md:hidden fixed inset-0 bg-black/80 backdrop-blur-xs transition-opacity"
        />
      )}
    </>
  );
}
