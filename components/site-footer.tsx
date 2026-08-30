import { ArrowUpRight } from 'lucide-react';
import { RouteLink } from './route-link';

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div>
        <RouteLink href="/" className="footer-mark" aria-label="SeriScope home">
          SRSCP<span>.</span>
        </RouteLink>
        <p>Edge AI for practical sericulture diagnostics.</p>
      </div>
      <div className="footer-links">
        <RouteLink href="/technology">Technology</RouteLink>
        <RouteLink href="/research">Research</RouteLink>
        <RouteLink href="/impact">Impact</RouteLink>
        <RouteLink href="/story">Story</RouteLink>
      </div>
      <a className="footer-contact" href="mailto:contact@seriscope.com">
        contact@seriscope.com <ArrowUpRight size={15} aria-hidden="true" />
      </a>
    </footer>
  );
}
