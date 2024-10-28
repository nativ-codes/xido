import React, { useState } from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import Ionicons from '@expo/vector-icons/MaterialCommunityIcons';
import { router } from 'expo-router';

import { parseTransactions, parseTransactionsForCalendar, uploadCsv, validateColumnTitles } from '@/common/utils';
import { Text, Button, Progress} from '@/common/components';
import { TransactionType } from '@/types';
import { ScreenLayout } from '@/common/layouts';
import { setCompanies, setCalendar } from '@/config/store/slices/user-data';
import colors from '@/common/colors';

import HelpBottomSheet from './components/help-bottom-sheet/help-bottom-sheet';
import styles from './upload-csv.styles';

function UploadCsv() {
    const [uploadedTransactions, setUploadedTransactions] = useState('');
    const [isHelpModalVisible, setIsHelpModalVisible] = useState(false);
    const [isError, setIsError] = useState(false);

    const boxContentColor = isError ? colors.error : colors.primary;
    const isButtonDisabled = !Boolean(uploadedTransactions) || isError;

    const showHelpModal = () => setIsHelpModalVisible(true);
    const hideHelpModal = () => setIsHelpModalVisible(false);

    const handleOnUpload = async () => {
        try {
            const response = await uploadCsv() as { data: TransactionType[] };
    
            if (response.data.length) {
                if (validateColumnTitles(response.data[0])) {
                    const parsedTransactions = parseTransactions(response.data);
                    const parsedTransactionsForCalendar = parseTransactionsForCalendar(response.data);
                    console.log("parsedTransactions", JSON.stringify(parsedTransactionsForCalendar));
                    setUploadedTransactions(`${Object.keys(parsedTransactions.companies).length} companies found.`)
                    setIsError(false);
                    setCompanies(parsedTransactions);
                    setCalendar(parsedTransactionsForCalendar);
                } else {
                    setIsError(true);
                    setUploadedTransactions('Invalid column titles. Please make sure the file has the correct format.');
                }
            } else {
                setIsError(true);
                setUploadedTransactions('Unable to parse the file. Please make sure the file has the correct format.');
            }
        } catch(error) {
            // doesn't upload the file
            console.log("handleOnUpload", error);
        }
    }

    const handleOnContinue = () => {
        router.navigate('/select-companies');
    }

    return (
        <ScreenLayout
            canGoBack
            center={<Progress value={50} />}
            right={<Button.Icon onPress={showHelpModal} name="help-circle-outline" size={Button.Icon.sizes.MEDIUM} color={colors.secondaryText} />}
        >
            <View style={styles.content}>
                <Text variant={Text.variants.H1} isBold>Upload the exported CSV file</Text>
                <View style={styles.section}>
                    <Text>Go to the XTB platform, export your transaction history as a CSV file, and then upload the CSV file here.</Text>
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
            <HelpBottomSheet 
                isVisible={isHelpModalVisible}
                hideModal={hideHelpModal}
            />
        </ScreenLayout>

    )
};

export default UploadCsv;