import Link from 'next/link';
import Image from 'next/image';
import Header from '../components/header';

export default function EventsPage() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <Header />
      
      <div className="pt-[100px] pb-8 flex items-center justify-center border-b border-white/10 shrink-0 overflow-hidden w-full">
        <h1 className="text-[10px] sm:text-xs md:text-base font-light tracking-[0.1em] md:tracking-[0.4em] whitespace-nowrap text-white/80 uppercase text-center px-4">
          Khushi Media <span className="text-[#ff1267] mx-1 md:mx-2 font-bold">x</span> Offline Club
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
          
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center w-full px-4">
            <div className="flex flex-col items-center justify-center w-full transition-transform duration-500 group-hover:scale-110">
              <div className="relative w-[60%] max-w-[350px] h-20 sm:h-28 md:w-[80%] md:h-[200px] z-20">
                <Image 
                  src="/headers/headshotsociallogo.png"
                  alt="The Headshot Social Logo"
                  fill
                  className="object-contain drop-shadow-[0_0_15px_rgba(255,255,255,0.3)] group-hover:drop-shadow-[0_0_25px_rgba(0,212,255,0.8)] transition-all duration-500"
                />
              </div>
              <p className="text-gray-200 text-center text-xs md:text-sm lg:text-base font-light tracking-widest drop-shadow-md w-full max-w-[400px] z-30 mt-2 sm:mt-0 md:-mt-6">
                A social networking event for actors and models
              </p>
            </div>
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
          
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center w-full px-4">
            <div className="flex flex-col items-center justify-center w-full transition-transform duration-500 group-hover:scale-110">
              <div className="relative w-[75%] max-w-[350px] h-28 sm:h-36 md:w-[80%] md:h-[200px] z-20">
                <Image 
                  src="/headers/createurlogo.png"
                  alt="Createur Logo"
                  fill
                  className="object-contain drop-shadow-[0_0_15px_rgba(255,255,255,0.3)] group-hover:drop-shadow-[0_0_25px_rgba(0,212,255,0.8)] transition-all duration-500"
                />
              </div>
              <p className="text-gray-200 text-center text-xs md:text-sm lg:text-base font-light tracking-widest drop-shadow-md w-full max-w-[400px] z-30 -mt-6 sm:-mt-10 md:-mt-6">
                An exclusive networking hub for entrepreneurs from creative backgrounds
              </p>
            </div>
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
          
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center w-full px-4">
            <div className="flex flex-col items-center justify-center w-full transition-transform duration-500 group-hover:scale-110 md:group-hover:scale-125">
              <div className="relative w-[60%] max-w-[400px] h-24 sm:h-32 md:w-[75%] md:h-[180px] z-20">
                <Image 
                  src="/headers/matchachalogo.png"
                  alt="Matcha Club Logo"
                  fill
                  className="object-contain drop-shadow-[0_0_15px_rgba(255,255,255,0.3)] group-hover:drop-shadow-[0_0_25px_rgba(0,212,255,0.8)] transition-all duration-500"
                />
              </div>
              <p className="text-gray-200 text-center text-xs md:text-sm lg:text-base font-light tracking-widest drop-shadow-md w-full max-w-[400px] z-30 -mt-6 sm:-mt-8 md:-mt-12">
                A day time rave for real life connection
              </p>
            </div>
          </div>
        </Link>
      </main>
    </div>
  );
}