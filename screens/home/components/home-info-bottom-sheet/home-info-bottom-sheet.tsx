import { View } from 'react-native';

import { HomeInfoSections } from '@/types/components';
import { Text, BottomSheet } from '@/common/components';
import { HomeInfo } from '@/common/constants';

import styles from './home-info-bottom-sheet.styles';

type HomeInfoBottomSheetPropTypes = {
    infoSection: HomeInfoSections | undefined,
    hideModal: () => void | any
}

function HomeInfoBottomSheet({
    infoSection,
    hideModal
}: HomeInfoBottomSheetPropTypes) {
    return (
        <BottomSheet title="Info" isVisible={Boolean(infoSection)} onBackdropPress={hideModal}>
            {Boolean(infoSection) && <View style={styles.content}>
                {HomeInfo[infoSection as HomeInfoSections].map(({ title, description }: {title: string, description: string}) => (
                    <View key={title}>
                        <Text variant="h4" isBold>{title}</Text>
                        <Text>{description}</Text>
                    </View>
                ))}
            </View>}
        </BottomSheet>
    );
}

export default HomeInfoBottomSheet;