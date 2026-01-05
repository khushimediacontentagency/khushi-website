export default function Portfolio() {
  const images = Array.from({ length: 10 }, (_, index) => `/portfolio.jpg`);

  return (
    <section id="portfolio" className="py-8">
      <h2 className="text-4xl font-bold mb-6 text-left">Portfolio</h2>
      <div className="overflow-x-auto flex flex-row space-x-4 pb-4 snap-x snap-mandatory scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
        {images.map((src, index) => (
          <div key={index} className="shrink-0 w-[calc(25%-1rem)] md:w-[calc(25%-1rem)] aspect-square overflow-hidden rounded-lg bg-white shadow-sm snap-start">
            <img
              src={src}
              alt={`Portfolio ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
    </section>
  );
}