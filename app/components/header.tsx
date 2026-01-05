export default function Header() {
  return (
    <header className="bg-black text-white py-6 flex justify-between items-center px-6">
      <img 
        src="/logo.png" 
        alt="Khushi's Logo" 
        className="h-12 w-auto"
      />
      <nav>
        <ul className="flex space-x-8 text-lg">
          <li><a href="#home" className="hover:underline">Home</a></li>
          <li><a href="#collaborations" className="hover:underline">Collaborations</a></li>
          <li><a href="#about-me" className="hover:underline">About Me</a></li>
          <li><a href="#portfolio" className="hover:underline">Portfolio</a></li>
          <li><a href="#signup" className="hover:underline">Signup</a></li>
        </ul>
      </nav>
    </header>
  );
}