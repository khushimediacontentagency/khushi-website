export default function AboutMe() {
  return (
    <section id="about-me" className="py-32 bg-white text-black overflow-hidden relative">
      <div className="container mx-auto px-4 md:px-12 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-16 lg:gap-24">
          
          <div className="lg:w-1/2 flex flex-col animate-in fade-in slide-in-from-bottom-8 duration-1000">
            <div className="flex items-center gap-4 mb-6">
              <div className="h-[2px] w-12 bg-[#ff1267]"></div>
              <span className="text-[#ff1267] uppercase tracking-[0.3em] text-sm font-semibold">
                Founder & Director
              </span>
            </div>
            
            <h2 className="text-5xl md:text-7xl font-bold mb-8 text-left tracking-tight text-black leading-tight">
              About Me
            </h2>
            
            <div className="space-y-6 mb-12">
              <p className="text-2xl leading-relaxed font-medium text-gray-900">
                A visionary multimedia professional and creative entrepreneur breathing life into visual storytelling.
              </p>
              <p className="text-lg leading-relaxed font-light text-gray-600">
                As the Founder and Senior Director of Khushi Media, I have been cultivating a bespoke creative agency since April 2020. Operating from the heart of London's creative scene, I lead a dynamic team that continually redefines artistic boundaries to bring your vision to life.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-8 border-t border-gray-200">
               {['Event & Wedding Photography', 'UGC & Brand Content', 'Live Shows & Headshots', 'Professional Videography'].map((skill) => (
                 <div key={skill} className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#ff1267]" />
                    <span className="text-xs font-bold tracking-widest uppercase text-gray-900">{skill}</span>
                 </div>
               ))}
            </div>
          </div>

          <div className="lg:w-1/2 relative mt-8 lg:mt-0 w-full max-w-xl mx-auto animate-in fade-in zoom-in-95 duration-1000 delay-200 fill-mode-both group">
            <img 
              src="/khushi.jpg" 
              alt="Khushi Shah" 
              className="w-full h-auto rounded-xl object-cover relative z-10 shadow-2xl transition-transform duration-700 group-hover:-translate-y-2"
            />
          </div>

        </div>
      </div>
    </section>
  );
}