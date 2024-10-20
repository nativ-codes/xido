import React from 'react';
import { View } from 'react-native';

import Button from '@/common/components/button/button';
import Text from '@/common/components/text/text';
import colors from '@/common/colors';
import styles from './header.styles';

type HeaderPropTypes = {
    onPress?: () => any;
    title?: string;
    center?: React.ReactNode;
    right?: React.ReactNode;
}

function Header({
    title,
    center,
    onPress,
    right
}: HeaderPropTypes) {

    return (
        <View style={styles.header}>
            {Boolean(onPress) && <Button.Icon onPress={onPress} name="chevron-left" size={Button.Icon.sizes.MEDIUM} color={colors.secondaryText} />}
            {Boolean(title || center) && 
                <View style={styles.centerWrapper}>
                    {Boolean(title) && <Text variant={Text.variants.H2} isBold>{title}</Text>}
                    {Boolean(center) && <View style={styles.centerWrapper}>{center}</View>}
                </View>}
            {Boolean(right) ? right : Boolean(onPress) && <View style={styles.placeholder} />}
        </View>
    )
}

export default Header;