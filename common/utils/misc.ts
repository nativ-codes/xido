import { months } from '@/constants';

const noop = () => {};
const defaultKeyExtractor = (item: string | number) => item;

const sortByKey = (list: any[], keyExtractor: (props: any) => string | number) => list.sort((a, b) => {
    const keyA = keyExtractor(a);
    const keyB = keyExtractor(b);
    return keyA < keyB ? 1 : keyA > keyB ? -1 : 0;
});

const sortByMonthKeyExtractor = (keyExtractor: (props: any) => string | number) => (item: any) => months.indexOf(keyExtractor(item));
const sortByNumbers = (list: any[], keyExtractor: (props: any) => string | number) => list.sort((a, b) => {
    const keyA = keyExtractor(a);
    const keyB = keyExtractor(b);
    return keyA - keyB;
});

const getRandomString = () => (Math.random() + 1).toString(36).substring(7);

export { sortByNumbers, noop, getRandomString, defaultKeyExtractor, sortByKey, sortByMonthKeyExtractor };