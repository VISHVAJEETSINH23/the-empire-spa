import type { Metadata, Viewport } from "next";
import { headers } from "next/headers";
import { Cormorant_Garamond, Plus_Jakarta_Sans } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { BRANCH_LIST, OPENS_AT } from "@/lib/branches";
import { COMPLETE_SPA_DATA } from "@/lib/treatments";
import { SITE_URL } from "@/lib/site";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-serif",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-sans",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#07090b",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "The Empire Spa, Shahupuri, Kolhapur | Massage & Spa — Book Online",
  description:
    "The Empire Spa in Shahupuri, Kolhapur: Thai, aroma, deep tissue, Swedish, couple and four-hand massages. Steam room and couple room. Open 7 days, 10 AM to 9 PM. Book online.",
  keywords: [
    "The Empire Spa",
    "Spa in Kolhapur",
    "Massage in Shahupuri",
    "Thai Massage Kolhapur",
    "Deep Tissue Massage",
    "Couple Massage",
    "Aroma Massage",
  ],
  metadataBase: new URL(SITE_URL),
  openGraph: {
    title: "The Empire Spa, Shahupuri, Kolhapur",
    description: "Massages at The Empire Spa, Kolhapur. Book online in under a minute.",
    url: SITE_URL,
    siteName: "The Empire Spa",
    images: [
      {
        url: "/images/empire/exterior.jpg",
        width: 1920,
        height: 1080,
        alt: "The Empire Spa entrance at dusk",
      },
  ],
    locale: "en_IN",
    type: "website",
      },
  twitter: {
    card: "summary_large_image",
    title: "The Empire Spa, Shahupuri, Kolhapur",
    description: "Massages at The Empire Spa, Kolhapur. Book online in under a minute.",
    images: ["/images/empire/exterior.jpg"],
      },
};

const prices = COMPLETE_SPA_DATA.flatMap((t) => t.options.map((o) => o.price));

/** The spa as a local business, so Google can show it in local search and Maps. */
const structuredData = BRANCH_LIST.map((branch) => ({
  "@context": "https://schema.org",
  "@type": "DaySpa",
  "@id": `${SITE_URL}/#${branch.id}`,
  name: branch.name,
    url: SITE_URL,
  image: `${SITE_URL}/images/empire/exterior.jpg`,
  ...(branch.phone ? { telephone: `+91${branch.phone}` } : {}),
  ...(branch.address
    ? {
        address: {
          "@type": "PostalAddress",
          streetAddress: branch.address,
          addressLocality: branch.city,
          postalCode: branch.postalCode,
          addressRegion: "Maharashtra",
          addressCountry: "IN",
      },
      }
    : {}),
  ...(branch.geo ? { geo: { "@type": "GeoCoordinates", latitude: branch.geo.lat, longitude: branch.geo.lng } } : {}),
  ...(branch.mapsUrl ? { hasMap: branch.mapsUrl } : {}),
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    opens: OPENS_AT,
    closes: branch.closesAt,
      },
  priceRange: `₹${Math.min(...prices).toLocaleString("en-IN")} – ₹${Math.max(...prices).toLocaleString("en-IN")}`,
  currenciesAccepted: "INR",
}));

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Reading the request renders every page per request, so each gets its CSP nonce.
  await headers();

  return (
    <html lang="en" className={`${cormorant.variable} ${jakarta.variable}`}>
      <body className="bg-[#07090b] text-[#f7f4ee] font-sans antialiased overflow-x-hidden selection:bg-[#c5a880]/30 selection:text-[#f7f4ee]">
        <script
          type="application/ld+json"
          // JSON only, built from our own branch data; "<" is escaped so it can't close the tag.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }}
        />
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
      }
