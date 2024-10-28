import React, { useMemo, useState } from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import { ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Header, Divider, Avatar, Text, Tag, ListItem, Card } from '@/common/components';
import { getUserData } from '@/config/store/slices/user-data';
import { formatValue, formatPercentValue } from '@/common/utils';
import { CompanyInfoSections, TransactionsToDisplayPropTypes } from '@/types';

import CompanyInfoBottomSheet from './components/company-info-bottom-sheet/company-info-bottom-sheet';
import styles from './company.styles';

function Company() {
  const userData = useMemo(getUserData, []);
  const [infoSection, setInfoSection] = useState<CompanyInfoSections>();
  const { symbol }: { symbol: string } = useLocalSearchParams();
  const { summary } = userData[symbol] || {};
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
    maxShare,
    minShare,
    dividendsLastYear,
    dividendsAllTime,
    expectedDividends,
    latestTransactions,
  } = summary || {};

  const avgShare = boughtValue / shares;
  const marketVsAvgShare = bid - avgShare;
  const marketVsAvgSharePercentage = (marketVsAvgShare / avgShare) * 100;
  const marketVsMinShare = bid - minShare;
  const marketVsMinSharePercentage = (marketVsMinShare / minShare) * 100;
  const marketVsMaxShare = bid - maxShare;
  const marketVsMaxSharePercentage = (marketVsMaxShare / maxShare) * 100;

  const hideModal = () => setInfoSection(undefined);
  const showModal = (section: CompanyInfoSections) => () => setInfoSection(section);

  const overallSection = useMemo(() => (
    <>
      <Card.Title title="Overall" onPress={showModal(CompanyInfoSections.OVERALL)} />
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
    </>
  ), []);

  const sharesSection = useMemo(() => (
    <>
      <Card.Title title="Shares" onPress={showModal(CompanyInfoSections.SHARES)} />
      <ListItem
        leftText="Shares owned"
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
        leftText="Market vs avg share"
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
    </>
  ), []);

  const dividendsSection = useMemo(() => Boolean(dividendsAllTime) && (
    <>
      <Card.Title title="Dividends" onPress={showModal(CompanyInfoSections.DIVIDENDS)} />
      <ListItem
        leftText="Dividend yield"
        rightText={formatPercentValue(dividendYield)}
      />
      <ListItem
        leftText="Dividends last 12 months"
        rightText={formatValue(dividendsLastYear, currency)}
      />
      <ListItem
        leftText="Dividends all time"
        rightText={formatValue(dividendsAllTime, currency)}
      />
      <Divider />
    </>
  ), []);

  const expectedDividendsSection = useMemo(() => Boolean(dividendsAllTime) && (
    <>
      <Card.Title title="Expected dividends" onPress={showModal(CompanyInfoSections.EXPECTED_DIVIDENDS)} />
      {expectedDividends.months.map((period: string) => (<ListItem
        key={period}
        leftText={period}
        rightText={formatValue(expectedDividends.value * shares, currency)}
      />))}
      <Divider />
    </>
  ), []);

  const latestTransactionsSection = useMemo(() => (
    <>
      <Card.Title title="Latest transactions" onPress={showModal(CompanyInfoSections.LATEST_TRANSACTIONS)} />
      {latestTransactions.map(({ date, type, amount }: TransactionsToDisplayPropTypes) => (<ListItem
        key={`${date} ${type} ${amount}`}
        leftText={`${date}\t${type}`}
        rightText={formatValue(amount, currency)}
      />))}
    </>
  ), [])

  return (
    <ScrollView contentContainerStyle={styles.contentContainer}>
      <SafeAreaView>
        <Header onPress={router.back} />
        <View style={styles.wrapper}>
          <View style={styles.headerContainer}>
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
          <View style={styles.content}>
            <Card>
              {overallSection}
              {sharesSection}
              {dividendsSection}
              {expectedDividendsSection}
              {latestTransactionsSection}
            </Card>
          </View>
        </View>
      </SafeAreaView>
      <CompanyInfoBottomSheet
        infoSection={infoSection}
        hideModal={hideModal}
      />
    </ScrollView>
  )
}

export default Company;