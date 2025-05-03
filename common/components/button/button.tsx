import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import Text from '@/common/components/text/text';
import colors from '@/common/constants/colors';
import styles from './button.styles'
import { noop } from '@/common/utils';

type ButtonPropTypes = {
    onPress?: () => void | any,
    label: string,
    variant?: keyof typeof ButtonVariants,
    isDisabled?: boolean
}

function Button({
    onPress,
    label,
    variant = ButtonVariants.primary,
    isDisabled
}: ButtonPropTypes) {
    const {backgroundColor, color} = variants[variant]
    const handleOnPress = isDisabled ? noop : onPress;
    const opacity = isDisabled ? 0.5 : 1;

    return (
        <TouchableOpacity activeOpacity={0.7} onPress={handleOnPress} style={StyleSheet.compose(styles.wrapper, {backgroundColor, opacity})}>
            <Text variant="h4" isBold color={color}>{label}</Text>
        </TouchableOpacity>    
    )
}

enum ButtonVariants {
	primary = 'primary',
	secondary = 'secondary',
	danger = 'danger'
}

const variants = {
    primary: {
        backgroundColor: colors.primary,
        color: colors.background,
    },
    secondary: {
        backgroundColor: 'transparent',
        color: colors.primary
    },
    danger: {
        backgroundColor: colors.error,
        color: colors.background
    }    
}

type IconPropTypes = {
	name: keyof typeof MaterialCommunityIcons.glyphMap;
	size: keyof typeof IconSizes;
	color: string;
	onPress?: () => void | any;
};

function Icon({ name, size = IconSizes.medium, color, onPress }: IconPropTypes) {
	const iconSize = sizes[size || IconSizes.medium];

	return (
		<TouchableOpacity onPress={onPress} style={StyleSheet.compose(styles.icon, iconSize.container)}>
			<MaterialCommunityIcons name={name} size={iconSize.icon} color={color} />
		</TouchableOpacity>
	);
}

enum IconSizes {
	small = 'small',
	medium = 'medium',
	large = 'large'
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


Button.Icon = Icon;

export {sizes};
export default Button;