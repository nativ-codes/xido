import {store} from '@/config/store'

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

export {
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