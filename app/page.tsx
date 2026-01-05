import Header from './components/header';
import Brands from './components/brands';
import AboutMe from './components/aboutme';

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-gray-900 flex flex-col">
      <Header />
      <section className="w-full">
        <video
          src="/video_placeholder.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="w-full object-cover"
        />
      </section>
      <main className="grow container mx-auto px-4 py-8">
        <Brands />
        <AboutMe />
      </main>
    </div>
  );
}