'use client';

import { Menu, X } from 'lucide-react';
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from 'motion/react';
import { usePathname } from 'next/navigation';
import { useRef, useState } from 'react';
import { routes } from '@/lib/content';
import { RouteLink } from './route-link';

export function SiteHeader({ dark = false }: { dark?: boolean }) {
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastScroll = useRef(0);
  const pathname = usePathname();
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (current) => {
    const previous = lastScroll.current;
    lastScroll.current = current;

    if (open || current < 120) {
      setHidden(false);
      return;
    }

    if (Math.abs(current - previous) > 4) setHidden(current > previous);
  });

  return (
    <motion.header
      className={`global-header ${dark ? 'global-header-dark' : ''}`}
      animate={{ y: hidden ? '-100%' : 0 }}
      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
    >
      <RouteLink href="/" className="wordmark" aria-label="SeriScope home">
        <span aria-hidden="true">SRSCP</span>
        <span className="sr-only">SeriScope</span>
        <span className="wordmark-dot" aria-hidden="true" />
      </RouteLink>
      <nav className="desktop-nav" aria-label="Primary navigation">
        {routes.map((route) => (
          <RouteLink
            key={route.href}
            href={route.href}
            aria-current={pathname === route.href ? 'page' : undefined}
          >
            {route.label}
          </RouteLink>
        ))}
      </nav>
      <RouteLink className="contact-link" href="/contact">
        Contact
      </RouteLink>
      <button
        className="menu-button"
        type="button"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label={open ? 'Close menu' : 'Open menu'}
      >
        {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
      </button>
      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-menu"
            className="mobile-nav"
            aria-label="Mobile navigation"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
          >
            {[...routes, { href: '/contact', label: 'Contact' }].map(
              (route) => (
                <RouteLink
                  key={route.href}
                  href={route.href}
                  onClick={() => setOpen(false)}
                >
                  {route.label}
                </RouteLink>
              ),
            )}
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
