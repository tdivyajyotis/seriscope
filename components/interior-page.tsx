'use client';

import { ArrowRight } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import Image from 'next/image';
import { RouteLink } from './route-link';
import { SiteFooter } from './site-footer';
import { SiteHeader } from './site-header';

type Content = {
  eyebrow: string;
  title: string;
  intro: string;
  image: string;
  imageAlt: string;
  sections: readonly (readonly [string, string, string])[];
};

const routeIndexes: Record<string, string> = {
  Technology: '02',
  Research: '03',
  Impact: '04',
  Story: '05',
};

export function InteriorPage({
  content,
  nextHref,
  nextLabel,
}: {
  content: Content;
  nextHref: string;
  nextLabel: string;
}) {
  const reduceMotion = useReducedMotion();
  const routeIndex = routeIndexes[content.eyebrow] ?? '00';
  const reveal = reduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 28 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.28 },
        transition: { duration: 0.72, ease: [0.22, 1, 0.36, 1] as const },
      };

  return (
    <main className={`interior-page route-${content.eyebrow.toLowerCase()}`}>
      <SiteHeader dark />
      <section className="interior-hero">
        <div className="route-index section-index" aria-hidden="true">
          <span className="section-index-number">{routeIndex}</span>
          <span className="section-index-label">{content.eyebrow}</span>
        </div>
        <motion.div
          className="interior-hero-copy"
          initial={reduceMotion ? false : { opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.82, ease: [0.22, 1, 0.36, 1] }}
        >
          <h1>{content.title}</h1>
          <p className="lede">{content.intro}</p>
        </motion.div>
        <motion.figure
          className="interior-image-composition"
          initial={reduceMotion ? false : { opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.92, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="interior-image-backdrop" aria-hidden="true" />
          <div className="interior-image-wrap">
            <Image
              src={content.image}
              alt={content.imageAlt}
              width={1600}
              height={1100}
              sizes="(max-width: 900px) 100vw, 58vw"
              priority
            />
          </div>
          <figcaption className="image-index section-index">
            <span className="section-index-number">{routeIndex}</span>
            <span className="section-index-label">Visual record</span>
          </figcaption>
        </motion.figure>
      </section>

      <section
        className="content-ledger"
        aria-label={`${content.eyebrow} details`}
      >
        <div className="ledger-heading">
          <p className="eyebrow">System sequence</p>
          <p>One visual language, traced from evidence to action.</p>
        </div>
        {content.sections.map(([index, title, copy]) => (
          <motion.article key={`${index}-${title}`} {...reveal}>
            <span>{index}</span>
            <h2>{title}</h2>
            <p>{copy}</p>
            <i aria-hidden="true" />
          </motion.article>
        ))}
      </section>

      <RouteLink className="next-route" href={nextHref}>
        <span>Continue through the system</span>
        <strong>{nextLabel}</strong>
        <ArrowRight aria-hidden="true" />
      </RouteLink>
      <SiteFooter />
    </main>
  );
}
