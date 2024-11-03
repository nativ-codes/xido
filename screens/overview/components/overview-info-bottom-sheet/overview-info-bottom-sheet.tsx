import { View } from 'react-native';

import { OverviewInfoSections } from '@/types/components';
import { Text, BottomSheet } from '@/common/components';
import { OverviewInfo } from '@/constants';

import styles from './overview-info-bottom-sheet.styles';

type OverviewInfoBottomSheetPropTypes = {
    infoSection: OverviewInfoSections | undefined,
    hideModal: () => void | any
}

function OverviewInfoBottomSheet({
    infoSection,
    hideModal
}: OverviewInfoBottomSheetPropTypes) {
    return (
        <BottomSheet title="Info" isVisible={Boolean(infoSection)} onBackdropPress={hideModal}>
            {Boolean(infoSection) && <View style={styles.content}>
                {OverviewInfo[infoSection as OverviewInfoSections].map(({ title, description }: {title: string, description: string}) => (
                    <View key={title}>
                        <Text variant={Text.variants.H4} isBold>{title}</Text>
                        <Text>{description}</Text>
                    </View>
                ))}
            </View>}
        </BottomSheet>
    );
}

export default OverviewInfoBottomSheet;