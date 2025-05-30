import React, { useState } from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import Ionicons from '@expo/vector-icons/MaterialCommunityIcons';
import { router } from 'expo-router';

import { parseTransactionsForTotalCompanies, uploadCsv, validateColumnTitles } from '@/common/utils';
import { Text, Button, Progress } from '@/common/components';
import { TransactionType } from '@/types';
import { ScreenLayout } from '@/common/layouts';
import Store from '@/config/store/slices/user-data';
import { bottomSlideInYLongAnimation, Colors, MEDIUM_ANIMATION_DURATION, SHORT_ANIMATION_DURATION } from '@/common/constants';

import HelpBottomSheet from './components/help-bottom-sheet/help-bottom-sheet';
import styles from './upload-csv.styles';
import { MotiView } from 'moti';

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
			const response = (await uploadCsv()) as { data: TransactionType[] };

			if (response.data.length) {
				if (validateColumnTitles(response.data[0])) {
					const parsedTransactionsForTotalCompanies = parseTransactionsForTotalCompanies(response.data);

					Store.setSymbols(parsedTransactionsForTotalCompanies);
					Store.setRawTransactions(response.data);

					setUploadedTransactions(`${parsedTransactionsForTotalCompanies?.length} companies found.`);
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
				<MotiView {...bottomSlideInYLongAnimation}>
					<Text variant='h1' isBold>
						Upload the exported CSV file
					</Text>
				</MotiView>
				<MotiView {...bottomSlideInYLongAnimation} delay={SHORT_ANIMATION_DURATION}>
					<Text>
						Go to the XTB platform, export your transaction history as a CSV file, and then upload the CSV file here.
					</Text>
				</MotiView>
				<MotiView {...bottomSlideInYLongAnimation} delay={MEDIUM_ANIMATION_DURATION}>
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
				</MotiView>
			</View>
			<View style={styles.button}>
				<Button isDisabled={isButtonDisabled} label='Continue' onPress={handleOnContinue} variant='primary' />
			</View>
			<HelpBottomSheet isVisible={isHelpModalVisible} hideModal={hideHelpModal} />
		</ScreenLayout>
	);
}

export default UploadCsv;
