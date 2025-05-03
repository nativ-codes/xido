import colors from '@/common/constants/colors';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
	loading: {
		backgroundColor: colors.overlay,
		flex: 1,
		justifyContent: 'center'
	},
	error: {
		marginHorizontal: 16
	}
});
