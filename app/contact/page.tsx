'use client';

import { ArrowUpRight, Mail } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';

const topics = [
  'Research collaboration',
  'Field validation',
  'Hardware integration',
  'Institutional partnerships',
];

export default function ContactPage() {
  const reduceMotion = useReducedMotion();

  return (
    <main className="contact-page">
      <SiteHeader dark />
      <section className="contact-hero">
        <div className="contact-orbit" aria-hidden="true">
          <i />
          <i />
          <i />
        </div>
        <div className="route-coordinate" aria-hidden="true">
          <span>06 / 06</span>
          <span>Signal / Connect</span>
        </div>
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.82, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="eyebrow">SRSCP / Contact</p>
          <h1>
            Take the next <em>field step</em> with us.
          </h1>
        </motion.div>
        <p>
          SeriScope welcomes conversations with researchers, sericulture
          organisations, technology partners, and institutions interested in
          validation or deployment.
        </p>
      </section>
      <section className="contact-band">
        <Mail aria-hidden="true" />
        <span>Provisional project contact</span>
        <a href="mailto:contact@seriscope.com">
          contact@seriscope.com <ArrowUpRight aria-hidden="true" />
        </a>
      </section>
      <section className="contact-topics">
        {topics.map((topic, index) => (
          <motion.div
            key={topic}
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.58, delay: index * 0.06 }}
          >
            <span>0{index + 1}</span>
            <p>{topic}</p>
            <i aria-hidden="true" />
          </motion.div>
        ))}
      </section>
      <SiteFooter />
    </main>
  );
}
