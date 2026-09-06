'use client';

import {
  motion,
  MotionValue,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'motion/react';
import { Fragment, useRef } from 'react';
import { RouteLink } from './route-link';

const statement =
  'Microscopy becomes evidence. Evidence becomes a decision that can stay close to the field.';

function Word({
  children,
  index,
  count,
  progress,
  reduced,
}: {
  children: string;
  index: number;
  count: number;
  progress: MotionValue<number>;
  reduced: boolean;
}) {
  const start = count === 1 ? 0 : (index / (count - 1)) * 0.78;
  const opacity = useTransform(
    progress,
    [start, Math.min(start + 0.2, 1)],
    reduced ? [1, 1] : [0.13, 1],
  );
  const y = useTransform(
    progress,
    [start, Math.min(start + 0.2, 1)],
    reduced ? [0, 0] : [12, 0],
  );
  return (
    <motion.span aria-hidden="true" style={{ opacity, y }}>
      {children}
    </motion.span>
  );
}

export function ScrollStatement() {
  const section = useRef<HTMLElement>(null);
  const reduceMotion = Boolean(useReducedMotion());
  const { scrollYProgress } = useScroll({
    target: section,
    offset: ['start start', 'end end'],
  });
  const progressScale = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const indexOpacity = useTransform(
    scrollYProgress,
    [0.8, 0.92],
    reduceMotion ? [1, 1] : [0, 1],
  );
  const indexY = useTransform(
    scrollYProgress,
    [0.8, 0.92],
    reduceMotion ? [0, 0] : [10, 0],
  );
  const words = statement.split(' ');

  return (
    <section className="statement-scroll" ref={section} id="overview">
      <div className="statement-stage">
        <div className="statement-meta">
          <motion.div
            className="section-index"
            style={{ opacity: indexOpacity, y: indexY }}
          >
            <span className="section-index-number">01</span>
            <span className="section-index-label">Principle</span>
          </motion.div>
          <div className="statement-progress">
            <motion.i style={{ scaleX: progressScale }} />
          </div>
        </div>
        <div>
          <p className="eyebrow">The operating idea</p>
          <h2 aria-label={statement}>
            {words.map((word, index) => (
              <Fragment key={`${word}-${index}`}>
                <Word
                  index={index}
                  count={words.length}
                  progress={scrollYProgress}
                  reduced={reduceMotion}
                >
                  {word}
                </Word>
                {index < words.length - 1 ? ' ' : null}
              </Fragment>
            ))}
          </h2>
          <RouteLink className="text-link" href="/technology">
            Trace the diagnostic chain <span aria-hidden="true">↗</span>
          </RouteLink>
        </div>
      </div>
    </section>
  );
}
