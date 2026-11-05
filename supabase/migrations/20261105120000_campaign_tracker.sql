/*
  # Campaign tracker (replaces Phel_arts_campaign_tracker.html)

  1. campaign_items: ads, tasks and weekly routines, grouped by campaign.
  2. campaign_steps: the checklist for each item.
  3. Seed: 10 rebrand launch ads (from the ad briefs), 2 animation ads
     ("30 Million", "Evidence"), and the 90-day growth plan tasks.
  4. Daily reminder: pg_cron calls the `campaign-reminders` Edge Function at
     07:00 UTC (08:00 Lagos), using the existing Vault secret.

  Admin-only (phelarts@gmail.com). Requires 20261101140000_crm_and_followups.sql.
  Safe to run more than once: seed rows are keyed by slug and never overwritten.
*/

CREATE TABLE IF NOT EXISTS public.campaign_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  campaign text NOT NULL,
  grp text,
  kind text NOT NULL DEFAULT 'task' CHECK (kind IN ('ad','task','routine')),
  sort_order int NOT NULL DEFAULT 0,
  title text NOT NULL,
  format text,
  headline text,
  caption text,
  cta text,
  details text,
  due_date date,
  notes text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.campaign_steps (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  item_id uuid NOT NULL REFERENCES public.campaign_items(id) ON DELETE CASCADE,
  sort_order int NOT NULL DEFAULT 0,
  label text NOT NULL,
  done boolean NOT NULL DEFAULT false,
  done_at timestamptz,
  UNIQUE (item_id, sort_order)
);

ALTER TABLE public.campaign_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.campaign_steps ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON public.campaign_items, public.campaign_steps FROM anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.campaign_items, public.campaign_steps TO authenticated;

DROP POLICY IF EXISTS "Phel Arts admin can manage campaign items" ON public.campaign_items;
CREATE POLICY "Phel Arts admin can manage campaign items" ON public.campaign_items
  FOR ALL TO authenticated
  USING (lower(auth.jwt() ->> 'email') = 'phelarts@gmail.com')
  WITH CHECK (lower(auth.jwt() ->> 'email') = 'phelarts@gmail.com');

DROP POLICY IF EXISTS "Phel Arts admin can manage campaign steps" ON public.campaign_steps;
CREATE POLICY "Phel Arts admin can manage campaign steps" ON public.campaign_steps
  FOR ALL TO authenticated
  USING (lower(auth.jwt() ->> 'email') = 'phelarts@gmail.com')
  WITH CHECK (lower(auth.jwt() ->> 'email') = 'phelarts@gmail.com');

-- Seed helper (dropped at the end) --------------------------------------------
CREATE OR REPLACE FUNCTION pg_temp.seed_item(
  p_slug text, p_campaign text, p_grp text, p_kind text, p_sort int, p_title text,
  p_format text, p_headline text, p_caption text, p_cta text, p_details text, p_steps text[]
) RETURNS void LANGUAGE plpgsql AS $$
DECLARE
  v_id uuid;
  i int;
BEGIN
  INSERT INTO public.campaign_items (slug, campaign, grp, kind, sort_order, title, format, headline, caption, cta, details)
  VALUES (p_slug, p_campaign, p_grp, p_kind, p_sort, p_title, p_format, p_headline, p_caption, p_cta, p_details)
  ON CONFLICT (slug) DO NOTHING
  RETURNING id INTO v_id;

  IF v_id IS NULL THEN RETURN; END IF; -- already seeded; keep the admin's progress

  IF p_steps IS NOT NULL THEN
    FOR i IN 1 .. array_length(p_steps, 1) LOOP
      INSERT INTO public.campaign_steps (item_id, sort_order, label) VALUES (v_id, i, p_steps[i]);
    END LOOP;
  END IF;
END;
$$;

-- 1. Rebrand launch ads (from Phel_Arts_Rebrand_Ad_Briefs.docx) -------------------
DO $$
DECLARE
  ad_steps text[] := ARRAY['Copy approved','Visuals / footage ready','Edit complete','Scheduled','Published'];
  c text := 'Rebrand Launch Ads';
BEGIN
  PERFORM pg_temp.seed_item('ad-01-the-reveal', c, NULL, 'ad', 1, 'The Reveal', 'Reel / Feed Video',
    'We didn''t just change our look. We changed how we move you.',
    'Phel Arts has evolved. New identity, same obsession with stories that connect. Visual Stories. Real Connections.',
    'DM us to bring your brand to life.',
    'Visual: Old flame logo dissolves into the new teal leaf-comma + orange wordmark.', ad_steps);

  PERFORM pg_temp.seed_item('ad-02-motion-graphics', c, NULL, 'ad', 2, 'Motion Graphics Spotlight', 'Carousel (before/after or static)',
    'Your message, in motion.',
    'From product explainers to brand intros, we turn ideas into motion that sticks. Motion Graphics by Phel Arts.',
    'Ready to move your audience? DM "MOTION."',
    E'Visual: Clean motion graphics reel: kinetic text, brand explainer clips.\n\nVoiceover: A great idea means nothing if nobody stops to notice it. Your product. Your brand. Your story. They deserve more than static screens and forgettable visuals. We turn ideas into motion that captures attention, explains clearly, and stays with your audience. From product explainers to brand intros, this is motion graphics by Phel Arts. Ready to move your audience? DM "MOTION."', ad_steps);

  PERFORM pg_temp.seed_item('ad-03-2d-animation', c, NULL, 'ad', 3, '2D Animation Showcase', 'Reel',
    'From sketch to screen, we animate your story.',
    '2D Animation with heart, precision, and personality, built for brands who want to be remembered.',
    'Let''s animate your next campaign.',
    'Visual: Character animation loop / sketch-to-screen timelapse.', ad_steps);

  PERFORM pg_temp.seed_item('ad-04-videography', c, NULL, 'ad', 4, 'Videography Feature', 'Feed Video / Reel',
    'Real stories. Real footage. Real connections.',
    'Our videography captures more than moments; it captures meaning. Brand films, documentaries, campaigns.',
    'Book a shoot with Phel Arts.',
    'Visual: Behind-the-scenes camera work, cinematic lighting, real production footage.', ad_steps);

  PERFORM pg_temp.seed_item('ad-05-video-editing', c, NULL, 'ad', 5, 'Video Editing Precision', 'Carousel (raw vs. edited split)',
    'The story is in the edit.',
    'Great footage becomes great storytelling in the cut. Precise, emotional, seamless editing: every frame earns its place.',
    'Send us your footage. We''ll tell the story.',
    'Visual: Side-by-side raw footage vs. final edit.', ad_steps);

  PERFORM pg_temp.seed_item('ad-06-brand-transformation', c, NULL, 'ad', 6, 'Brand Transformation Story', 'Reel',
    'This is what growth looks like.',
    'New name energy, same commitment to visual storytelling that connects people. Welcome to the new Phel Arts.',
    'Follow the journey.',
    'Visual: Old logo cracking/glitching into new logo, muted colours bursting into brand palette.', ad_steps);

  PERFORM pg_temp.seed_item('ad-07-client-testimonial', c, NULL, 'ad', 7, 'Client Testimonial', 'Reel / Static Quote Card',
    '"They didn''t just design a video; they told our story."',
    'This is why we do what we do. Real brands, real results, real connections.',
    'Your story could be next. DM us.',
    'Visual: Client clip or quote overlay on brand-coloured background. Use a real client quote with their permission.', ad_steps);

  PERFORM pg_temp.seed_item('ad-08-services-overview', c, NULL, 'ad', 8, 'Services Overview', 'Carousel (4 slides)',
    'Four ways we bring your brand to life.',
    'Videography. Motion Graphics. 2D Animation. Video Editing. Whatever your story needs, we''ve got the craft for it.',
    'Swipe to see what fits your brand.',
    'Visual: Icon or clip per slide: Videography, Motion Graphics, 2D Animation, Video Editing.', ad_steps);

  PERFORM pg_temp.seed_item('ad-09-launch-offer', c, NULL, 'ad', 9, 'Launch Offer', 'Static / Motion Poster',
    'We''re celebrating our rebrand, and you''re invited.',
    'Launch week special: book a free consult and discover how we can bring your next project to life.',
    'DM "LAUNCH" to claim your free consult.',
    'Visual: Bold brand-coloured background, offer text centre stage, new logo lockup.', ad_steps);

  PERFORM pg_temp.seed_item('ad-10-emotional-promise', c, NULL, 'ad', 10, 'Emotional Brand Promise', 'Reel (closing/CTA)',
    'Your audience doesn''t just want to watch. They want to feel something.',
    'That''s where we come in. Phel Arts: Visual Stories. Real Connections.',
    'Let''s create yours. Visit us at www.phelarts.com',
    'Visual: Audience reacting to visuals, soft lighting, logo animates in at the end.', ad_steps);
END;
$$;

-- 2. Animation ads (from the two VO scripts) -----------------------------------
DO $$
DECLARE
  anim_steps text[] := ARRAY['Script approved','Voiceover recorded','Animation complete','Sound design and mix','Exported 16:9, 9:16 and 1:1','Scheduled','Published'];
  c text := 'Animation Ads';
BEGIN
  PERFORM pg_temp.seed_item('anim-30-million', c, NULL, 'ad', 1, '"30 Million"', 'Animation, ~45 to 50s (16:9, 9:16, 1:1)',
    'Every single day... you wake up to 30 million naira.',
    'Turn today''s 30 million into something that lasts. Into a story. A brand. A dream, finally moving.',
    'Let''s help you convert it. Send us a DM and start building today. www.phelarts.com',
    E'Tone: Reflective, then urgent, then empowering. Purpose: promote daily action and drive DMs.\n\nScenes: 0:00 The Reveal (vault, cash particles form 30,000,000) / 0:08 The Waste (clock, cash to dust) / 0:18 The Turn (dust reverses into sunrise) / 0:30 The Call (currency morphs into creative tools, teal/orange bloom) / 0:42 Close (Phel Arts logo, CTA).\n\nStyle: cinematic symbolic motion graphics. Colour: muted gold/grey to sunrise to teal and orange. Sound: ambient intro, rising synth swell, closing chime on logo. VO: warm, grounded, conversational, not hard-sell.', anim_steps);

  PERFORM pg_temp.seed_item('anim-evidence', c, NULL, 'ad', 2, '"Evidence"', 'Animation, ~50 to 55s (16:9, 9:16, 1:1)',
    'Every vision starts as something only you can see.',
    'Emotional brand story about perseverance and vision.',
    'Let''s help you grow yours. www.phelarts.com. Let''s bring your vision to life.',
    E'Tone: Introspective, then determined, then triumphant. Purpose: emotional brand storytelling that drives DMs.\n\nScenes: 0:00 The Spark (seed of light in cupped hands) / 0:08 The Hiding (light tucked into a backpack) / 0:16 The Awakening (seed planted and watered) / 0:26 The Struggle (time-lapse, no sprout) / 0:36 The Reimagining (vision sharper) / 0:45 Bloom + CTA (sprout grows into the Phel Arts leaf-comma logo).\n\nStyle: intimate, symbolic, organic growth motifs. Colour: desaturated dark to warm dawn to teal and orange. Sound: sparse piano, tension under "no results", hopeful strings into the bloom. VO: first person, quiet conviction, never shouted.', anim_steps);
END;
$$;

-- 3. 90-day growth plan (from Phel_Arts_3M_Growth_and_Investment_Plan_Main.docx) --
DO $$
DECLARE
  done_step text[] := ARRAY['Done'];
  c text := '90-Day Growth Plan';
BEGIN
  PERFORM pg_temp.seed_item('gp-setup-separate-accounts', c, 'Setup', 'task', 1, 'Separate investment, business and personal money', NULL, NULL, NULL, NULL,
    'Capital protection rule: keep investment funds, business operating funds and personal spending in separate accounts.', done_step);
  PERFORM pg_temp.seed_item('gp-setup-reserve', c, 'Setup', 'task', 2, 'Set aside the ₦500,000 cash reserve', NULL, NULL, NULL, NULL,
    'For unexpected costs and cash-flow gaps only, not routine spending.', done_step);
  PERFORM pg_temp.seed_item('gp-setup-investments', c, 'Setup', 'task', 3, 'Verify providers, then place the ₦1,000,000 investment allocation', NULL, NULL, NULL, NULL,
    'Plan: ₦600,000 regulated money market fund, ₦400,000 short-term Treasury bills. First check regulatory status, fees, redemption terms and current yields.', done_step);

  PERFORM pg_temp.seed_item('gp-m1-website-portfolio', c, 'Month 1: Prepare and sell', 'task', 10, 'Finish the website and portfolio with the strongest existing work', NULL, NULL, NULL, NULL,
    'Budget: up to ₦200,000 released in Month 1. Includes showreel, case studies and enquiry path.', done_step);
  PERFORM pg_temp.seed_item('gp-m1-six-examples', c, 'Month 1: Prepare and sell', 'task', 11, 'Prepare six portfolio examples', NULL, NULL, NULL, NULL,
    'Motion graphics, interviews, documentaries, promotional videos, social content and graphic design.', done_step);
  PERFORM pg_temp.seed_item('gp-m1-100-prospects', c, 'Month 1: Prepare and sell', 'task', 12, 'Build a list of 100 prospects with the right contact person', NULL, NULL, NULL, NULL,
    'Previous clients, NGOs and foundations, corporate and SME clients, referral partners.', done_step);
  PERFORM pg_temp.seed_item('gp-m1-close-projects', c, 'Month 1: Prepare and sell', 'task', 13, 'Close one or two projects', NULL, NULL, NULL, NULL,
    'Revenue target: ₦250,000 to ₦500,000.', done_step);

  PERFORM pg_temp.seed_item('gp-m2-follow-up', c, 'Month 2: Convert and retain', 'task', 20, 'Follow up with prospects from Month 1', NULL, NULL, NULL, NULL,
    'Additional release: up to ₦300,000 (only with a clear business reason). Revenue target: ₦500,000 to ₦750,000.', done_step);
  PERFORM pg_temp.seed_item('gp-m2-testimonials', c, 'Month 2: Convert and retain', 'task', 21, 'Turn completed projects into testimonials and case studies', NULL, NULL, NULL, NULL,
    'Also feeds the Client Testimonial ad.', done_step);
  PERFORM pg_temp.seed_item('gp-m2-retainer-offer', c, 'Month 2: Convert and retain', 'task', 22, 'Offer satisfied clients a monthly creative retainer', NULL, NULL, NULL, NULL,
    'Test ₦250,000 to ₦350,000 per month for a defined volume of edits, graphics and content support.', done_step);
  PERFORM pg_temp.seed_item('gp-m2-referral-partners', c, 'Month 2: Convert and retain', 'task', 23, 'Build referral partnerships', NULL, NULL, NULL, NULL,
    'PR agencies, event planners, photographers and marketing consultants.', done_step);

  PERFORM pg_temp.seed_item('gp-m3-project-volume', c, 'Month 3: Repeat and scale', 'task', 30, 'Reach three to four project-equivalents per month', NULL, NULL, NULL, NULL,
    'Additional release: up to ₦500,000 (conditional). Revenue target: ₦750,000 to ₦1,000,000.', done_step);
  PERFORM pg_temp.seed_item('gp-m3-recurring-clients', c, 'Month 3: Repeat and scale', 'task', 31, 'Secure one or two recurring clients', NULL, NULL, NULL, NULL, NULL, done_step);
  PERFORM pg_temp.seed_item('gp-m3-margin-review', c, 'Month 3: Repeat and scale', 'task', 32, 'Review which services have the best margins and shortest sales cycles', NULL, NULL, NULL, NULL,
    'Buy equipment only when confirmed demand supports it. Keep unneeded growth capital.', done_step);

  PERFORM pg_temp.seed_item('gp-routine-prospects', c, 'Weekly routines', 'routine', 40, 'Contact 20+ qualified prospects', NULL, NULL, NULL, NULL,
    'Include previous freelance clients. Aim for 2 to 3+ sales conversations and 2+ proposals each week.', NULL);
  PERFORM pg_temp.seed_item('gp-routine-dashboard', c, 'Weekly routines', 'routine', 41, 'Friday: review the weekly performance dashboard', NULL, NULL, NULL, NULL,
    'Prospects contacted, conversations, proposals, projects won (value and deposit), cash collected, profit per project, recurring clients.', NULL);
  PERFORM pg_temp.seed_item('gp-routine-monthly-review', c, 'Weekly routines', 'routine', 42, 'Every 30 days: review the plan before releasing more capital', NULL, NULL, NULL, NULL, NULL, NULL);
  PERFORM pg_temp.seed_item('gp-ref-offers', c, 'Weekly routines', 'routine', 43, 'Campaign offers to sell (separate from website pricing)', NULL, NULL, NULL, NULL,
    E'Motion Stories: from ₦200,000 ($250). Short branded motion ad with agreed deliverables, revision limits and timeline.\nCorporate storytelling and video production: ₦250,000+ per project.\nMonthly creative retainer: test ₦250,000 to ₦350,000 per month.\nConfirm scope, deliverables, revisions, timeline and payment terms in writing before accepting a project.', NULL);
END;
$$;

-- 4. Daily reminder job ---------------------------------------------------------
SELECT cron.schedule(
  'campaign-daily-reminders',
  '0 7 * * *',
  $cron$
  SELECT net.http_post(
    url := 'https://gnvcvidmnjykarvssrhl.supabase.co/functions/v1/campaign-reminders',
    body := '{}'::jsonb,
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'x-cron-secret', (SELECT decrypted_secret FROM vault.decrypted_secrets WHERE name = 'crm_cron_secret')
    ),
    timeout_milliseconds := 60000
  );
  $cron$
);
