import React from 'react';
import { TouchableOpacity, View } from 'react-native';

import Text from '@/common/components/text/text';
import Button from '@/common/components/button/button';
import { Colors } from '@/common/constants';
import Spacer from '@/common/layouts/spacer/spacer';

import styles from './card.styles';
import { SpacerPropsType } from '@/common/layouts/spacer/spacer.type';

type CardPropTypes = {
	children: React.ReactNode;
} & SpacerPropsType;

function Card({ children, ...rest }: CardPropTypes) {
	return (
		<Spacer style={styles.container} {...rest}>
			{children}
		</Spacer>
	);
}

type TitleTitlePropTypes = {
	title: string;
	onPress?: () => void | any;
};

function Title({ title, onPress }: TitleTitlePropTypes) {
	return (
		<TouchableOpacity activeOpacity={0.7} onPress={onPress} style={styles.titleContainer}>
			<Text variant='h3' isBold>
				{title}
			</Text>
			{Boolean(onPress) && (
				<Button.Icon onPress={onPress} name='information-variant' size='small' color={Colors.secondaryText} />
			)}
		</TouchableOpacity>
	);
}

Card.Title = Title;

export default Card;
