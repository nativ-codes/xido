import { months, oneYearInMilliseconds } from '@/common/constants';

const getMonthByIndex = (month: number): string => months[month - 1];

export type ParseTransactionDateReturnType = {
    day: number;
    month: number;
    year: number;
    time: string;
    date: Date;
    displayDate: string;
    monthByIndex: string;
}

const parseTransactionDate = (excelDate: string | number): ParseTransactionDateReturnType => {
    // Convert Excel date to JavaScript Date
    // Excel date epoch is January 1, 1900, but Excel incorrectly treats 1900 as a leap year
    // So we need to adjust by subtracting 2 days
    const excelEpoch = new Date(1900, 0, 1);
    const excelDateNumber = typeof excelDate === 'string' ? parseFloat(excelDate) : excelDate;
    
    // Excel dates are 1-indexed and have a leap year bug for 1900
    const millisecondsPerDay = 24 * 60 * 60 * 1000;
    const adjustedDays = excelDateNumber - 2; // Adjust for Excel's 1900 leap year bug
    const dateObject = new Date(excelEpoch.getTime() + adjustedDays * millisecondsPerDay);
    
    const day = dateObject.getDate();
    const month = dateObject.getMonth() + 1; // JavaScript months are 0-indexed
    const year = dateObject.getFullYear();
    const time = dateObject.toTimeString().split(' ')[0]; // Get HH:MM:SS format
    
    // Format display date as DD.MM.YYYY
    const displayDate = `${day.toString().padStart(2, '0')}.${month.toString().padStart(2, '0')}.${year}`;

    return {
        day,
        month,
        year,
        time,
        date: dateObject,
        displayDate,
        monthByIndex: getMonthByIndex(month)
    };
}

const getIsOlderThanOneYear = (excelDate: string | number): boolean => {
    const { date: inputDate } = parseTransactionDate(excelDate);
    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);

    return inputDate < oneYearAgo;
}

const compareDates = (date1: string | number, date2: string | number): {
    isOlderThanOneYear: boolean;
} => {
    const date1Timestamp = parseTransactionDate(date1).date.getTime();
    const date2Timestamp = parseTransactionDate(date2).date.getTime();

    const timeDifference = date1Timestamp - date2Timestamp;

    return {
        isOlderThanOneYear: timeDifference >= 0 && timeDifference <= oneYearInMilliseconds
    }
}

export {
    compareDates,
    getMonthByIndex,
    getIsOlderThanOneYear,
    parseTransactionDate
};
