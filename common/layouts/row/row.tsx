import React, {memo} from 'react';
import {View, StyleSheet} from 'react-native';

import styles from './row.styles';

type RowPropTypes = {
    left?: React.ReactNode,
    center?: React.ReactNode,
    right?: React.ReactNode,
    style?: any
}

function Row({left, center, right, style, ...rest}: RowPropTypes) {
	return (
		<View style={StyleSheet.compose(styles.container, style)} {...rest}>
			{left && (
				<View style={styles.row}>
					{left}
				</View>
			)}
			{center && <View style={styles.center}>{center}</View>}
			{right && (
				<View style={styles.row}>
					{right}
				</View>
			)}
		</View>
	);
}

export default memo(Row);
