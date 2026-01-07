export const revalidate = 3600;

import { v2 as cloudinary } from 'cloudinary';
import Header from '../components/header';
import Portfolio from '../components/portfolio';
import { CONFIG } from '../utils/config';

const imageCache: Record<string, { data: any; timestamp: number }> = {};
const CACHE_DURATION = 15 * 60 * 1000;

async function fetchImagesFromFolder(folder: string) {
  const now = Date.now();
  if (imageCache[folder] && (now - imageCache[folder].timestamp < CACHE_DURATION)) {
    return imageCache[folder].data;
  }

  cloudinary.config({
    cloud_name: CONFIG.CLOUDINARY_CLOUD_NAME,
    api_key: CONFIG.CLOUDINARY_API_KEY,
    api_secret: CONFIG.CLOUDINARY_API_SECRET,
  });

  try {
    const result = await cloudinary.search
      .expression(`resource_type:image AND folder="${folder}"`)
      .sort_by('created_at', 'desc')
      .max_results(500)
      .execute();

    imageCache[folder] = { data: result.resources, timestamp: now };
    return result.resources;
  } catch (error) {
    console.error(`Error fetching images from ${folder}:`, error);
    return [];
  }
}

export default async function PortfolioPage() {
  const folders = [
    'Event Photography', 
    'Headshots', 
    'Live shows', 
    'Salon Content', 
    'Wedding Content'
  ];
  
  const imageGroups: Record<string, any[]> = {};

  const results = await Promise.all(folders.map(f => fetchImagesFromFolder(f)));
  folders.forEach((folder, index) => {
    imageGroups[folder] = results[index];
  });

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <Header />
      <main className="grow container mx-auto px-4 pt-32 pb-12">
        <Portfolio imageGroups={imageGroups} />
      </main>
      <footer className="py-8 text-center text-gray-800 text-sm">
        &copy; {new Date().getFullYear()} KhushiMedia. All rights reserved.
      </footer>
    </div>
  );
}