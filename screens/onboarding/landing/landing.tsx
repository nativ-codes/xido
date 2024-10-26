import React from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';

import { Text, Header, Button, Progress } from '@/common/components';

import styles from './landing.styles';

function Landing() {
    const handleOnUpload = () => {
        router.navigate('/upload-csv');
    }

    return (
        <SafeAreaView style={styles.wrapper}>
            <Header onPress={router.back} center={<Progress value={25} />} />
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
        </SafeAreaView>
    )
};

export default Landing;