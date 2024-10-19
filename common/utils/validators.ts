import {columnTitles} from '@/constants';

const validateColumnTitles = (titles: string[]): boolean => 
    titles.every(title => columnTitles.includes(title));

const getIsEmpty = (value: any) => !Object.keys(value).length;

export {
    getIsEmpty,
    validateColumnTitles
};