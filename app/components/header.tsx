'use client';

import { useState, useEffect } from 'react';
import { FaInstagram } from 'react-icons/fa';
import { SiTiktok } from 'react-icons/si';

export default function Header() {
  const [textColor, setTextColor] = useState('white');
  const [hoverBg, setHoverBg] = useState('hover:bg-white/20');
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const videoHeight = document.querySelector('video')?.offsetHeight || 0;

      setIsScrolled(scrollY > 10);
      
      if (scrollY < videoHeight - 100) {
        setTextColor('white');
        setHoverBg('hover:bg-white/20');
      } else {
        setTextColor('black');
        setHoverBg('hover:bg-black/10');
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`
        flex justify-between items-center pl-12 pr-6 fixed top-0 left-0 w-full z-10 
        py-6 bg-transparent transition-shadow duration-300
        ${isScrolled ? 'shadow-sm' : ''} 
        text-${textColor}
      `}
      style={{ 
        boxShadow: isScrolled ? '0 4px 15px -10px rgba(0,0,0,0.1)' : 'none' 
      }}
    >
      <div className="flex items-center space-x-4">
        <img
          src="/logo.png"
          alt="Khushi's Logo"
          className={`h-12 w-auto ${textColor === 'black' ? 'brightness-0' : ''}`}
        />
        <a href="https://www.instagram.com/khushimedia/" target="_blank" rel="noopener noreferrer" className="inline-block hover:scale-105 hover:text-[#ff1267] transition p-1">
          <FaInstagram className="text-2xl" />
        </a>
        <a href="https://www.tiktok.com/@khusi_shah169" target="_blank" rel="noopener noreferrer" className="inline-block hover:scale-105 hover:text-[#ff1267] transition p-1">
          <SiTiktok className="text-2xl" />
        </a>
      </div>
      <nav className="ml-auto">
        <ul className="flex space-x-1 text-base uppercase font-(--font-oswald)">
          <li><a href="#home" className={`inline-block hover:scale-105 ${hoverBg} hover:text-[#ff1267] transition px-3 py-2 rounded`}>Home</a></li>
          <li><a href="#brands" className={`inline-block hover:scale-105 ${hoverBg} hover:text-[#ff1267] transition px-3 py-2 rounded`}>Brands</a></li>
          <li><a href="#about-me" className={`inline-block hover:scale-105 ${hoverBg} hover:text-[#ff1267] transition px-3 py-2 rounded`}>About Me</a></li>
          <li><a href="#portfolio" className={`inline-block hover:scale-105 ${hoverBg} hover:text-[#ff1267] transition px-3 py-2 rounded`}>Portfolio</a></li>
          <li><a href="#work-with-us" className={`inline-block hover:scale-105 ${hoverBg} hover:text-[#ff1267] transition px-3 py-2 rounded`}>Work With Us</a></li>
        </ul>
      </nav>
    </header>
  );
}