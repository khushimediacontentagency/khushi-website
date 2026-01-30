import Header from './components/header';
import Brands from './components/brands';
import AboutMe from './components/aboutme';

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col">
      <Header />
      <section id="home" data-theme="dark" className="w-full h-screen">
        <video
          src="/video_placeholder.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
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