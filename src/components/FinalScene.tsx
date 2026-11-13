'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import SunflowerShower from '@/components/SunflowerShower';

interface FinalSceneProps {
  onInViewChange: (inView: boolean) => void;
  onPlayWhatsAppAudio?: () => void;
}

export default function FinalScene({ onInViewChange, onPlayWhatsAppAudio }: FinalSceneProps) {
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  const [stage, setStage] = useState(0);
  const [sunflowerActive, setSunflowerActive] = useState(false);

  useEffect(() => {
    if (inView) {
      onInViewChange(true);
      onPlayWhatsAppAudio?.();
      setSunflowerActive(true);
      setStage(2); // Immediately show the magnificent 3D I LOVE YOU with entrance animation!

      const t3 = setTimeout(() => setStage(3), 1200); // Signature & WhatsApp song badge

      return () => {
        clearTimeout(t3);
      };
    }
  }, [inView, onInViewChange, onPlayWhatsAppAudio]);

  return (
    <div
      ref={ref}
      id="final-scene"
      className="relative min-h-screen flex flex-col justify-center items-center px-4 sm:px-6 bg-gradient-to-b from-deepBlack via-[#1a0812] to-[#0a0307] text-center select-none overflow-hidden py-24 sm:py-32"
    >
      {/* 3D Sunflower Shower Active */}
      <SunflowerShower active={sunflowerActive} />

      {/* Atmospheric lighting glows */}
      <div className="absolute inset-0 bg-radial-gradient from-pink-500/15 via-rose-500/5 to-transparent pointer-events-none z-0 blur-3xl" />
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-rose-500/10 blur-[140px] pointer-events-none rounded-full" />

      {/* Main Closing Container */}
      <div className="relative z-10 max-w-4xl mx-auto space-y-8 sm:space-y-12 w-full">
        
        {/* Stage 1: Soft build-up */}
        <AnimatePresence>
          {stage >= 1 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 0.9, y: 0 }}
              transition={{ duration: 1.5, ease: 'easeOut' }}
              className="space-y-3 px-2"
            >
              <span className="font-playfair text-xs sm:text-sm tracking-[0.35em] uppercase text-rose-300 font-semibold block">
                The Final Confession • Straight From My Heart
              </span>
              <p className="font-cormorant text-2xl sm:text-3xl md:text-4xl text-softIvory/90 italic leading-relaxed">
                &quot;Out of eight billion people in this universe,
                <br className="hidden sm:inline" />
                my heart will forever beat for only one.&quot;
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Stage 2: THE GRAND 3D ANIMATED BIG PINK "I LOVE YOU" */}
        <AnimatePresence>
          {stage >= 2 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.7, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ type: 'spring', damping: 18, stiffness: 120 }}
              className="relative my-6 sm:my-10 flex flex-col items-center justify-center"
            >
              {/* Pulsing neon pink glow ring */}
              <motion.div
                animate={{ scale: [1, 1.25, 1], opacity: [0.35, 0.75, 0.35] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute w-[300px] sm:w-[500px] md:w-[700px] h-[160px] sm:h-[240px] rounded-full bg-gradient-to-r from-pink-500/30 via-rose-500/40 to-pink-500/30 blur-3xl -z-10"
              />

              {/* 3D Big Pink "I LOVE YOU" */}
              <motion.h1
                animate={{
                  scale: [1, 1.03, 1],
                  rotateZ: [0, 0.5, -0.5, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="font-playfair font-black text-6xl sm:text-8xl md:text-9xl lg:text-[10rem] tracking-tight leading-none select-none text-transparent bg-clip-text bg-gradient-to-br from-pink-300 via-rose-400 to-pink-500 drop-shadow-[0_15px_30px_rgba(244,114,182,0.95)] drop-shadow-[0_0_50px_rgba(236,72,153,0.8)] filter"
                style={{
                  textShadow: '0 8px 1px #9d174d, 0 16px 20px rgba(0,0,0,0.8), 0 0 30px rgba(244,114,182,0.8)',
                }}
              >
                I LOVE YOU
              </motion.h1>

              {/* Big Pink Name: DHANSHREE 🕊️ */}
              <motion.h2
                animate={{
                  scale: [1, 1.02, 1],
                }}
                transition={{
                  duration: 2.6,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: 0.4,
                }}
                className="font-playfair font-black text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-rose-200 via-pink-300 to-rose-400 drop-shadow-[0_10px_25px_rgba(244,160,160,0.9)] mt-2 sm:mt-4 flex items-center gap-3 sm:gap-6 justify-center"
                style={{
                  textShadow: '0 6px 1px #831843, 0 12px 18px rgba(0,0,0,0.8), 0 0 25px rgba(244,160,160,0.8)',
                }}
              >
                <span>DHANSHREE</span>
                <span className="text-3xl sm:text-5xl md:text-6xl">🕊️❤️</span>
              </motion.h2>

              <div className="mt-4 sm:mt-6 inline-flex items-center gap-2 glass px-5 py-1.5 rounded-full border border-pink-400/40 bg-pink-500/10 shadow-lg">
                <span className="text-sm">🌻</span>
                <span className="font-playfair text-xs sm:text-sm tracking-[0.25em] uppercase text-pink-200">
                  To My Dove • Today, Tomorrow & For Eternity
                </span>
                <span className="text-sm">🌻</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Stage 3: WhatsApp Audio Player Banner & Signature */}
        <AnimatePresence>
          {stage >= 3 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.8, ease: 'easeOut' }}
              className="space-y-6 pt-4"
            >
              {/* WhatsApp Audio Playing Badge & Click-to-Play Button */}
              <button
                onClick={onPlayWhatsAppAudio}
                className="inline-flex items-center gap-3 glass px-6 py-2.5 rounded-full border-2 border-warmGold/40 hover:border-warmGold bg-black/80 shadow-[0_0_25px_rgba(212,175,55,0.35)] hover:scale-105 transition-all duration-300 cursor-pointer"
                title="Tap to play WhatsApp audio track"
              >
                <span className="text-warmGold text-lg animate-spin" style={{ animationDuration: '4s' }}>
                  🌻
                </span>
                <div className="text-left">
                  <p className="text-[11px] sm:text-xs text-warmGold font-semibold font-playfair tracking-wider flex items-center gap-2">
                    <span>🎵 Playing WhatsApp Audio: Alfaaz (Unki Tareef)</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-warmGold/20 text-warmGold">▶ Replay</span>
                  </p>
                  <p className="text-[10px] text-softIvory/70 italic">
                    &quot;Tu taan taareyan ton vi sona...&quot; (Special Song for Dhanshree)
                  </p>
                </div>
              </button>

              {/* Hindi Poetry */}
              <div className="max-w-xl mx-auto pt-2">
                <p className="font-caveat text-2xl sm:text-3xl md:text-4xl text-rose-300 font-semibold leading-relaxed">
                  &quot;उनकी तारीफ में कहें क्या, लफ्ज़ कम पड़ जाते हैं...
                  <br />
                  तुम मुस्कुरा दो तो सारे जहां के फूल खिल जाते हैं।&quot; 🌻✨
                </p>
              </div>

              {/* Aditya's Signature */}
              <div className="pt-6 sm:pt-10 space-y-3">
                <p className="font-cormorant text-xl sm:text-2xl text-warmGold tracking-[0.15em] italic font-semibold">
                  — Forever and always yours, Aditya ❤️
                </p>
                
                <p className="font-inter text-xs text-softIvory/40 tracking-widest leading-relaxed pt-4">
                  Dedicated with all my love to Dhanshree (My Dove 🕊️).
                  <br />
                  Sunflowers for the girl who brought sunshine into my life 🌻
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
