import Header from './components/header';
import Brands from './components/brands';
import AboutMe from './components/aboutme';
import { fetchMediaFromFolder } from './utils/cloudinary';

export const revalidate = 3600;

export default async function Home() {
  const homeVideos = await fetchMediaFromFolder('Home Page Video', 'video');
  const videoUrl = homeVideos && homeVideos.length > 0 ? homeVideos[0].secure_url : null;

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
        <section id="brands" data-theme="dark">
          <Brands />
        </section>
        <section id="about-me" data-theme="light">
          <AboutMe />
        </section>
      </main>
    </div>
  );
}