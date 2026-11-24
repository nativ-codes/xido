import React from 'react';
import { View } from 'react-native';
import { router } from 'expo-router';

import { Text, Button, Progress } from '@/common/components';
import { ScreenLayout } from '@/common/layouts';

import styles from './error-fetching.styles';

function ErrorFetching() {
    const handleOnUpload = () => {
        router.dismissTo('/'); // pop back to the existing (tabs) instead of stacking a new one
    }

    return (
        <ScreenLayout
            canGoBack
            center={<Progress previousValue={80} value={100} />}
            footer={<Button label="Finish" onPress={handleOnUpload} variant="primary" />}>
            <View style={styles.content}>
                <Text variant="h1" isBold>Oups...</Text>
                <View style={styles.section}>
                    <Text>There was an error fetching the prices. Please try again later.</Text>
                </View>
            </View>
        </ScreenLayout>
    )
};

export default ErrorFetching;