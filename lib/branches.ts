/**
 * The Empire Spa. Safe for the browser: nothing here is secret.
 *
 * Details are from the Justdial listing (31 Oct 2026). Anything left null is
 * hidden on the site.
 */

export const BRAND = {
  name: "The Empire Spa",
  fullName: "The Empire Spa",
  tagline: "Luxury Massage & Spa",
};

export type BranchId = "main";

export interface Branch {
  id: BranchId;
  name: string;
  city: string;
  /** Short prefix on booking references: EMP-4F2K9C. */
  refPrefix: string;
  /** Office number, 10 digits, no +91. */
  phone: string | null;
  /** WhatsApp number, 10 digits, no +91. */
  whatsapp: string | null;
  address: string | null;
  /** Google Maps link for "Get directions". */
  mapsUrl: string | null;
  /** Map position, for search engines. */
  geo: { lat: number; lng: number } | null;
  postalCode: string;
  /** Public rating, as shown on the listing it came from. */
  rating: { score: number; count: number; source: string; url: string } | null;
  /** Month and year the branch opened, e.g. "Nov 2023". */
  since: string | null;
  /** Closing time, 24-hour "HH:MM", India time. Hours as listed on Justdial. */
  closesAt: string;
}

export const BRANCHES: Record<BranchId, Branch> = {
  main: {
    id: "main",
    name: "The Empire Spa",
    city: "Kolhapur",
    refPrefix: "EMP",
    phone: "9035041358",
    whatsapp: "9035041358",
    address: "765 K/2/5, 2nd Floor, Near Raja Kaka Showroom, Opp. Naik and Company, Shahupuri, Kolhapur – 416001, Maharashtra",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=The+Empire+Spa+Shahupuri+Kolhapur",
    geo: null,
    postalCode: "416001",
    rating: {
      score: 4.8,
      count: 314,
      source: "Justdial",
      url: "https://www.justdial.com/Kolhapur/The-Empire-Spa-Near-Raja-Kaka-Showroom-Shahupuri/0231PX231-X231-260129154550-V5I5_BZDET",
    },
    since: null,
    closesAt: "21:00",
    },
};

export const BRANCH_LIST: Branch[] = [BRANCHES.main];

/** Facilities as listed on Justdial. */
export const AMENITIES = [
  "Air conditioned",
  "Steam room",
  "Couple room",
  "Parking available",
  "WiFi",
  "Waiting area",
  "Washrooms",
  "Open to women and men",
];

export function isBranchId(value: unknown): value is BranchId {
  return value === "main";
}

/** Open 7 days a week. 24-hour "HH:MM", India time. The closing time is on
    the branch. */
export const OPENS_AT = "10:00";

/** Start times a guest can pick. A slot is only offered when the chosen
    therapy finishes by the branch's closing time. */
export const SLOT_TIMES = ["10:30", "12:00", "14:00", "15:30", "17:00", "18:30", "20:00", "21:15"];

export function minutesOfDay(hhmm: string): number {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
}

export function slotFits(slot: string, therapyMinutes: number, branch: BranchId): boolean {
  return minutesOfDay(slot) + therapyMinutes <= minutesOfDay(BRANCHES[branch].closesAt);
}

/** "14:00" → "2:00 PM" */
export function formatSlot(hhmm: string): string {
  const [h, m] = hhmm.split(":").map(Number);
  const suffix = h >= 12 ? "PM" : "AM";
  const hour = h % 12 === 0 ? 12 : h % 12;
  return `${hour}:${String(m).padStart(2, "0")} ${suffix}`;
}

/** "10:00 AM – 8:00 PM" */
export function branchHours(branch: BranchId): string {
  return `${formatSlot(OPENS_AT)} – ${formatSlot(BRANCHES[branch].closesAt)}`;
}

/** How far ahead a guest may book. */
export const MAX_DAYS_AHEAD = 60;

/** A paid booking cancelled at least this long before its start is refunded
    in full. A business decision for the owner — the refund policy page and
    online cancellation both read it. */
export const CANCEL_HOURS = 4;
