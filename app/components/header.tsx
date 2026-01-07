'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { FaInstagram } from 'react-icons/fa';
import { SiTiktok } from 'react-icons/si';

export default function Header() {
  const [textColor, setTextColor] = useState('white');
  const [hoverBg, setHoverBg] = useState('hover:bg-white/20');
  const [isScrolled, setIsScrolled] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 10);

      const headerHeight = headerRef.current?.offsetHeight || 80;
      const sections = document.querySelectorAll('section');
      let newTextColor = 'white';
      let newHoverBg = 'hover:bg-white/20';

      for (const section of Array.from(sections)) {
        const rect = section.getBoundingClientRect();
        if (rect.top <= headerHeight && rect.bottom > headerHeight) {
          const classes = section.className;
          if (classes.includes('bg-white')) {
            newTextColor = 'black';
            newHoverBg = 'hover:bg-black/10';
          }
          break;
        }
      }

      setTextColor(newTextColor);
      setHoverBg(newHoverBg);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      ref={headerRef}
      className={`
        flex justify-between items-center pl-12 pr-6 fixed top-0 left-0 w-full z-50
        py-6 bg-transparent transition-all duration-500
        ${textColor === 'black' ? 'text-black' : 'text-white'}
      `}
      style={{
        boxShadow: isScrolled ? '0 10px 30px -15px rgba(0,0,0,0.05)' : 'none'
      }}
    >
      <div className="flex items-center space-x-4">
        <Link href="/" className="transition-transform duration-300 hover:scale-105">
          <img
            src="/logos/logo.png"
            alt="Khushi's Logo"
            className={`h-12 w-auto transition-all duration-300 ${textColor === 'black' ? 'brightness-0' : 'brightness-0 invert'}`}
          />
        </Link>
        <a href="https://www.instagram.com/khushimedia/" target="_blank" rel="noopener noreferrer" className="inline-block hover:scale-110 hover:text-[#ff1267] transition p-1">
          <FaInstagram className="text-2xl" />
        </a>
        <a href="https://www.tiktok.com/@khusi_shah169" target="_blank" rel="noopener noreferrer" className="inline-block hover:scale-110 hover:text-[#ff1267] transition p-1">
          <SiTiktok className="text-2xl" />
        </a>
      </div>
      <nav className="ml-auto">
        <ul className="flex space-x-1 text-base uppercase font-(--font-oswald) tracking-wide">
          <li><a href="/#home" className={`inline-block transition-all duration-300 ${hoverBg} hover:text-[#ff1267] px-4 py-2 rounded-full`}>Home</a></li>
          <li><a href="/#brands" className={`inline-block transition-all duration-300 ${hoverBg} hover:text-[#ff1267] px-4 py-2 rounded-full`}>Brands</a></li>
          <li><a href="/#about-me" className={`inline-block transition-all duration-300 ${hoverBg} hover:text-[#ff1267] px-4 py-2 rounded-full`}>About Me</a></li>
          <li><a href="/portfolio" className={`inline-block transition-all duration-300 ${hoverBg} hover:text-[#ff1267] px-4 py-2 rounded-full`}>Portfolio</a></li>
          <li><a href="/workwithus" className={`inline-block transition-all duration-300 ${hoverBg} hover:text-[#ff1267] px-4 py-2 rounded-full`}>Work With Us</a></li>
        </ul>
      </nav>
    </header>
  );
}