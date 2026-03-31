import Link from 'next/link';
import Header from '../components/header';

export default function EventsPage() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <Header />
      
      <div className="pt-[100px] pb-8 flex items-center justify-center border-b border-white/10 shrink-0">
        <h1 className="text-sm md:text-base font-light tracking-[0.4em] text-white/80 uppercase text-center px-4">
          Khushi Media <span className="text-[#ff1267] mx-2 font-bold">x</span> Offline Club
        </h1>
      </div>

      <main className="grow flex flex-col md:flex-row">
        <Link href="/events/headshotsocial" className="flex-1 relative group overflow-hidden border-b md:border-b-0 md:border-r border-white/10 flex items-center justify-center min-h-[25vh] md:min-h-full">
          <div className="absolute inset-0 bg-zinc-900 group-hover:scale-105 transition-transform duration-700"></div>
          <div className="absolute inset-0 bg-black/50 group-hover:bg-black/20 transition-colors duration-500"></div>
          <h2 className="relative z-10 text-3xl md:text-4xl lg:text-5xl font-bold tracking-widest uppercase text-white group-hover:text-[#ff1267] transition-colors duration-500 text-center px-4">
            The Headshot Social
          </h2>
        </Link>

        <Link href="/events/creativeentrepreneur" className="flex-1 relative group overflow-hidden border-b md:border-b-0 md:border-r border-white/10 flex items-center justify-center min-h-[25vh] md:min-h-full">
          <div className="absolute inset-0 bg-zinc-950 group-hover:scale-105 transition-transform duration-700"></div>
          <div className="absolute inset-0 bg-black/50 group-hover:bg-black/20 transition-colors duration-500"></div>
          <h2 className="relative z-10 text-3xl md:text-4xl lg:text-5xl font-bold tracking-widest uppercase text-white group-hover:text-[#ff1267] transition-colors duration-500 text-center px-4">
            Creative Entrepreneur
          </h2>
        </Link>

        <Link href="/events/matchaclub" className="flex-1 relative group overflow-hidden flex items-center justify-center min-h-[25vh] md:min-h-full">
          <div className="absolute inset-0 bg-zinc-900 group-hover:scale-105 transition-transform duration-700"></div>
          <div className="absolute inset-0 bg-black/50 group-hover:bg-black/20 transition-colors duration-500"></div>
          <h2 className="relative z-10 text-3xl md:text-4xl lg:text-5xl font-bold tracking-widest uppercase text-white group-hover:text-[#ff1267] transition-colors duration-500 text-center px-4">
            Matcha Club
          </h2>
        </Link>
      </main>
    </div>
  );
}