import React from 'react';
import Ionicons from '@expo/vector-icons/MaterialCommunityIcons';

import Text from '@/common/components/text/text';
import Row from '@/common/layouts/row/row';

import colors from '@/common/colors';
import styles from './list-item.styles';
import { ListItemVariants } from '@/types/components';

function ListItem({
    leftText,
    rightText,
    rightIcon,
    variant = ListItemVariants.DEFAULT,
}: ListItemPropTypes) {
    return (
        <Row
            style={styles.row}
            left={<Text variant={Text.variants.H4} color={colors.primaryText}>{leftText}</Text>}
            right={Boolean(rightText) ? 
                <Text isBold variant={Text.variants.H4} color={colorMapper[variant]}>{rightText}</Text> : <Ionicons name={rightIcon} size={24} color={colors.primaryText} />}
        />
    )
}

type ListItemPropTypes = {
    leftText: string;
    rightIcon?: string;
    rightText?: string;
    variant?: ListItemVariants;
}

const colorMapper = {
    [ListItemVariants.PROFIT]: colors.primary,
    [ListItemVariants.LOSS]: colors.error,
    [ListItemVariants.DEFAULT]: colors.secondaryText,
}

ListItem.variants = ListItemVariants;

export default ListItem;