import React from 'react';
import { View } from 'react-native';
import { router } from 'expo-router';
import Ionicons from '@expo/vector-icons/MaterialCommunityIcons';

import Text from '@/common/components/text/text';
import Button from '@/common/components/button/button';
import { Colors } from '@/common/constants';

import styles from './empty-placeholder.styles';
import { Analytics } from '@/config/analytics';
import { uploadCsv } from '@/common/utils';

type EmptyPlaceholderPropsType = {
	title?: string;
	shouldHideButton?: boolean;
};

function EmptyPlaceholder({ title = 'There is no data to display', shouldHideButton }: EmptyPlaceholderPropsType) {
	const handleOnImportPortfolio = () => {
		Analytics.sendEvent(Analytics.events.import_portfolio, 'placeholder');
		router.push('/landing');
	};

	return (
		<View style={styles.wrapper}>
			<Ionicons name='magnify' size={72} color={Colors.disable} />
			<View style={styles.content}>
				<Text textAlign='center' variant='h3' color={Colors.disable}>
					{title}
				</Text>
				{!shouldHideButton && <Button variant='primary' label='Import a portfolio' onPress={handleOnImportPortfolio} />}
			</View>
		</View>
	);
}

export default EmptyPlaceholder;
