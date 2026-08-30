import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { SiteFooter } from './site-footer';
import { SiteHeader } from './site-header';
import { RouteLink } from './route-link';

type Content = {
  eyebrow: string;
  title: string;
  intro: string;
  image: string;
  imageAlt: string;
  sections: readonly (readonly [string, string, string])[];
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
  return (
    <main className="interior-page">
      <SiteHeader />
      <section className="interior-hero">
        <div className="interior-hero-copy">
          <p className="eyebrow">{content.eyebrow}</p>
          <h1>{content.title}</h1>
          <p className="lede">{content.intro}</p>
        </div>
        <div className="interior-image-wrap">
          <Image
            src={content.image}
            alt={content.imageAlt}
            width={1600}
            height={1100}
            sizes="(max-width: 900px) 100vw, 58vw"
            priority
          />
          <span className="image-index">
            SRSCP / {content.eyebrow.toUpperCase()}
          </span>
        </div>
      </section>
      <section
        className="content-ledger"
        aria-label={`${content.eyebrow} details`}
      >
        {content.sections.map(([index, title, copy]) => (
          <article key={`${index}-${title}`}>
            <span>{index}</span>
            <h2>{title}</h2>
            <p>{copy}</p>
          </article>
        ))}
      </section>
      <RouteLink className="next-route" href={nextHref}>
        <span>Continue to</span>
        <strong>{nextLabel}</strong>
        <ArrowRight aria-hidden="true" />
      </RouteLink>
      <SiteFooter />
    </main>
  );
}
