import { View, Image } from 'react-native';

import { Text, BottomSheet } from '@/common/components';

import styles from './help-bottom-sheet.styles';

const CashOperations = require('@/assets/images/onboarding/cash-operations.webp');
const ExportReport = require('@/assets/images/onboarding/export-report.webp');

type HelpBottomSheetPropTypes = {
	isVisible: boolean;
	hideModal: () => void | any;
};

function HelpBottomSheet({ isVisible, hideModal }: HelpBottomSheetPropTypes) {
	return (
		<BottomSheet title='Help' isVisible={isVisible} onBackdropPress={hideModal}>
			<View style={styles.content}>
				<View style={styles.section}>
					<Text variant={Text.variants.H4} isBold>
						1. Log into your XTB account
					</Text>
					<Text variant={Text.variants.H4}>
						Make sure you logged in on your XTB account, and selected the right investment account.
					</Text>
				</View>
				<View style={styles.section}>
					<Text variant={Text.variants.H4} isBold>
						2. Select the date range
					</Text>
					<Text variant={Text.variants.H4}>
						Navigate to the Account history tab, and then Cash operations subtab, select the date range and click APPLY.
					</Text>
					<Image source={CashOperations} resizeMode='contain' style={styles.image} />
				</View>
				<View style={styles.section}>
					<Text variant={Text.variants.H4} isBold>
						3. Export report
					</Text>
					<Text variant={Text.variants.H4}>
						Select CASH OPERATIONS as REPORT TYPE and CSV as FILE FORMAT, and then click on EXPORT REPORT button.
					</Text>
					<Image source={ExportReport} resizeMode='contain' style={styles.image} />
				</View>
			</View>
		</BottomSheet>
	);
}

export default HelpBottomSheet;
