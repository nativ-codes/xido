import { Tabs } from 'expo-router';
import React from 'react';
import Ionicons from '@expo/vector-icons/MaterialCommunityIcons';

import colors from '@/common/constants/colors';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import { GeneralStyles } from '@/common/general-styles';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const screenOptions = {
	tabBarActiveTintColor: colors.secondaryText,
	headerShown: false
};

const tabs = [
	{
		name: 'index',
		label: 'HOME',
		icon: 'home',
		iconFocused: 'home',
		iconUnfocused: 'home-outline'
	},
	{
		name: 'companies',
		label: 'COMPANIES',
		icon: 'database',
		iconFocused: 'database',
		iconUnfocused: 'database-outline'
	},
	{
		name: 'calendar',
		label: 'CALENDAR',
		icon: 'calendar',
		iconFocused: 'calendar',
		iconUnfocused: 'calendar-outline'
	},
	{
		name: 'goals',
		label: 'GOALS',
		icon: 'star',
		iconFocused: 'star',
		iconUnfocused: 'star-outline'
	},
	{
		name: 'settings',
		label: 'SETTINGS',
		icon: 'cog',
		iconFocused: 'cog',
		iconUnfocused: 'cog-outline'
	}
];

function TabBar({ state, navigation, insets }) {
	return (
		<View
			style={StyleSheet.flatten([
				styles.tabBarStyle,
				{
					bottom: insets.bottom || 16
				},
				GeneralStyles.shadow
			])}>
			{tabs.map((tab, index) => {
				const isFocused = state.index === index;
				const iconName = isFocused ? tab.iconFocused : tab.iconUnfocused;
				const handleOnPress = () => navigation.navigate(tab.name);

				return (
					<TouchableOpacity
						key={tab.name}
						onPress={handleOnPress}
						activeOpacity={0.7}
						style={StyleSheet.compose(styles.tabBarItem, isFocused && styles.tabBarItemFocused)}>
						<Ionicons name={iconName} size={24} color={colors.secondaryText} />
					</TouchableOpacity>
				);
			})}
		</View>
	);
}

const styles = StyleSheet.create({
	tabBarStyle: {
		position: 'absolute',
		left: 16,
		right: 16,
		height: 68,
		borderRadius: 68,
		borderWidth: 1,
		borderColor: colors.secondarySurface,
		backgroundColor: colors.surface,
		flexDirection: 'row',
		padding: 4
	},
	tabBarItem: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 68,
		gap: 4
	},
	tabBarItemFocused: {
		backgroundColor: colors.secondarySurface
	}
});

export default function TabLayout() {
	return (
		<Tabs screenOptions={screenOptions} tabBar={TabBar}>
			<Tabs.Screen name='index' />
			<Tabs.Screen name='companies' />
			<Tabs.Screen name='calendar' />
			<Tabs.Screen name='goals' />
			<Tabs.Screen name='settings' />
		</Tabs>
	);
}
