import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div>
        <Link href="/" className="footer-mark" aria-label="SeriScope home">SRSCP<span>.</span></Link>
        <p>Edge AI for practical sericulture diagnostics.</p>
      </div>
      <div className="footer-links">
        <Link href="/technology">Technology</Link>
        <Link href="/research">Research</Link>
        <Link href="/impact">Impact</Link>
        <Link href="/story">Story</Link>
      </div>
      <a className="footer-contact" href="mailto:contact@seriscope.com">contact@seriscope.com <ArrowUpRight size={15} aria-hidden="true" /></a>
    </footer>
  );
}
