import { Variants } from 'framer-motion';

export const fadeIn: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

export const fadeInLeft: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0 },
};

export const fadeInRight: Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0 },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1 },
};

export const staggerChildren = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export const slideInFromBottom: Variants = {
  hidden: { y: '100%' },
  visible: { y: 0 },
};

export const hoverScale = {
  scale: 1.02,
  transition: { type: 'spring', stiffness: 400, damping: 10 },
};

export const tapScale = {
  scale: 0.98,
};

export const transition = {
  type: 'spring',
  stiffness: 200,
  damping: 20,
};

export const scrollReveal: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
    transition: { duration: 0.6 },
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
}; 