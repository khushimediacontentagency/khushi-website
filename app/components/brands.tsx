'use client';
import { useState, useEffect } from 'react';

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
      } catch (e) {
        console.warn("Could not extract color", e);
      }
    };
  }, [imageSrc]);

  return color;
};

const BrandCard = ({ src, index }: { src: string; index: number }) => {
  const bgColor = useCardBackgroundColor(src);
  return (
    <div 
      className="group relative overflow-hidden rounded-xl transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:z-10"
      style={{ backgroundColor: bgColor }}
    >
      <div className="relative aspect-square flex items-center justify-center p-4">
        <img
          src={src}
          alt={`Brand Partner ${index + 1}`}
          className="w-full h-full object-contain transition-all duration-500 group-hover:scale-110 drop-shadow-lg"
          crossOrigin="anonymous"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 pointer-events-none" />
      </div>
    </div>
  );
};

export default function Brands() {
  const brands = [
    "/brandlogos/afronaut.jpg",
    "/brandlogos/ballucci.png",
    "/brandlogos/caa.webp",
    "/brandlogos/desifriction.jpg",
    "/brandlogos/gk.png",
    "/brandlogos/indianfusion.png",
    "/brandlogos/sabinerooftopbar.png",
    "/brandlogos/tathaastu.jpg",
    "/brandlogos/thecoffeegen.jpg",
    "/brandlogos/reviveroom.jpg",
    "/brandlogos/royallancaster.jpg",
    "/brandlogos/whitehorse.jpg",
  ];

  return (
    <section id="brands" className="relative py-24 bg-zinc-950 overflow-hidden">
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#ff1267]/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-white/5 rounded-full blur-[80px] pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight text-white">
            Brands We <span className="text-[#ff1267]">Worked With</span>
          </h2>
          <p className="text-zinc-400 max-w-2xl mx-auto text-lg leading-relaxed">
            We collaborate with industry leaders and emerging businesses to create impactful visual narratives.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 max-w-6xl mx-auto">
          {brands.map((src, index) => (
            <BrandCard key={index} src={src} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}