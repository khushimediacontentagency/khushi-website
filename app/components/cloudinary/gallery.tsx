'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
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
  defaultFolder?: string;
}

const OptimizedVideo = ({ src }: { src: string }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  
  const posterUrl = src.replace(/\.[^/.]+$/, ".jpg").replace("/upload/", "/upload/q_auto,f_auto,w_400/");
  const gridVideoUrl = src.replace("/upload/", "/upload/w_400,q_auto:eco,vc_auto,so_0,eo_4,fps_15/");

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          videoRef.current?.play().catch(() => {});
        } else {
          videoRef.current?.pause();
        }
      },
      { rootMargin: '400px 0px' } 
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative w-full h-full bg-zinc-900 overflow-hidden">
      {!isLoaded && (
        <img 
          src={posterUrl} 
          className="absolute inset-0 w-full h-full object-cover blur-md scale-110 transition-opacity duration-500" 
          alt="Loading..."
          loading="lazy"
        />
      )}
      <video 
        ref={videoRef}
        src={isInView ? gridVideoUrl : undefined} 
        className={`w-full h-full object-cover transition-opacity duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
        loop
        muted
        playsInline
        onCanPlay={() => setIsLoaded(true)}
      />
    </div>
  );
};

export default function Gallery({ mediaGroups, title, backLink = "/portfolio", backLabel = "Back to Portfolio", defaultFolder }: GalleryProps) {
  const [activeFolder, setActiveFolder] = useState<string | null>(defaultFolder || null);
  const [selectedMedia, setSelectedMedia] = useState<{ folder: string; index: number } | null>(null);

  const folders = Object.keys(mediaGroups).filter(folder => mediaGroups[folder]?.length > 0);

  const openLightbox = (folder: string, index: number) => {
    setSelectedMedia({ folder, index });
  };

  const closeLightbox = () => setSelectedMedia(null);

  const navigate = useCallback((direction: 'prev' | 'next') => {
    if (!selectedMedia) return;
    const { folder, index } = selectedMedia;
    const list = mediaGroups[folder];
    let newIndex = direction === 'next' ? index + 1 : index - 1;
    if (newIndex >= list.length) newIndex = 0;
    if (newIndex < 0) newIndex = list.length - 1;
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

  const slider = selectedMedia ? {
    current: mediaGroups[selectedMedia.folder][selectedMedia.index],
    next: mediaGroups[selectedMedia.folder][(selectedMedia.index + 1) % mediaGroups[selectedMedia.folder].length],
    prev: mediaGroups[selectedMedia.folder][(selectedMedia.index - 1 + mediaGroups[selectedMedia.folder].length) % mediaGroups[selectedMedia.folder].length]
  } : null;

  return (
    <div className="w-full">
      <div className="mb-10 flex flex-col md:flex-row items-center justify-between gap-6 px-4">
        <h1 className="text-4xl font-bold uppercase tracking-widest text-white">{title}</h1>
        <Link href={backLink} className="px-6 py-2 rounded-full border border-white/10 hover:border-[#ff1267] hover:text-[#ff1267] transition-all text-sm uppercase tracking-widest bg-white/5">
          {backLabel}
        </Link>
      </div>

      {!activeFolder ? (
        <div className="columns-1 sm:columns-3 lg:columns-4 gap-6 px-4">
          {folders.map((folder) => {
            const coverMedia = mediaGroups[folder]?.[0];
            if (!coverMedia) return null;
            return (
              <div key={folder} className="relative cursor-pointer overflow-hidden rounded-2xl group ring-1 ring-white/10 mb-6" onClick={() => setActiveFolder(folder)}>
                {coverMedia.resource_type === 'video' ? <OptimizedVideo src={coverMedia.secure_url} /> : <img src={coverMedia.secure_url.replace("/upload/", "/upload/q_auto,f_auto,w_500/")} className="w-full object-cover transition-transform duration-1000 group-hover:scale-110" loading="lazy" />}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex flex-col items-center justify-end p-8 text-center">
                  <h2 className="text-xl font-light tracking-[0.25em] uppercase text-white">{folder}</h2>
                  <div className="w-8 h-[2px] bg-[#ff1267] my-3 scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                  <span className="text-xs tracking-[0.3em] uppercase text-white/60">{mediaGroups[folder].length} Items</span>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 px-4">
          {!defaultFolder && (
            <div className="flex flex-col gap-4 mb-6">
              <button onClick={() => setActiveFolder(null)} className="self-start group flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 text-white/60 hover:text-[#ff1267] transition-all uppercase tracking-[0.2em] text-xs">
                <ChevronLeft size={16} /> Back to Albums
              </button>
              <h2 className="text-3xl font-light tracking-[0.2em] uppercase border-l-2 border-[#ff1267] pl-5 text-white">{activeFolder}</h2>
            </div>
          )}

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {mediaGroups[activeFolder]?.map((media, index) => (
              <div key={media.public_id} className="relative aspect-[9/16] cursor-zoom-in overflow-hidden rounded-xl group ring-1 ring-white/10 hover:ring-[#ff1267]/50 transition-all duration-500" onClick={() => openLightbox(activeFolder, index)}>
                {media.resource_type === 'video' ? <OptimizedVideo src={media.secure_url} /> : <img src={media.secure_url.replace("/upload/", "/upload/q_auto,f_auto,w_400/")} loading="lazy" className="w-full h-full object-cover" />}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-500 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 bg-white/10 backdrop-blur-md p-3 rounded-full border border-white/20">
                    <ZoomIn className="text-white w-5 h-5" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {selectedMedia && slider && (
        <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black/98 backdrop-blur-3xl animate-in fade-in duration-300">
          <div className="absolute top-0 left-0 w-full p-6 flex justify-between items-center z-[140]">
            <span className="text-white/50 text-[10px] uppercase bg-black/40 px-4 py-2 rounded-full border border-white/5 tracking-[0.2em]">
              {selectedMedia.folder} <span className="text-[#ff1267] mx-2">|</span> {selectedMedia.index + 1} / {mediaGroups[selectedMedia.folder].length}
            </span>
            <button onClick={closeLightbox} className="bg-white/5 hover:bg-[#ff1267] rounded-full p-3 text-white/70 hover:text-white transition-all">
              <X size={24} />
            </button>
          </div>

          <div className="relative flex-1 w-full flex items-center justify-center py-12 px-4 md:px-32">
            <div className="relative z-10 w-full h-full max-w-[90vw] max-h-[85vh] flex items-center justify-center">
               {slider.current.resource_type === 'video' ? (
                 <video 
                   src={slider.current.secure_url.replace("/upload/", "/upload/q_auto,vc_auto/")} 
                   poster={slider.current.secure_url.replace(/\.[^/.]+$/, ".jpg").replace("/upload/", "/upload/q_auto,f_auto/")}
                   className="max-w-full max-h-full rounded-lg shadow-[0_0_80px_rgba(255,18,103,0.15)] bg-black/20" 
                   controls 
                   autoPlay 
                   muted 
                   playsInline 
                 />
               ) : (
                 <img 
                   src={slider.current.secure_url.replace("/upload/", "/upload/q_auto,f_auto/")} 
                   className="max-w-full max-h-full object-contain rounded-lg shadow-[0_0_80px_rgba(255,18,103,0.15)]" 
                   alt="Selected media"
                 />
               )}
            </div>

            <button onClick={() => navigate('prev')} className="absolute left-4 md:left-10 bg-black/40 hover:bg-[#ff1267] rounded-full p-4 text-white/60 hover:text-white z-[140] transition-colors">
              <ChevronLeft size={32} />
            </button>
            <button onClick={() => navigate('next')} className="absolute right-4 md:right-10 bg-black/40 hover:bg-[#ff1267] rounded-full p-4 text-white/60 hover:text-white z-[140] transition-colors">
              <ChevronRight size={32} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}