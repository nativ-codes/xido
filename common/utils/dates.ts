import { months } from '@/constants';

const getMonthByIndex = (month: number): string => months[month - 1];

export type ParseTransactionDateReturnType = {
    day: number;
    month: number;
    year: number;
    time: string;
    monthByIndex: string;
}

const parseTransactionDate = (_date: string): ParseTransactionDateReturnType => {
    // 29.12.2023 13:00
    const [date, time] = _date.split(' ');
    // 29.12.2023
    const [day, month, year] = date.split('.').map(Number);

    return {
        day,
        month,
        year,
        time,
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

export {
    getMonthByIndex,
    getIsOlderThanOneYear,
    parseTransactionDate
};
