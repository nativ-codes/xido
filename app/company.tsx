import React from 'react';
import { useLocalSearchParams } from 'expo-router';
import {Text} from '@/common/components';

function Company(...args) {
    const {ticker} = useLocalSearchParams();
    console.log('searchPrams', ticker);
    return (
        <Text>{ticker}</Text>
    )
}

export default Company;