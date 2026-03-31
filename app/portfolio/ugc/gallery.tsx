'use client';

import React from 'react';
import Link from 'next/link';

interface UgcGalleryProps {
  videos: string[];
  title: string;
  backLink?: string;
  backLabel?: string;
}

const getEmbedUrl = (url: string) => {
  if (url.includes('tiktok.com')) {
    const match = url.match(/video\/(\d+)/);
    if (match && match[1]) {
      return { type: 'tiktok', src: `https://www.tiktok.com/embed/v2/${match[1]}?autoplay=1&mute=1` };
    }
  }
  if (url.includes('instagram.com')) {
    const cleanUrl = url.split('?')[0].replace(/\/$/, '');
    return { type: 'instagram', src: `${cleanUrl}/embed/?autoplay=1` };
  }
  
  return { type: 'raw', src: url };
};

export default function UgcGallery({ videos, title, backLink = "/portfolio", backLabel = "Back to Portfolio" }: UgcGalleryProps) {
  return (
    <div className="w-full">
      <div className="mb-10 flex flex-col md:flex-row items-center justify-between gap-6">
        <h1 className="text-4xl font-bold uppercase tracking-widest text-white">{title}</h1>
        <Link href={backLink} className="px-6 py-2 rounded-full border border-white/10 hover:border-[#ff1267] hover:text-[#ff1267] transition-all text-sm uppercase tracking-widest">
          {backLabel}
        </Link>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
        {videos.map((url, index) => {
          const { type, src } = getEmbedUrl(url);
          
          return (
            <div 
              key={index} 
              className="relative w-full aspect-[9/16] overflow-hidden rounded-2xl bg-white/5 border border-white/10 group hover:border-[#ff1267]/50 hover:shadow-[0_0_30px_rgba(255,18,103,0.15)] transition-all duration-500"
            >
              {type === 'raw' ? (
                <video 
                  src={src} 
                  className="w-full h-full object-cover" 
                  autoPlay
                  loop
                  muted
                  playsInline 
                />
              ) : (
                <iframe 
                  src={src} 
                  className="w-full h-full border-0 pointer-events-none" 
                  allow="autoplay; encrypted-media;" 
                  allowFullScreen
                />
              )}
            </div>
          );
        })}
      </div>

      {videos.length === 0 && (
        <div className="flex items-center justify-center py-20 text-white/40 tracking-[0.2em] uppercase text-sm">
          No content available
        </div>
      )}
    </div>
  );
}