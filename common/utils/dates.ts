const parseTransactionDate = (_date: string) => {
    // 29.12.2023 13:00
    const [date, time] = _date.split(' ');
    // 29.12.2023
    const [day, month, year] = date.split('.').map(Number);

    return {
        day,
        month,
        year,
        time
    };
}

const getIsOlderThanOneYear = (dateString: string): boolean => {
    const {day, month, year} = parseTransactionDate(dateString);
    const inputDate = new Date(year, month - 1, day);
    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);

    return inputDate < oneYearAgo;
}

export {
    getIsOlderThanOneYear,
    parseTransactionDate
};
