import React from 'react';
import { View } from 'react-native';
import { router } from 'expo-router';
import Ionicons from '@expo/vector-icons/MaterialCommunityIcons';

import Text from '@/common/components/text/text';
import Button from '@/common/components/button/button';
import colors from '@/common/colors';

import styles from './empty-placeholder.styles';

function EmptyPlaceholder() {
    const handleOnImportPortfolio = () =>
        router.push('/landing');

    return (
        <View style={styles.wrapper}>
            <Ionicons name="magnify" size={72} color={colors.disable} />
            <View style={styles.content}>
                <Text variant={Text.variants.H3} color={colors.disable}>There is no data to display</Text>
                <Button variant={Button.variants.PRIMARY} label="Import a portfolio" onPress={handleOnImportPortfolio} />
            </View>
        </View>
    )
}

export default EmptyPlaceholder;