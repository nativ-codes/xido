import colors from '@/common/constants/colors';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
	container: {
		padding: 16,
		backgroundColor: colors.surface,
		borderRadius: 16,
		borderWidth: 1,
		borderColor: colors.border
	},
	titleContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingBottom: 8,
		alignItems: 'center'
	}
});