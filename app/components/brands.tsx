export default function Brands() {
  const brands = Array.from({ length: 10 }, (_, index) => `/square.jpg`);

  return (
    <section id="brands" className="py-8">
      <h2 className="text-4xl font-bold mb-6 text-left">Brands we've worked with</h2>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
        {brands.map((src, index) => (
          <div key={index} className="aspect-square overflow-hidden rounded-lg bg-white shadow-sm">
            <img 
              src={src} 
              alt={`Brand ${index + 1}`} 
              className="w-full h-full object-cover grayscale"
            />
          </div>
        ))}
      </div>
    </section>
  );
}