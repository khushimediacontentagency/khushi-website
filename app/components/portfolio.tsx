'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';

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
  const [activeFolder, setActiveFolder] = useState<string | null>(null);
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
    <div className="w-full">
      {!activeFolder ? (
        <div className="columns-1 sm:columns-3 lg:columns-4 gap-6">
          {folders.map((folder) => {
            const coverImage = imageGroups[folder]?.[0];
            const imageCount = imageGroups[folder]?.length || 0;
            if (!coverImage) return null;

            return (
              <div
                key={folder}
                className="relative cursor-pointer overflow-hidden rounded-2xl group ring-1 ring-white/10 hover:ring-[#ff1267]/50 hover:shadow-[0_0_40px_rgba(255,18,103,0.15)] transition-all duration-700 break-inside-avoid mb-6"
                onClick={() => setActiveFolder(folder)}
              >
                <img
                  src={coverImage.secure_url}
                  alt={folder}
                  className="w-full h-auto block transition-transform duration-1000 group-hover:scale-110 object-cover"
                  loading="lazy"
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="absolute inset-0 flex flex-col items-center justify-end p-8 text-center translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <h2 className="text-xl md:text-2xl font-light tracking-[0.25em] uppercase text-white drop-shadow-xl">
                    {folder}
                  </h2>
                  
                  <div className="w-8 h-[2px] bg-[#ff1267] my-3 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center" />
                  
                  <span className="text-xs tracking-[0.3em] uppercase text-white/60 group-hover:text-white/90 transition-colors duration-500">
                    {imageCount} {imageCount === 1 ? 'Image' : 'Images'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="flex flex-col gap-4 mb-6">
            <div className="self-start">
              <button
                onClick={() => setActiveFolder(null)}
                className="group flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 hover:bg-[#ff1267]/10 text-white/60 hover:text-[#ff1267] transition-all uppercase tracking-[0.2em] text-xs font-medium backdrop-blur-md border border-white/5 hover:border-[#ff1267]/30"
              >
                <ChevronLeft size={16} className="transition-transform duration-300 group-hover:-translate-x-1" />
                Back to Albums
              </button>
            </div>
            <h2 className="text-3xl font-light tracking-[0.2em] uppercase border-l-2 border-[#ff1267] pl-5 text-white drop-shadow-md">
              {activeFolder}
            </h2>
          </div>

          <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6">
            {imageGroups[activeFolder].map((image, index) => (
              <div
                key={image.public_id}
                className="relative cursor-zoom-in overflow-hidden rounded-xl group ring-1 ring-white/10 hover:ring-[#ff1267]/50 hover:shadow-[0_0_40px_rgba(255,18,103,0.15)] transition-all duration-500 mb-6 break-inside-avoid"
                onClick={() => openLightbox(activeFolder, index)}
              >
                <img
                  src={image.secure_url}
                  alt={`${activeFolder} photo ${index}`}
                  className="w-full h-auto block transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-500 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-all duration-500 scale-75 group-hover:scale-100 bg-white/10 backdrop-blur-md p-4 rounded-full border border-white/20">
                    <ZoomIn className="text-white w-6 h-6" strokeWidth={1.5} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {selectedImage && slider && (
        <div className="fixed inset-0 z-100 flex flex-col items-center justify-center bg-black/95 backdrop-blur-3xl animate-in fade-in duration-500">
          <div className="absolute top-0 left-0 w-full p-6 flex justify-between items-center z-140">
            <span className="text-white/50 text-[10px] md:text-xs tracking-[0.4em] uppercase bg-black/20 px-4 py-2 rounded-full backdrop-blur-md border border-white/5">
              {selectedImage.folder} <span className="text-[#ff1267] mx-2">|</span> {selectedImage.index + 1} / {imageGroups[selectedImage.folder].length}
            </span>
            <button
              onClick={closeLightbox}
              className="bg-white/5 hover:bg-[#ff1267] backdrop-blur-md border border-white/10 rounded-full p-3 text-white/70 hover:text-white transition-all hover:rotate-90 duration-300 shadow-lg"
            >
              <X size={24} strokeWidth={1.5} />
            </button>
          </div>

          <div className="relative flex-1 w-full flex items-center justify-center overflow-hidden py-24 px-4 md:px-32">
            <div
              className="hidden lg:block absolute left-[-5%] w-[35%] opacity-20 blur-[4px] cursor-pointer transition-all hover:opacity-40 hover:blur-[2px] duration-700 transform scale-90"
              onClick={() => navigate('prev')}
            >
              <img src={slider.prev.secure_url} className="w-full h-auto max-h-[50vh] object-contain rounded-xl" alt="prev" />
            </div>

            <div className="relative z-10 flex items-center justify-center transition-all duration-700 max-w-full max-h-full">
              <img
                src={slider.current.secure_url}
                alt="Selected visual"
                className="max-w-full max-h-[70vh] md:max-h-[80vh] w-auto h-auto object-contain shadow-[0_0_80px_rgba(255,18,103,0.15)] rounded-lg"
              />
            </div>

            <div
              className="hidden lg:block absolute right-[-5%] w-[35%] opacity-20 blur-[4px] cursor-pointer transition-all hover:opacity-40 hover:blur-[2px] duration-700 transform scale-90"
              onClick={() => navigate('next')}
            >
              <img src={slider.next.secure_url} className="w-full h-auto max-h-[50vh] object-contain rounded-xl" alt="next" />
            </div>

            <button
              onClick={() => navigate('prev')}
              className="absolute left-4 md:left-10 bg-white/5 hover:bg-[#ff1267] backdrop-blur-md border border-white/10 rounded-full p-3 md:p-4 text-white/60 hover:text-white transition-all z-140 hover:scale-110 shadow-lg"
            >
              <ChevronLeft size={32} strokeWidth={1.5} />
            </button>

            <button
              onClick={() => navigate('next')}
              className="absolute right-4 md:right-10 bg-white/5 hover:bg-[#ff1267] backdrop-blur-md border border-white/10 rounded-full p-3 md:p-4 text-white/60 hover:text-white transition-all z-140 hover:scale-110 shadow-lg"
            >
              <ChevronRight size={32} strokeWidth={1.5} />
            </button>
          </div>

          <div className="absolute bottom-8 md:bottom-10 flex gap-2 px-6 max-w-full overflow-hidden items-center z-140">
            {imageGroups[selectedImage.folder].map((_, i) => (
              <div
                key={i}
                className={`transition-all duration-500 rounded-full ${i === selectedImage.index ? 'w-10 h-1.5 bg-[#ff1267] shadow-[0_0_10px_rgba(255,18,103,0.5)]' : 'w-2 h-1.5 bg-white/20 hover:bg-white/40 cursor-pointer'}`}
                onClick={() => setSelectedImage({ folder: selectedImage.folder, index: i })}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}