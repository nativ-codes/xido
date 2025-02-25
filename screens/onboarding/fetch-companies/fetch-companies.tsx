import React, { useEffect } from 'react';
import { StyleSheet, ActivityIndicator, View } from 'react-native';
import { router } from 'expo-router';
import Store from '@/config/store/slices/user-data';
import { Progress } from '@/common/components';
import {
	filterRawTransactions,
	getLast12MonthsDividend,
	parseTransactions,
	parseTransactionsForCalendar,
	parseTransactionsForLast12MonthsDividend,
	parseUserData,
	safelyPrintError
} from '@/common/utils';
import { mockedCompanies, mockedSymbols } from '@/__mocks__';
import { ScreenLayout } from '@/common/layouts';
import { getCompaniesInBatches } from '@/services/companies';
import colors from '@/common/colors';
import { defaultGoals } from '@/constants';
import styles from './fetch-companies.styles';
import { Analytics } from '@/config/analytics';

const shouldUseMockedData = false;

function FetchCompanies() {
	useEffect(() => {
		(async () => {
			try {
				const storedSymbols = shouldUseMockedData ? mockedSymbols : Store.getSymbols();
				const storedRawTransactions = Store.getRawTransactions();
				const filteredRawTransactions = filterRawTransactions(storedRawTransactions, storedSymbols);

				if (storedSymbols.length) {
					const parsedTransactions = parseTransactions(filteredRawTransactions);
					const companies = shouldUseMockedData ? mockedCompanies : await getCompaniesInBatches(storedSymbols);

					if (companies.length === storedSymbols.length) {
						const dividend = parseTransactionsForLast12MonthsDividend(filteredRawTransactions);
						const parsedTransactionsForLast12MonthsDividend = getLast12MonthsDividend(dividend);
						const parsedTransactionsForCalendar = parseTransactionsForCalendar(filteredRawTransactions);
						const parsedUserData = parseUserData({
							transactions: parsedTransactions,
							companies
						});
						console.log('parsedUserData', JSON.stringify(parsedUserData));

						const goals = Store.getGoals();
						Store.setGoals(goals.length ? goals : defaultGoals);

						Store.setCurrency(companies[0].currency);
						Store.setUserData(parsedUserData);
						Store.setTransactions(parsedTransactions);
						Store.setRawTransactions(filteredRawTransactions);
						Store.setCalendar(parsedTransactionsForCalendar);
						Store.setTimestamp(Date.now());
						Store.setLast12MonthsDividend(parsedTransactionsForLast12MonthsDividend);
					} else {
						console.log('lengths not matching', companies.length, storedSymbols.length);
					}
				} else {
					console.log('no symbols found');
				}
				router.navigate('/all-set');
			} catch (error) {
				console.error('FetchCompanies', error);
				Analytics.sendEvent(Analytics.events.error_fetch, safelyPrintError(error));
				router.navigate('/error-fetching');
			}
		})();
	}, []);

	return (
		<ScreenLayout canGoBack center={<Progress value={80} />}>
			<View style={StyleSheet.compose(StyleSheet.absoluteFill, styles.loading)}>
				<ActivityIndicator size='large' color={colors.primary} />
			</View>
		</ScreenLayout>
	);
}

export default FetchCompanies;
