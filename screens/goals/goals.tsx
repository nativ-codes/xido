import React from 'react';
import { View, StyleSheet } from 'react-native';
import Ionicons from '@expo/vector-icons/MaterialCommunityIcons';

import { ScreenLayout } from '@/common/layouts';
import { Text } from '@/common/components';
import colors from '@/common/colors';
import { formatPercentValue, parseGoals, sortByNumbers } from '@/common/utils';
import Store from '@/config/store/slices/user-data';

import styles from './goals.styles';

function Goals() {
    const goals = Store.useGoals();
    const last12MonthsDividend = Store.useLast12MonthsDividend();

    const parsedGoals = parseGoals({
        goals: sortByNumbers(goals, item => item.amount),
        value: last12MonthsDividend
    });

    const renderChecked = (
        <View style={styles.checked}>
            <Ionicons name="check" size={24} color={colors.background} />
        </View>        
    )

    const renderNotChecked = (
        <View style={styles.notChecked} />
    )

    return (
			<ScreenLayout title='Goals' isEmpty={!Boolean(goals.length)}>
				<View style={styles.wrapper}>
					{parsedGoals.map((goal, key) => (
						<View key={`${goal.title}-${goal.amount}`} style={styles.cardWrapper}>
							{parsedGoals.length > 1 && (
								<View
									style={StyleSheet.compose(
										styles.line,
										key === 0 ? styles.lineStart : key === goals.length - 1 ? styles.lineEnd : styles.lineMiddle
									)}
								/>
							)}
							{goal.isGoalAchieved ? renderChecked : renderNotChecked}
							<View style={styles.card}>
								<View style={styles.header}>
									<Text variant="h5" color={colors.secondaryText}>
										{`${goal.isGoalAchieved ? '100%' : formatPercentValue(goal.progress)} progress`}
									</Text>
									<Text isBold>${goal.amount} / month</Text>
								</View>
								<Text>{goal.title}</Text>
							</View>
						</View>
					))}
				</View>
			</ScreenLayout>
		);
};

export default Goals;