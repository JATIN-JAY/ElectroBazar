import { useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';

/**
 * Custom hook for scroll reveal animations
 * Triggers animations when element enters viewport
 * @example
 * const { ref, isInView } = useScrollReveal();
 * <motion.div ref={ref} animate={isInView ? "visible" : "hidden"} variants={...}>
 */
export function useScrollReveal(threshold = 0.2, once = false) {
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: threshold, once });
  
  return { ref, isInView };
}

/**
 * Animation variants for common animations
 */
export const animationVariants = {
  // Fade in from bottom
  fadeInUp: {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  },
  
  // Fade in from left
  fadeInLeft: {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  },
  
  // Fade in from right
  fadeInRight: {
    hidden: { opacity: 0, x: 30 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  },
  
  // Scale in
  scaleIn: {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: 'easeOut' } },
  },
  
  // Stagger container
  staggerContainer: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  },
  
  // Stagger item
  staggerItem: {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  },
};
