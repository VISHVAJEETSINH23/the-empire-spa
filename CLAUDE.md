# The Empire Spa

Booking site for The Empire Spa (one branch). Copied from the Alexa Spa project at `E:\Projects\Active\SPA 2`; keep the two separate.

## Working with the owner of this project
- Reply in simple Hinglish.
- Owner alerts are dashboard only. No Telegram or other bot alerts.
- Razorpay comes later. Flow for now: guest books, admin checks the slot, Confirm opens a WhatsApp message to the guest.
- Commit and deploy only when asked.

## State
- Stack: Next.js 16, Supabase, Vercel. No git repo or Vercel project yet.
- Supabase project: `empire-spa-production` (`fmrmkwqawghsqddfurvs`, ap-south-1), in the same org as Alexa. Migrations are applied; 3 rooms.
- `.env.local` has everything except `SUPABASE_SECRET_KEY`, which the owner pastes in. Admin password: `_private/ADMIN-PASSWORD.txt`. Never print secrets.
- Branch id is `main`; booking references start with `EMP-`.
- Design follows Alexa exactly on the owner's request (31 Oct 2026): navbar and services page are copied from Alexa. Only Empire's name, contact, reviews, gallery and the Couple Suite section differ.
- Hero: 754 frames from `clients/THE EMPIRE SPA 2/Video Project 9.mp4` (24 fps). `public/frames` is 1440 wide, `public/frames/m` a portrait crop. Rebuild with `scripts/extract-frames.mjs`.

## Next
1. End-to-end test passed 31 Oct 2026. Test rows named `TEST Claude ignore` and `E2E Browser Test` are still in `bookings`; the owner removes them.
2. Deploy to a new Vercel project when the owner says so, with its env vars and `NEXT_PUBLIC_SITE_URL`.

## Placeholders to replace before launch
- `lib/branches.ts`: exact map pin (now a Google search link). Phone, address, hours and rating are from Justdial (31 Oct 2026).
- Logo, `app/icon.png`, `app/apple-icon.png`.
- Gallery stills (from the film), and the menu, suite and couple media carried over from Alexa. Real spa photos are still needed.
- Prices are Alexa's, unconfirmed; Justdial only gives ranges. Services in `MORE_SERVICES` need a price and length to become bookable.
- Not on Justdial, owner to confirm: attached hot shower (`lib/therapyDetails.ts`), jacuzzi, body scrub, signature massage.
- Reviews are real, copied word for word from Justdial.
- The film shows a small watermark in one corner.
