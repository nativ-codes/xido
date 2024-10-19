import React from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from '@expo/vector-icons/MaterialCommunityIcons';
import { router } from 'expo-router';

import { Text, Header, Button, Progress } from '@/common/components';
import colors from '@/common/colors';

import styles from './all-set.styles';

function AllSet() {
    const handleOnUpload = () => {
        router.navigate('/');
    }

    return (
        <SafeAreaView style={styles.wrapper}>
            <Header onPress={router.back} center={<Progress value={100} />} />
            <View style={styles.content}>
                <Text variant={Text.variants.H1} isBold>You're all set</Text>
                <View style={styles.section}>
                    <Text>Your </Text>
                    <Text>2. Upload the CSV file here.</Text>
                    <Text>3. Review the transactions and confirm the import.</Text>
                </View>

            </View>
            <View style={styles.button}>
                <Button label="Finish" onPress={handleOnUpload} variant={Button.variants.PRIMARY} />
            </View>
        </SafeAreaView>
    )
};

export default AllSet;