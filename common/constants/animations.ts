import { FadeInDown, FadeInRight, FadeInUp, Keyframe } from 'react-native-reanimated';

export const LONG_ANIMATION_DURATION = 750;
export const MEDIUM_ANIMATION_DURATION = 500;
export const SHORT_ANIMATION_DURATION = 250;

// Factories, not shared instances: Reanimated's .delay() mutates the builder it's called on
export const smallSlideInYAnimation = (delay = 0) => FadeInDown.duration(SHORT_ANIMATION_DURATION).delay(delay);

export const topSlideInYLongAnimation = (delay = 0) => FadeInDown.duration(LONG_ANIMATION_DURATION).delay(delay);

export const bottomSlideInYLongAnimation = (delay = 0) => FadeInUp.duration(LONG_ANIMATION_DURATION).delay(delay);

export const smallSlideInXAnimation = (delay = 0) => FadeInRight.duration(SHORT_ANIMATION_DURATION).delay(delay);

export const scaleInAnimation = (delay = 0) =>
	new Keyframe({
		0: { opacity: 0, transform: [{ scale: 0.8 }] },
		100: { opacity: 1, transform: [{ scale: 1 }] }
	})
		.duration(SHORT_ANIMATION_DURATION)
		.delay(delay);

export const scaleInYAnimation = (delay = 0) =>
	new Keyframe({
		0: { opacity: 0, transform: [{ scaleY: 0 }] },
		100: { opacity: 1, transform: [{ scaleY: 1 }] }
	})
		.duration(SHORT_ANIMATION_DURATION)
		.delay(delay);
