import React, { useEffect, useState } from 'react';
import { StyleSheet, ActivityIndicator, View } from 'react-native';
import { router } from 'expo-router';
import Store from '@/config/store/slices/user-data';
import { Progress, Text, Button } from '@/common/components';
import { safelyPrintError } from '@/common/utils';
import { mockedSymbols } from '@/__mocks__';
import { ScreenLayout, Spacer } from '@/common/layouts';
import { Colors } from '@/common/constants';
import styles from './fetch-companies.styles';
import { Analytics } from '@/config/analytics';
import { fetchCompanies, shouldUseMockedData } from './fetch-companies.service';
import { FetchCompaniesErrorEnum } from './fetch-companies.types';
import { CompanyData } from '@/types';
import { setDataByCompanyData, getErrorMessage } from './fetch-companies.utils';
import Ionicons from '@expo/vector-icons/MaterialCommunityIcons';

function FetchCompanies() {
	const [error, setError] = useState<string>('');
	const [companiesData, setCompaniesData] = useState<CompanyData[]>([]);
	const storedSymbols = shouldUseMockedData ? mockedSymbols : Store.getSymbols();

	useEffect(() => {
		(async () => {
			try {
				const { companies, error } = await fetchCompanies({ storedSymbols });

				if (error) {
					if (error.type === FetchCompaniesErrorEnum.MISSING_COMPANIES) {
						setCompaniesData(companies as CompanyData[]);
						setError(getErrorMessage(error.data));
					} else {
						router.navigate('/error-fetching');
					}
				} else {
					setDataByCompanyData({ companies: companies as CompanyData[], storedSymbols });
				}

				router.navigate('/all-set');
			} catch (error) {
				console.error('FetchCompanies', error);
				Analytics.sendEvent(Analytics.events.error_fetch, safelyPrintError(error));
				router.navigate('/error-fetching');
			}
		})();
	}, []);

	const handleOnPress = () => {
		setDataByCompanyData({ companies: companiesData as CompanyData[], storedSymbols });
		setError('');
		router.navigate('/all-set');
	}

	return (
		<ScreenLayout canGoBack center={<Progress previousValue={60} value={80} />}>
			{error ? (
				<Spacer direction="full" size="s64" gap="s8" style={styles.errorWrapper}>
					<Ionicons name='magnify' size={72} color={Colors.disable} />
					<Spacer gap="s32" style={styles.errorContent}>
						<Text textAlign='center' variant='h3' color={Colors.disable}>
							{error}
						</Text>
						<Button variant='primary' label='Proceed' onPress={handleOnPress} />
					</Spacer>
				</Spacer>
			) : (
				<View style={StyleSheet.compose(StyleSheet.absoluteFill, styles.loading)}>
					<ActivityIndicator size='large' color={Colors.primary} />
				</View>
			)}
		</ScreenLayout>
	);
}

export default FetchCompanies;
