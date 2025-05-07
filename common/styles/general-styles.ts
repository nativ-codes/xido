import { StyleSheet } from 'react-native';

import { Colors, Units } from '@/common/constants';

export const GeneralStyles = StyleSheet.create({
	shadow: {
		shadowColor: Colors.black,
		shadowOffset: {
			width: 0,
			height: 2
		},
		shadowOpacity: 0.1,
		shadowRadius: 3.62,
		elevation: 4
	},
	directionRow: {
		flexDirection: 'row'
	},
	itemsCenter: {
		alignItems: 'center'
	},
	shrink: {
		flexShrink: 1
	},
	cardBorder: {
		borderWidth: 1,
		borderRadius: Units.s16,
		borderColor: Colors.border
	}
});
