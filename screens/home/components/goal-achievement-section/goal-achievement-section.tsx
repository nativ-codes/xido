import React from 'react';
import { View } from 'react-native';

import { Text, Card, ListItem, Progress } from '@/common/components';
import { formatValue, parseGoals, sortByNumbers } from '@/common/utils';
import Store from '@/config/store/slices/user-data';
import { Colors, currencies } from '@/common/constants';

import styles from './goal-achievement-section.styles';
import Spacer from '@/common/layouts/spacer/spacer';
import AnimatedCounter from '@/common/components/animated-counter/animated-counter';

function GoalAchievementSection() {
	const goals = Store.useGoals();
	const currency = Store.useCurrency();
	const last12MonthsDividend = Store.useLast12MonthsDividend();

	const parsedGoals = parseGoals({
		goals: sortByNumbers(goals, (item) => item.amount),
		value: last12MonthsDividend
	});
	const lastNotAchievedGoalIndex = parsedGoals.findIndex((goal) => !goal.isGoalAchieved);
	const lastAchievedGoal = parsedGoals[lastNotAchievedGoalIndex - 1]?.amount || 0;
	const nextGoal = parsedGoals[lastNotAchievedGoalIndex];
	const nextGoalAmount = nextGoal?.amount || 0;
	const nextGoalProgress = nextGoal?.progress || 0;
	const nextGoalLabel = nextGoal?.title || '';

	return (
		<Card gap='s16'>
			<Spacer gap='s4'>
				<Text variant='h5' letterSpacing={1} textTransform='uppercase' textAlign='center'>
					Monthly dividend
				</Text>
				<AnimatedCounter
					to={last12MonthsDividend / 12}
					valueFormatter={(value) => `${currencies[currency]}${value.toFixed(2)}`}
					style={styles.monthlyDividendText}
				/>
				<Text variant='h4' textAlign='center'>
					{nextGoalLabel}
				</Text>
			</Spacer>
			<Spacer gap='s16'>
				<View>
					{Boolean(lastAchievedGoal) && (
						<ListItem
							leftText='Latest goal achieved'
							rightText={`${formatValue(lastAchievedGoal, currency)} / month`}
						/>
					)}
					<ListItem leftText='Next goal' rightText={`${formatValue(nextGoalAmount, currency)} / month`} />
				</View>
				<Spacer gap='s8'>
					<View style={styles.goalHeader}>
						<Text color={Colors.secondaryText} variant='h6'>
							{formatValue(0, currency)}
						</Text>
						<AnimatedCounter
							to={nextGoalProgress}
							valueFormatter={(value) => `${value.toFixed(2)}%`}
							style={styles.goalHeaderText}
						/>
						<Text color={Colors.secondaryText} variant='h6'>
							{formatValue(nextGoalAmount, currency)}
						</Text>
					</View>
					<Progress value={nextGoalProgress} previousValue={0} />
				</Spacer>
			</Spacer>
		</Card>
	);
}

export default GoalAchievementSection;
