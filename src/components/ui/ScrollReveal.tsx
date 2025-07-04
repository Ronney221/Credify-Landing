import { ReactNode } from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { scrollReveal } from '../../lib/animations';

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  threshold?: number;
  once?: boolean;
}

export function ScrollReveal({
  children,
  className,
  delay = 0,
  threshold = 0.1,
  once = true,
}: ScrollRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once,
    margin: '-10% 0px -10% 0px',
    amount: threshold,
  });

  return (
    <motion.div
      ref={ref}
      variants={scrollReveal}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface ScrollRevealListProps extends ScrollRevealProps {
  staggerDelay?: number;
  children: ReactNode[];
}

export function ScrollRevealList({
  children,
  className,
  delay = 0,
  staggerDelay = 0.1,
  threshold = 0.1,
  once = true,
}: ScrollRevealListProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once,
    margin: '-10% 0px -10% 0px',
    amount: threshold,
  });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className={className}
    >
      {children.map((child, index) => (
        <motion.div
          key={index}
          variants={scrollReveal}
          transition={{ delay: delay + index * staggerDelay }}
        >
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
} 