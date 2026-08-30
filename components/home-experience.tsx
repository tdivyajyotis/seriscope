'use client';

import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowDown, ArrowUpRight, Cpu, Eye, Microscope, ScanLine } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { Achievements } from './achievements';
import { FeaturedTicker } from './featured-ticker';
import { SiteFooter } from './site-footer';
import { SiteHeader } from './site-header';
import { researchPaper } from '@/lib/content';

const HeroScene = dynamic(() => import('./hero-scene'), { ssr: false });
const workflow = [
  { icon: Microscope, index: '01', title: 'Capture', copy: 'Acquire repeatable microscopic imagery from prepared samples.' },
  { icon: ScanLine, index: '02', title: 'Process', copy: 'Standardise visual inputs for dependable model inference.' },
  { icon: Cpu, index: '03', title: 'Infer', copy: 'Run disease and fertility models entirely on edge hardware.' },
  { icon: Eye, index: '04', title: 'Explain', copy: 'Return visual evidence that supports an operator’s decision.' },
];

export function HomeExperience() {
  const reduceMotion = useReducedMotion();
  const reveal = reduceMotion ? {} : { initial: { opacity: 0, y: 24 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: .25 }, transition: { duration: .7, ease: [0.22, 1, 0.36, 1] as const } };

  return (
    <main>
      <section className="hero-shell">
        <Image className="hero-micrograph" src="/images/research/microscopy.png" alt="Microscope imagery showing Tasar samples used in SeriScope research" fill priority sizes="100vw" />
        <div className="hero-shade" />
        <div className="hero-grid" aria-hidden="true" />
        <HeroScene />
        <SiteHeader dark />

        <motion.div className="hero-content" initial={reduceMotion ? false : { opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .9, delay: .12, ease: [0.22, 1, 0.36, 1] }}>
          <div className="hero-kicker"><Microscope size={16} aria-hidden="true" /><span>Edge AI for sericulture</span></div>
          <h1>SeriScope</h1>
          <p className="hero-statement">Smarter sericulture, powered at the edge.</p>
          <p className="hero-copy">An AI diagnostic platform for screening Pebrine disease and assessing fertility in Tasar silkworm eggs, built for real field conditions.</p>
          <div className="hero-actions">
            <Link className="button button-primary" href="/technology">Explore the technology <ArrowUpRight size={17} aria-hidden="true" /></Link>
            <Link className="button button-quiet" href="/research">View the research</Link>
          </div>
        </motion.div>
        <div className="hero-readout" aria-label="Project highlights">
          <div><strong>1,400+</strong><span>Real samples</span></div>
          <div><strong>Offline</strong><span>Edge inference</span></div>
          <div><strong>ISEF</strong><span>Special award</span></div>
        </div>
        <a className="scroll-cue" href="#overview" aria-label="Continue to overview"><ArrowDown size={16} aria-hidden="true" /></a>
      </section>

      <section className="overview-band" id="overview">
        <motion.p {...reveal}>Microscopy in. Field-ready decisions out.</motion.p>
        <motion.div {...reveal}>
          <span>SeriScope brings computer vision, explainable deep learning, and compact hardware into one diagnostic workflow.</span>
          <Link className="text-link" href="/technology">See how it works <ArrowUpRight size={16} aria-hidden="true" /></Link>
        </motion.div>
      </section>

      <section className="workflow-section" aria-labelledby="workflow-heading">
        <div className="workflow-heading">
          <p className="eyebrow">Diagnostic chain</p>
          <h2 id="workflow-heading">One instrument. Four decisive movements.</h2>
        </div>
        <div className="workflow-list">
          {workflow.map((step) => (
            <motion.article key={step.index} {...reveal}>
              <span className="step-index">{step.index}</span>
              <step.icon aria-hidden="true" />
              <h3>{step.title}</h3>
              <p>{step.copy}</p>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="evidence-section">
        <div className="evidence-copy">
          <p className="eyebrow">Evidence, visible</p>
          <h2>Designed to show its reasoning.</h2>
          <p>Visual explanations connect model output to the microscopic regions that matter, helping keep a trained operator in the loop.</p>
          <Link className="text-link" href="/research">Explore the research <ArrowUpRight size={16} aria-hidden="true" /></Link>
        </div>
        <div className="evidence-visual">
          <Image src="/images/research/gradcam.png" alt="Grad-CAM model explanation panels from SeriScope testing" width={992} height={1080} sizes="(max-width: 900px) 100vw, 61vw" />
          <div className="scan-line" aria-hidden="true" />
          <span>Explainability / Grad-CAM</span>
        </div>
      </section>

      <Achievements />

      <section className="paper-section">
        <div className="paper-preview">
          <Image src="/images/research/workflow.jpg" alt="SeriScope research workflow overview" width={1280} height={960} sizes="(max-width: 900px) 100vw, 50vw" />
          <span>{researchPaper.fileSize} / PDF</span>
        </div>
        <div className="paper-copy">
          <p className="eyebrow">Project Report</p>
          <h2>Go beyond the overview.</h2>
          <p>{researchPaper.description}</p>
          <p className="paper-title">{researchPaper.title}</p>
          <div className="paper-actions">
            <a className="button button-dark" href={researchPaper.openUrl} target="_blank" rel="noreferrer">Read the full project report <ArrowUpRight size={16} aria-hidden="true" /></a>
            <a className="text-link" href={researchPaper.downloadUrl} download>Download PDF</a>
          </div>
        </div>
      </section>

      <FeaturedTicker />
      <SiteFooter />
    </main>
  );
}
