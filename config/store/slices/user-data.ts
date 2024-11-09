import { useMMKVString } from 'react-native-mmkv';
import {store} from '@/config/store'
import { useMemo } from 'react';

const getUserData = () => {
    try {
        const userData = store.getString('userData');
        const parsedUserData = userData ? JSON.parse(userData) : {};

        return parsedUserData;
    } catch (error) {
        console.error('getUserData', error);

        return {};
    }
}

const setUserData = (userData) => {
    try {
        store.set('userData', JSON.stringify(userData));
    } catch (error) {
        console.error('setUserData', error);
    }
}

const getCompanies = () => {
    try {
        const companies = store.getString('companies');
        const parsedCompanies = companies ? JSON.parse(companies) : {};

        return parsedCompanies;
    } catch (error) {
        console.error('getCompanies', error);

        return {};
    }
}

const setCompanies = (companies) => {
    try {
        store.set('companies', JSON.stringify(companies));
    } catch (error) {
        console.error('setCompanies', error);
    }
}

const getSymbols = () => {
    try {
        const symbols = store.getString('symbols');
        const parsedSymbols = symbols ? JSON.parse(symbols) : [];

        return parsedSymbols;
    } catch (error) {
        console.error('getSymbols', error);

        return [];
    }
}

const setSymbols = (symbols) => {
    try {
        store.set('symbols', JSON.stringify(symbols));
    } catch (error) {
        console.error('setSymbols', error);
    }
}

const getCalendar = () => {
    try {
        const calendar = store.getString('calendar');
        const parsedCalendar = calendar ? JSON.parse(calendar) : [];

        return parsedCalendar;
    } catch (error) {
        console.error('getCalendar', error);

        return [];
    }
}

const setCalendar = (calendar) => {
    try {
        store.set('calendar', JSON.stringify(calendar));
    } catch (error) {
        console.error('setCalendar', error);
    }
}


const getLast12MonthsDividend = () => {
    try {
        const last12MonthsDividend = store.getString('last12MonthsDividend');
        const parsedLast12MonthsDividend = last12MonthsDividend ? JSON.parse(last12MonthsDividend) : 0;

        return parsedLast12MonthsDividend;
    } catch (error) {
        console.error('getLast12MonthsDividend', error);

        return [];
    }
}

const setLast12MonthsDividend = (last12MonthsDividend) => {
    try {
        store.set('last12MonthsDividend', JSON.stringify(last12MonthsDividend));
    } catch (error) {
        console.error('setLast12MonthsDividend', error);
    }
}

const getGoals = () => {
    try {
        const goals = store.getString('goals');
        const parsedGoals = goals ? JSON.parse(goals) : [];

        return parsedGoals;
    } catch (error) {
        console.error('getGoals', error);

        return [];
    }
}

const setGoals = (goals) => {
    try {
        store.set('goals', JSON.stringify(goals));
    } catch (error) {
        console.error('setGoals', error);
    }
}

const getCurrency = () => {
    try {
        const currency = store.getString('currency');
        const parsedCurrency = currency ? JSON.parse(currency) : [];

        return parsedCurrency;
    } catch (error) {
        console.error('getCurrency', error);

        return [];
    }
}

const setCurrency = (currency) => {
    try {
        store.set('currency', JSON.stringify(currency));
    } catch (error) {
        console.error('setCurrency', error);
    }
}

const getRawTransactions = () => {
    try {
        const rawTransactions = store.getString('rawTransactions');
        const parsedRawTransactions = rawTransactions ? JSON.parse(rawTransactions) : [];

        return parsedRawTransactions;
    } catch (error) {
        console.error('getRawTransactions', error);

        return [];
    }
}

const setRawTransactions = (rawTransactions) => {
    try {
        store.set('rawTransactions', JSON.stringify(rawTransactions));
    } catch (error) {
        console.error('setRawTransactions', error);
    }
}

const getTransactions = () => {
    try {
        const transactions = store.getString('transactions');
        const parsedTransactions = transactions ? JSON.parse(transactions) : [];

        return parsedTransactions;
    } catch (error) {
        console.error('getTransactions', error);

        return [];
    }
}

const setTransactions = (transactions) => {
    try {
        store.set('transactions', JSON.stringify(transactions));
    } catch (error) {
        console.error('setTransactions', error);
    }
}

const useUserData = () => {
    const [userData] = useMMKVString('userData');
    
    return useMemo(() => JSON.parse(userData || '[]'), [userData]);
}

const useCalendar = () => {
    const [calendar] = useMMKVString('calendar');

    return useMemo(() => JSON.parse(calendar || '[]'), [calendar]);
}

const useCurrency = () => {
    const [currency] = useMMKVString('currency');
    console.log('>> currency', currency)

    return useMemo(() => (currency ? JSON.parse(currency) : ""), [currency]);
}

const useGoals = () => {
    const [goals] = useMMKVString('goals');

    return useMemo(() => JSON.parse(goals || '[]'), [goals]);
}

const useTransactions = () => {
    const [transactions] = useMMKVString('transactions');

    return useMemo(() => JSON.parse(transactions || '[]'), [transactions]);
}

const useLast12MonthsDividend = () => {
    const [last12MonthsDividend] = useMMKVString('last12MonthsDividend');

    return useMemo(() => JSON.parse(last12MonthsDividend || '0'), [last12MonthsDividend]);
}

const clearAll = () => {
    store.clearAll()
}

export {
    useUserData,
    getCurrency,
    setCurrency,
    getGoals,
    setGoals,
    getLast12MonthsDividend,
    setLast12MonthsDividend,
    getCompanies,
    setCompanies,
    getUserData,
    setUserData,
    getSymbols,
    setSymbols,
    getCalendar,
    setCalendar
};

export default {
    useTransactions,
    clearAll,
    useGoals,
    useCurrency,
    useCalendar,
    useUserData,
    useLast12MonthsDividend,
    getRawTransactions,
    setRawTransactions,    
    getTransactions,
    setTransactions,
    getCurrency,
    setCurrency,
    getGoals,
    setGoals,
    getLast12MonthsDividend,
    setLast12MonthsDividend,
    getCompanies,
    setCompanies,
    getUserData,
    setUserData,
    getSymbols,
    setSymbols,
    getCalendar,
    setCalendar
}