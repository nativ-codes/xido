import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import Ionicons from '@expo/vector-icons/MaterialCommunityIcons';

import Text from '@/common/components/text/text';
import colors from '@/common/colors';
import styles from './button.styles'
import { IconProps } from '@expo/vector-icons/build/createIconSet';

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


type IconPropTypes = {
    name: string,
    size: IconSizes,
    color: string,
    onPress: () => void | any
}

function Icon({
    name,
    size,
    color,
    onPress
}: IconPropTypes) {
    const iconSize = sizes[size || IconSizes.MEDIUM];

    return (
        <TouchableOpacity onPress={onPress} style={StyleSheet.compose(styles.icon, iconSize.container)}>
            <Ionicons name={name} size={iconSize.icon} color={color} />
        </TouchableOpacity>
    )
}

enum IconSizes {
    SMALL = 'small',
    MEDIUM = 'medium',
    LARGE = 'large'
}

const sizes = {
    small: {
        icon: 20,
        container: {
            width: 32,
            height: 32,
            borderRadius: 16
        }
    },
    medium: {
        icon: 24,
        container: {
            width: 40,
            height: 40,
            borderRadius: 20
        }
    },
    large: {
        icon: 32,
        container: {
            width: 48,
            height: 48,
            borderRadius: 24
        }
    }
}


Button.variants = ButtonVariants;
Icon.sizes = IconSizes;
Button.Icon = Icon;

export default Button;