'use client';

import { achievements } from '@/lib/content';
import useEmblaCarousel from 'embla-carousel-react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'motion/react';
import { useCallback, useRef } from 'react';

const byId = (id: string) => achievements.find((item) => item.id === id)!;

export function Achievements() {
  const section = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: section,
    offset: ['start start', 'end end'],
  });
  const mainScale = useTransform(scrollYProgress, [0, 0.7], [1, 0.84]);
  const leftX = useTransform(scrollYProgress, [0.12, 0.38], ['-110%', '0%']);
  const rightX = useTransform(scrollYProgress, [0.3, 0.56], ['110%', '0%']);
  const supportOpacity = useTransform(
    scrollYProgress,
    [0.12, 0.27, 0.62, 0.72],
    [0, 1, 1, 0],
  );
  const finalOpacity = useTransform(scrollYProgress, [0.72, 0.9], [0, 1]);
  const finalY = useTransform(scrollYProgress, [0.72, 0.92], [80, 0]);

  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    loop: false,
  });
  const previous = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const next = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const order = ['02', '01', '03', '04'].map(byId);

  return (
    <section
      className="achievement-section"
      ref={section}
      aria-labelledby="achievement-heading"
    >
      <div className="achievement-intro">
        <p className="eyebrow">Recognition</p>
        <h2 id="achievement-heading">
          The work travelled farther than the prototype.
        </h2>
      </div>

      <div className="achievement-desktop">
        <div className="achievement-stage">
          <motion.figure
            className="achievement-main"
            style={{ scale: mainScale }}
          >
            <Image
              src={byId('02').image}
              alt={byId('02').alt}
              width={1200}
              height={1600}
              sizes="34vw"
            />
            <figcaption>
              <span>02</span>
              <strong>{byId('02').event}</strong>
              <span>{byId('02').year}</span>
            </figcaption>
          </motion.figure>
          <motion.figure
            className="achievement-support achievement-support-left"
            style={{ x: leftX, opacity: supportOpacity }}
          >
            <Image
              src={byId('01').image}
              alt={byId('01').alt}
              width={1200}
              height={1600}
              sizes="22vw"
            />
            <figcaption>
              <span>01</span>
              <strong>{byId('01').event}</strong>
            </figcaption>
          </motion.figure>
          <motion.figure
            className="achievement-support achievement-support-right"
            style={{ x: rightX, opacity: supportOpacity }}
          >
            <Image
              src={byId('03').image}
              alt={byId('03').alt}
              width={1100}
              height={1280}
              sizes="22vw"
            />
            <figcaption>
              <span>03</span>
              <strong>{byId('03').event}</strong>
            </figcaption>
          </motion.figure>
          <motion.figure
            className="achievement-final"
            style={{ opacity: finalOpacity, y: finalY }}
          >
            <Image
              src={byId('04').image}
              alt={byId('04').alt}
              width={1280}
              height={1600}
              sizes="68vw"
            />
            <figcaption>
              <span>04</span>
              <strong>{byId('04').event}</strong>
              <span>{byId('04').year}</span>
            </figcaption>
          </motion.figure>
        </div>
      </div>

      <div className="achievement-mobile">
        <div className="embla" ref={emblaRef}>
          <div className="embla-container">
            {order.map((item) => (
              <figure
                className={`embla-slide achievement-slide-${item.id}`}
                key={item.id}
              >
                <Image
                  src={item.image}
                  alt={item.alt}
                  width={1200}
                  height={1600}
                  sizes="82vw"
                />
                <figcaption>
                  <span>{item.id}</span>
                  <strong>{item.event}</strong>
                  <span>{item.year}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
        <div className="carousel-controls">
          <button
            type="button"
            onClick={previous}
            aria-label="Previous achievement"
          >
            <ArrowLeft aria-hidden="true" />
          </button>
          <button type="button" onClick={next} aria-label="Next achievement">
            <ArrowRight aria-hidden="true" />
          </button>
        </div>
      </div>
    </section>
  );
}
