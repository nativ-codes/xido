import React from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import Text from '@/common/components/text/text';
import Row from '@/common/layouts/row/row';

import { Colors } from '@/common/constants';
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
            left={<Text variant="h4" color={Colors.primaryText}>{leftText}</Text>}
            right={Boolean(rightText) ? 
                <Text isBold variant="h4" color={colorMapper[variant]}>{rightText}</Text> : 
                <MaterialCommunityIcons name={rightIcon} size={24} color={Colors.primaryText} />}
        />
    )
}

type ListItemPropTypes = {
    leftText: string;
    rightIcon?: keyof typeof MaterialCommunityIcons.glyphMap;
    rightText?: string;
    variant?: ListItemVariants;
}

const colorMapper = {
    [ListItemVariants.PROFIT]: Colors.primary,
    [ListItemVariants.LOSS]: Colors.error,
    [ListItemVariants.DEFAULT]: Colors.secondaryText,
}

ListItem.variants = ListItemVariants;

export default ListItem;