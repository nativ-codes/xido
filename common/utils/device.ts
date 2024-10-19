import * as DocumentPicker from 'expo-document-picker';
import { readRemoteFile } from 'react-native-csv';
import { TransactionType } from '@/types';

const uploadCsv = async () => 
    new Promise(async (resolve, reject) => {
        try {
            const result = await DocumentPicker.getDocumentAsync({
                type: 'text/csv',
            });
        
            readRemoteFile(result.assets[0].uri, {
                complete: resolve
            })
        } catch (error) {
            console.error("uploadCsv", error);
            reject(error);
        }
    });

export {
    uploadCsv
};
