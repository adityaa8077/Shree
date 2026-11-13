'use client';

import { useState, useEffect } from 'react';
import NetflixNavbar from '@/components/NetflixNavbar';
import HeroSection from '@/components/HeroSection';
import TheQuietGrind from '@/components/TheQuietGrind';
import VisionaryAction from '@/components/VisionaryAction';
import DestinationGoogle from '@/components/DestinationGoogle';
import HeartBehindBrilliance from '@/components/HeartBehindBrilliance';
import FinaleSection from '@/components/FinaleSection';
import ParticleBackground from '@/components/ParticleBackground';

// Keepsake & Journey components
import ClientEffects from '@/components/ClientEffects';
import WelcomeOverlay from '@/components/WelcomeOverlay';
import BackgroundMusic, { TrackName } from '@/components/BackgroundMusic';
import FallingPetals from '@/components/FallingPetals';
import TodayReminder from '@/components/TodayReminder';
import JourneySection from '@/components/JourneySection';
import DreamsWorthChasing from '@/components/DreamsWorthChasing';
import VisionBook from '@/components/VisionBook';
import ThingsNeverChange from '@/components/ThingsNeverChange';
import MemoryGarden from '@/components/MemoryGarden';
import StoryOfUs from '@/components/StoryOfUs';
import OpenWhenLetters from '@/components/OpenWhenLetters';
import HeartbeatConfession from '@/components/HeartbeatConfession';
import WhenLifeFeelsHeavy from '@/components/WhenLifeFeelsHeavy';
import BeforeYouLeave from '@/components/BeforeYouLeave';
import FinalScene from '@/components/FinalScene';

export default function Home() {
  const [started, setStarted] = useState(false);
  const [confessionOpen, setConfessionOpen] = useState(false);
  const [sectionTrack, setSectionTrack] = useState<TrackName>('sitare');

  // Track scroll position to determine ambient soundtrack:
  // 1. "Sitaare" plays initially (Hero, Journey, Quiet Grind)
  // 2. "Khat" starts playing when reaching "Things About You That I Love"
  // 3. "Alfaaz (Unki Tareef)" starts playing at "Through My Eyes" (Memory Garden)
  // 4. "Dilruba Dilnasheen" starts playing at "Story of Us"
  // 5. "Sajde" starts playing at "Open When Letters" and beyond
  useEffect(() => {
    const handleScroll = () => {
      const thingsElem = document.getElementById('things-never-change');
      const memoryElem = document.getElementById('memory-garden');
      const storyElem = document.getElementById('story-of-us');
      const lettersElem = document.getElementById('open-when');
      const finalSceneElem = document.getElementById('final-scene');

      const triggerPoint = window.innerHeight * 0.45;

      const finalSceneTop = finalSceneElem ? finalSceneElem.getBoundingClientRect().top : Infinity;
      const lettersTop = lettersElem ? lettersElem.getBoundingClientRect().top : Infinity;
      const storyTop = storyElem ? storyElem.getBoundingClientRect().top : Infinity;
      const memoryTop = memoryElem ? memoryElem.getBoundingClientRect().top : Infinity;
      const thingsTop = thingsElem ? thingsElem.getBoundingClientRect().top : Infinity;

      if (finalSceneTop <= triggerPoint) {
        setSectionTrack('alfaaz'); // WhatsApp Audio at the end!
      } else if (lettersTop <= triggerPoint) {
        setSectionTrack('sajde');
      } else if (storyTop <= triggerPoint) {
        setSectionTrack('dilruba');
      } else if (memoryTop <= triggerPoint) {
        setSectionTrack('alfaaz');
      } else if (thingsTop <= triggerPoint) {
        setSectionTrack('khat');
      } else {
        setSectionTrack('sitare');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Compute active track:
  // - In confession experience: play "arz-kiya-hai"
  // - Otherwise: play ambient section track
  const currentTrack: TrackName = confessionOpen ? 'arz-kiya-hai' : sectionTrack;

  return (
    <>
      {/* Visual micro-details: dynamic custom cursor, scroll indicator bar, DevTools logs */}
      <ClientEffects />

      {/* Intro Overlay & Music Loader */}
      <WelcomeOverlay onEnter={() => setStarted(true)} />
      <BackgroundMusic
        playMusic={started}
        currentTrack={currentTrack}
        onTrackChange={(t) => setSectionTrack(t)}
      />
      <FallingPetals active={started} />

      {/* Header bar */}
      <NetflixNavbar />

      <main className="relative min-h-screen">
        <ParticleBackground />

        {/* Story & Keepsake Sections */}
        <HeroSection />
        <TodayReminder />
        <JourneySection />
        <TheQuietGrind />
        <VisionaryAction />
        <DestinationGoogle />
        <DreamsWorthChasing />
        <VisionBook />
        <HeartBehindBrilliance />
        <ThingsNeverChange />
        <MemoryGarden />
        <StoryOfUs />
        <OpenWhenLetters onConfessionOpen={() => setConfessionOpen(true)} />
        <WhenLifeFeelsHeavy />
        <BeforeYouLeave />
        <FinaleSection />
        <FinalScene
          onInViewChange={() => { }}
          onPlayWhatsAppAudio={() => setSectionTrack('alfaaz')}
        />
      </main>

      {/* Heartbeat Confession Experience Overlay */}
      <HeartbeatConfession
        isOpen={confessionOpen}
        onClose={() => setConfessionOpen(false)}
      />
    </>
  );
}
