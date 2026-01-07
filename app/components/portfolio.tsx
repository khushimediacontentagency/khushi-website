'use client';
import { CldImage } from 'next-cloudinary';

interface PortfolioProps {
  imageGroups: Record<string, { public_id: string; secure_url: string }[]>;
}

export default function Portfolio({ imageGroups }: PortfolioProps) {
  return (
    <section id="portfolio" className="py-20 bg-black text-white">
      <h1 className="text-5xl font-bold mb-16 text-center tracking-tight text-white">
        Portfolio
      </h1>
      {Object.entries(imageGroups).map(([folder, images]) => (
        <div key={folder} className="mb-16">
          <h2 className="text-4xl font-bold mb-8 text-center tracking-tight text-[#ff1267]">
            {folder}
          </h2>
          {images.length === 0 ? (
            <p className="text-center text-gray-400">No images found in this folder.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto px-4">
              {images.map((image) => (
                <div
                  key={image.public_id}
                  className="group relative overflow-hidden rounded-2xl shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-[#ff1267]/50"
                >
                  <CldImage
                    src={image.public_id}
                    width={600}
                    height={400}
                    alt={`Image from ${folder}`}
                    className="w-full h-auto object-cover"
                    crop="fill"
                    gravity="auto"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </section>
  );
}