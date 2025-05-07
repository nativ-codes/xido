import { Tabs } from 'expo-router';
import React from 'react';

import { screenOptions } from '@/common/constants';

import TabBar from '@/common/containers/tab-bar/tab-bar';

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
