'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

const gardenImages = [
  { src: "/images/shree/shree-9.jpeg", caption: "Fairy tales are real. Every time I look at you, Dhanshree, I believe in miracles.", className: "md:col-span-2 h-[380px] sm:h-[480px]", objectPos: "50% 15%" },
  { src: "/images/shree/shree-10.jpeg", caption: "That gentle, dreamy smile of yours that honestly stops time.", className: "md:col-span-1 h-[320px] sm:h-[380px]", objectPos: "50% 18%" },
  { src: "/images/shree/shree-11.jpeg", caption: "Every single glance carries a quiet, effortless elegance.", className: "md:col-span-1 h-[320px] sm:h-[380px]", objectPos: "50% 15%" },
  { src: "/images/shree/shree-12.jpeg", caption: "You don't even know how breathtakingly pretty you are, my Dove 🕊️.", className: "md:col-span-1 h-[320px] sm:h-[380px]", objectPos: "50% 15%" },
  { src: "/images/shree/shree-13.jpeg", caption: "Unki tareef me kahe kya... words will never be enough to describe your beauty.", className: "md:col-span-2 h-[380px] sm:h-[480px]", objectPos: "50% 20%" },
  { src: "/images/shree/shree-14.jpeg", caption: "Quiet grace, pure warmth, and endless charm in every frame.", className: "md:col-span-1 h-[320px] sm:h-[380px]", objectPos: "50% 15%" },
  { src: "/images/shree/shree-15.jpeg", caption: "The sweet light in your eyes that turns any dark day into sunshine.", className: "md:col-span-1 h-[320px] sm:h-[380px]", objectPos: "50% 15%" },
  { src: "/images/shree/shree-16.jpeg", caption: "In every lifetime, Dhanshree, you will always be my favorite miracle ✨.", className: "md:col-span-2 h-[380px] sm:h-[480px]", objectPos: "50% 20%" },
];

export default function MemoryGarden() {
  const [selectedImage, setSelectedImage] = useState<{ src: string; caption: string } | null>(null);

  return (
    <section
      id="memory-garden"
      className="relative py-16 sm:py-24 px-4 sm:px-6 bg-deepBlack overflow-hidden"
    >
      <div className="max-w-6xl mx-auto relative z-10 w-full">

        <div className="text-center mb-12 sm:mb-20">
          <span className="font-playfair text-[10px] tracking-[0.3em] text-warmGold uppercase block mb-2">
            Captured Moments • My Dove 🕊️
          </span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2 }}
            className="font-playfair text-3xl sm:text-5xl md:text-6xl font-bold mb-4 sm:mb-6 gold-gradient tracking-wide"
          >
            Through My Eyes
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.65 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 1.2 }}
            className="font-cormorant text-lg sm:text-xl md:text-2xl text-softIvory/70 italic max-w-2xl mx-auto px-2"
          >
            &quot;This is how I see you, Dhanshree. This is the pure beauty you bring into my world.&quot;
          </motion.p>
          <div className="w-[80px] h-[1px] bg-gradient-to-r from-transparent via-warmGold to-transparent mx-auto mt-4 sm:mt-6"></div>
        </div>

        {/* Responsive Grid with Face Focus & Lightbox trigger */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 items-start">
          {gardenImages.map((img, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-20px" }}
              transition={{ duration: 0.8, delay: idx * 0.05, ease: [0.4, 0, 0.2, 1] }}
              className={`group flex flex-col justify-start relative w-full cursor-pointer ${img.className}`}
              onClick={() => setSelectedImage(img)}
            >
              <div className="relative w-full h-[85%] rounded-xl overflow-hidden border border-warmGold/30 group-hover:border-warmGold/70 transition-all duration-500 shadow-lg group-hover:shadow-[0_0_25px_rgba(212,175,55,0.3)] bg-black/70 p-1">
                {/* Ambient blur */}
                <Image
                  src={img.src}
                  alt={img.caption}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover blur-sm opacity-25 scale-105"
                />
                {/* Full uncropped photo */}
                <Image
                  src={img.src}
                  alt={img.caption}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-contain transition-transform duration-700 ease-out group-hover:scale-105 filter brightness-[0.95] group-hover:brightness-100 p-1"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-deepBlack/50 via-transparent to-transparent pointer-events-none" />
                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 glass px-2.5 py-1 rounded-full text-[11px] text-warmGold border border-warmGold/30">
                  Full Photo 🔍
                </div>
              </div>

              <p className="font-cormorant text-sm sm:text-base text-softIvory/90 italic mt-3 text-center sm:text-left tracking-wide leading-relaxed px-1">
                {img.caption}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Lightbox Modal */}
        <AnimatePresence>
          {selectedImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedImage(null)}
              className="fixed inset-0 z-[120] bg-black/95 backdrop-blur-md flex items-center justify-center p-4 cursor-zoom-out"
            >
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                className="relative max-w-2xl w-full rounded-2xl overflow-hidden border border-warmGold/40 bg-[#0d0d0d] shadow-2xl p-4 flex flex-col items-center"
              >
                <button
                  onClick={() => setSelectedImage(null)}
                  className="absolute top-4 right-4 z-20 text-softIvory/80 hover:text-warmGold glass w-9 h-9 rounded-full flex items-center justify-center"
                >
                  ✕
                </button>
                <div className="relative w-full h-[60vh] sm:h-[70vh] rounded-xl overflow-hidden">
                  <Image
                    src={selectedImage.src}
                    alt={selectedImage.caption}
                    fill
                    sizes="100vw"
                    className="object-contain"
                  />
                </div>
                <p className="font-cormorant text-lg sm:text-xl text-warmGold italic text-center mt-4 px-4">
                  &quot;{selectedImage.caption}&quot;
                </p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="section-divider max-w-xl mx-auto my-12 sm:my-16 opacity-25"></div>
      </div>

      <div className="absolute bottom-1/4 left-1/4 w-[500px] h-[500px] bg-warmGold/[0.015] blur-[150px] pointer-events-none -z-10 rounded-full"></div>
    </section>
  );
}
