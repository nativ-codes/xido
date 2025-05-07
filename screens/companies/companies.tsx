import { useEffect, useState } from 'react';
import { TextInput, TouchableOpacity, View } from 'react-native';
import { useRouter } from 'expo-router';
import Ionicons from '@expo/vector-icons/MaterialCommunityIcons';

import { Button, CompanyCard } from '@/common/components';
import { SortByPropTypes } from '@/types/components';
import Store from '@/config/store/slices/user-data';
import { Spacer } from '@/common/layouts';
import { Colors, SHORT_ANIMATION_DURATION, smallSlideInYAnimation } from '@/common/constants';

import SortByBottomSheet from './components/sort-by-bottom-sheet/sort-by-bottom-sheet';
import styles from './companies.styles';
import { ParseUserDataCompanyType } from '@/common/utils';
import { MotiView } from 'moti';
import TabScreenLayout from '@/common/layouts/tab-screen-layout/tab-screen-layout';
import { GeneralStyles } from '@/common/styles';

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

	return (
		<TabScreenLayout title='Companies' isEmpty={!Boolean(userData.length)}>
			<Spacer gap='s16' direction='horizontal' size='s16'>
				<Spacer gap='s8' style={GeneralStyles.directionRow}>
					<View style={styles.icon}>
						<Ionicons name='magnify' size={24} color={Colors.secondaryText} />
					</View>
					<TextInput
						style={styles.textinput}
						placeholder='Company name or ticker...'
						onChangeText={handleOnChangeText}
					/>
					<Button.Icon onPress={showModal} name='sort-variant' size='medium' color={Colors.secondaryText} />
				</Spacer>

				{filteredUserData.map((item, index) => (
					<MotiView key={item.summary.symbol} {...smallSlideInYAnimation} delay={SHORT_ANIMATION_DURATION * index}>
						<TouchableOpacity
							activeOpacity={0.7}
							onPress={handleOnCompanyPress(item.summary.symbol)}
							style={GeneralStyles.cardBorder}>
							<CompanyCard {...item.summary} />
						</TouchableOpacity>
					</MotiView>
				))}
			</Spacer>
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
