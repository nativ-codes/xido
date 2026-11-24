import React, { useEffect, useRef } from 'react';
import { View, ScrollView, Pressable, useWindowDimensions } from 'react-native';

import { Text } from '@/common/components';
import { Colors } from '@/common/constants';
import { months } from '@/common/constants/configs';
import { formatValue } from '@/common/utils';

import styles from './month-grid.styles';

type MonthGridPropTypes = {
	calendar: any;
	currency: Parameters<typeof formatValue>[1];
	years: number[]; // newest first, so "›" and swiping left go back in time
	selectedYear: number;
	selectedMonth: string;
	onSelect: (year: number, month: string) => void;
};

const now = new Date();
const isFuture = (year: number, monthIndex: number) =>
	year > now.getFullYear() || (year === now.getFullYear() && monthIndex > now.getMonth());
const isCurrent = (year: number, monthIndex: number) => year === now.getFullYear() && monthIndex === now.getMonth();

function MonthGrid({ calendar, currency, years, selectedYear, selectedMonth, onSelect }: MonthGridPropTypes) {
	const { width } = useWindowDimensions();
	const scrollRef = useRef<React.ComponentRef<typeof ScrollView>>(null);
	const index = years.indexOf(selectedYear);
	const newerYear = years[index - 1];
	const olderYear = years[index + 1];

	useEffect(() => {
		scrollRef.current?.scrollTo({ x: index * width, animated: true });
	}, [index, width]);

	return (
		<View>
			<View style={styles.stepper}>
				<Pressable disabled={!newerYear} onPress={() => onSelect(newerYear, selectedMonth)} hitSlop={12}>
					<Text variant="h2" color={newerYear ? Colors.primaryText : Colors.border}>‹</Text>
				</Pressable>
				<Text variant="h3" isBold>{selectedYear}</Text>
				<Pressable disabled={!olderYear} onPress={() => onSelect(olderYear, selectedMonth)} hitSlop={12}>
					<Text variant="h2" color={olderYear ? Colors.primaryText : Colors.border}>›</Text>
				</Pressable>
			</View>
			<ScrollView
				ref={scrollRef}
				horizontal
				pagingEnabled
				showsHorizontalScrollIndicator={false}
				contentOffset={{ x: index * width, y: 0 }}
				onMomentumScrollEnd={(e) => {
					const year = years[Math.round(e.nativeEvent.contentOffset.x / width)];
					if (year && year !== selectedYear) onSelect(year, selectedMonth);
				}}>
				{years.map((year) => (
					<View key={year} style={[styles.grid, { width }]}>
						{months.map((month, i) => {
							const stats = calendar?.[year]?.data?.[month]?.stats;
							const received = stats?.totalDividends || 0;
							const expected = stats?.expectedDividends || 0;
							const isSelected = year === selectedYear && month === selectedMonth;
							const textColor = isSelected ? Colors.surface : isFuture(year, i) ? Colors.disable : undefined;

							return (
								<Pressable
									key={month}
									onPress={() => onSelect(year, month)}
									style={[styles.cell, isSelected && styles.selected, isCurrent(year, i) && !isSelected && styles.current]}>
									<Text variant="h5" isBold color={textColor ?? Colors.primaryText}>
										{month.slice(0, 3)}
									</Text>
									<Text variant="h6" color={textColor ?? Colors.secondaryText}>
										{/* "~" marks months that only have expected (not yet received) dividends */}
										{!received && expected ? `~${formatValue(expected, currency)}` : formatValue(received, currency)}
									</Text>
								</Pressable>
							);
						})}
					</View>
				))}
			</ScrollView>
		</View>
	);
}

export default MonthGrid;
