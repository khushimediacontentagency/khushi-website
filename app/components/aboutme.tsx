export default function AboutMe() {
  return (
    <section id="about-me" className="py-20 bg-white text-black px-4 md:px-12 flex flex-col md:flex-row items-center justify-between gap-12">
      <div className="md:w-1/2">
        <h2 className="text-4xl md:text-5xl font-bold mb-8 text-left tracking-tight text-black">
          About Me
        </h2>
        <p className="text-xl leading-relaxed font-light text-gray-700">
          Khushi Shah is a creative entrepreneur and multimedia professional serving as the Senior Director of Khushi Media, a creative agency she established in April 2020. Based near London, she manages a team that focuses on photography, videography, and content creation for both commercial businesses and wedding clients.
        </p>
      </div>
      <div className="md:w-1/2">
        <img 
          src="/khushi.jpg" 
          alt="Khushi Shah" 
          className="w-full h-auto rounded-2xl shadow-2xl object-cover"
        />
      </div>
    </section>
  );
}