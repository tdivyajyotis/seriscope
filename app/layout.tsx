import type { Metadata } from 'next';
import {
  Almarai,
  Google_Sans,
  Instrument_Serif,
  JetBrains_Mono,
} from 'next/font/google';
import './globals.css';
import './identity.css';

export const dynamic = 'force-static';

const almarai = Almarai({
  variable: '--font-body',
  subsets: ['latin'],
  weight: ['300', '400', '700', '800'],
});
const instrumentSerif = Instrument_Serif({
  variable: '--font-accent',
  subsets: ['latin'],
  weight: '400',
});
const jetBrainsMono = JetBrains_Mono({
  variable: '--font-mono',
  subsets: ['latin'],
});
const googleSans = Google_Sans({
  variable: '--font-hero',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://seriscope.com'),
  title: 'SeriScope | Edge AI for sericulture',
  description:
    'SeriScope is an edge AI platform for Pebrine screening and fertility assessment in Tasar silkworm eggs.',
  openGraph: {
    title: 'SeriScope | Edge AI for sericulture',
    description: 'Smarter sericulture, powered at the edge.',
    type: 'website',
    images: [
      {
        url: '/seriscope-social.png',
        width: 1731,
        height: 909,
        alt: 'A precision microscope inspecting biological image planes for SeriScope',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SeriScope | Edge AI for sericulture',
    description: 'Smarter sericulture, powered at the edge.',
    images: ['/seriscope-social.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={`${almarai.variable} ${instrumentSerif.variable} ${jetBrainsMono.variable} ${googleSans.variable}`}
      >
        {children}
      </body>
    </html>
  );
}
