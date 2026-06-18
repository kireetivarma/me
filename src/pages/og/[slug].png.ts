import type { APIRoute, GetStaticPaths } from 'astro';
import { getCollection } from 'astro:content';
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import { readFileSync } from 'fs';

// Liberation Sans TTF (system font, metrically compatible with Arial).
const fontRegular = readFileSync('/usr/share/fonts/truetype/liberation/LiberationSans-Regular.ttf');
const fontBold = readFileSync('/usr/share/fonts/truetype/liberation/LiberationSans-Bold.ttf');

export const getStaticPaths: GetStaticPaths = async () => {
  const work = await getCollection('work', ({ data }) => !data.draft);
  return work.map((entry) => ({ params: { slug: entry.id } }));
};

export const GET: APIRoute = async ({ params }) => {
  const work = await getCollection('work', ({ data }) => !data.draft);
  const entry = work.find((e) => e.id === params.slug);
  if (!entry) return new Response('Not found', { status: 404 });

  const { title, tagline, accent = '#f50514', categories } = entry.data;

  // Build the OG image layout as a plain JS object (Satori's React-like VNode format).
  const node = {
    type: 'div',
    props: {
      style: {
        width: '1200px',
        height: '630px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        background: '#0c0d11',
        fontFamily: 'sans-serif',
        padding: '64px',
        position: 'relative',
        overflow: 'hidden',
      },
      children: [
        // Accent wash — top-right radial glow
        {
          type: 'div',
          props: {
            style: {
              position: 'absolute',
              top: '-180px',
              right: '-180px',
              width: '600px',
              height: '600px',
              borderRadius: '50%',
              background: accent,
              opacity: 0.12,
              filter: 'blur(80px)',
            },
          },
        },
        // Accent accent line across the top
        {
          type: 'div',
          props: {
            style: {
              position: 'absolute',
              top: '0',
              left: '0',
              right: '0',
              height: '4px',
              background: accent,
            },
          },
        },

        // Top: categories
        {
          type: 'div',
          props: {
            style: { display: 'flex', gap: '10px', flexWrap: 'wrap' },
            children: categories.map((cat) => ({
              type: 'div',
              props: {
                style: {
                  padding: '5px 14px',
                  border: `1px solid ${accent}55`,
                  borderRadius: '999px',
                  fontSize: '18px',
                  color: accent,
                  letterSpacing: '0.04em',
                  fontWeight: '600',
                },
                children: cat,
              },
            })),
          },
        },

        // Middle: title + tagline
        {
          type: 'div',
          props: {
            style: { display: 'flex', flexDirection: 'column', gap: '20px', flex: 1, justifyContent: 'center' },
            children: [
              {
                type: 'div',
                props: {
                  style: {
                    fontSize: '64px',
                    fontWeight: '700',
                    color: '#f1f5f9',
                    lineHeight: '1.1',
                    letterSpacing: '-0.02em',
                    maxWidth: '900px',
                  },
                  children: title,
                },
              },
              {
                type: 'div',
                props: {
                  style: {
                    fontSize: '26px',
                    color: '#94a3b8',
                    lineHeight: '1.4',
                    maxWidth: '840px',
                    fontWeight: '400',
                  },
                  children: tagline,
                },
              },
            ],
          },
        },

        // Bottom: branding
        {
          type: 'div',
          props: {
            style: {
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            },
            children: [
              {
                type: 'div',
                props: {
                  style: { fontSize: '20px', color: '#64748b', letterSpacing: '0.04em' },
                  children: 'kireetivarma.me',
                },
              },
              {
                type: 'div',
                props: {
                  style: {
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    background: accent,
                    opacity: 0.9,
                  },
                },
              },
            ],
          },
        },
      ],
    },
  };

  const svg = await satori(node as any, {
    width: 1200,
    height: 630,
    fonts: [
      { name: 'sans-serif', data: fontRegular, weight: 400, style: 'normal' },
      { name: 'sans-serif', data: fontBold, weight: 700, style: 'normal' },
    ],
  });

  const resvg = new Resvg(svg, { fitTo: { mode: 'width', value: 1200 } });
  const png = resvg.render().asPng();

  return new Response(png, {
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
};
