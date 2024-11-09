import React from 'react';
import { ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Header, EmptyPlaceholder } from '@/common/components';
import { HeaderPropTypes } from '@/common/components/header/header';

import styles from './screen-layout.styles';

type ScreenLayoutPropTypes = {
    isEmpty?: boolean;
    children: React.ReactNode;
} & HeaderPropTypes

function ScreenLayout({
    children,
    isEmpty,
    ...headerProps
}: ScreenLayoutPropTypes) {
    return (
        <SafeAreaView style={styles.wrapper}>
            <ScrollView contentContainerStyle={styles.contentContainer}>
                {Boolean(headerProps) && <Header {...headerProps} />}
                {isEmpty ? <EmptyPlaceholder /> : children}
            </ScrollView>
        </SafeAreaView>
    )
}

export default ScreenLayout;