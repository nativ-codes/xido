import { useMemo, useEffect, useState } from 'react';
import { TextInput, TouchableOpacity, View, StyleSheet } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { useRouter } from 'expo-router';
import Ionicons from '@expo/vector-icons/MaterialCommunityIcons';

import { Button, CompanyCard } from '@/common/components';
import { SortByPropTypes } from '@/types/components';
import Store from '@/config/store/slices/user-data';
import { ScreenLayout } from '@/common/layouts';
import { Colors } from '@/common/constants';

import SortByBottomSheet from './components/sort-by-bottom-sheet/sort-by-bottom-sheet';
import styles from './companies.styles';
import { ParseUserDataCompanyType } from '@/common/utils';
import { MotiView } from 'moti';
import { GeneralStyles } from '@/common/general-styles';
import TabScreenLayout from '@/common/layouts/tab-screen-layout/tab-screen-layout';

function Companies() {
	const router = useRouter();
	const userDataStore = Store.useUserData();
	const userData = Object.values(userDataStore);

	const [filteredUserData, setFilteredUserData] = useState(userData);
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [sortByValue, setSortByValue] = useState<SortByPropTypes>();

	useEffect(() => {
		setFilteredUserData(userData);
	}, [userDataStore]);

	const showModal = () => setIsModalVisible(true);
	const hideModal = () => setIsModalVisible(false);

	const handleOnChangeText = (text: string) => {
		setFilteredUserData(
			userData.filter(
				(item) =>
					item.summary?.companyName?.toLowerCase().includes(text.toLowerCase()) ||
					item.summary.symbol.toLowerCase().includes(text.toLowerCase())
			)
		);
	};

	const handleOnSortBy = () => {
		if (sortByValue) {
			const shallowCopy = [...userData];
			const sortByKey = sortByValue.key;

			setFilteredUserData(
				shallowCopy.sort(
					(a: ParseUserDataCompanyType, b: ParseUserDataCompanyType) =>
						(b.summary[sortByKey] as any) - (a.summary[sortByKey] as any)
				)
			);
		}
	};

	const handleOnApply = () => {
		hideModal();
		handleOnSortBy();
	};

	const handleOnReset = () => {
		setSortByValue(void 0);
		setFilteredUserData(userData);
		hideModal();
	};

	const handleOnCompanyPress = (symbol: string) => () => {
		router.push(`/company?symbol=${symbol}`);
	};

	const renderItem = useMemo(
		() =>
			({ item, index }: { item: ParseUserDataCompanyType; index: number }) =>
				(
					<MotiView
						from={{ opacity: 0, translateY: -20 }}
						animate={{ opacity: 1, translateY: 0 }}
						transition={{ type: 'timing', duration: 500, delay: 100 * index }}>
						<TouchableOpacity
							activeOpacity={0.7}
							onPress={handleOnCompanyPress(item.summary.symbol)}
							style={StyleSheet.compose(styles.card, { borderWidth: 1, borderRadius: 16, borderColor: Colors.border })}>
							<CompanyCard {...item.summary} />
						</TouchableOpacity>
					</MotiView>
				),
		[userData]
	);

	return (
		<TabScreenLayout title='Companies' isEmpty={!Boolean(userData.length)}>
			<View style={styles.wrapper}>
				<View style={styles.search}>
					<View style={styles.icon}>
						<Ionicons name='magnify' size={24} color={Colors.secondaryText} />
					</View>
					<TextInput
						style={styles.textinput}
						placeholder='Company name or ticker...'
						onChangeText={handleOnChangeText}
					/>
					<Button.Icon onPress={showModal} name='sort-variant' size='medium' color={Colors.secondaryText} />
				</View>

				<FlashList
					contentContainerStyle={styles.contentContainer}
					data={filteredUserData}
					renderItem={renderItem}
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
		</TabScreenLayout>
	);
}

export default Companies;
