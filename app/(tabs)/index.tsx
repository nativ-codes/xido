import {ScrollView, Text, TouchableOpacity, Image, StyleSheet, Platform, View } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import { FlashList } from "@shopify/flash-list";
import ParallaxScrollView from '@/components/ParallaxScrollView';

import { readRemoteFile } from 'react-native-csv';
import { getCompanies, getCompaniesInBatches } from '@/services/companies';
import {chunkList, uploadCsv, parseCompanies, parseTransactions, validateColumnTitles, parseUserData} from '@/common/utils';
import { useMMKVString } from 'react-native-mmkv';
import {store} from '@/config/store';
import {companies} from '@/__mocks__';
import CompanyCard from '@/common/components/company-card/company-card';
import colors from '@/common/colors';
import { useState } from 'react';


// Total dividends received
// Total amount of stocks bought
// Total amount of stocks sold
// Total amount of stocks received from spin-offs
// Total amount of free funds interests received
// Total amount of free funds interests tax paid

export default function HomeScreen() {
  // const [username, setUsername] = useMMKVString('transactions')
  const [cmp, setCmp] = useState([])
  // console.log('>>', username)

  const handleOnUploadCsv = () => {
    uploadCsv(parseResponse)
  }

  const parseResponse = response => {
    if(response.data.length) {
      if(validateColumnTitles(response.data[0])) {
        // console.log(JSON.stringify(response));
        const parsedTransactions = parseTransactions(response.data);
        // const tickers = Object.keys(parsedTransactions.companies)
        // getCompaniesInBatches(tickers);
        const parsedUserData = parseUserData({
          transactions: parsedTransactions,
          companies: companies,
        });
console.log(Object.values(parsedUserData))
        setCmp(Object.values(parsedUserData))
        // console.log('parsedUserData:', JSON.stringify(parsedUserData));

      // store.set('transactions', JSON.stringify(response));
      } else {
        console.log('Invalid column titles. Please make sure the file has the correct format.');
      }
    } else {
      console.log('Unable to parse the file. Please make sure the file has the correct format.');
    }
  }

  return (
    <View style={{
      marginTop: 100,
      backgroundColor: colors.background,
      // padding: 16,
      gap: 16,
      flex: 1
    }}>

      <TouchableOpacity onPress={handleOnUploadCsv}>
        <Text>click</Text>
      </TouchableOpacity>
    <FlashList
    contentContainerStyle={{
      padding: 16,
    }}
      data={cmp}
      renderItem={({ item }) => <View style={{
        marginBottom: 16
      }}><CompanyCard {...item.summary}/></View>}
      estimatedItemSize={200}
    />        
    </View>
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
