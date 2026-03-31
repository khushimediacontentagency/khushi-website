import Header from '../../components/header';
import UgcGallery from '../ugc/gallery';

export const revalidate = 3600;

export default function UGCPage() {
    const UGC_VIDEOS = [
    "https://www.instagram.com/p/DWRJB91iOgf/", 
    "https://www.tiktok.com/@khushi_shah169/video/7622752124182547734",
    "https://www.tiktok.com/@khushi_shah169/video/7622751659839606038",
    "https://www.tiktok.com/@khushi_shah169/video/7621227221822311702",
    "https://www.tiktok.com/@khushi_shah169/video/7620078982762859798",
    "https://www.tiktok.com/@khushi_shah169/video/7615652384634686742",
  ];

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <Header />
      <main className="grow container mx-auto px-4 pt-32 pb-12">
        <UgcGallery 
          videos={UGC_VIDEOS} 
          title="UGC & Content Creation" 
          backLink="/portfolio"
          backLabel="Back to Portfolio"
        />
      </main>
      <footer className="py-8 text-center text-gray-800 text-sm">
        &copy; {new Date().getFullYear()} KhushiMedia. All rights reserved.
      </footer>
    </div>
  );
}