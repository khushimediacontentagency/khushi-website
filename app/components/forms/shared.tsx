'use client';
import { useState, useEffect, useRef } from 'react';
import { FaChevronDown } from 'react-icons/fa';

export function CustomSelect({ options, label, value, onChange, placeholder, error, icon: Icon }: any) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative w-full" ref={containerRef}>
      {label && <label className="block text-sm font-medium text-gray-400 mb-1 uppercase tracking-wide">{label}</label>}
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className={`relative w-full bg-white/5 border ${error ? 'border-[#ff1267]' : 'border-white/10'} rounded-lg py-3 text-white flex justify-between items-center cursor-pointer hover:border-[#ff1267]/50 transition-all ${Icon ? 'pl-10 pr-4' : 'px-4'}`}
      >
        {Icon && <Icon className="absolute left-3 text-[#ff1267] text-sm" />}
        <span className={!value ? "text-gray-500" : "text-white"}>
          {value || placeholder}
        </span>
        <FaChevronDown className={`text-xs transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </div>

      {isOpen && (
        <div className="absolute z-50 w-full mt-2 bg-[#121212] border border-white/10 rounded-lg shadow-2xl max-h-60 overflow-y-auto animate-in fade-in slide-in-from-top-2 duration-200 custom-scrollbar">
          {options.map((opt: string) => (
            <div 
              key={opt}
              onClick={() => {
                onChange(opt);
                setIsOpen(false);
              }}
              className="px-4 py-3 text-white hover:bg-[#ff1267] hover:text-white cursor-pointer transition-colors border-b border-white/5 last:border-0"
            >
              {opt}
            </div>
          ))}
        </div>
      )}
      {error && <p className="text-[#ff1267] text-xs mt-1">{error.message || "Required"}</p>}
    </div>
  );
}

export const inputStyle = (hasError: boolean, hasIcon: boolean = false) => `w-full bg-white/5 border ${hasError ? 'border-[#ff1267]' : 'border-white/10'} rounded-lg ${hasIcon ? 'pl-10 pr-4' : 'px-4'} py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#ff1267] focus:ring-1 focus:ring-[#ff1267] transition-all`;
export const labelStyle = "block text-sm font-medium text-gray-400 mb-1 uppercase tracking-wide";