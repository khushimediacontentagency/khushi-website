import Link from 'next/link';
import Header from '../components/header';

export default function PortfolioPage() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <Header />
      <main className="grow flex flex-col pt-[72px]">
        <Link href="/portfolio/photos" className="flex-1 relative group overflow-hidden border-b border-white/10 flex items-center justify-center min-h-[30vh]">
          <div className="absolute inset-0 bg-zinc-900 group-hover:scale-105 transition-transform duration-700"></div>
          <div className="absolute inset-0 bg-black/50 group-hover:bg-black/20 transition-colors duration-500"></div>
          <h2 className="relative z-10 text-5xl md:text-7xl font-bold tracking-widest uppercase text-white group-hover:text-[#ff1267] transition-colors duration-500">Photos</h2>
        </Link>
        <Link href="/portfolio/videos" className="flex-1 relative group overflow-hidden border-b border-white/10 flex items-center justify-center min-h-[30vh]">
          <div className="absolute inset-0 bg-zinc-950 group-hover:scale-105 transition-transform duration-700"></div>
          <div className="absolute inset-0 bg-black/50 group-hover:bg-black/20 transition-colors duration-500"></div>
          <h2 className="relative z-10 text-5xl md:text-7xl font-bold tracking-widest uppercase text-white group-hover:text-[#ff1267] transition-colors duration-500">Videos</h2>
        </Link>
        <Link href="/portfolio/ugc" className="flex-1 relative group overflow-hidden flex items-center justify-center min-h-[30vh]">
          <div className="absolute inset-0 bg-zinc-900 group-hover:scale-105 transition-transform duration-700"></div>
          <div className="absolute inset-0 bg-black/50 group-hover:bg-black/20 transition-colors duration-500"></div>
          <h2 className="relative z-10 text-5xl md:text-7xl font-bold tracking-widest uppercase text-white group-hover:text-[#ff1267] transition-colors duration-500">UGC / Content</h2>
        </Link>
      </main>
    </div>
  );
}