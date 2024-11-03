import { useMemo, useRef, useState } from 'react';
import { TextInput, TouchableOpacity, View } from 'react-native';
import { FlashList } from "@shopify/flash-list";
import { useRouter } from 'expo-router';
import Ionicons from '@expo/vector-icons/MaterialCommunityIcons';

import { Button, CompanyCard } from '@/common/components';
import { SortByPropTypes } from '@/types/components';
import { getUserData } from '@/config/store/slices/user-data';
import { ScreenLayout } from '@/common/layouts';
import colors from '@/common/colors';

import SortByBottomSheet from './components/sort-by-bottom-sheet/sort-by-bottom-sheet';
import styles from './companies.styles';

function Companies() {
    const router = useRouter();
    const userData = useRef(Object.values(getUserData()));

    const [filteredUserData, setFilteredUserData] = useState(userData.current);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [sortByValue, setSortByValue] = useState<SortByPropTypes>();

    const showModal = () => setIsModalVisible(true);
    const hideModal = () => setIsModalVisible(false);

    const handleOnChangeText = (text: string) => {
        setFilteredUserData(userData.current.filter(item =>
            item.summary.companyName.toLowerCase().includes(text.toLowerCase()) ||
            item.summary.symbol.toLowerCase().includes(text.toLowerCase())
        ))
    }

    const handleOnSortBy = () => {
        if (sortByValue) {
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

    const handleOnCompanyPress = (symbol: string) => () => {
        router.push(`/company?symbol=${symbol}`)
    }

    const renderItem = useMemo(() => ({ item }) => (
        <TouchableOpacity activeOpacity={0.7} onPress={handleOnCompanyPress(item.summary.symbol)} style={styles.card}>
            <CompanyCard {...item.summary} />
        </TouchableOpacity>
    ), [])

    return (
        <ScreenLayout title="Companies">
            <View style={styles.wrapper}>
                <View style={styles.search}>
                    <View style={styles.icon}>
                        <Ionicons name="magnify" size={24} color={colors.secondaryText} />
                    </View>
                    <TextInput style={styles.textinput} placeholder="Company name or ticker..." onChangeText={handleOnChangeText} />
                    <Button.Icon
                        onPress={showModal}
                        name="sort-variant" size={Button.Icon.sizes.MEDIUM} color={colors.secondaryText}
                    />
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
        </ScreenLayout>
    );
}

export default Companies;