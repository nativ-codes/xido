import React from 'react';
import { TouchableOpacity } from 'react-native';

import Text from '@/common/components/text/text';

import styles from './selectable-tag.styles'

type SelectableTagPropTypes = {
    isSelected: boolean,
    label: string,
    onPress: () => void | any,
    size?: keyof typeof SelectableTagSizes
}

function SelectableTag({ isSelected, label, onPress, size = SelectableTagSizes.medium }: SelectableTagPropTypes) {
	const containerStyles = [styles.container, styles[`${size}Container`]];
	const textSize = size === SelectableTagSizes.medium ? 'h3' : 'h5';

	return (
		<TouchableOpacity
			activeOpacity={0.7}
			onPress={onPress}
			style={[containerStyles, isSelected && styles.selected]}>
			<Text variant={textSize}>{label}</Text>
		</TouchableOpacity>
	);
}

enum SelectableTagSizes {
	small = 'small',
	medium = 'medium'
}

export default SelectableTag;