import React from 'react';
import {View} from 'react-native';
import Text from '../text/text';
import Tag from '../tag/tag';
import Avatar from '../avatar/avatar';
import Row from '@/common/layouts/row/row';

import colors from '@/common/colors';
import styles from './company-card.styles';

function CompanyCard({
    companyLogo,
    dividendYield = 4.3,
    marketValue = 1848.96,
    profitOrLoss = 2000,
    profitOrLossPercentage = 8.69,
    symbol = 'AAPL',
    companyName = 'Apple Inc.',
    weight = '5.00%',
}) {

    return (
        <View style={{
            padding: 16,
            borderRadius: 16,
            backgroundColor: colors.surface,
        }}>
            <Row
                style={{marginBottom: 16}}
                left={Boolean(companyLogo) ? <Avatar url={companyLogo} /> : <View style={styles.emptyAvatar}/>}
                center={
                    <View style={styles.center}>
                        <Tag value={symbol} variant="primary" />
                        <View style={{flexGrow: 1, flexShrink: 1}}>
                        <Text variant="h3" numberOfLines={1}>{companyName}</Text>
                            </View>
                    </View>
                }
                right={<Tag value={weight} variant="secondary" />}
            />
            <Row
                style={{
                    marginVertical: 8
                }}
                left={<Text variant="h4" color={colors.secondaryText}>Average dividend yield</Text>}
                right={<Text isBold variant="h2" color={colors.primaryText}>{dividendYield}</Text>}
            />     
            <Row
                style={{
                    marginVertical: 8
                }}
                left={<Text variant="h4" color={colors.secondaryText}>Market value</Text>}
                right={<Text isBold variant="h2" color={colors.primaryText}>{marketValue}</Text>}
            />  
            <Row
                style={{
                    marginVertical: 8
                }}
                left={<Text variant="h4" color={colors.secondaryText}>Profit/Loss</Text>}
                right={<Text isBold variant="h2" color={profitOrLoss > 0 ? colors.primary : colors.error}>{`${profitOrLoss} (${profitOrLossPercentage})`}</Text>}
            />                                 
        </View>
    )
}

export default CompanyCard;