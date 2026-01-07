'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface CloudinaryImage {
  public_id: string;
  secure_url: string;
  width: number;
  height: number;
}

interface PortfolioProps {
  imageGroups: Record<string, CloudinaryImage[]>;
}

export default function Portfolio({ imageGroups }: PortfolioProps) {
  const [selectedImage, setSelectedImage] = useState<{ url: string; folder: string; index: number } | null>(null);

  const folders = Object.keys(imageGroups);

  const openLightbox = (folder: string, index: number) => {
    setSelectedImage({ url: imageGroups[folder][index].secure_url, folder, index });
  };

  const closeLightbox = () => setSelectedImage(null);

  const navigate = useCallback((direction: 'prev' | 'next') => {
    if (!selectedImage) return;

    const { folder, index } = selectedImage;
    const currentFolderImages = imageGroups[folder];
    let newIndex = direction === 'next' ? index + 1 : index - 1;

    if (newIndex >= currentFolderImages.length) newIndex = 0;
    if (newIndex < 0) newIndex = currentFolderImages.length - 1;

    setSelectedImage({
      url: currentFolderImages[newIndex].secure_url,
      folder,
      index: newIndex
    });
  }, [selectedImage, imageGroups]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedImage) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') navigate('next');
      if (e.key === 'ArrowLeft') navigate('prev');
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImage, navigate]);

  return (
    <div className="space-y-24">
      {folders.map((folder) => (
        <section key={folder} className="space-y-8">
          <h2 className="text-3xl font-light tracking-[0.2em] uppercase border-l-4 border-[#ff1267] pl-4 text-white">
            {folder}
          </h2>

          <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
            {imageGroups[folder].map((image, index) => (
              <div 
                key={image.public_id}
                className="relative cursor-zoom-in overflow-hidden rounded-sm group transition-all duration-500 hover:ring-1 hover:ring-[#ff1267]"
                onClick={() => openLightbox(folder, index)}
              >
                <img
                  src={image.secure_url}
                  alt={`${folder} photo ${index}`}
                  className="w-full h-auto object-contain transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-[#ff1267]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            ))}
          </div>
        </section>
      ))}

      {selectedImage && (
        <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/fb backdrop-blur-md p-4 animate-in fade-in duration-300">
          <div className="absolute top-0 left-0 w-full p-6 flex justify-between items-center z-110">
            <span className="text-white/50 text-xs tracking-widest uppercase">
              {selectedImage.folder} <span className="text-[#ff1267]">/</span> {selectedImage.index + 1}
            </span>
            <button 
              onClick={closeLightbox}
              className="text-white/70 hover:text-[#ff1267] transition-colors"
            >
              <X size={32} strokeWidth={1.5} />
            </button>
          </div>

          <button 
            onClick={() => navigate('prev')}
            className="absolute left-4 md:left-8 text-white/30 hover:text-[#ff1267] transition-all z-[110]"
          >
            <ChevronLeft size={60} strokeWidth={1} />
          </button>

          <div className="relative w-full h-full flex items-center justify-center">
            <img 
              src={selectedImage.url} 
              alt="High resolution preview" 
              className="max-w-full max-h-full object-contain shadow-[0_0_50px_rgba(255,18,103,0.2)]"
            />
          </div>

          <button 
            onClick={() => navigate('next')}
            className="absolute right-4 md:right-8 text-white/30 hover:text-[#ff1267] transition-all z-[110]"
          >
            <ChevronRight size={60} strokeWidth={1} />
          </button>

          <div className="absolute bottom-8 text-white/20 text-[10px] tracking-widest uppercase hidden md:block">
            Use Arrow Keys to Navigate • Esc to Close
          </div>
        </div>
      )}
    </div>
  );
}