import React from 'react';

import Text from '../text/text';
import Row from '@/common/layouts/row/row';

import colors from '@/common/colors';
import styles from './list-item.styles';
import { ListItemVariants } from '@/types/components';

function ListItem({
    leftText,
    rightText,
    variant = ListItemVariants.DEFAULT,
}: ListItemPropTypes) {
    return (
        <Row
            style={styles.row}
            left={<Text variant={Text.variants.H4} color={colors.primaryText}>{leftText}</Text>}
            right={<Text isBold variant={Text.variants.H4} color={colorMapper[variant]}>{rightText}</Text>}
        />
    )
}

type ListItemPropTypes = {
    leftText: string;
    rightText: string;
    variant?: ListItemVariants;
}

const colorMapper = {
    [ListItemVariants.PROFIT]: colors.primary,
    [ListItemVariants.LOSS]: colors.error,
    [ListItemVariants.DEFAULT]: colors.secondaryText,
}

ListItem.variants = ListItemVariants;

export default ListItem;