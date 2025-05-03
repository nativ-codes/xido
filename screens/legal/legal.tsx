import React from 'react';
import { View } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

import { Text } from '@/common/components';
import { ScreenLayout } from '@/common/layouts';
import { Legal as LegalConstant } from '@/common/constants';
import { LegalTypes } from '@/types';
import colors from '@/common/constants/colors';

import styles from './legal.styles';

function Legal() {
	const { type }: { type: LegalTypes } = useLocalSearchParams();
	const data = LegalConstant[type];

	return (
		<ScreenLayout canGoBack title={data.title}>
			<View style={styles.wrapper}>
				<Text variant="h5" color={colors.secondaryText}>
					{data.lastUpdated}
				</Text>
				{data.sections.map(({ title, content, sections }, index) => (
					<View key={title}>
						<Text isBold>
							{index + 1}. {title}
						</Text>
						{Boolean(content) && <Text>{content}</Text>}
						{Boolean(sections) &&
							sections?.map(({ content }) => (
								<View key={content} style={styles.section}>
									<Text> - {content}</Text>
								</View>
							))}
					</View>
				))}
			</View>
		</ScreenLayout>
	);
}

export default Legal;
