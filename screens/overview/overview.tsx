import React from "react";
import { View } from 'react-native';
import { router } from "expo-router";

import { Text, Button } from '@/common/components';
import { ScreenLayout } from "@/common/layouts";

import styles from './overview.styles'

function Overview() {

    const handleOnAddPortfolio = () => {
        router.navigate('/landing');
    }

    return (
        <ScreenLayout title="Overview">
            <View style={styles.noPortfolio}>
                <Text>You haven't added a portfolio yet.</Text>
                <Button label="Add portfolio" onPress={handleOnAddPortfolio}/>
            </View>
        </ScreenLayout>
    );
}

export default Overview;