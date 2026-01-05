export default function Header() {
  return (
    <header className="bg-black text-white py-6 flex justify-between items-center px-6">
      <img 
        src="/logo.png" 
        alt="Khushi's Logo" 
        className="h-12 w-auto"
      />
      <nav className="ml-auto">
        <ul className="flex space-x-4 text-lg">
          <li><a href="#home" className="inline-block hover:scale-105 hover:bg-white/20 transition px-4 py-2 rounded">Home</a></li>
          <li><a href="#brands" className="inline-block hover:scale-105 hover:bg-white/20 transition px-4 py-2 rounded">Brands</a></li>
          <li><a href="#about-me" className="inline-block hover:scale-105 hover:bg-white/20 transition px-4 py-2 rounded">About Me</a></li>
          <li><a href="#portfolio" className="inline-block hover:scale-105 hover:bg-white/20 transition px-4 py-2 rounded">Portfolio</a></li>
          <li><a href="#signup" className="inline-block hover:scale-105 hover:bg-white/20 transition px-4 py-2 rounded">Signup</a></li>
        </ul>
      </nav>
    </header>
  );
}