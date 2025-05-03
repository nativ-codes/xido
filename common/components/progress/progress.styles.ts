import colors from '@/common/colors';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
	wrapper: {
		backgroundColor: colors.secondarySurface,
		height: 24,
		borderRadius: 12,
		width: '100%'
	},
	progress: {
		backgroundColor: colors.primary,
		height: '100%',
		borderRadius: 12
	}
});
