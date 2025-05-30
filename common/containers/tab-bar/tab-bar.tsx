import React from 'react';
import Ionicons from '@expo/vector-icons/MaterialCommunityIcons';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';

import { Colors, Units } from '@/common/constants';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import { GeneralStyles } from '@/common/styles/general-styles';
import { TAB_BAR_ITEMS } from './tab-bar.constants';
import styles from './tab-bar.styles';

function TabBar({ state, navigation, insets }: BottomTabBarProps) {
	return (
		<View
			style={StyleSheet.flatten([
				styles.tabBarStyle,
				{
					bottom: insets.bottom || Units.s16
				},
				GeneralStyles.shadow
			])}>
			{TAB_BAR_ITEMS.map((tab, index) => {
				const isFocused = state.index === index;
				const iconName = isFocused ? tab.iconFocused : tab.iconUnfocused;
				const handleOnPress = () => navigation.navigate(tab.name);

				return (
					<TouchableOpacity
						key={tab.name}
						onPress={handleOnPress}
						activeOpacity={0.7}
						style={StyleSheet.compose(styles.tabBarItem, isFocused && styles.tabBarItemFocused)}>
						<Ionicons name={iconName as keyof typeof Ionicons.glyphMap} size={24} color={Colors.secondaryText} />
					</TouchableOpacity>
				);
			})}
		</View>
	);
}

export default TabBar;
