import * as DocumentPicker from 'expo-document-picker';
import { readRemoteFile } from 'react-native-csv';
import { TransactionType } from '@/types';

const uploadCsv = async (callback: (response: TransactionType[]) => void) => {
    const result = await DocumentPicker.getDocumentAsync({
        type: 'text/csv',
    });

    readRemoteFile(result.assets[0].uri, {
        complete: callback
    })
}

export {
    uploadCsv
};
