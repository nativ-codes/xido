import { InfoSections } from '@/types';
import { months } from './configs';

const InfoConstants = {
    [InfoSections.OVERALL]: [{
        title: 'Weight',
        description: 'Proportion of the company\'s value within the overall portfolio.'
    }, {
        title: 'Invested',
        description: 'Total capital invested in the company.'
    }, {
        title: 'Market value',
        description: 'Current valuation of the company based on market prices.'
    }, {
        title: 'Profit/Loss',
        description: 'Financial gain or loss based on the difference between invested capital and market price.'
    }],
    [InfoSections.SHARES]: [{
        title: 'Shares owned',
        description: 'Total number of shares currently held.'
    }, {
        title: 'Market share value',
        description: 'Current price of a single share in the market.'
    }, {
        title: 'Minimum share value',
        description: 'The lowest price paid for any share owned.'
    }, {
        title: 'Market vs min share',
        description: 'Difference between current market share price and the lowest price paid for a share.'
    }, {
        title: 'Average share value',
        description: 'The average price paid per share across all purchases.'
    }, {
        title: 'Market vs avg share',
        description: 'Difference between current market price and the average purchase price of shares.'
    }, {
        title: 'Maximum share value',
        description: 'The highest price paid for a share.'
    }, {
        title: 'Market vs max share',
        description: 'Difference between current market share price and the highest price paid for a share.'
    }],
    [InfoSections.DIVIDENDS]: [{
        title: 'Dividend yield',
        description: 'Percentage return from dividends relative to the share price.'
    }, {
        title: 'Dividends last 12 months',
        description: 'Total dividends received in the last 12 months.'
    }, {
        title: 'Dividends all time',
        description: 'Cumulative total of all dividends received from the company.'
    }],
    [InfoSections.EXPECTED_DIVIDENDS]: [{
        title: 'Expected dividends',
        description: 'The expected dividends from the company based on the previous dividends received.'
    }],
    [InfoSections.LATEST_TRANSACTIONS]: [{
        title: 'Latest transactions',
        description: 'The latest transactions made related to the company.'
    }]
}

export {
    InfoConstants
};
