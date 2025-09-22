import { writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';

const width = 1200;
const height = 630;
const outPath = path.resolve('public/og-image.png');

async function fetchFont(url) {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Failed to fetch font: ${url} (${res.status})`);
  }
  const ab = await res.arrayBuffer();
  return Buffer.from(ab);
}

async function main() {
  // Sora fonts from google/fonts repository
  const [soraRegular, soraBold] = await Promise.all([
    fetchFont('https://github.com/google/fonts/raw/main/ofl/sora/Sora-Regular.ttf'),
    fetchFont('https://github.com/google/fonts/raw/main/ofl/sora/Sora-Bold.ttf'),
  ]);

  const svg = await satori(
    {
      type: 'div',
      props: {
        style: {
          width: '100%',
          height: '100%',
          display: 'flex',
          position: 'relative',
          background: '#111827', // primary
          color: '#ffffff',
          padding: '64px',
          alignItems: 'center',
        },
        children: [
          {
            type: 'div',
            props: {
              style: {
                display: 'flex',
                flexDirection: 'column',
                maxWidth: '1000px',
              },
              children: [
                {
                  type: 'div',
                  props: {
                    style: {
                      fontSize: 84,
                      fontWeight: 800,
                      letterSpacing: '-2px',
                      lineHeight: 1.05,
                      fontFamily: 'Sora',
                    },
                    children: 'BM-VA Locations',
                  },
                },
                {
                  type: 'div',
                  props: {
                    style: {
                      marginTop: 16,
                      fontSize: 40,
                      color: '#f59e0b', // accent
                      fontWeight: 700,
                      fontFamily: 'Sora',
                    },
                    children: 'Premium Car Rental',
                  },
                },
                {
                  type: 'div',
                  props: {
                    style: {
                      marginTop: 12,
                      fontSize: 24,
                      color: '#d1d5db',
                      fontWeight: 400,
                      fontFamily: 'Sora',
                    },
                    children: 'Reliable, luxury and economy vehicles',
                  },
                },
              ],
            },
          },
          // Accents
          {
            type: 'div',
            props: {
              style: {
                position: 'absolute',
                right: '48px',
                bottom: '48px',
                width: '220px',
                height: '220px',
                borderRadius: '9999px',
                background:
                  'radial-gradient(circle at 30% 30%, rgba(245,158,11,0.5), rgba(245,158,11,0.15) 60%, transparent 70%)',
                filter: 'blur(2px)',
              },
            },
          },
        ],
      },
    },
    {
      width,
      height,
      fonts: [
        { name: 'Sora', data: soraRegular, weight: 400, style: 'normal' },
        { name: 'Sora', data: soraBold, weight: 800, style: 'normal' },
      ],
    }
  );

  const resvg = new Resvg(svg, {
    fitTo: { mode: 'width', value: width },
    background: '#111827',
  });
  const pngData = resvg.render().asPng();

  await mkdir(path.dirname(outPath), { recursive: true });
  await writeFile(outPath, pngData);

  // eslint-disable-next-line no-console
  console.log(`OG image generated at ${outPath} (${width}x${height})`);
}

main().catch((err) => {
  // eslint-disable-next-line no-console
  console.error('Failed to generate OG image:', err);
  process.exit(1);
});