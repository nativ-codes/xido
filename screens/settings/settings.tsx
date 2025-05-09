import React from 'react';
import { TouchableOpacity, Linking, Alert } from 'react-native';
import { router } from 'expo-router';
import * as Application from 'expo-application';

import { Text, Card, ListItem } from '@/common/components';
import Store from '@/config/store/slices/user-data';
import { LegalTypes } from '@/types';
import { Colors } from '@/common/constants';

import { Analytics } from '@/config/analytics';
import TabScreenLayout from '@/common/layouts/tab-screen-layout/tab-screen-layout';
import Spacer from '@/common/layouts/spacer/spacer';
import { GeneralStyles } from '@/common/styles/general-styles';

function Settings() {
	const handleOnManageGoals = () => router.push('/manage-goals');

	const handleOnImportNewPortfolio = () =>
		Alert.alert(
			'Add new portfolio',
			'This action will remove all existing data and replace it with the new portfolio data.\nThis action cannot be undone.',
			[
				{ text: 'Cancel', style: 'cancel' },
				{
					text: 'Add portfolio',
					onPress: () => {
						Analytics.sendEvent(Analytics.events.import_portfolio, 'settings');
						router.push('/landing');
					}
				}
			]
		);

	const handleOnRemoveData = () =>
		Alert.alert(
			'Remove data',
			'This will permanently remove all data stored in the app, including imported transactions and generated insights.\nThis action cannot be undone.',
			[
				{ text: 'Cancel', style: 'cancel' },
				{
					text: 'Remove',
					style: 'destructive',
					onPress: () => {
						Store.clearAll();
						Analytics.sendEvent(Analytics.events.remove_data);
						Alert.alert('Success', 'All data has been successfully removed.', [{ text: 'OK' }]);
					}
				}
			]
		);

	const handleOnTermsAndConditions = () => router.push(`/legal?type=${LegalTypes.TERMS_AND_CONDITIONS}`);

	const handleOnPrivacyPolicy = () => router.push(`/legal?type=${LegalTypes.PRIVACY_POLICY}`);

	const handleOnFeedback = () =>
		Alert.alert(
			'Redirect to Feedback',
			'You will be redirected to the https://nativ.codes website to provide your feedback.',
			[
				{ text: 'Cancel', style: 'cancel' },
				{
					text: 'Proceed',
					onPress: () => Linking.openURL('https://nativ.codes?page=contact')
				}
			]
		);

	return (
		<TabScreenLayout title='Settings'>
			<Spacer direction='horizontal' size='s16' gap='s16'>
				<Card>
					<TouchableOpacity onPress={handleOnManageGoals}>
						<ListItem leftText='Manage goals' rightIcon='chevron-right' />
					</TouchableOpacity>
					<TouchableOpacity onPress={handleOnImportNewPortfolio}>
						<ListItem leftText='Import new portfolio' rightIcon='chevron-right' />
					</TouchableOpacity>
				</Card>
				<Card>
					<TouchableOpacity onPress={handleOnTermsAndConditions}>
						<ListItem leftText='Terms and Conditions' rightIcon='chevron-right' />
					</TouchableOpacity>
					<TouchableOpacity onPress={handleOnPrivacyPolicy}>
						<ListItem leftText='Privacy Policy' rightIcon='chevron-right' />
					</TouchableOpacity>
					<TouchableOpacity onPress={handleOnFeedback}>
						<ListItem leftText='Send us your feedback' rightIcon='chevron-right' />
					</TouchableOpacity>
				</Card>
				<Card>
					<TouchableOpacity onPress={handleOnRemoveData}>
						<ListItem leftText='Remove data' rightIcon='chevron-right' />
					</TouchableOpacity>
				</Card>
				<Spacer direction='top' size='s16' style={GeneralStyles.itemsCenter}>
					<Text color={Colors.secondaryText} variant='h5'>
						Xido v{Application.nativeApplicationVersion}
					</Text>
				</Spacer>
			</Spacer>
		</TabScreenLayout>
	);
}

export default Settings;
