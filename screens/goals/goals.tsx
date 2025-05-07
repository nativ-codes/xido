import React from 'react';
import { View, StyleSheet } from 'react-native';
import Ionicons from '@expo/vector-icons/MaterialCommunityIcons';

import { Card, Text } from '@/common/components';
import { Colors, scaleInAnimation, scaleInYAnimation, SHORT_ANIMATION_DURATION, smallSlideInXAnimation } from '@/common/constants';
import { formatPercentValue, parseGoals, sortByNumbers } from '@/common/utils';
import Store from '@/config/store/slices/user-data';
import { MotiView } from 'moti';

import styles from './goals.styles';
import TabScreenLayout from '@/common/layouts/tab-screen-layout/tab-screen-layout';
import { GeneralStyles } from '@/common/styles/general-styles';
import { Spacer } from '@/common/layouts';

function Goals() {
	const goals = Store.useGoals();
	const last12MonthsDividend = Store.useLast12MonthsDividend();

	const parsedGoals = parseGoals({
		goals: sortByNumbers(goals, (item) => item.amount),
		value: last12MonthsDividend
	});

	const renderChecked = (
		<View style={styles.checked}>
			<Ionicons name='check' size={24} color={Colors.background} />
		</View>
	);

	const renderNotChecked = <View style={styles.notChecked} />;

	return (
		<TabScreenLayout title='Goals' isEmpty={!Boolean(goals.length)}>
			<Spacer direction='horizontal' size='s16' gap='s16'>
				{parsedGoals.map((goal, key) => (
					<Spacer gap='s16' key={`${goal.title}-${goal.amount}`} style={styles.cardWrapper}>
						{parsedGoals.length > 1 && (
							<MotiView
								{...scaleInYAnimation}
								delay={SHORT_ANIMATION_DURATION * key}
								style={StyleSheet.compose(
									styles.line,
									key === 0 ? styles.lineStart : key === goals.length - 1 ? styles.lineEnd : styles.lineMiddle
								)}
							/>
						)}
						<MotiView {...scaleInAnimation} delay={SHORT_ANIMATION_DURATION * key}>
							{goal.isGoalAchieved ? renderChecked : renderNotChecked}
						</MotiView>
						<MotiView
							{...smallSlideInXAnimation}
							delay={SHORT_ANIMATION_DURATION * key}
							style={GeneralStyles.shrink}
							>
								<Card gap='s8'>
									<Spacer gap='s4'>
										<Text variant='h5' color={Colors.secondaryText}>
											{`${goal.isGoalAchieved ? '100%' : formatPercentValue(goal.progress)} progress`}
										</Text>
										<Text isBold>${goal.amount} / month</Text>
									</Spacer>
									<Text>{goal.title}</Text>
								</Card>
						</MotiView>
					</Spacer>
				))}
			</Spacer>
		</TabScreenLayout>
	);
}

export default Goals;
