import React from 'react';
import { View } from 'react-native';
import { router } from 'expo-router';
import { View as MotiView } from 'moti';

import { Text, Button, Progress } from '@/common/components';
import { ScreenLayout } from '@/common/layouts';

import styles from './landing.styles';
import { bottomSlideInYLongAnimation, SHORT_ANIMATION_DURATION } from '@/common/constants';

const ANIMATION_FROM = { opacity: 0, translateY: 50 };
const ANIMATION_TO = { opacity: 1, translateY: 0 };

function Landing() {
	const handleOnUpload = () => {
		router.navigate('/upload-csv');
	};

	return (
		<ScreenLayout canGoBack center={<Progress previousValue={0} value={20} />}>
			<View style={styles.content}>
				<MotiView {...bottomSlideInYLongAnimation}>
					<Text variant='h1' isBold>
						Track your DGI portfolio
					</Text>
				</MotiView>
				<MotiView {...bottomSlideInYLongAnimation} delay={SHORT_ANIMATION_DURATION} style={styles.section}>
					<Text>
						It's easy to track your DGI portfolio and monitor your progress. Get clear stats and charts that show you
						exactly how close you are to reaching your goals.
					</Text>
					<Text>Let's get started!</Text>
				</MotiView>
			</View>
			<View style={styles.button}>
				<Button label='Begin' onPress={handleOnUpload} variant='primary' />
			</View>
		</ScreenLayout>
	);
}

export default Landing;
