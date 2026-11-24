import React, { useMemo, useState } from 'react';
import { View } from 'react-native';

import { Text, Card, ListItem, Divider, EmptyPlaceholder } from '@/common/components';
import { ScreenLayout } from '@/common/layouts';
import Store from '@/config/store/slices/user-data';
import {
	formatPercentValue,
	formatValue,
	sortByKey
} from '@/common/utils';
import { months } from '@/common/constants/configs';
import MonthGrid from './components/month-grid/month-grid';

import styles from './calendar.styles';
import CalendarInfoBottomSheet from './components/calendar-info-bottom-sheet/calendar-info-bottom-sheet';
import TabScreenLayout from '@/common/layouts/tab-screen-layout/tab-screen-layout';

type SortKeyExtractorPropTypes = [
	symbol: string,
	{
		totalDividends: number;
	}
];

const sortKeyExtractor = ([symbol, { totalDividends }]: SortKeyExtractorPropTypes) => totalDividends;

function Calendar() {
	const calendar = Store.useCalendar();
	const currency = Store.useCurrency();

	// all years with data + the current year (so upcoming months are reachable), newest first
	const years = useMemo(
		() => [...new Set([...Object.keys(calendar).map(Number), new Date().getFullYear()])].sort((a, b) => b - a),
		[calendar]
	);
	const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
	const [selectedMonth, setSelectedMonth] = useState<string>(months[new Date().getMonth()]);
	const currentMonth = calendar?.[selectedYear]?.data?.[selectedMonth];
	const [isInfoVisible, setIsInfoVisible] = useState(false);

	const showModal = () => setIsInfoVisible(true);
	const hideModal = () => setIsInfoVisible(false);

	const handleOnSelect = (year: number, month: string) => {
		setSelectedYear(year);
		setSelectedMonth(month);
	};

	return (
		<TabScreenLayout
			emptyPlaceholder={
				Boolean(currency) ? (
					<EmptyPlaceholder shouldHideButton title='No dividend records found in the uploaded portfolio.' />
				) : undefined
			}
			isEmpty={!Object.keys(calendar).length}
			title='Dividend calendar'>
			<MonthGrid
				calendar={calendar}
				currency={currency}
				years={years}
				selectedYear={selectedYear}
				selectedMonth={selectedMonth}
				onSelect={handleOnSelect}
			/>
			<View style={styles.wrapper}>
				<View style={styles.header}>
					<Text variant="h2">
						{selectedMonth} {selectedYear}
					</Text>
				</View>
				<View style={styles.content}>
					<Card>
						<Card.Title title='Overall' onPress={showModal} />
						{Boolean(currentMonth?.stats?.totalDividends) && (
							<ListItem
								leftText='Month weight'
								rightText={formatPercentValue(
									(currentMonth?.stats?.totalDividends / calendar?.[selectedYear]?.stats?.totalDividends) * 100
								)}
							/>
						)}
						{Boolean(calendar?.[selectedYear]?.stats?.expectedDividends) && (
							<ListItem
								leftText='Expected month weight'
								rightText={formatPercentValue(
									((currentMonth?.stats?.totalDividends || currentMonth?.stats?.expectedDividends || 0) /
										(calendar?.[selectedYear]?.stats?.totalDividends +
											(calendar?.[selectedYear]?.stats?.expectedDividends || 1))) *
										100
								)}
							/>
						)}
						{Boolean(currentMonth?.stats?.expectedDividends) ? (
							<ListItem
								leftText='Expected dividends this month'
								rightText={formatValue(currentMonth?.stats?.expectedDividends || 0, currency)}
							/>
						) : (
							<ListItem
								leftText='Dividends this month'
								rightText={formatValue(currentMonth?.stats?.totalDividends || 0, currency)}
							/>
						)}
						{!Boolean(currentMonth?.stats?.expectedDividends) && (
							<ListItem
								leftText='Dividends this year'
								rightText={formatValue(calendar?.[selectedYear]?.stats?.totalDividends || 0, currency)}
							/>
						)}
						{Boolean(calendar?.[selectedYear]?.stats?.expectedDividends) && (
							<ListItem
								leftText='Expected dividends this year'
								rightText={formatValue(
									calendar?.[selectedYear]?.stats?.totalDividends + (calendar?.[selectedYear]?.stats?.expectedDividends || 0),
									currency
								)}
							/>
						)}
						{Boolean(currentMonth?.data) && (
							<>
								<Divider />
								<Card.Title title='Companies' />
								{sortByKey(Object.entries(currentMonth.data), sortKeyExtractor).map(
									([symbol, { totalDividends }]: SortKeyExtractorPropTypes) => (
										<ListItem key={symbol} leftText={symbol} rightText={formatValue(totalDividends, currency)} />
									)
								)}
							</>
						)}
					</Card>
				</View>
			</View>
			<CalendarInfoBottomSheet isVisible={isInfoVisible} hideModal={hideModal} />
		</TabScreenLayout>
	);
}

export default Calendar;
