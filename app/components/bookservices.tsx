import Link from 'next/link';

export default function BookServices() {
  const cardStyle = "group relative overflow-hidden rounded-2xl border border-white/10 bg-neutral-900 p-8 transition-all duration-500 hover:border-[#ff1267]/50 hover:shadow-2xl hover:shadow-[#ff1267]/10 md:w-1/2 block"; // added 'block' and removed 'cursor' logic since Link handles it

  return (
    <section id="book-services" className="pb-12">
      <h2 className="text-4xl font-bold mb-12 text-center tracking-tight text-white">Book Our Services</h2>
      <div className="flex flex-col md:flex-row justify-center gap-8 max-w-5xl mx-auto">
        
        <Link href="/forms?tab=service" className={cardStyle}>
          <div className="relative z-10">
            <div className="mb-6 inline-block rounded-lg bg-white/5 p-3 group-hover:bg-[#ff1267]/10 transition-colors">
              <span className="text-sm font-bold uppercase tracking-widest text-[#ff1267]">Commercial</span>
            </div>
            <h3 className="text-3xl font-bold mb-4 text-white">Branding Services</h3>
            <p className="text-gray-400 leading-relaxed mb-8">
              We provide bespoke commercial content designed to elevate your brand presence across social media and marketing campaigns.
            </p>
            <div className="flex items-center text-[#ff1267] font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              Enquire Now <span className="ml-2">→</span>
            </div>
          </div>
        </Link>

        <Link href="/forms?tab=service" className={cardStyle}>
          <div className="relative z-10">
            <div className="mb-6 inline-block rounded-lg bg-white/5 p-3 group-hover:bg-[#ff1267]/10 transition-colors">
              <span className="text-sm font-bold uppercase tracking-widest text-[#ff1267]">Personal</span>
            </div>
            <h3 className="text-3xl font-bold mb-4 text-white">Personal Shoots</h3>
            <p className="text-gray-400 leading-relaxed mb-8">
              Specialising in life’s pivotal moments—from weddings and graduations to maternity sessions. We craft timeless imagery tailored specifically to your personal narrative.
            </p>
            <div className="flex items-center text-[#ff1267] font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              Enquire Now <span className="ml-2">→</span>
            </div>
          </div>
        </Link>

      </div>
    </section>
  );
}