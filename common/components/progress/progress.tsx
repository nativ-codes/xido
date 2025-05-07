import React, { useEffect } from 'react';
import { View } from 'react-native';
import Animated, { useSharedValue, withTiming, useAnimatedStyle } from 'react-native-reanimated';
import styles from './progress.styles';
import { ProgressPropTypes } from './progress.types';
import { LONG_ANIMATION_DURATION } from '@/common/constants';

function Progress({ previousValue = 0, value = 0 }: ProgressPropTypes) {
	const progress = useSharedValue(previousValue);

	useEffect(() => {
		progress.value = withTiming(value, {
			duration: LONG_ANIMATION_DURATION
		});
	}, [value]);

	const animatedStyle = useAnimatedStyle(() => ({
		width: `${progress.value}%`
	}));

	return (
		<View style={styles.wrapper}>
			<Animated.View style={[styles.progress, animatedStyle]} />
		</View>
	);
}

export default Progress;
