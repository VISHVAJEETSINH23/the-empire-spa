import type { BranchId } from "@/lib/branches";

/**
 * Photos and guest reviews shown on the home page. PLACEHOLDER: the photos are
 * stills from the hero film; swap in the owner's originals when they arrive.
 * Only real reviews belong here, word for word from the listing.
 */

export interface BranchPhoto {
  src: string;
  alt: string;
  /** Tall photos take a taller tile in the gallery. */
  tall?: boolean;
}

export const BRANCH_PHOTOS: Record<BranchId, BranchPhoto[]> = {
  main: [
    { src: "/images/gallery/room-gold-marble.jpg", alt: "Massage bed with towel swans and rose petals", tall: true },
    { src: "/images/gallery/buddha-nook.jpg", alt: "Buddha nook with warm ambient lighting", tall: true },
    { src: "/images/gallery/room-marble.jpg", alt: "Massage room with steam shower and marble walls", tall: true },
    { src: "/images/gallery/lounge.jpg", alt: "Relaxing waiting lounge" },
    { src: "/images/gallery/steam-shower.jpg", alt: "Steam shower cabin in a private treatment room", tall: true },
    { src: "/images/gallery/towel-swans.jpg", alt: "Towel swans with roses on a massage bed", tall: true },
    { src: "/images/gallery/room-wood-bed.jpg", alt: "Massage room with a wooden bed and steam shower", tall: true },
    { src: "/images/gallery/salon.jpg", alt: "Spa and wellness stations" },
    { src: "/images/gallery/room-blue.jpg", alt: "Massage room in blue mood lighting", tall: true },
    { src: "/images/gallery/towel-fan.jpg", alt: "Folded towel and rose petals on a massage bed" },
    { src: "/images/gallery/steam-cabin.jpg", alt: "Steam shower cabin with ambient lighting" },
    { src: "/images/gallery/exterior.jpg", alt: "Spa entrance and welcoming exterior" },
  ],
};

export interface GuestReview {
  name: string;
  branch: BranchId;
  /** As shown on the listing, e.g. "06 May 2025". */
  date: string;
  text: string;
  tag?: string;
  category?: "hygiene" | "service" | "value";
  rating?: number;
}

export const GUEST_REVIEWS: GuestReview[] = [
  {
    name: "Nikunj",
    branch: "main",
    date: "28 Oct 2026",
    tag: "Clean Equipment & Safe",
    category: "hygiene",
    rating: 5,
    text: "The Empire Spa is a lovely place! The equipment is clean, which makes me feel safe. They have great offers that save money. The staff is always polite and friendly, making me feel welcome. Prices are reasonable, so I can visit often. The experienced staff knows what they are doing and gives good advice. I really enjoy my time there!",
  },
  {
    name: "SACHIN",
    branch: "main",
    date: "28 Oct 2026",
    tag: "Highly Professional Staff",
    category: "service",
    rating: 5,
    text: "My experience at The Empire Spa was nothing short of excellent. The highly professional staff made me feel welcomed and valued from the moment I walked in. Their expertise shone through in every treatment, delivering outstanding results that exceeded my expectations. I left feeling rejuvenated and pampered, eager to return for more exceptional care!",
  },
  {
    name: "Gita Koli",
    branch: "main",
    date: "23 Oct 2026",
    tag: "Great Value & Pampering",
    category: "value",
    rating: 5,
    text: "My experience at The Empire Spa was exceptional! The staff were incredibly polite and attentive, making me feel welcome from the moment I walked in. The services offered were reasonably priced, providing great value for the quality of treatments. I left feeling rejuvenated and pampered, eager to return for another visit. Highly recommended!",
  },
  {
    name: "Ganesh PAWAR",
    branch: "main",
    date: "17 Oct 2026",
    tag: "Relaxing Ambience",
    category: "service",
    rating: 5,
    text: "I had a great time at The Empire Spa! The staff were very polite and kind. They made me feel welcome and comfortable. I loved the beauty services they offered. Everyone was happy to help and answer my questions. The atmosphere was nice and relaxing. I will come back again for sure! Thank you, Empire Spa!",
  },
  {
    name: "Muzammmil",
    branch: "main",
    date: "14 Oct 2026",
    tag: "Quick Confirmation & Reliable",
    category: "service",
    rating: 5,
    text: "I had a great experience at The Empire Spa! Their service is very reliable, and I got a quick confirmation for my appointment. The staff was friendly and made me feel comfortable. My treatment was excellent, and I left feeling relaxed and happy. I will come back again for sure! Highly recommend this spa for anyone looking for good service!",
  },
  {
    name: "DESAI",
    branch: "main",
    date: "28 Oct 2026",
    tag: "Knowledgeable Guidance",
    category: "service",
    rating: 5,
    text: "I recently visited The Empire Spa and was really impressed! The staff there are very knowledgeable about all the beauty treatments. They answered all my questions and helped me choose the best services for my needs. Their expertise made me feel comfortable and confident during my visit. I highly recommend The Empire Spa for anyone looking for great service and advice!",
  },
  {
    name: "Ganesh Kaspate",
    branch: "main",
    date: "28 Oct 2026",
    tag: "Reasonably Priced",
    category: "value",
    rating: 5,
    text: "I had a great time at The Empire Spa! The services are excellent and very good. I felt relaxed and happy. The prices are also reasonably priced, which is nice. I got a lovely massage and a facial, and it didn't cost too much. The staff is friendly and helpful. I will come back again for sure! Highly recommend this spa!",
  },
  {
    name: "Bunny",
    branch: "main",
    date: "25 Oct 2026",
    tag: "Personalized Care",
    category: "service",
    rating: 5,
    text: "My visit to The Empire Spa was exceptional! The experienced staff provided personalized treatments that catered to my needs. Their professionalism was evident in every detail, from the serene ambiance to their expert techniques. I left feeling rejuvenated and pampered. Highly recommend for anyone seeking top-notch beauty and personal care services!",
  },
  {
    name: "Rahul Vhanji",
    branch: "main",
    date: "14 Oct 2026",
    tag: "Pristine Environment",
    category: "hygiene",
    rating: 5,
    text: "My experience at The Empire Spa was exceptional! The clean equipment and hygienic salon instantly put me at ease. The staff was professional and attentive, ensuring a rejuvenating experience. After my treatment, I felt revitalized and refreshed. I highly recommend this spa for anyone seeking top-notch beauty and personal care services in a pristine environment!",
  },
  {
    name: "Gk",
    branch: "main",
    date: "05 Feb 2026",
    tag: "Super Hygienic",
    category: "hygiene",
    rating: 5,
    text: "I recently visited The Empire Spa, and I had an excellent experience! The equipment was very clean, which made me feel safe and comfortable. The prices are reasonable, making it affordable for everyone. The salon is super hygienic, and you can tell they care about their customers. Plus, they have great offers that make the services even better! Highly recommend!",
  },
];
