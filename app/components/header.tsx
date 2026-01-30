'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FaInstagram } from 'react-icons/fa';
import { SiTiktok } from 'react-icons/si';

export default function Header() {
  const [isLightMode, setIsLightMode] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const headerHeight = 80;
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

  return (
    <header
      className={`
        fixed top-0 left-0 w-full z-50 flex items-center justify-between
        px-12 py-5 transition-all duration-300
        ${isScrolled 
          ? (isLightMode ? 'bg-white/90 backdrop-blur-md shadow-sm' : 'bg-zinc-900/80 backdrop-blur-md shadow-lg') 
          : 'bg-transparent'}
        ${isLightMode ? 'text-black' : 'text-white'}
      `}
    >
      <div className="flex items-center space-x-4">
        <Link href="/" className="transition-transform duration-300 hover:scale-105">
          <img
            src="/logos/logo.png"
            alt="Khushi Logo"
            className={`h-12 w-auto transition duration-300 ${isLightMode ? 'brightness-0' : 'brightness-0 invert'}`}
          />
        </Link>
        <a href="https://www.instagram.com/khushimedia/" target="_blank" rel="noopener noreferrer" className="hover:text-[#ff1267] transition">
          <FaInstagram className="text-2xl" />
        </a>
        <a href="https://www.tiktok.com/@khusi_shah169" target="_blank" rel="noopener noreferrer" className="hover:text-[#ff1267] transition">
          <SiTiktok className="text-2xl" />
        </a>
      </div>

      <nav>
        <ul className="flex space-x-2 text-base uppercase font-(--font-oswald) tracking-wide">
          {[
            ['Home', '/#home'],
            ['Brands', '/#brands'],
            ['About Me', '/#about-me'],
            ['Portfolio', '/portfolio'],
            ['Work With Us', '/workwithus'],
          ].map(([label, href]) => (
            <li key={label}>
              <a
                href={href}
                className={`
                  px-4 py-2 rounded-full transition-all duration-300
                  ${isLightMode ? 'hover:bg-black/10' : 'hover:bg-white/20'}
                  hover:text-[#ff1267]
                `}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}