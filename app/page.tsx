import { v2 as cloudinary } from 'cloudinary';
import { CONFIG } from './utils/config';
import Header from './components/header';
import Brands from './components/brands';
import AboutMe from './components/aboutme';

export const revalidate = 3600;

async function fetchHomeVideo() {
  cloudinary.config({
    cloud_name: CONFIG.CLOUDINARY_CLOUD_NAME,
    api_key: CONFIG.CLOUDINARY_API_KEY,
    api_secret: CONFIG.CLOUDINARY_API_SECRET,
  });

  try {
    const result = await cloudinary.search
      .expression('resource_type:video AND folder="Home Page Video"')
      .sort_by('created_at', 'desc')
      .max_results(1)
      .execute();

    if (result.resources && result.resources.length > 0) {
      return result.resources[0].secure_url;
    }
    return null;
  } catch (error) {
    return null;
  }
}

export default async function Home() {
  const videoUrl = await fetchHomeVideo();

  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col">
      <Header />
      <section id="home" data-theme="dark" className="w-full h-screen">
        <video
          src={videoUrl || "/video_placeholder.mp4"}
          autoPlay
          loop
          muted
          playsInline
          className={videoUrl ? "w-full h-full object-cover" : "w-full h-full object-contain p-24"}
        />
      </section>
      <main className="grow">
        <section data-theme="dark">
          <Brands />
        </section>
        <section data-theme="light">
          <AboutMe />
        </section>
      </main>
    </div>
  );
}