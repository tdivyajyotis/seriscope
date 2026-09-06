'use client';

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'motion/react';
import { useRef } from 'react';

const fields = [
  {
    index: '01',
    label: 'Sample',
    title: 'A field reality enters the lens.',
    className: 'field-sample',
  },
  {
    index: '02',
    label: 'Signal',
    title: 'The model isolates what deserves attention.',
    className: 'field-signal',
  },
  {
    index: '03',
    label: 'Decision',
    title: 'Evidence returns to the operator.',
    className: 'field-decision',
  },
];

export function ColorFields() {
  const section = useRef<HTMLElement>(null);
  const reduced = Boolean(useReducedMotion());
  const { scrollYProgress } = useScroll({
    target: section,
    offset: ['start start', 'end end'],
  });
  const secondY = useTransform(
    scrollYProgress,
    [0.2, 0.48],
    reduced ? ['0%', '0%'] : ['100%', '0%'],
  );
  const thirdY = useTransform(
    scrollYProgress,
    [0.52, 0.8],
    reduced ? ['0%', '0%'] : ['100%', '0%'],
  );
  const firstScale = useTransform(
    scrollYProgress,
    [0, 0.45],
    reduced ? [1, 1] : [1, 0.9],
  );
  const secondScale = useTransform(
    scrollYProgress,
    [0.48, 0.82],
    reduced ? [1, 1] : [1, 0.94],
  );
  const railX = useTransform(scrollYProgress, [0, 1], ['0%', '-66.666%']);

  return (
    <section
      className="color-fields"
      ref={section}
      aria-label="SeriScope diagnostic progression"
    >
      <div className="color-fields-stage">
        <motion.article
          className={`color-field ${fields[0].className}`}
          style={{ scale: firstScale }}
        >
          <div className="section-index">
            <span className="section-index-number">{fields[0].index}</span>
            <span className="section-index-label">{fields[0].label}</span>
          </div>
          <h2>{fields[0].title}</h2>
        </motion.article>
        <motion.article
          className={`color-field ${fields[1].className}`}
          style={{ y: secondY, scale: secondScale }}
        >
          <div className="section-index">
            <span className="section-index-number">{fields[1].index}</span>
            <span className="section-index-label">{fields[1].label}</span>
          </div>
          <h2>{fields[1].title}</h2>
        </motion.article>
        <motion.article
          className={`color-field ${fields[2].className}`}
          style={{ y: thirdY }}
        >
          <div className="section-index">
            <span className="section-index-number">{fields[2].index}</span>
            <span className="section-index-label">{fields[2].label}</span>
          </div>
          <h2>{fields[2].title}</h2>
        </motion.article>
        <div className="field-rail" aria-hidden="true">
          <motion.div style={{ x: railX }}>
            <span>Sample</span>
            <span>Signal</span>
            <span>Decision</span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
