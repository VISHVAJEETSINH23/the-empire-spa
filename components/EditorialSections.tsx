"use client";

import { useState } from "react";
import Link from "next/link";
import ServicesMenu from "@/components/ServicesMenu";
import BodyPainMapper from "@/components/BodyPainMapper";
import WavyBackground from "@/components/ui/blue-meshy-background";
import {
  MapPin,
  Phone,
  Clock,
  MessageCircle,
  Navigation,
  Star,
  ShieldCheck,
  CheckCircle2,
  ThumbsUp,
  Sparkles,
  ExternalLink,
  ArrowRight,
} from "lucide-react";
import { scrollToSection } from "@/lib/scroll";
import { AMENITIES, BRAND, BRANCHES, BRANCH_LIST, branchHours } from "@/lib/branches";
import { BRANCH_PHOTOS, GUEST_REVIEWS } from "@/lib/guestContent";
import { COMPLETE_SPA_DATA, formatRupees } from "@/lib/treatments";
import Image from "next/image";

interface EditorialSectionsProps {
  onOpenReservation: (experienceId?: string, minutes?: number) => void;
  onOpenAIDoctor?: () => void;
}

/** "9876543210" → "+91 98765 43210" */
function prettyPhone(digits: string): string {
  return `+91 ${digits.slice(0, 5)} ${digits.slice(5)}`;
}

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length >= 2) {
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }
  return name.slice(0, 2).toUpperCase();
}

const HOURS = `Open 7 days · ${branchHours("main")}`;

const COUPLE_THERAPIES = COMPLETE_SPA_DATA.filter((item) => item.forTwo);

export default function EditorialSections({ onOpenReservation, onOpenAIDoctor }: EditorialSectionsProps) {
  const [reviewFilter, setReviewFilter] = useState<"all" | "hygiene" | "service" | "value">("all");
  const filteredReviews =
    reviewFilter === "all" ? GUEST_REVIEWS : GUEST_REVIEWS.filter((r) => r.category === reviewFilter);
  return (
    <WavyBackground className="relative w-full bg-[#07090b] text-[#f7f4ee] select-none z-20">
      {/* Short fades that join this panel to the hero above and the page below. */}
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#07090b] to-transparent pointer-events-none z-0" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#07090b] to-transparent pointer-events-none z-0" />

      {/* Menu & prices */}
      <section id="rituals" className="relative z-10 pt-8 scroll-mt-24">
        <ServicesMenu onOpenReservation={onOpenReservation} onOpenAIDoctor={onOpenAIDoctor} />
      </section>

      {/* "Where does it hurt?" */}
      <section className="relative z-10 pt-12 px-5 sm:px-8 lg:px-12">
        <BodyPainMapper onSelectTherapy={(therapyId, minutes) => onOpenReservation(therapyId, minutes)} />
      </section>

      {/* About */}
      <section
        id="about"
        className="relative max-w-[1600px] mx-auto px-5 sm:px-8 lg:px-12 py-24 border-t border-white/[0.07] z-10 scroll-mt-28"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
          <div className="relative overflow-hidden aspect-[4/3]">
            <Image
              src="/images/philosophy-sanctuary.jpg"
              alt="A treatment room at The Empire Spa"
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover brightness-90 saturate-[0.85]"
            />
          </div>

          <div className="pool space-y-5">
            <span className="block text-xs font-mono tracking-[0.3em] text-[#d9bb8e] uppercase">About The Empire Spa</span>
            <h2 className="text-3xl sm:text-5xl font-serif font-light text-[#f7f4ee] uppercase leading-tight text-shade-strong">
              Enter the <span className="italic text-[#c5a880]">Empire</span>
            </h2>
            <p className="text-base text-[#f0e9df]/90 font-sans leading-relaxed max-w-[52ch] text-shade">
              The Empire Spa in Shahupuri, Kolhapur is open all 7 days with the highest standards of luxury and hygiene.
              Massages for one, massages for two, a four-hand massage and a body scrub.
            </p>
            <p className="text-base text-[#f0e9df]/90 font-sans leading-relaxed max-w-[52ch] text-shade">
              Every guest gets a private room with an attached hot shower and fresh linen. Book online in under a
              minute, then pay at the spa.
            </p>
          </div>
        </div>
      </section>

      {/* Couple suite */}
      <section
        id="couple-suite"
        className="relative max-w-[1600px] mx-auto px-5 sm:px-8 lg:px-12 py-24 border-t border-white/[0.07] z-10 scroll-mt-28"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
          <div className="pool space-y-5 md:order-1 order-2">
            <span className="block text-xs font-mono tracking-[0.3em] text-[#d9bb8e] uppercase">Couple Suite</span>
            <h2 className="text-3xl sm:text-5xl font-serif font-light text-[#f7f4ee] uppercase leading-tight text-shade-strong">
              Made for <span className="italic text-[#c5a880]">Two</span>
            </h2>
            <p className="text-base text-[#f0e9df]/90 font-sans leading-relaxed max-w-[52ch] text-shade">
              Side by side in the couple room, each with your own therapist and your own pressure. Every price is for
              both guests.
            </p>
            <ul className="max-w-md divide-y divide-white/[0.08] border-y border-white/[0.08]">
              {COUPLE_THERAPIES.map((item) => (
                <li key={item.id} className="flex items-center justify-between gap-4 py-3.5">
                  <span className="font-serif text-lg text-[#f7f4ee]">{item.title}</span>
                  <button
                    onClick={() => onOpenReservation(item.id)}
                    className="shrink-0 cursor-pointer font-mono text-sm text-[#c5a880] transition-colors hover:text-[#f7f4ee]"
                  >
                    {item.price} →
                  </button>
                </li>
              ))}
            </ul>
            <button
              onClick={() => onOpenReservation(COUPLE_THERAPIES[0]?.id)}
              className="px-8 py-3.5 rounded-full bg-[#c5a880] text-[#07090b] text-[13px] font-sans font-bold tracking-[0.14em] uppercase hover:brightness-110 shadow-lg shadow-[#c5a880]/20 transition-all cursor-pointer"
            >
              Book for two from {formatRupees(COUPLE_THERAPIES[0]?.options[0].price ?? 0)}
            </button>
          </div>

          <div className="relative overflow-hidden aspect-[4/3] md:order-2 order-1">
            <Image
              src="/images/menu-couple-massage.jpg"
              alt="Two massage beds side by side"
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover brightness-90 saturate-[0.85]"
            />
          </div>
        </div>
      </section>

      {/* Inside the spa */}
      <section
        id="gallery"
        className="relative max-w-[1600px] mx-auto px-5 sm:px-8 lg:px-12 py-24 border-t border-white/[0.07] z-10 scroll-mt-28"
      >
        <div className="pool flex flex-wrap items-end justify-between gap-6">
          <div className="space-y-5 max-w-3xl">
            <span className="block text-xs font-mono tracking-[0.3em] text-[#d9bb8e] uppercase">Inside the Spa</span>
            <h2 className="text-3xl sm:text-5xl font-serif font-light text-[#f7f4ee] uppercase leading-tight text-shade-strong">
              A Walk <span className="italic text-[#c5a880]">Through</span>
            </h2>
          </div>
        </div>

        <div className="mt-12 columns-2 md:columns-3 lg:columns-4 gap-3 sm:gap-4 [&>*]:mb-3 sm:[&>*]:mb-4">
          {BRANCH_PHOTOS.main.map((photo) => (
            <div
              key={photo.src}
              className={`relative break-inside-avoid overflow-hidden rounded-sm border border-white/[0.07] ${
                photo.tall ? "aspect-[3/5]" : "aspect-[4/3]"
              }`}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="(min-width: 768px) 60vw, 100vw"
                className="object-cover brightness-90 saturate-[0.9] transition-transform duration-700 hover:scale-[1.04]"
              />
            </div>
          ))}
        </div>
      </section>

      {/* Guest reviews: word for word from Justdial */}
      {GUEST_REVIEWS.length > 0 && (
        <section
          id="reviews"
          className="relative max-w-[1600px] mx-auto px-5 sm:px-8 lg:px-12 py-24 sm:py-28 border-t border-white/[0.07] z-10 scroll-mt-28"
        >
          {/* Top Header & Official Rating Scorecard */}
          <div className="pool flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-10 border-b border-white/[0.07]">
            <div className="space-y-4 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#c5a880]/30 bg-[#c5a880]/10 text-[#c5a880] font-mono text-[11px] uppercase tracking-[0.25em]">
                <Sparkles className="h-3 w-3" />
                Verified Guest Feedback
              </div>
              <h2 className="text-3xl sm:text-5xl font-serif font-light text-[#f7f4ee] uppercase leading-tight text-shade-strong">
                In Their <span className="italic text-[#c5a880]">Words</span>
              </h2>
              <p className="text-base text-[#f0e9df]/85 font-sans leading-relaxed">
                Word-for-word authentic impressions from real guests who visited The Empire Spa in Shahupuri, Kolhapur.
              </p>
            </div>

            {/* Official Justdial Scorecard */}
            {BRANCHES.main.rating && (
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-[#121820]/90 to-[#090d11]/90 border border-[#c5a880]/30 shadow-2xl backdrop-blur-md">
                <div className="flex items-center gap-4">
                  <span className="font-serif text-5xl font-light text-[#c5a880] tabular-nums tracking-tight">
                    {BRANCHES.main.rating.score.toFixed(1)}
                  </span>
                  <div className="space-y-1">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-[#c5a880] text-[#c5a880]" />
                      ))}
                    </div>
                    <span className="block font-mono text-[11px] tracking-wider uppercase text-[#e8ded2]/60">
                      {BRANCHES.main.rating.count}+ Verified Ratings
                    </span>
                  </div>
                </div>
                <span className="hidden sm:block h-10 w-px bg-white/10" />
                <a
                  href={BRANCHES.main.rating.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-[#c5a880]/50 bg-[#c5a880] px-5 py-2.5 font-sans text-xs font-bold uppercase tracking-wider text-[#07090b] hover:brightness-110 shadow-lg shadow-[#c5a880]/20 transition-all cursor-pointer"
                >
                  <span>View on Justdial</span>
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>
            )}
          </div>

          {/* Trust Highlights Bar */}
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 font-sans text-xs text-[#f0e9df]/90">
              <ShieldCheck className="h-4 w-4 text-[#c5a880]" />
              <span>100% Private Suites & Attached Hot Showers</span>
            </div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 font-sans text-xs text-[#f0e9df]/90">
              <CheckCircle2 className="h-4 w-4 text-[#25D366]" />
              <span>Clean Equipment & Fresh Single-Use Linen</span>
            </div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 font-sans text-xs text-[#f0e9df]/90">
              <ThumbsUp className="h-4 w-4 text-[#c5a880]" />
              <span>Polite & Experienced Certified Staff</span>
            </div>
          </div>

          {/* Filter Tabs */}
          <div className="mt-10 flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap gap-2">
              {[
                { id: "all", label: `All Reviews (${GUEST_REVIEWS.length})` },
                { id: "hygiene", label: "Cleanliness & Safety" },
                { id: "service", label: "Staff & Ambience" },
                { id: "value", label: "Pricing & Value" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setReviewFilter(tab.id as typeof reviewFilter)}
                  className={`rounded-full px-5 py-2 font-mono text-[11px] uppercase tracking-wider transition-all cursor-pointer ${
                    reviewFilter === tab.id
                      ? "bg-[#c5a880] text-[#07090b] font-bold shadow-lg shadow-[#c5a880]/20"
                      : "border border-white/10 bg-[#0b0f12]/60 text-[#f0e9df]/70 hover:border-[#c5a880]/40 hover:text-[#f7f4ee]"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
            <span className="font-mono text-xs text-[#e8ded2]/40 hidden md:inline">
              Showing {filteredReviews.length} guest experiences
            </span>
          </div>

          {/* Luxury Review Cards Grid */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredReviews.map((review) => {
              const initials = getInitials(review.name);
              return (
                <figure
                  key={review.name}
                  className="relative flex flex-col justify-between rounded-2xl border border-white/[0.08] bg-gradient-to-b from-white/[0.05] via-[#0b0f13]/80 to-[#07090b]/90 p-7 sm:p-8 backdrop-blur-sm transition-all duration-500 hover:-translate-y-1 hover:border-[#c5a880]/50 hover:shadow-2xl hover:shadow-[#c5a880]/10 group overflow-hidden"
                >
                  {/* Decorative subtle gold watermark quote mark */}
                  <span
                    aria-hidden="true"
                    className="absolute top-4 right-6 font-serif text-8xl text-white/[0.03] group-hover:text-[#c5a880]/10 transition-colors pointer-events-none select-none"
                  >
                    “
                  </span>

                  <div className="space-y-4 relative z-10">
                    {/* Tag & Stars */}
                    <div className="flex items-center justify-between gap-2">
                      {review.tag ? (
                        <span className="inline-flex items-center gap-1 rounded-full border border-[#c5a880]/25 bg-[#c5a880]/10 px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-[#e4d3ba]">
                          {review.tag}
                        </span>
                      ) : (
                        <span />
                      )}

                      <div className="flex items-center gap-0.5">
                        {[...Array(review.rating ?? 5)].map((_, i) => (
                          <Star key={i} className="h-3.5 w-3.5 fill-[#c5a880] text-[#c5a880]" />
                        ))}
                      </div>
                    </div>

                    {/* Review Body */}
                    <blockquote className="font-serif text-[15px] sm:text-base leading-relaxed text-[#f0e9df]/95 font-light">
                      “{review.text}”
                    </blockquote>
                  </div>

                  {/* Author Footer */}
                  <div className="mt-6 pt-5 border-t border-white/[0.07] flex items-center justify-between gap-3 relative z-10">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#c5a880]/30 to-[#c5a880]/10 border border-[#c5a880]/40 flex items-center justify-center font-mono text-[11px] font-bold text-[#c5a880] shrink-0 shadow-inner">
                        {initials}
                      </div>
                      <div>
                        <span className="block font-sans text-sm font-medium text-[#f7f4ee] group-hover:text-[#c5a880] transition-colors">
                          {review.name}
                        </span>
                        <span className="block font-mono text-[10px] text-[#25D366] flex items-center gap-1">
                          <CheckCircle2 className="h-2.5 w-2.5" /> Justdial Verified
                        </span>
                      </div>
                    </div>
                    <span className="font-mono text-[10px] uppercase tracking-wider text-[#f0e9df]/40 shrink-0">
                      {review.date}
                    </span>
                  </div>
                </figure>
              );
            })}
          </div>

          {/* Bottom Invitation Banner */}
          <div className="mt-14 p-8 sm:p-10 rounded-2xl border border-[#c5a880]/25 bg-gradient-to-r from-[#121820]/90 via-[#0e141a]/95 to-[#121820]/90 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
            <div className="space-y-1.5 text-center md:text-left">
              <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-[#c5a880] block">
                Experience It Today
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl text-[#f7f4ee] font-light">
                Ready for total rejuvenation in Shahupuri, Kolhapur?
              </h3>
              <p className="text-sm text-[#f0e9df]/75 font-sans">
                Select your therapy, pick your preferred time — your private room will be prepared.
              </p>
            </div>
            <button
              onClick={() => onOpenReservation()}
              className="shrink-0 px-8 py-4 rounded-full bg-[#c5a880] text-[#07090b] font-sans text-xs font-bold uppercase tracking-[0.2em] hover:brightness-110 hover:scale-105 shadow-xl shadow-[#c5a880]/25 transition-all cursor-pointer flex items-center gap-2"
            >
              <span>Reserve Your Slot</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </section>
      )}

      {/* Contact & Interactive Map */}
      <section
        id="contact"
        className="relative max-w-[1600px] mx-auto px-5 sm:px-8 lg:px-12 py-20 sm:py-24 border-t border-white/[0.07] z-10 scroll-mt-28"
      >
        {/* Kept so older #location links still land here. */}
        <span id="location" aria-hidden className="block scroll-mt-28" />

        <div className="pool flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-4 max-w-2xl">
            <span className="block text-xs font-mono tracking-[0.3em] text-[#d9bb8e] uppercase">
              Sanctuary Location · Shahupuri
            </span>
            <h2 className="text-3xl sm:text-5xl font-serif font-light text-[#f7f4ee] uppercase leading-tight text-shade-strong">
              Visit The <span className="italic text-[#c5a880]">Empire</span> Spa
            </h2>
            <p className="text-base text-[#f0e9df]/85 font-sans leading-relaxed">
              Step into our private wellness sanctuary in Shahupuri, Kolhapur. Every room has an attached hot shower, fresh linen, and tranquil acoustic privacy.
            </p>
          </div>
          <button
            onClick={() => onOpenReservation()}
            className="self-start md:self-auto shrink-0 px-8 py-3.5 rounded-full bg-[#c5a880] text-[#07090b] text-[13px] font-sans font-bold tracking-[0.14em] uppercase hover:brightness-110 shadow-lg shadow-[#c5a880]/20 transition-all cursor-pointer flex items-center gap-2"
          >
            <span>Book Appointment</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 pt-8 border-t border-white/[0.07] items-stretch">
          {/* Left Column: Branch Address & Quick Connect Actions */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            {BRANCH_LIST.map((branch) => (
              <div key={branch.id} className="space-y-5">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="font-mono text-[11px] uppercase tracking-wider text-emerald-400">
                      Open Today · {branchHours(branch.id)}
                    </span>
                  </div>
                  <h3 className="font-serif text-2xl sm:text-3xl text-[#f7f4ee]">{branch.name}</h3>
                </div>

                <div className="p-5 rounded-2xl bg-[#0c1015]/80 border border-white/10 space-y-3.5 backdrop-blur-md">
                  <div className="flex items-start gap-3">
                    <MapPin className="mt-1 h-5 w-5 shrink-0 text-[#c5a880]" />
                    <div className="space-y-1">
                      <p className="text-base text-[#f0e9df]/95 font-sans leading-relaxed">
                        {branch.address ?? "Address coming soon"}
                      </p>
                      <span className="inline-block font-mono text-[11px] text-[#c5a880]">
                        Landmark: Near Raja Kaka Showroom · Opp. Naik &amp; Co
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 pt-2 border-t border-white/5 font-mono text-sm text-[#f0e9df]/85">
                    <Clock className="h-4 w-4 shrink-0 text-[#c5a880]" />
                    <span>Open 7 days · {branchHours(branch.id)}</span>
                  </div>

                  {branch.rating && (
                    <div className="flex items-center gap-3 font-mono text-sm text-[#f0e9df]/85">
                      <Star className="h-4 w-4 shrink-0 fill-[#c5a880] text-[#c5a880]" />
                      <span>
                        {branch.rating.score.toFixed(1)} ★ ({branch.rating.count}+ reviews on {branch.rating.source})
                      </span>
                    </div>
                  )}
                </div>

                {/* Direct Tactical Action Buttons for Mobile & Desktop */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  {branch.phone && (
                    <a
                      href={`tel:+91${branch.phone}`}
                      className="flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl border border-white/15 bg-white/[0.04] text-[#f7f4ee] hover:border-[#c5a880] hover:text-[#c5a880] font-mono text-xs uppercase tracking-wider transition-all cursor-pointer"
                    >
                      <Phone className="w-4 h-4 text-[#c5a880]" />
                      <span>{prettyPhone(branch.phone)}</span>
                    </a>
                  )}

                  {branch.whatsapp && (
                    <a
                      href={`https://wa.me/91${branch.whatsapp}?text=${encodeURIComponent("Hi The Empire Spa, I would like to book a massage appointment.")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 font-mono text-xs uppercase tracking-wider transition-all cursor-pointer"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>WhatsApp Spa</span>
                    </a>
                  )}

                  {branch.mapsUrl && (
                    <a
                      href={branch.mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="sm:col-span-2 flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-gradient-to-r from-[#b38f5f] via-[#c5a880] to-[#d9bb8e] text-[#07090b] font-sans text-xs font-bold uppercase tracking-wider hover:brightness-110 shadow-lg shadow-[#c5a880]/20 transition-all cursor-pointer"
                    >
                      <Navigation className="w-4 h-4" />
                      <span>Get Turn-by-Turn Directions in Google Maps ↗</span>
                    </a>
                  )}
                </div>
              </div>
            ))}

            {/* Facilities Chips */}
            <div className="space-y-3 pt-2">
              <h4 className="font-mono text-xs uppercase tracking-[0.2em] text-[#d9bb8e]">
                Sanctuary Amenities
              </h4>
              <ul className="flex flex-wrap gap-2">
                {AMENITIES.map((amenity) => (
                  <li
                    key={amenity}
                    className="rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1.5 font-sans text-xs text-[#f0e9df]/90"
                  >
                    {amenity}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Column: Embedded Interactive Google Map */}
          <div className="lg:col-span-7 flex flex-col">
            <div className="relative w-full flex-1 min-h-[340px] sm:min-h-[440px] rounded-2xl sm:rounded-3xl overflow-hidden border border-[#c5a880]/30 shadow-2xl bg-[#0b0f12]">
              {/* Floating Top Badge with Direct Action */}
              <div className="absolute top-3.5 inset-x-3.5 sm:inset-x-auto sm:left-4 z-10 flex items-center justify-between sm:justify-start gap-3 px-4 py-2 rounded-full bg-[#07090b]/90 backdrop-blur-md border border-[#c5a880]/35 text-xs text-[#f7f4ee] shadow-xl pointer-events-auto">
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-[#c5a880]" />
                  <span className="font-serif tracking-wide text-xs sm:text-sm font-medium">The Empire Spa · Shahupuri</span>
                </div>
                <a
                  href={BRANCHES.main.mapsUrl ?? "https://www.google.com/maps/search/?api=1&query=The+Empire+Spa+Shahupuri+Kolhapur"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-[10px] sm:text-[11px] text-[#c5a880] hover:text-white uppercase tracking-wider flex items-center gap-1"
                >
                  <span>Open App</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              {/* Interactive Google Map iframe */}
              <iframe
                title="The Empire Spa Location Google Maps"
                src="https://maps.google.com/maps?q=The+Empire+Spa,+Shahupuri,+Kolhapur,+Maharashtra&t=&z=16&ie=UTF8&iwloc=&output=embed"
                className="w-full h-full min-h-[340px] sm:min-h-[440px] border-0"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            {/* Quick helper note under map */}
            <div className="mt-3 flex flex-wrap items-center justify-between gap-2 px-1 text-xs text-[#e8ded2]/60 font-sans">
              <span>Opp. Naik &amp; Company, 2nd Floor, Shahupuri</span>
              <a
                href={BRANCHES.main.mapsUrl ?? "https://www.google.com/maps/search/?api=1&query=The+Empire+Spa+Shahupuri+Kolhapur"}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-[#c5a880] hover:text-[#f7f4ee] transition-colors inline-flex items-center gap-1"
              >
                <span>Open in Google Maps</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      </section>

      <footer className="relative z-10 mt-16 border-t border-white/[0.09] bg-[#07090b]/92 backdrop-blur-xl">
        <div className="mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-12">
          <div className="flex flex-wrap items-end justify-between gap-8 border-b border-white/[0.07] py-12">
            <div className="space-y-3">
              <span className="block font-mono text-[11px] uppercase tracking-[0.3em] text-[#c5a880]">Reservations</span>
              <h3 className="max-w-[18ch] font-serif text-2xl sm:text-3xl font-light leading-tight text-[#f7f4ee]">
                Pick a therapy, pick a time — the room will be ready.
              </h3>
            </div>
            <button
              onClick={() => onOpenReservation()}
              className="cursor-pointer rounded-full bg-[#c5a880] px-8 py-4 font-sans text-[11px] font-bold uppercase tracking-[0.2em] text-[#07090b] transition-all hover:brightness-110"
            >
              Book a slot
            </button>
          </div>

          <div className="grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr]">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Image src="/logo.png" alt="" width={56} height={56} className="h-14 w-14 rounded-full" />
                <div>
                  <span className="block font-serif text-xl text-[#f7f4ee]">{BRAND.fullName}</span>
                  <span className="block font-mono text-[10px] uppercase tracking-[0.2em] text-[#c5a880]">{BRAND.tagline}</span>
                </div>
              </div>
              <p className="max-w-[32ch] font-sans text-sm leading-relaxed text-[#f0e9df]/65">
                {HOURS}.
              </p>
            </div>

            <div className="space-y-4">
              <span className="block font-mono text-[11px] uppercase tracking-[0.24em] text-[#c5a880]">Treatments</span>
              <ul className="space-y-2.5 font-sans text-sm text-[#f0e9df]/70">
                {COMPLETE_SPA_DATA.map((item) => (
                  <li key={item.id}>
                    <button
                      onClick={() => onOpenReservation(item.id)}
                      className="cursor-pointer text-left transition-colors hover:text-[#c5a880]"
                    >
                      {item.title}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-4">
              <span className="block font-mono text-[11px] uppercase tracking-[0.24em] text-[#c5a880]">Explore</span>
              <ul className="space-y-2.5 font-sans text-sm text-[#f0e9df]/70">
                {[
                  { label: "Menu & prices", target: "rituals" },
                  { label: "About", target: "about" },
                  { label: "Gallery", target: "gallery" },
                  { label: "Reviews", target: "reviews" },
                  { label: "Contact", target: "contact" },
                ].map((item) => (
                  <li key={item.target}>
                    <button
                      onClick={() => scrollToSection(item.target)}
                      className="cursor-pointer text-left transition-colors hover:text-[#c5a880]"
                    >
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 border-t border-white/[0.07] py-7 font-mono text-[11px] uppercase tracking-[0.18em] text-[#f0e9df]/45">
            <span>© {new Date().getFullYear()} {BRAND.fullName}</span>
            <div className="flex flex-wrap items-center gap-7">
              <Link href="/booking" className="transition-colors hover:text-[#c5a880]">
                Manage booking
              </Link>
              <Link href="/privacy" className="transition-colors hover:text-[#c5a880]">
                Privacy
              </Link>
              <Link href="/terms" className="transition-colors hover:text-[#c5a880]">
                Terms
              </Link>
              <Link href="/refund-policy" className="transition-colors hover:text-[#c5a880]">
                Cancellation &amp; refunds
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </WavyBackground>
  );
}
