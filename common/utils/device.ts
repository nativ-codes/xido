import * as DocumentPicker from 'expo-document-picker';
import * as XLSX from 'xlsx';
import { CASH_OPERATION, OPEN_POSITIONS } from '../constants';
import { XTBTransactionFields } from '@/types';
import { validateColumnTitles } from './validators';

export type OpenPositionsType = Record<string, number>;

// shortcut: xlsx 0.18.5 reads XTB's ZIP64 data descriptors as 4-byte sizes and console.errors a harmless
// "Bad uncompressed size: N != 0" per zip entry (data still decodes fine); drop this if a newer xlsx stops logging it
const readWorkbook = (data: ArrayBuffer) => {
	const consoleError = console.error;
	console.error = (...args: unknown[]) => {
		if (!String(args[0]).startsWith('Bad uncompressed size')) consoleError(...args);
	};

	try {
		return XLSX.read(data, { type: 'array' });
	} finally {
		console.error = consoleError;
	}
};

const extractDataFromXlsx = async (uri: string) => {
	const response = await fetch(uri);
	const workbook = readWorkbook(await response.arrayBuffer());
	const getSheetRows = (sheetName: string): string[][] => {
		const worksheet = workbook.Sheets[sheetName];
		return worksheet ? XLSX.utils.sheet_to_json(worksheet, { header: 1, raw: false, defval: '' }) : [];
	};

	return {
		data: normalizeExtractedData(getSheetRows(CASH_OPERATION)),
		openPositions: parseOpenPositions(getSheetRows(OPEN_POSITIONS))
	};
};

// Shares held per symbol. Cash operations can't give this: e.g. spin-off shares are credited with no cash row.
// Each instrument has one summary row (Category set) above its individual positions (Category empty).
const parseOpenPositions = (rows: string[][]): OpenPositionsType => {
	const headerIndex = rows.findIndex((row) => row[2] === 'Ticker' && row[5] === 'Volume');
	if (headerIndex === -1) return {};

	return rows
		.slice(headerIndex + 1)
		.filter((row) => row[3])
		.reduce((acc, row) => ({ ...acc, [row[2].split('.')[0]]: parseFloat(row[5]) }), {});
};

// Keeps the header row first, then only records: skips the account/date-range rows above it and the trailing "Total" row
const normalizeExtractedData = (rows: string[][]) => {
	const headerIndex = rows.findIndex(validateColumnTitles);
	if (headerIndex === -1) return [];

	return rows.slice(headerIndex).filter((row) => row[XTBTransactionFields.ID]);
};

const uploadCsv = async () =>
	new Promise(async (resolve, reject) => {
		try {
			const result = await DocumentPicker.getDocumentAsync({
				type: ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/vnd.ms-excel']
			});

			if (result?.assets) {
				resolve(await extractDataFromXlsx(result.assets[0].uri));
			} else {
				console.log('No file selected');
				reject('No file selected');
			}
		} catch (error) {
			console.log('uploadCsv', error);
			reject(error);
		}
	});

export { uploadCsv, normalizeExtractedData, parseOpenPositions };
