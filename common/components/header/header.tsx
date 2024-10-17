import React from 'react';
import { View } from 'react-native';

import Ionicons from '@expo/vector-icons/MaterialCommunityIcons';
import Button from '@/common/components/button/button';
import colors from '@/common/colors';

type HeaderPropTypes = {
    onPress?: () => any
}

function Header({
    onPress
}: HeaderPropTypes) {

    return (
        <View>
            {Boolean(onPress) && <Button.Icon onPress={onPress} name="chevron-left" size={Button.Icon.sizes.MEDIUM} color={colors.secondaryText} />}
        </View>
    )
}

export default Header;