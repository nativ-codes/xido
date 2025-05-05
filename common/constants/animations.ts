export const LONG_ANIMATION_DURATION = 900;
export const MEDIUM_ANIMATION_DURATION = 600;
export const SHORT_ANIMATION_DURATION = 300;

export const fadeIn = {
	from: { opacity: 0 },
	to: { opacity: 1 }
};

export const fadeOut = {
	from: { opacity: 1 },
	to: { opacity: 0 }
};

export const smallSlideInAnimation = {
	from: { opacity: 0, translateY: -10 },
	animate: { opacity: 1, translateY: 0 },
	transition: { type: 'timing' as const, duration: SHORT_ANIMATION_DURATION }
};

export const mediumSlideInAnimation = {
	from: { opacity: 0, translateY: 50 },
	animate: { opacity: 1, translateY: 0 },
	transition: { type: 'timing' as const, duration: SHORT_ANIMATION_DURATION }
};
