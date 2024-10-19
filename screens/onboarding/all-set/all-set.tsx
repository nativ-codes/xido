import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';

import { setCompanies, getCompanies, getUserData, getSymbols, setUserData } from '@/config/store/slices/user-data';
import { Text, Header, Button, Progress } from '@/common/components';
import { getIsEmpty, parseUserData } from '@/common/utils';
import { companies as mockedCompanies } from '@/__mocks__';

import styles from './all-set.styles';
import { getCompaniesInBatches } from '@/services/companies';

function AllSet() {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        (async () => {
            try {
                if (getIsEmpty(getUserData())) {
                    const transactions = getCompanies();
                    const companies = mockedCompanies || await getCompaniesInBatches(getSymbols());
                    const parsedUserData = parseUserData({
                        transactions,
                        companies
                    });

                    setUserData(parsedUserData)
                } else {
                    setIsLoading(false);
                }
            } catch (error) {
                console.error("AllSet", error);
            } finally {
                setIsLoading(false);
            }
        })();
    }, []);

    const handleOnUpload = () => {
        router.navigate('/');
    }

    return (
        <SafeAreaView style={styles.wrapper}>
            <Header onPress={router.back} center={<Progress value={100} />} />
            <View style={styles.content}>
                <Text variant={Text.variants.H1} isBold>You're all set</Text>
                <View style={styles.section}>
                    <Text>Your profile is now ready.</Text>
                </View>

            </View>
            <View style={styles.button}>
                <Button label="Finish" onPress={handleOnUpload} variant={Button.variants.PRIMARY} />
            </View>
        </SafeAreaView>
    )
};

export default AllSet;