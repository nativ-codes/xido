import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import Text from '@/common/components/text/text';
import colors from '@/common/colors';

import styles from './button.styles'

type ButtonPropTypes = {
    onPress: () => void | any,
    label: string,
    variant?: ButtonVariants
}

function Button({
    onPress,
    label,
    variant
}: ButtonPropTypes) {
    const {backgroundColor, color} = variants[variant || ButtonVariants.PRIMARY]

    return (
        <TouchableOpacity onPress={onPress} style={StyleSheet.compose(styles.wrapper, {backgroundColor})}>
            <Text variant={Text.variants.H4} isBold color={color}>{label}</Text>
        </TouchableOpacity>    
    )
}

enum ButtonVariants {
    PRIMARY = 'primary',
    SECONDARY = 'secondary',
}

const variants = {
    primary: {
        backgroundColor: colors.primary,
        color: colors.background,
    },
    secondary: {
        backgroundColor: 'transparent',
        color: colors.primary
    }
}

Button.variants = ButtonVariants;

export default Button;