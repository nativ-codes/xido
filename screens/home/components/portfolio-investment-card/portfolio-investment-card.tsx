import React from 'react';

import { Text, Card } from '@/common/components';
import { formatPercentValue, formatValue } from '@/common/utils';
import { Colors } from '@/common/constants';
import Spacer from '@/common/layouts/spacer/spacer';
import { PortfolioInvestmentCardPropsType } from './portfolio-investment-card.types';

function PortfolioInvestmentCard({ overall, currency }: PortfolioInvestmentCardPropsType) {
	return (
		<Card gap='s16'>
			<Spacer gap='s4'>
				<Text variant='h5' letterSpacing={1} textTransform='uppercase'>
					Invested
				</Text>
				<Text variant='h3' isBold>
					{formatValue(overall.boughtValue, currency)}
				</Text>
			</Spacer>
			<Spacer gap='s4'>
				<Text variant='h5' letterSpacing={1} textTransform='uppercase'>
					Market value
				</Text>
				<Text variant='h3' isBold>
					{formatValue(overall.marketValue, currency)}
				</Text>
			</Spacer>
			<Spacer gap='s4'>
				<Text variant='h5' letterSpacing={1} textTransform='uppercase'>
					Profit/Loss
				</Text>
				<Text variant='h3' isBold color={Number(overall.profitOrLoss) > 0 ? Colors.primary : Colors.error}>
					{`${formatValue(overall.profitOrLoss, currency)} (${formatPercentValue(overall.profitOrLossPercentage)})`}
				</Text>
			</Spacer>
		</Card>
	);
}

export default PortfolioInvestmentCard;
