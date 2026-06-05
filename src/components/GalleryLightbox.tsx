'use client';

import React, { useEffect, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface ImageItem {
  src: string;
  alt: string;
  caption?: string;
}

interface GalleryLightboxProps {
  images: ImageItem[];
  currentIndex: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

export default function GalleryLightbox({
  images,
  currentIndex,
  onClose,
  onPrev,
  onNext,
}: GalleryLightboxProps) {
  
  // Keyboard navigation
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') onClose();
    if (e.key === 'ArrowLeft') onPrev();
    if (e.key === 'ArrowRight') onNext();
  }, [onClose, onPrev, onNext]);

  useEffect(() => {
    // Block scrolling of background body
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  if (!images || images.length === 0) return null;

  const currentImage = images[currentIndex];

  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-between bg-black/95 backdrop-blur-md transition-all duration-300">
      
      {/* Top Bar */}
      <div className="flex justify-between items-center px-6 py-4 text-white z-10">
        <span className="text-xs uppercase tracking-widest text-zinc-500 font-medium">
          {currentIndex + 1} / {images.length}
        </span>
        <button
          onClick={onClose}
          className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-900/60 rounded-full transition-colors cursor-pointer"
          title="Close (Esc)"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Main Image Slider Area */}
      <div className="flex-grow flex items-center justify-between px-4 md:px-12 relative">
        {/* Prev Arrow */}
        <button
          onClick={onPrev}
          className="p-3 bg-zinc-900/50 hover:bg-zinc-800 text-zinc-300 hover:text-white rounded-full transition-all duration-300 hover:scale-105 border border-zinc-800/40 cursor-pointer absolute left-4 md:left-8 z-10"
          title="Previous (Left Arrow)"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        {/* Active Image container */}
        <div className="w-full h-full max-w-4xl max-h-[75vh] mx-auto flex items-center justify-center select-none relative px-6">
          <img
            src={currentImage.src}
            alt={currentImage.alt}
            className="max-w-full max-h-full object-contain animate-fade-in shadow-[0_10px_50px_rgba(0,0,0,0.9)] border border-zinc-900"
          />
        </div>

        {/* Next Arrow */}
        <button
          onClick={onNext}
          className="p-3 bg-zinc-900/50 hover:bg-zinc-800 text-zinc-300 hover:text-white rounded-full transition-all duration-300 hover:scale-105 border border-zinc-800/40 cursor-pointer absolute right-4 md:right-8 z-10"
          title="Next (Right Arrow)"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Bottom Caption Bar */}
      <div className="px-6 py-6 text-center text-white z-10">
        <h4 className="font-serif text-lg md:text-xl text-gold-400 tracking-wide">
          {currentImage.alt}
        </h4>
        {currentImage.caption && (
          <p className="text-xs text-zinc-400 font-light mt-1 max-w-md mx-auto leading-relaxed">
            {currentImage.caption}
          </p>
        )}
      </div>
    </div>
  );
}
