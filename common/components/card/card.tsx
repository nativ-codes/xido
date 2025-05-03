import React from 'react';
import { TouchableOpacity, View } from 'react-native';

import Text from '@/common/components/text/text';
import Button from '@/common/components/button/button';
import { Colors } from '@/common/constants';

import styles from './card.styles';

type CardPropTypes = {
    children: React.ReactNode
}

function Card({ children }: CardPropTypes) {
    return (
        <View style={styles.container}>
            {children}
        </View>
    )
}

type TitleTitlePropTypes = {
    title: string,
    onPress?: () => void | any
}

function Title({
    title,
    onPress
}: TitleTitlePropTypes) {
    return (
        <TouchableOpacity activeOpacity={0.7} onPress={onPress} style={styles.titleContainer}>
            <Text variant="h3" isBold>{title}</Text>
            {Boolean(onPress) && <Button.Icon onPress={onPress} name="information-variant" size="small" color={Colors.secondaryText} />}
        </TouchableOpacity>
    )
}

Card.Title = Title;

export default Card;