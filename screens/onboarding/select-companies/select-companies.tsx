import React, {useMemo, useState} from 'react';
import { ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';

import { maxCompaniesAllowed } from '@/constants';
import { getCompanies, setSymbols } from '@/config/store/slices/user-data';
import { Selection, Text, Header, Button, Progress } from '@/common/components';

import styles from './select-companies.styles';

const keyExtractor = (item: string) => item;

function SelectCompanies() {
    const uploadedCompanies = useMemo(() => Object.keys(getCompanies().companies), []);
    const [selectedCompanies, setSelectedCompanies] = useState<string[]>([]);

    const selectAllText = uploadedCompanies.length <= maxCompaniesAllowed ? 'Select all' : `Select first ${maxCompaniesAllowed} companies`;
    const isContinueDisabled = selectedCompanies.length === 0;
    
    const handleOnPress = (companies: string[]) => {
        if (selectedCompanies.length <= maxCompaniesAllowed) {
            setSelectedCompanies(companies)
        }
    }

    const handleOnSelectAll = () => {
        if (uploadedCompanies.length <= maxCompaniesAllowed) {
            setSelectedCompanies(uploadedCompanies)
        } else {
            setSelectedCompanies(uploadedCompanies.slice(0, maxCompaniesAllowed))
        }
    }

    const handleOnContinue = () => {
        setSymbols(selectedCompanies);
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
                        options={uploadedCompanies}
                        selected={selectedCompanies}
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