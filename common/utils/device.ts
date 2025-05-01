import * as DocumentPicker from 'expo-document-picker';
import Papa from 'papaparse';

const uploadCsv = async () =>
	new Promise(async (resolve, reject) => {
		try {
			console.log('DocumentPicker.getDocumentAsync');
			const result = await DocumentPicker.getDocumentAsync({
				type: ['text/csv', 'application/csv', 'application/vnd.ms-excel', 'text/comma-separated-values']
			});

			if (result?.assets) {
				const response = await fetch(result?.assets[0].uri);
				const text = await response.text();

				const jsonTransactions = Papa.parse(text, {
					header: false,
					error: function (error, file, inputElem, reason) {
						reject({ error, file, inputElem, reason });
					}
				});
				resolve(jsonTransactions);
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
