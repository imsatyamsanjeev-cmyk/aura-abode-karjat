'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Sparkles, Check, Play, Clock, Info, ShieldAlert, Wifi, Waves, Trees, Tv, BookOpen, Coffee } from 'lucide-react';
import GalleryLightbox from '@/components/Navbar'; // Wait, let's import the actual lightbox!
// Oh, the lightbox is in `@/components/GalleryLightbox`. Let's import it correctly.
import Lightbox from '@/components/GalleryLightbox';

export default function PropertyDetails() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const images = [
    {
      src: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=800',
      alt: 'Luxury King Bed Studio',
      caption: 'Plush bedding with premium linens, styled headboard, and warm lighting setup.'
    },
    {
      src: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=800',
      alt: 'Heated Private Jacuzzi',
      caption: 'Spacious outdoor jacuzzi inside your private garden under a shade canopy.'
    },
    {
      src: 'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?q=80&w=800',
      alt: 'Enclosed Garden Lawn',
      caption: 'Enclosed private lawn with seating, plants, and ambient nighttime lighting.'
    },
    {
      src: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80&w=800',
      alt: 'Modern Seating Area',
      caption: 'Elegant lounge chair and coffee table inside the air-conditioned studio room.'
    },
    {
      src: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=800',
      alt: 'Fully Equipped Kitchenette',
      caption: 'Equipped with induction cooktop, microwave, refrigerator, kettle, and fine crockery.'
    },
    {
      src: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?q=80&w=800',
      alt: 'Luxury Bathroom',
      caption: 'Modern bathroom with glass shower cubicle, hot water, and high-end toiletries.'
    }
  ];

  const amenityCategories = [
    {
      title: 'Private Wellness & Outdoors',
      items: [
        { name: 'Private Heated Jacuzzi', highlight: true },
        { name: 'Private Garden Lawn & Sitting Area', highlight: true },
        { name: 'Shade Canopy over Jacuzzi' },
        { name: 'Accent Mood Lighting in Garden' },
      ]
    },
    {
      title: 'Comfort & Interiors',
      items: [
        { name: 'Plush King Size Bed', highlight: true },
        { name: 'High-speed Wi-Fi (100+ Mbps)', highlight: true },
        { name: 'Split Air Conditioning' },
        { name: '43" Smart TV with OTT Apps' },
        { name: 'Luxury Linens & Towels' },
      ]
    },
    {
      title: 'Kitchenette & Dining',
      items: [
        { name: 'Induction Cooktop' },
        { name: 'Refrigerator & Microwave' },
        { name: 'Electric Kettle & Toaster' },
        { name: 'Basic Cookware & Fine Crockery' },
        { name: 'Complimentary Tea & Coffee kits' },
      ]
    },
    {
      title: 'Safety & Convenience',
      items: [
        { name: '24/7 Gated Security (Tata Glenwood)' },
        { name: '100% Power Backup (Inverter/Gen)' },
        { name: 'Secure Parking on Site' },
        { name: 'Daily Garbage Collection' },
      ]
    }
  ];

  const rules = [
    'Check-in is from 2:00 PM onwards; Check-out is before 11:00 AM.',
    'Maximum occupancy is strictly capped at 4 adults.',
    'Quiet hours must be observed in the garden after 10:00 PM.',
    'Smoking is strictly prohibited inside the room (allowed in garden).',
    'Pets are not allowed on the premises.',
    'Use of glassware inside or near the Jacuzzi is strictly forbidden (plastic glasses provided).',
  ];

  const handleOpenLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  return (
    <div className="bg-background min-h-screen text-white">
      {/* 1. Header Banner */}
      <section className="relative h-[40vh] flex items-center justify-center overflow-hidden border-b border-gold-900/10">
        <div className="absolute inset-0 bg-black/70 z-10" />
        <img
          src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=1200"
          alt="Aura Abode Banner"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="relative z-20 text-center space-y-3 px-4 mt-8">
          <span className="text-gold-400 text-xs font-sans tracking-[0.4em] uppercase font-semibold">
            Discover Aura Abode
          </span>
          <h1 className="font-serif text-3xl md:text-5xl font-bold tracking-wide">
            Apartment Details & Amenities
          </h1>
          <p className="text-xs md:text-sm text-zinc-400 max-w-md mx-auto font-light">
            Read through our comprehensive list of features, guidelines, and house rules to prepare for your luxurious stay.
          </p>
        </div>
      </section>

      {/* 2. Detailed Description & Video */}
      <section className="py-20 px-4 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16">
        <div className="lg:col-span-7 space-y-6">
          <h2 className="font-serif text-2xl md:text-4xl text-white font-medium mb-4 flex items-center gap-3">
            <Sparkles className="w-6 h-6 text-gold-400" />
            Your Private Sanctuary
          </h2>
          <p className="text-zinc-400 text-sm font-light leading-relaxed">
            Welcome to Aura Abode Karjat, a masterfully curated studio apartment where modern convenience meets absolute natural peace. This vacation rental is designed with a singular focus: to offer a private, premium couple's retreat or small family escape away from the city.
          </p>
          <p className="text-zinc-400 text-sm font-light leading-relaxed">
            The studio features an open-plan layout complete with a comfortable king bed, soft ambient lighting, a plush sofa lounge, and a high-definition home entertainment setup. The glass sliding doors lead you directly into your private enclosed lawn—a green oasis reserved completely for you.
          </p>
          <p className="text-zinc-400 text-sm font-light leading-relaxed">
            Our crowning feature is the private heated outdoor Jacuzzi. Installed in a cozy corner of your private garden with a protective canopy overhead, it is the ultimate spot to decompress, rejuvenate, and enjoy absolute privacy.
          </p>

          {/* Quick specs grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 pt-6 border-t border-zinc-900">
            <div className="space-y-1">
              <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-semibold block">Space Type</span>
              <span className="text-white text-xs font-medium">Studio Apartment</span>
            </div>
            <div className="space-y-1">
              <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-semibold block">Occupancy</span>
              <span className="text-white text-xs font-medium">2 to 4 Guests</span>
            </div>
            <div className="space-y-1">
              <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-semibold block">Key Features</span>
              <span className="text-white text-xs font-medium">Private Jacuzzi & Lawn</span>
            </div>
            <div className="space-y-1">
              <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-semibold block">Internet</span>
              <span className="text-white text-xs font-medium">100+ Mbps Fiber Wi-Fi</span>
            </div>
            <div className="space-y-1">
              <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-semibold block">Security</span>
              <span className="text-white text-xs font-medium">Gated Society Patrol</span>
            </div>
            <div className="space-y-1">
              <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-semibold block">Location</span>
              <span className="text-white text-xs font-medium">Tata Glenwood, Karjat</span>
            </div>
          </div>
        </div>

        {/* Video Preview Section */}
        <div className="lg:col-span-5 space-y-6">
          <h3 className="font-serif text-lg text-white font-medium tracking-wide">
            Video Tour
          </h3>
          <div className="relative aspect-video border border-zinc-900 group overflow-hidden bg-zinc-900 flex items-center justify-center">
            {/* Mock video player representation */}
            <div className="absolute inset-0 bg-black/40 z-10 group-hover:bg-black/50 transition-colors" />
            <img
              src="https://images.unsplash.com/photo-1507089947368-19c1da9775ae?q=80&w=600"
              alt="Garden Jacuzzi Video Thumbnail"
              className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
            />
            {/* Play Button */}
            <button
              onClick={() => alert('Tour video will open here in a real deployment.')}
              className="relative z-20 w-16 h-16 bg-gold-400 hover:bg-gold-500 text-black rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110 shadow-lg cursor-pointer"
            >
              <Play className="w-6 h-6 fill-black ml-1" />
            </button>
          </div>
          <p className="text-zinc-500 text-xs font-light text-center leading-relaxed">
            Take a 1-minute visual walkthrough of the luxury studio, private garden, and jacuzzi setup.
          </p>
        </div>
      </section>

      {/* 3. Grid Gallery Preview */}
      <section className="py-16 bg-zinc-950 border-y border-zinc-900 px-4">
        <div className="max-w-7xl mx-auto">
          <h3 className="font-serif text-2xl text-white font-medium mb-8 text-center md:text-left">
            Apartment Photo Gallery
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {images.map((img, idx) => (
              <div
                key={idx}
                onClick={() => handleOpenLightbox(idx)}
                className="aspect-square border border-zinc-900 overflow-hidden relative cursor-pointer group"
              >
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/40 transition-colors duration-300 z-10 flex items-center justify-center">
                  <span className="text-[10px] text-white opacity-0 group-hover:opacity-100 uppercase tracking-widest font-semibold bg-black/60 px-3 py-1.5 transition-all">View</span>
                </div>
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Amenities List */}
      <section id="amenities" className="py-20 px-4 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <span className="text-gold-500 text-xs font-sans tracking-[0.3em] uppercase font-semibold">
            Features & Amenities
          </span>
          <h2 className="font-serif text-3xl md:text-5xl text-white font-medium">
            Everything You Need For a Perfect Stay
          </h2>
          <div className="w-16 h-[1px] bg-gold-400 mx-auto mt-4" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {amenityCategories.map((cat, idx) => (
            <div key={idx} className="bg-zinc-900/10 p-6 border border-zinc-900">
              <h3 className="font-serif text-lg text-gold-400 font-semibold mb-6 border-b border-zinc-900 pb-3">
                {cat.title}
              </h3>
              <ul className="space-y-4">
                {cat.items.map((item, itemIdx) => (
                  <li key={itemIdx} className="flex items-start text-xs font-light text-zinc-400">
                    <Check className={`w-4.5 h-4.5 mr-2.5 flex-shrink-0 ${item.highlight ? 'text-gold-400' : 'text-zinc-600'}`} />
                    <span className={item.highlight ? 'text-white font-medium' : ''}>{item.name}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Rules & Timing Guidelines */}
      <section className="bg-zinc-950 border-t border-zinc-900 py-20 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* House Rules */}
          <div className="space-y-6">
            <h3 className="font-serif text-2xl text-white font-semibold flex items-center gap-3">
              <ShieldAlert className="w-6 h-6 text-red-500" />
              House Rules & Guidelines
            </h3>
            <ul className="space-y-4 text-xs font-light text-zinc-400">
              {rules.map((rule, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <span className="w-5 h-5 bg-zinc-900 border border-zinc-800 text-gold-400 font-serif font-bold text-[10px] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span className="leading-relaxed">{rule}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Timing details */}
          <div className="space-y-8 bg-zinc-900/10 p-8 border border-zinc-900 flex flex-col justify-center">
            <h3 className="font-serif text-2xl text-white font-semibold flex items-center gap-3">
              <Clock className="w-6 h-6 text-gold-400" />
              Check-In & Check-Out Timings
            </h3>
            <div className="grid grid-cols-2 gap-8 text-xs font-light text-zinc-400">
              <div className="space-y-3">
                <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-semibold block">Check-In</span>
                <span className="text-white text-2xl font-serif font-semibold">2:00 PM</span>
                <p className="leading-relaxed">Early check-in is subject to availability and prior confirmation from the management team.</p>
              </div>
              <div className="space-y-3 border-l border-zinc-900 pl-8">
                <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-semibold block">Check-Out</span>
                <span className="text-white text-2xl font-serif font-semibold">11:00 AM</span>
                <p className="leading-relaxed">Late check-out request must be submitted 24 hours prior and may attract charges.</p>
              </div>
            </div>
            <div className="flex items-start gap-3 text-xs bg-zinc-950 p-4 border border-zinc-900 text-zinc-500 leading-relaxed">
              <Info className="w-5 h-5 text-gold-400 flex-shrink-0 mt-0.5" />
              <span>We require ID proof for all guests checking in. Non-resident visitors are not permitted overnight without approval.</span>
            </div>
          </div>
        </div>
      </section>

      {/* Lightbox component */}
      {lightboxOpen && (
        <Lightbox
          images={images}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxOpen(false)}
          onPrev={() => setLightboxIndex((lightboxIndex - 1 + images.length) % images.length)}
          onNext={() => setLightboxIndex((lightboxIndex + 1) % images.length)}
        />
      )}
    </div>
  );
}
