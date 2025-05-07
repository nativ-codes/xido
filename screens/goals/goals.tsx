import React from 'react';
import { View, StyleSheet } from 'react-native';
import Ionicons from '@expo/vector-icons/MaterialCommunityIcons';

import { ScreenLayout } from '@/common/layouts';
import { Text } from '@/common/components';
import { Colors } from '@/common/constants';
import { formatPercentValue, parseGoals, sortByNumbers } from '@/common/utils';
import Store from '@/config/store/slices/user-data';
import { MotiView } from 'moti';

import styles from './goals.styles';
import TabScreenLayout from '@/common/layouts/tab-screen-layout/tab-screen-layout';

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
			<View style={styles.wrapper}>
				{parsedGoals.map((goal, key) => (
					<View key={`${goal.title}-${goal.amount}`} style={styles.cardWrapper}>
						{parsedGoals.length > 1 && (
							<MotiView
								from={{ opacity: 0, scaleY: 0 }}
								animate={{ opacity: 1, scaleY: 1 }}
								transition={{ type: 'timing', duration: 500 }}
								delay={250 * key}
								style={StyleSheet.compose(
									styles.line,
									key === 0 ? styles.lineStart : key === goals.length - 1 ? styles.lineEnd : styles.lineMiddle
								)}
							/>
						)}
						<MotiView
							from={{ opacity: 0, scale: 0.8 }}
							animate={{ opacity: 1, scale: 1 }}
							transition={{ type: 'timing', duration: 500 }}
							delay={250 * key}>
							{goal.isGoalAchieved ? renderChecked : renderNotChecked}
						</MotiView>
						<MotiView
							from={{ opacity: 0, translateX: 20 }}
							animate={{ opacity: 1, translateX: 0 }}
							transition={{ type: 'timing', duration: 500 }}
							delay={250 * key}
							style={StyleSheet.compose(styles.card, { borderWidth: 1, borderColor: Colors.secondarySurface })}>
							<View style={styles.header}>
								<Text variant='h5' color={Colors.secondaryText}>
									{`${goal.isGoalAchieved ? '100%' : formatPercentValue(goal.progress)} progress`}
								</Text>
								<Text isBold>${goal.amount} / month</Text>
							</View>
							<Text>{goal.title}</Text>
						</MotiView>
					</View>
				))}
			</View>
		</TabScreenLayout>
	);
}

export default Goals;
