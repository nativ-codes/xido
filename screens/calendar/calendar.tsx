import React, { useMemo, useState } from 'react';
import { View, ScrollView } from 'react-native';

import { Text, Selection, Card, ListItem, Divider, EmptyPlaceholder } from '@/common/components';
import { ScreenLayout } from '@/common/layouts';
import Store from '@/config/store/slices/user-data';
import {
	formatPercentValue,
	formatValue,
	defaultKeyExtractor,
	sortByKey,
	sortByMonthKeyExtractor
} from '@/common/utils';

import styles from './calendar.styles';
import CalendarInfoBottomSheet from './components/calendar-info-bottom-sheet/calendar-info-bottom-sheet';

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

	const years = useMemo(() => Object.keys(calendar).reverse(), [calendar]);
	const [selectedYear, setSelectedYear] = useState(parseInt(years[0]));
	const months = useMemo(
		() =>
			sortByKey(
				Object.keys(calendar[selectedYear]?.data || {}),
				sortByMonthKeyExtractor((item) => item)
			),
		[calendar, selectedYear]
	);
	const [selectedMonth, setSelectedMonth] = useState<string>(months[0]);
	const currentMonth = calendar?.[selectedYear]?.data?.[selectedMonth];
	const [isInfoVisible, setIsInfoVisible] = useState(false);

	const showModal = () => setIsInfoVisible(true);
	const hideModal = () => setIsInfoVisible(false);

	const handleOnChangeYear = (year: number) => {
		setSelectedYear(year);

		if (!calendar[year]?.data?.[selectedMonth]) {
			setSelectedMonth(Object.keys(calendar[year].data)[0]);
		}
	};

	const renderDateTabs = useMemo(
		() => (props: any) => <Selection.SelectableTag {...props} size="small" />,
		[]
	);

	return (
		<ScreenLayout
			emptyPlaceholder={
				Boolean(currency) ? (
					<EmptyPlaceholder shouldHideButton title='No dividend records found in the uploaded portfolio.' />
				) : undefined
			}
			isEmpty={!Boolean(years.length)}
			title='Dividend calendar'>
			<View style={styles.tabWrapper}>
				<ScrollView contentContainerStyle={styles.tabs} horizontal showsHorizontalScrollIndicator={false}>
					<Selection
						options={years}
						onPress={handleOnChangeYear}
						selected={selectedYear}
						Element={renderDateTabs}
						keyExtractor={defaultKeyExtractor}
						labelExtractor={defaultKeyExtractor}
					/>
				</ScrollView>
			</View>
			<View style={styles.tabWrapper}>
				<ScrollView contentContainerStyle={styles.tabs} horizontal showsHorizontalScrollIndicator={false}>
					<Selection
						options={months}
						onPress={setSelectedMonth}
						selected={selectedMonth}
						Element={renderDateTabs}
						keyExtractor={defaultKeyExtractor}
						labelExtractor={defaultKeyExtractor}
					/>
				</ScrollView>
			</View>
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
								rightText={formatValue(currentMonth?.stats?.totalDividends, currency)}
							/>
						)}
						{!Boolean(currentMonth?.stats?.expectedDividends) && (
							<ListItem
								leftText='Dividends this year'
								rightText={formatValue(calendar?.[selectedYear]?.stats?.totalDividends, currency)}
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
						<Divider />
						<Card.Title title='Companies' />
						{sortByKey(Object.entries(currentMonth?.data || {}), sortKeyExtractor).map(
							([symbol, { totalDividends }]: SortKeyExtractorPropTypes) => (
								<ListItem key={symbol} leftText={symbol} rightText={formatValue(totalDividends, currency)} />
							)
						)}
					</Card>
				</View>
			</View>
			<CalendarInfoBottomSheet isVisible={isInfoVisible} hideModal={hideModal} />
		</ScreenLayout>
	);
}

export default Calendar;
