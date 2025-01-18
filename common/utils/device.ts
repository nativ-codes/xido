import * as DocumentPicker from 'expo-document-picker';
import { readRemoteFile } from 'react-native-csv';

const uploadCsv = async () =>
	new Promise(async (resolve, reject) => {
		try {
			const result = await DocumentPicker.getDocumentAsync({
				type: 'text/csv'
			});

			if (result?.assets) {
				readRemoteFile(result?.assets[0].uri, {
					complete: resolve
				});
			} else {
				console.log('No file selected');
				reject('No file selected');
			}
		} catch (error) {
			console.log('uploadCsv', error);
			reject(error);
		}
	});

export { uploadCsv };
