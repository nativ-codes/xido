import { Text, TouchableOpacity, Image, StyleSheet, Platform } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';

import ParallaxScrollView from '@/components/ParallaxScrollView';

import { readRemoteFile } from 'react-native-csv';
import { getCompanies, getCompaniesInBatches } from '@/services/companies';
import {chunkList, uploadCsv, parseCompanies, parseTransactions, validateColumnTitles} from '@/common/utils';
import { useMMKVString } from 'react-native-mmkv';
import {store} from '@/config/store';


// Total dividends received
// Total amount of stocks bought
// Total amount of stocks sold
// Total amount of stocks received from spin-offs
// Total amount of free funds interests received
// Total amount of free funds interests tax paid

export default function HomeScreen() {
  const [username, setUsername] = useMMKVString('transactions')
  // console.log('>>', username)

  const handleOnUploadCsv = () => {
    uploadCsv(parseResponse)
  }

  const parseResponse = response => {
    if(response.data.length) {
      if(validateColumnTitles(response.data[0])) {
      console.log('transactions', JSON.stringify(parseTransactions(response.data)));
      // store.set('transactions', JSON.stringify(response));
      } else {
        console.log('Invalid column titles. Please make sure the file has the correct format.');
      }
    } else {
      console.log('Unable to parse the file. Please make sure the file has the correct format.');
    }
  }

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }>
      <TouchableOpacity onPress={handleOnUploadCsv}>
        <Text>click</Text>
        </TouchableOpacity>
    </ParallaxScrollView>
  );
}
      // console.log('Results:', results)
      // console.log('Results:', JSON.stringify(parseCompanies(results.data)))
      // const parsedCompanies = parseCompanies(results.data);
      // const symbols = extractTickers(parsedCompanies.companies);
      // console.log('symbols:', symbols);
      // const parsedResponse = await getCompaniesInBatches(parsedCompanies.companies);
      // const parsedResponse = await getCompanies(symbols);
      // try {
        // console.log('>', stringifiedResponse)
        // const parsedResponse = JSON.parse(stringifiedResponse);
      //   if(parsedResponse.success && parsedResponse.data?.length) {
      //     const parsedCompanies = parsedResponse.data.map(({
      //       symbol,
      //       bid,
      //       logoUrl,
      //     }) => ({
      //       symbol,
      //       bid,
      //       logoUrl,
      //     }))

      //     console.log('parsedResponse:', JSON.stringify(parsedCompanies));
      //   }
      // } catch(error) {
      //   console.log('error:', error);
      // }
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
