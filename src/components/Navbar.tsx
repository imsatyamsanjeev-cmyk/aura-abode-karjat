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
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-black/90 shadow-[0_2px_20px_rgba(0,0,0,0.8)] border-b border-gold-900/30 py-3'
          : 'bg-gradient-to-b from-black/80 to-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex flex-col group">
            <span className="font-serif text-2xl md:text-3xl tracking-[0.2em] font-semibold text-white group-hover:text-gold-400 transition-colors duration-300">
              AURA ABODE
            </span>
            <span className="text-[9px] uppercase tracking-[0.4em] text-gold-400/80 -mt-1 font-sans">
              Karjat • Private Jacuzzi
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className={`text-xs uppercase tracking-widest font-medium transition-colors duration-300 ${
                  isActive(link.path)
                    ? 'text-gold-400 border-b border-gold-400 pb-1'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* CTAs */}
          <div className="hidden md:flex items-center space-x-4">
            {/* WhatsApp Contact */}
            <a
              href="https://wa.me/919867778833?text=Hi!%20I'm%20interested%20in%20booking%20Aura%20Abode%20Karjat."
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-gold-400 transition-colors duration-300 p-2"
              title="Chat on WhatsApp"
            >
              <MessageCircle className="w-5 h-5 text-green-500 hover:scale-110 transition-transform" />
            </a>
            {/* Book Now Button */}
            <Link
              href="/booking"
              className="relative inline-flex items-center justify-center px-6 py-2.5 overflow-hidden text-xs uppercase tracking-widest font-semibold transition-all duration-300 bg-gold-400 hover:bg-gold-500 text-black rounded-none shadow-md group"
            >
              <Calendar className="w-4 h-4 mr-2" />
              Book Stay
            </Link>
          </div>

          {/* Hamburger Menu (Mobile) */}
          <div className="md:hidden flex items-center space-x-2">
            <a
              href="https://wa.me/919867778833?text=Hi!%20I'm%20interested%20in%20booking%20Aura%20Abode%20Karjat."
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-gold-400 transition-colors duration-300 p-2"
            >
              <MessageCircle className="w-5 h-5 text-green-500" />
            </a>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-zinc-900 focus:outline-none transition-colors"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer menu */}
      <div
        className={`md:hidden fixed inset-y-0 right-0 w-64 bg-zinc-950 border-l border-zinc-800 z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex justify-end p-6">
          <button
            onClick={() => setIsOpen(false)}
            className="text-gray-400 hover:text-white focus:outline-none"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        <div className="px-6 py-4 flex flex-col space-y-6">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              onClick={() => setIsOpen(false)}
              className={`text-sm uppercase tracking-widest font-medium block transition-colors duration-300 ${
                isActive(link.path)
                  ? 'text-gold-400 border-l-2 border-gold-400 pl-3'
                  : 'text-gray-300 hover:text-white pl-3'
              }`}
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-6 border-t border-zinc-800">
            <Link
              href="/booking"
              onClick={() => setIsOpen(false)}
              className="w-full flex items-center justify-center px-6 py-3 bg-gold-400 hover:bg-gold-500 text-black text-xs uppercase tracking-widest font-semibold rounded-none shadow-md transition-colors"
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
          className="md:hidden fixed inset-0 bg-black/60 z-40"
        />
      )}
    </nav>
  );
}
