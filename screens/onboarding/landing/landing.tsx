import React from 'react';
import { View } from 'react-native';
import { router } from 'expo-router';

import { Text, Button, Progress } from '@/common/components';
import { ScreenLayout } from '@/common/layouts';

import styles from './landing.styles';

function Landing() {
    const handleOnUpload = () => {
        router.navigate('/upload-csv');
    }

    return (
        <ScreenLayout canGoBack center={<Progress value={25} />}>
            <View style={styles.content}>
                <Text variant={Text.variants.H1} isBold>Track your DGI portfolio</Text>
                <View style={styles.section}>
                    <Text>It's easy to track your DGI portfolio and monitor your progress. Get clear stats and charts that show you exactly how close you are to reaching your goals.</Text>
                    <Text>Let's get started!</Text>
                </View>
            </View>
            <View style={styles.button}>
                <Button label="Begin" onPress={handleOnUpload} variant={Button.variants.PRIMARY} />
            </View>
        </ScreenLayout>
    )
};

export default Landing;