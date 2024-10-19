import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';

import Text from '@/common/components/text/text';

import styles from './selectable-tag.styles'

type SelectableTagPropTypes = {
    isSelected: boolean,
    label: string,
    onPress: () => void | any
}

function SelectableTag({ isSelected, label, onPress }: SelectableTagPropTypes) {
    return (
        <TouchableOpacity activeOpacity={0.7} onPress={onPress} style={StyleSheet.compose(styles.container, isSelected && styles.selected)}>
            <Text variant={Text.variants.H3}>{label}</Text>
        </TouchableOpacity>        
    )
}

export default SelectableTag;