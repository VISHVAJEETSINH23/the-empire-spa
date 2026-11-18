"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Lenis from "lenis";
import { scrollToSection } from "@/lib/scroll";

interface CinematicHeroProps {
  onOpenMenu?: () => void;
  onOpenReservation?: () => void;
  onProgressUpdate?: (progress: number) => void;
}

export default function CinematicHero({
  onOpenReservation,
}: CinematicHeroProps) {
  const [isVideoLoaded, setIsVideoLoaded] = useState<boolean>(false);
  const lenisRef = useRef<Lenis | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Initialize Lenis for natural, fluid 120fps scrolling
  useEffect(() => {
    const isTouch =
      typeof window !== "undefined" &&
      ("ontouchstart" in window || navigator.maxTouchPoints > 0);

    const lenis = new Lenis({
      duration: isTouch ? 0.8 : 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.1,
      prevent: (node) =>
        !!node.closest?.("form, [role='dialog'], [aria-modal='true'], [data-lenis-prevent]"),
    });

    lenisRef.current = lenis;
    window.__lenis = lenis;

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      if (typeof window !== "undefined") delete window.__lenis;
    };
  }, []);

  // Programmatically trigger video playback for mobile browsers (iOS Low Power, Android battery savers)
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.defaultMuted = true;
    video.muted = true;
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // Autoplay prevented by browser power-saving mode, poster remains visible
      });
    }
  }, []);

  const handleScrollToRituals = () => {
    scrollToSection("rituals");
  };

  return (
    <section
      id="hero"
      className="relative min-h-[100svh] w-full flex flex-col justify-between bg-[#07090b] text-[#f7f4ee] overflow-hidden selection:bg-[#c5a880]/30 selection:text-[#f7f4ee]"
    >
      {/* 
        ========================================================================
        FULL CLARITY HD EMPIRE VIDEO (HARDWARE-ACCELERATED NATIVE PLAYBACK)
        Mobile: 1080x1920 Full HD Vertical Crop
        Desktop: 1920x1080 Full HD Landscape
        ========================================================================
      */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Instant Poster while video boots */}
        <div
          className={`absolute inset-0 transition-opacity duration-700 ${
            isVideoLoaded ? "opacity-0" : "opacity-100"
          }`}
        >
          <Image
            src="/images/gallery/room-gold-marble.jpg"
            alt="The Empire Spa Shahupuri Kolhapur"
            fill
            priority
            sizes="100vw"
            quality={90}
            className="object-cover object-center filter brightness-[0.70] contrast-[1.08]"
          />
        </div>

        {/* Native Full Clarity HD Video */}
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          poster="/images/gallery/room-gold-marble.jpg"
          onLoadedData={() => setIsVideoLoaded(true)}
          className="absolute inset-0 w-full h-full object-cover object-center filter brightness-[0.80] contrast-[1.08]"
        >
          <source src="/video/empire-hd-mobile.mp4" media="(max-width: 768px)" type="video/mp4" />
          <source src="/video/empire-hd.mp4" type="video/mp4" />
        </video>

        {/* Minimal Subtle Cinematic Vignettes to preserve video clarity */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#07090b] via-[#07090b]/30 to-[#07090b]/60" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-[#07090b]/20 to-[#07090b]/65" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#07090b]/60 via-transparent to-[#07090b]" />
      </div>

      {/* Top Spacer for floating navbar clearance */}
      <div className="h-20 sm:h-28 w-full relative z-10 shrink-0" />

      {/* 
        ========================================================================
        MINIMALIST HAUTE-COUTURE CENTERPIECE (BREATHING SPACE & CLARITY)
        ========================================================================
      */}
      <div className="relative z-10 w-full max-w-3xl mx-auto px-4 sm:px-8 py-3 sm:py-6 flex flex-col items-center text-center my-auto">
        {/* Discreet Monogram Eyebrow */}
        <div className="flex items-center gap-2.5 sm:gap-3 mb-3.5 sm:mb-5">
          <span className="w-6 sm:w-12 h-px bg-[#c5a880]/60" />
          <span className="text-[10px] sm:text-xs tracking-[0.35em] sm:tracking-[0.45em] uppercase text-[#d9bb8e] font-mono">
            Shahupuri · Kolhapur
          </span>
          <span className="w-6 sm:w-12 h-px bg-[#c5a880]/60" />
        </div>

        {/* Clean Grand Title */}
        <h1 className="text-4xl sm:text-7xl md:text-8xl lg:text-9xl font-serif font-extralight tracking-[0.08em] sm:tracking-[0.14em] text-[#f7f4ee] uppercase leading-[1.04] sm:leading-[0.95] mb-2.5 sm:mb-4 text-shade-strong">
          The Empire <span className="font-light italic text-[#e4d3ba]">Spa</span>
        </h1>

        {/* Serene Italic Subtitle */}
        <p className="text-lg sm:text-3xl md:text-4xl font-serif italic font-light text-[#f0dfc2] tracking-wide mb-5 sm:mb-8 text-shade-strong">
          Stillness, kept <span className="text-[#e4d3ba]">ready</span> for you.
        </p>

        {/* Minimalist Trust Line */}
        <div className="inline-flex items-center gap-2 mb-6 sm:mb-10 px-3.5 sm:px-4 py-1.5 rounded-full bg-black/55 backdrop-blur-md border border-white/10 text-[10px] sm:text-xs text-white/90">
          <span className="text-[#d4af37]">★ 4.8</span>
          <span className="text-white/40">·</span>
          <span>314+ Ratings on Justdial</span>
          <span className="text-white/40">·</span>
          <span className="text-[#d9bb8e]">Private Suites</span>
        </div>

        {/* Effortless Dual Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-3.5 w-full max-w-xs sm:max-w-none">
          <button
            onClick={() => onOpenReservation?.()}
            className="w-full sm:w-auto px-8 py-3.5 sm:py-4 rounded-full bg-gradient-to-r from-[#b38f5f] via-[#c5a880] to-[#d9bb8e] text-[#07090b] font-sans text-xs sm:text-sm tracking-[0.14em] sm:tracking-[0.16em] font-bold uppercase shadow-2xl hover:brightness-110 active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            <span>Reserve a Suite</span>
            <span className="text-base font-bold">→</span>
          </button>

          <button
            onClick={handleScrollToRituals}
            className="w-full sm:w-auto px-6 py-3.5 sm:py-4 rounded-full bg-black/45 backdrop-blur-md border border-white/20 text-[#e4d3ba] font-sans text-xs tracking-[0.12em] sm:tracking-[0.14em] uppercase hover:bg-white/10 hover:border-[#c5a880] active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-1.5"
          >
            <span>View 8 Rituals &amp; Prices</span>
            <span className="text-xs">↓</span>
          </button>
        </div>
      </div>

      {/* 
        ========================================================================
        QUIET LUXURY BOTTOM PROMPT
        ========================================================================
      */}
      <div className="relative z-10 w-full pb-5 sm:pb-8 flex flex-col items-center justify-center pointer-events-none shrink-0">
        <button
          onClick={handleScrollToRituals}
          className="pointer-events-auto flex flex-col items-center gap-1.5 text-[9px] sm:text-[10px] font-mono tracking-[0.3em] uppercase text-[#c5a880]/80 hover:text-white transition-colors cursor-pointer"
        >
          <span>SCROLL TO EXPLORE</span>
          <span className="animate-bounce text-xs">↓</span>
        </button>
      </div>
    </section>
  );
}
