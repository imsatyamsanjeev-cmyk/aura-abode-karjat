'use client';

import React, { useState } from 'react';
import Lightbox from '@/components/GalleryLightbox';
import { Camera, Film, Sparkles, SlidersHorizontal } from 'lucide-react';

export default function GalleryPage() {
  const [filter, setFilter] = useState('all');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const galleryItems = [
    {
      src: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=800',
      alt: 'Luxury Studio Room',
      category: 'interior',
      caption: 'The main open-plan room featuring warm architectural layout, premium linens, and accent decor.'
    },
    {
      src: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=800',
      alt: 'Outdoor Jacuzzi',
      category: 'outdoors',
      caption: 'Our signature outdoor heated Jacuzzi with jets, located in a private deck corner of the lawn.'
    },
    {
      src: 'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?q=80&w=800',
      alt: 'Lush Garden Lawn',
      category: 'outdoors',
      caption: 'Private lawn space surrounded by high boundary walls and tall hedges for absolute privacy.'
    },
    {
      src: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80&w=800',
      alt: 'Plush Bedding Detail',
      category: 'interior',
      caption: 'Close-up of our high-quality mattresses and double cushions for deep comfort.'
    },
    {
      src: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=800',
      alt: 'Modern Kitchenette',
      category: 'interior',
      caption: 'Fully equipped kitchenette setup with microwave, induction cooktop, kettle, and utensils.'
    },
    {
      src: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?q=80&w=800',
      alt: 'Luxury Bathroom Details',
      category: 'interior',
      caption: 'Chic modern bathroom fitting with sliding glass partition and fine bathroom supplies.'
    },
    {
      src: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=800',
      alt: 'Daytime Garden Seating',
      category: 'outdoors',
      caption: 'Sit and relax under the sun in our garden sofa setup, perfect for morning coffee.'
    },
    {
      src: 'https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=800',
      alt: 'Evening Garden Ambiance',
      category: 'outdoors',
      caption: 'Beautiful twilight lighting setups that transform the garden space into a magical oasis.'
    },
    {
      src: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=800',
      alt: 'Scenic Valley Surroundings',
      category: 'surroundings',
      caption: 'Lush green peaks and foggy valleys of Karjat, located just minutes outside the property.'
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
    { value: 'outdoors', label: 'Garden & Jacuzzi' },
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
              className="group aspect-4/3 bg-zinc-950 border border-zinc-900 overflow-hidden relative cursor-pointer shadow-md hover:shadow-gold-900/10 transition-shadow"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-60 group-hover:opacity-90 transition-opacity z-10" />
              
              <img
                src={item.src}
                alt={item.alt}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
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
              onClick={() => alert('Tour video will open here.')}
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
    </div>
  );
}
