import { ScrollView, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Modal from "react-native-modal";
import Ionicons from '@expo/vector-icons/MaterialCommunityIcons';

import Text from '@/common/components/text/text';
import Button from '@/common/components/button/button';

import styles from './bottom-sheet.styles'
import colors from '@/common/constants/colors';

type BottomSheetPropTypes = {
    onBackdropPress: () => void | any,
    isVisible: boolean,
    children: React.ReactNode,
    title: string
}

function BottomSheet({
    onBackdropPress,
    isVisible,
    children,
    title
}: BottomSheetPropTypes) {
    const { bottom } = useSafeAreaInsets();

    return (
        <Modal isVisible={isVisible} onBackdropPress={onBackdropPress} style={styles.wrapper}>
            <View style={styles.content}>
                <View style={Boolean(title) ? styles.header : styles.noTitle}>
                    {Boolean(title) && <Text variant="h3" isBold>{title}</Text>}
                    <Button.Icon onPress={onBackdropPress} name="close" size="small" color={colors.secondaryText}  />
                </View>
                <ScrollView contentContainerStyle={{ paddingBottom: bottom }}>
                    {children}
                </ScrollView>
            </View>
        </Modal>
    );
}

export default BottomSheet;