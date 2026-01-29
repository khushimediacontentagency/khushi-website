import Header from './components/header';
import Brands from './components/brands';
import AboutMe from './components/aboutme';

export default function Home() {
  return (
    <div className="min-h-screen bg-black white flex flex-col">
      <Header />
      <section id="home" className="w-full">
        <video
          src="/video_placeholder.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="w-full object-cover"
        />
      </section>
      <main className="grow">
        <Brands />
        <AboutMe /> 
      </main>
    </div>
  );
}