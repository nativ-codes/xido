import { CompanyInfoSections, HomeInfoSections } from '@/types';

const CompanyInfo = {
    [CompanyInfoSections.OVERALL]: [{
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
    [CompanyInfoSections.SHARES]: [{
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
    [CompanyInfoSections.DIVIDENDS]: [{
        title: 'Dividend yield',
        description: 'Percentage return from dividends relative to the share price.'
    }, {
        title: 'Dividends last 12 months',
        description: 'Total dividends received in the last 12 months.'
    }, {
        title: 'Dividends all time',
        description: 'Cumulative total of all dividends received from the company.'
    }],
    [CompanyInfoSections.EXPECTED_DIVIDENDS]: [{
        title: 'Expected dividends',
        description: 'The expected dividends from the company based on the previous dividends received.'
    }],
    [CompanyInfoSections.LATEST_TRANSACTIONS]: [{
        title: 'Latest transactions',
        description: 'The latest transactions made related to the company.'
    }]
}

const CalendarInfo = [{
    title: 'Month weight',
    description: 'Proportion of the company\'s dividend relative to total monthly dividends received.'
}, {
    title: 'Expected month weight',
    description: 'Expected proportion of the company\'s dividend relative to total monthly expected dividends.'
}, {
    title: 'Dividends this month',
    description: 'Total dividends received for the current month.'
}, {
    title: 'Expected dividends this month',
    description: 'Expected dividends to be received for the current month.'
}, {
    title: 'Dividends this year',
    description: 'Total dividends received for the current year.'
}, {
    title: 'Expected dividends this year',
    description: 'Expected dividends to be received for the current year.'
}];

const HomeInfo = {
    [HomeInfoSections.OVERALL]: [{
        title: 'Invested',
        description: 'Total capital invested in the portfolio.'
    }, {
        title: 'Market value',
        description: 'Current valuation of the portfolio based on market prices.'
    }, {
        title: 'Profit/Loss',
        description: 'Financial gain or loss based on the difference between invested capital and market price.'
    }, {
        title: 'Dividends last 12 months',
        description: 'Total dividends received in the last 12 months.'
    }],
    [HomeInfoSections.GOALS]: [{
        title: 'Latest goal achieved',
        description: 'The most recent financial goal that has been reached.'
    }, {
        title: 'Next goal',
        description: 'The next financial goal to be achieved.'
    }, {
        title: 'Progress',
        description: 'The progress towards the next financial goal.'
    }]
};

export {
    HomeInfo,
    CalendarInfo,
    CompanyInfo
};
