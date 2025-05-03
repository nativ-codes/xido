import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';

import { Text, Card, ListItem, Progress, Divider } from '@/common/components';
import { formatPercentValue, formatValue, getOverall, parseGoals, sortByNumbers } from '@/common/utils';
import { ScreenLayout } from '@/common/layouts';
import Store from '@/config/store/slices/user-data';
import colors from '@/common/colors';

import HomeInfoBottomSheet from './components/home-info-bottom-sheet/home-info-bottom-sheet';
import styles from './home.styles';
import { HomeInfoSections } from '@/types';
import { GeneralStyles } from '@/common/general-styles';

function Home() {
	const userData = Store.useUserData();
	const goals = Store.useGoals();
	const overall = getOverall(userData);
	const currency = Store.useCurrency();
	const last12MonthsDividend = Store.useLast12MonthsDividend();

	const parsedGoals = parseGoals({
		goals: sortByNumbers(goals, (item) => item.amount),
		value: last12MonthsDividend
	});
	const lastNotAchievedGoalIndex = parsedGoals.findIndex((goal) => !goal.isGoalAchieved);
	const lastAchievedGoal = parsedGoals[lastNotAchievedGoalIndex - 1]?.amount || 0;
	const nextGoal = parsedGoals[lastNotAchievedGoalIndex]?.amount || 0;
	const nextGoalProgress = parsedGoals[lastNotAchievedGoalIndex]?.progress || 0;

	const [infoSection, setInfoSection] = useState<HomeInfoSections>();
	const hideModal = () => setInfoSection(undefined);
	const showModal = (section: HomeInfoSections) => () => setInfoSection(section);

	return (
		<ScreenLayout title='Home' isEmpty={!Boolean(Object.values(userData).length)}>
			<View style={styles.wrapper}>
				<Card>
					<Card.Title title='Overall' onPress={showModal(HomeInfoSections.OVERALL)} />
					<ListItem leftText='Invested' rightText={formatValue(overall.boughtValue, currency)} />
					<ListItem leftText='Market value' rightText={formatValue(overall.marketValue, currency)} />
					<ListItem
						leftText='Profit/Loss'
						rightText={`${formatValue(overall.profitOrLoss, currency)} (${formatPercentValue(
							overall.profitOrLossPercentage
						)})`}
						variant={Number(overall.profitOrLoss) > 0 ? ListItem.variants.PROFIT : ListItem.variants.LOSS}
					/>
					<ListItem leftText='Dividends last 12 months' rightText={formatValue(last12MonthsDividend, currency)} />
					<ListItem leftText='Average dividend yield' rightText={formatPercentValue(overall.dividendYield)} />
					<Divider />
					<Card.Title title='Goals' onPress={showModal(HomeInfoSections.GOALS)} />
					{Boolean(lastAchievedGoal) && (
						<ListItem
							leftText='Latest goal achieved'
							rightText={`${formatValue(lastAchievedGoal, currency)} / month`}
						/>
					)}
					<ListItem leftText='Next goal' rightText={`${formatValue(nextGoal, currency)} / month`} />
					<View style={styles.goalProgressWrapper}>
						<View style={styles.goalHeader}>
							<Text color={colors.secondaryText} variant='h6'>
								{formatValue(lastAchievedGoal, currency)}
							</Text>
							<Text color={colors.primaryText} variant='h5' isBold>
								{formatPercentValue(nextGoalProgress)}
							</Text>
							<Text color={colors.secondaryText} variant='h6'>
								{formatValue(nextGoal, currency)}
							</Text>
						</View>
						<Progress value={nextGoalProgress} previousValue={0} />
					</View>
				</Card>
			</View>
			<HomeInfoBottomSheet infoSection={infoSection} hideModal={hideModal} />
		</ScreenLayout>
	);
}

export default Home;
