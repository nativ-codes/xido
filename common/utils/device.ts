import * as DocumentPicker from 'expo-document-picker';
import * as XLSX from 'xlsx';
import { CASH_OPERATION } from '../constants';

const extractDataFromXlsx = async (result: DocumentPicker.DocumentPickerResult) => {
	if (!result?.assets) return;

	const response = await fetch(result.assets?.[0]?.uri);
	const arrayBuffer = await response.arrayBuffer();

	const workbook = XLSX.read(arrayBuffer, { type: 'array' });
	const allData: any[] = [];


	workbook.SheetNames.forEach((sheetName) => {
		if (!sheetName?.toLowerCase?.()?.includes(CASH_OPERATION)) return;

		const worksheet = workbook.Sheets[sheetName];
		const sheetData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

		allData.push(...sheetData);
	});

	return allData;
};

const normalizeExtractedData = (rows: any[]) => {
	return rows.reduce((acc, row) => {
		const isRowEmpty = !row.length;
		const isNonRecordRow = row[0] && row[0] !== 'undefined' && row[1] && row[1] !== 'undefined';
		if (isRowEmpty || !isNonRecordRow) return acc;

		return [...acc, row];
	}, []);
};

const uploadCsv = async () =>
	new Promise(async (resolve, reject) => {
		try {
			const result = await DocumentPicker.getDocumentAsync({
				type: ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/vnd.ms-excel']
			});

			if (result?.assets) {
				const allData = await extractDataFromXlsx(result);
				const normalizedData = await normalizeExtractedData(allData);
				resolve({ data: normalizedData });
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
