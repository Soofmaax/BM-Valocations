import { writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';

const width = 1200;
const height = 630;

async function fetchFont(url) {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Failed to fetch font: ${url} (${res.status})`);
  }
  const ab = await res.arrayBuffer();
  return Buffer.from(ab);
}

async function renderToPng(svg) {
  const resvg = new Resvg(svg, {
    fitTo: { mode: 'width', value: width },
    background: '#111827',
  });
  return resvg.render().asPng();
}

function baseCanvas(children) {
  return {
    type: 'div',
    props: {
      style: {
        width: '100%',
        height: '100%',
        display: 'flex',
        position: 'relative',
        background: '#111827',
        color: '#ffffff',
        padding: '64px',
        alignItems: 'center',
      },
      children: [
        ...children,
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
  };
}

async function generateBaseImage(fonts) {
  const svg = await satori(
    baseCanvas([
      {
        type: 'div',
        props: {
          style: { display: 'flex', flexDirection: 'column', maxWidth: '1000px' },
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
                  color: '#f59e0b',
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
    ]),
    { width, height, fonts }
  );

  return renderToPng(svg);
}

async function generateHomeImage(fonts) {
  const svg = await satori(
    baseCanvas([
      {
        type: 'div',
        props: {
          style: { display: 'flex', flexDirection: 'column', maxWidth: '1000px' },
          children: [
            {
              type: 'div',
              props: {
                style: {
                  fontSize: 82,
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
                  fontSize: 38,
                  color: '#f59e0b',
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
                children: 'Book your ride with confidence',
              },
            },
          ],
        },
      },
    ]),
    { width, height, fonts }
  );

  return renderToPng(svg);
}

async function generateFleetImage(fonts) {
  const svg = await satori(
    baseCanvas([
      {
        type: 'div',
        props: {
          style: { display: 'flex', flexDirection: 'column', maxWidth: '1000px' },
          children: [
            {
              type: 'div',
              props: {
                style: {
                  fontSize: 78,
                  fontWeight: 800,
                  letterSpacing: '-2px',
                  lineHeight: 1.05,
                  fontFamily: 'Sora',
                },
                children: 'Our Fleet',
              },
            },
            {
              type: 'div',
              props: {
                style: {
                  marginTop: 16,
                  fontSize: 40,
                  color: '#f59e0b',
                  fontWeight: 700,
                  fontFamily: 'Sora',
                },
                children: 'BM-VA Locations',
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
                children: 'Economy • Premium • SUV • Van',
              },
            },
          ],
        },
      },
    ]),
    { width, height, fonts }
  );

  return renderToPng(svg);
}

async function generateSupportImage(fonts) {
  const svg = await satori(
    baseCanvas([
      {
        type: 'div',
        props: {
          style: { display: 'flex', flexDirection: 'column', maxWidth: '1000px' },
          children: [
            {
              type: 'div',
              props: {
                style: {
                  fontSize: 78,
                  fontWeight: 800,
                  letterSpacing: '-2px',
                  lineHeight: 1.05,
                  fontFamily: 'Sora',
                },
                children: 'Support',
              },
            },
            {
              type: 'div',
              props: {
                style: {
                  marginTop: 16,
                  fontSize: 40,
                  color: '#f59e0b',
                  fontWeight: 700,
                  fontFamily: 'Sora',
                },
                children: 'BM-VA Locations',
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
                children: 'We’re here to help',
              },
            },
          ],
        },
      },
    ]),
    { width, height, fonts }
  );

  return renderToPng(svg);
}

async function main() {
  const [soraRegular, soraBold] = await Promise.all([
    fetchFont('https://github.com/google/fonts/raw/main/ofl/sora/Sora-Regular.ttf'),
    fetchFont('https://github.com/google/fonts/raw/main/ofl/sora/Sora-Bold.ttf'),
  ]);

  const fonts = [
    { name: 'Sora', data: soraRegular, weight: 400, style: 'normal' },
    { name: 'Sora', data: soraBold, weight: 800, style: 'normal' },
  ];

  const [basePng, homePng, fleetPng, supportPng] = await Promise.all([
    generateBaseImage(fonts),
    generateHomeImage(fonts),
    generateFleetImage(fonts),
    generateSupportImage(fonts),
  ]);

  await mkdir(path.resolve('public'), { recursive: true });
  const baseOut = path.resolve('public/og-image.png');
  const homeOut = path.resolve('public/og-home.png');
  const fleetOut = path.resolve('public/og-fleet.png');
  const supportOut = path.resolve('public/og-support.png');

  await Promise.all([
    writeFile(baseOut, basePng),
    writeFile(homeOut, homePng),
    writeFile(fleetOut, fleetPng),
    writeFile(supportOut, supportPng),
  ]);

  // eslint-disable-next-line no-console
  console.log(`OG images generated at:
  - ${baseOut}
  - ${homeOut}
  - ${fleetOut}
  - ${supportOut}
(${width}x${height})`);
}

main().catch((err) => {
  // eslint-disable-next-line no-console
  console.error('Failed to generate OG image(s):', err);
  process.exit(1);
});