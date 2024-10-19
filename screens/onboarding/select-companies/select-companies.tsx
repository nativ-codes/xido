import React, {useState} from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';

import { Selection, Text, Header, Button, Progress } from '@/common/components';

// import {parsedTransactions} from '@/__mocks__/parsed-transactions.mock';

import styles from './select-companies.styles';
import { maxCompaniesAllowed } from '@/constants';

const parsedTransactions = [
    'Back', 'question', 'brother', 'YES', 'TextInputs', 'actual', 'includes', 'border', 'whole', 'of', 'taken', 'up', 'by', 'property', 'which', 'extends', '100', 'Since', 'height', 'is', 'no', 'longer', 'significant', 'in', 'your', 'TextInput', 'borderWidth', 'and', 'paddingTop', 'values', 'as', 'they', 'are', 'Therefore', 'solution', 'would', 'be', 'to', 'make', 'sure', 'that', 'padding', 'space', 'value', 'does', 'not', 'exceed', 'the'
]; 

const keyExtractor = (item: string) => item;

function SelectCompanies() {
    const [companies, setCompanies] = useState<string[]>([]);
    const allCompanies = [...parsedTransactions];
    const selectAllText = allCompanies.length <= maxCompaniesAllowed ? 'Select all' : `Select first ${maxCompaniesAllowed} companies`;
    const isContinueDisabled = companies.length === 0;
    
    const handleOnPress = (companies: string[]) => {
        if (companies.length <= maxCompaniesAllowed) {
            setCompanies(companies)
        }
    }

    const handleOnSelectAll = () => {
        if (allCompanies.length <= maxCompaniesAllowed) {
            setCompanies(allCompanies)
        } else {
            setCompanies(allCompanies.slice(0, maxCompaniesAllowed))
        }
    }

    const handleOnContinue = () => {
        router.navigate('/all-set');
    }

    return (
        <SafeAreaView style={styles.wrapper}>
            <Header onPress={router.back} center={<Progress value={75} />} />
            <ScrollView contentContainerStyle={styles.content}>
                <Text variant={Text.variants.H1} isBold>Select up to {maxCompaniesAllowed} companies you want to track</Text>
                <View style={styles.section}>
                    <Selection
                        isMultiple
                        options={allCompanies}
                        selected={companies}
                        onPress={handleOnPress}
                        Element={Selection.SelectableTag}
                        keyExtractor={keyExtractor}
                        labelExtractor={keyExtractor}
                    />
                </View>
            </ScrollView>
            <View style={styles.buttons}>
                <Button label={selectAllText} onPress={handleOnSelectAll} variant={Button.variants.SECONDARY} />
                <Button isDisabled={isContinueDisabled} label="Continue" onPress={handleOnContinue} variant={Button.variants.PRIMARY} />
            </View>
        </SafeAreaView>
    )
};

export default SelectCompanies;