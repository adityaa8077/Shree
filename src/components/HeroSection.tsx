'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function HeroSection() {
  const [currentLine, setCurrentLine] = useState(0);
  const { scrollY } = useScroll();
  const yBg = useTransform(scrollY, [0, 800], [0, 120]);

  const lines = [
    "Some people walk into your life quietly...",
    "And make your entire world turn into poetry.",
  ];

  useEffect(() => {
    if (currentLine < lines.length - 1) {
      const timer = setTimeout(() => {
        setCurrentLine(currentLine + 1);
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [currentLine, lines.length]);

  const scrollToContent = () => {
    const element = document.getElementById('today-reminder') || document.getElementById('quiet-grind');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="relative min-h-[92vh] sm:min-h-screen flex items-center justify-center overflow-hidden pt-28 pb-16 px-4">
      {/* Background Hero Photo (Replaces Video) */}
      <motion.div
        style={{ y: yBg }}
        className="absolute inset-0 z-0 h-[120%] w-full overflow-hidden"
      >
        <Image
          src="/images/shree/shree-1.jpeg"
          alt="Dhanshree - Background"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-25 filter blur-sm brightness-[0.7] scale-105"
        />

        {/* Soft Vignettes for atmospheric romantic focus */}
        <div className="absolute inset-0 bg-gradient-to-b from-deepBlack/80 via-deepBlack/50 to-deepBlack pointer-events-none" />
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-deepBlack/30 to-deepBlack/80 pointer-events-none" />
      </motion.div>

      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto w-full flex flex-col items-center">
        {/* Opening poetic lines */}
        <div className="mb-6 sm:mb-8 min-h-[60px] sm:min-h-[80px]">
          {lines.map((line, index) => (
            <motion.p
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{
                opacity: currentLine >= index ? 1 : 0,
                y: currentLine >= index ? 0 : 20,
              }}
              transition={{ duration: 1.2, ease: 'easeOut' }}
              className="font-cormorant text-xl sm:text-3xl md:text-4xl text-softIvory/90 mb-2 italic"
            >
              {line}
            </motion.p>
          ))}
        </div>

        {/* Main Hero Card featuring Full Photo of Dhanshree */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: currentLine >= lines.length - 1 ? 1 : 0, scale: 1 }}
          transition={{ delay: 0.5, duration: 1.2 }}
          className="w-full flex flex-col items-center"
        >
          {/* Featured Full Photo of Shree */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="relative mb-6 sm:mb-8 group"
          >
            <div className="relative w-48 h-64 sm:w-60 sm:h-80 md:w-72 md:h-96 rounded-2xl overflow-hidden border-2 border-warmGold/40 shadow-[0_15px_40px_rgba(212,175,55,0.3)] bg-black/60 p-1.5 transition-all duration-500 group-hover:border-roseGold group-hover:shadow-[0_20px_50px_rgba(183,110,121,0.5)]">
              <div className="relative w-full h-full rounded-xl overflow-hidden bg-black/40">
                <Image
                  src="/images/shree/shree-1.jpeg"
                  alt="Dhanshree - My Dove"
                  fill
                  priority
                  sizes="(max-width: 768px) 250px, 320px"
                  className="object-contain filter brightness-[0.98] group-hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>
            
            {/* Floating Badge */}
            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 glass px-3.5 py-1 rounded-full border border-warmGold/40 shadow-lg flex items-center gap-1.5 whitespace-nowrap">
              <span className="text-xs">🕊️</span>
              <span className="font-playfair text-[11px] sm:text-xs text-warmGold tracking-widest uppercase">
                My Beautiful Dove
              </span>
            </div>
          </motion.div>

          <h1 className="font-playfair text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-3 sm:mb-5 leading-tight">
            <span className="block gold-gradient">Dhanshree ✦</span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 1 }}
            className="font-playfair text-lg sm:text-2xl md:text-3xl text-softIvory mb-3 sm:mb-5 tracking-wide px-2"
          >
            &quot;In a world of eight billion souls, my heart quietly chose you.&quot;
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.9, duration: 1 }}
            className="font-cormorant text-base sm:text-xl md:text-2xl text-warmGold/90 mb-8 sm:mb-10 italic tracking-wide px-2"
          >
            For my Dove, whose smile turns ordinary moments into magic ✨
          </motion.p>

          {/* CTA Button */}
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.3, duration: 1 }}
            onClick={scrollToContent}
            className="group relative px-8 sm:px-12 py-3.5 sm:py-4 font-inter text-base sm:text-lg font-semibold text-deepBlack bg-warmGold hover:bg-amberHighlight transition-all duration-300 overflow-hidden rounded-full cursor-pointer shadow-lg active:scale-95"
          >
            <span className="relative z-10 font-bold tracking-wide flex items-center gap-2 justify-center">
              <span>Read My Heart</span>
              <span>💌</span>
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-amberHighlight to-warmGold transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
          </motion.button>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.8, duration: 1 }}
            className="mt-8 sm:mt-12"
          >
            <div className="w-[1px] h-10 sm:h-14 bg-gradient-to-b from-warmGold to-transparent mx-auto animate-pulse"></div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
