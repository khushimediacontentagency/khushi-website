export default function AboutMe() {
  return (
    <section id="about-me" className="py-8 flex flex-col md:flex-row items-center justify-between gap-8">
      <div className="md:w-1/2">
        <h2 className="text-4xl font-bold mb-6 text-left">About Me</h2>
        <p className="text-xl leading-loose font-light">
          Khushi Shah is a creative entrepreneur and multimedia professional serving as the Senior Director of Khushi Media, a creative agency she established in April 2020. Based near London, she manages a team that focuses on photography, videography, and content creation for both commercial businesses and wedding clients.
        </p>
      </div>
      <div className="md:w-1/2">
        <img 
          src="/khushi.jpg" 
          alt="Khushi Shah" 
          className="w-full h-auto rounded-lg shadow-lg object-cover"
        />
      </div>
    </section>
  );
}