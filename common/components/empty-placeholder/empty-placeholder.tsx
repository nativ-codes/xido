import React from 'react';
import { View } from 'react-native';
import { router } from 'expo-router';
import Ionicons from '@expo/vector-icons/MaterialCommunityIcons';

import Text from '@/common/components/text/text';
import Button from '@/common/components/button/button';
import colors from '@/common/colors';

import styles from './empty-placeholder.styles';

type EmptyPlaceholderPropsType = {
    title?: string;
    shouldHideButton?: boolean;
}

function EmptyPlaceholder({ title = 'There is no data to display', shouldHideButton }: EmptyPlaceholderPropsType) {
	const handleOnImportPortfolio = () => router.push('/landing');

	return (
		<View style={styles.wrapper}>
			<Ionicons name='magnify' size={72} color={colors.disable} />
			<View style={styles.content}>
				<Text textAlign='center' variant="h3" color={colors.disable}>
					{title}
				</Text>
				{!shouldHideButton && (
					<Button variant="primary" label='Import a portfolio' onPress={handleOnImportPortfolio} />
				)}
			</View>
		</View>
	);
}

export default EmptyPlaceholder;