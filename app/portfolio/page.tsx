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
    console.log(`Rate Limiter: Serving '${folder}' from internal cache.`);
    return imageCache[folder].data;
  }

  if (!CONFIG.CLOUDINARY_API_KEY || !CONFIG.CLOUDINARY_API_SECRET || !CONFIG.CLOUDINARY_CLOUD_NAME) {
    console.error("Missing Cloudinary Credentials");
    return [];
  }

  cloudinary.config({
    cloud_name: CONFIG.CLOUDINARY_CLOUD_NAME,
    api_key: CONFIG.CLOUDINARY_API_KEY,
    api_secret: CONFIG.CLOUDINARY_API_SECRET,
  });

  console.log(`API Request: Fetching '${folder}' from Cloudinary...`);

  try {
    const result = await cloudinary.search
      .expression(`resource_type:image AND folder="${folder}"`)
      .sort_by('created_at', 'desc')
      .max_results(500)
      .execute();

    imageCache[folder] = {
      data: result.resources,
      timestamp: now,
    };

    console.log(`Success: Found ${result.resources.length} images in '${folder}'`);
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
  
  const imageGroups: Record<string, { public_id: string; secure_url: string }[]> = {};

  for (const folder of folders) {
    imageGroups[folder] = await fetchImagesFromFolder(folder);
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <Header />
      <main className="grow container mx-auto px-4 pt-32 pb-12">
        <Portfolio imageGroups={imageGroups} />
      </main>
      <footer className="py-8 text-center text-gray-600 text-sm">
        &copy; {new Date().getFullYear()} KhushiMedia. All rights reserved.
      </footer>
    </div>
  );
}