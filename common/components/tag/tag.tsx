import {View, StyleSheet} from 'react-native';

import styles from './tag.styles'
import Text from '@/common/components/text/text'
import colors from '@/common/colors'

type TagPropTypes = {
    value: string,
    variant: keyof typeof TagVariants
}

function Tag({
    value,
    variant = TagVariants.primary
}: TagPropTypes) {
    const backgroundColor = variants[variant]

    return (
        <View style={StyleSheet.compose(styles.wrapper, {
            backgroundColor
        })}>
            <Text isBold variant="h5" color={colors.secondaryText}>{value.toUpperCase()}</Text>
        </View>
    )
}

enum TagVariants {
	primary = 'primary',
	secondary = 'secondary'
}

const variants = {
    primary: colors.primarySurface,
    secondary: colors.secondarySurface
}

export default Tag;