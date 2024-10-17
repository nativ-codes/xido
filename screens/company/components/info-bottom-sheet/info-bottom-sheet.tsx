import { View } from 'react-native';

import Text from '@/common/components/text/text';
import { InfoSections } from '@/types/components';
import { BottomSheet } from '@/common/components';
import { InfoConstants } from '@/constants';

import styles from './info-bottom-sheet.styles';

type SortByBottomSheetPropTypes = {
    infoSection: InfoSections | undefined,
    hideModal: () => void | any
}

function InfoBottomSheet({
    infoSection,
    hideModal
}: SortByBottomSheetPropTypes) {
    return (
        <BottomSheet title="Info" isVisible={Boolean(infoSection)} onBackdropPress={hideModal}>
            {Boolean(infoSection) && <View style={styles.content}>
                {InfoConstants[infoSection as InfoSections].map(({ title, description }) => (
                    <View key={title}>
                        <Text variant={Text.variants.H4} isBold>{title}</Text>
                        <Text>{description}</Text>
                    </View>
                ))}
            </View>}
        </BottomSheet>
    );
}

export default InfoBottomSheet;