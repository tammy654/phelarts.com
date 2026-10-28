import { useRef, useState } from 'react';
import { Play, Pause } from 'lucide-react';

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(true);

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
      {/* Background showreel video */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        poster="https://images.pexels.com/photos/12966745/pexels-photo-12966745.jpeg?auto=compress&cs=tinysrgb&w=1600"
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source
          src="https://res.cloudinary.com/cqzopbig/video/upload/v1793163411/Phel_Arts_New_Logo_Reveal.mp4"
          type="video/mp4"
        />
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
