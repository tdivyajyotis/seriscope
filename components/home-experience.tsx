'use client';

import dynamic from 'next/dynamic';
import Image from 'next/image';
import { ArrowUpRight, Cpu, Eye, Microscope, ScanLine } from 'lucide-react';
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'motion/react';
import { useRef } from 'react';
import { Achievements } from './achievements';
import { ColorFields } from './color-fields';
import { FeaturedTicker } from './featured-ticker';
import { ScrollStatement } from './scroll-statement';
import { RouteLink } from './route-link';
import { SiteFooter } from './site-footer';
import { SiteHeader } from './site-header';
import { researchPaper } from '@/lib/content';

const HeroScene = dynamic(() => import('./hero-scene'), { ssr: false });
const heroStatement = [
  { word: 'Explainable,', emphasis: true },
  { word: 'offline' },
  { word: 'microscopy' },
  { word: 'for' },
  { word: 'Pebrine', emphasis: true },
  { word: 'screening' },
  { word: 'and' },
  { word: 'Tasar', emphasis: true },
  { word: 'egg' },
  { word: 'fertility' },
  { word: 'assessment.' },
];
const workflow = [
  {
    icon: Microscope,
    index: '01',
    title: 'Capture',
    copy: 'Acquire repeatable microscopic imagery from prepared samples.',
  },
  {
    icon: ScanLine,
    index: '02',
    title: 'Process',
    copy: 'Standardise visual inputs for dependable model inference.',
  },
  {
    icon: Cpu,
    index: '03',
    title: 'Infer',
    copy: 'Run disease and fertility models entirely on edge hardware.',
  },
  {
    icon: Eye,
    index: '04',
    title: 'Explain',
    copy: 'Return visual evidence that supports an operator’s decision.',
  },
];

export function HomeExperience() {
  const hero = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress: heroProgress } = useScroll({
    target: hero,
    offset: ['start start', 'end start'],
  });
  const heroScale = useTransform(
    heroProgress,
    [0, 1],
    reduceMotion ? [1, 1] : [1, 1.12],
  );
  const heroMediaY = useTransform(
    heroProgress,
    [0, 1],
    reduceMotion ? ['0%', '0%'] : ['0%', '12%'],
  );
  const heroContentY = useTransform(
    heroProgress,
    [0, 0.8],
    reduceMotion ? [0, 0] : [0, -86],
  );
  const heroContentOpacity = useTransform(
    heroProgress,
    [0, 0.72],
    [1, reduceMotion ? 1 : 0],
  );
  const reveal = reduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 24 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.25 },
        transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
      };

  return (
    <main>
      <section className="hero-shell" ref={hero}>
        <motion.div
          className="hero-media"
          style={{ scale: heroScale, y: heroMediaY }}
        >
          <Image
            className="hero-micrograph"
            src="/images/research/microscopy.png"
            alt="Microscope imagery showing Tasar samples used in SeriScope research"
            fill
            priority
            sizes="100vw"
          />
        </motion.div>
        <div className="hero-shade" />
        <motion.div
          className="hero-microscope-sketch"
          aria-hidden="true"
          initial={
            reduceMotion
              ? false
              : { opacity: 0, x: -110, scale: 0.92, rotate: -3 }
          }
          animate={{ opacity: 1, x: 0, scale: 1, rotate: 0 }}
          style={{ y: heroMediaY }}
          transition={{
            duration: 1.15,
            delay: 0.18,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <Image
            src="/images/hero/microscope-comic.png"
            alt=""
            fill
            priority
            sizes="(max-width: 760px) 72vw, 42vw"
          />
        </motion.div>
        <motion.div className="hero-scene-motion" style={{ y: heroMediaY }}>
          <HeroScene />
        </motion.div>
        <SiteHeader dark />

        <motion.div
          className="hero-content"
          style={{ y: heroContentY, opacity: heroContentOpacity }}
        >
          <motion.div
            className="hero-content-inner"
            initial={reduceMotion ? false : { opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.9,
              delay: 0.12,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <div className="hero-title-block">
              <h1 aria-label="SeriScope">
                {'SeriScope'.split('').map((character, index) => (
                  <motion.span
                    aria-hidden="true"
                    key={`${character}-${index}`}
                    initial={reduceMotion ? false : { opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.75,
                      delay: 0.16 + index * 0.035,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    {character}
                  </motion.span>
                ))}
              </h1>
            </div>

            <motion.aside
              className="hero-aside"
              initial={reduceMotion ? false : { opacity: 0, x: 160 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 1.05,
                delay: 0.48,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <p aria-label="Explainable, offline microscopy for Pebrine screening and Tasar egg fertility assessment.">
                {heroStatement.map(({ word, emphasis }) => (
                  <span
                    aria-hidden="true"
                    className={emphasis ? 'hero-phrase-emphasis' : undefined}
                    key={word}
                  >
                    {word}
                  </span>
                ))}
              </p>
            </motion.aside>
          </motion.div>
        </motion.div>
      </section>

      <ScrollStatement />

      <section className="workflow-section" aria-labelledby="workflow-heading">
        <div className="workflow-heading">
          <p className="eyebrow">Diagnostic chain</p>
          <h2 id="workflow-heading">
            One instrument. Four decisive movements.
          </h2>
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

      <ColorFields />

      <section className="evidence-section">
        <div className="evidence-copy">
          <p className="eyebrow">Evidence, visible</p>
          <h2>Designed to show its reasoning.</h2>
          <p>
            Visual explanations connect model output to the microscopic regions
            that matter, helping keep a trained operator in the loop.
          </p>
          <RouteLink className="text-link" href="/research">
            Explore the research <ArrowUpRight size={16} aria-hidden="true" />
          </RouteLink>
        </div>
        <div className="evidence-visual">
          <Image
            src="/images/research/gradcam.png"
            alt="Grad-CAM model explanation panels from SeriScope testing"
            width={992}
            height={1080}
            sizes="(max-width: 900px) 100vw, 61vw"
          />
          <div className="scan-line" aria-hidden="true" />
          <span>Explainability / Grad-CAM</span>
        </div>
      </section>

      <Achievements />

      <section className="paper-section">
        <div className="paper-preview">
          <Image
            src="/images/research/workflow.jpg"
            alt="SeriScope research workflow overview"
            width={1280}
            height={960}
            sizes="(max-width: 900px) 100vw, 50vw"
          />
          <span>{researchPaper.fileSize} / PDF</span>
        </div>
        <div className="paper-copy">
          <p className="eyebrow">Project Report</p>
          <h2>Go beyond the overview.</h2>
          <p>{researchPaper.description}</p>
          <p className="paper-title">{researchPaper.title}</p>
          <div className="paper-actions">
            <a
              className="button button-dark"
              href={researchPaper.openUrl}
              target="_blank"
              rel="noreferrer"
            >
              Read the full project report{' '}
              <ArrowUpRight size={16} aria-hidden="true" />
            </a>
            <a className="text-link" href={researchPaper.downloadUrl} download>
              Download PDF
            </a>
          </div>
        </div>
      </section>

      <FeaturedTicker />
      <SiteFooter />
    </main>
  );
}
