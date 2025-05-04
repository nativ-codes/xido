import { View } from 'react-native';

import { HomeInfoSections, InfoSectionType } from '@/types/components';
import { Text, BottomSheet } from '@/common/components';
import { HomeInfo } from '@/common/constants';

import styles from './home-info-bottom-sheet.styles';
import { HomeInfoBottomSheetPropTypes } from './home-info-bottom-sheet.types';

function HomeInfoBottomSheet({ infoSection, hideModal }: HomeInfoBottomSheetPropTypes) {
	return (
		<BottomSheet title='Info' isVisible={Boolean(infoSection)} onBackdropPress={hideModal}>
			{Boolean(infoSection) && (
				<View style={styles.content}>
					{HomeInfo[infoSection as HomeInfoSections].map(({ title, description }: InfoSectionType) => (
						<View key={title}>
							<Text variant='h4' isBold>
								{title}
							</Text>
							<Text>{description}</Text>
						</View>
					))}
				</View>
			)}
		</BottomSheet>
	);
}

export default HomeInfoBottomSheet;
