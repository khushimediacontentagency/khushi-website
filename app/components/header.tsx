'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FaInstagram } from 'react-icons/fa';
import { SiTiktok } from 'react-icons/si';

export default function Header() {
  const [textColor, setTextColor] = useState('white');
  const [hoverBg, setHoverBg] = useState('hover:bg-white/10');
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const videoElement = document.querySelector('video');
      
      setIsScrolled(scrollY > 10);

      if (videoElement) {
        const videoHeight = videoElement.offsetHeight;
        if (scrollY < videoHeight - 100) {
          setTextColor('white');
          setHoverBg('hover:bg-white/10');
        } else {
          setTextColor('black');
          setHoverBg('hover:bg-black/5');
        }
      } else {
        setTextColor('white');
        setHoverBg('hover:bg-white/10');
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
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
            src="/logo.png"
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
          <li><a href="/#portfolio" className={`inline-block transition-all duration-300 ${hoverBg} hover:text-[#ff1267] px-4 py-2 rounded-full`}>Portfolio</a></li>
          <li><a href="/workwithus" className={`inline-block transition-all duration-300 ${hoverBg} hover:text-[#ff1267] px-4 py-2 rounded-full`}>Work With Us</a></li>
        </ul>
      </nav>
    </header>
  );
}