import { writeFile, mkdir, readFile, access } from 'node:fs/promises';
import path from 'node:path';
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';

const width = 1200;
const height = 630;
const LOGO_SOURCE = path.resolve('public/brand/logo.svg');

async function fetchFont(url) {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Failed to fetch font: ${url} (${res.status})`);
  }
  const ab = await res.arrayBuffer();
  return Buffer.from(ab);
}

async function renderToPng(svg, { bg = '#111827', targetWidth } = {}) {
  const resvg = new Resvg(svg, {
    fitTo: targetWidth ? { mode: 'width', value: targetWidth } : { mode: 'width', value: width },
    background: bg,
  });
  return resvg.render().asPng();
}

async function loadLogoSvgBuffer() {
  try {
    await access(LOGO_SOURCE);
    const buf = await readFile(LOGO_SOURCE);
    return buf;
  } catch {
    return null;
  }
}

function toDataUrlPng(buf) {
  return `data:image/png;base64,${buf.toString('base64')}`;
}

function baseCanvas(children, logoDataUrl) {
  const logoNode =
    logoDataUrl &&
    {
      type: 'img',
      props: {
        src: logoDataUrl,
        width: 120,
        height: 120,
        style: {
          position: 'absolute',
          top: 48,
          right: 48,
          borderRadius: 12,
        },
      },
    };

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
        ...(logoNode ? [logoNode] : []),
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

async function generateBaseImage(fonts, logoDataUrl) {
  const svg = await satori(
    baseCanvas(
      [
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
      ],
      logoDataUrl
    ),
    { width, height, fonts }
  );

  return renderToPng(svg);
}

async function generateHomeImage(fonts, logoDataUrl) {
  const svg = await satori(
    baseCanvas(
      [
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
      ],
      logoDataUrl
    ),
    { width, height, fonts }
  );

  return renderToPng(svg);
}

async function generateFleetImage(fonts, logoDataUrl) {
  const svg = await satori(
    baseCanvas(
      [
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
      ],
      logoDataUrl
    ),
    { width, height, fonts }
  );

  return renderToPng(svg);
}

async function generateSupportImage(fonts, logoDataUrl) {
  const svg = await satori(
    baseCanvas(
      [
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
      ],
      logoDataUrl
    ),
    { width, height, fonts }
  );

  return renderToPng(svg);
}

async function generateIcons(fonts, logoSvgBuffer) {
  if (logoSvgBuffer) {
    // Render provided brand logo SVG to multiple sizes
    const resvg = new Resvg(logoSvgBuffer, { fitTo: { mode: 'width', value: 512 } });
    const png512 = resvg.render().asPng();

    const outDir = path.resolve('public');
    await mkdir(outDir, { recursive: true });

    // Downscale by re-rendering with different width targets
    const icon180 = new Resvg(logoSvgBuffer, { fitTo: { mode: 'width', value: 180 } })
      .render()
      .asPng();
    const icon32 = new Resvg(logoSvgBuffer, { fitTo: { mode: 'width', value: 32 } })
      .render()
      .asPng();
    const icon16 = new Resvg(logoSvgBuffer, { fitTo: { mode: 'width', value: 16 } })
      .render()
      .asPng();

    await Promise.all([
      writeFile(path.join(outDir, 'apple-touch-icon.png'), icon180),
      writeFile(path.join(outDir, 'favicon-32x32.png'), icon32),
      writeFile(path.join(outDir, 'favicon-16x16.png'), icon16),
      writeFile(path.join(outDir, 'icon-512.png'), png512),
    ]);
    return;
  }

  // Fallback: monogram "BM" on primary background
  const svg = await satori(
    {
      type: 'div',
      props: {
        style: {
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#111827',
          color: '#f9fafb',
        },
        children: {
          type: 'div',
          props: {
            style: {
              fontSize: 84,
              fontWeight: 800,
              fontFamily: 'Sora',
              letterSpacing: '-2px',
            },
            children: 'BM',
          },
        },
      },
    },
    { width: 512, height: 512, fonts }
  );

  const basePng = await renderToPng(svg, { targetWidth: 512 });
  const icon180 = await renderToPng(svg, { targetWidth: 180 });
  const icon32 = await renderToPng(svg, { targetWidth: 32 });
  const icon16 = await renderToPng(svg, { targetWidth: 16 });

  const outDir = path.resolve('public');
  await mkdir(outDir, { recursive: true });
  await Promise.all([
    writeFile(path.join(outDir, 'apple-touch-icon.png'), icon180),
    writeFile(path.join(outDir, 'favicon-32x32.png'), icon32),
    writeFile(path.join(outDir, 'favicon-16x16.png'), icon16),
    writeFile(path.join(outDir, 'icon-512.png'), basePng),
  ]);
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

  const logoSvgBuffer = await loadLogoSvgBuffer();
  const logoDataUrl = logoSvgBuffer
    ? toDataUrlPng(new Resvg(logoSvgBuffer, { fitTo: { mode: 'width', value: 120 } }).render().asPng())
    : null;

  const [basePng, homePng, fleetPng, supportPng] = await Promise.all([
    generateBaseImage(fonts, logoDataUrl),
    generateHomeImage(fonts, logoDataUrl),
    generateFleetImage(fonts, logoDataUrl),
    generateSupportImage(fonts, logoDataUrl),
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

  await generateIcons(fonts, logoSvgBuffer);

  // eslint-disable-next-line no-console
  console.log(`OG images and icons generated:
  - ${baseOut}
  - ${homeOut}
  - ${fleetOut}
  - ${supportOut}
  - public/apple-touch-icon.png
  - public/favicon-32x32.png
  - public/favicon-16x16.png
  - public/icon-512.png
(${width}x${height} for OG, various for icons)`);
}

main().catch((err) => {
  // eslint-disable-next-line no-console
  console.error('Failed to generate OG image(s) or icons:', err);
  process.exit(1);
});