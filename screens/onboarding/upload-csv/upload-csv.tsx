import React, { useState } from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from '@expo/vector-icons/MaterialCommunityIcons';
import { router } from 'expo-router';

import { parseTransactions, uploadCsv, validateColumnTitles } from '@/common/utils';
import { Text, Header, Button, Progress} from '@/common/components';
import colors from '@/common/colors';
import { TransactionType } from '@/types';
import { setCompanies } from '@/config/store/slices/user-data';

import styles from './upload-csv.styles';

function UploadCsv() {
    const [uploadedTransactions, setUploadedTransactions] = useState('');
    const [isError, setIsError] = useState(false);

    const boxContentColor = isError ? colors.error : colors.primary;
    const isButtonDisabled = !Boolean(uploadedTransactions) || isError;

    const handleOnUpload = async () => {
        try {
            const response = await uploadCsv() as { data: TransactionType[] };
    
            if (response.data.length) {
                if (validateColumnTitles(response.data[0])) {
                    const parsedTransactions = parseTransactions(response.data);
                    setUploadedTransactions(`${Object.keys(parsedTransactions.companies).length} companies found.`)
                    setIsError(false);
                    setCompanies(parsedTransactions);
                } else {
                    setIsError(true);
                    setUploadedTransactions('Invalid column titles. Please make sure the file has the correct format.');
                }
            } else {
                setIsError(true);
                setUploadedTransactions('Unable to parse the file. Please make sure the file has the correct format.');
            }
        } catch(error) {
            console.error("handleOnUpload", error);
        }
    }

    const handleOnContinue = () => {
        router.navigate('/select-companies');
    }

    return (
        <SafeAreaView style={styles.wrapper}>
            <Header onPress={router.back} center={<Progress value={50} />}/>
            <View style={styles.content}>
                <Text variant={Text.variants.H1} isBold>Upload the exported CSV file</Text>
                <View style={styles.section}>
                    <Text>1. Go to the XTB platform and export your transaction history as a CSV file.</Text>
                    <Text>2. Upload the CSV file here.</Text>
                    <Text>3. Review the transactions and confirm the import.</Text>
                </View>
                <TouchableOpacity onPress={handleOnUpload} activeOpacity={0.7} style={StyleSheet.compose(styles.uploadBox, isError && styles.errorBox)}>
                    {Boolean(uploadedTransactions) ? (
                        <View style={styles.boxContent}>
                            <Ionicons name={isError ? 'close' : 'check'} size={24} color={boxContentColor} />
                            <Text textAlign="center" color={boxContentColor}>{uploadedTransactions}</Text>
                        </View>
                    ) : (
                        <View style={styles.boxContent}>
                            <Ionicons name="file-document-outline" size={24} color={colors.disable} />
                            <Text textAlign="center" color={colors.disable}>Select file</Text>
                        </View>
                    )}
                </TouchableOpacity>
            </View>
            <View style={styles.button}>
                <Button isDisabled={isButtonDisabled} label="Continue" onPress={handleOnContinue} variant={Button.variants.PRIMARY} />
            </View>
        </SafeAreaView>
    )
};

export default UploadCsv;