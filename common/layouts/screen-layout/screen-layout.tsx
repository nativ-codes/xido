import React from 'react';
import { ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Header } from '@/common/components';
import { HeaderPropTypes } from '@/common/components/header/header';

import styles from './screen-layout.styles';

type ScreenLayoutPropTypes = {
    children: React.ReactNode;
} & HeaderPropTypes

function ScreenLayout({
    children,
    ...headerProps
}: ScreenLayoutPropTypes) {

    return (
        <SafeAreaView style={styles.wrapper}>
            <ScrollView contentContainerStyle={styles.contentContainer}>
                {Boolean(headerProps) && <Header {...headerProps} />}
                {children}
            </ScrollView>
        </SafeAreaView>
    )
}

export default ScreenLayout;