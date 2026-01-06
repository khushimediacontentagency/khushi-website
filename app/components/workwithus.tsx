import Link from 'next/link';

export default function WorkWithUs() {
  const cardStyle = "group relative overflow-hidden rounded-2xl border border-white/10 bg-neutral-900 p-10 transition-all duration-500 hover:border-[#ff1267]/50 hover:shadow-2xl hover:shadow-[#ff1267]/10 md:w-1/2 flex flex-col justify-between";

  return (
    <section id="work-with-us" className="py-12">
      <h2 className="text-4xl font-bold mb-12 text-center tracking-tight text-white">Work With Us</h2>
      <div className="flex flex-col md:flex-row justify-center gap-10 max-w-6xl mx-auto px-4">
        
        <Link href="/bookservices" className={cardStyle}>
          <div>
            <h3 className="text-3xl font-bold mb-6 text-white group-hover:text-[#ff1267] transition-colors">Book Our Services</h3>
            <p className="text-lg text-gray-400 leading-relaxed">
              From commercial campaigns to personal portfolios, our team delivers expert photography and content creation to realise your vision.
            </p>
          </div>
          <div className="mt-10 font-bold text-sm uppercase tracking-widest border-b-2 border-[#ff1267] w-fit pb-1 text-white">
            View Packages
          </div>
        </Link>

        <Link href="/forms?tab=creator" className={cardStyle}>
          <div>
            <h3 className="text-3xl font-bold mb-6 text-white group-hover:text-[#ff1267] transition-colors">Become a Creator</h3>
            <p className="text-lg text-gray-400 leading-relaxed">
              Are you a photographer, influencer, or content creator? Join our dynamic network to collaborate on innovative projects and advance your creative career.
            </p>
          </div>
          <div className="mt-10 font-bold text-sm uppercase tracking-widest border-b-2 border-white w-fit pb-1 group-hover:border-[#ff1267] transition-colors text-white">
            Apply Today
          </div>
        </Link>

      </div>
    </section>
  );
}