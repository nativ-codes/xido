import {View, StyleSheet} from 'react-native';

import styles from './tag.styles'
import Text from '@/common/components/text/text'
import colors from '@/common/colors'

type TagPropTypes = {
    value: string,
    variant: TagVariants
}

function Tag({
    value,
    variant
}: TagPropTypes) {
    const backgroundColor = variants[variant || TagVariants.PRIMARY]

    return (
        <View style={StyleSheet.compose(styles.wrapper, {
            backgroundColor
        })}>
            <Text isBold variant={Text.variants.H5} color={colors.secondaryText}>{value.toUpperCase()}</Text>
        </View>
    )
}

enum TagVariants {
    PRIMARY = 'primary',
    SECONDARY = 'secondary'
}

const variants = {
    primary: colors.primarySurface,
    secondary: colors.secondarySurface
}

Tag.variants = TagVariants;

export default Tag;