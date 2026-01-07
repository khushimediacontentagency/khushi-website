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
  const [selectedImage, setSelectedImage] = useState<{ folder: string; index: number } | null>(null);

  const folders = Object.keys(imageGroups);

  const openLightbox = (folder: string, index: number) => {
    setSelectedImage({ folder, index });
  };

  const closeLightbox = () => setSelectedImage(null);

  const navigate = useCallback((direction: 'prev' | 'next') => {
    if (!selectedImage) return;

    const { folder, index } = selectedImage;
    const currentFolderImages = imageGroups[folder];
    let newIndex = direction === 'next' ? index + 1 : index - 1;

    if (newIndex >= currentFolderImages.length) newIndex = 0;
    if (newIndex < 0) newIndex = currentFolderImages.length - 1;

    setSelectedImage({ folder, index: newIndex });
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

  const getSliderImages = () => {
    if (!selectedImage) return null;
    const { folder, index } = selectedImage;
    const list = imageGroups[folder];
    const prev = list[(index - 1 + list.length) % list.length];
    const current = list[index];
    const next = list[(index + 1) % list.length];
    return { prev, current, next };
  };

  const slider = getSliderImages();

  return (
    <div className="space-y-24">
      {folders.map((folder) => (
        <section key={folder} className="space-y-8">
          <h2 className="text-2xl font-light tracking-[0.2em] uppercase border-l-4 border-[#ff1267] pl-4 text-white">
            {folder}
          </h2>
          
          <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
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
                <div className="absolute inset-0 bg-[#ff1267]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            ))}
          </div>
        </section>
      ))}

      {selectedImage && slider && (
        <div className="fixed inset-0 z-100 flex flex-col items-center justify-center bg-black/98 backdrop-blur-3xl animate-in fade-in duration-500">
          <div className="absolute top-0 left-0 w-full p-6 flex justify-between items-center z-140">
            <span className="text-white/40 text-[10px] md:text-xs tracking-[0.4em] uppercase">
              {selectedImage.folder} <span className="text-[#ff1267] mx-2">|</span> {selectedImage.index + 1} / {imageGroups[selectedImage.folder].length}
            </span>
            <button 
              onClick={closeLightbox}
              className="text-white/60 hover:text-[#ff1267] transition-all p-2 hover:rotate-90 duration-300"
            >
              <X size={32} strokeWidth={1} />
            </button>
          </div>

          <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
            <div 
              className="hidden lg:block absolute left-[-5%] w-[35%] opacity-25 blur-[2px] cursor-pointer transition-all hover:opacity-50 hover:blur-0 duration-700 transform scale-90"
              onClick={() => navigate('prev')}
            >
              <img src={slider.prev.secure_url} className="w-full h-auto max-h-[50vh] object-contain rounded-lg shadow-2xl" alt="prev" />
            </div>

            <div className="relative z-10 max-w-[60%] max-h-[75%] flex items-center justify-center transition-all duration-700">
              <img 
                src={slider.current.secure_url} 
                alt="Selected visual" 
                className="max-w-full max-h-full object-contain shadow-[0_0_120px_rgba(255,18,103,0.12)] rounded-sm"
              />
            </div>

            <div 
              className="hidden lg:block absolute right-[-5%] w-[35%] opacity-25 blur-[2px] cursor-pointer transition-all hover:opacity-50 hover:blur-0 duration-700 transform scale-90"
              onClick={() => navigate('next')}
            >
              <img src={slider.next.secure_url} className="w-full h-auto max-h-[50vh] object-contain rounded-lg shadow-2xl" alt="next" />
            </div>

            <button 
              onClick={() => navigate('prev')}
              className="absolute left-4 md:left-10 text-white/30 hover:text-[#ff1267] transition-all z-140 hover:scale-110"
            >
              <ChevronLeft size={56} strokeWidth={0.75} />
            </button>

            <button 
              onClick={() => navigate('next')}
              className="absolute right-4 md:right-10 text-white/30 hover:text-[#ff1267] transition-all z-140 hover:scale-110"
            >
              <ChevronRight size={56} strokeWidth={0.75} />
            </button>
          </div>

          <div className="absolute bottom-12 flex gap-1.5 px-6 max-w-full overflow-hidden">
             {imageGroups[selectedImage.folder].map((_, i) => (
               <div 
                key={i} 
                className={`h-px transition-all duration-700 ${i === selectedImage.index ? 'w-10 bg-[#ff1267]' : 'w-2 bg-white/10'}`}
               />
             ))}
          </div>
        </div>
      )}
    </div>
  );
}