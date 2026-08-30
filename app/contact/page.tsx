import { ArrowUpRight, Mail } from 'lucide-react';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';

export default function ContactPage() {
  return (
    <main className="contact-page">
      <SiteHeader />
      <section className="contact-hero">
        <div>
          <p className="eyebrow">Contact</p>
          <h1>Take the next field step with us.</h1>
        </div>
        <p>SeriScope welcomes conversations with researchers, sericulture organisations, technology partners, and institutions interested in validation or deployment.</p>
      </section>
      <section className="contact-band">
        <Mail aria-hidden="true" />
        <span>Provisional project contact</span>
        <a href="mailto:contact@seriscope.com">contact@seriscope.com <ArrowUpRight aria-hidden="true" /></a>
      </section>
      <section className="contact-topics">
        {['Research collaboration', 'Field validation', 'Hardware integration', 'Institutional partnerships'].map((topic, index) => (
          <div key={topic}><span>0{index + 1}</span><p>{topic}</p></div>
        ))}
      </section>
      <SiteFooter />
    </main>
  );
}
