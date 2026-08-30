import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] });
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'SeriScope | Edge AI for sericulture',
  description:
    'SeriScope is an edge AI platform for Pebrine screening and fertility assessment in Tasar silkworm eggs.',
  openGraph: {
    title: 'SeriScope | Edge AI for sericulture',
    description: 'Smarter sericulture, powered at the edge.',
    type: 'website',
    images: [{ url: '/seriscope-social.png', width: 1731, height: 909, alt: 'A precision microscope inspecting biological image planes for SeriScope' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SeriScope | Edge AI for sericulture',
    description: 'Smarter sericulture, powered at the edge.',
    images: ['/seriscope-social.png'],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>{children}</body>
    </html>
  );
}
