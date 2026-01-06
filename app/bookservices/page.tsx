import Link from 'next/link';
import Header from '../components/header';
import BookServices from '../components/bookservices';
import { FaArrowLeft } from 'react-icons/fa';

export default function BookServicesPage() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <Header />
      <main className="grow container mx-auto px-4 pt-32 pb-12">
        
        <BookServices />
        <div className="mt-16 flex justify-center">
           <Link 
             href="/workwithus" 
             className="inline-flex items-center gap-3 px-8 py-4 
                        rounded-full border border-white/10 bg-white/5 
                        text-white font-semibold text-sm uppercase tracking-[0.2em]
                        backdrop-blur-md transition-all duration-500 
                        hover:border-[#ff1267] hover:bg-[#ff1267]/10 hover:text-[#ff1267]
                        group shadow-lg"
           >
             <FaArrowLeft className="transition-transform duration-300 group-hover:-translate-x-2" /> 
             <span>Back</span>
           </Link>
        </div>

      </main>
      <footer className="py-8"></footer>
    </div>
  );
}