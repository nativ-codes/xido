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

const setSymbols = (symbols) => {
    try {
        store.set('symbols', JSON.stringify(symbols));
    } catch (error) {
        console.error('setSymbols', error);
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

export {
    getCompanies,
    setCompanies,
    getUserData,
    setUserData,
    setSymbols,
    getSymbols
};