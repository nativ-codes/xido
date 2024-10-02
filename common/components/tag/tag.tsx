import {View, StyleSheet} from 'react-native';

import styles from './tag.styles'
import Text from '@/common/components/text/text'
import colors from '@/common/colors'

type TagPropTypes = {
    value: string,
    variant: keyof typeof variants
}

function Tag({
    value,
    variant = 'primary'
}: TagPropTypes) {
    return (
        <View style={StyleSheet.compose(styles.wrapper, {
            backgroundColor: variants[variant]
        })}>
            <Text isBold variant="h5" color={colors.secondaryText}>{value.toUpperCase()}</Text>
        </View>
    )
}

const variants = {
    primary: colors.primarySurface,
    secondary: colors.secondarySurface
}

export default Tag;