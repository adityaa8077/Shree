'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

interface HeartbeatConfessionProps {
  isOpen: boolean;
  onClose: () => void;
  onFullLetterChange?: (isFullLetter: boolean) => void;
}

const narrativePhases = [
  {
    phaseId: 'intro',
    lines: [
      "Sometimes I find myself lost in thoughts of you, Dhanshree...",
      "composing a thousand unwritten love letters in my mind.",
    ],
    delay: 3600,
  },
  {
    phaseId: 'emotions',
    lines: [
      "There are so many emotions I have carried in my heart for you — deep, heavy, and beautiful all at once.",
      "Sometimes I wondered if I had the courage to say these words out loud...",
      "or if words could ever capture how much you mean to me.",
      "But tonight, my heart needs to confess everything. 🕊️",
    ],
    delay: 3400,
  },
  {
    phaseId: 'presence',
    lines: [
      "I often sit back and wonder how someone as wonderful as you walked into my life...",
      "and so effortlessly became the most cherished part of it.",
      "You came into my world like a gentle breeze, my sweet Dove. ✨",
    ],
    delay: 3800,
  },
  {
    phaseId: 'admiration',
    lines: [
      "I am in absolute awe of your kindness, your innocence, and your tender heart...",
      "The effortless way you make everything feel safe, warm, and bright.",
      "I don't think you even realize the sheer amount of light you bring into my life just by existing.",
    ],
    delay: 3400,
  },
  {
    phaseId: 'smile',
    lines: [
      "And your smile, Dhanshree… your smile is my favorite miracle in this entire world.",
      "One glimpse of it makes even my hardest days feel instantly peaceful.",
      "Out of all the billions of souls in this universe, falling for you was the easiest, truest thing I have ever done. ✨",
    ],
    delay: 3200,
  },
  {
    phaseId: 'choosing',
    lines: [
      "If I were given a hundred lifetimes and had to choose all over again...",
      "I would choose you, Dhanshree, every single time, without a second thought.",
      "You are not just a part of my life's story — you are the whole poetry of it. ❤️",
    ],
    delay: 3600,
  },
  {
    phaseId: 'confession',
    lines: [
      "I don't just want to admire you from afar, my Dove...",
      "I want to stand beside you, hold your hand through every storm, and celebrate every dream with you.",
      "I love you, Dhanshree. Truly, deeply, and unconditionally. 🕊️💖",
    ],
    delay: 3600,
  }
];

const montageImages = [
  { src: "/images/shree/shree-1.jpeg", caption: "“that genuine, heart-melting smile of Dhanshree…”", objectPos: "50% 15%" },
  { src: "/images/shree/shree-3.jpeg", caption: "“my sweet Dove, with that radiant grace…”", objectPos: "50% 15%" },
  { src: "/images/shree/shree-5.jpeg", caption: "“the warmth that makes every single moment brighter…”", objectPos: "50% 15%" },
  { src: "/images/shree/shree-7.jpeg", caption: "“discovering how pure and innocent your heart is…”", objectPos: "50% 15%" },
  { src: "/images/shree/shree-11.jpeg", caption: "“simply grateful that our paths crossed in this universe…”", objectPos: "50% 15%" },
  { src: "/images/shree/shree-16.jpeg", caption: "“forever loving and cherishing you, my Dove 🕊️✨”", objectPos: "50% 15%" },
];

export default function HeartbeatConfession({ isOpen, onClose, onFullLetterChange }: HeartbeatConfessionProps) {
  const [currentPhase, setCurrentPhase] = useState(-1);
  const [currentLine, setCurrentLine] = useState(-1);
  const [showFullLetterMode, setShowFullLetterMode] = useState(false);
  const [montageIndex, setMontageIndex] = useState(0);
  const [roseShift, setRoseShift] = useState(false);
  const [proposalAnswered, setProposalAnswered] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      onFullLetterChange?.(showFullLetterMode);
    } else {
      onFullLetterChange?.(false);
    }
  }, [isOpen, showFullLetterMode, onFullLetterChange]);

  const [hearts, setHearts] = useState<Array<{ id: number; x: number; delay: number; size: number; duration: number }>>([]);
  const audioCtxRef = useRef<AudioContext | null>(null);

  const playHeartbeatSound = useCallback(() => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      
      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioCtx();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      const now = ctx.currentTime;

      // Lub
      const osc1 = ctx.createOscillator();
      const gain1 = ctx.createGain();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(62, now);
      osc1.frequency.exponentialRampToValueAtTime(32, now + 0.12);
      gain1.gain.setValueAtTime(0.35, now);
      gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
      osc1.connect(gain1);
      gain1.connect(ctx.destination);
      osc1.start(now);
      osc1.stop(now + 0.12);

      // Dub
      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(54, now + 0.16);
      osc2.frequency.exponentialRampToValueAtTime(28, now + 0.28);
      gain2.gain.setValueAtTime(0.28, now + 0.16);
      gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.28);
      osc2.connect(gain2);
      gain2.connect(ctx.destination);
      osc2.start(now + 0.16);
      osc2.stop(now + 0.28);
    } catch {
      // Audio autoplay policy fallback silently
    }
  }, []);

  const spawnHearts = useCallback(() => {
    const list = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 92 + 4,
      delay: Math.random() * 5,
      size: Math.random() * 18 + 12,
      duration: Math.random() * 4 + 6,
    }));
    setHearts(list);
  }, []);

  useEffect(() => {
    if (!isOpen) {
      setCurrentPhase(-1);
      setCurrentLine(-1);
      setShowFullLetterMode(false);
      setMontageIndex(0);
      setRoseShift(false);
      setHearts([]);
      setProposalAnswered(null);
      return;
    }

    const t = setTimeout(() => {
      setCurrentPhase(0);
      setCurrentLine(0);
      playHeartbeatSound();
    }, 1800);

    return () => clearTimeout(t);
  }, [isOpen, playHeartbeatSound]);

  useEffect(() => {
    if (currentPhase < 0 || currentLine < 0 || showFullLetterMode) return;

    const phase = narrativePhases[currentPhase];
    if (!phase) return;

    playHeartbeatSound();

    if (currentLine >= phase.lines.length) {
      const nextPhase = currentPhase + 1;

      if (nextPhase >= narrativePhases.length) {
        const finishTimer = setTimeout(() => {
          setRoseShift(true);
          setShowFullLetterMode(true);
          spawnHearts();
        }, 2200);
        return () => clearTimeout(finishTimer);
      }

      const phaseTimer = setTimeout(() => {
        setCurrentPhase(nextPhase);
        setCurrentLine(0);

        if (nextPhase >= 3) {
          setRoseShift(true);
        }
        if (nextPhase >= 4) {
          spawnHearts();
        }
      }, 1600);

      return () => clearTimeout(phaseTimer);
    }

    const lineDelay = phase.delay;
    const lineTimer = setTimeout(() => {
      setCurrentLine((prev) => prev + 1);
    }, lineDelay);

    return () => clearTimeout(lineTimer);
  }, [currentPhase, currentLine, showFullLetterMode, playHeartbeatSound, spawnHearts]);

  useEffect(() => {
    if (!showFullLetterMode) return;
    const cycle = setInterval(() => {
      setMontageIndex((prev) => (prev + 1) % montageImages.length);
    }, 4500);
    return () => clearInterval(cycle);
  }, [showFullLetterMode]);

  const getRevealedLines = () => {
    const output: Array<{ text: string; id: string; isConfession: boolean }> = [];
    for (let p = 0; p <= currentPhase && p < narrativePhases.length; p++) {
      const limit = p === currentPhase ? currentLine : narrativePhases[p].lines.length;
      for (let l = 0; l < limit && l < narrativePhases[p].lines.length; l++) {
        const str = narrativePhases[p].lines[l];
        output.push({
          text: str,
          id: `${p}-${l}`,
          isConfession: str.includes("I love you, Dhanshree") || str.includes("choose you, Dhanshree"),
        });
      }
    }
    return output;
  };

  const handleProposal = (choice: string) => {
    setProposalAnswered(choice);
    spawnHearts();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1.2 }}
        className="fixed inset-0 z-[200] overflow-y-auto overflow-x-hidden flex flex-col items-center justify-start bg-deepBlack text-softIvory select-none"
        style={{
          background: roseShift
            ? 'radial-gradient(ellipse at center, #29101c 0%, #12060c 50%, #050203 100%)'
            : '#080808',
          transition: 'background 2.5s ease',
        }}
      >
        {/* Ambient Glow */}
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden opacity-25">
          <div className="absolute inset-0 bg-gradient-radial from-roseGold/20 via-transparent to-transparent blur-3xl" />
        </div>

        {/* Floating Heart Particles */}
        {hearts.map((h) => (
          <motion.div
            key={h.id}
            initial={{ y: '105vh', x: `${h.x}vw`, opacity: 0, scale: 0.8 }}
            animate={{
              y: '-15vh',
              opacity: [0, 0.85, 0.85, 0],
              scale: [0.8, 1.2, 0.9],
              rotate: [0, 20, -20, 0],
            }}
            transition={{
              duration: h.duration,
              delay: h.delay,
              repeat: Infinity,
              ease: 'linear',
            }}
            className="fixed z-[201] pointer-events-none select-none text-roseGold drop-shadow-[0_0_10px_rgba(244,160,160,0.8)]"
            style={{ fontSize: `${h.size}px` }}
          >
            ♥
          </motion.div>
        ))}

        {/* Top Heartbeat Pulsing Indicator */}
        <div className="fixed top-4 sm:top-6 left-0 right-0 z-30 flex items-center justify-center gap-2 sm:gap-3 pointer-events-none px-4">
          <motion.div
            animate={{
              scale: [1, 1.5, 1.1, 1.4, 1],
              opacity: [0.4, 1, 0.6, 0.9, 0.4],
            }}
            transition={{
              duration: 1.3,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full bg-gradient-to-r from-roseGold to-blushPink shadow-[0_0_20px_rgba(244,160,160,0.9)]"
          />
          <span className="font-playfair text-[10px] sm:text-[11px] tracking-[0.25em] sm:tracking-[0.3em] uppercase text-blushPink/90 truncate">
            {showFullLetterMode ? "My Love Confession For Dhanshree (Dove)" : "Listening to My Heart's Beat"}
          </span>
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="fixed top-4 right-4 sm:top-6 sm:right-6 z-50 p-2.5 sm:p-3 rounded-full glass border border-roseGold/30 text-softIvory/70 hover:text-blushPink hover:border-roseGold transition-all duration-300 cursor-pointer shadow-lg active:scale-95"
          aria-label="Close"
        >
          <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* PHASE 1: Real-time Cinematic Text Stream */}
        {!showFullLetterMode && (
          <div className="relative z-10 w-full max-w-3xl px-4 sm:px-6 py-24 sm:py-28 flex flex-col items-center justify-center min-h-screen text-center">
            <div className="space-y-6 sm:space-y-8">
              {getRevealedLines().map((item) => (
                <motion.p
                  key={item.id}
                  initial={{ opacity: 0, y: 14, filter: 'blur(4px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  transition={{ duration: 1.1, ease: 'easeOut' }}
                  className={`leading-relaxed transition-colors duration-500 ${
                    item.isConfession
                      ? 'font-playfair text-2xl sm:text-4xl md:text-5xl font-bold text-blushPink tracking-wide py-3 sm:py-4 drop-shadow-[0_0_25px_rgba(244,160,160,0.7)]'
                      : 'font-caveat text-xl sm:text-3xl md:text-4xl text-softIvory/90 font-medium'
                  }`}
                >
                  {item.text}
                </motion.p>
              ))}
            </div>

            {/* Skip prompt */}
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              whileHover={{ opacity: 1 }}
              onClick={() => {
                setRoseShift(true);
                setShowFullLetterMode(true);
                spawnHearts();
              }}
              className="mt-12 sm:mt-16 text-[11px] sm:text-xs font-inter tracking-[0.25em] uppercase text-softIvory/60 hover:text-blushPink cursor-pointer transition-all border border-roseGold/30 px-5 py-2.5 rounded-full glass"
            >
              Read full confession letter →
            </motion.button>
          </div>
        )}

        {/* PHASE 2: Complete Parchment Love Letter with Face-Focused Carousel */}
        {showFullLetterMode && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
            className="relative z-10 w-full max-w-4xl px-3 sm:px-6 py-20 sm:py-24 flex flex-col items-center"
          >
            {/* Header Title */}
            <div className="text-center mb-8 sm:mb-12 space-y-2 sm:space-y-3">
              <span className="font-playfair text-[10px] sm:text-xs tracking-[0.35em] text-blushPink uppercase block">
                From My Soul To Yours • My Dove 🕊️
              </span>
              <h2 className="font-playfair text-3xl sm:text-5xl md:text-6xl font-bold gold-gradient">
                Dearest Dhanshree ✦
              </h2>
              <div className="w-[80px] h-[1px] bg-gradient-to-r from-transparent via-roseGold to-transparent mx-auto mt-3" />
            </div>

            {/* Letter Parchment Container */}
            <div className="w-full bg-gradient-to-b from-[#faf6ed] via-[#f7f0df] to-[#f2e7ce] text-[#33221b] p-5 sm:p-10 md:p-14 rounded-xl border-2 border-[#e5d5b7] shadow-[0_25px_70px_rgba(0,0,0,0.7)] relative overflow-hidden space-y-6 sm:space-y-8">
              
              <div className="absolute top-0 bottom-0 left-3 sm:left-6 md:left-8 w-[1px] bg-[#d8c3a1]/60" />

              {/* Photo Showcase Carousel with Full Photo Focus */}
              <div className="ml-2 sm:ml-6 md:ml-8 mb-6 sm:mb-8">
                <div className="relative w-full h-[320px] sm:h-[420px] md:h-[480px] rounded-xl overflow-hidden border border-[#d8c3a1] shadow-md bg-black/60 p-2">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={montageIndex}
                      initial={{ opacity: 0, scale: 0.97 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 1.02 }}
                      transition={{ duration: 0.8 }}
                      className="relative w-full h-full"
                    >
                      <Image
                        src={montageImages[montageIndex].src}
                        alt="Dhanshree"
                        fill
                        sizes="(max-width: 768px) 100vw, 700px"
                        className="object-cover blur-sm opacity-25 scale-105"
                      />
                      <Image
                        src={montageImages[montageIndex].src}
                        alt="Dhanshree"
                        fill
                        sizes="(max-width: 768px) 100vw, 700px"
                        className="object-contain"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent pointer-events-none" />
                      <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-6 right-3 sm:right-6 text-center">
                        <p className="font-cormorant text-base sm:text-xl md:text-2xl text-softIvory italic drop-shadow-md px-2">
                          {montageImages[montageIndex].caption}
                        </p>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>

              {/* The Love Letter in Beautiful Typography */}
              <div className="space-y-4 sm:space-y-6 font-cormorant text-lg sm:text-xl md:text-2xl leading-relaxed text-[#3d2a21] ml-2 sm:ml-6 md:ml-8">
                <p className="font-playfair text-xl sm:text-2xl md:text-3xl font-bold text-[#6a1b29] italic">
                  To my sweet Dove, Dhanshree,
                </p>

                <p>
                  I often find myself lost in thoughts of you, composing a thousand unsaid words in my mind. There are so many emotions I have carried in my heart lately — heavy and beautiful all at once. Sometimes I wondered if I could ever weave them into the right words, or if I had the courage to say them out loud. But my heart cannot hold this back anymore.
                </p>

                <p>
                  I often sit back and wonder how someone like you walked into my world and so effortlessly became the most precious part of it. You came into my life like a gentle breeze on a suffocating day, Dhanshree. Your presence has this rare, magical way of making everything feel calmer, brighter, and exactly where it belongs.
                </p>

                <p className="font-semibold text-[#8b3a4a] italic border-l-2 border-[#b76e79] pl-3 sm:pl-4 py-0.5">
                  I am in absolute awe of your kindness, your warmth, and the effortless way you make everyone around you feel valued and safe. I don&apos;t think you even realize the sheer amount of light you bring into any room just by existing.
                </p>

                <p>
                  And your smile… Dhanshree, that smile is honestly my favorite miracle in this world. I don&apos;t know how you do it, but one glimpse of it makes even my hardest days feel instantly lighter. I am so profoundly grateful that out of all the billions of paths in this universe, ours crossed, and I was given the privilege of knowing your beautiful soul.
                </p>

                <div className="py-4 my-2 text-center border-y border-[#d8c3a1]/60 space-y-2">
                  <p className="font-playfair text-xl sm:text-2xl md:text-3xl font-bold text-[#8b3a4a] tracking-wide">
                    &quot;If I were given a hundred lifetimes and had to choose all over again...
                    I would choose you, Dhanshree, every single time.&quot; ❤️
                  </p>
                  <p className="font-caveat text-xl sm:text-2xl text-[#6a1b29]">
                    सजदे किए हैं लाखों, दुआओं में मांगा है तुझे... तू ही मेरी मंजिल, तू ही मेरा सुकून।
                  </p>
                </div>

                <p>
                  I may not always say these things every single day, but please know that you mean more to me than language could ever explain. I want to celebrate every happiness of yours, wipe away every worry, and remind you every single day of how extraordinary you are.
                </p>

                <p className="font-medium text-[#6a1b29]">
                  And if you ever have a difficult day, or if you ever feel alone, close your eyes and remember this: somewhere out here is someone who loves you with every beat of his heart. Someone who thanks the stars every single night, just because Dhanshree exists. ✨🕊️
                </p>
              </div>

              {/* Signature Block */}
              <div className="border-t border-[#d8c3a1] pt-6 sm:pt-8 mt-6 sm:mt-10 text-center space-y-2 ml-2 sm:ml-6 md:ml-8">
                <p className="font-cormorant text-base sm:text-lg text-[#6d5547] italic">
                  With all my heart, today and forever,
                </p>
                <p className="font-caveat text-3xl sm:text-4xl md:text-5xl font-bold text-[#8b3a4a]">
                  — Aditya ❤️ (Always Yours, to My Dove)
                </p>
              </div>
            </div>

            {/* Interactive Proposal / Love Declaration Box */}
            <div className="w-full mt-10 sm:mt-14 max-w-2xl mx-auto glass p-6 sm:p-10 rounded-2xl border-2 border-roseGold/60 text-center shadow-[0_15px_50px_rgba(183,110,121,0.35)] relative overflow-hidden bg-gradient-to-b from-[#1f0e16] to-[#0c0508]">
              <span className="text-3xl sm:text-4xl inline-block mb-3 animate-bounce">🕊️💍✨</span>
              
              <h3 className="font-playfair text-2xl sm:text-4xl font-bold text-blushPink mb-3">
                Dhanshree, Will You Be Mine Forever?
              </h3>
              
              <p className="font-cormorant text-base sm:text-xl text-softIvory/90 italic max-w-lg mx-auto mb-6">
                &quot;To love you, to protect your smile, and to walk hand in hand through every season of life.&quot;
              </p>

              {!proposalAnswered ? (
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
                  <motion.button
                    whileHover={{ scale: 1.06 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleProposal("Yes, Forever & Always! 💖")}
                    className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-gradient-to-r from-roseGold to-deepRose text-white font-inter font-semibold tracking-wider text-sm shadow-lg hover:shadow-[0_0_25px_rgba(244,160,160,0.6)] cursor-pointer transition-all"
                  >
                    Yes, Forever & Always! 💖
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.06 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleProposal("A Million Times Yes! 🕊️✨")}
                    className="w-full sm:w-auto px-8 py-3.5 rounded-full border-2 border-warmGold bg-warmGold/20 text-warmGold font-inter font-semibold tracking-wider text-sm shadow-lg hover:bg-warmGold hover:text-deepBlack cursor-pointer transition-all"
                  >
                    A Million Times Yes! 🕊️✨
                  </motion.button>
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-6 rounded-xl border border-warmGold/40 bg-warmGold/10 space-y-3"
                >
                  <p className="font-playfair text-xl sm:text-2xl text-warmGold font-bold">
                    {proposalAnswered}
                  </p>
                  <p className="font-cormorant text-lg sm:text-2xl text-softIvory italic">
                    &quot;You just made Aditya the happiest person in the entire universe! 
                    I promise to cherish your smile, protect your gentle heart, and love you unconditionally, my Dove. ❤️🕊️&quot;
                  </p>
                  <div className="pt-2 text-2xl select-none">
                    🎉 💖 🕊️ 🌸 ✨
                  </div>
                </motion.div>
              )}
            </div>

            {/* Couple / Us Section - "Thanks for existing" */}
            <div className="w-full mt-12 sm:mt-16 space-y-6 sm:space-y-8">
              <div className="text-center">
                <span className="font-playfair text-[11px] sm:text-xs tracking-[0.3em] uppercase text-blushPink/80 block mb-1">
                  Dhanshree & Aditya • Together in Heart
                </span>
                <h3 className="font-playfair text-2xl sm:text-4xl md:text-5xl font-bold gold-gradient mb-2">
                  Thanks for Existing, My Dove ✨
                </h3>
                <p className="font-cormorant text-lg sm:text-2xl text-softIvory/80 italic max-w-xl mx-auto">
                  Out of billions of paths in this universe, having you in mine is my favorite miracle.
                </p>
                <div className="w-[80px] h-[1px] bg-gradient-to-r from-transparent via-roseGold to-transparent mx-auto mt-4" />
              </div>

              <motion.div
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
                className="relative w-full max-w-xl mx-auto h-[480px] sm:h-[620px] md:h-[720px] rounded-2xl overflow-hidden border-2 border-roseGold/60 shadow-[0_25px_60px_rgba(183,110,121,0.4)] group bg-black/70 p-2"
              >
                <Image
                  src="/images/shree/shree-12.jpeg"
                  alt="Dhanshree & Aditya - Backdrop"
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 600px"
                  className="object-cover blur-md opacity-25 scale-105"
                />
                <div className="relative w-full h-full rounded-xl overflow-hidden">
                  <Image
                    src="/images/shree/shree-12.jpeg"
                    alt="Dhanshree & Aditya"
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, 600px"
                    className="object-contain"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-deepBlack/90 via-deepBlack/20 to-transparent pointer-events-none" />
                <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6 text-center space-y-1.5 pointer-events-none">
                  <p className="font-caveat text-3xl sm:text-5xl text-softIvory font-bold drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)]">
                    Us • Hum Dono ❤️
                  </p>
                  <p className="font-cormorant text-base sm:text-xl text-warmGold italic drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
                    &quot;You have quietly, softly, become the most beautiful chapter of my life.&quot;
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Exit Action Button */}
            <div className="mt-8 sm:mt-12 text-center">
              <button
                onClick={onClose}
                className="px-8 sm:px-12 py-3.5 sm:py-4 rounded-full bg-gradient-to-r from-roseGold to-deepRose text-softIvory font-inter font-semibold tracking-widest uppercase text-xs sm:text-sm shadow-xl hover:shadow-[0_0_30px_rgba(183,110,121,0.6)] transition-all duration-300 cursor-pointer active:scale-95"
              >
                Keep This in My Heart ✨🕊️
              </button>
            </div>
          </motion.div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
