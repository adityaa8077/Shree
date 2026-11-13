'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

interface MemoryCard {
  id: number;
  src: string;
  title: string;
  dateTag: string;
  note: string;
  hindiQuote?: string;
}

const allShreeMemories: MemoryCard[] = [
  {
    id: 1,
    src: "/images/shree/shree-1.jpeg",
    title: "That Radiant Glow",
    dateTag: "Always in my heart",
    note: "The first thing I fell for was the genuine innocence in your smile, Dhanshree.",
    hindiQuote: "तू तां तारया तों वी सोहना...",
  },
  {
    id: 2,
    src: "/images/shree/shree-2.jpeg",
    title: "Quiet Elegance",
    dateTag: "Pure Grace",
    note: "You don't need any pretense. Your quiet elegance speaks straight to my heart.",
    hindiQuote: "सादगी में भी जो कयामत है...",
  },
  {
    id: 3,
    src: "/images/shree/shree-3.jpeg",
    title: "My Gentle Dove 🕊️",
    dateTag: "Sweetest Soul",
    note: "Just hearing your voice or seeing you smile makes any heavy day feel soft and peaceful.",
    hindiQuote: "दिलरुबा दिलनशीं, तेरे जैसा कोई नहीं...",
  },
  {
    id: 4,
    src: "/images/shree/shree-4.jpeg",
    title: "Sunlit Laughter",
    dateTag: "Miracle Moments",
    note: "Every time you laugh freely, I whisper a silent thank you to the universe for you.",
    hindiQuote: "सजदे किए हैं लाखों, दुआओं में मांगा है तुझे...",
  },
  {
    id: 5,
    src: "/images/shree/shree-5.jpeg",
    title: "Treasured Forever",
    dateTag: "Unforgettable",
    note: "In a world full of temporary things, you are my forever thought, Dhanshree.",
    hindiQuote: "सितारे गवाह हैं मेरी हर दुआ के...",
  },
  {
    id: 6,
    src: "/images/shree/shree-6.jpeg",
    title: "The Warmest Presence",
    dateTag: "My Safe Haven",
    note: "Being with you feels like home. A place where my heart can finally rest.",
    hindiQuote: "उनकी तारीफ में कहें क्या, लफ्ज़ कम पड़ जाते हैं...",
  },
  {
    id: 7,
    src: "/images/shree/shree-7.jpeg",
    title: "Breathtakingly Pretty",
    dateTag: "True Beauty",
    note: "You don't even realize how mesmerizing you are every single second of the day.",
    hindiQuote: "तेरी आँखों की चमक में पूरी कायनात बसती है...",
  },
  {
    id: 8,
    src: "/images/shree/shree-8.jpeg",
    title: "A Heart of Gold",
    dateTag: "Pure Kindness",
    note: "Your kindness and gentle nature inspire me to be a better person every single day.",
    hindiQuote: "तेरी मासूमियत पे दिल निसार है...",
  },
  {
    id: 9,
    src: "/images/shree/shree-9.jpeg",
    title: "Magic in the Air",
    dateTag: "Fairy Tale",
    note: "Whoever said fairy tales aren't real clearly never met my Dove.",
    hindiQuote: "एक तू ही तो है जो इस दिल को भा गई...",
  },
  {
    id: 10,
    src: "/images/shree/shree-10.jpeg",
    title: "Cherished Gaze",
    dateTag: "Endless Love",
    note: "One look into your eyes and the entire noise of the world just fades away into silence.",
    hindiQuote: "इश्क वो नहीं जो लफ्जों में बयां हो, इश्क वो है जो तुम में नजर आए...",
  },
  {
    id: 11,
    src: "/images/shree/shree-11.jpeg",
    title: "Simply Mesmerizing",
    dateTag: "Every Angle",
    note: "Every picture, every glance, every angle is pure art when it is you, Dhanshree.",
    hindiQuote: "तारीफ उस खुदा की जिसने तुम्हें बनाया...",
  },
  {
    id: 12,
    src: "/images/shree/shree-12.jpeg",
    title: "Our Quiet Bond",
    dateTag: "You & I",
    note: "No matter where distance or life takes us, my heart will always beat your name.",
    hindiQuote: "हम दोनों का रिश्ता रूहानी है...",
  },
  {
    id: 13,
    src: "/images/shree/shree-13.jpeg",
    title: "Innocent & Sweet",
    dateTag: "My Favorite",
    note: "I promise to protect your sweet smile and cherish your gentle heart forever.",
    hindiQuote: "तेरी हर खुशी मेरी दुआ बन गई है...",
  },
  {
    id: 14,
    src: "/images/shree/shree-14.jpeg",
    title: "The Light of My Days",
    dateTag: "Always Shining",
    note: "Even the greyest days turn bright with colors whenever I think of you.",
    hindiQuote: "तुम पास हो तो हर गम से फासला हो जाता है...",
  },
  {
    id: 15,
    src: "/images/shree/shree-15.jpeg",
    title: "Pure Poetry",
    dateTag: "Written in Stars",
    note: "If love were written in stars, every constellation would spell out Dhanshree.",
    hindiQuote: "सजदा करूं या शुक्राना, तू मिला तो रब मिल गया...",
  },
  {
    id: 16,
    src: "/images/shree/shree-16.jpeg",
    title: "My Forever Choice",
    dateTag: "Till Eternity",
    note: "Out of 8 billion souls, in a thousand lifetimes, it will always be you, my Dove 🕊️❤️.",
    hindiQuote: "मेरी हर सांस पे नाम तेरा ही लिखा है...",
  },
];

export default function StoryOfUs() {
  const [activePhoto, setActivePhoto] = useState<MemoryCard | null>(null);
  const [filter, setFilter] = useState<'all' | 'favorites'>('all');

  const displayedMemories = filter === 'favorites' 
    ? allShreeMemories.filter(m => [1, 3, 5, 7, 9, 12, 16].includes(m.id))
    : allShreeMemories;

  return (
    <section
      id="story-of-us"
      className="relative py-20 sm:py-28 px-4 sm:px-6 bg-gradient-to-b from-deepBlack via-[#12080c] to-deepBlack overflow-hidden"
    >
      {/* Ambient background glow */}
      <div className="absolute top-1/3 right-10 w-[500px] h-[500px] bg-rose-500/[0.04] blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[500px] h-[500px] bg-warmGold/[0.03] blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10 w-full">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-roseGold/40 bg-roseGold/10 mb-4">
            <span className="font-playfair text-xs tracking-[0.25em] text-rose-200 uppercase">
              The Story of Us • Hum 🕊️
            </span>
          </div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2 }}
            className="font-playfair text-3xl sm:text-5xl md:text-6xl font-bold mb-4 sm:mb-6 gold-gradient tracking-wide"
          >
            All of You, All for Us
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.8 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 1.2 }}
            className="font-cormorant text-lg sm:text-2xl text-softIvory/85 italic max-w-3xl mx-auto px-2 leading-relaxed"
          >
            &quot;Every frame captures a heartbeat, every picture whispers your name. Here is all of you, Dhanshree — the girl who turned my whole world into love.&quot;
          </motion.p>
          <div className="w-[100px] h-[2px] bg-gradient-to-r from-transparent via-roseGold to-transparent mx-auto mt-6"></div>

          {/* Filter tabs */}
          <div className="flex items-center justify-center gap-3 mt-8">
            <button
              onClick={() => setFilter('all')}
              className={`px-5 py-2 rounded-full text-xs font-inter tracking-widest uppercase transition-all duration-300 ${
                filter === 'all'
                  ? 'bg-warmGold text-deepBlack font-bold shadow-[0_0_15px_rgba(212,175,55,0.4)]'
                  : 'glass text-softIvory/70 hover:text-warmGold border border-warmGold/20'
              }`}
            >
              All 16 Memories ({allShreeMemories.length})
            </button>
            <button
              onClick={() => setFilter('favorites')}
              className={`px-5 py-2 rounded-full text-xs font-inter tracking-widest uppercase transition-all duration-300 ${
                filter === 'favorites'
                  ? 'bg-gradient-to-r from-roseGold to-deepRose text-white font-bold shadow-[0_0_15px_rgba(183,110,121,0.5)]'
                  : 'glass text-softIvory/70 hover:text-rose-200 border border-roseGold/20'
              }`}
            >
              Heart Highlights ❤️
            </button>
          </div>
        </div>

        {/* Polaroid Memory Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-7">
          {displayedMemories.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10px" }}
              transition={{ duration: 0.6, delay: (idx % 4) * 0.1 }}
              whileHover={{ y: -8, rotate: idx % 2 === 0 ? 1 : -1, transition: { duration: 0.3 } }}
              onClick={() => setActivePhoto(item)}
              className="group cursor-pointer rounded-xl bg-gradient-to-b from-[#1c1819] to-[#120e10] p-3.5 border border-warmGold/20 hover:border-roseGold/60 shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              {/* Photo Container showing Full Photo */}
              <div className="relative w-full aspect-[3/4] rounded-lg overflow-hidden bg-black/80 shadow-inner p-1">
                <Image
                  src={item.src}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  className="object-cover blur-sm opacity-25 scale-105"
                />
                <Image
                  src={item.src}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  className="object-contain transition-transform duration-700 ease-out group-hover:scale-105 filter brightness-[0.96] group-hover:brightness-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-deepBlack/70 via-transparent to-transparent pointer-events-none" />

                <span className="absolute top-2.5 left-2.5 glass px-2.5 py-0.5 rounded-full text-[10px] text-warmGold font-inter tracking-wider border border-warmGold/30">
                  #{item.id}
                </span>

                <span className="absolute bottom-2.5 right-2.5 text-xs select-none">
                  🕊️
                </span>
              </div>

              {/* Card Footer / Caption */}
              <div className="pt-3 pb-1 px-1">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <h3 className="font-playfair text-base font-bold text-softIvory group-hover:text-rose-200 transition-colors line-clamp-1">
                    {item.title}
                  </h3>
                  <span className="text-[10px] font-inter text-warmGold/70 italic shrink-0">
                    {item.dateTag}
                  </span>
                </div>

                <p className="font-cormorant text-xs sm:text-sm text-softIvory/75 italic line-clamp-2 leading-tight">
                  &quot;{item.note}&quot;
                </p>

                {item.hindiQuote && (
                  <p className="font-caveat text-sm text-rose-300/90 pt-1 line-clamp-1">
                    {item.hindiQuote}
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Romantic Bottom Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="mt-16 sm:mt-20 glass rounded-2xl p-8 sm:p-12 border border-roseGold/30 text-center max-w-4xl mx-auto shadow-2xl bg-gradient-to-r from-roseGold/10 via-transparent to-warmGold/10"
        >
          <span className="text-3xl mb-3 inline-block">🕊️ ✨ 💖</span>
          <h3 className="font-playfair text-2xl sm:text-4xl font-bold gold-gradient mb-3">
            To Dhanshree: You Are My One & Only
          </h3>
          <p className="font-cormorant text-lg sm:text-2xl text-softIvory/90 italic leading-relaxed max-w-2xl mx-auto">
            &quot;Har tasveer mein tera chehra, har saans mein tera zikr. 
            Mere dil ki har lakeer bas tumse judti hai, meri pyari Dove.&quot;
          </p>
          <div className="mt-6 flex justify-center">
            <span className="font-playfair text-xs tracking-[0.3em] uppercase text-warmGold border-y border-warmGold/20 py-2 px-6">
              With Endless Love • Aditya
            </span>
          </div>
        </motion.div>

        {/* Detailed Modal Lightbox */}
        <AnimatePresence>
          {activePhoto && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActivePhoto(null)}
              className="fixed inset-0 z-[130] bg-black/95 backdrop-blur-md flex items-center justify-center p-4 cursor-zoom-out"
            >
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                className="relative max-w-xl w-full rounded-2xl overflow-hidden border border-roseGold/50 bg-[#120d10] shadow-[0_20px_60px_rgba(183,110,121,0.3)] p-5 flex flex-col items-center cursor-default"
              >
                <button
                  onClick={() => setActivePhoto(null)}
                  className="absolute top-4 right-4 z-20 text-softIvory/80 hover:text-rose-200 glass w-9 h-9 rounded-full flex items-center justify-center cursor-pointer"
                  aria-label="Close"
                >
                  ✕
                </button>

                <div className="relative w-full h-[55vh] sm:h-[62vh] rounded-xl overflow-hidden shadow-2xl bg-black">
                  <Image
                    src={activePhoto.src}
                    alt={activePhoto.title}
                    fill
                    sizes="100vw"
                    className="object-contain"
                  />
                </div>

                <div className="text-center mt-5 space-y-2 px-2">
                  <div className="inline-flex items-center gap-2">
                    <span className="text-xs uppercase tracking-[0.25em] text-rose-300 font-inter">
                      {activePhoto.dateTag}
                    </span>
                    <span className="text-warmGold">✦</span>
                    <span className="text-xs uppercase tracking-[0.25em] text-warmGold font-inter">
                      My Dove
                    </span>
                  </div>

                  <h4 className="font-playfair text-2xl sm:text-3xl font-bold text-softIvory">
                    {activePhoto.title}
                  </h4>

                  <p className="font-cormorant text-lg sm:text-xl text-softIvory/90 italic leading-relaxed">
                    &quot;{activePhoto.note}&quot;
                  </p>

                  {activePhoto.hindiQuote && (
                    <p className="font-caveat text-xl sm:text-2xl text-rose-300 pt-1 font-semibold">
                      {activePhoto.hindiQuote}
                    </p>
                  )}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="section-divider max-w-xl mx-auto my-16 opacity-25"></div>
      </div>
    </section>
  );
}

