import React from 'react';
import { View } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

import { Text } from '@/common/components';
import { ScreenLayout } from '@/common/layouts';
import { Legal as LegalConstant } from '@/constants';
import { LegalTypes } from '@/types';

import styles from './legal.styles'
import colors from '@/common/colors';

function Legal() {
    const { type }: { type: LegalTypes } = useLocalSearchParams();
    const data = LegalConstant[type];

    return (
        <ScreenLayout canGoBack title={data.title}>
            <View style={styles.wrapper}>
                <Text variant={Text.variants.H5} color={colors.secondaryText}>{data.lastUpdated}</Text>
                {data.sections.map(({ title, content, sections }, index) => (
                    <View>
                        <Text isBold>{index + 1}. {title}</Text>
                        {Boolean(content) && <Text>{content}</Text>}
                        {Boolean(sections) && sections?.map(({ content }) => (
                            <View style={styles.section}>
                                <Text> - {content}</Text>
                            </View>
                        ))}
                    </View>
                ))}
            </View>
        </ScreenLayout>
    )
}

export default Legal;