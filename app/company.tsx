import React from 'react';
import { useLocalSearchParams } from 'expo-router';
import {
    SafeAreaView,
} from 'react-native-safe-area-context';

import { Divider, Avatar, Text, Tag, ListItem } from '@/common/components';

import { getUserData } from '@/config/store/slices/user-data';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import colors from '@/common/colors';
import {
    formatValue,
    formatPercentValue, parseTransactionsForCompany,
    parseTransactionsForExpectedDividends,
    getMonthByIndex,
    parseTransactionsToDisplay
} from '@/common/utils';
import Ionicons from '@expo/vector-icons/MaterialCommunityIcons';

const userData = getUserData();

function Company() {
    const { symbol } = useLocalSearchParams();
    const { summary, transactions } = userData[symbol] || {};
    const {
        bid,
        weight,
        shares,
        boughtValue,
        marketValue,
        profitOrLoss,
        dividendYield,
        profitOrLossPercentage,
        currency,
        companyLogo,
        companyName,
    } = summary || {};
    console.log('>>> summary', summary);

    const {
        maxShare,
        minShare,
        dividendsLastYear,
        dividendsAllTime,
    } = parseTransactionsForCompany(transactions);
    const expectedDividends = parseTransactionsForExpectedDividends(transactions);

    const avgShare = boughtValue / shares;
    const marketVsAvgShare = bid - avgShare;
    const marketVsAvgSharePercentage = (marketVsAvgShare / avgShare) * 100;
    const marketVsMinShare = bid - minShare;
    const marketVsMinSharePercentage = (marketVsMinShare / minShare) * 100;
    const marketVsMaxShare = bid - maxShare;
    const marketVsMaxSharePercentage = (marketVsMaxShare / maxShare) * 100;
    const transactionsToDisplay = parseTransactionsToDisplay(transactions);
    console.log('transactionsToDisplay', transactionsToDisplay)
    const renderSectionTitle = ({
        title,
        onInfo
    }) => (
        <TouchableOpacity activeOpacity={0.7} onPress={onInfo} style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingBottom: 8,
            alignItems: 'center'
        }}>
            <Text variant={Text.variants.H3} isBold>{title}</Text>
            <View style={{
                width: 24,
                height: 24,
                borderRadius: 12,
                backgroundColor: colors.secondarySurface,
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <Ionicons name="information-variant" size={20} color={colors.secondaryText} />
            </View>
        </TouchableOpacity>

    )

    console.log('searchPrams', symbol);
    return (
        <ScrollView>
            <SafeAreaView style={{
                backgroundColor: colors.background,
                padding: 16
            }}>

                <View style={{
                    alignItems: 'center',
                    gap: 16
                }}>
                    <Avatar
                        size={Avatar.sizes.LARGE}
                        placeholder={symbol}
                        url={companyLogo}
                    />
                    <Text variant={Text.variants.H1}>{companyName}</Text>
                    <View>
                        <Tag value={symbol} variant={Tag.variants.PRIMARY} />
                    </View>
                </View>
                <View style={{
                    marginTop: 32,
                    gap: 16
                }}>
                    <View style={{
                        padding: 16,
                        backgroundColor: colors.surface,
                        borderRadius: 16
                    }}>
                        {renderSectionTitle({
                            title: 'Overall',
                            onInfo: () => console.log('info')
                        })}
                        <ListItem
                            leftText="Weight"
                            rightText={formatPercentValue(weight)}
                        />
                        <ListItem
                            leftText="Invested"
                            rightText={formatValue(boughtValue, currency)}
                        />
                        <ListItem
                            leftText="Market value"
                            rightText={formatValue(marketValue, currency)}
                        />


                        <ListItem
                            leftText="Profit/Loss"
                            rightText={`${formatValue(profitOrLoss, currency)} (${formatPercentValue(profitOrLossPercentage)})`}
                            variant={Number(profitOrLoss) > 0 ? ListItem.variants.PROFIT : ListItem.variants.LOSS}
                        />
                        <Divider />


                        {renderSectionTitle({
                            title: 'Shares',
                            onInfo: () => console.log('info')
                        })}
                        <ListItem
                            leftText="Shared owned"
                            rightText={shares}
                        />
                        <ListItem
                            leftText="Market share value"
                            rightText={formatValue(bid, currency)}
                        />
                        <ListItem
                            leftText="Minimum share value"
                            rightText={formatValue(minShare, currency)}
                        />
                        <ListItem
                            leftText="Market vs min share"
                            rightText={`${formatValue(marketVsMinShare, currency)} (${formatPercentValue(marketVsMinSharePercentage)})`}
                            variant={Number(marketVsMinShare) > 0 ? ListItem.variants.PROFIT : ListItem.variants.LOSS}
                        />
                        <ListItem
                            leftText="Average share value"
                            rightText={formatValue(avgShare, currency)}
                        />
                        <ListItem
                            leftText="Market vs average share"
                            rightText={`${formatValue(marketVsAvgShare, currency)} (${formatPercentValue(marketVsAvgSharePercentage)})`}
                            variant={Number(marketVsAvgShare) > 0 ? ListItem.variants.PROFIT : ListItem.variants.LOSS}
                        />
                        <ListItem
                            leftText="Maximum share value"
                            rightText={formatValue(maxShare, currency)}
                        />
                        <ListItem
                            leftText="Market vs max share"
                            rightText={`${formatValue(marketVsMaxShare, currency)} (${formatPercentValue(marketVsMaxSharePercentage)})`}
                            variant={Number(marketVsMaxShare) > 0 ? ListItem.variants.PROFIT : ListItem.variants.LOSS}
                        />
                        <Divider />
                        {renderSectionTitle({
                            title: 'Dividends',
                            onInfo: () => console.log('info')
                        })}
                        <ListItem
                            leftText="Dividend yield"
                            rightText={formatPercentValue(dividendYield)}
                        />
                        <ListItem
                            leftText="Dividends last year"
                            rightText={formatValue(dividendsLastYear, currency)}
                        />
                        <ListItem
                            leftText="Dividends all time"
                            rightText={formatValue(dividendsAllTime, currency)}
                        />
                        <Divider />
                        {renderSectionTitle({
                            title: 'Expected dividends',
                            onInfo: () => console.log('info')
                        })}
                        {expectedDividends.months.map(period => (<ListItem
                            key={period}
                            leftText={period}
                            rightText={formatValue(expectedDividends.value * shares, currency)}
                        />))}
                        <Divider />
                        {renderSectionTitle({
                            title: 'Latest transactions',
                            onInfo: () => console.log('info')
                        })}
                        {transactionsToDisplay.map(({ date, type, amount }) => (<ListItem
                            key={`${date} ${type} ${amount}`}
                            leftText={`${date}\t${type}`}
                            rightText={formatValue(amount, currency)}
                        />))}
                    </View>
                </View>
            </SafeAreaView>
        </ScrollView>
    )
}

export default Company;