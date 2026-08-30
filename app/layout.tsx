import type { Metadata } from 'next';
import { Instrument_Serif, JetBrains_Mono, Manrope } from 'next/font/google';
import './globals.css';

const manrope = Manrope({ variable: '--font-body', subsets: ['latin'] });
const instrumentSerif = Instrument_Serif({
  variable: '--font-display',
  subsets: ['latin'],
  weight: '400',
});
const jetBrainsMono = JetBrains_Mono({
  variable: '--font-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
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
        className={`${manrope.variable} ${instrumentSerif.variable} ${jetBrainsMono.variable}`}
      >
        {children}
      </body>
    </html>
  );
}
