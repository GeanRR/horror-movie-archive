import type { Transition, Variants } from "framer-motion";

export const motionTransition: Transition = {
  duration: 0.32,
  ease: [0.16, 1, 0.3, 1],
};

export const fadeIn: Variants = {
  hidden: { opacity: 0, transition: { duration: 0.18, ease: "easeOut" } },
  visible: { opacity: 1, transition: motionTransition },
};

export const slideInFromLeft: Variants = {
  hidden: {
    opacity: 0,
    x: -12,
    transition: { duration: 0.18, ease: "easeOut" },
  },
  visible: { opacity: 1, x: 0, transition: motionTransition },
};

export const slideInFromRight: Variants = {
  hidden: {
    opacity: 0.96,
    x: "100%",
    transition: { duration: 0.22, ease: [0.4, 0, 1, 1] },
  },
  visible: { x: 0, transition: motionTransition },
};

export const overlayFade: Variants = {
  hidden: { opacity: 0, transition: { duration: 0.2, ease: "easeOut" } },
  visible: { opacity: 1, transition: motionTransition },
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.06 },
  },
};
