import { Modal, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import Animated, { SlideInDown } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import Text from '@/common/components/text/text';
import Button from '@/common/components/button/button';

import styles from './bottom-sheet.styles'
import { Colors } from '@/common/constants';

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
        <Modal visible={isVisible} onRequestClose={onBackdropPress} transparent animationType="fade" statusBarTranslucent>
            <View style={styles.wrapper}>
                <Pressable style={StyleSheet.absoluteFill} onPress={onBackdropPress} accessibilityLabel="Close" />
                <Animated.View entering={SlideInDown} style={styles.content}>
                    <View style={Boolean(title) ? styles.header : styles.noTitle}>
                        {Boolean(title) && <Text variant="h3" isBold>{title}</Text>}
                        <Button.Icon onPress={onBackdropPress} name="close" size="small" color={Colors.secondaryText}  />
                    </View>
                    <ScrollView contentContainerStyle={{ paddingBottom: bottom }}>
                        {children}
                    </ScrollView>
                </Animated.View>
            </View>
        </Modal>
    );
}

export default BottomSheet;
