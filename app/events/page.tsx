import Link from 'next/link';
import Image from 'next/image';
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
        <Link href="/events/headshotsocial" className="flex-1 relative group overflow-hidden border-b md:border-b-0 md:border-r border-white/10 flex items-center justify-center min-h-[45vh] md:min-h-full">
          <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-105">
            <Image 
              src="/events/headshotsocial.jpeg"
              alt="The Headshot Social Background"
              fill
              className="object-cover"
              priority 
            />
          </div>
          <div className="absolute inset-0 bg-black/60 group-hover:bg-black/30 transition-colors duration-500"></div>
          
          <div className="relative z-10 w-[90%] h-[50%] transition-transform duration-500 group-hover:scale-110">
            <Image 
              src="/headers/headshotsociallogo.png"
              alt="The Headshot Social Logo"
              fill
              className="object-contain drop-shadow-[0_0_30px_rgba(0,0,0,0.8)]"
            />
          </div>
        </Link>

        <Link href="/events/createur" className="flex-1 relative group overflow-hidden border-b md:border-b-0 md:border-r border-white/10 flex items-center justify-center min-h-[45vh] md:min-h-full">
          <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-105">
            <Image 
              src="/events/createur.jpeg" 
              alt="Createur Background"
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="absolute inset-0 bg-black/60 group-hover:bg-black/30 transition-colors duration-500"></div>
          
          <div className="relative z-10 w-[90%] h-[50%] transition-transform duration-500 group-hover:scale-110">
            <Image 
              src="/headers/createurlogo.png"
              alt="Createur Logo"
              fill
              className="object-contain drop-shadow-[0_0_30px_rgba(0,0,0,0.8)]"
            />
          </div>
        </Link>

        <Link href="/events/matchaclub" className="flex-1 relative group overflow-hidden flex items-center justify-center min-h-[45vh] md:min-h-full">
          <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-105">
            <Image 
              src="/events/matchacha.jpeg" 
              alt="Matcha Club Background"
              fill
              className="object-cover"
            />
          </div>
          <div className="absolute inset-0 bg-black/60 group-hover:bg-black/30 transition-colors duration-500"></div>
          
          <div className="relative z-10 w-[110%] h-[55%] scale-125 transition-transform duration-500 group-hover:scale-[1.35]">
            <Image 
              src="/headers/matchachalogo.png"
              alt="Matcha Club Logo"
              fill
              className="object-contain drop-shadow-[0_0_40px_rgba(0,0,0,0.9)]"
            />
          </div>
        </Link>
      </main>
    </div>
  );
}