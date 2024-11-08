import React from 'react';
import {View} from 'react-native';
import Text from '@/common/components/text/text';
import Tag from '@/common/components/tag/tag';
import Avatar from '@/common/components/avatar/avatar';
import Row from '@/common/layouts/row/row';

import styles from './company-card.styles';
import { CalculateMarketSummaryReturnType } from '@/types/companies';
import ListItem from '@/common/components/list-item/list-item';
import { formatPercentValue, formatValue } from '@/common/utils';

function CompanyCard({
    companyLogo,
    currency,
    dividendYield,
    marketValue,
    profitOrLoss,
    profitOrLossPercentage,
    symbol,
    companyName,
    weight,
}: CalculateMarketSummaryReturnType) {
    return (
        <View style={styles.wrapper}>
            <Row
                style={styles.header}
                left={<Avatar url={companyLogo} placeholder={symbol}/>}
                center={
                    <View style={styles.center}>
                        <Tag value={symbol} variant={Tag.variants.PRIMARY} />
                        <View style={styles.companyName}>
                            <Text variant={Text.variants.H3} numberOfLines={1}>{companyName}</Text>
                        </View>
                    </View>
                }
            />
            <View style={styles.weight}>
                <Text isBold variant={Text.variants.H6}>{formatPercentValue(weight)}</Text>
            </View>

            {Boolean(dividendYield) && <ListItem
                leftText="Dividend yield"
                rightText={formatPercentValue(dividendYield)}
            />}            
            <ListItem
                leftText="Market value"
                rightText={formatValue(marketValue, currency)}
            />
            <ListItem
                leftText="Profit/Loss"
                rightText={`${formatValue(profitOrLoss, currency)} (${formatPercentValue(profitOrLossPercentage)})`}
                variant={Number(profitOrLoss) > 0 ? ListItem.variants.PROFIT : ListItem.variants.LOSS}
            />
        </View>
    )
}

export default CompanyCard;