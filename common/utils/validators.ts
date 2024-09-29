import {columnTitles} from '@/constants';

const validateColumnTitles = (titles: string[]): boolean => 
    titles.every(title => columnTitles.includes(title));

export {
    validateColumnTitles
};