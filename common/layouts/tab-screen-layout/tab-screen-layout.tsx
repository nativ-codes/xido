import React from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Header, EmptyPlaceholder as EmptyPlaceholderComponent } from '@/common/components';

import styles from './tab-screen-layout.styles';
import { BOTTOM_TAB_HEIGHT, BOTTOM_SCREEN_OFFSET } from '@/common/constants';
import { TabScreenLayoutPropTypes } from './tab-screen-layout.types';

function TabScreenLayout({
	children,
	isEmpty,
	emptyPlaceholder = <EmptyPlaceholderComponent />,
	...headerProps
}: TabScreenLayoutPropTypes) {
	const insets = useSafeAreaInsets();

	return (
		<View style={styles.wrapper}>
			<ScrollView
				contentContainerStyle={StyleSheet.compose(styles.contentContainer, {
					paddingTop: insets.top,
					paddingBottom: insets.bottom + BOTTOM_TAB_HEIGHT + BOTTOM_SCREEN_OFFSET
				})}>
				{Boolean(headerProps) && <Header {...headerProps} />}
				{isEmpty ? emptyPlaceholder : children}
			</ScrollView>
		</View>
	);
}

export default TabScreenLayout;
