'use client';

import React from 'react';
import Link from 'next/link';
import { Phone, Mail, MapPin, Shield, Star, Lock } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-zinc-950 text-zinc-400 border-t border-gold-400/15 pt-20 pb-10 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
          {/* Brand Info */}
          <div className="md:col-span-5 space-y-6">
            <Link href="/" className="flex flex-col group select-none">
              <span className="font-serif text-2xl tracking-[0.25em] font-medium text-white group-hover:text-gold-300 transition-colors duration-500">
                AURA ABODE
              </span>
              <div className="flex items-center gap-1.5 -mt-0.5">
                <span className="h-[1px] w-3 bg-gold-400/60 group-hover:w-6 transition-all duration-500" />
                <span className="text-[8px] uppercase tracking-[0.45em] text-gold-400 font-semibold">
                  Karjat • Private Wellness
                </span>
              </div>
            </Link>
            <p className="text-xs font-light leading-relaxed text-zinc-500 max-w-sm">
              Discover the pinnacle of couples' wellness and privacy. A premium luxury studio suite featuring a private garden lawn and a heated outdoor Jacuzzi, situated in the breathtaking Western Ghats of Karjat.
            </p>
            
            {/* Social handles & trust row */}
            <div className="flex items-center space-x-6 pt-2">
              <a
                href="https://instagram.com/aura.abode.karjat"
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-500 hover:text-gold-400 transition-all duration-300 transform hover:scale-110"
                title="Instagram"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                </svg>
              </a>
              <span className="h-4 w-[1px] bg-zinc-800" />
              <div className="flex items-center gap-1.5 text-[10px] text-zinc-500 uppercase tracking-widest font-semibold">
                <Star className="w-3.5 h-3.5 text-gold-400 fill-gold-400" />
                <span>5.0 Guest Rated</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-2 space-y-4">
            <h3 className="text-white font-serif text-sm uppercase tracking-widest font-semibold border-b border-zinc-900 pb-2">
              Explore
            </h3>
            <ul className="space-y-3 text-xs">
              <li>
                <Link href="/" className="hover:text-gold-400 transition-colors duration-300 block">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/property" className="hover:text-gold-400 transition-colors duration-300 block">
                  The Abode
                </Link>
              </li>
              <li>
                <Link href="/booking" className="hover:text-gold-400 transition-colors duration-300 block">
                  Availability Calendar
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-gold-400 transition-colors duration-300 block">
                  Photo Gallery
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-gold-400 transition-colors duration-300 block">
                  Contact Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Policies */}
          <div className="md:col-span-2 space-y-4">
            <h3 className="text-white font-serif text-sm uppercase tracking-widest font-semibold border-b border-zinc-900 pb-2">
              Policies
            </h3>
            <ul className="space-y-3 text-xs">
              <li>
                <Link href="/privacy" className="hover:text-gold-400 transition-colors duration-300 block">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-gold-400 transition-colors duration-300 block">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="/cancellation" className="hover:text-gold-400 transition-colors duration-300 block">
                  Cancellation Policy
                </Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-gold-400 transition-colors duration-300 block text-[10px] text-zinc-700">
                  Manager Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="md:col-span-3 space-y-4">
            <h3 className="text-white font-serif text-sm uppercase tracking-widest font-semibold border-b border-zinc-900 pb-2">
              Reach Us
            </h3>
            <ul className="space-y-4 text-xs font-light">
              <li className="flex items-start">
                <MapPin className="w-4 h-4 text-gold-400 mr-3 flex-shrink-0 mt-0.5" />
                <span className="text-zinc-500 leading-relaxed">Tata Glenwood, Karjat, Maharashtra 410201, India</span>
              </li>
              <li className="flex items-center">
                <Phone className="w-4 h-4 text-gold-400 mr-3 flex-shrink-0" />
                <a href="tel:+919867778833" className="hover:text-gold-400 transition-colors font-medium">
                  +91 98677 78833
                </a>
              </li>
              <li className="flex items-center">
                <Mail className="w-4 h-4 text-gold-400 mr-3 flex-shrink-0" />
                <a href="mailto:ditihospitality.india@gmail.com" className="hover:text-gold-400 transition-colors font-medium break-all">
                  ditihospitality.india@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Security & Badges Row */}
        <div className="border-t border-zinc-900 pt-8 pb-4 flex flex-wrap gap-6 items-center justify-between">
          <div className="flex flex-wrap gap-4 text-[9px] uppercase tracking-widest font-semibold text-zinc-600">
            <div className="flex items-center gap-1.5 border border-zinc-900 bg-zinc-950 px-3 py-1.5">
              <Shield className="w-3.5 h-3.5 text-gold-400/80" />
              <span>Gated Society Patrol</span>
            </div>
            <div className="flex items-center gap-1.5 border border-zinc-900 bg-zinc-950 px-3 py-1.5">
              <Lock className="w-3.5 h-3.5 text-gold-400/80" />
              <span>SSL Secured Bookings</span>
            </div>
          </div>

          <p className="text-[10px] text-zinc-600 font-light font-mono">
            Developed by Diti Hospitality India.
          </p>
        </div>

        {/* Copyright */}
        <div className="pt-4 flex flex-col md:flex-row justify-between items-center text-[10px] text-zinc-700">
          <p>© {currentYear} Aura Abode Karjat. All rights reserved.</p>
          <p className="mt-2 md:mt-0 font-light">
            An oasis of absolute privacy and luxury.
          </p>
        </div>
      </div>
    </footer>
  );
}
