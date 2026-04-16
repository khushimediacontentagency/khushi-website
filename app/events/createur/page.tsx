import Header from '../../components/header';
import Link from 'next/link';

export default function CreateurPage() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <Header />
      
      <main className="grow flex flex-col items-center justify-center px-4 text-center pt-20">
        <h1 className="text-5xl md:text-7xl font-bold tracking-widest uppercase mb-4">
          Coming Soon
        </h1>
        <p className="text-gray-400 text-lg md:text-xl mb-8 max-w-lg">
          We are working on something exciting for this space. Stay tuned!
        </p>
        
        <Link 
          href="/events" 
          className="px-8 py-3 border border-white/20 rounded-full text-sm font-semibold uppercase tracking-widest hover:bg-white hover:text-black transition-colors"
        >
          Back to Events
        </Link>
      </main>

      <footer className="py-8 text-center text-gray-800 text-sm">
        &copy; {new Date().getFullYear()} KhushiMedia. All rights reserved.
      </footer>
    </div>
  );
}