import {ScrollView, TextInput, TouchableOpacity, Image, StyleSheet, Platform, View, Dimensions } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import { FlashList } from "@shopify/flash-list";
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { useRouter } from 'expo-router';
import Ionicons from '@expo/vector-icons/MaterialCommunityIcons';
import {
  SafeAreaView,
  SafeAreaProvider,
  SafeAreaInsetsContext,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

import { readRemoteFile } from 'react-native-csv';
import { getCompanies, getCompaniesInBatches } from '@/services/companies';
import {chunkList, uploadCsv, parseCompanies, parseTransactions, validateColumnTitles, parseUserData} from '@/common/utils';
import { useMMKVString } from 'react-native-mmkv';
import {store} from '@/config/store';
import {getUserData} from '@/config/store/slices/user-data';
import {companies} from '@/__mocks__';
import CompanyCard from '@/common/components/company-card/company-card';
import colors from '@/common/colors';
import { useRef, useState } from 'react';
import Modal from "react-native-modal";
import Text from '@/common/components/text/text';
import {Button} from '@/common/components';
import SortByBottomSheet from '@/containers/portfolio/sort-by-bottom-sheet/sort-by-bottom-sheet';
import { SortByPropTypes } from '@/types/components';

// Total dividends received
// Total amount of stocks bought
// Total amount of stocks sold
// Total amount of stocks received from spin-offs
// Total amount of free funds interests received
// Total amount of free funds interests tax paid

function Portfolio() {
  const router = useRouter();
  const {bottom} = useSafeAreaInsets();
  // const [username, setUsername] = useMMKVString('transactions')
  const userData = useRef(Object.values(getUserData()));
  // const [userData, setUserData] = useState([]);
  const [filteredUserData, setFilteredUserData] = useState(userData.current);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [sortByValue, setSortByValue] = useState<SortByPropTypes>();

  const handleOnUploadCsv = () => {
    uploadCsv(parseResponse)
  }

  const showModal = () => setIsModalVisible(true);
  const hideModal = () => setIsModalVisible(false);

  const handleOnChangeText = (text: string) => {
    setFilteredUserData(userData.current.filter(item => 
      item.summary.companyName.toLowerCase().includes(text.toLowerCase()) ||
      item.summary.symbol.toLowerCase().includes(text.toLowerCase())
    ))
  }

  const handleOnSortBy = () => {
    if(sortByValue) {
      const shallowCopy = [...userData.current];

      setFilteredUserData(shallowCopy.sort((a, b) => b.summary[sortByValue?.key] - a.summary[sortByValue?.key]))
    }
  }

  const handleOnApply = () => {
    hideModal();
    handleOnSortBy();
  }

  const handleOnReset = () => {
    setSortByValue(void 0);
    setFilteredUserData(userData.current);
    hideModal();
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
// console.log(Object.values(parsedUserData))
        userData.current = Object.values(parsedUserData)
        setFilteredUserData(userData.current)
        // console.log('parsedUserData:', JSON.stringify(parsedUserData));

      store.set('userData', JSON.stringify(parsedUserData));
      } else {
        console.log('Invalid column titles. Please make sure the file has the correct format.');
      }
    } else {
      console.log('Unable to parse the file. Please make sure the file has the correct format.');
    }
  }

  const handleOnCompanyPress = (symbol: string) => () => {
    router.push(`/company?symbol=${symbol}`)
  }

  return (
      <SafeAreaView style={{flex: 1}}>

    <View style={{
      marginTop: 100,
      backgroundColor: colors.background,
      // padding: 16,
      gap: 16,
      flex: 1
    }}>
      <View style={{
        paddingHorizontal: 16,
        gap: 8,
        flexDirection: 'row',
      }}>
        <View style={{
          position: 'absolute',
          width: 40,
          height: 40,
          left: 16,
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1
        }}>
        <Ionicons name="magnify" size={24} color={colors.secondaryText} />

        </View>
        <TextInput style={{
          fontSize: 18,
          borderRadius: 24,
          paddingLeft: 40,
          paddingRight: 16,
          fontFamily: 'Urbanist',
          paddingVertical: 8,
          backgroundColor: colors.surface,
          flex: 1,
        }} placeholder="Username" onChangeText={handleOnChangeText}/>
  <TouchableOpacity onPress={showModal} style={{
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
  }}>
    <Ionicons name="sort-variant" size={24} color={colors.secondaryText} />
  </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={handleOnUploadCsv}>
        <Text>click</Text>
      </TouchableOpacity>
    <FlashList
    contentContainerStyle={{
      padding: 16,
    }}
      data={filteredUserData}
      renderItem={({ item }) => <TouchableOpacity onPress={handleOnCompanyPress(item.summary.symbol)} style={{
        marginBottom: 16
      }}><CompanyCard {...item.summary}/></TouchableOpacity>}
      estimatedItemSize={200}
    />
    </View>
    <SortByBottomSheet
        onReset={handleOnReset}
        onApply={handleOnApply}
        setSortByValue={setSortByValue}
        sortByValue={sortByValue}
        isModalVisible={isModalVisible}
        hideModal={hideModal}
    />
</SafeAreaView>
  );
}

export default Portfolio;