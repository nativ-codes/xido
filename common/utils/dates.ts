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

const parseTransactionDate = (_date: string): ParseTransactionDateReturnType => {
    // 29.12.2023 13:00
    const [date, time] = _date.split(' ');
    // 29.12.2023
    const [day, month, year] = date.split('.').map(Number);
    const dateObject = new Date(year, month - 1, day);

    return {
        day,
        month,
        year,
        time,
        date: dateObject,
        displayDate: date,
        monthByIndex: getMonthByIndex(month)
    };
}

const getIsOlderThanOneYear = (dateString: string): boolean => {
    const { day, month, year } = parseTransactionDate(dateString);
    const inputDate = new Date(year, month - 1, day);
    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);

    return inputDate < oneYearAgo;
}

const compareDates = (date1: string, date2: string): {
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
