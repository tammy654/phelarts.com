import Anthropic from 'npm:@anthropic-ai/sdk@1.3.0';
import { SITE_URL } from './common.ts';
import { aiClient, friendlyAiError } from './ai.ts';

const MODEL = 'claude-opus-5-5';

const SYSTEM_PROMPT = `You are the social media writer for Phel Arts, a creative studio in Nigeria. Phel Arts makes 2D animation, motion graphics, video production and AI videos (AI-assisted visuals with human creative direction, delivered fast) for brands, startups and businesses.

What we can say about the studio:
- Four services: 2D Animation, Motion Graphics, Video Production, AI Videos.
- Process: Discovery, Concept (scripts and storyboards), Production, Delivery.
- AI Videos keep a human creative director in charge: scripts and storyboards are approved before generation, and final edits are done by the team.
- Free 30-minute consultation: ${SITE_URL}/book-call. Packages: ${SITE_URL}/pricing. Work: ${SITE_URL}/our-work.

Audience: Nigerian and international business owners, marketers and founders who need video content that explains, sells or builds their brand.

Voice: confident, warm, clear and creative. Plain English. Sound like a skilled studio, not an ad agency cliché. Up to 2 emojis per post, only where natural.

Hard rules:
- Never invent clients, projects, results, statistics, awards or testimonials. Only mention a specific client or project if it appears in the admin's brief.
- Never state or estimate prices or discounts unless the exact offer is written in the admin's brief. Otherwise point to the pricing page or invite a free consultation.
- Each post has one idea and one call to action.
- Vary the content pillars across the batch: service spotlight, AI videos, behind the scenes / process, tips for brands about video, and a direct invitation to work with us.
- Do not repeat ideas from the recent posts list.

Format for each post:
- facebook_text: 40 to 120 words. Can include one link to phelarts.com (a full URL).
- instagram_caption: strong first line (the hook), 50 to 150 words, no URLs (say "link in bio" instead). Do not put hashtags in the caption.
- hashtags: 8 to 15 relevant hashtags, mixing broad (e.g. #motiongraphics) and local (e.g. #lagosbusiness, #nigeriabrands). Each starts with #.
- visual_idea: one or two sentences describing the image, carousel or short video to post with it, specific enough for a designer to make.
- pillar: the content pillar used.
- post_date: copy the date you were given for that post.`;

const POSTS_SCHEMA = {
  type: 'object',
  properties: {
    posts: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          post_date: { type: 'string' },
          pillar: { type: 'string' },
          facebook_text: { type: 'string' },
          instagram_caption: { type: 'string' },
          hashtags: { type: 'array', items: { type: 'string' } },
          visual_idea: { type: 'string' },
        },
        required: ['post_date', 'pillar', 'facebook_text', 'instagram_caption', 'hashtags', 'visual_idea'],
        additionalProperties: false,
      },
    },
  },
  required: ['posts'],
  additionalProperties: false,
};

export interface SocialPostDraft {
  post_date: string;
  pillar: string;
  facebook_text: string;
  instagram_caption: string;
  hashtags: string[];
  visual_idea: string;
}

export async function draftSocialPosts(opts: {
  dates: string[];
  brief: string;
  theme?: string;
  recent: string[];
}): Promise<SocialPostDraft[]> {
  const client = aiClient();

  const userPrompt = [
    `Write ${opts.dates.length} social media post${opts.dates.length === 1 ? '' : 's'}, one for each of these dates: ${opts.dates.join(', ')}.`,
    opts.theme?.trim() ? `Theme for this batch, requested by the admin: ${opts.theme.trim()}` : 'No special theme this time: mix the content pillars.',
    '',
    opts.brief.trim()
      ? `The admin's brief (current offers, real projects you may mention, events). Use it:\n<brief>\n${opts.brief.trim()}\n</brief>`
      : 'The admin has not written a brief, so do not mention any specific clients, projects or offers.',
    '',
    opts.recent.length
      ? `Recent posts (do not repeat these ideas):\n<recent>\n${opts.recent.map((r) => `- ${r}`).join('\n')}\n</recent>`
      : 'There are no recent posts.',
  ].join('\n');

  let response: Anthropic.Beta.BetaMessage;
  try {
    response = (await client.beta.messages.create({
      model: MODEL,
      max_tokens: 16000,
      betas: ['server-side-fallback-2026-07-01'],
      fallbacks: 'default',
      output_config: {
        effort: 'medium',
        format: { type: 'json_schema', schema: POSTS_SCHEMA },
      },
      system: SYSTEM_PROMPT,
      messages: [{ role: 'user', content: userPrompt }],
    } as unknown as Anthropic.Beta.MessageCreateParamsNonStreaming)) as Anthropic.Beta.BetaMessage;
  } catch (err) {
    console.error('Anthropic request failed:', err);
    throw new Error(friendlyAiError(err));
  }

  if (response.stop_reason === 'refusal') throw new Error('The AI declined to write these posts.');
  if (response.stop_reason === 'max_tokens') throw new Error('The AI ran out of room. Try fewer posts.');

  const text = response.content
    .filter((b): b is Anthropic.Beta.BetaTextBlock => b.type === 'text')
    .map((b) => b.text)
    .join('');
  const parsed = JSON.parse(text) as { posts?: SocialPostDraft[] };
  const posts = (parsed.posts ?? []).filter((p) => p.facebook_text?.trim() && p.instagram_caption?.trim());
  if (posts.length === 0) throw new Error('The AI returned no posts.');
  return posts;
}
