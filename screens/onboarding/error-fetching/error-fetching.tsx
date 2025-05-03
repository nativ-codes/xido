import React from 'react';
import { View } from 'react-native';
import { router } from 'expo-router';

import { Text, Button, Progress } from '@/common/components';
import { ScreenLayout } from '@/common/layouts';

import styles from './error-fetching.styles';

function ErrorFetching() {
    const handleOnUpload = () => {
        router.navigate('/');
    }

    return (
        <ScreenLayout canGoBack center={<Progress previousValue={80} value={100} />}>
            <View style={styles.content}>
                <Text variant="h1" isBold>Oups...</Text>
                <View style={styles.section}>
                    <Text>There was an error fetching the prices. Please try again later.</Text>
                </View>
            </View>
            <View style={styles.button}>
                <Button label="Finish" onPress={handleOnUpload} variant="primary" />
            </View>
        </ScreenLayout>
    )
};

export default ErrorFetching;