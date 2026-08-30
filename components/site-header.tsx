'use client';

import { Menu, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useState } from 'react';
import { routes } from '@/lib/content';

export function SiteHeader({ dark = false }: { dark?: boolean }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className={`global-header ${dark ? 'global-header-dark' : ''}`}>
      <Link href="/" className="wordmark" aria-label="SeriScope home">
        <span aria-hidden="true">SRSCP</span>
        <span className="sr-only">SeriScope</span>
        <span className="wordmark-dot" aria-hidden="true" />
      </Link>
      <nav className="desktop-nav" aria-label="Primary navigation">
        {routes.map((route) => (
          <Link key={route.href} href={route.href} aria-current={pathname === route.href ? 'page' : undefined}>
            {route.label}
          </Link>
        ))}
      </nav>
      <Link className="contact-link" href="/contact">Contact</Link>
      <button className="menu-button" type="button" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="mobile-menu" aria-label={open ? 'Close menu' : 'Open menu'}>
        {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
      </button>
      <AnimatePresence>
        {open && (
          <motion.nav id="mobile-menu" className="mobile-nav" aria-label="Mobile navigation" initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}>
            {[...routes, { href: '/contact', label: 'Contact' }].map((route) => (
              <Link key={route.href} href={route.href} onClick={() => setOpen(false)}>{route.label}</Link>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
