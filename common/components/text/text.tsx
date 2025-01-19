import React from 'react';
import { StyleSheet, Text as RNText } from 'react-native';

type TextPropTypes = {
    children: React.ReactNode,
    variant?: keyof typeof TextVariants,
    color?: string,
    isBold?: boolean,
    numberOfLines?: number,
    textAlign?: 'center' | 'left' | 'right'
}

function Text({
    children,
    variant = 'h4',
    color,
    isBold,
    textAlign,
    numberOfLines
}: TextPropTypes) {
    return (
        <RNText numberOfLines={numberOfLines} style={StyleSheet.compose(variants[variant], {
            color,
            textAlign,
            fontFamily: isBold ? 'UrbanistBold' : 'Urbanist'
        })}>{children}</RNText>
    )
}

enum TextVariants {
    h1 = 'h1',
    h2 = 'h2',
    h3 = 'h3',
    h4 = 'h4',
    h5 = 'h5',
    h6 = 'h6',
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
        fontSize: 16,
        lineHeight: 24
    },
    h5: {
        fontSize: 14
    },
    h6: {
        fontSize: 12
    }
}

export default Text;