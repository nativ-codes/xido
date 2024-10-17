import React from 'react';
import { StyleSheet, Text as RNText } from 'react-native';

type TextPropTypes = {
    children: React.ReactNode,
    variant?: TextVariants,
    color?: string,
    isBold?: boolean,
    numberOfLines?: number
}

function Text({
    children,
    variant,
    color,
    isBold,
    numberOfLines
}: TextPropTypes) {
    return (
        <RNText numberOfLines={numberOfLines} style={StyleSheet.compose(variants[variant || TextVariants.H4], {
            color,
            fontFamily: isBold ? 'UrbanistBold' : 'Urbanist'
        })}>{children}</RNText>
    )
}

enum TextVariants {
    H1 = 'h1',
    H2 = 'h2',
    H3 = 'h3',
    H4 = 'h4',
    H5 = 'h5',
    H6 = 'h6',
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

Text.variants = TextVariants;

export default Text;