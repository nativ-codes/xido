import { View } from 'react-native';

import { CompanyInfoSections } from '@/types/components';
import { Text, BottomSheet } from '@/common/components';
import { CompanyInfo } from '@/constants';

import styles from './company-info-bottom-sheet.styles';

type CompanyInfoBottomSheetPropTypes = {
    infoSection: CompanyInfoSections | undefined,
    hideModal: () => void | any
}

function CompanyInfoBottomSheet({
    infoSection,
    hideModal
}: CompanyInfoBottomSheetPropTypes) {
    return (
        <BottomSheet title="Info" isVisible={Boolean(infoSection)} onBackdropPress={hideModal}>
            {Boolean(infoSection) && <View style={styles.content}>
                {CompanyInfo[infoSection as CompanyInfoSections].map(({ title, description }: {title: string, description: string}) => (
                    <View key={title}>
                        <Text variant={Text.variants.H4} isBold>{title}</Text>
                        <Text>{description}</Text>
                    </View>
                ))}
            </View>}
        </BottomSheet>
    );
}

export default CompanyInfoBottomSheet;