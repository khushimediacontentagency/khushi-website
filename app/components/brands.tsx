'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';

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

    if (videoRef.current) observer.observe(videoRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative w-full h-full bg-zinc-900 overflow-hidden rounded-xl">
      {!isLoaded && <img src={posterUrl} className="absolute inset-0 w-full h-full object-cover blur-md scale-110 transition-opacity duration-500" alt="Loading..." loading="lazy" />}
      <video ref={videoRef} src={isInView ? gridVideoUrl : undefined} className={`w-full h-full object-cover transition-opacity duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0'}`} loop muted playsInline onCanPlay={() => setIsLoaded(true)} />
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
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      try {
        const [r, g, b, a] = ctx.getImageData(0, 0, 1, 1).data;
        setColor(`rgba(${r}, ${g}, ${b}, ${a / 255})`);
      } catch (e) {}
    };
  }, [imageSrc]);

  return color;
};

const BrandCard = ({ src, onClick }: { src: string; onClick: () => void }) => {
  const bgColor = useCardBackgroundColor(src);

  return (
    <div className="group relative overflow-hidden rounded-xl transition-transform duration-500 cursor-pointer flex flex-col w-[28vw] sm:w-[140px] md:w-[180px] lg:w-[220px] shrink-0 mx-2 md:mx-4" style={{ backgroundColor: bgColor }} onClick={onClick}>
      <div className="relative aspect-square flex items-center justify-center p-4 sm:p-6 lg:p-8 rounded-xl overflow-hidden">
        <img src={src} alt="Brand Partner" className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-110" crossOrigin="anonymous" />
      </div>
      <div className="absolute bottom-0 left-0 w-full p-4 flex justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent pointer-events-none">
        <span className="text-white tracking-[0.2em] uppercase text-[10px] md:text-xs font-medium border border-[#ff1267] px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-[#ff1267]/20 backdrop-blur-sm">View Work</span>
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
    if (activeBrand) document.getElementById('brands')?.scrollIntoView({ behavior: 'smooth' });
  }, [activeBrand]);

  const navigate = useCallback((direction: 'prev' | 'next') => {
    if (selectedImage === null || !activeBrand || !brandImages[activeBrand]?.length) return;
    const len = brandImages[activeBrand].length;
    setSelectedImage((direction === 'next' ? selectedImage + 1 : selectedImage - 1 + len) % len);
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

  const slider = selectedImage !== null && activeBrand && brandImages[activeBrand]?.length ? {
    current: brandImages[activeBrand][selectedImage],
    prev: brandImages[activeBrand][(selectedImage - 1 + brandImages[activeBrand].length) % brandImages[activeBrand].length],
    next: brandImages[activeBrand][(selectedImage + 1) % brandImages[activeBrand].length]
  } : null;

  const chunkArray = (arr: string[], size: number) => Array.from({ length: Math.ceil(arr.length / size) }, (_, i) => arr.slice(i * size, i * size + size));
  const getMarqueeItems = (arr: string[]) => Array(4).fill(Array.from({ length: Math.ceil(10 / arr.length) }, () => arr).flat()).flat();

  const desktopRows = chunkArray(brandLogos, 7);
  const mobileRows = chunkArray(brandLogos, 3);

  const renderMarqueeRow = (items: string[], direction: 'left' | 'right', keyPrefix: string) => (
    <div key={keyPrefix} className={`flex w-max ${direction === 'left' ? 'animate-marquee-left' : 'animate-marquee-right'}`}>
      <div className="flex whitespace-nowrap">
        {getMarqueeItems(items).map((src, index) => (
          <BrandCard key={`${keyPrefix}-${index}`} src={src} onClick={() => setActiveBrand(src.split('/').pop()?.split('.')[0] || '')} />
        ))}
      </div>
    </div>
  );

  return (
    <section id="brands" className="relative pt-20 pb-20 bg-zinc-950 min-h-screen overflow-hidden scroll-mt-20">
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#ff1267]/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-white/5 rounded-full blur-[80px] pointer-events-none" />

      <div className="relative z-10 w-full">
        {!activeBrand ? (
          <>
            <div className="container mx-auto px-4 text-center mb-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
              <div className="flex items-center justify-center gap-4 mb-6">
                <div className="h-[1px] w-8 bg-[#ff1267]"></div>
                <span className="text-[#ff1267] uppercase tracking-[0.3em] text-xs font-semibold">Our Partners</span>
                <div className="h-[1px] w-8 bg-[#ff1267]"></div>
              </div>
              <h2 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight text-white"><span className="text-[#ff1267]">Brands</span> We Worked With</h2>
              <p className="text-zinc-400 max-w-2xl mx-auto text-lg md:text-xl font-light leading-relaxed">We collaborate with industry leaders and emerging businesses to create impactful visual narratives.</p>
            </div>

            <div className="hidden md:flex flex-col gap-6 w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)] pause-on-hover">
              {desktopRows.map((row, index) => renderMarqueeRow(row, index % 2 === 0 ? 'left' : 'right', `desktop-row-${index}`))}
            </div>

            <div className="flex md:hidden flex-col gap-4 w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)] pause-on-hover">
              {mobileRows.map((row, index) => renderMarqueeRow(row, index % 2 === 0 ? 'left' : 'right', `mobile-row-${index}`))}
            </div>
          </>
        ) : (
          <div className="container mx-auto px-4 animate-in fade-in slide-in-from-bottom-8 duration-700 max-w-7xl">
            <div className="flex flex-col items-center text-center gap-6 mb-16">
              <button onClick={() => setActiveBrand(null)} className="group flex items-center gap-2 px-6 py-2 rounded-full text-zinc-400 hover:text-[#ff1267] transition-colors uppercase tracking-[0.2em] text-xs font-medium">
                <ChevronLeft size={16} className="transition-transform duration-300 group-hover:-translate-x-1" />
                Back to Brands
              </button>
              <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-white uppercase">{activeBrand}</h2>
              <div className="h-[2px] w-24 bg-[#ff1267]"></div>
            </div>

            {!brandImages[activeBrand] || brandImages[activeBrand].length === 0 ? (
              <div className="flex items-center justify-center py-32 text-zinc-600 tracking-[0.2em] uppercase text-sm font-light">No visual assets available</div>
            ) : (
              <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6">
                {brandImages[activeBrand].map((media: any, index: number) => (
                  <div key={media.public_id} className="relative cursor-zoom-in overflow-hidden rounded-xl group bg-zinc-900 transition-transform duration-500 mb-6 break-inside-avoid animate-in fade-in zoom-in-95" style={{ animationDelay: `${index * 50}ms` }} onClick={() => openLightbox(index)}>
                    {media.resource_type === 'video' ? <OptimizedVideo src={media.secure_url} /> : <img src={media.secure_url.replace("/upload/", "/upload/q_auto,f_auto,w_600/")} alt={`${activeBrand} photo ${index}`} className="w-full h-auto block transition-transform duration-700 group-hover:scale-105" loading="lazy" />}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-500 flex items-center justify-center">
                      <div className="opacity-0 group-hover:opacity-100 transition-all duration-500 scale-75 group-hover:scale-100"><ZoomIn className="text-white w-8 h-8" strokeWidth={1.5} /></div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {selectedImage !== null && slider && activeBrand && (
        <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-zinc-950/95 backdrop-blur-xl animate-in fade-in duration-300">
          <div className="absolute top-0 left-0 w-full p-6 flex justify-between items-center z-[140]">
            <span className="text-zinc-400 text-xs md:text-sm tracking-[0.3em] uppercase font-medium">{activeBrand} <span className="text-[#ff1267] mx-3">/</span> {selectedImage + 1} OF {brandImages[activeBrand].length}</span>
            <button onClick={closeLightbox} className="text-zinc-400 hover:text-white transition-colors p-2"><X size={28} strokeWidth={1.5} /></button>
          </div>

          <div className="relative flex-1 w-full flex items-center justify-center overflow-hidden py-20 px-4 md:px-24">
            <div className="hidden lg:block absolute left-[-10%] w-[35%] opacity-20 cursor-pointer transition-all hover:opacity-40 duration-500 transform scale-90" onClick={() => navigate('prev')}>
              {slider.prev.resource_type === 'video' ? ( <img src={slider.prev.secure_url.replace(/\.[^/.]+$/, ".jpg").replace("/upload/", "/upload/w_400,q_auto/")} className="w-full h-auto max-h-[50vh] object-contain rounded-xl" alt="prev" /> ) : ( <img src={slider.prev.secure_url.replace("/upload/", "/upload/w_400,q_auto/")} className="w-full h-auto max-h-[50vh] object-contain rounded-xl" alt="prev" /> )}
            </div>

            <div key={selectedImage} className="relative z-10 flex items-center justify-center max-w-full max-h-full animate-in zoom-in-95 duration-300">
              {slider.current.resource_type === 'video' ? ( <video src={slider.current.secure_url.replace("/upload/", "/upload/q_auto,vc_auto/")} poster={slider.current.secure_url.replace(/\.[^/.]+$/, ".jpg").replace("/upload/", "/upload/q_auto,f_auto/")} className="max-w-full max-h-[75vh] md:max-h-[85vh] rounded-xl bg-zinc-900" controls autoPlay muted playsInline /> ) : ( <img src={slider.current.secure_url.replace("/upload/", "/upload/q_auto:best,f_auto/")} className="max-w-full max-h-[75vh] md:max-h-[85vh] w-auto h-auto object-contain rounded-xl" alt="Selected visual" /> )}
            </div>

            <div className="hidden lg:block absolute right-[-10%] w-[35%] opacity-20 cursor-pointer transition-all hover:opacity-40 duration-500 transform scale-90" onClick={() => navigate('next')}>
              {slider.next.resource_type === 'video' ? ( <img src={slider.next.secure_url.replace(/\.[^/.]+$/, ".jpg").replace("/upload/", "/upload/w_400,q_auto/")} className="w-full h-auto max-h-[50vh] object-contain rounded-xl" alt="next" /> ) : ( <img src={slider.next.secure_url.replace("/upload/", "/upload/w_400,q_auto/")} className="w-full h-auto max-h-[50vh] object-contain rounded-xl" alt="next" /> )}
            </div>

            <button onClick={() => navigate('prev')} className="absolute left-4 md:left-8 text-zinc-400 hover:text-white transition-colors z-[140] p-2"><ChevronLeft size={40} strokeWidth={1} /></button>
            <button onClick={() => navigate('next')} className="absolute right-4 md:right-8 text-zinc-400 hover:text-white transition-colors z-[140] p-2"><ChevronRight size={40} strokeWidth={1} /></button>
          </div>
        </div>
      )}
    </section>
  );
}