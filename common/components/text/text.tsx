import React from 'react';
import {StyleSheet, Text as RNText} from 'react-native';

type TextPropTypes = {
    children: string,
    variant?: keyof typeof variants,
    color?: string,
    isBold?: boolean,
    numberOfLines?: number
}

function Text({
    children,
    variant = 'h4',
    color,
    isBold,
    numberOfLines
}: TextPropTypes) {
    return (
        <RNText numberOfLines={numberOfLines} style={StyleSheet.compose(variants[variant], {
            color,
            fontFamily: isBold ? 'UrbanistBold' : 'Urbanist'
        })}>{children}</RNText>
    )
}

const variants = {
    h1: {
        fontSize: 26
    },
    h2: {
        fontSize: 22
    },
    h3: {
        fontSize: 18
    },
    h4: {
        fontSize: 16
    },
    h5: {
        fontSize: 14
    },
}

export default Text;