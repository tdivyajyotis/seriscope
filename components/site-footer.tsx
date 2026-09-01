import { ArrowUpRight } from 'lucide-react';
import { RouteLink } from './route-link';

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-topline">
        <div>
          <RouteLink
            href="/"
            className="footer-mark"
            aria-label="SeriScope home"
          >
            SRSCP<span>.</span>
          </RouteLink>
          <p>Optical intelligence for practical sericulture.</p>
        </div>
        <div className="footer-links">
          <RouteLink href="/technology">Technology</RouteLink>
          <RouteLink href="/research">Research</RouteLink>
          <RouteLink href="/impact">Impact</RouteLink>
          <RouteLink href="/story">Story</RouteLink>
        </div>
        <a className="footer-contact" href="mailto:contact@seriscope.com">
          Start a conversation <ArrowUpRight size={15} aria-hidden="true" />
        </a>
      </div>
      <div className="footer-word" aria-hidden="true">
        SeriScope
      </div>
    </footer>
  );
}
