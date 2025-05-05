import React from 'react';

import { Text, Card, ListItem } from '@/common/components';
import { formatPercentValue, formatValue } from '@/common/utils';
import Store from '@/config/store/slices/user-data';
import Spacer from '@/common/layouts/spacer/spacer';
import { PortfolioDividendCardPropsType } from './portfolio-dividend-card.types';

function PortfolioDividendCard({ overall, currency, onInfoPress }: PortfolioDividendCardPropsType) {
	const last12MonthsDividend = Store.useLast12MonthsDividend();

	return (
		<Card>
			<Card.Title title='Dividends' onPress={onInfoPress} />
			<ListItem leftText='Dividends last 12 months' rightText={`${formatValue(last12MonthsDividend, currency)}`} />
			<ListItem leftText='Average dividend yield' rightText={`${formatPercentValue(overall.dividendYield)}`} />
		</Card>
	);
}

export default PortfolioDividendCard;
