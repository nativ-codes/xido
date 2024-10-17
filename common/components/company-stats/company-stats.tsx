import React from 'react';
import { TouchableOpacity, View } from 'react-native';

import styles from './company-stats.styles';

import Text from '@/common/components/text/text';
import Button from '@/common/components/button/button';
import colors from '@/common/colors';

type CompanyStatsPropTypes = {
    children: React.ReactNode
}

function CompanyStats({ children }: CompanyStatsPropTypes) {
    return (
        <View style={styles.container}>
            {children}
        </View>
    )
}

type TitleSectionPropTypes = {
    title: string,
    onPress: () => void | any
}

function TitleSection({
    title,
    onPress
}: TitleSectionPropTypes) {
    return (
        <TouchableOpacity activeOpacity={0.7} onPress={onPress} style={styles.titleSectionContainer}>
            <Text variant={Text.variants.H3} isBold>{title}</Text>
            <Button.Icon onPress={onPress} name="information-variant" size={Button.Icon.sizes.SMALL} color={colors.secondaryText} />
        </TouchableOpacity>
    )
}

CompanyStats.TitleSection = TitleSection;

export default CompanyStats;