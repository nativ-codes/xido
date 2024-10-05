import {ScrollView, TextInput, TouchableOpacity, Image, StyleSheet, Platform, View, Dimensions } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import { FlashList } from "@shopify/flash-list";
import ParallaxScrollView from '@/components/ParallaxScrollView';
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
import {companies} from '@/__mocks__';
import CompanyCard from '@/common/components/company-card/company-card';
import colors from '@/common/colors';
import { useRef, useState } from 'react';
import Modal from "react-native-modal";
import Text from '@/common/components/text/text';
import {Selection} from '@/common/components';

// Total dividends received
// Total amount of stocks bought
// Total amount of stocks sold
// Total amount of stocks received from spin-offs
// Total amount of free funds interests received
// Total amount of free funds interests tax paid

// const storedUserData = store.getString('userData');
// const parsedStoredUserData = storedUserData ? JSON.parse(storedUserData) : {};
// const parsedStoredUserDataList = Object.values(parsedStoredUserData);

export default function HomeScreen() {
  return null;
}

