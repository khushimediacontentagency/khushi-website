'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';

const OptimizedVideo = ({ src }: { src: string }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const posterUrl = src.replace(/\.[^/.]+$/, ".jpg").replace("/upload/", "/upload/q_auto,f_auto,w_400/");
  const gridVideoUrl = src.replace("/upload/", "/upload/q_auto:eco,vc_auto,w_400/");

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
    <div className="relative w-full h-full bg-zinc-900 overflow-hidden rounded-xl">
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

const useCardBackgroundColor = (imageSrc: string) => {
  const [color, setColor] = useState<string>('rgba(39, 39, 42, 1)');

  useEffect(() => {
    const img = new Image();
    img.src = imageSrc;
    img.crossOrigin = "Anonymous";

    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      canvas.width = 50;
      canvas.height = 50;
      ctx.drawImage(img, 0, 0, 50, 50);
      try {
        const frameData = ctx.getImageData(0, 0, 1, 1).data;
        const [r, g, b, a] = frameData;
        if (a > 200) {
          setColor(`rgb(${r}, ${g}, ${b})`);
        }
      } catch (e) {}
    };
  }, [imageSrc]);

  return color;
};

const BrandCard = ({ src, index, onClick }: { src: string; index: number; onClick: () => void }) => {
  const bgColor = useCardBackgroundColor(src);

  return (
    <div
      className="group relative overflow-hidden rounded-xl transition-all duration-500 hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(255,18,103,0.15)] ring-1 ring-white/5 hover:ring-[#ff1267]/50 cursor-pointer flex flex-col"
      style={{ backgroundColor: bgColor }}
      onClick={onClick}
    >
      <div className="relative aspect-square flex items-center justify-center p-6 lg:pb-12 rounded-xl overflow-hidden">
        <img
          src={src}
          alt={`Brand Partner ${index + 1}`}
          className="w-full h-full object-contain transition-all duration-500 group-hover:scale-110 lg:group-hover:-translate-y-2 drop-shadow-lg"
          crossOrigin="anonymous"
        />
      </div>
      <div className="absolute bottom-0 left-0 w-full p-4 hidden lg:flex justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent pointer-events-none">
        <span className="text-white tracking-[0.2em] uppercase text-xs font-medium border border-[#ff1267] px-4 py-2 rounded-full bg-[#ff1267]/20 backdrop-blur-sm shadow-lg">
          View Work
        </span>
      </div>
    </div>
  );
};

export default function Brands({ brandLogos, brandImages }: { brandLogos: string[]; brandImages: Record<string, any[]> }) {
  const [activeBrand, setActiveBrand] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const openLightbox = (index: number) => setSelectedImage(index);
  const closeLightbox = () => setSelectedImage(null);

  useEffect(() => {
    if (activeBrand) {
      document.getElementById('brands')?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [activeBrand]);

  const navigate = useCallback((direction: 'prev' | 'next') => {
    if (selectedImage === null || !activeBrand) return;
    const currentImages = brandImages[activeBrand];
    if (!currentImages || currentImages.length === 0) return;

    let newIndex = direction === 'next' ? selectedImage + 1 : selectedImage - 1;
    if (newIndex >= currentImages.length) newIndex = 0;
    if (newIndex < 0) newIndex = currentImages.length - 1;

    setSelectedImage(newIndex);
  }, [selectedImage, activeBrand, brandImages]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImage === null) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') navigate('next');
      if (e.key === 'ArrowLeft') navigate('prev');
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImage, navigate]);

  const getSliderImages = () => {
    if (selectedImage === null || !activeBrand) return null;
    const list = brandImages[activeBrand];
    if (!list || list.length === 0) return null;
    const prev = list[(selectedImage - 1 + list.length) % list.length];
    const current = list[selectedImage];
    const next = list[(selectedImage + 1) % list.length];
    return { prev, current, next };
  };

  const slider = getSliderImages();

  return (
    <section id="brands" className="relative pt-32 pb-24 bg-zinc-950 min-h-screen overflow-hidden scroll-mt-20">
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#ff1267]/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-white/5 rounded-full blur-[80px] pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        {!activeBrand ? (
          <>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight text-white">
                Brands We <span className="text-[#ff1267]">Worked With</span>
              </h2>
              <p className="text-zinc-400 max-w-2xl mx-auto text-lg leading-relaxed">
                We collaborate with industry leaders and emerging businesses to create impactful visual narratives.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 max-w-7xl mx-auto">
              {brandLogos.map((src, index) => {
                const brandName = src.split('/').pop()?.split('.')[0] || '';
                return (
                  <BrandCard
                    key={index}
                    src={src}
                    index={index}
                    onClick={() => setActiveBrand(brandName)}
                  />
                );
              })}
            </div>
          </>
        ) : (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 max-w-7xl mx-auto">
            <div className="flex flex-col gap-4 mb-6">
              <div className="self-start">
                <button
                  onClick={() => setActiveBrand(null)}
                  className="group flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 hover:bg-[#ff1267]/10 text-white/60 hover:text-[#ff1267] transition-all uppercase tracking-[0.2em] text-xs font-medium backdrop-blur-md border border-white/5 hover:border-[#ff1267]/30"
                >
                  <ChevronLeft size={16} className="transition-transform duration-300 group-hover:-translate-x-1" />
                  Back to Brands
                </button>
              </div>
              <h2 className="text-3xl font-light tracking-[0.2em] uppercase border-l-2 border-[#ff1267] pl-5 text-white drop-shadow-md">
                {activeBrand}
              </h2>
            </div>

            {!brandImages[activeBrand] || brandImages[activeBrand].length === 0 ? (
              <div className="flex items-center justify-center py-20 text-white/40 tracking-[0.2em] uppercase text-sm">
                No images or videos available for this brand
              </div>
            ) : (
              <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6">
                {brandImages[activeBrand].map((media: any, index: number) => (
                  <div
                    key={media.public_id}
                    className="relative cursor-zoom-in overflow-hidden rounded-xl group ring-1 ring-white/10 hover:ring-[#ff1267]/50 hover:shadow-[0_0_40px_rgba(255,18,103,0.15)] transition-all duration-500 mb-6 break-inside-avoid"
                    onClick={() => openLightbox(index)}
                  >
                    {media.resource_type === 'video' ? (
                      <OptimizedVideo src={media.secure_url} />
                    ) : (
                      <img
                        src={media.secure_url.replace("/upload/", "/upload/q_auto,f_auto,w_500/")}
                        alt={`${activeBrand} photo ${index}`}
                        className="w-full h-auto block transition-transform duration-700 group-hover:scale-105"
                        loading="lazy"
                      />
                    )}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-500 flex items-center justify-center">
                      <div className="opacity-0 group-hover:opacity-100 transition-all duration-500 scale-75 group-hover:scale-100 bg-white/10 backdrop-blur-md p-4 rounded-full border border-white/20">
                        <ZoomIn className="text-white w-6 h-6" strokeWidth={1.5} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {selectedImage !== null && slider && activeBrand && (
        <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black/95 backdrop-blur-3xl animate-in fade-in duration-500">
          <div className="absolute top-0 left-0 w-full p-6 flex justify-between items-center z-[140]">
            <span className="text-white/50 text-[10px] md:text-xs tracking-[0.4em] uppercase bg-black/20 px-4 py-2 rounded-full backdrop-blur-md border border-white/5">
              {activeBrand} <span className="text-[#ff1267] mx-2">|</span> {selectedImage + 1} / {brandImages[activeBrand].length}
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
              {slider.prev.resource_type === 'video' ? (
                 <img src={slider.prev.secure_url.replace(/\.[^/.]+$/, ".jpg").replace("/upload/", "/upload/w_300,q_auto/")} className="w-full h-auto max-h-[50vh] object-contain rounded-xl" alt="prev" />
              ) : (
                 <img src={slider.prev.secure_url.replace("/upload/", "/upload/w_300,q_auto/")} className="w-full h-auto max-h-[50vh] object-contain rounded-xl" alt="prev" />
              )}
            </div>

            <div className="relative z-10 flex items-center justify-center transition-all duration-700 max-w-full max-h-full">
              {slider.current.resource_type === 'video' ? (
                 <video 
                   src={slider.current.secure_url.replace("/upload/", "/upload/q_auto,vc_auto/")} 
                   poster={slider.current.secure_url.replace(/\.[^/.]+$/, ".jpg").replace("/upload/", "/upload/q_auto,f_auto/")}
                   className="max-w-full max-h-[70vh] md:max-h-[80vh] rounded-lg shadow-[0_0_80px_rgba(255,18,103,0.15)] bg-black/20" 
                   controls 
                   autoPlay 
                   muted 
                   playsInline 
                 />
               ) : (
                 <img 
                   src={slider.current.secure_url.replace("/upload/", "/upload/q_auto:best,f_auto/")} 
                   className="max-w-full max-h-[70vh] md:max-h-[80vh] w-auto h-auto object-contain shadow-[0_0_80px_rgba(255,18,103,0.15)] rounded-lg" 
                   alt="Selected visual"
                 />
               )}
            </div>

            <div
              className="hidden lg:block absolute right-[-5%] w-[35%] opacity-20 blur-[4px] cursor-pointer transition-all hover:opacity-40 hover:blur-[2px] duration-700 transform scale-90"
              onClick={() => navigate('next')}
            >
              {slider.next.resource_type === 'video' ? (
                 <img src={slider.next.secure_url.replace(/\.[^/.]+$/, ".jpg").replace("/upload/", "/upload/w_300,q_auto/")} className="w-full h-auto max-h-[50vh] object-contain rounded-xl" alt="next" />
              ) : (
                 <img src={slider.next.secure_url.replace("/upload/", "/upload/w_300,q_auto/")} className="w-full h-auto max-h-[50vh] object-contain rounded-xl" alt="next" />
              )}
            </div>

            <button
              onClick={() => navigate('prev')}
              className="absolute left-4 md:left-10 bg-white/5 hover:bg-[#ff1267] backdrop-blur-md border border-white/10 rounded-full p-3 md:p-4 text-white/60 hover:text-white transition-all z-[140] hover:scale-110 shadow-lg"
            >
              <ChevronLeft size={32} strokeWidth={1.5} />
            </button>

            <button
              onClick={() => navigate('next')}
              className="absolute right-4 md:right-10 bg-white/5 hover:bg-[#ff1267] backdrop-blur-md border border-white/10 rounded-full p-3 md:p-4 text-white/60 hover:text-white transition-all z-[140] hover:scale-110 shadow-lg"
            >
              <ChevronRight size={32} strokeWidth={1.5} />
            </button>
          </div>

          <div className="absolute bottom-8 md:bottom-10 flex gap-2 px-6 max-w-full overflow-hidden items-center z-[140]">
            {brandImages[activeBrand].map((_, i) => (
              <div
                key={i}
                className={`transition-all duration-500 rounded-full ${i === selectedImage ? 'w-10 h-1.5 bg-[#ff1267] shadow-[0_0_10px_rgba(255,18,103,0.5)]' : 'w-2 h-1.5 bg-white/20 hover:bg-white/40 cursor-pointer'}`}
                onClick={() => setSelectedImage(i)}
              />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}