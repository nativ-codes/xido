import colors from '@/common/colors';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
	wrapper: {
		backgroundColor: colors.secondarySurface,
		height: 12,
		borderRadius: 6,
		width: '100%'
	},
	progress: {
		backgroundColor: colors.primary,
		height: '100%',
		borderRadius: 8
	}
});
