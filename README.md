# Municipality of Taal — Next.js implementation

React + Next.js (App Router) + MongoDB, ported from the HTML design in
`Taal Municipality Website.dc.html`. Object storage for PDF forms is Cloudflare R2,
but it is optional — see *Forms* below.

---

# 🌐 Live Demo

https://taal-4s1qa8esq-ajbalagas-projects.vercel.app

---

## Quick start

```bash
npm install
cp .env.example .env.local     # fill in MONGODB_URI and ADMIN_TOKEN
node --env-file=.env.local scripts/seed.mjs
npm run dev
```

Then copy the design's photographs into `public/images/` (see the README there).
The site renders without MongoDB — every data read falls back to the seeded arrays
in `lib/data.js` — so you can run `npm run dev` before touching the database.

## Routes

| Route | Rendering | Source of truth |
|---|---|---|
| `/` | static, revalidate 300s | `lib/data.js` + announcements from Mongo |
| `/services` | static, `?q=` filter | `lib/data.js` |
| `/announcements` | static, revalidate 120s, `?cat=` filter | Mongo `announcements` |
| `/offices` | static | `lib/data.js` |
| `/officials` | static | `lib/data.js` |
| `/tourism` | static | `lib/data.js` |
| `/contact` | static shell + client form | posts to `/api/requests` |

Navigation is real routing, so every page is linkable, bookmarkable and indexable —
the main reason to move off the single-file prototype.

## API

- `POST /api/requests` — public. Validates, stores in `serviceRequests`, returns `{ reference }` (e.g. `TAAL-2026-4821`).
- `GET /api/requests` — admin. The staff inbox.
- `GET /api/announcements?cat=` — public read.
- `POST /api/announcements` — admin. Publish a notice.
- `POST /api/forms/upload` — admin. Returns a presigned R2 URL; the browser PUTs the PDF directly.

Admin endpoints check a shared secret (`ADMIN_TOKEN`) via `Authorization: Bearer …`
or an `admin_token` cookie. **Replace `lib/auth.js` with NextAuth or Clerk before
production** — one shared password is fine for a school project, not for a real LGU.

## Collections

```
announcements    { title, blurb, tag, cat, source, date, publishedAt }
serviceRequests  { reference, name, barangay, contact, topic, message, status, createdAt }
forms            { name, meta, key | href, updatedAt }
```

Indexes are created by `scripts/seed.mjs`. Offices, officials, barangays and
tourism sites stay in `lib/data.js` — they change once every three years, so a
database would add operational cost for nothing.

## Forms & Cloudflare R2

Right now the download links point at `/public/forms/*.pdf`: served free from the
host CDN, versioned in git, zero credentials. Keep it that way until staff need to
publish a form without a deploy.

When that day comes: create an R2 bucket, fill the `R2_*` variables, and
`POST /api/forms/upload`. R2 gives 10 GB and 1M writes free with **no egress fees**,
and it speaks the S3 API — so `@aws-sdk/client-s3` works unchanged and a later move
to S3 is an endpoint swap.

## Styling

Inline style objects with tokens in `lib/theme.js`, mirroring the design exactly.
Fonts come from `next/font/google` (Spectral, Source Sans 3, IBM Plex Mono) so
they self-host at build time. If your team prefers Tailwind, the palette maps
straight onto a theme extension — the token names in `lib/theme.js` are the keys.

Palette: ivory `#FBF6EC` · paper `#FDF8F0` · cream `#F1E6D0` · ink `#33251A` ·
terracotta `#A8482C` · gold-on-light `#7E5F21`.

## Before launch

1. **Photo rights.** The house-museum and side-street photos are hotlinked from
   taal.ph and The Shoestring Diaries with credit. Fine for a school project;
   licence them or shoot replacements for a real site.
2. **Real auth** for `/api` writes and an admin UI for posting announcements.
3. **Email notification** on new service requests (`TODO` in `app/api/requests/route.js`).
4. **Verify the data** in `lib/data.js` — fees, processing times and the councilor
   roster came from public pages and should be confirmed by each office.
5. **Rate-limit** `POST /api/requests` (Upstash or Vercel KV) before it is public.
6. Add `sitemap.js` and `robots.js`, and the municipal seal as `favicon.ico`.

## Deploy

Vercel free tier + MongoDB Atlas M0 covers this site at zero cost. Set the
`.env.local` variables in the Vercel dashboard and allow Atlas network access
from `0.0.0.0/0` (or Vercel's ranges).
