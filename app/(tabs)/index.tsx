import { Text, TouchableOpacity, Image, StyleSheet, Platform } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

import { readRemoteFile } from 'react-native-csv';

enum OperationType {
  Deposit = 'Deposit',
  Dividend = 'Dividend',
  SpinOff = 'Spin off',
  WithholdingTax = 'Withholding tax',
  StocksEtfPurchase = 'Stocks/ETF purchase',
  FreeFundsInterests = 'Free funds interests',
  FreeFundsInterestsTax = 'Free funds interests tax'
}

export default function HomeScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }>
      <TouchableOpacity onPress={async () => {
          let result = await DocumentPicker.getDocumentAsync({
    type: 'text/csv',
  });
// Total dividends received
// Total amount of stocks bought
// Total amount of stocks sold
// Total amount of stocks received from spin-offs
// Total amount of free funds interests received
// Total amount of free funds interests tax paid

const calculateSummary = ({summary, type, amount}) => {
  const newSummary = {...summary};

  switch(type) {
    case OperationType.Dividend:
      newSummary.dividends += parseFloat(amount);
      break;
    case OperationType.WithholdingTax:
      newSummary.withholdingTax += parseFloat(amount);
      break;      
    case OperationType.StocksEtfPurchase:
      newSummary.stocks += parseFloat(amount);
      break;
    case OperationType.SpinOff:
      newSummary.spinOffs += parseFloat(amount);
      break;
    case OperationType.FreeFundsInterests:
      newSummary.freeFundsInterest += parseFloat(amount);
      break;
    case OperationType.FreeFundsInterestsTax:
      newSummary.freeFundsInterestTax += parseFloat(amount);
      break;
  }

  return newSummary;
}

const defaultState = {
  companies: {},
  summary: {
    dividends: 0,
    withholdingTax: 0,
    stocks: 0,
    spinOffs: 0,
    freeFundsInterest: 0,
    freeFundsInterestTax: 0,  
  }
}

const parseCompanies = (companies) => {
  return companies.reduce((parsedCompanies, transaction) => {
    const [id, type, time, symbol, comment, amount] = transaction;
    const newCompanies = Boolean(symbol) ? {
      ...parsedCompanies.companies,
      [symbol]: {
        summary: calculateSummary({summary: parsedCompanies.companies[symbol]?.summary || defaultState.summary, type, amount}),
        transactions: [...(parsedCompanies.companies[symbol]?.transactions || []), transaction]
      },
    } : parsedCompanies.companies;

    return {
      summary: calculateSummary({summary: parsedCompanies.summary, type, amount}),
      companies: newCompanies,
    };
  }, defaultState);
}

readRemoteFile(
  result.assets[0].uri,
  {
    complete: (results) => {
      // console.log('Results:', results)
      console.log('Results:', JSON.stringify(parseCompanies(results.data)))
      // let dividends = 0;
      // let stocks = 0;
      // let spinOffs = 0;
      // let freeFundsInterest = 0;
      // let freeFundsInterestTax = 0;
      // for(let i = 0; i < results.data.length; i++){
      //   const [id, type, time, symbol, comment, amount] = results.data[i];
      //   if(type === OperationType.Dividend) {
      //     dividends += parseFloat(amount);
      //   }
      //   if(type === OperationType.StocksEtfPurchase) {
      //     stocks += parseFloat(amount);
      //   }
      //   if(type === OperationType.SpinOff) {
      //     spinOffs += parseFloat(amount);
      //   }
      //   if(type === OperationType.FreeFundsInterests) {
      //     freeFundsInterest += parseFloat(amount);
      //   }  
      //   if(type === OperationType.FreeFundsInterestsTax) {
      //     freeFundsInterestTax += parseFloat(amount);
      //   }                 
      // }
      // console.log('Dividends:', dividends);
      // console.log('Stocks:', stocks);
      // console.log('SpinOffs:', spinOffs);
      // console.log('FreeFundsInterest:', freeFundsInterest);
      // console.log('FreeFundsInterestTax:', freeFundsInterestTax);
    }
  }
);  
      }}>
        <Text>click</Text>
        </TouchableOpacity>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
