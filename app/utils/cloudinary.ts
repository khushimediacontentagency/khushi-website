import { v2 as cloudinary } from 'cloudinary';
import { CONFIG } from './config';

const mediaCache: Record<string, { data: any; timestamp: number }> = {};
const CACHE_DURATION = 15 * 60 * 1000;

export async function fetchMediaFromFolder(folder: string, resourceType: 'image' | 'video' = 'image') {
  const cacheKey = `${folder}-${resourceType}`;
  const now = Date.now();
  
  if (mediaCache[cacheKey] && (now - mediaCache[cacheKey].timestamp < CACHE_DURATION)) {
    return mediaCache[cacheKey].data;
  }

  cloudinary.config({
    cloud_name: CONFIG.CLOUDINARY_CLOUD_NAME,
    api_key: CONFIG.CLOUDINARY_API_KEY,
    api_secret: CONFIG.CLOUDINARY_API_SECRET,
  });

  try {
    const result = await cloudinary.search
      .expression(`resource_type:${resourceType} AND folder="${folder}"`)
      .sort_by('created_at', 'desc')
      .max_results(500)
      .execute();

    mediaCache[cacheKey] = { data: result.resources, timestamp: now };
    return result.resources;
  } catch (error) {
    return [];
  }
}