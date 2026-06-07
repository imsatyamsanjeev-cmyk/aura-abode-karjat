'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Lightbox from '@/components/GalleryLightbox';
import { Camera, Film, Sparkles, SlidersHorizontal } from 'lucide-react';

export default function GalleryPage() {
  const [filter, setFilter] = useState('all');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [videoOpen, setVideoOpen] = useState(false);

  const galleryItems = [
    {
      src: '/images/bedroom/bedroom1.jpeg',
      alt: 'Luxury Studio Suite',
      category: 'interior',
      caption: 'The main open-plan bedroom featuring modern design, premium linens, and warm ambient lighting.'
    },
    {
      src: '/images/living-room/living1.jpeg',
      alt: 'Chic Living Lounge',
      category: 'interior',
      caption: 'Elegant living space with plush sofa seating, modern decor, and direct garden access.'
    },
    {
      src: '/images/kitchen/kitchen1.jpeg',
      alt: 'Equipped Kitchenette',
      category: 'interior',
      caption: 'Equipped kitchenette with induction stove, refrigerator, microwave, and hot kettle.'
    },
    {
      src: '/images/washroom/washroom1.jpeg',
      alt: 'Premium Bathroom',
      category: 'interior',
      caption: 'Sleek washroom layout featuring premium marble fitments and glass divider.'
    },
    {
      src: '/images/jacuzzi/jacuzzi1.jpeg',
      alt: 'Heated Private Jacuzzi',
      category: 'wellness',
      caption: 'Spacious outdoor heated jacuzzi under a shade canopy in your private garden corner.'
    },
    {
      src: '/images/garden/garden1.jpeg',
      alt: 'Enclosed Garden Lawn',
      category: 'outdoors',
      caption: 'Lush private garden lawn surrounded by security hedges, perfect for morning walks.'
    },
    {
      src: '/images/living-room/living2.jpeg',
      alt: 'Lounge Seating View',
      category: 'interior',
      caption: 'Comfortable sofa seating looking out directly to the scenic private lawn.'
    },
    {
      src: '/images/living-room/living3.jpeg',
      alt: 'Warm Ambient Details',
      category: 'interior',
      caption: 'Soft warm spotlighting highlights the wood textures and premium fitments.'
    },
    {
      src: '/images/bedroom/bedroom2.jpeg',
      alt: 'Plush Bedding Details',
      category: 'interior',
      caption: 'Close-up of our high-quality mattresses and double cushions for deep comfort.'
    },
    {
      src: '/images/bedroom/bedroom3.jpeg',
      alt: 'Studio Closets & Wardrobes',
      category: 'interior',
      caption: 'Premium cabinet wood works and custom closet wardrobes inside the studio suite.'
    },
    {
      src: '/images/washroom/washroom2.jpeg',
      alt: 'Modern Bathroom Vanity',
      category: 'interior',
      caption: 'Sleek dark marble vanity space with top-tier modern sanitary details.'
    },
    {
      src: '/images/garden/garden2.jpeg',
      alt: 'Evening Garden Ambiance',
      category: 'outdoors',
      caption: 'Beautiful twilight lighting setups that transform the garden space into a magical oasis.'
    },
    {
      src: '/images/valleys/valley1.jpeg',
      alt: 'Scenic Valley Surroundings',
      category: 'surroundings',
      caption: 'Lush green peaks and foggy valleys of Karjat, located just minutes outside the property.'
    },
    {
      src: '/images/backyard/backyard1.jpeg',
      alt: 'Private Backyard Deck',
      category: 'outdoors',
      caption: 'Quiet outdoor backyard seating deck surrounded by dense forest tree tops.'
    },
    {
      src: '/images/backyard/backyard2.jpeg',
      alt: 'Backyard Pathway',
      category: 'outdoors',
      caption: 'Clean stone pathway running along the private garden perimeter.'
    }
  ];

  const filteredItems = filter === 'all' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === filter);

  const handleOpenLightbox = (index: number) => {
    // Find the index of the clicked item in the filtered list
    const originalItem = filteredItems[index];
    const originalIndex = galleryItems.findIndex(item => item.src === originalItem.src);
    setLightboxIndex(originalIndex);
    setLightboxOpen(true);
  };

  const categories = [
    { value: 'all', label: 'All Photos' },
    { value: 'interior', label: 'Apartment Interiors' },
    { value: 'outdoors', label: 'Garden & Backyard' },
    { value: 'wellness', label: 'Jacuzzi Spa' },
    { value: 'surroundings', label: 'Karjat Valleys' }
  ];

  return (
    <div className="bg-background min-h-screen text-white py-16 px-4">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <span className="text-gold-400 text-xs font-sans tracking-[0.4em] uppercase font-semibold block">
            Visual Tour
          </span>
          <h1 className="font-serif text-3xl md:text-5xl font-bold tracking-wide">
            Aura Abode Gallery
          </h1>
          <p className="text-xs md:text-sm text-zinc-400 font-light leading-relaxed">
            Browse through actual, high-resolution photographs of our luxury studio apartment, private garden layout, heated jacuzzi, and the breathtaking valleys of Karjat.
          </p>
          <div className="w-16 h-[1px] bg-gold-400 mx-auto mt-4" />
        </div>

        {/* Filter categories */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-6">
          <SlidersHorizontal className="w-4 h-4 text-zinc-500 mr-2 hidden sm:inline" />
          {categories.map(cat => (
            <button
              key={cat.value}
              onClick={() => setFilter(cat.value)}
              className={`px-5 py-2.5 text-xs uppercase tracking-widest transition-all rounded-none font-semibold border ${
                filter === cat.value
                  ? 'bg-gold-400 border-gold-400 text-black shadow-md'
                  : 'border-zinc-800 text-zinc-400 hover:border-zinc-700 hover:text-white'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Grid display */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-6">
          {filteredItems.map((item, idx) => (
            <div
              key={idx}
              onClick={() => handleOpenLightbox(idx)}
              className="group aspect-[3/2] bg-zinc-950 border border-zinc-900 overflow-hidden relative cursor-pointer shadow-md hover:shadow-gold-900/10 transition-shadow"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-60 group-hover:opacity-90 transition-opacity z-10" />
              
              <Image
                src={item.src}
                alt={item.alt}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />

              {/* Title & Zoom Info overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-6 z-20 transform translate-y-3 group-hover:translate-y-0 transition-transform duration-300">
                <span className="text-[9px] uppercase tracking-widest text-gold-400 font-semibold bg-black/60 px-2 py-1 mb-2 inline-block border border-gold-900/20">
                  {item.category === 'interior' ? 'Interior' : item.category === 'outdoors' ? 'Garden & Jacuzzi' : 'Surroundings'}
                </span>
                <h4 className="font-serif text-white font-medium text-lg leading-snug">
                  {item.alt}
                </h4>
                <p className="text-[10px] text-zinc-400 font-light mt-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 leading-relaxed">
                  {item.caption}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Video Tour Callout */}
        <div className="bg-zinc-950 border border-zinc-900 p-8 md:p-12 text-center max-w-4xl mx-auto space-y-6 mt-16">
          <div className="flex justify-center">
            <Film className="w-12 h-12 text-gold-400" />
          </div>
          <h3 className="font-serif text-2xl text-white font-medium">
            Watch the Cinematic Walkthrough
          </h3>
          <p className="text-zinc-500 text-xs font-light max-w-md mx-auto leading-relaxed">
            Experience Aura Abode through a compiled visual video showcasing the private lawn setup, ambient garden lights, heated jacuzzi functions, and modern interior comforts.
          </p>
          <div className="pt-2">
            <button
              onClick={() => setVideoOpen(true)}
              className="px-8 py-3 bg-gold-400 hover:bg-gold-500 text-black text-xs uppercase tracking-widest font-bold transition-colors rounded-none shadow-md inline-flex items-center gap-2 cursor-pointer"
            >
              Play Video Tour
            </button>
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <Lightbox
          images={galleryItems}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxOpen(false)}
          onPrev={() => setLightboxIndex((lightboxIndex - 1 + galleryItems.length) % galleryItems.length)}
          onNext={() => setLightboxIndex((lightboxIndex + 1) % galleryItems.length)}
        />
      )}

      {/* Video Overlay Modal */}
      {videoOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md p-4 animate-fade-in">
          <div className="relative w-full max-w-4xl border border-gold-400/20 bg-zinc-950 shadow-2xl overflow-hidden">
            {/* Close Button */}
            <button
              onClick={() => setVideoOpen(false)}
              className="absolute top-4 right-4 z-10 bg-black/60 hover:bg-black text-white hover:text-gold-400 border border-zinc-900 hover:border-zinc-800 p-2 text-xs uppercase tracking-widest font-semibold transition-all cursor-pointer"
            >
              ✕ Close
            </button>
            <div className="aspect-video w-full">
              <video 
                src="/video/aura-abode-tour.mp4" 
                controls 
                autoPlay 
                className="w-full h-full object-contain"
              ></video>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
