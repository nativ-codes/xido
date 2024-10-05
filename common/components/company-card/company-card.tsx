import React from 'react';
import {View} from 'react-native';
import Text from '@/common/components/text/text';
import Tag from '@/common/components/tag/tag';
import Avatar from '@/common/components/avatar/avatar';
import Row from '@/common/layouts/row/row';

import { currencies } from '@/constants';
import styles from './company-card.styles';
import { CalculateMarketSummaryReturnType } from '@/types/companies';
import ListItem from '@/common/components/list-item/list-item';
import { ListItemVariants } from '@/types/components';

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
                left={<Avatar url={companyLogo} />}
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
                <Text isBold variant={Text.variants.H6}>{`${weight}%`}</Text>
            </View>

            {Boolean(dividendYield) && <ListItem
                leftText="Dividend yield"
                rightText={`${dividendYield}%`}
            />}            
            <ListItem
                leftText="Market value"
                rightText={`${currencies[currency]}${marketValue}`}
            />
            <ListItem
                leftText="Profit/Loss"
                rightText={`${currencies[currency]}${profitOrLoss} (${profitOrLossPercentage}%)`}
                variant={Number(profitOrLoss) > 0 ? ListItemVariants.PROFIT : ListItemVariants.LOSS}
            />
        </View>
    )
}

export default CompanyCard;