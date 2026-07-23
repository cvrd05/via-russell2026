import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import EnvelopeOpening from '@/components/envelope/EnvelopeOpening';
import Navigation from '@/components/nav/Navigation';
import MusicPlayer from '@/components/sections/MusicPlayer';
import Hero from '@/components/sections/Hero';
import CoupleIntro from '@/components/sections/CoupleIntro';
import LoveStoryTimeline from '@/components/sections/LoveStoryTimeline';
import WeddingDetails from '@/components/sections/WeddingDetails';
import ScheduleTimeline from '@/components/sections/ScheduleTimeline';
import DressCode from '@/components/sections/DressCode';
import Gifts from '@/components/sections/Gifts';
import Gallery from '@/components/sections/Gallery';
import WeddingParty from '@/components/sections/WeddingParty';
import RSVPForm from '@/components/sections/RSVPForm';
import Footer from '@/components/sections/Footer';
import { useLockBodyScroll } from '@/hooks/useLockBodyScroll';
import { useMusicPlayer } from '@/hooks/useMusicPlayer';
import { media } from '@/data/weddingConfig';

function App() {
  const [isOpened, setIsOpened] = useState(false);
  useLockBodyScroll(!isOpened);

  // Owned here (not inside MusicPlayer) so the single <audio> element and
  // its play state persist for the whole session regardless of scrolling
  // between sections — both the inline vinyl on Page 2 (Hero) and the
  // persistent floating vinyl control (MusicPlayer) share this same state.
  const music = useMusicPlayer();

  return (
    <>
      <AnimatePresence>{!isOpened && <EnvelopeOpening onOpen={() => setIsOpened(true)} />}</AnimatePresence>

      {isOpened && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
          <audio ref={music.audioRef} src={media.weddingSong} loop preload="none" />

          <Navigation />

          <main>
            <Hero isPlaying={music.isPlaying} onToggleMusic={music.toggle} />
            <CoupleIntro />
            <LoveStoryTimeline />
            <WeddingDetails />
            <ScheduleTimeline />
            <DressCode />
            <Gifts />
            <Gallery />
            <WeddingParty />
            <RSVPForm />
          </main>

          <Footer />
          <MusicPlayer isPlaying={music.isPlaying} onToggle={music.toggle} />
        </motion.div>
      )}
    </>
  );
}

export default App;
