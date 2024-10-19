import React from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from '@expo/vector-icons/MaterialCommunityIcons';
import { router } from 'expo-router';

import { Text, Header, Button, Progress} from '@/common/components';
import colors from '@/common/colors';

import styles from './upload-csv.styles';

function UploadCsv() {
    const handleOnUpload = () => {
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
                <View style={styles.uploadBox}>
                    <Ionicons name="file-document-outline" size={24} color={colors.disable} />
                    <Text color={colors.disable}>Select file</Text>
                </View>
            </View>
            <View style={styles.button}>
                <Button label="Continue" onPress={handleOnUpload} variant={Button.variants.PRIMARY} />
            </View>
        </SafeAreaView>
    )
};

export default UploadCsv;