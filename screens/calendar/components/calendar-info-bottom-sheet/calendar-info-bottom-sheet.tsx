import { View } from 'react-native';

import { Text, BottomSheet } from '@/common/components';
import { CalendarInfo } from '@/constants';

import styles from './calendar-info-bottom-sheet.styles';

type CalendarInfoBottomSheetPropTypes = {
    isVisible: boolean,
    hideModal: () => void | any
}

function CompanyInfoBottomSheet({
    isVisible,
    hideModal
}: CalendarInfoBottomSheetPropTypes) {
    return (
        <BottomSheet title="Info" isVisible={isVisible} onBackdropPress={hideModal}>
            <View style={styles.content}>
                {CalendarInfo.map(({ title, description }) => (
                    <View key={title}>
                        <Text variant="h4" isBold>{title}</Text>
                        <Text>{description}</Text>
                    </View>
                ))}
            </View>
        </BottomSheet>
    );
}

export default CompanyInfoBottomSheet;