import React from 'react';
import { View } from 'react-native';
import { router } from 'expo-router';

import Button from '@/common/components/button/button';
import Text from '@/common/components/text/text';
import colors from '@/common/colors';
import styles from './header.styles';

export type HeaderPropTypes = {
    canGoBack?: boolean;
    title?: string;
    center?: React.ReactNode;
    right?: React.ReactNode;
}

function Header({
    title,
    center,
    canGoBack,
    right
}: HeaderPropTypes) {
    return (
        <View style={styles.header}>
            {Boolean(canGoBack) && <Button.Icon onPress={router.back} name="chevron-left" size={Button.Icon.sizes.MEDIUM} color={colors.secondaryText} />}
            {Boolean(title || center) && 
                <View style={styles.centerWrapper}>
                    {Boolean(title) && <Text variant={Text.variants.H2} isBold>{title}</Text>}
                    {Boolean(center) && <View style={styles.centerWrapper}>{center}</View>}
                </View>}
            {Boolean(right) ? right : Boolean(canGoBack) && <View style={styles.placeholder} />}
        </View>
    )
}

export default Header;