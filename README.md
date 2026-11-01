# phelarts.com

Website for Phel Arts. React + Vite + Tailwind, hosted on Netlify, data in Supabase.

## Local development

1. `npm install`
2. Create a `.env` file:
   ```
   VITE_SUPABASE_URL=https://<project-ref>.supabase.co
   VITE_SUPABASE_ANON_KEY=<publishable key>
   ```
3. `npm run dev`

## Hosting (Netlify)

- Netlify builds from the `main` branch on GitHub (`npm run build`, publish `dist`).
- The two `VITE_SUPABASE_*` variables above are set in Netlify under Site configuration → Environment variables.
- `public/_redirects` sends every path to `index.html` so direct links like `/admin` work.

## Database (Supabase)

- Tables: `bookings` and `inquiries` (public forms insert), `newsletter_subscribers` (via the `subscribe_to_newsletter` function), `projects` (admin only).
- Only the Supabase Auth user `phelarts@gmail.com` can read or manage submissions; this is enforced by row level security.
- SQL changes live in `supabase/migrations/`. Run new files in the Supabase SQL Editor.

## Pricing

All prices live in `src/config/pricing.ts`. The Pricing, Services and AI Videos pages read from it.
