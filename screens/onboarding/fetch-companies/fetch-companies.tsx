import React, { useState, useEffect } from 'react';
import { StyleSheet, ActivityIndicator, View } from 'react-native';
import { router } from 'expo-router';

import Store from '@/config/store/slices/user-data';
import { Text, Button, Progress } from '@/common/components';
import { filterRawTransactions, getLast12MonthsDividend, parseTransactions, parseTransactionsForCalendar, parseTransactionsForLast12MonthsDividend, parseUserData } from '@/common/utils';
import { mockedCompanies, mockedSymbols } from '@/__mocks__';
import { ScreenLayout } from '@/common/layouts';
import { getCompaniesInBatches } from '@/services/companies';
import colors from '@/common/colors';
import { defaultGoals } from '@/constants';

import styles from './fetch-companies.styles';

function FetchCompanies() {
    useEffect(() => {
        (async () => {
            try {
                const storedSymbols = mockedSymbols || Store.getSymbols();
                const storedRawTransactions = Store.getRawTransactions();
                const filteredRawTransactions = filterRawTransactions(storedRawTransactions, storedSymbols);

                if (storedSymbols.length) {
                    const parsedTransactions = parseTransactions(filteredRawTransactions);
                    const companies = mockedCompanies || await getCompaniesInBatches(storedSymbols);

                    if(companies.length === storedSymbols.length) {
                        const parsedTransactionsForLast12MonthsDividend = getLast12MonthsDividend(parseTransactionsForLast12MonthsDividend(filteredRawTransactions));
                        const parsedTransactionsForCalendar = parseTransactionsForCalendar(filteredRawTransactions);
                        const parsedUserData = parseUserData({
                            transactions: parsedTransactions,
                            companies
                        });

                        const goals = Store.getGoals();
                        Store.setGoals(goals.length ? goals : defaultGoals);
                        Store.setCurrency(companies[0].currency);
                        Store.setUserData(parsedUserData);
                        Store.setTransactions(parsedTransactions);
                        Store.setRawTransactions(filteredRawTransactions);
                        Store.setCalendar(parsedTransactionsForCalendar);
                        Store.setLast12MonthsDividend(parsedTransactionsForLast12MonthsDividend);
                    } else {
                        console.log('lengths not matching', companies.length, storedSymbols.length)
                    }
                } else {
                    console.log('no symbols found')
                }
            } catch (error) {
                console.error("FetchCompanies", error);
            } finally {
                router.navigate('/all-set');
            }
        })();
    }, []);

    return (
        <ScreenLayout canGoBack center={<Progress value={80} />}>
            <View style={{
                ...StyleSheet.absoluteFill,
                backgroundColor: colors.overlay,
                flex: 1,
                justifyContent: 'center',
            }}>
                <ActivityIndicator size="large" color={colors.primary} />
            </View>
        </ScreenLayout>
    )
};

export default FetchCompanies;