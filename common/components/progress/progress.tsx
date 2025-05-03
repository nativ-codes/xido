import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, { useSharedValue, withTiming, useAnimatedStyle } from 'react-native-reanimated';
import styles from './progress.styles';

type ProgressPropTypes = {
	value: number;
	previousValue: number;
};

function Progress({ previousValue = 0, value = 0 }: ProgressPropTypes) {
	const progress = useSharedValue(previousValue);

	useEffect(() => {
		progress.value = withTiming(value, {
			duration: 1000,
		});
	}, [value]);

	const animatedStyle = useAnimatedStyle(() => {
		return {
			width: `${progress.value}%`
		};
	});

	return (
		<View style={styles.wrapper}>
			<Animated.View
				style={[styles.progress, animatedStyle]}
			/>
		</View>
	);
}

export default Progress;
