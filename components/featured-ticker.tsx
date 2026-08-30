'use client';

import { pressOutlets } from '@/lib/content';

function Outlet({ name, fallbackText, homepage }: (typeof pressOutlets)[number]) {
  const content = <span className={`press-wordmark press-${name.toLowerCase().replaceAll(' ', '-')}`}>{fallbackText}</span>;
  return homepage ? <a href={homepage} target="_blank" rel="noreferrer" aria-label={`${name} website`}>{content}</a> : <span aria-label={`${name}, text identity pending verification`}>{content}</span>;
}

export function FeaturedTicker() {
  return (
    <section className="featured-section" aria-labelledby="featured-heading">
      <p id="featured-heading" className="eyebrow">Featured in</p>
      <div className="ticker-window">
        <div className="ticker-track">
          <div className="ticker-set">
            {pressOutlets.map((outlet) => <Outlet key={outlet.name} {...outlet} />)}
          </div>
          <div className="ticker-set" aria-hidden="true">
            {pressOutlets.map((outlet) => <Outlet key={`copy-${outlet.name}`} {...outlet} />)}
          </div>
        </div>
      </div>
    </section>
  );
}
