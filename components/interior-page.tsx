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

const routeMeta: Record<string, { index: string; signal: string }> = {
  Technology: { index: '02', signal: 'Capture / Process / Infer' },
  Research: { index: '03', signal: 'Dataset / Model / Explain' },
  Impact: { index: '04', signal: 'Field / Operator / Outcome' },
  Story: { index: '05', signal: 'Lab / Team / Global stage' },
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
  const meta = routeMeta[content.eyebrow] ?? {
    index: '00',
    signal: 'SeriScope',
  };
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
        <div className="route-coordinate" aria-hidden="true">
          <span>{meta.index} / 06</span>
          <span>{meta.signal}</span>
        </div>
        <motion.div
          className="interior-hero-copy"
          initial={reduceMotion ? false : { opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.82, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="eyebrow">SRSCP / {content.eyebrow}</p>
          <h1>{content.title}</h1>
          <p className="lede">{content.intro}</p>
        </motion.div>
        <motion.figure
          className="interior-image-wrap"
          initial={reduceMotion ? false : { opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.92, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
        >
          <Image
            src={content.image}
            alt={content.imageAlt}
            width={1600}
            height={1100}
            sizes="(max-width: 900px) 100vw, 58vw"
            priority
          />
          <div className="route-optic" aria-hidden="true">
            <i />
            <i />
            <i />
          </div>
          <div className="image-signal-line" aria-hidden="true" />
          <figcaption className="image-index">
            <span>Optical record</span>
            <span>
              {content.eyebrow} / {meta.index}
            </span>
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
