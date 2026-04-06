import Header from './components/header';
import Brands from './components/brands';
import AboutMe from './components/aboutme';
import { fetchMediaFromFolder } from './utils/cloudinary';

export const revalidate = 3600;

const BRAND_LOGOS = [
  "/brandlogos/afronaut.jpg",
  "/brandlogos/ballucci.png",
  "/brandlogos/caa.jpg",
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

export default async function Home() {
  const homeVideos = await fetchMediaFromFolder('Home Page Video', 'video');
  const rawVideoUrl = homeVideos && homeVideos.length > 0 ? homeVideos[0].secure_url : null;
  const videoUrl = rawVideoUrl ? rawVideoUrl.replace("/upload/", "/upload/q_auto:good,w_1920,vc_auto/") : null;
  const posterUrl = rawVideoUrl ? rawVideoUrl.replace(/\.[^/.]+$/, ".jpg").replace("/upload/", "/upload/q_auto:good,w_1920,f_auto/") : undefined;
  const brandNames = BRAND_LOGOS.map(src => src.split('/').pop()?.split('.')[0]).filter(Boolean) as string[];
  const brandPromises = brandNames.map(name => fetchMediaFromFolder(`Brands/${name}`, 'all'));
  const brandResults = await Promise.all(brandPromises);

  const brandImages: Record<string, any[]> = {};
  brandNames.forEach((name, index) => {
    brandImages[name] = brandResults[index] || [];
  });

  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col overflow-x-hidden">
      <Header />
      <section id="home" data-theme="dark" className="w-full h-screen bg-black">
        <video
          src={videoUrl || "/video_placeholder.mp4"}
          poster={posterUrl}
          autoPlay
          loop
          muted
          playsInline
          className={videoUrl ? "w-full h-full object-cover" : "w-full h-full object-contain p-24"}
        />
      </section>
      <main className="grow">
        <section id="brands" data-theme="dark">
          <Brands brandLogos={BRAND_LOGOS} brandImages={brandImages} />
        </section>
        <section id="about-me" data-theme="light">
          <AboutMe />
        </section>
      </main>
    </div>
  );
}