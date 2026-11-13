'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export type TrackName = 'sitare' | 'khat' | 'sajde' | 'alfaaz' | 'dilruba' | 'arz-kiya-hai';

export interface TrackInfo {
  id: TrackName;
  title: string;
  artist: string;
  file: string;
  badge?: string;
}

export const playlist: TrackInfo[] = [
  {
    id: 'sitare',
    title: 'Sitaare',
    artist: 'From Ikkis',
    file: '/audio/sitare.mp3',
    badge: 'Opening Melody',
  },
  {
    id: 'khat',
    title: 'Khat',
    artist: 'Romantic Khat',
    file: '/audio/khat.mp3',
    badge: 'Love Letter',
  },
  {
    id: 'alfaaz',
    title: 'Alfaaz (Unki Tareef)',
    artist: 'Hamza Malik & Zain Zohaib',
    file: '/audio/alfaaz.mp3',
    badge: 'Special For Dove',
  },
  {
    id: 'dilruba',
    title: 'Dilruba Dilnasheen',
    artist: 'Rito Riba',
    file: '/audio/dilruba.mp3',
    badge: 'Special For Dove',
  },
  {
    id: 'sajde',
    title: 'Sajde',
    artist: 'Khatta Meetha',
    file: '/audio/sajde.mp3',
    badge: 'Devotion',
  },
  {
    id: 'arz-kiya-hai',
    title: 'Arz Kiya Hai',
    artist: 'Koshal World',
    file: '/audio/arz-kiya-hai.mp3',
    badge: 'Heartbeat Confession',
  },
];

interface BackgroundMusicProps {
  playMusic: boolean;
  currentTrack: TrackName;
  onTrackChange?: (track: TrackName) => void;
}

export default function BackgroundMusic({ playMusic, currentTrack, onTrackChange }: BackgroundMusicProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [userMuted, setUserMuted] = useState(false);
  const [activeTrackId, setActiveTrackId] = useState<TrackName>(currentTrack);
  const [manualOverride, setManualOverride] = useState(false);
  const [isPlaylistOpen, setIsPlaylistOpen] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  // Sync external track changes unless manually chosen
  useEffect(() => {
    if (!manualOverride && currentTrack !== activeTrackId) {
      setActiveTrackId(currentTrack);
    }
  }, [currentTrack, manualOverride, activeTrackId]);

  // Check prefers-reduced-motion
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);
    const listener = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mediaQuery.addEventListener('change', listener);
    return () => mediaQuery.removeEventListener('change', listener);
  }, []);

  const activeTrackObj = playlist.find(t => t.id === activeTrackId) || playlist[0];

  // Play a specific track
  const playTrack = useCallback((trackId: TrackName) => {
    setActiveTrackId(trackId);
    onTrackChange?.(trackId);

    const audio = audioRef.current;
    if (!audio) return;

    const targetObj = playlist.find(t => t.id === trackId) || playlist[0];
    audio.src = targetObj.file;
    audio.currentTime = 0;
    audio.volume = 1.0;
    audio.load();

    audio.play()
      .then(() => {
        setIsPlaying(true);
        setUserMuted(false);
      })
      .catch((err) => {
        console.warn('Playback deferred:', err);
      });
  }, [onTrackChange]);

  // Handle playMusic trigger from welcome screen
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (!playMusic || userMuted) {
      if (isPlaying) {
        audio.pause();
        setIsPlaying(false);
      }
      return;
    }

    audio.volume = 1.0;
    if (!audio.src || !audio.src.includes(activeTrackObj.file)) {
      audio.src = activeTrackObj.file;
      audio.load();
    }

    if (audio.paused && !userMuted) {
      audio.play()
        .then(() => setIsPlaying(true))
        .catch((err) => console.warn('Autoplay wait:', err));
    }
  }, [playMusic, userMuted, activeTrackObj.file, isPlaying]);

  // Handle first user interaction fallback
  useEffect(() => {
    if (!playMusic || isPlaying || userMuted) return;

    const handleInteraction = () => {
      const audio = audioRef.current;
      if (audio && audio.paused && !userMuted) {
        audio.volume = 1.0;
        audio.play()
          .then(() => {
            setIsPlaying(true);
            removeListeners();
          })
          .catch((err) => console.warn('User interaction play failed:', err));
      }
    };

    const removeListeners = () => {
      window.removeEventListener('click', handleInteraction);
      window.removeEventListener('touchstart', handleInteraction);
      window.removeEventListener('keydown', handleInteraction);
    };

    window.addEventListener('click', handleInteraction);
    window.addEventListener('touchstart', handleInteraction);
    window.addEventListener('keydown', handleInteraction);

    return () => removeListeners();
  }, [playMusic, isPlaying, userMuted]);

  // Handle track ending -> play next in playlist
  const handleTrackEnded = () => {
    const currentIndex = playlist.findIndex(t => t.id === activeTrackId);
    const nextIndex = (currentIndex + 1) % playlist.length;
    playTrack(playlist[nextIndex].id);
  };

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
      setUserMuted(true);
    } else {
      setUserMuted(false);
      audio.volume = 1.0;
      if (!audio.src || !audio.src.includes(activeTrackObj.file)) {
        audio.src = activeTrackObj.file;
      }
      audio.play()
        .then(() => setIsPlaying(true))
        .catch((err) => console.error('Failed to toggle play audio:', err));
    }
  };

  const skipNext = () => {
    setManualOverride(true);
    const currentIndex = playlist.findIndex(t => t.id === activeTrackId);
    const nextIndex = (currentIndex + 1) % playlist.length;
    playTrack(playlist[nextIndex].id);
  };

  const skipPrev = () => {
    setManualOverride(true);
    const currentIndex = playlist.findIndex(t => t.id === activeTrackId);
    const prevIndex = (currentIndex - 1 + playlist.length) % playlist.length;
    playTrack(playlist[prevIndex].id);
  };

  const selectTrack = (trackId: TrackName) => {
    setManualOverride(true);
    playTrack(trackId);
    setIsPlaylistOpen(false);
  };

  return (
    <>
      <audio
        ref={audioRef}
        preload="auto"
        src={activeTrackObj.file}
        onEnded={handleTrackEnded}
      />

      {/* Floating Music Widget */}
      <div
        className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-50 flex flex-col items-end"
      >
        {/* Playlist Drawer Modal / Popover */}
        <AnimatePresence>
          {isPlaylistOpen && (
            <motion.div
              initial={{ opacity: 0, y: 15, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 15, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="mb-3 w-80 sm:w-96 glass rounded-2xl border border-warmGold/40 bg-deepBlack/95 shadow-2xl p-4 overflow-hidden"
            >
              <div className="flex items-center justify-between border-b border-warmGold/20 pb-3 mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-warmGold">🎵</span>
                  <span className="font-playfair text-sm font-bold text-softIvory">
                    Songs For My Dove 🕊️
                  </span>
                </div>
                <button
                  onClick={() => setIsPlaylistOpen(false)}
                  className="text-softIvory/60 hover:text-warmGold text-xs p-1"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-1.5 max-h-64 overflow-y-auto pr-1">
                {playlist.map((track) => {
                  const isActive = track.id === activeTrackId;
                  return (
                    <button
                      key={track.id}
                      onClick={() => selectTrack(track.id)}
                      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left transition-all duration-200 cursor-pointer ${isActive
                          ? 'bg-warmGold/20 border border-warmGold/50 text-warmGold font-semibold'
                          : 'hover:bg-white/5 border border-transparent text-softIvory/80'
                        }`}
                    >
                      <div className="flex items-center gap-3 truncate">
                        <span className="text-xs">{isActive && isPlaying ? '▶️' : '♪'}</span>
                        <div className="truncate">
                          <p className="text-xs sm:text-sm font-medium truncate">{track.title}</p>
                          <p className="text-[10px] text-softIvory/50 truncate">{track.artist}</p>
                        </div>
                      </div>
                      {track.badge && (
                        <span className="text-[9px] px-2 py-0.5 rounded-full border border-warmGold/30 text-warmGold/80 shrink-0 ml-2">
                          {track.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>

              <div className="border-t border-warmGold/15 mt-3 pt-2 text-center">
                <p className="font-cormorant text-[11px] text-softIvory/60 italic">
                  &quot;Har gaana, har lafz sirf tumhare liye, Dhanshree ❤️&quot;
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Music Control Bar */}
        <div
          className="flex items-center gap-2 glass px-3 py-2 rounded-full border border-warmGold/35 shadow-[0_4px_25px_rgba(0,0,0,0.6)] bg-deepBlack/90 backdrop-blur-md"
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
        >
          {/* Previous Button */}
          <button
            onClick={skipPrev}
            className="w-8 h-8 rounded-full flex items-center justify-center text-softIvory/70 hover:text-warmGold transition-colors cursor-pointer"
            title="Previous Song"
            aria-label="Previous Song"
          >
            ⏮
          </button>

          {/* Main Play/Pause Button */}
          <button
            onClick={togglePlay}
            className="relative w-10 h-10 rounded-full bg-gradient-to-br from-warmGold to-amberHighlight flex items-center justify-center text-deepBlack font-bold shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer focus:outline-none"
            aria-label={isPlaying ? "Pause Music" : "Play Music"}
          >
            {isPlaying ? (
              <span className="text-sm">⏸</span>
            ) : (
              <span className="text-sm ml-0.5">▶</span>
            )}
          </button>

          {/* Next Button */}
          <button
            onClick={skipNext}
            className="w-8 h-8 rounded-full flex items-center justify-center text-softIvory/70 hover:text-warmGold transition-colors cursor-pointer"
            title="Next Song"
            aria-label="Next Song"
          >
            ⏭
          </button>

          {/* Track Info & Playlist Toggle */}
          <button
            onClick={() => setIsPlaylistOpen(!isPlaylistOpen)}
            className="flex items-center gap-2 pl-2 pr-2 border-l border-warmGold/20 text-left hover:opacity-90 transition-opacity cursor-pointer"
          >
            {/* Animated Sound Equalizer */}
            <div className="flex gap-[2px] items-end h-3.5 w-3.5 justify-center">
              <span
                className={`w-[2px] bg-warmGold rounded-full ${isPlaying && !reducedMotion ? 'animate-[pulse_0.8s_infinite_alternate]' : 'h-1.5'}`}
              />
              <span
                className={`w-[2px] bg-warmGold rounded-full ${isPlaying && !reducedMotion ? 'animate-[pulse_0.6s_infinite_alternate]' : 'h-3'}`}
                style={{ animationDelay: '0.2s' }}
              />
              <span
                className={`w-[2px] bg-warmGold rounded-full ${isPlaying && !reducedMotion ? 'animate-[pulse_1.1s_infinite_alternate]' : 'h-1.5'}`}
                style={{ animationDelay: '0.4s' }}
              />
            </div>

            <div className="max-w-[110px] sm:max-w-[150px] truncate">
              <p className="text-[11px] sm:text-xs font-playfair font-semibold text-softIvory truncate">
                {activeTrackObj.title}
              </p>
              <p className="text-[9px] text-warmGold/80 truncate">
                {isPlaying ? 'Playing • Tap for songs' : 'Paused • Tap for songs'}
              </p>
            </div>

            <span className="text-[10px] text-warmGold ml-1">☰</span>
          </button>
        </div>
      </div>

      <style jsx global>{`
        @keyframes pulse {
          0% { height: 3px; }
          100% { height: 14px; }
        }
      `}</style>
    </>
  );
}
