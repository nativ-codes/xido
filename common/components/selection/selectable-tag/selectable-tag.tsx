import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';

import Text from '@/common/components/text/text';

import styles from './selectable-tag.styles'

type SelectableTagPropTypes = {
    isSelected: boolean,
    label: string,
    onPress: () => void | any,
    size?: SelectableTagSizes
}

function SelectableTag({ isSelected, label, onPress, size = SelectableTagSizes.MEDIUM }: SelectableTagPropTypes) {
    const containerStyles = StyleSheet.compose(styles.container, styles[`${size}Container`]);
    const textSize = size === SelectableTagSizes.MEDIUM ? Text.variants.H3 : Text.variants.H5;

    return (
        <TouchableOpacity activeOpacity={0.7} onPress={onPress} style={StyleSheet.compose(containerStyles, isSelected && styles.selected)}>
            <Text variant={textSize}>{label}</Text>
        </TouchableOpacity>        
    )
}

enum SelectableTagSizes {
    SMALL = 'small',
    MEDIUM = 'medium'
}

SelectableTag.sizes = SelectableTagSizes;

export default SelectableTag;