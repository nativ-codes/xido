import React, { useState } from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import Ionicons from '@expo/vector-icons/MaterialCommunityIcons';
import { router } from 'expo-router';

import { OpenPositionsType, parseTransactionsForTotalCompanies, parseUnsupportedTickers, uploadCsv, validateColumnTitles } from '@/common/utils';
import { Text, Button, Progress } from '@/common/components';
import { TransactionType } from '@/types';
import { ScreenLayout } from '@/common/layouts';
import Store from '@/config/store/slices/user-data';
import { bottomSlideInYLongAnimation, Colors, MEDIUM_ANIMATION_DURATION, SHORT_ANIMATION_DURATION } from '@/common/constants';

import HelpBottomSheet from './components/help-bottom-sheet/help-bottom-sheet';
import styles from './upload-csv.styles';
import Animated from 'react-native-reanimated';

function UploadCsv() {
	const [uploadedTransactions, setUploadedTransactions] = useState('');
	const [isHelpModalVisible, setIsHelpModalVisible] = useState(false);
	const [isError, setIsError] = useState(false);

	const boxContentColor = isError ? Colors.error : Colors.primary;
	const isButtonDisabled = !Boolean(uploadedTransactions) || isError;

	const showHelpModal = () => setIsHelpModalVisible(true);
	const hideHelpModal = () => setIsHelpModalVisible(false);

	const handleOnUpload = async () => {
		try {
			const response = (await uploadCsv()) as { data: TransactionType[]; openPositions: OpenPositionsType };

			if (response.data.length) {
				if (validateColumnTitles(response.data[0])) {
					const { openPositions } = response;
					// Fully sold companies are no longer held, so there is nothing to value or track
					const parsedTransactionsForTotalCompanies = parseTransactionsForTotalCompanies(response.data).filter(
						(symbol) => !Object.keys(openPositions).length || openPositions[symbol]
					);

					const unsupportedTickers = parseUnsupportedTickers(response.data);
					const skipped = unsupportedTickers.length
						? `\nSkipped ${unsupportedTickers.join(', ')}: only US shares are supported.`
						: '';

					if (!parsedTransactionsForTotalCompanies.length) {
						setIsError(true);
						setUploadedTransactions(`No US shares currently held were found.${skipped}`);
						return;
					}

					Store.setSymbols(parsedTransactionsForTotalCompanies);
					Store.setRawTransactions(response.data);
					Store.setOpenPositions(response.openPositions);

					setUploadedTransactions(`${parsedTransactionsForTotalCompanies.length} companies found.${skipped}`);
					setIsError(false);
				} else {
					setIsError(true);
					setUploadedTransactions('Invalid column titles. Please make sure the file has the correct format.');
				}
			} else {
				setIsError(true);
				setUploadedTransactions('Unable to parse the file. Please make sure the file has the correct format.');
			}
		} catch (error) {
			// doesn't upload the file
			console.log('handleOnUpload', error);
		}
	};

	const handleOnContinue = () => {
		router.navigate('/select-companies');
	};

	return (
		<ScreenLayout
			canGoBack
			center={<Progress previousValue={20} value={40} />}
			right={
				<Button.Icon onPress={showHelpModal} name='help-circle-outline' size='medium' color={Colors.secondaryText} />
			}>
			<View style={styles.content}>
				<Animated.View entering={bottomSlideInYLongAnimation()}>
					<Text variant='h1' isBold>
						Upload the exported XLSX file
					</Text>
				</Animated.View>
				<Animated.View entering={bottomSlideInYLongAnimation(SHORT_ANIMATION_DURATION)}>
					<Text>
						Go to the XTB platform, export your transaction history as an XLSX file, and then upload it here.
					</Text>
				</Animated.View>
				<Animated.View entering={bottomSlideInYLongAnimation(MEDIUM_ANIMATION_DURATION)}>
					<TouchableOpacity
						onPress={handleOnUpload}
						activeOpacity={0.7}
						style={StyleSheet.compose(styles.uploadBox, isError && styles.errorBox)}>
						{Boolean(uploadedTransactions) ? (
							<View style={styles.boxContent}>
								<Ionicons name={isError ? 'close' : 'check'} size={24} color={boxContentColor} />
								<Text textAlign='center' color={boxContentColor}>
									{uploadedTransactions}
								</Text>
							</View>
						) : (
							<View style={styles.boxContent}>
								<Ionicons name='file-document-outline' size={24} color={Colors.disable} />
								<Text textAlign='center' color={Colors.disable}>
									Select file
								</Text>
							</View>
						)}
					</TouchableOpacity>
				</Animated.View>
			</View>
			<View style={styles.button}>
				<Button isDisabled={isButtonDisabled} label='Continue' onPress={handleOnContinue} variant='primary' />
			</View>
			<HelpBottomSheet isVisible={isHelpModalVisible} hideModal={hideHelpModal} />
		</ScreenLayout>
	);
}

export default UploadCsv;
