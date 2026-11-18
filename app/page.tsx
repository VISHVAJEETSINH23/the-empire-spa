"use client";

import { useState, useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import LuxuryNavbar from "@/components/LuxuryNavbar";
import CinematicHero from "@/components/CinematicHero";
import EditorialSections from "@/components/EditorialSections";
import WhatsAppFloatingWidget from "@/components/WhatsAppFloatingWidget";
import BookingChatbot from "@/components/BookingChatbot";
import AmbienceSwitcher from "@/components/AmbienceSwitcher";
import { scrollToSection } from "@/lib/scroll";

// Overlays nobody sees until they tap something: kept out of the first
// JavaScript bundle and fetched in the background after the page is up.
const NavigationDrawer = dynamic(() => import("@/components/NavigationDrawer"), { ssr: false });
const ReservationModal = dynamic(() => import("@/components/ReservationModal"), { ssr: false });
const AIWellnessDoctor = dynamic(() => import("@/components/AIWellnessDoctor"), { ssr: false });
const SanctuaryAudioStudio = dynamic(() => import("@/components/SanctuaryAudioStudio"), { ssr: false });

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isReservationOpen, setIsReservationOpen] = useState<boolean>(false);
  const [isAIDoctorOpen, setIsAIDoctorOpen] = useState<boolean>(false);
  const [isAudioStudioOpen, setIsAudioStudioOpen] = useState<boolean>(false);
  const [selectedExperienceId, setSelectedExperienceId] = useState<string | undefined>(undefined);
  const [selectedMinutes, setSelectedMinutes] = useState<number | undefined>(undefined);
  const [isAudioActive, setIsAudioActive] = useState<boolean>(false);

  const audioInstanceRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const audio = new Audio("/audio/empire-soundtrack.mp3");
      audio.loop = true;
      audio.preload = "none"; // fetched on first play, not on page load
      audioInstanceRef.current = audio;
    }

    return () => {
      if (audioInstanceRef.current) {
        audioInstanceRef.current.pause();
        audioInstanceRef.current = null;
      }
    };
  }, []);

  const handleOpenReservation = (experienceId?: string, minutes?: number) => {
    setSelectedExperienceId(experienceId);
    setSelectedMinutes(minutes);
    setIsReservationOpen(true);
    };

  const handleApplyAIPrescription = (therapyId: string) => {
    setSelectedExperienceId(therapyId);
    setSelectedMinutes(undefined);
    setIsReservationOpen(true);
    };

  const handleSelectMenuLink = (target: string) => {
    if (target === "booking") {
      window.location.href = "/booking";
      return;
    }
    // Goes through Lenis so the drawer glides to the section like the navbar.
    scrollToSection(target);
    };

  return (
    <main className="relative min-h-screen bg-[#07090b] text-[#f7f4ee]">
      {/* Floating Glassmorphic Luxury Navbar */}
      <LuxuryNavbar
        onOpenMenu={() => setIsMenuOpen(true)}
        onOpenReservation={() => handleOpenReservation()}
        onOpenAudioStudio={() => setIsAudioStudioOpen(true)}
        isAudioActive={isAudioActive}
      />

      {/* 3. Master 4-Act Continuous Canvas Journey */}
      <CinematicHero
        onOpenMenu={() => setIsMenuOpen(true)}
        onOpenReservation={() => handleOpenReservation()}
      />

      {/* 4. Deep-Dive Luxury Editorial Sections Below Canvas */}
      <EditorialSections
        onOpenReservation={handleOpenReservation}
        onOpenAIDoctor={() => setIsAIDoctorOpen(true)}
      />

      {/* 5. Floating Smart WhatsApp Concierge Widget */}
      <WhatsAppFloatingWidget />

      {/* 5A. AI booking chatbot, stacked above the WhatsApp button */}
      <BookingChatbot onBook={handleApplyAIPrescription} />

      {/* 5B. Ambient background control (colour + motion) */}
      <AmbienceSwitcher />

      {/* 6. AI Wellness Consultant Modal */}
      <AIWellnessDoctor
        isOpen={isAIDoctorOpen}
        onClose={() => setIsAIDoctorOpen(false)}
        onApplyPrescription={handleApplyAIPrescription}
      />

      {/* 6B. Sanctuary ASMR Soundscape Mixer Modal */}
      <SanctuaryAudioStudio
        isOpen={isAudioStudioOpen}
        onClose={() => setIsAudioStudioOpen(false)}
      />

      {/* 7. Fullscreen Editorial Navigation Drawer */}
      <NavigationDrawer
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        onSelectLink={handleSelectMenuLink}
        onOpenReservation={() => handleOpenReservation()}
      />

      {/* 8. VIP Sanctuary Reservation Concierge Modal */}
      <ReservationModal
        isOpen={isReservationOpen}
        onClose={() => setIsReservationOpen(false)}
        initialExperience={selectedExperienceId}
        initialMinutes={selectedMinutes}
      />
    </main>
  );
    }
