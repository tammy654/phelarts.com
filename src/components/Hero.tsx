import { useEffect, useRef, useState } from 'react';
import { Play, Pause } from 'lucide-react';

const MOBILE_BREAKPOINT = 768;

const DESKTOP_POSTER = 'https://res.cloudinary.com/cqzopbig/image/upload/v1793164229/Phel_Arts_New_Logo_Reveal_Cover_Image.png';
const DESKTOP_VIDEO = 'https://res.cloudinary.com/cqzopbig/image/upload/v1793164229/Phel_Arts_New_Logo_Reveal_Cover_Image.png';

const MOBILE_POSTER = 'https://res.cloudinary.com/cqzopbig/image/upload/v1793267823/Phel_Arts_New_Logo_Reveal_Cover_Image_9x16.png';
const MOBILE_VIDEO = 'https://res.cloudinary.com/cqzopbig/video/upload/v1793352389/Phel_Arts_New_Logo_Reveal_9x16.mp4';

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined' ? window.innerWidth < MOBILE_BREAKPOINT : false
  );

  useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    const onChange = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mql.addEventListener('change', onChange);
    setIsMobile(mql.matches);
    return () => mql.removeEventListener('change', onChange);
  }, []);

  return isMobile;
}

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(true);
  const isMobile = useIsMobile();

  const poster = isMobile ? MOBILE_POSTER : DESKTOP_POSTER;
  const src = isMobile ? MOBILE_VIDEO : DESKTOP_VIDEO;

  const toggle = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play().catch(() => {});
      setPlaying(true);
    } else {
      v.pause();
      setPlaying(false);
    }
  };

  return (
    <section className="relative w-full h-screen overflow-hidden bg-[#16161a]">
      {/* Background showreel video — switches between desktop landscape and mobile 9:16 */}
      <video
        key={src}
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        poster={poster}
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src={src} type="video/mp4" />
      </video>

      {/* Subtle vignette for legibility of controls */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#16161a]/40 via-transparent to-[#16161a]/70 pointer-events-none" />

      {/* Play / pause control — bottom right */}
      <button
        onClick={toggle}
        aria-label={playing ? 'Pause showreel' : 'Play showreel'}
        className="absolute bottom-8 right-8 z-10 w-14 h-14 rounded-full bg-[#f7f5f1]/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-[#f7f5f1] hover:bg-[#f59e0b] hover:text-[#16161a] hover:border-[#f59e0b] transition-all duration-300"
      >
        {playing ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current ml-0.5" />}
      </button>
    </section>
  );
}
