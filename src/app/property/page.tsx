'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Sparkles, Check, Play, Clock, Info, ShieldAlert, Wifi, Waves, Trees, Tv, BookOpen, Coffee } from 'lucide-react';
import Lightbox from '@/components/GalleryLightbox';

export default function PropertyDetails() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const images = [
    {
      src: '/images/bedroom/bedroom1.jpeg',
      alt: 'Luxury King Bed Studio',
      caption: 'Plush bedding with premium linens, styled headboard, and warm lighting setup.'
    },
    {
      src: '/images/jacuzzi/jacuzzi1.jpeg',
      alt: 'Heated Private Jacuzzi',
      caption: 'Spacious outdoor jacuzzi inside your private garden under a shade canopy.'
    },
    {
      src: '/images/garden/garden1.jpeg',
      alt: 'Enclosed Garden Lawn',
      caption: 'Enclosed private lawn with seating, plants, and ambient nighttime lighting.'
    },
    {
      src: '/images/backyard/backyard1.jpeg',
      alt: 'Private Backyard Deck',
      caption: 'Cozy stone pathway leading to the private garden lawn area.'
    },
    {
      src: '/images/kitchen/kitchen1.jpeg',
      alt: 'Fully Equipped Kitchenette',
      caption: 'Equipped with induction cooktop, microwave, refrigerator, kettle, and fine crockery.'
    },
    {
      src: '/images/washroom/washroom1.jpeg',
      alt: 'Luxury Bathroom',
      caption: 'Modern bathroom with glass shower cubicle, hot water, and high-end toiletries.'
    }
  ];

  const amenityCategories = [
    {
      title: 'Private Wellness & Outdoors',
      items: [
        { name: 'Private Heated Outdoor Jacuzzi (4-Seater)', highlight: true },
        { name: 'Private Enclosed Garden Lawn & Lounge', highlight: true },
        { name: 'Shade Canopy over Jacuzzi Area' },
        { name: 'Warm Ambient Accent Mood Lighting' },
        { name: 'Private Outdoor Seating Deck' },
      ]
    },
    {
      title: 'Comfort & Interiors',
      items: [
        { name: 'Plush King Size Bed', highlight: true },
        { name: '100+ Mbps Fiber Wi-Fi Connectivity', highlight: true },
        { name: 'Split Air Conditioning Unit' },
        { name: '43" Smart TV with Premium OTT Subscriptions' },
        { name: 'Luxury Cotton Linens & Sanitized Towels' },
      ]
    },
    {
      title: 'Kitchenette & Dining',
      items: [
        { name: 'Induction Cooktop & Kettle' },
        { name: 'Double-Door Fridge & Microwave' },
        { name: 'Complimentary Tea/Coffee Maker Kits' },
        { name: 'Non-stick Cookware Pans & Fine Crockery' },
        { name: 'Drinking Water Purifier Filter' },
      ]
    },
    {
      title: 'Safety & Convenience',
      items: [
        { name: '24/7 Gated Security Patrol (Tata Glenwood)' },
        { name: 'Heavy-Duty Inverter Power Backup', highlight: true },
        { name: 'Secure Free Parking on Premises' },
        { name: 'Dedicated Caretaker Assistance' },
        { name: 'Complimentary Daily Garbage Service' },
      ]
    }
  ];

  const rules = [
    'Check-in starts at 2:00 PM; Check-out is strictly at 11:00 AM (for Jacuzzi sanitation).',
    'Maximum occupancy is strictly capped at 4 adults (2 stay on double mattress).',
    'Quiet hours must be observed in the garden lawn after 10:00 PM.',
    'Smoking is strictly prohibited inside the room (allowed in outdoor garden only).',
    'Pets are not allowed on the premises to maintain garden cleanliness.',
    'Use of glassware inside or near the Jacuzzi is strictly forbidden (unbreakable glasses provided).',
  ];

  const handleOpenLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  return (
    <div className="bg-background min-h-screen text-white">
      {/* 1. Header Banner */}
      <section className="relative h-[45vh] flex items-center justify-center overflow-hidden border-b border-gold-400/10">
        <div className="absolute inset-0 bg-black/75 z-10" />
        <img
          src="/images/bedroom/bedroom2.jpeg"
          alt="Aura Abode Banner"
          className="absolute inset-0 w-full h-full object-cover object-center scale-105"
        />
        <div className="relative z-20 text-center space-y-4 px-4 mt-12">
          <span className="text-gold-400 text-xs font-sans tracking-[0.45em] uppercase font-semibold">
            Discover Aura Abode
          </span>
          <h1 className="font-serif text-3xl md:text-5xl font-medium tracking-wide">
            Apartment Details & Amenities
          </h1>
          <div className="w-12 h-[1px] bg-gold-400 mx-auto mt-4" />
          <p className="text-xs text-zinc-400 max-w-md mx-auto font-light leading-relaxed">
            Read through our comprehensive list of features, guidelines, and house rules to prepare for your luxurious stay.
          </p>
        </div>
      </section>

      {/* 2. Detailed Description & Video */}
      <section className="py-24 px-4 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-20">
        <div className="lg:col-span-7 space-y-8">
          <h2 className="font-serif text-3xl md:text-4xl text-white font-medium flex items-center gap-3">
            <Sparkles className="w-6 h-6 text-gold-400" />
            Your Private Sanctuary
          </h2>
          <p className="text-zinc-400 text-sm font-light leading-relaxed">
            Welcome to Aura Abode Karjat, a masterfully curated studio apartment where modern convenience meets absolute natural peace. This vacation rental is designed with a singular focus: to offer a private, premium couple's retreat or small family escape away from the city.
          </p>
          <p className="text-zinc-400 text-sm font-light leading-relaxed">
            The studio features an open-plan layout complete with a comfortable king bed, soft ambient lighting, a plush sofa lounge, and a high-definition home entertainment setup. The glass sliding doors lead you directly into your private enclosed lawn—a green oasis reserved completely for you.
          </p>
          
          {/* Detailed Jacuzzi info */}
          <div className="bg-zinc-950 border border-zinc-900 p-6 space-y-3">
            <h4 className="font-serif text-gold-400 text-sm font-semibold uppercase tracking-wider">
              🔥 Private Heated Jacuzzi Specifications
            </h4>
            <p className="text-zinc-500 text-xs font-light leading-relaxed">
              Our signature 4-seater outdoor Jacuzzi is situated in a cozy corner of the private garden lawn with a protective canopy overhead. The tub features hybrid electric heating (temperature maintained between 36°C and 40°C), multi-point hydro-massage jets, and customizable underwater LED lights. We completely drain, scrub, sanitize, and refill the water before every guest check-in.
            </p>
          </div>

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
            Cinematic Preview
          </h3>
          <div className="relative aspect-video border border-gold-400/10 group overflow-hidden bg-zinc-900 flex items-center justify-center shadow-xl">
            {/* Mock video player representation */}
            <div className="absolute inset-0 bg-black/45 z-10 group-hover:bg-black/55 transition-colors" />
            <img
              src="/images/living-room/living2.jpeg"
              alt="Garden Jacuzzi Video Thumbnail"
              className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
            />
            {/* Play Button */}
            <button
              onClick={() => alert('Cinematic walkthrough video will open here.')}
              className="relative z-20 w-16 h-16 bg-gold-400 hover:bg-gold-500 text-black rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110 shadow-2xl cursor-pointer"
            >
              <Play className="w-5 h-5 fill-black ml-1" />
            </button>
          </div>
          <p className="text-zinc-500 text-xs font-light text-center leading-relaxed">
            Take a 1-minute visual walkthrough of the luxury studio, private garden, and jacuzzi setup.
          </p>
        </div>
      </section>

      {/* 3. Grid Gallery Preview */}
      <section className="py-20 bg-zinc-950 border-y border-zinc-900 px-4">
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
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/50 transition-colors duration-300 z-10 flex items-center justify-center">
                  <span className="text-[10px] text-white opacity-0 group-hover:opacity-100 uppercase tracking-widest font-semibold bg-black/70 px-3 py-1.5 transition-all border border-gold-400/20">View</span>
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
      <section id="amenities" className="py-24 px-4 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-20 space-y-4">
          <span className="text-gold-500 text-xs font-sans tracking-[0.4em] uppercase font-semibold">
            Features & Amenities
          </span>
          <h2 className="font-serif text-3xl md:text-5xl text-white font-medium">
            Everything You Need For a Perfect Stay
          </h2>
          <div className="w-12 h-[1px] bg-gold-400 mx-auto mt-6" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {amenityCategories.map((cat, idx) => (
            <div key={idx} className="bg-zinc-950 border border-zinc-900 p-8 shadow-xl">
              <h3 className="font-serif text-lg text-gold-400 font-semibold mb-6 border-b border-zinc-900 pb-3">
                {cat.title}
              </h3>
              <ul className="space-y-4">
                {cat.items.map((item, itemIdx) => (
                  <li key={itemIdx} className="flex items-start text-xs font-light text-zinc-400">
                    <Check className={`w-4.5 h-4.5 mr-2.5 flex-shrink-0 ${item.highlight ? 'text-gold-400' : 'text-zinc-700'}`} />
                    <span className={item.highlight ? 'text-white font-medium' : ''}>{item.name}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Rules, Food & Timing Guidelines */}
      <section className="bg-zinc-950 border-t border-zinc-900 py-24 px-4">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
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
                <div className="space-y-3 border-l border-zinc-900/80 pl-8">
                  <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-semibold block">Check-Out</span>
                  <span className="text-white text-2xl font-serif font-semibold">11:00 AM</span>
                  <p className="leading-relaxed">Late check-out requests must be submitted 24 hours prior and may attract hourly charges.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 text-xs bg-zinc-950 p-4 border border-zinc-900 text-zinc-500 leading-relaxed">
                <Info className="w-5 h-5 text-gold-400 flex-shrink-0 mt-0.5" />
                <span>We require original government ID proof for all checking guests. Gated society security checks are strictly enforced.</span>
              </div>
            </div>
          </div>

          {/* Caretaker meals & power backup details block */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-zinc-900 text-xs">
            <div className="bg-zinc-900/10 p-6 border border-zinc-900 space-y-3">
              <h4 className="font-serif text-white font-medium text-sm flex items-center gap-2">
                <Coffee className="w-4 h-4 text-gold-400" /> Home Cooked Caretaker Meals
              </h4>
              <p className="text-zinc-500 font-light leading-relaxed">
                Our resident caretakers can prepare delicious, local Maharashtrian meals (Breakfast, Lunch, and Dinner) on pre-order requests at reasonable rates. Alternatively, you can order food from multiple restaurants in Karjat via Zomato/Swiggy or drive down to nearby eateries.
              </p>
            </div>
            <div className="bg-zinc-900/10 p-6 border border-zinc-900 space-y-3">
              <h4 className="font-serif text-white font-medium text-sm flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-gold-400" /> Power Backup & High Security
              </h4>
              <p className="text-zinc-500 font-light leading-relaxed">
                Aura Abode features 24/7 security guards and secure gate screening at Tata Glenwood society. For power security, we are equipped with a heavy-duty inverter battery backup system ensuring lights, ceiling fans, and high-speed Wi-Fi router run uninterrupted in case of power cuts.
              </p>
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
