export const LONG_ANIMATION_DURATION = 750;
export const MEDIUM_ANIMATION_DURATION = 500;
export const SHORT_ANIMATION_DURATION = 250;

export const fadeIn = {
  from: { opacity: 0 },
  to: { opacity: 1 },
};

export const fadeOut = {
  from: { opacity: 1 },
  to: { opacity: 0 },
};

export const smallSlideInYAnimation = {
  from: { opacity: 0, translateY: -20 },
  animate: { opacity: 1, translateY: 0 },
  transition: { type: "timing" as const, duration: SHORT_ANIMATION_DURATION },
};

export const topSlideInYLongAnimation = {
  from: { opacity: 0, translateY: -20 },
  animate: { opacity: 1, translateY: 0 },
  transition: { type: "timing" as const, duration: LONG_ANIMATION_DURATION },
};

export const bottomSlideInYLongAnimation = {
  from: { opacity: 0, translateY: 20 },
  animate: { opacity: 1, translateY: 0 },
  transition: { type: "timing" as const, duration: LONG_ANIMATION_DURATION },
};

export const smallSlideInXAnimation = {
  from: { opacity: 0, translateX: 20 },
  animate: { opacity: 1, translateX: 0 },
  transition: { type: "timing" as const, duration: SHORT_ANIMATION_DURATION },
};

export const scaleInAnimation = {
  from: { opacity: 0, scale: 0.8 },
  animate: { opacity: 1, scale: 1 },
  transition: { type: "timing" as const, duration: SHORT_ANIMATION_DURATION },
};

export const scaleInYAnimation = {
  from: { opacity: 0, scaleY: 0 },
  animate: { opacity: 1, scaleY: 1 },
  transition: { type: "timing" as const, duration: SHORT_ANIMATION_DURATION },
};
