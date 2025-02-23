import React, { useEffect, useMemo, useState } from 'react';
import { View } from 'react-native';
import { router } from 'expo-router';

import { maxCompaniesAllowed } from '@/constants';
import Store from '@/config/store/slices/user-data';
import { Selection, Text, Button, Progress } from '@/common/components';
import { ScreenLayout } from '@/common/layouts';

import styles from './select-companies.styles';
import { Analytics } from '@/config/analytics';

const keyExtractor = (item: string) => item;

function SelectCompanies() {
	const uploadedCompanies = useMemo(Store.getSymbols, []);
	const [selectedCompanies, setSelectedCompanies] = useState<string[]>([]);

	const selectAllText =
		uploadedCompanies.length <= maxCompaniesAllowed ? 'Select all' : `Select first ${maxCompaniesAllowed} companies`;
	const isContinueDisabled = selectedCompanies.length === 0;

	useEffect(() => {
		Analytics.sendEvent(Analytics.events.uploaded_companies, uploadedCompanies?.join(','));
	}, []);

	const handleOnPress = (companies: string[]) => {
		if (selectedCompanies.length <= maxCompaniesAllowed) {
			setSelectedCompanies(companies);
		}
	};

	const handleOnSelectAll = () => {
		if (uploadedCompanies.length <= maxCompaniesAllowed) {
			setSelectedCompanies(uploadedCompanies);
		} else {
			setSelectedCompanies(uploadedCompanies.slice(0, maxCompaniesAllowed));
		}
	};

	const handleOnContinue = () => {
		Store.setSymbols(selectedCompanies);
		Analytics.sendEvent(Analytics.events.selected_companies, selectedCompanies?.join(','));
		router.navigate('/fetch-companies');
	};

	return (
		<ScreenLayout canGoBack center={<Progress value={75} />}>
			<View style={styles.content}>
				<Text variant='h1' isBold>
					Select up to {maxCompaniesAllowed} companies you want to track
				</Text>
				<View style={styles.section}>
					<Selection
						isMultiple
						options={uploadedCompanies}
						selected={selectedCompanies}
						onPress={handleOnPress}
						Element={Selection.SelectableTag}
						keyExtractor={keyExtractor}
						labelExtractor={keyExtractor}
					/>
				</View>
			</View>
			<View style={styles.buttons}>
				<Button label={selectAllText} onPress={handleOnSelectAll} variant='secondary' />
				<Button isDisabled={isContinueDisabled} label='Continue' onPress={handleOnContinue} variant='primary' />
			</View>
		</ScreenLayout>
	);
}

export default SelectCompanies;
