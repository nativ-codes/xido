import React from 'react';

import { Text, Card } from '@/common/components';
import { formatPercentValue, formatValue } from '@/common/utils';
import Store from '@/config/store/slices/user-data';
import Spacer from '@/common/layouts/spacer/spacer';
import { PortfolioDividendCardPropsType } from './portfolio-dividend-card.types';

function PortfolioDividendCard({ overall, currency }: PortfolioDividendCardPropsType) {
	const last12MonthsDividend = Store.useLast12MonthsDividend();

	return (
		<Card gap='s16'>
			<Spacer gap='s4'>
				<Text variant='h5' letterSpacing={1} textTransform='uppercase'>
					Dividends last 12 months
				</Text>
				<Text variant='h3' isBold>
					{formatValue(last12MonthsDividend, currency)}
				</Text>
			</Spacer>
			<Spacer gap='s4'>
				<Text variant='h5' letterSpacing={1} textTransform='uppercase'>
					Average dividend yield
				</Text>
				<Text variant='h3' isBold>
					{formatPercentValue(overall.dividendYield)}
				</Text>
			</Spacer>
		</Card>
	);
}

export default PortfolioDividendCard;
