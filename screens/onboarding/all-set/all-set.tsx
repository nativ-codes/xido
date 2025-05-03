import React from 'react';
import { View } from 'react-native';
import { router } from 'expo-router';

import { Text, Button, Progress } from '@/common/components';
import { ScreenLayout } from '@/common/layouts';

import styles from './all-set.styles';

function ErrorFetching() {
    const handleOnUpload = () => {
        router.navigate('/');
    }

    return (
        <ScreenLayout center={<Progress previousValue={80} value={100} />}>
            <View style={styles.content}>
                <Text variant="h1" isBold>You're all set</Text>
                <View style={styles.section}>
                    <Text>Your profile is now ready.</Text>
                </View>
            </View>
            <View style={styles.button}>
                <Button label="Finish" onPress={handleOnUpload} variant="primary" />
            </View>
        </ScreenLayout>
    )
};

export default ErrorFetching;