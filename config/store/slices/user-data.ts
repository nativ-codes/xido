import {store} from '@/config/store'

const getUserData = () => {
    try {
        const storedUserData = store.getString('userData');
        const parsedStoredUserData = storedUserData ? JSON.parse(storedUserData) : {};

        return parsedStoredUserData;
    } catch (error) {
        console.error(error);

        return {};
    }
}

export {
    getUserData
};