import React from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Header, EmptyPlaceholder as EmptyPlaceholderComponent} from '@/common/components';
import { HeaderPropTypes } from '@/common/components/header/header';

import styles from './tab-screen-layout.styles';

type TabScreenLayoutPropTypes = {
	isEmpty?: boolean;
	children: React.ReactNode;
	emptyPlaceholder?: React.ReactNode;
} & HeaderPropTypes;

function TabScreenLayout({
    children,
    isEmpty,
    emptyPlaceholder = <EmptyPlaceholderComponent />,
    ...headerProps
}: TabScreenLayoutPropTypes) {
	const insets = useSafeAreaInsets();

    return (
		<View style={styles.wrapper}>
			<ScrollView contentContainerStyle={StyleSheet.compose(styles.contentContainer, {
				paddingTop: insets.top,
				paddingBottom: insets.bottom + 68 + 32
			})}>
				{Boolean(headerProps) && <Header {...headerProps} />}
				{isEmpty ? emptyPlaceholder : children}
			</ScrollView>
		</View>
	);
}

export default TabScreenLayout;