'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';
import Link from 'next/link';

interface CloudinaryMedia {
  public_id: string;
  secure_url: string;
  resource_type: 'image' | 'video';
  width: number;
  height: number;
}

interface GalleryProps {
  mediaGroups: Record<string, CloudinaryMedia[]>;
  title: string;
  backLink?: string;
  backLabel?: string;
}

export default function Gallery({ mediaGroups, title, backLink = "/portfolio", backLabel = "Back to Portfolio" }: GalleryProps) {
  const [activeFolder, setActiveFolder] = useState<string | null>(null);
  const [selectedMedia, setSelectedMedia] = useState<{ folder: string; index: number } | null>(null);

  const folders = Object.keys(mediaGroups).filter(folder => mediaGroups[folder]?.length > 0);

  const openLightbox = (folder: string, index: number) => {
    setSelectedMedia({ folder, index });
  };

  const closeLightbox = () => setSelectedMedia(null);

  const navigate = useCallback((direction: 'prev' | 'next') => {
    if (!selectedMedia) return;

    const { folder, index } = selectedMedia;
    const currentFolderMedia = mediaGroups[folder];
    let newIndex = direction === 'next' ? index + 1 : index - 1;

    if (newIndex >= currentFolderMedia.length) newIndex = 0;
    if (newIndex < 0) newIndex = currentFolderMedia.length - 1;

    setSelectedMedia({ folder, index: newIndex });
  }, [selectedMedia, mediaGroups]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedMedia) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') navigate('next');
      if (e.key === 'ArrowLeft') navigate('prev');
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedMedia, navigate]);

  const getSliderMedia = () => {
    if (!selectedMedia) return null;
    const { folder, index } = selectedMedia;
    const list = mediaGroups[folder];
    const prev = list[(index - 1 + list.length) % list.length];
    const current = list[index];
    const next = list[(index + 1) % list.length];
    return { prev, current, next };
  };

  const slider = getSliderMedia();

  const renderMedia = (media: CloudinaryMedia, className: string, autoPlay: boolean = false) => {
    if (media.resource_type === 'video') {
      return (
        <video 
          src={media.secure_url} 
          className={className} 
          autoPlay={autoPlay} 
          loop 
          muted 
          playsInline 
        />
      );
    }
    return <img src={media.secure_url} className={className} alt="Gallery item" loading="lazy" />;
  };

  return (
    <div className="w-full">
      <div className="mb-10 flex flex-col md:flex-row items-center justify-between gap-6">
        <h1 className="text-4xl font-bold uppercase tracking-widest text-white">{title}</h1>
        <Link href={backLink} className="px-6 py-2 rounded-full border border-white/10 hover:border-[#ff1267] hover:text-[#ff1267] transition-all text-sm uppercase tracking-widest">
          {backLabel}
        </Link>
      </div>

      {!activeFolder ? (
        <div className="columns-1 sm:columns-3 lg:columns-4 gap-6">
          {folders.map((folder) => {
            const coverMedia = mediaGroups[folder]?.[0];
            const mediaCount = mediaGroups[folder]?.length || 0;
            if (!coverMedia) return null;

            return (
              <div
                key={folder}
                className="relative cursor-pointer overflow-hidden rounded-2xl group ring-1 ring-white/10 hover:ring-[#ff1267]/50 hover:shadow-[0_0_40px_rgba(255,18,103,0.15)] transition-all duration-700 break-inside-avoid mb-6"
                onClick={() => setActiveFolder(folder)}
              >
                {renderMedia(coverMedia, "w-full h-auto block transition-transform duration-1000 group-hover:scale-110 object-cover", true)}
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="absolute inset-0 flex flex-col items-center justify-end p-8 text-center translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <h2 className="text-xl md:text-2xl font-light tracking-[0.25em] uppercase text-white drop-shadow-xl">
                    {folder}
                  </h2>
                  <div className="w-8 h-[2px] bg-[#ff1267] my-3 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center" />
                  <span className="text-xs tracking-[0.3em] uppercase text-white/60 group-hover:text-white/90 transition-colors duration-500">
                    {mediaCount} Items
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
            {mediaGroups[activeFolder].map((media, index) => (
              <div
                key={media.public_id}
                className="relative cursor-zoom-in overflow-hidden rounded-xl group ring-1 ring-white/10 hover:ring-[#ff1267]/50 hover:shadow-[0_0_40px_rgba(255,18,103,0.15)] transition-all duration-500 mb-6 break-inside-avoid"
                onClick={() => openLightbox(activeFolder, index)}
              >
                {renderMedia(media, "w-full h-auto block transition-transform duration-700 group-hover:scale-105", true)}
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

      {selectedMedia && slider && (
        <div className="fixed inset-0 z-100 flex flex-col items-center justify-center bg-black/95 backdrop-blur-3xl animate-in fade-in duration-500">
          <div className="absolute top-0 left-0 w-full p-6 flex justify-between items-center z-140">
            <span className="text-white/50 text-[10px] md:text-xs tracking-[0.4em] uppercase bg-black/20 px-4 py-2 rounded-full backdrop-blur-md border border-white/5">
              {selectedMedia.folder} <span className="text-[#ff1267] mx-2">|</span> {selectedMedia.index + 1} / {mediaGroups[selectedMedia.folder].length}
            </span>
            <button
              onClick={closeLightbox}
              className="bg-white/5 hover:bg-[#ff1267] backdrop-blur-md border border-white/10 rounded-full p-3 text-white/70 hover:text-white transition-all hover:rotate-90 duration-300 shadow-lg"
            >
              <X size={24} strokeWidth={1.5} />
            </button>
          </div>

          <div className="relative flex-1 w-full flex items-center justify-center overflow-hidden py-24 px-4 md:px-32">
            <div className="relative z-10 flex items-center justify-center transition-all duration-700 max-w-full max-h-full">
               {renderMedia(slider.current, "max-w-full max-h-[70vh] md:max-h-[80vh] w-auto h-auto object-contain shadow-[0_0_80px_rgba(255,18,103,0.15)] rounded-lg", true)}
            </div>

            <button onClick={() => navigate('prev')} className="absolute left-4 md:left-10 bg-white/5 hover:bg-[#ff1267] backdrop-blur-md border border-white/10 rounded-full p-3 md:p-4 text-white/60 hover:text-white transition-all z-140 hover:scale-110 shadow-lg">
              <ChevronLeft size={32} strokeWidth={1.5} />
            </button>
            <button onClick={() => navigate('next')} className="absolute right-4 md:right-10 bg-white/5 hover:bg-[#ff1267] backdrop-blur-md border border-white/10 rounded-full p-3 md:p-4 text-white/60 hover:text-white transition-all z-140 hover:scale-110 shadow-lg">
              <ChevronRight size={32} strokeWidth={1.5} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}