import { StyleSheet } from 'react-native';

import {colors} from '@/common/constants';

export const GeneralStyles = StyleSheet.create({
	shadow: {
		shadowColor: colors.black,
		shadowOffset: {
			width: 0,
			height: 2
		},
		shadowOpacity: 0.1,
		shadowRadius: 3.62,
		elevation: 4
	}
});
