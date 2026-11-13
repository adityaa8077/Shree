'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function NetflixNavbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 70;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-deepBlack/95 backdrop-blur-md shadow-lg py-3' : 'bg-transparent py-4'
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        <div className="flex items-center gap-6 sm:gap-8">
          <button
            onClick={() => scrollToSection('hero')}
            className="font-playfair text-xl sm:text-2xl md:text-3xl font-bold gold-gradient cursor-pointer tracking-wider text-left flex items-center gap-2"
          >
            <span>DHANSHREE</span>
            <span className="text-base sm:text-lg text-rose-300 font-normal">🕊️ (Dove)</span>
          </button>

          <div className="hidden md:flex gap-6 font-inter text-sm">
            <button onClick={() => scrollToSection('hero')} className="text-softIvory/80 hover:text-warmGold transition-colors cursor-pointer">
              Home
            </button>
            <button onClick={() => scrollToSection('quiet-grind')} className="text-softIvory/80 hover:text-warmGold transition-colors cursor-pointer">
              Her Grace
            </button>
            <button onClick={() => scrollToSection('destination-google')} className="text-softIvory/80 hover:text-warmGold transition-colors cursor-pointer">
              Wishes For You
            </button>
            <button onClick={() => scrollToSection('memory-garden')} className="text-softIvory/80 hover:text-warmGold transition-colors cursor-pointer">
              Through My Eyes
            </button>
            <button onClick={() => scrollToSection('story-of-us')} className="text-softIvory/80 hover:text-warmGold transition-colors cursor-pointer">
              Story of Us
            </button>
            <button onClick={() => scrollToSection('open-when')} className="text-softIvory/80 hover:text-warmGold transition-colors cursor-pointer">
              Letters
            </button>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => scrollToSection('open-when')}
            className="text-xs font-inter uppercase tracking-widest text-warmGold border border-warmGold/40 hover:border-warmGold px-3.5 py-1.5 rounded-full cursor-pointer transition-colors bg-warmGold/10"
          >
            My Letters 💌
          </button>
          <span className="text-2xl select-none animate-pulse">🕊️</span>
        </div>
      </div>
    </motion.nav>
  );
}
