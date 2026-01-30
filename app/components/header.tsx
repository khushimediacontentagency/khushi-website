'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FaInstagram, FaBars, FaTimes } from 'react-icons/fa';
import { SiTiktok } from 'react-icons/si';

export default function Header() {
  const [isLightMode, setIsLightMode] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      const headerHeight = 64; 
      const sections = document.querySelectorAll('section[data-theme]');
      let activeTheme = 'dark';

      sections.forEach((section) => {
        const rect = (section as HTMLElement).getBoundingClientRect();
        if (rect.top <= headerHeight && rect.bottom >= headerHeight) {
          activeTheme = (section as HTMLElement).dataset.theme || 'dark';
        }
      });
      setIsLightMode(activeTheme === 'light');
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMenuOpen]);

  const navLinks = [
    ['Home', '/#home'],
    ['Brands', '/#brands'],
    ['About Me', '/#about-me'],
    ['Portfolio', '/portfolio'],
    ['Work With Us', '/workwithus'],
  ];

  return (
    <>
      <header
        className={`
          fixed top-0 left-0 w-full z-50 flex items-center justify-between
          px-6 md:px-12 py-4 transition-all duration-300
          ${
            isMenuOpen 
              ? 'bg-transparent shadow-none' 
              : isScrolled 
                ? (isLightMode ? 'bg-white/95 backdrop-blur-md shadow-sm' : 'bg-zinc-950/70 backdrop-blur-md shadow-xl') 
                : 'bg-transparent'
          }
          ${isLightMode && !isMenuOpen ? 'text-black' : 'text-white'}
        `}
      >
        <div className="flex items-center space-x-4 z-50">
          <Link href="/" onClick={() => setIsMenuOpen(false)} className="block transition-transform duration-300 hover:scale-105">
            <img
              src="/logos/logo.png"
              alt="Khushi Logo"
              className={`h-10 md:h-14 w-auto transition-all duration-300
                ${isMenuOpen ? 'brightness-0 invert' : (isLightMode ? 'brightness-0' : 'brightness-0 invert')}
              `}
            />
          </Link>
          
          {!isMenuOpen && (
            <div className="hidden sm:flex items-center space-x-4 animate-in fade-in duration-300">
              <a href="https://www.instagram.com/khushimedia/" target="_blank" rel="noopener noreferrer" className="hover:text-[#ff1267] transition-colors">
                <FaInstagram className="text-xl" />
              </a>
              <a href="https://www.tiktok.com/@khusi_shah169" target="_blank" rel="noopener noreferrer" className="hover:text-[#ff1267] transition-colors">
                <SiTiktok className="text-xl" />
              </a>
            </div>
          )}
        </div>

        <nav className={`hidden lg:block z-50 ml-auto ${isMenuOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
          <ul className="flex space-x-6 text-lg uppercase font-(--font-oswald) tracking-widest">
            {navLinks.map(([label, href]) => (
              <li key={label}>
                <a
                  href={href}
                  className={`px-4 py-2 rounded-full transition-all duration-300 ${isLightMode ? 'hover:bg-black/5' : 'hover:bg-white/10'} hover:text-[#ff1267]`}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <button 
          className="lg:hidden z-50 p-2 focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle Menu"
        >
          <div className={`transition-transform duration-300 ${isMenuOpen ? 'rotate-90 text-white' : (isLightMode ? 'text-black' : 'text-white')}`}>
             {isMenuOpen ? <FaTimes size={26} /> : <FaBars size={26} />}
          </div>
        </button>
      </header>

      <div 
        className={`
          fixed inset-0 z-40 lg:hidden flex flex-col justify-center items-center bg-zinc-950
          transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]
          ${isMenuOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-full'}
        `}
      >
        <ul className="space-y-8 text-center relative z-50">
          {navLinks.map(([label, href], i) => (
            <li 
              key={label}
              style={{ transitionDelay: `${i * 100}ms` }}
              className={`transition-all duration-500 transform ${isMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
            >
              <a 
                href={href} 
                onClick={() => setIsMenuOpen(false)}
                className="text-4xl font-bold text-white uppercase font-(--font-oswald) tracking-tighter hover:text-[#ff1267] transition-colors"
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
        
        <div className={`
            absolute bottom-12 flex space-x-8 text-white/50 
            transition-all duration-700 delay-500 
            ${isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
        `}>
          <a href="https://www.instagram.com/khushimedia/" target="_blank" rel="noopener noreferrer" className="text-2xl hover:text-[#ff1267] transition-colors">
            <FaInstagram />
          </a>
          <a href="https://www.tiktok.com/@khusi_shah169" target="_blank" rel="noopener noreferrer" className="text-2xl hover:text-[#ff1267] transition-colors">
            <SiTiktok />
          </a>
        </div>
      </div>
    </>
  );
}