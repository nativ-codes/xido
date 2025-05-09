import React from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Header, EmptyPlaceholder as EmptyPlaceholderComponent } from '@/common/components';

import styles from './screen-layout.styles';
import { BOTTOM_SCREEN_OFFSET } from '@/common/constants';
import { ScreenLayoutPropTypes } from './screen-layout.types';

function ScreenLayout({
	children,
	isEmpty,
	emptyPlaceholder = <EmptyPlaceholderComponent />,
	...headerProps
}: ScreenLayoutPropTypes) {
	const insets = useSafeAreaInsets();

	return (
		<View style={styles.wrapper}>
			<ScrollView
				contentContainerStyle={StyleSheet.compose(styles.contentContainer, {
					paddingTop: insets.top,
					paddingBottom: insets.bottom + BOTTOM_SCREEN_OFFSET
				})}>
				{Boolean(headerProps) && <Header {...headerProps} />}
				{isEmpty ? emptyPlaceholder : children}
			</ScrollView>
		</View>
	);
}

export default ScreenLayout;
