'use client';

import React from 'react';
import Link from 'next/link';
import { Phone, Mail, MapPin } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black text-gray-400 border-t border-gold-900/30 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand Info */}
          <div className="space-y-4">
            <Link href="/" className="flex flex-col">
              <span className="font-serif text-2xl tracking-[0.2em] font-semibold text-white">
                AURA ABODE
              </span>
              <span className="text-[9px] uppercase tracking-[0.4em] text-gold-400 -mt-1 font-sans">
                Karjat
              </span>
            </Link>
            <p className="text-sm font-light leading-relaxed mt-4">
              Experience the pinnacle of tranquility and luxury. A premium studio apartment featuring a private garden and a heated jacuzzi, nestled in the scenic valleys of Karjat, Maharashtra.
            </p>
            <div className="flex space-x-4 pt-2">
              <a
                href="https://instagram.com/aura.abode.karjat"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gold-400 transition-colors duration-300"
                title="Instagram"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                </svg>
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gold-400 transition-colors duration-300"
                title="Facebook"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-serif text-lg tracking-wider mb-6 border-b border-gold-900/30 pb-2">
              Explore
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/" className="hover:text-gold-400 transition-colors duration-300">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/property" className="hover:text-gold-400 transition-colors duration-300">
                  The Abode
                </Link>
              </li>
              <li>
                <Link href="/booking" className="hover:text-gold-400 transition-colors duration-300">
                  Check Availability
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-gold-400 transition-colors duration-300">
                  Gallery
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-gold-400 transition-colors duration-300">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Policies */}
          <div>
            <h3 className="text-white font-serif text-lg tracking-wider mb-6 border-b border-gold-900/30 pb-2">
              Our Policies
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/privacy" className="hover:text-gold-400 transition-colors duration-300">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-gold-400 transition-colors duration-300">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="/cancellation" className="hover:text-gold-400 transition-colors duration-300">
                  Cancellation Policy
                </Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-gold-400 transition-colors duration-300 text-xs text-zinc-600">
                  Admin Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h3 className="text-white font-serif text-lg tracking-wider mb-6 border-b border-gold-900/30 pb-2">
              Contact
            </h3>
            <ul className="space-y-4 text-sm font-light">
              <li className="flex items-start">
                <MapPin className="w-5 h-5 text-gold-400 mr-3 flex-shrink-0 mt-0.5" />
                <span>Tata Glenwood, Karjat, Maharashtra 410201, India</span>
              </li>
              <li className="flex items-center">
                <Phone className="w-5 h-5 text-gold-400 mr-3 flex-shrink-0" />
                <a href="tel:+919867778833" className="hover:text-gold-400 transition-colors">
                  +91 98677 78833
                </a>
              </li>
              <li className="flex items-center">
                <Mail className="w-5 h-5 text-gold-400 mr-3 flex-shrink-0" />
                <a href="mailto:ditihospitality.india@gmail.com" className="hover:text-gold-400 transition-colors">
                  ditihospitality.india@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-zinc-900 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-zinc-500">
          <p>© {currentYear} Aura Abode Karjat. All rights reserved.</p>
          <p className="mt-4 md:mt-0 font-light">
            Designed for luxury, built for peace.
          </p>
        </div>
      </div>
    </footer>
  );
}
