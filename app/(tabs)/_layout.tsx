import { Tabs } from 'expo-router';
import React from 'react';
import Ionicons from '@expo/vector-icons/MaterialCommunityIcons';

import colors from '@/common/colors';

const screenOptions = {
	tabBarActiveTintColor: colors.secondaryText,
	headerShown: false
};

export default function TabLayout() {
	return (
		<Tabs screenOptions={screenOptions}>
			<Tabs.Screen
				name='index'
				options={{
					title: 'Home',
					tabBarIcon: ({ color, focused }) => (
						<Ionicons name={focused ? 'home' : 'home-outline'} size={24} color={color} />
					)
				}}
			/>
			<Tabs.Screen
				name='companies'
				options={{
					title: 'Companies',
					tabBarIcon: ({ color, focused }) => (
						<Ionicons name={focused ? 'database' : 'database-outline'} size={24} color={color} />
					)
				}}
			/>
			<Tabs.Screen
				name='calendar'
				options={{
					title: 'Calendar',
					tabBarIcon: ({ color, focused }) => (
						<Ionicons name={focused ? 'card-text' : 'card-text-outline'} size={24} color={color} />
					)
				}}
			/>
			<Tabs.Screen
				name='goals'
				options={{
					title: 'Goals',
					tabBarIcon: ({ color, focused }) => (
						<Ionicons name={focused ? 'star' : 'star-outline'} size={24} color={color} />
					)
				}}
			/>
			<Tabs.Screen
				name='settings'
				options={{
					title: 'Settings',
					tabBarIcon: ({ color, focused }) => (
						<Ionicons name={focused ? 'cog' : 'cog-outline'} size={24} color={color} />
					)
				}}
			/>
		</Tabs>
	);
}
